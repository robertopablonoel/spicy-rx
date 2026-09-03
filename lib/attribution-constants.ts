/**
 * Attribution constants shared by client + server.
 *
 * Kept directive-free (no "use client") so both the client capture utility
 * (lib/attribution.ts) and server components (the /consult redirect) can
 * import them without dragging client-only code across the boundary.
 */

export const PARAM_KEYS = [
  "fbclid", // Meta click ID
  "gclid", // Google click ID
  "ttclid", // TikTok click ID
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "sc_order", // Spicy Cubes checkout_token — forwarded onto the Rimo intake URL for cross-brand order attribution
  "sc_exit", // Insert-card lander EXIT-split arm (experiment insert-exit-2026-09): "lander" = quiz hands off to /eros, "direct" = quiz hands off straight to the Rimo intake. MINTED SERVER-SIDE by the /qr/<code> insert redirect (lib/insert-exit-split.ts), written to a sticky sc_exit_arm cookie AND onto the landing URL, then forwarded onto the intake URL so a lead joins back to its arm. Judged on LEADS PER SCAN — intake-starts is rigged toward "direct" by construction. One-param-one-experiment: distinct from sc_dest (typ/halo destination split), utm_content (card design: playing-card/black-card) and utm_term (form A/B arm).
  "sc_dest", // Destination-split A/B arm (experiment spicyrx-destination-2026-08): "control" = spicyrx.com root, "eros" = /eros. MINTED SERVER-SIDE by the /go/<surface> redirect middleware (lib/destination-split.ts), written into the attribution cookie AND onto the landing URL, then forwarded onto the Rimo intake URL so a purchase joins to its destination arm at the order level. The strip-proof PRIMARY marker is the landing PATH (/ vs /eros); sc_dest is the order-level convenience join. One-param-one-experiment: does NOT touch utm_content (surface + IG halo arm) or utm_term (form A/B arm).
] as const;

export const STORAGE_KEY = "spicyrx_attribution";
export const COOKIE_NAME = "spicyrx_attribution";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Form A/B test assignment, stored as a dedicated field INSIDE the
 * spicyrx_attribution cookie JSON (rx-datachain contract, fleet msg #102).
 * Deliberately NOT in PARAM_KEYS: it is never captured from a landing URL
 * and never forwarded onto the intake URL as its own param — the arm rides
 * utm_term instead (see lib/form-ab-shared.ts), and only when utm_term is
 * free so real campaign terms are never stomped.
 */
export const FORM_ARM_KEY = "form_arm";
