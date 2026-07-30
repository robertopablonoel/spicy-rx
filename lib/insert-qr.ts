/**
 * Package-insert QR redirect — config + code→design map.
 *
 * Two QR codes are printed on the physical insert shipped in every Spicy Cubes
 * package (playing-card vs black-card design). Each QR encodes a short, stable
 * own-domain URL — `spicyrx.com/qr/pc` / `spicyrx.com/qr/bc` — that the
 * `/qr/[code]` route handler 307-redirects to the current landing destination
 * with the design's UTM tags stamped on.
 *
 * The whole point of the indirection: the PRINTED URL never changes, but the
 * DESTINATION is a dial we own. Re-point it (homepage → quiz funnel → intake)
 * by flipping INSERT_QR_DESTINATION — no reprint, no code rewrite.
 *
 * This is a TRAFFIC SOURCE, not a website-managed A/B test: fulfillment decides
 * which card ships, the site never randomizes. So the design rides `utm_content`
 * (a source/content tag), NOT `utm_term`. `utm_term` is owned exclusively by the
 * live form A/B test (lib/form-ab-shared.ts), which stamps its arm only when
 * utm_term is free — "one param = one experiment". Keeping the design off
 * utm_term is what lets the two coexist (an insert order can carry BOTH
 * utm_content=playing-card AND utm_term=arm_spic, orthogonal and un-collided).
 *
 * Kept directive-free (no "use client") so the server route handler can import it.
 */

import { FORM_ARM_KEY } from "@/lib/attribution-constants";

/**
 * Stable UTM tags stamped on every insert redirect, regardless of destination.
 *   utm_source  — exact locked string the whole datachain keys on
 *   utm_medium  — the mechanism family (joins `halo`, `post-purchase`)
 *   utm_campaign — ONE stable name for this mechanism, never reused
 * (utm_content is per-code, from INSERT_QR_CODES below.)
 */
export const INSERT_QR_UTM = {
  utm_source: "spicycubes",
  utm_medium: "insert",
  utm_campaign: "package_insert",
} as const;

/**
 * Short code (baked into the printed QR) → design name (the utm_content value).
 * These keys are PERMANENT once a card is printed — never repurpose `pc`/`bc`.
 */
export const INSERT_QR_CODES = {
  pc: "playing-card",
  bc: "black-card",
} as const;

export type InsertQrCode = keyof typeof INSERT_QR_CODES;

export function isInsertQrCode(value: string): value is InsertQrCode {
  return value in INSERT_QR_CODES;
}

/**
 * Where a scanned insert QR lands. THE on-the-fly dial — change this (Vercel
 * env var, no reprint) to re-route inserts to a quiz funnel or the intake form.
 * Default: the marketing homepage, so captureAttribution() runs on load and the
 * `.spicyrx.com` cookie is set before the visitor clicks a CTA.
 *
 * Must be an absolute URL. May carry its own path/query — the design UTM tags
 * are merged on top (and win) without clobbering existing params.
 */
export const INSERT_QR_DESTINATION =
  process.env.INSERT_QR_DESTINATION ?? "https://www.spicyrx.com/";

/**
 * Build the fully-stamped destination URL for a given insert code.
 * Unknown code → destination with the base UTMs but no utm_content (safe
 * fallback for a garbage/crawler scan; still an insert-attributed landing).
 */
export function insertQrTarget(code: string): URL {
  const target = new URL(INSERT_QR_DESTINATION);
  for (const [key, value] of Object.entries(INSERT_QR_UTM)) {
    target.searchParams.set(key, value);
  }
  if (isInsertQrCode(code)) {
    target.searchParams.set("utm_content", INSERT_QR_CODES[code]);
  }
  return target;
}

/**
 * Build the attribution-cookie snapshot to write server-side on the redirect,
 * so the design survives even when a VPN/privacy browser strips utm_* off the
 * URL before captureAttribution() can read it. The snapshot is keyed off the
 * PATH (`/qr/pc`), which stripping can't touch, and rides a first-party
 * `Set-Cookie` header, which stripping also can't touch.
 *
 * Mirrors lib/attribution's captureAttribution() last-touch semantics exactly
 * so both cases converge on an identical cookie: a scan REPLACES the snapshot
 * with the insert UTMs (the scan is a fresh touch), but carries the sticky
 * `form_arm` forward from any existing cookie so the A/B assignment is never
 * wiped. Only PARAM_KEYS-shaped fields + form_arm are written — byte-format
 * identical to the client writer, so a later un-stripped landing overwrites
 * it with the same bytes.
 */
export function insertQrSnapshot(
  existing: Record<string, unknown>,
  code: string,
): Record<string, string> {
  const snapshot: Record<string, string> = { ...INSERT_QR_UTM };
  if (isInsertQrCode(code)) {
    snapshot.utm_content = INSERT_QR_CODES[code];
  }
  const arm = existing[FORM_ARM_KEY];
  if (typeof arm === "string" && arm) {
    snapshot[FORM_ARM_KEY] = arm;
  }
  return snapshot;
}
