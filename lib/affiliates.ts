/**
 * Affiliate vanity redirects — `spicyrx.com/<CODE>`.
 *
 * Same attribution machinery as the package-insert QR (lib/insert-qr.ts): a
 * short own-domain link 307-redirects to a configurable destination with the
 * traffic source stamped on, AND writes the `.spicyrx.com` attribution cookie
 * server-side (in middleware) so the source survives even when a VPN/privacy
 * browser strips utm_* off the URL. Attribution only for now — no commission/
 * payout integration yet (utm_source carries the handle, so it's recoverable
 * per-order later; a dedicated non-UTM ref param can be added when we do payouts).
 *
 * Mapping: the affiliate handle IS the traffic source.
 *   utm_source   = <handle>            (e.g. `spicyalien`) — TW splits by it natively
 *   utm_medium   = affiliate           (the mechanism family; joins insert/halo)
 *   utm_campaign = affiliate_program   (one stable name for the mechanism)
 * utm_content and utm_term are left free (utm_term stays owned by the live form
 * A/B test — "one param = one experiment").
 *
 * Kept directive-free so the middleware (edge) can import it.
 */

import { FORM_ARM_KEY } from "@/lib/attribution-constants";

export const AFFILIATE_UTM_MEDIUM = "affiliate";
export const AFFILIATE_UTM_CAMPAIGN = "affiliate_program";

/**
 * Top-level route segments an affiliate code must NEVER equal — middleware runs
 * before routing, so a code colliding with one of these would hijack a real
 * page. Codes are hand-curated, but affiliateSource() also refuses these
 * defensively. Keep in sync with app/ + app/(marketing)/ top-level dirs.
 */
const RESERVED = new Set([
  "",
  "passion",
  "consult",
  "pages",
  "policies",
  "qr",
  "science",
]);

/**
 * Registry: vanity code as it appears in the URL (canonical UPPERCASE) →
 * utm_source slug (lowercase). Add affiliates here; a deploy publishes them.
 * Matched case-insensitively, so spicyrx.com/spicyalien resolves too.
 */
export const AFFILIATES: Record<string, string> = {
  SPICYALIEN: "spicyalien",
};

/**
 * Resolve a URL path segment to its affiliate utm_source, or undefined if it
 * isn't a known affiliate (or collides with a reserved route name).
 */
export function affiliateSource(segment: string): string | undefined {
  if (RESERVED.has(segment.toLowerCase())) return undefined;
  return AFFILIATES[segment.toUpperCase()];
}

/**
 * Where a clicked affiliate link lands — the on-the-fly dial (Vercel env var,
 * no link change). Default: the marketing homepage, so captureAttribution()
 * runs on load. Absolute URL; may carry its own path/query (UTMs merged on top).
 */
export const AFFILIATE_DESTINATION =
  process.env.AFFILIATE_DESTINATION ?? "https://www.spicyrx.com/";

/** Build the fully-stamped destination URL for an affiliate source. */
export function affiliateTarget(source: string): URL {
  const target = new URL(AFFILIATE_DESTINATION);
  target.searchParams.set("utm_source", source);
  target.searchParams.set("utm_medium", AFFILIATE_UTM_MEDIUM);
  target.searchParams.set("utm_campaign", AFFILIATE_UTM_CAMPAIGN);
  return target;
}

/**
 * Attribution-cookie snapshot to write server-side on the redirect, keyed off
 * the PATH (strip-proof). Mirrors captureAttribution()'s last-touch semantics:
 * a click REPLACES the snapshot with the affiliate UTMs but carries the sticky
 * form_arm forward, byte-format-identical to the client writer / insert route.
 */
export function affiliateSnapshot(
  existing: Record<string, unknown>,
  source: string,
): Record<string, string> {
  const snapshot: Record<string, string> = {
    utm_source: source,
    utm_medium: AFFILIATE_UTM_MEDIUM,
    utm_campaign: AFFILIATE_UTM_CAMPAIGN,
  };
  const arm = existing[FORM_ARM_KEY];
  if (typeof arm === "string" && arm) {
    snapshot[FORM_ARM_KEY] = arm;
  }
  return snapshot;
}
