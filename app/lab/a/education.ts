/**
 * The sell, matched to what they tapped.
 *
 * Each answer unlocks a beat at the top of the NEXT screen, so the pitch gets
 * more specific as they go without costing a screen of drop-off. The matching
 * is INVISIBLE — never "because you said X." The copy just happens to be about
 * the thing they care about. It brags about the product; it doesn't announce
 * that it's tailoring itself to them.
 *
 * This is the sales pass. Compliance is a separate agent's job downstream.
 */

export type Beat = {
  eyebrow: string;
  body: string;
};

/** After Q1 — the differentiator, sold as an outcome. */
export const AFTER_ROUTE: Record<string, Beat> = {
  eros: {
    eyebrow: "The difference",
    body: "Every pill you've tried worked on the machinery. None of them touched the wanting. Eros carries the actives you already know — and apomorphine, which goes after desire itself. Not just able. Actually wanting to.",
  },
  passion: {
    eyebrow: "The difference",
    body: "Desire isn't willpower. It's chemistry, and Passion goes straight at it. PT-141 is the only FDA-approved on-demand treatment for low desire in women — not a daily pill you wait six weeks on. Something you take when the night is actually happening.",
  },
  both: {
    eyebrow: "The difference",
    body: "Two prescriptions, built for two different bodies, aimed at the same night. Eros goes after his firmness and his wanting at once. Passion goes after hers. Neither one waits for the other to be in the mood first.",
  },
};

/** After Q2 — dose, sold as control and confidence. */
export const AFTER_STRENGTH: Record<string, Beat> = {
  low: {
    eyebrow: "Dialed to you",
    body: "You don't need the biggest dose on the shelf. You need yours. A clinician prescribes to your history and adjusts until it's right — which is the whole point of having it made for you instead of grabbing whatever the pharmacy stocks.",
  },
  mid: {
    eyebrow: "Nothing hidden",
    body: "70mg sildenafil. 20mg tadalafil. 4mg apomorphine. 94mg of actives and every milligram printed on the label. No proprietary blend, no vague promises. You will know it's working.",
  },
  max: {
    eyebrow: "Built heavy",
    body: "94mg of actives in a single 2mL dose, absorbed under your tongue instead of fighting through your stomach first. This is the strong end of what a compounding pharmacy will build. It is not a starter pill.",
  },
};

/** After Q3 — timing, sold as freedom from planning. */
export const AFTER_SPEED: Record<string, Beat> = {
  fast: {
    eyebrow: "Ready when she is",
    body: "Minutes, not an hour. Apomorphine leads — men in trial averaged 18 minutes — and held under the tongue, sildenafil is in your blood roughly six times faster at the fifteen-minute mark than a swallowed tablet. Stop planning the evening around a pill.",
  },
  long: {
    eyebrow: "Still there tomorrow",
    body: "One dose Friday night, still working Sunday morning. In trial, men were succeeding a day and a half later — 59% of attempts, more than double placebo. Nobody's watching the clock.",
  },
  both: {
    eyebrow: "Fast and long, one dose",
    body: "Apomorphine inside twenty minutes. Sildenafil holding the middle. Tadalafil carrying it into the next day. You get the first hour and the next morning out of the same two milliliters.",
  },
};

/** The reveal's ledger. Apomorphine leads — it's the one nobody else brings. */
export const LEDGER: {
  dose: string;
  name: string;
  slot: string;
  body: string;
}[] = [
  {
    dose: "4mg",
    name: "Apomorphine",
    slot: "Desire",
    body: "The one that goes after wanting. Every other pill on the market waits until you're already in the mood — apomorphine works on the part of the brain that decides you're in the mood. It's the difference between being able to and actually wanting to.",
  },
  {
    dose: "70mg",
    name: "Sildenafil",
    slot: "Firmness",
    body: "The most proven active in the category, at 70mg. In the trials that made it famous, men succeeded in 69% of attempts against 22% on placebo. Here it's the reliable floor under everything else.",
  },
  {
    dose: "20mg",
    name: "Tadalafil",
    slot: "The window",
    body: "The long weekend. 20mg of the active that keeps things open well past a single night, so one dose covers the evening and whatever happens after it.",
  },
];

/** The closer. */
export const COMBINATION: Beat = {
  eyebrow: "Three levers, one dose",
  body: "Most pills give you one thing: blood flow, for a few hours, if you're already in the mood. Eros gives you the wanting, the firmness, and the window — fast in, steady through, still there tomorrow.",
};
