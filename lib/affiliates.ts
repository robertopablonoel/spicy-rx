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
 * DIRECT-TO-TELEFORM affiliates (see `destination` + `excludeFromFormAbTest`):
 * some affiliates are force-routed straight to one specific Rimo intake form,
 * bypassing the marketing site. That deliberately keeps them OUT of the
 * intake-form A/B test — both assignment paths (the client IntakeLink CTA and
 * the /consult route) live on/behind the site they skip, so no form_arm is
 * assigned, no utm_term=arm_* tag is stamped, and form_ab_assigned never fires.
 * Because they skip the site, Rimo (which captures URL params, not our cookie)
 * only sees the attribution we forward ONTO the intake URL — so we forward the
 * visitor's click IDs/UTMs there directly.
 *
 * Kept directive-free so the middleware (edge) can import it.
 */

import { PARAM_KEYS, FORM_ARM_KEY } from "@/lib/attribution-constants";
import { RIMO_INTAKE_URL_B } from "@/lib/constants";

export const AFFILIATE_UTM_MEDIUM = "affiliate";
export const AFFILIATE_UTM_CAMPAIGN = "affiliate_program";

export type Affiliate = {
  /** utm_source slug (lowercase). */
  source: string;
  /**
   * Override the default landing (the homepage funnel, AFFILIATE_DESTINATION).
   * When this points at a teleform (e.g. the qmv intake), the click goes
   * DIRECTLY to that form — the marketing site, and with it the whole A/B
   * assignment, is bypassed. Full attribution is forwarded onto the form URL.
   */
  destination?: string;
  /**
   * True = force-routed to a specific teleform and MUST be excluded from the
   * intake-form A/B test (we are not testing teleforms on this traffic). No
   * form_arm is written and no utm_term=arm_* tag is stamped; the direct
   * redirect already bypasses both assignment paths so form_ab_assigned never
   * fires. Their intake submissions land in that form's Rimo channel export
   * alongside real A/B traffic, so they MUST be filtered out of arm data by
   * `utm_source=<source>` + `utm_medium=affiliate`. See docs/affiliate-redirect.md
   * and the note in lib/form-ab-shared.ts.
   */
  excludeFromFormAbTest?: boolean;
};

/**
 * Top-level route segments an affiliate code must NEVER equal — middleware runs
 * before routing, so a code colliding with one of these would hijack a real
 * page. Codes are hand-curated, but lookupAffiliate() also refuses these
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
 * affiliate config. Add affiliates here; a deploy publishes them. Matched
 * case-insensitively, so spicyrx.com/spicyalien resolves too.
 */
export const AFFILIATES: Record<string, Affiliate> = {
  // Jamie Lynn. Force-routed straight to the qmv teleform and held OUT of the
  // intake-form A/B test — we are not testing teleforms on her traffic; every
  // /SPICYALIEN visitor gets the qmv form, period. RIMO_INTAKE_URL_B is the
  // same physical qmv Rimo channel arm B uses (env-overridable), reused here so
  // her form tracks that channel's URL — but her routing is NOT part of the test.
  SPICYALIEN: {
    source: "spicyalien",
    destination: RIMO_INTAKE_URL_B, // https://my.spicyrx.com/intake/qmv-07cx6s
    excludeFromFormAbTest: true,
  },
};

/**
 * Resolve a URL path segment to its affiliate config, or undefined if it isn't
 * a known affiliate (or collides with a reserved route name).
 */
export function lookupAffiliate(segment: string): Affiliate | undefined {
  if (RESERVED.has(segment.toLowerCase())) return undefined;
  return AFFILIATES[segment.toUpperCase()];
}

/**
 * Where a clicked affiliate link lands by default — the on-the-fly dial (Vercel
 * env var, no link change). Default: the marketing homepage, so
 * captureAttribution() runs on load. Per-affiliate `destination` overrides this.
 */
export const AFFILIATE_DESTINATION =
  process.env.AFFILIATE_DESTINATION ?? "https://www.spicyrx.com/";

/**
 * Build the fully-stamped destination URL for an affiliate. The affiliate UTMs
 * (source/medium/campaign) are authoritative and win; the visitor's inbound
 * click IDs / UTMs (`forward`, read off the /<CODE> request) fill any remaining
 * PARAM_KEYS so a fbclid on the vanity link carries through to the destination
 * (essential for direct-to-teleform affiliates, whose only attribution channel
 * is the params on the intake URL). Never stamps utm_term — no A/B arm tag.
 */
export function affiliateTarget(
  affiliate: Affiliate,
  forward: Record<string, string>,
): URL {
  const target = new URL(affiliate.destination ?? AFFILIATE_DESTINATION);
  target.searchParams.set("utm_source", affiliate.source);
  target.searchParams.set("utm_medium", AFFILIATE_UTM_MEDIUM);
  target.searchParams.set("utm_campaign", AFFILIATE_UTM_CAMPAIGN);
  for (const key of PARAM_KEYS) {
    const value = forward[key];
    if (value && !target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  }
  return target;
}

/**
 * Attribution-cookie snapshot to write server-side on the redirect, keyed off
 * the PATH (strip-proof). Last-touch: an affiliate click REPLACES the snapshot
 * with the affiliate UTMs + the visitor's inbound PARAM_KEYS. The sticky
 * form_arm is carried forward ONLY for affiliates that participate in the A/B
 * test; an excluded (direct-to-teleform) affiliate deliberately gets NO
 * form_arm so its sessions never bucket into the test.
 */
export function affiliateSnapshot(
  existing: Record<string, unknown>,
  affiliate: Affiliate,
  forward: Record<string, string>,
): Record<string, string> {
  const snapshot: Record<string, string> = {
    utm_source: affiliate.source,
    utm_medium: AFFILIATE_UTM_MEDIUM,
    utm_campaign: AFFILIATE_UTM_CAMPAIGN,
  };
  for (const key of PARAM_KEYS) {
    if (!(key in snapshot) && forward[key]) {
      snapshot[key] = forward[key];
    }
  }
  if (!affiliate.excludeFromFormAbTest) {
    const arm = existing[FORM_ARM_KEY];
    if (typeof arm === "string" && arm) {
      snapshot[FORM_ARM_KEY] = arm;
    }
  }
  return snapshot;
}
