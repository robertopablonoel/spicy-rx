/**
 * SpicyRx site-wide constants.
 *
 * Brand and routing strings live here so they can be swapped in one place.
 * The portal URL is read from env so preview / prod can point at different
 * Rimo endpoints if needed.
 */

export const BRAND_NAME = "SpicyRx";
export const SUPPORT_EMAIL = "support@spicyrx.com";

/**
 * Rimo-hosted patient portal. Marketing-site CTAs link here.
 * Pending Rimo confirmation on whether portal stays at app.caliberrx.co
 * or gets re-provisioned at app.spicyrx.com.
 */
export const RIMO_PORTAL_URL =
  process.env.NEXT_PUBLIC_RIMO_PORTAL_URL ?? "https://app.caliberrx.co";

/**
 * Public product name for the SpicyRx Rx line. The Rimo-side internal name
 * for the formulation is "Quattro sublingual" — we surface "Hot Sauce" as the
 * brand-facing name, callback to the Spicy Cubes flavor lineage without
 * importing the supplement voice.
 */
export const PRODUCT_NAME = "Hot Sauce";
export const PRODUCT_TAGLINE =
  "ED treatment, without the clinic visit.";

/** Header attached by middleware.ts for downstream state-restriction logic. */
export const STATE_HEADER = "x-user-state";
