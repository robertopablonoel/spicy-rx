/**
 * Form A/B test — arm model + URL helpers, shared by client and server.
 *
 * Single-variable test: ONLY the destination Rimo intake form differs by arm.
 *   'spic' → RIMO_INTAKE_URL   (current channel sh-rhdbd4, arm A / control)
 *   'qmv'  → RIMO_INTAKE_URL_B (new channel qmv-07cx6s,   arm B / variant)
 *
 * The arm is observable at two points (rx-datachain contract, fleet msg #102):
 *   1. `form_arm` field inside the spicyrx_attribution cookie — the
 *      assignment denominator, written the instant a visitor is assigned.
 *   2. Rimo's manual exports — primarily by FORM IDENTITY (each channel
 *      exports separately), secondarily via utm_term=arm_spic|arm_qmv.
 *      utm_term is only stamped when the visitor carries no real utm_term
 *      of their own, so campaign terms always win; form identity + cookie
 *      still recover the arm in that case. Values are namespaced with the
 *      `arm_` prefix so they can never be confused with the halo test's
 *      treatment/treatment2 values.
 *
 * Kept directive-free so both the client CTA path (lib/form-ab.ts) and the
 * /consult route handler can import it.
 */

import { RIMO_INTAKE_URL, RIMO_INTAKE_URL_B } from "@/lib/constants";

export const FORM_ARMS = ["spic", "qmv"] as const;
export type FormArm = (typeof FORM_ARMS)[number];

export function isFormArm(value: unknown): value is FormArm {
  return FORM_ARMS.includes(value as FormArm);
}

export const FORM_ARM_UTM_TERM: Record<FormArm, string> = {
  spic: "arm_spic",
  qmv: "arm_qmv",
};

export function pickRandomArm(): FormArm {
  return Math.random() < 0.5 ? "spic" : "qmv";
}

export function intakeUrlForArm(arm: FormArm): string {
  return arm === "qmv" ? RIMO_INTAKE_URL_B : RIMO_INTAKE_URL;
}

/**
 * Stamp the arm onto the intake URL as utm_term — only if utm_term is still
 * free. Call AFTER attribution forwarding so a visitor's real campaign
 * utm_term (already on the URL by then) takes precedence.
 */
export function withArmTerm(url: string, arm: FormArm): string {
  try {
    const target = new URL(url);
    if (!target.searchParams.has("utm_term")) {
      target.searchParams.set("utm_term", FORM_ARM_UTM_TERM[arm]);
    }
    return target.toString();
  } catch {
    return url;
  }
}
