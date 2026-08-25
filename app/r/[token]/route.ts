import { NextRequest, NextResponse } from "next/server";
import { readResumeToken } from "@/lib/resume-token";

/**
 * Abandoned-intake resume redirect — `/r/<token>`.
 *
 * The email agency merges this URL into recovery sends. On click we mint a
 * FRESH Rimo SSO link and 302 the browser through, landing the recipient logged
 * into their SpicyRx account on "Continue Your Intake".
 *
 * WHY MINT AT CLICK TIME RATHER THAN BAKING LINKS INTO THE SEND:
 * Rimo's SSO tokens are single-use and live exactly 15 minutes (verified). A
 * link generated when the campaign is queued is dead long before most people
 * open. Worse, single-use means a corporate link-scanner that pre-fetches the
 * URL BURNS the token and the human then gets `?error=expired`. Minting here
 * fixes both: a scanner burns one throwaway token, and the human's click mints
 * another. Rimo tokens do not invalidate one another (verified), so concurrent
 * mints for the same customer are safe.
 *
 * SECURITY: the Rimo key mints an authenticated session for ANY email handed to
 * it — it is an account-takeover primitive, so it lives only in this server-side
 * env var and never reaches the client, the agency, or the ESP. This route
 * accepts only an opaque encrypted token and NEVER an email parameter.
 */

export const runtime = "nodejs"; // node:crypto in lib/resume-token
export const dynamic = "force-dynamic"; // never prerender or cache a login redirect

const RIMO_SSO_ENDPOINT = "https://my.spicyrx.com/api/sso";

/** The store's only sales channel — "Default Sales Channel". All teleforms hang off it. */
const RIMO_SALES_CHANNEL_ID = "c6tNIebCU34D7kDsDwF1D";

/** Where a bad/expired/unknown token goes. Deliberately generic — never explain the failure. */
const FALLBACK_DESTINATION = "https://www.spicyrx.com/";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const parsed = safeRead(token);
  if (!parsed) return bounce("bad_token");

  const apiKey = process.env.RIMO_SSO_KEY;
  if (!apiKey) {
    console.error("[/r] RIMO_SSO_KEY is not configured");
    return bounce("not_configured");
  }

  let destination: string;
  try {
    const response = await fetch(RIMO_SSO_ENDPOINT, {
      method: "POST",
      headers: {
        "X-Rimo-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salesChannelId: RIMO_SALES_CHANNEL_ID,
        email: parsed.email,
        ...(parsed.returnTo ? { returnTo: parsed.returnTo } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(`[/r] Rimo SSO returned ${response.status}`);
      return bounce("sso_error");
    }

    const data = (await response.json()) as {
      url?: string;
      created?: boolean;
    };

    // Verified against production: an address Rimo doesn't know returns
    // 404 {"error":"No customer found with this email"} and creates nothing —
    // so the !response.ok branch above already handles strangers safely, and
    // tokening people who aren't Rimo customers has no side effect.
    //
    // This stays as belt-and-braces, but deliberately triggers ONLY on an
    // explicit `true`. Bouncing on "not exactly false" would lock out real
    // users if Rimo ever stopped returning the field.
    if (data.created === true) {
      console.error("[/r] refusing: Rimo created a new customer for this email");
      return bounce("unexpected_create");
    }

    if (!data.url) return bounce("no_url");
    destination = data.url;
  } catch (error) {
    console.error("[/r] Rimo SSO request failed", error);
    return bounce("sso_unreachable");
  }

  void captureClick(request, "recovery_link_clicked");

  const redirect = NextResponse.redirect(destination, 302);
  // The destination embeds a single-use credential. A cached 302 would hand a
  // spent token to the next clicker, so forbid every layer from storing it.
  redirect.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  redirect.headers.set("Referrer-Policy", "no-referrer");
  return redirect;
}

function safeRead(token: string) {
  try {
    return readResumeToken(token);
  } catch (error) {
    // thrown only when SPICYRX_LINK_SECRET is missing/short — a config fault, not a bad token
    console.error("[/r] token read failed", error);
    return null;
  }
}

function bounce(reason: string) {
  const response = NextResponse.redirect(FALLBACK_DESTINATION, 302);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("x-resume-bounce", reason); // observable in logs; harmless to the visitor
  return response;
}

/**
 * Fire a PostHog event server-side (posthog-js never runs on this bounce-through
 * path). Mirrors captureScan() in the /qr route: reuse the visitor's posthog-js
 * device ID when the cookie is present so the click joins their stream.
 *
 * Deliberately records NO email and NO token — this is a marketing funnel event,
 * and PHI/PII must not enter analytics.
 */
async function captureClick(request: NextRequest, event: string): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  let distinctId: string | undefined;
  const phCookie = request.cookies.get(`ph_${key}_posthog`)?.value;
  if (phCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(phCookie));
      if (typeof parsed?.distinct_id === "string") distinctId = parsed.distinct_id;
    } catch {
      // unreadable posthog cookie — fall through to a random ID
    }
  }

  try {
    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event,
        distinct_id: distinctId ?? crypto.randomUUID(),
        properties: { utm_source: "email", utm_medium: "recovery" },
      }),
    });
  } catch {
    // analytics must never block or break the redirect
  }
}
