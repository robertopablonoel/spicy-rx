/**
 * Insert-card lander copy, one complete object per product line.
 *
 * STRUCTURED THIS WAY ON PURPOSE. The first version shared a single set of
 * question beats across both lines and gated only the ingredient ledger — so a
 * woman tapping through the quiz was told "70mg sildenafil, 20mg tadalafil,
 * 4mg apomorphine" and given PDE5 fair balance about nitrates. Wrong product,
 * wrong molecule, wrong risks. Splitting the copy into two whole objects makes
 * that class of bug impossible: the component selects ONE line and can only
 * render what that line owns.
 *
 * The two products sell the same END STATE — wanting it again — and share a
 * register. They share nothing else. Eros is a three-molecule sublingual
 * stack. Passion is a single peptide, injected, working through an entirely
 * different receptor system.
 *
 * Each answer unlocks a beat at the top of the NEXT screen, so the pitch gets
 * more specific as they go without costing a screen of drop-off. The matching
 * is INVISIBLE — never "because you said X." The copy simply happens to be
 * about the thing they care about.
 *
 * This is the sales pass. Compliance is a separate agent's job downstream.
 */

export type Beat = {
  eyebrow: string;
  body: string;
};

export type Question = {
  prompt: string;
  options: readonly (readonly [string, string])[];
};

export type Ingredient = {
  dose: string;
  name: string;
  slot: string;
  body: string;
};

export type ProductCopy = {
  /** Unlocked by Q1 — the differentiator, sold as an outcome. */
  afterRoute: Beat;
  q2: Question;
  q3: Question;
  /** Unlocked by the Q2 answer, shown atop Q3. */
  afterQ2: Record<string, Beat>;
  /** Unlocked by the Q3 answer, shown on the reveal. */
  afterQ3: Record<string, Beat>;
  headline: { lead: string; accent: string };
  /** What's in it. Eros has three; Passion has one, and that is a selling point. */
  ledgerEyebrow: string;
  ledger: Ingredient[];
  closer: Beat | null;
  /** Product-specific fair balance. Never share this between lines. */
  disclaimer: string;
};

/* ─────────────────────────────  EROS  ───────────────────────────── */

export const EROS: ProductCopy = {
  afterRoute: {
    eyebrow: "The difference",
    body: "Every pill you've tried worked on the machinery. None of them touched the wanting. Eros carries the actives you already know — and apomorphine, which goes after desire itself. Not just able. Actually wanting to.",
  },
  q2: {
    prompt:
      "When you take something for a night like this — how much do you want to feel it?",
    options: [
      ["low", "A little goes a long way"],
      ["mid", "Noticeable — no guessing"],
      ["max", "As strong as they make it"],
    ],
  },
  q3: {
    prompt: "And when the moment hits — how do you want it to work?",
    options: [
      ["fast", "Fast — minutes, not an hour"],
      ["long", "Steady — a longer window"],
      ["both", "Both, honestly"],
    ],
  },
  afterQ2: {
    low: {
      eyebrow: "Dialed to you",
      body: "Then you don't need the biggest dose on the shelf. You need yours. A clinician prescribes to your history and moves it if it's wrong — that's the whole reason this is compounded instead of pulled off a shelf.",
    },
    mid: {
      eyebrow: "Nothing hidden",
      body: "70mg sildenafil. 20mg tadalafil. 4mg apomorphine. 94mg of actives and every milligram printed on the label. No proprietary blend, no vague promises. You will know it's working.",
    },
    max: {
      eyebrow: "Built heavy",
      body: "94mg of actives in a single 2mL dose, absorbed under your tongue instead of fighting through your stomach first. This is the strong end of what a compounding pharmacy will build. It is not a starter pill.",
    },
  },
  afterQ3: {
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
  },
  headline: {
    lead: "Hard is the easy part.",
    accent: "The wanting is the rest.",
  },
  ledgerEyebrow: "94mg of actives · nothing hidden",
  ledger: [
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
  ],
  closer: {
    eyebrow: "Three levers, one dose",
    body: "Most pills give you one thing: blood flow, for a few hours, if you're already in the mood. Eros gives you the wanting, the firmness, and the window — fast in, steady through, still there tomorrow.",
  },
  disclaimer:
    "Rx only. A US-licensed clinician reviews your health answers and, if appropriate, issues a prescription. Not for use with nitrates. Side effects may include headache, flushing, and dyspepsia.",
};

/* ────────────────────────────  PASSION  ──────────────────────────── */

export const PASSION: ProductCopy = {
  afterRoute: {
    eyebrow: "The difference",
    body: "PT-141 started life as a tanning drug. Arizona, 1989 — the lab was chasing a sunless tan, and the volunteers reported something nobody was looking for. Thirty years later it's the only FDA-approved on-demand treatment for low desire in women.",
  },
  q2: {
    prompt: "Be honest — what's actually changed?",
    options: [
      ["quiet", "I just don't think about it anymore"],
      ["slow", "The interest is there. It takes forever to arrive."],
      ["want", "I want to want it. That's the part that's missing."],
    ],
  },
  q3: {
    prompt: "And how would you want it to fit into a night?",
    options: [
      ["planned", "Something taken when the night's already coming"],
      ["easy", "Something without a whole ritual around it"],
      ["either", "Either — it just has to work"],
    ],
  },
  afterQ2: {
    quiet: {
      eyebrow: "That's the part it goes after",
      body: "Not blood flow. Not hormones. PT-141 works in the brain, on the system that decides you're interested in the first place — which is the entire reason it exists. Everything else on the shelf assumes the wanting is already there.",
    },
    slow: {
      eyebrow: "Upstream of everything else",
      body: "Lubricants work on friction. Hormones work on levels. PT-141 works on the signal that starts the whole thing — the one that's supposed to arrive before any of the rest of it does.",
    },
    want: {
      eyebrow: "That's the exact thing it was approved for",
      body: "Not arousal. Not performance. Desire itself — the wanting. That's the endpoint the trials measured, and it's why this got approved when most things aimed at the same problem didn't.",
    },
  },
  afterQ3: {
    planned: {
      eyebrow: "On demand, not on schedule",
      body: "One dose, about 45 minutes ahead. Not a daily pill taken forever whether the night is happening or not, and not six weeks of waiting to find out whether it worked at all.",
    },
    easy: {
      eyebrow: "One dose, and that's it",
      body: "A small subcutaneous injection — the same kind of fine needle used for insulin, into the thigh or the stomach. It takes seconds, and there is nothing else to remember for the rest of the month.",
    },
    either: {
      eyebrow: "The timing is the whole point",
      body: "The daily alternative has to build up over weeks and carries a drinking restriction. This is one dose, before a night you actually want to have. That's the difference.",
    },
  },
  headline: { lead: "The wanting,", accent: "switched on." },
  ledgerEyebrow: "One molecule · one job",
  ledger: [
    {
      dose: "PT-141",
      name: "Bremelanotide",
      slot: "Desire",
      body: "The same molecule as Vyleesi — the only FDA-approved on-demand treatment for low desire in premenopausal women. It isn't a hormone and it isn't a stimulant. It works through the melanocortin system in the brain, a completely different address from anything else you've been offered.",
    },
  ],
  closer: {
    eyebrow: "Why this and not a daily pill",
    body: "The daily option takes weeks to build up, has to be taken every single day, and comes with a drinking restriction. This is one dose before a night you actually want — and nothing to think about the rest of the time.",
  },
  disclaimer:
    "Rx only. A US-licensed clinician reviews your health answers and, if appropriate, issues a prescription. Side effects may include nausea, flushing, and injection-site reactions.",
};

/**
 * Q1 routes on the purchase, not on identity — plenty of people scanning this
 * card are shopping for someone else, and "who is this for" catches them where
 * "are you a man or a woman" would bounce them.
 */
export const LINE_COPY: Record<"eros" | "passion" | "both", ProductCopy> = {
  eros: EROS,
  passion: PASSION,
  both: EROS,
};
