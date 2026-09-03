import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  COOKIE_MAX_AGE,
} from "@/lib/attribution-constants";
import {
  INSERT_QR_CODES,
  insertQrSnapshot,
  insertQrTarget,
  isInsertQrCode,
} from "@/lib/insert-qr";
import {
  EXIT_COOKIE_MAX_AGE,
  EXIT_COOKIE_NAME,
  EXIT_PARAM,
  resolveExitArm,
} from "@/lib/insert-exit-split";

/**
 * Package-insert QR redirect — `/qr/pc` and `/qr/bc`.
 *
 * The two printed QR codes point here (via the apex→www redirect). This route
 * is the on-the-fly control point: it stamps the design's UTM tags and 307s to
 * the current INSERT_QR_DESTINATION. Re-point the destination (env var) without
 * reprinting the QR. See lib/insert-qr.ts for the code→design map and rationale
 * (why utm_content, not utm_term).
 *
 * A route handler (not a page/next.config redirect) so we can also, keyed on
 * the PATH (`/qr/pc` vs `/qr/bc`) — which privacy tools can't strip — both
 * (a) count the scan server-side and (b) write the attribution cookie on the
 * 307 itself, so the design tag survives even when a VPN/privacy browser
 * strips utm_* off the URL before captureAttribution() can read it.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const target = insertQrTarget(code);

  // Assign the lander EXIT arm (experiment insert-exit-2026-09) here, on the
  // scan itself: server-side so it can't be reshuffled client-side, and sticky
  // by cookie so a re-scan keeps the same arm. Stamped onto the landing URL as
  // well as the cookie — the quiz reads it to decide where its CTA points, and
  // it rides on to Rimo so a lead joins back to its arm.
  const { arm: exitArm, assigned: exitAssigned } = resolveExitArm(
    request.cookies.get(EXIT_COOKIE_NAME)?.value,
  );
  target.searchParams.set(EXIT_PARAM, exitArm);

  const response = NextResponse.redirect(target, 307);

  if (exitAssigned) {
    response.headers.append(
      "Set-Cookie",
      `${EXIT_COOKIE_NAME}=${exitArm}` +
        `; Path=/; Max-Age=${EXIT_COOKIE_MAX_AGE}; SameSite=Lax` +
        cookieDomainAttr(request),
    );
  }

  // Write the attribution cookie server-side, keyed on the path — the
  // strip-proof belt to the URL param's suspenders. Read the prior cookie so
  // the sticky form_arm is carried forward (see insertQrSnapshot). Scoped to
  // `.spicyrx.com` in prod so my.spicyrx.com reads it; byte-format-identical
  // to lib/attribution's client writer and the /consult route.
  let stored: Record<string, unknown> = {};
  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieValue) {
    try {
      stored = JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      // malformed cookie — treat as no prior attribution
    }
  }
  const snapshot = insertQrSnapshot(stored, code);
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(snapshot))}` +
      `; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax` +
      cookieDomainAttr(request),
  );

  // Best-effort scan counter — must never block or break the redirect.
  await captureScan(request, code);

  return response;
}

/**
 * Mirror of lib/attribution's cookieDomainAttr: scope to `.spicyrx.com` in
 * production so my.spicyrx.com can read it; host-only elsewhere
 * (localhost / *.vercel.app previews).
 */
function cookieDomainAttr(request: NextRequest): string {
  const host = request.nextUrl.hostname;
  return host === "spicyrx.com" || host.endsWith(".spicyrx.com")
    ? "; Domain=.spicyrx.com"
    : "";
}

/**
 * Fire `insert_qr_scan` via PostHog's HTTP capture API (posthog-js never runs
 * on this bounce-through path). Mirrors the /consult route's server-side capture:
 * reuse the visitor's posthog-js device ID from the ph_* cookie when present so
 * the scan joins their client-side stream; else a random anonymous ID. The
 * design tag (utm_content) is the primary property. Unknown codes are recorded
 * too, tagged `known:false`, so garbage/crawler scans are observable.
 */
async function captureScan(request: NextRequest, code: string): Promise<void> {
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

  const known = isInsertQrCode(code);
  try {
    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event: "insert_qr_scan",
        distinct_id: distinctId ?? crypto.randomUUID(),
        properties: {
          code,
          known,
          utm_content: known ? INSERT_QR_CODES[code] : undefined,
        },
      }),
    });
  } catch {
    // analytics must never block or break the redirect
  }
}
