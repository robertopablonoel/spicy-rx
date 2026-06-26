/**
 * SpicyRx site-wide constants.
 *
 * Brand strings and external endpoints. The portal URL is read from env so
 * preview / prod can point at different Rimo endpoints if needed.
 */

export const BRAND_NAME = "SpicyRx";
// Compliance 2026-06-05: "Hospital-grade power…" retired pre-LegitScript
// (potency claim). Revisit post-approval.
export const BRAND_TAGLINE = "Clinician-prescribed. Direct to your door.";
export const SUPPORT_EMAIL = "support@spicyrx.com";
export const PRODUCT_NAME = "Hot Sauce";

/**
 * Public contact info — REQUIRED by LegitScript (an email address alone is
 * insufficient; a phone number and mailing address must be visible to
 * site users). Rendered in the footer Contact block.
 *
 * TODO(cole/roberto): replace BOTH placeholders with the real business
 * line + business mailing address before the LegitScript re-review.
 * Per standing policy these must be BUSINESS contacts — never personal
 * phone numbers. Env-overridable so prod can be set without a code change.
 */
export const SUPPORT_PHONE =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "+1 (XXX) XXX-XXXX";
export const BUSINESS_ADDRESS =
  process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
  "The Cubes Company LLC\n[business mailing address pending]";

/**
 * Legal entity name. Used in footer copyright, telehealth consent, and any
 * other place where the contracting entity must be identified by its
 * registered name (not the trade name). "SpicyRx" is the brand / trade
 * name; "The Cubes Company LLC" is the entity that owns and operates it
 * (Delaware LLC, file no. 3296198; EIN 99-2049520 — the IRS recorded the
 * EIN under "Cubes Company LLC", dropping the leading "The").
 */
export const LEGAL_ENTITY = "The Cubes Company LLC";

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

/* =============================================================
   GOOGLE ADS — conversion tracking.

   The marketing site never sees the purchase (the card submit happens on
   Rimo, my.spicyrx.com). The site-side tag's jobs are (1) the gclid
   conversion-linker, and (2) an upper-funnel "Begin Consultation"
   conversion fired on CTA click — the launch optimization signal until
   Rimo-side Purchase reporting (offline import keyed on the forwarded
   gclid) is wired. Remarketing/personalization stays OFF — Google bars
   personalized ads for ED / sensitive health (see GoogleAds.tsx).

   The conversion ID is PUBLIC (it ships in every advertiser's page source),
   so it's hardcoded as the default and ships live on deploy — no Vercel
   env var required. Env-overridable if it ever needs to change per env.
   ============================================================= */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-18275822466";

/**
 * Conversion label for the upper-funnel "Begin Consultation" action.
 * Created in the Google Ads UI (Goals → Conversions → new Website action,
 * gtag event method) — paste the label here or set the env var. While it's
 * empty the base tag is still live; the CTA conversion event safely no-ops.
 */
export const GOOGLE_ADS_CONSULT_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONSULT_LABEL ?? "";

/* =============================================================
   PASSION — female product line (second line under the SpicyRx brand).

   Status: DESIGN SPIKE. "Passion" is the Rimo offering name and is a
   PLACEHOLDER consumer name (subject to rebrand, exactly like "Hot Sauce"
   stands in for "Quattro"). Formulation per Rimo: Tadalafil 10mg /
   Bremelanotide 10mg / Pregnenolone 10mg, PRN, 12 tablets.
   ============================================================= */

export const PASSION_PRODUCT_NAME = "Passion"; // placeholder — rebrand TBD
export const PASSION_TAGLINE = "Desire, on your terms.";

/**
 * Passion intake channel.
 *
 * TODO(rimo): Passion is a separate Rimo offering and will get its OWN
 * sales-channel ID once Roberto provisions it (Cole doesn't yet have
 * access to the SpicyRx Rimo workspace where channels are created).
 * Until then this falls back to the Hot Sauce intake URL so the CTAs
 * are wired end-to-end — repoint NEXT_PUBLIC_RIMO_INTAKE_PASSION_URL
 * the moment the real channel exists.
 */
export const PASSION_INTAKE_URL =
  process.env.NEXT_PUBLIC_RIMO_INTAKE_PASSION_URL ?? RIMO_INTAKE_URL;
