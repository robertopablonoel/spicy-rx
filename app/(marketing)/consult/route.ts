import { NextRequest, NextResponse } from "next/server";
import {
  PARAM_KEYS,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  FORM_ARM_KEY,
} from "@/lib/attribution-constants";
import {
  FORM_ARM_UTM_TERM,
  intakeUrlForArm,
  isFormArm,
  pickRandomArm,
  type FormArm,
} from "@/lib/form-ab-shared";

/**
 * Legacy /consult route — redirects to the Rimo-hosted intake.
 *
 * A route handler (not a page) because the A/B form assignment must be
 * written into the attribution cookie ON the 307 itself — server components
 * can't set cookies, and a deep-linked visitor never runs our client JS
 * before landing on Rimo.
 *
 * Forwards attribution so a deep link like `/consult?fbclid=…&utm_source=…`
 * (e.g. an ad pointed straight here) carries its click-IDs into the Rimo
 * teleform. Two sources, in order:
 *   1. params on /consult's own URL (a fresh ad click landing here)
 *   2. the `.spicyrx.com` attribution cookie (set on an earlier landing)
 * Anything already on the URL wins over the cookie.
 *
 * A/B test additions (same rules as the client path in lib/form-ab.ts):
 *   - sticky arm from the cookie's `form_arm`, else assign 50/50
 *   - destination = the arm's intake URL
 *   - arm rides utm_term only when no real utm_term is flowing
 *   - Set-Cookie re-asserts the full attribution JSON + form_arm on the 307
 *   - a fresh assignment fires the form_ab_assigned PostHog event
 *     server-side (denominator parity with the client path)
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  // Stored attribution cookie (URL-encoded JSON, written by lib/attribution).
  let stored: Record<string, unknown> = {};
  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieValue) {
    try {
      stored = JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      // malformed cookie — ignore, treat as unassigned first touch
    }
  }

  const priorArm = stored[FORM_ARM_KEY];
  const arm: FormArm = isFormArm(priorArm) ? priorArm : pickRandomArm();
  const isNewAssignment = !isFormArm(priorArm);

  const target = new URL(intakeUrlForArm(arm));

  // 1) Attribution params present on /consult's own URL.
  for (const key of PARAM_KEYS) {
    const value = sp.get(key);
    if (value) target.searchParams.set(key, value);
  }

  // 2) Fall back to the attribution cookie for anything not already set.
  for (const key of PARAM_KEYS) {
    const value = stored[key];
    if (!target.searchParams.has(key) && typeof value === "string" && value) {
      target.searchParams.set(key, value);
    }
  }

  // 3) Arm rides utm_term only when no real campaign term is flowing.
  if (!target.searchParams.has("utm_term")) {
    target.searchParams.set("utm_term", FORM_ARM_UTM_TERM[arm]);
  }

  const response = NextResponse.redirect(target, 307);

  // Re-assert the attribution cookie with the arm folded in, on the redirect
  // itself — byte-format-identical to the client writer in lib/attribution.
  const merged = { ...stored, [FORM_ARM_KEY]: arm };
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(merged))}` +
      `; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax` +
      cookieDomainAttr(request),
  );

  if (isNewAssignment) {
    const scOrder = target.searchParams.get("sc_order");
    await captureAssignment(request, arm, scOrder);
  }

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
 * Fire form_ab_assigned via PostHog's HTTP capture API — posthog-js never
 * runs on this path (the visitor bounces straight off to Rimo). Reuses the
 * visitor's posthog-js device ID from the ph_* cookie when one exists so
 * the event joins their client-side stream; falls back to a random anonymous
 * ID (the sc_order property still carries the order-token join).
 * Best-effort: a capture failure must never break the redirect.
 */
async function captureAssignment(
  request: NextRequest,
  arm: FormArm,
  scOrder: string | null,
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
        event: "form_ab_assigned",
        distinct_id: distinctId ?? crypto.randomUUID(),
        properties: {
          form_arm: arm,
          assigned_via: "consult_redirect",
          ...(scOrder ? { sc_order: scOrder } : {}),
        },
      }),
    });
  } catch {
    // analytics must never block or break the redirect
  }
}
