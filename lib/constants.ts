/**
 * SpicyRx site-wide constants.
 *
 * Brand strings and external endpoints. The portal URL is read from env so
 * preview / prod can point at different Rimo endpoints if needed.
 */

export const BRAND_NAME = "SpicyRx";
export const BRAND_TAGLINE = "Hospital-grade power. Direct to your door.";
export const SUPPORT_EMAIL = "support@spicyrx.com";
export const PRODUCT_NAME = "Hot Sauce";

/**
 * Legal entity name. Used in footer copyright, telehealth consent, and any
 * other place where the contracting entity must be identified by its
 * registered name (not the trade name). "SpicyRx" is the brand / trade
 * name; "Noel Ventures LLC" is the entity that owns and operates it.
 */
export const LEGAL_ENTITY = "Noel Ventures LLC";

/**
 * Rimo-hosted patient portal. Marketing-site "Sign in" CTAs link here.
 * The /consult flow inside this app handles initial intake; once approved
 * a patient gets a portal account at this URL.
 */
export const RIMO_PORTAL_URL =
  process.env.NEXT_PUBLIC_RIMO_PORTAL_URL ?? "https://app.caliberrx.co";
