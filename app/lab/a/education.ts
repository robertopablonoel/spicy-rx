/**
 * Register-matched education for the quiz-router.
 *
 * THE STRUCTURAL IDEA: education rides along with the questions instead of
 * being dumped at the reveal. Each answer a visitor taps unlocks a short
 * teaching beat that appears at the TOP OF THE NEXT SCREEN — so the quiz gets
 * substantially more educational without adding a single screen of drop-off.
 * By the reveal they have been taught three things, each one chosen because
 * they asked for it.
 *
 * REGISTER MATCHING: the same fact is taught in different words depending on
 * what they clicked. Someone who said "as strong as they make it" gets the
 * milligram ledger; someone who said "a little goes a long way" gets the
 * titration story. Identical underlying pharmacology, different register.
 * This is the lever the post-purchase quiz proved: the performance cohort
 * clicked 0/15 on desire-register copy while desire/connection converted
 * 20-25% on the same offer.
 *
 * SOURCING RULE: every line here must be traceable to either the live,
 * compliance-reviewed copy in lib/content-eros.ts or to cited pharmacology.
 * Never invent a mechanism, a dose, or an ingredient. A previous generator
 * invented "micro-dosed nitrate" — contraindicated with PDE5 inhibitors.
 *
 * CLAIM TIERS: `tier` marks what kind of claim each beat makes, so the whole
 * set can be audited at a glance and duration/PK claims can be switched off
 * wholesale if the ad-adjacency rule is enforced on this surface.
 *   "composition" — a milligram or format fact. Safest.
 *   "mechanism"   — what a molecule does biochemically. Allowed post-LegitScript.
 *   "duration"    — onset/window claims on a named Rx molecule. The 06-card
 *                   pull order barred these on ad-adjacent surfaces; this page
 *                   inherits the global Google Ads gtag, so treat as gated.
 */

export type ClaimTier = "composition" | "mechanism" | "duration";

export type Beat = {
  /** Short mono eyebrow — frames WHY they're being told this. */
  eyebrow: string;
  /** The teaching sentence(s). */
  body: string;
  tier: ClaimTier;
};

/** Taught after Q1 (who it's for) — the body+brain thesis, in their register. */
export const AFTER_ROUTE: Record<string, Beat> = {
  eros: {
    eyebrow: "Worth knowing",
    body: "Most ED medicine works on one thing: blood flow. Eros carries two actives for that — and a third, apomorphine, that works in the brain instead of the bloodstream.",
    tier: "mechanism",
  },
  passion: {
    eyebrow: "Worth knowing",
    body: "Passion is PT-141 (bremelanotide) — the same molecule as Vyleesi. It works through the brain's melanocortin pathway rather than on blood flow, and it's taken on demand rather than daily.",
    tier: "mechanism",
  },
  both: {
    eyebrow: "Worth knowing",
    body: "The two lines work differently on purpose. Eros pairs vascular actives with a brain-side one; Passion is PT-141, which acts centrally. Different prescriptions, different clinicians.",
    tier: "mechanism",
  },
};

/** Taught after Q2 (strength) — the dose story, matched to how much they want. */
export const AFTER_STRENGTH: Record<string, Beat> = {
  low: {
    eyebrow: "Because you said a little goes a long way",
    body: "Dose isn't fixed. A clinician sets it from your health history, and it can be adjusted later — compounding exists precisely so the amount can be matched to the person.",
    tier: "composition",
  },
  mid: {
    eyebrow: "Because you said noticeable, no guessing",
    body: "Every milligram is disclosed: 70mg sildenafil, 20mg tadalafil, 4mg apomorphine. 94mg of actives in one 2mL dose — nothing proprietary, nothing hidden.",
    tier: "composition",
  },
  max: {
    eyebrow: "Because you said as strong as they make it",
    body: "94mg of actives across three molecules, held under the tongue rather than swallowed. The apomorphine sits at 4mg — the top of the clinically studied range for sublingual apomorphine.",
    tier: "composition",
  },
};

/** Taught after Q3 (how it should work) — which molecule does what. */
export const AFTER_SPEED: Record<string, Beat> = {
  fast: {
    eyebrow: "Because you said fast",
    body: "Sildenafil is the fast half of the vascular pair. Sublingual delivery matters here too — held under the tongue, it absorbs directly rather than passing through the gut first.",
    tier: "duration",
  },
  long: {
    eyebrow: "Because you said a longer window",
    body: "Tadalafil is the longer-acting half of the pair. It's the reason the formula carries two PDE5 actives instead of one — they have different profiles.",
    tier: "duration",
  },
  both: {
    eyebrow: "Because you said both",
    body: "That's the actual design. Two PDE5 actives with different profiles, plus apomorphine on the brain side — three molecules doing three different jobs in one dose.",
    tier: "mechanism",
  },
};

/**
 * The deep block on the reveal. Ordered apomorphine-first because it is the
 * differentiator and the only one a PDE5-only pill doesn't carry.
 */
export const LEDGER: {
  dose: string;
  name: string;
  slot: string;
  body: string;
  tier: ClaimTier;
}[] = [
  {
    dose: "4mg",
    name: "Apomorphine",
    slot: "The brain · dopamine",
    body: "Engages dopamine pathways tied to arousal and sexual motivation. Despite the name it is not an opioid and contains no morphine — it is a dopamine agonist, and it is the active most pills never bring.",
    tier: "mechanism",
  },
  {
    dose: "70mg",
    name: "Sildenafil",
    slot: "The body · vascular",
    body: "A PDE5 active that supports blood flow and firmness — the part of the response you already know, and the fast half of the vascular pair.",
    tier: "mechanism",
  },
  {
    dose: "20mg",
    name: "Tadalafil",
    slot: "The body · window",
    body: "The longer-acting PDE5 active. Two PDE5 molecules with different profiles, rather than more of one.",
    tier: "mechanism",
  },
];
