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
/**
 * Form A/B test — arm A intake.
 *
 * 2026-08-13: retest reconfigured to a CLEAN single-variable capture-timing test
 * between two Quattro forms (same design, only where contact capture sits):
 *   arm A ("spic") → qmv-8dwnjy  — Quattro with contact capture moved EARLY
 *   arm B ("qmv")  → qmv-07cx6s  — Quattro with contact capture LATE (original)
 * (Previously arm A was sh-rhdbd4, the Sexual Health Intake — now retired from
 * the test.) Bare channel URL (no first-step slug), like arm B; Rimo resolves it
 * to the form's first step. The `spic`/`qmv` arm labels are kept as-is to avoid
 * stranding sticky cookies — they now denote early/late Quattro, not sh/qmv.
 * Hardcoded (no env indirection) — change the arm here and deploy.
 */
export const RIMO_INTAKE_URL = "https://my.spicyrx.com/intake/qmv-8dwnjy";

/**
 * Form A/B test — arm B intake. Arm A is RIMO_INTAKE_URL. Visitors are
 * sticky-assigned 50/50 in lib/form-ab.ts; the assignment is persisted as
 * `form_arm` inside the spicyrx_attribution cookie so rx-datachain can join
 * cohort → order token across the my.spicyrx.com hop. Bare channel URL — Rimo
 * resolves it to its first step. (Arm B = the LATE-capture Quattro; the control.)
 * Hardcoded (no env indirection) — change the arm here and deploy.
 */
export const RIMO_INTAKE_URL_B = "https://my.spicyrx.com/intake/qmv-07cx6s";

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
 * Passion (PT-141) intake channel — LIVE.
 *
 * The PT-141 offering is now provisioned + activated in Rimo (Cole, 2026-07-22),
 * with its OWN intake form `pt-89gox1` — distinct from Hot Sauce (`sh-rhdbd4`)
 * and the form-A/B arm B (`qmv-07cx6s`). Bare channel URL (no first-step slug);
 * Rimo resolves it to the form's first step, same as arm B. Env-overridable so
 * preview/prod can point elsewhere without a code change. The intake screens
 * eligibility (DOB, health history, state) server-side, so no CTA on the
 * marketing page can route an ineligible patient to a sale.
 *
 * Attribution: the Passion IntakeLink forwards PARAM_KEYS onto this URL via
 * withAttribution() — click-IDs + UTMs ride to Rimo exactly as on Hot Sauce.
 * (Stage 2 will additionally tag this funnel distinctly for cross-line
 * attribution; not wired yet.)
 */
export const PASSION_INTAKE_URL =
  process.env.NEXT_PUBLIC_RIMO_INTAKE_PASSION_URL ??
  "https://my.spicyrx.com/intake/pt-89gox1";
