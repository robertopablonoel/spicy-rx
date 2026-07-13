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
