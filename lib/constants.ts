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
 * Rimo two-surface architecture:
 *
 *   RIMO_INTAKE_URL  — patient-facing sales channel (SpicyRx-branded)
 *                      where new visitors begin a consultation. Primary
 *                      target for every Hero / Navbar "Start consultation"
 *                      CTA on the marketing site.
 *
 *   RIMO_PORTAL_URL  — returning-patient portal (Caliber-branded for now).
 *                      Existing customers log in here after a prescription
 *                      is issued. Pending Rimo decision on whether to
 *                      re-provision under spicyrx.com to match the intake brand.
 *
 * Both default to the live Rimo-provisioned URLs; override per environment
 * via Vercel env vars if Rimo cuts a new sales channel or moves the portal.
 */
export const RIMO_INTAKE_URL =
  process.env.NEXT_PUBLIC_RIMO_INTAKE_URL ??
  "https://my.spicyrx.com/intake/sh-rhdbd4/date-of-birth";

export const RIMO_PORTAL_URL =
  process.env.NEXT_PUBLIC_RIMO_PORTAL_URL ?? "https://app.caliberrx.co";
