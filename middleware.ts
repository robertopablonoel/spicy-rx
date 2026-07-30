import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/attribution-constants";
import {
  affiliateSnapshot,
  affiliateSource,
  affiliateTarget,
} from "@/lib/affiliates";

/**
 * Affiliate vanity redirects — `spicyrx.com/<CODE>` (e.g. /SPICYALIEN).
 *
 * Middleware (not a catch-all route) so bare root vanity links don't shadow the
 * styled 404 or collide with real pages: only KNOWN affiliate codes are
 * intercepted; everything else falls through to normal routing via next().
 *
 * For a matched code it mirrors the insert-QR route: 307 to the configurable
 * destination with utm_source/medium/campaign stamped, writes the
 * `.spicyrx.com` attribution cookie server-side keyed on the PATH (survives
 * VPN/privacy utm_* stripping, carries sticky form_arm forward), and fires an
 * `affiliate_click` PostHog event via waitUntil (strip-proof click counter,
 * off the response's critical path).
 */
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const segment = request.nextUrl.pathname.split("/")[1] ?? "";
  const source = affiliateSource(segment);
  if (!source) return NextResponse.next();

  const target = affiliateTarget(source);
  const response = NextResponse.redirect(target, 307);

  // Read the prior cookie so the sticky form_arm is carried forward.
  let stored: Record<string, unknown> = {};
  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieValue) {
    try {
      stored = JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      // malformed cookie — treat as no prior attribution
    }
  }
  const snapshot = affiliateSnapshot(stored, source);
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(snapshot))}` +
      `; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax` +
      cookieDomainAttr(request),
  );

  event.waitUntil(captureClick(request, segment, source));
  return response;
}

/**
 * Scope to `.spicyrx.com` in production so my.spicyrx.com reads it; host-only
 * elsewhere (localhost / *.vercel.app previews). Mirror of lib/attribution.
 */
function cookieDomainAttr(request: NextRequest): string {
  const host = request.nextUrl.hostname;
  return host === "spicyrx.com" || host.endsWith(".spicyrx.com")
    ? "; Domain=.spicyrx.com"
    : "";
}

/**
 * Fire `affiliate_click` via PostHog's HTTP capture API. Runs under waitUntil
 * so it never delays the redirect. Reuses the visitor's posthog-js device ID
 * from the ph_* cookie when present so the click joins their stream; else a
 * random anonymous ID. Best-effort — a failure must never break the redirect.
 */
async function captureClick(
  request: NextRequest,
  code: string,
  source: string,
): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  let distinctId: string | undefined;
  const phCookie = request.cookies.get(`ph_${key}_posthog`)?.value;
  if (phCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(phCookie));
      if (typeof parsed?.distinct_id === "string") {
        distinctId = parsed.distinct_id;
      }
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
        event: "affiliate_click",
        distinct_id: distinctId ?? crypto.randomUUID(),
        properties: { code: code.toUpperCase(), utm_source: source },
      }),
    });
  } catch {
    // analytics must never block or break the redirect
  }
}

/**
 * Run on everything except Next internals, api routes, and static files (paths
 * with a dot). The affiliate registry — not the matcher — is the real gate, so
 * non-affiliate paths just fall through to next().
 */
export const config = {
  matcher: ["/((?!_next/|api/|.*\\.).*)"],
};
