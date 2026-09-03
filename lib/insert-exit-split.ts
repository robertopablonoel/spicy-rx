/**
 * Insert-card lander EXIT SPLIT — experiment `insert-exit-2026-09`.
 *
 * THE QUESTION: after a card-holder finishes the quiz, is it better to hand
 * them to the full Eros landing page, or send them straight into the intake
 * form? Both arms see the identical quiz, so the quiz is the constant and the
 * extra page is the only variable.
 *
 *   lander → https://www.spicyrx.com/eros   (quiz → lander → intake)
 *   direct → my.spicyrx.com/intake/…        (quiz → intake)
 *
 * MEASURED ON LEADS PER SCAN, not on intake starts. Intake-starts is a rigged
 * comparison — the `direct` arm wins it by construction, since going straight
 * to the form IS an intake start. Scans are the common denominator both arms
 * share, so leads ÷ scans is the only honest read. The lander arm wins if
 * educating harder converts better; it loses if the extra click costs more
 * than the education earns.
 *
 * WHY A NEW PARAM: every slot in PARAM_KEYS was already claimed, and utm_term
 * is double-claimed as it is (the form A/B writes arm_spic/arm_qmv while the
 * post-purchase quiz writes quiz-a/quiz-b). Adding `sc_exit` follows the
 * precedent set when sc_dest was introduced for the destination split: a fresh
 * sc_* key inherits capture, cookie persistence and forward-to-Rimo for free,
 * because every loop in the codebase iterates PARAM_KEYS.
 *
 * Assignment happens SERVER-SIDE on the /qr/<code> redirect and is sticky by
 * cookie, so a re-scan never reshuffles the arm. Kept directive-free so the
 * route handler can import it.
 */

import { EROS_INTAKE_URL, PASSION_INTAKE_URL } from "@/lib/constants";

export const EXIT_EXPERIMENT_ID = "insert-exit-2026-09";

export const EXIT_ARMS = ["lander", "direct"] as const;
export type ExitArm = (typeof EXIT_ARMS)[number];

/** Sticky per-visitor arm. Separate cookie from the attribution snapshot so a
 *  last-touch replacement can never wipe an assignment mid-experiment. */
export const EXIT_COOKIE_NAME = "sc_exit_arm";
export const EXIT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** The param the arm rides on, into the cookie and onward to Rimo. */
export const EXIT_PARAM = "sc_exit";

/** The product line the quiz routed to. "both" resolves to eros. */
export type ExitLine = "eros" | "passion";

/**
 * Passion's first-month coupon, applied on the intake URL exactly the way
 * `eros1` is — Rimo auto-applies it, so the price promised on the lander is
 * the price seen at checkout. That mismatch is what lost a buyer who had
 * completed the entire medical form on the post-purchase quiz, before coupon
 * auto-apply was added there.
 *
 * Hardcoded rather than env-driven, matching how eros1 is baked in below: a
 * NEXT_PUBLIC_* value is inlined at build time, so an env var would still
 * require a redeploy to take effect and buys nothing over a constant. The env
 * override remains for a temporary swap without a code change.
 *
 * PASSION_OFFER_READY gates the $1 promise on the women's path; with a coupon
 * present it is now true, which turns on the $1 box, the "$1" line on screen
 * one, and the couponed handoff together.
 */
export const PASSION_COUPON =
  process.env.NEXT_PUBLIC_PASSION_COUPON ?? "passion1";
export const PASSION_OFFER_READY =
  PASSION_COUPON.length > 0 ||
  Boolean(process.env.NEXT_PUBLIC_EXIT_DIRECT_PASSION_URL);

/**
 * Where the quiz sends the visitor, by arm AND by line. Both dimensions
 * matter: the `direct` arm has to land on the RIGHT intake form with the right
 * coupon, and the `lander` arm has to land on the right product page. Keying
 * only on the arm sent every woman to the Eros intake.
 * Every leg is env-overridable so it can be re-pointed without a deploy.
 */
export const EXIT_DESTINATIONS: Record<ExitArm, Record<ExitLine, string>> = {
  lander: {
    eros:
      process.env.NEXT_PUBLIC_EXIT_LANDER_URL ?? "https://www.spicyrx.com/eros",
    passion:
      process.env.NEXT_PUBLIC_EXIT_LANDER_PASSION_URL ??
      "https://www.spicyrx.com/passion",
  },
  direct: {
    eros:
      process.env.NEXT_PUBLIC_EXIT_DIRECT_URL ??
      `${EROS_INTAKE_URL}?coupon=eros1`,
    passion:
      process.env.NEXT_PUBLIC_EXIT_DIRECT_PASSION_URL ??
      (PASSION_COUPON
        ? `${PASSION_INTAKE_URL}?coupon=${PASSION_COUPON}`
        : PASSION_INTAKE_URL),
  },
};

export function isExitArm(value: unknown): value is ExitArm {
  return typeof value === "string" && (EXIT_ARMS as readonly string[]).includes(value);
}

/** 50/50 for a fresh visitor. crypto is available in the node + edge runtimes. */
export function coinFlipExitArm(): ExitArm {
  return crypto.getRandomValues(new Uint8Array(1))[0] < 128 ? "lander" : "direct";
}

/**
 * Resolve the arm for this request: an existing cookie wins (sticky), else a
 * fresh coin flip. Returns the arm plus whether it was newly assigned, so the
 * caller knows if it needs to write the cookie and fire an assignment event.
 */
export function resolveExitArm(cookieValue: string | undefined): {
  arm: ExitArm;
  assigned: boolean;
} {
  if (isExitArm(cookieValue)) return { arm: cookieValue, assigned: false };
  return { arm: coinFlipExitArm(), assigned: true };
}

/**
 * The finished-quiz destination for an arm + line, as a bare URL string.
 * Attribution (PARAM_KEYS, including sc_exit itself) is merged on by the
 * client CTA via withAttribution() so click-IDs and UTMs ride to Rimo.
 */
export function exitTarget(arm: ExitArm, line: ExitLine = "eros"): string {
  return EXIT_DESTINATIONS[arm][line];
}
