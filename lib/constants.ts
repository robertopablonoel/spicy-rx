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

/**
 * Form A/B test — arm B intake (new Rimo channel). Arm A is RIMO_INTAKE_URL.
 * Visitors are sticky-assigned 50/50 in lib/form-ab.ts; the assignment is
 * persisted as `form_arm` inside the spicyrx_attribution cookie so
 * rx-datachain can join cohort → order token across the my.spicyrx.com hop.
 * Note: no first-step slug here (unlike arm A) — the new channel's step
 * slugs are unknown; Rimo resolves the bare channel URL to its first step.
 */
export const RIMO_INTAKE_URL_B =
  process.env.NEXT_PUBLIC_RIMO_INTAKE_URL_B ??
  "https://my.spicyrx.com/intake/qmv-07cx6s";

export const RIMO_PORTAL_URL =
  process.env.NEXT_PUBLIC_RIMO_PORTAL_URL ?? "https://app.caliberrx.co";

/* =============================================================
   PASSION — female product line (second line under the SpicyRx brand).

   Product: PT-141 (bremelanotide), an on-demand SUBCUTANEOUS INJECTION for
   low sexual desire in women, supplied as a refrigerated multi-dose vial that
   the patient draws with an insulin syringe (NOT a prefilled pen — a
   reconstituted vial is used within 28 days, matching the "1 dose = 28 days"
   Rimo plan). Rimo offering title: "PT-141 Injections" (plan "PT-141 Standard").
   Consumer brand kept as "Passion" (Cole's call — same pattern as "Hot Sauce"
   standing in for internal "Quattro"). Pharmacy: Striker Pharmacy (Katy, TX);
   provider network: DrTelx. Pricing (per Rimo): 1mo $185 / 3mo $495 / 6mo $888.

   Status: reskin complete on branch; NOT live. Go-live gated on (a) the Rimo
   PT-141 offering being ACTIVATED (currently inactive — Cole's Rimo click) and
   (b) a LegitScript compliance pass on the restored claim classes.
   ============================================================= */

export const PASSION_PRODUCT_NAME = "Passion";
export const PASSION_TAGLINE = "Desire, on your terms.";

/**
 * Passion (PT-141) intake channel.
 *
 * TODO(rimo): the PT-141 offering gets its OWN Rimo sales-channel/intake ID
 * once it is provisioned + activated. Until then this falls back to the Hot
 * Sauce intake URL so the CTAs are wired end-to-end — set
 * NEXT_PUBLIC_RIMO_INTAKE_PASSION_URL to the real PT-141 intake URL the moment
 * the channel exists (Stage-2 will also tag this funnel distinctly for
 * attribution). The exact PT-141 intake form ID is still OPEN (see Cole).
 */
export const PASSION_INTAKE_URL =
  process.env.NEXT_PUBLIC_RIMO_INTAKE_PASSION_URL ?? RIMO_INTAKE_URL;
