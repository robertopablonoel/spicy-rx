/**
 * Register-matched education for the insert-card quiz.
 *
 * Each answer unlocks a teaching beat that renders at the top of the NEXT
 * screen — so the quiz teaches three things without costing a single extra
 * screen of drop-off, and every beat is picked by something they actually
 * tapped. Same product, different register.
 *
 * Sources for the numbers: EU Uprima SmPC; FDA VIAGRA / CIALIS / VYLEESI
 * labels; Heaton World J Urol 2001 (n=854); Porst Urology 2003 (n=348);
 * Cuomo Front Pharmacol 2018 (n=20).
 */

export type Beat = {
  eyebrow: string;
  body: string;
};

/** After Q1 — the hook. Central vs vascular. */
export const AFTER_ROUTE: Record<string, Beat> = {
  eros: {
    eyebrow: "Worth knowing",
    body: "Viagra works on the plumbing. So does Cialis. So does every pill anyone has ever handed you. Eros carries both of those — and a third active that never touches a blood vessel. That one works upstairs.",
  },
  passion: {
    eyebrow: "Worth knowing",
    body: "PT-141 started life as a tanning drug. Arizona, 1989 — the lab was chasing a sunless tan, and the volunteers reported something nobody was looking for. Thirty years later it's the only FDA-approved on-demand treatment for low desire in women.",
  },
  both: {
    eyebrow: "Worth knowing",
    body: "The two lines work at completely different addresses. Eros pairs two vascular actives with one that acts in the brain. Passion is PT-141, which comes in through the melanocortin system. Different molecules, different prescriptions, different clinicians.",
  },
};

/** After Q2 — dose, in their register. */
export const AFTER_STRENGTH: Record<string, Beat> = {
  low: {
    eyebrow: "Because you said a little goes a long way",
    body: "Then you don't need a bigger dose. You need the right one. A clinician sets it from your history and moves it if it's wrong — that's the whole reason this is compounded instead of pulled off a shelf.",
  },
  mid: {
    eyebrow: "Because you said noticeable, no guessing",
    body: "70mg sildenafil. 20mg tadalafil. 4mg apomorphine. 94mg of actives and every one of them printed on the label. No proprietary blend. Nothing rounded down.",
  },
  max: {
    eyebrow: "Because you said as strong as they make it",
    body: "94mg across three molecules, in two milliliters under your tongue — and that last part isn't packaging. Swallow apomorphine and first-pass metabolism destroys it: an ingested dose retains 1–2% of the activity. Under the tongue is the only reason this molecule works by mouth at all.",
  },
};

/** After Q3 — which molecule does what, with the real numbers. */
export const AFTER_SPEED: Record<string, Beat> = {
  fast: {
    eyebrow: "Because you said fast",
    body: "Apomorphine moves first — median 18 minutes to erection in trial. And held under the tongue, sildenafil reaches roughly six times the blood level at fifteen minutes that a swallowed tablet does. Fewer headaches with it, too. 5% instead of 35%.",
  },
  long: {
    eyebrow: "Because you said a longer window",
    body: "348 men. One 20mg dose of tadalafil. Thirty-six hours later, 59% of attempts worked — against 28% on placebo. And thirty-six hours isn't where the effect ran out. It's where the researchers stopped measuring.",
  },
  both: {
    eyebrow: "Because you said both",
    body: "Then you want all three, and that's the actual build. Apomorphine at eighteen minutes. Sildenafil through the first hour. Tadalafil still measurably working tomorrow night. One dose, three clocks.",
  },
};

/** The reveal's deep block. Apomorphine first — it's the one nobody else brings. */
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
    body: "No morphine in it, and not an opioid — the label says so outright. It's a dopamine agonist from 1869 that was treating Parkinson's in 1951, six years before anyone knew what dopamine did. 4mg is the dose from the largest erectile trial ever run on it: 854 men, 8,263 tablets.",
  },
  {
    dose: "70mg",
    name: "Sildenafil",
    slot: "The body · vascular",
    body: "Here's what nobody tells you about it. Sildenafil doesn't cause an erection — its own FDA label says it has no effect without arousal. Your body sends the signal. Sildenafil stops the enzyme that wipes it out.",
  },
  {
    dose: "20mg",
    name: "Tadalafil",
    slot: "The body · the window",
    body: "Same enzyme, far longer reach — a half-life about four and a half times sildenafil's. That's why there are two of these in here instead of more of one.",
  },
];

/** The closer. Why these three belong in one dose. */
export const COMBINATION: Beat = {
  eyebrow: "Why these three, together",
  body: "Apomorphine's signal runs dopamine, then oxytocin, then nitric oxide, and lands on cGMP — the exact molecule sildenafil and tadalafil exist to protect. One active opens the tap. The other two plug the drain. Same destination, opposite directions.",
};
