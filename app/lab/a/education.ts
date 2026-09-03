/**
 * Register-matched education for the insert-card quiz.
 *
 * ── NOTE FOR THE COMPLIANCE AGENT ──────────────────────────────────────────
 * This file is written marketing-first, by instruction. It is NOT compliance-
 * reviewed. Four things to rule on specifically:
 *   1. Efficacy figures are quoted with real trial numbers (36h tadalafil,
 *      apomorphine onset, sublingual serum multiples). Decide the hedging.
 *   2. Named Rx molecules carry onset/duration statements throughout.
 *   3. The page inherits the global Google Ads gtag from app/layout.tsx.
 *   4. Combination language describes MECHANISM only. Nothing here claims the
 *      three-drug combination is clinically proven, because it has never been
 *      trialed — that limit is factual, not stylistic, so please keep it.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * THE STRUCTURAL IDEA: education rides along with the questions rather than
 * being dumped at the reveal. Each answer unlocks a teaching beat that renders
 * at the top of the NEXT screen, so the quiz teaches three things without
 * costing a single extra screen of drop-off — and every beat is chosen by
 * something the visitor actually clicked, so the register matches. That
 * register-matching is the one lever with hard evidence behind it: in the
 * post-purchase quiz the performance cohort clicked 0/15 on desire-register
 * copy while desire/connection converted 20-25% on the identical offer.
 *
 * ACCURACY RULES (these are truth constraints, not compliance ones):
 *  - Never invent a molecule, dose, mechanism or statistic. A prior generator
 *    invented "micro-dosed nitrate" — contraindicated with PDE5 inhibitors.
 *  - Apomorphine does NOT increase desire in men. Its phase III program moved
 *    four of five IIEF domains and left sexual desire flat; Danjou 1988 found
 *    "increased tumescence and rigidity without modifications of sexual
 *    arousal." The old spine ("it makes you want it") is contradicted by the
 *    trial data and is deliberately absent here. What IS true and label-backed
 *    is the ROUTE: apomorphine acts centrally, not on blood vessels.
 *  - Do NOT restore "4mg is the top of the clinically studied range." 5mg and
 *    6mg were trialed in 569 men (Dula 2000), and sublingual apomorphine is
 *    FDA-approved at 10-30mg for Parkinson's. The true fact is better: 4mg is
 *    the dose from the largest apomorphine erectile trial ever run.
 *
 * SOURCES: EU Uprima SmPC; FDA VIAGRA/CIALIS/VYLEESI labels; Heaton World J
 * Urol 2001 (n=854); Dula Urology 2000 (n=569); Porst Urology 2003 (n=348);
 * Cuomo Front Pharmacol 2018 (n=20); Danjou BJCP 1988.
 */

export type Beat = {
  /** Mono eyebrow — frames why they're being told this, in their words. */
  eyebrow: string;
  /** The teaching copy. */
  body: string;
};

/** Taught after Q1 — the central-vs-vascular hook, the real differentiator. */
export const AFTER_ROUTE: Record<string, Beat> = {
  eros: {
    eyebrow: "Worth knowing",
    body: "Every ED pill you've heard of works on the plumbing — blood flow, and nothing else. Eros carries two of those. The third active, apomorphine, doesn't touch a blood vessel. It works in the brain.",
  },
  passion: {
    eyebrow: "Worth knowing",
    body: "Passion is PT-141 — a molecule discovered by accident. Researchers were building a sunless tanning drug; the phase I volunteers reported something else entirely. Twenty-three years later it became the only FDA-approved on-demand treatment for low desire in premenopausal women.",
  },
  both: {
    eyebrow: "Worth knowing",
    body: "The two lines work at completely different addresses. Eros pairs vascular actives with one that acts in the brain. Passion is PT-141, which works through the melanocortin system. Different prescriptions, different clinicians.",
  },
};

/** Taught after Q2 — the dose story, matched to how much they said they want. */
export const AFTER_STRENGTH: Record<string, Beat> = {
  low: {
    eyebrow: "Because you said a little goes a long way",
    body: "Nothing here is a fixed dose off a shelf. A clinician sets it from your health history and can adjust it later — that's the entire reason this is compounded rather than a stock tablet.",
  },
  mid: {
    eyebrow: "Because you said noticeable, no guessing",
    body: "Every milligram is on the label: 70mg sildenafil, 20mg tadalafil, 4mg apomorphine. 94mg of actives in a 2mL dose under the tongue. No proprietary blend, no hidden amounts.",
  },
  max: {
    eyebrow: "Because you said as strong as they make it",
    body: "94mg across three molecules — and the delivery is doing real work. Swallow apomorphine and first-pass metabolism destroys it: the regulatory label puts an ingested dose at 1–2% of the activity of an injection. Under the tongue is the only reason this molecule works by mouth at all.",
  },
};

/** Taught after Q3 — which molecule does what, with the real numbers. */
export const AFTER_SPEED: Record<string, Beat> = {
  fast: {
    eyebrow: "Because you said fast",
    body: "Apomorphine is the quickest thing in the formula — median time to erection in its trials was 18 to 19 minutes. And sublingual sildenafil shows roughly six times the serum level at fifteen minutes compared with a swallowed tablet, with headache reported in 5% of men instead of 35%.",
  },
  long: {
    eyebrow: "Because you said a longer window",
    body: "Tadalafil is the long half, and the number behind it is a real trial result: 348 men, a single 20mg dose, intercourse attempted 36 hours later — 59.2% of attempts succeeded, against 28.3% on placebo. 36 hours wasn't where the effect stopped. It's where the study stopped looking.",
  },
  both: {
    eyebrow: "Because you said both",
    body: "That's the actual design, and it's layered. Apomorphine arrives first, around the 18-minute mark. Sildenafil peaks near the first hour. Tadalafil is still measurably working a day and a half later. Three molecules, three different jobs, one dose.",
  },
};

/**
 * The reveal's deep block. Apomorphine first — it's the one a PDE5-only pill
 * doesn't carry, and the only non-redundant mechanism in the formula.
 */
export const LEDGER: {
  dose: string;
  name: string;
  slot: string;
  body: string;
}[] = [
  {
    dose: "4mg",
    name: "Apomorphine",
    slot: "The brain · dopamine",
    body: "Despite the name it contains no morphine and is not an opioid — the label says so outright. It's a dopamine agonist, first synthesized in 1869, and it was treating Parkinson's in 1951, six years before anyone knew dopamine was a neurotransmitter. 4mg is the dose from the largest erectile trial ever run on it: 854 men, 8,263 tablets.",
  },
  {
    dose: "70mg",
    name: "Sildenafil",
    slot: "The body · vascular",
    body: "The part you already know — and it works differently than most people think. Sildenafil doesn't cause an erection. Its own FDA label states it has no direct relaxant effect and no effect without arousal. Your body makes the signal; sildenafil stops the enzyme that erases it.",
  },
  {
    dose: "20mg",
    name: "Tadalafil",
    slot: "The body · window",
    body: "The same enzyme, a much longer tail. Its half-life is about four and a half times sildenafil's, which is why the formula carries two PDE5 molecules with different profiles rather than more of one.",
  },
];

/**
 * The single most elegant true thing about this formula, and the reason the
 * brain-side active and the vascular pair belong in the same dose. Straight
 * from the Uprima label's own description of the pathway.
 *
 * Note what this deliberately does NOT say: that the combination is proven.
 * No trial of these three molecules together has ever been run.
 */
export const COMBINATION: Beat = {
  eyebrow: "Why these three, together",
  body: "The regulatory label traces apomorphine's whole chain: dopamine, then oxytocin, then nitric oxide, and finally cGMP — the exact molecule sildenafil and tadalafil exist to protect. One active opens the tap. The other two stop the drain. They arrive at the same place from opposite ends.",
};
