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

export const PRODUCT_NAME = "Quattro";
export const PRODUCT_TAGLINE = "Sublingual ED treatment, prescribed online.";

/** Header attached by middleware.ts for downstream state-restriction logic. */
export const STATE_HEADER = "x-user-state";
