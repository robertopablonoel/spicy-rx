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
    body: "They tried Viagra on women. It worked — blood flow went up, measurably, in Pfizer's own studies. It just didn't make anyone want anything. That's the whole problem in one experiment: for women, desire was never a plumbing issue. PT-141 works somewhere else entirely.",
  },
  q2: {
    prompt: "Be honest — what's actually changed?",
    options: [
      ["quiet", "I just don't think about it anymore"],
      ["avoid", "I've started finding ways to avoid it"],
      ["want", "I want to want it. That's the part that's missing."],
    ],
  },
  q3: {
    prompt: "Anything giving you pause?",
    options: [
      ["needle", "Honestly? The injection"],
      ["tried", "I've tried things that didn't do anything"],
      ["none", "Not really — I just want to try it"],
    ],
  },
  afterQ2: {
    quiet: {
      eyebrow: "It is in your head. Just not the way they meant it.",
      body: "Researchers at Imperial College scanned 31 women with this exact problem, on the drug and on a placebo, and watched what changed. The part of the brain that monitors and second-guesses you went quiet. Their words: it worked by reducing self-consciousness. Twenty-one of the thirty-one reported more desire over the next day. Eight did on the placebo.",
    },
    avoid: {
      eyebrow: "You are very much not the only one",
      body: "At the FDA's own patient meeting, women described going to bed after their husband was already asleep, getting up before he woke, avoiding even a hug — just to not have the conversation. And they were emphatic it wasn't the relationship. One said there were no other stressors, no issues in their life. The avoiding is a symptom. It isn't a verdict on your marriage.",
    },
    want: {
      eyebrow: "You are not imagining this",
      body: "It has a name, it has a diagnosis, and it has one approved treatment. In a study of 530 women who went to a doctor about exactly this, 44% were told it was something else — stress, anxiety, the relationship. 35% were told it was normal for their age. It isn't in your head, and it isn't a character flaw.",
    },
  },
  afterQ3: {
    needle: {
      eyebrow: "Fair — and there's a reason for it",
      body: "A nasal spray version was tried first, and abandoned. Absorption through the nose was too unpredictable — some people absorbed far more than intended. Switching to a small injection is what made the dose consistent enough to get approved. It's an insulin-fine needle — finer, in fact, than the one inside the branded auto-injector — into the thigh or the stomach, and it takes about as long as reading this sentence. In the trials, most women used it two or three times a month.",
    },
    tried: {
      eyebrow: "Most of it was never aimed at this",
      body: "In that same study of 530 women, 52% were handed a lubricant — for a problem that has nothing to do with dryness. Only 7% were offered the one treatment actually approved for it. Viagra was tried on women too: blood flow went up and wanting stayed exactly where it was. You probably haven't failed treatment. You probably haven't been offered it.",
    },
    none: {
      eyebrow: "Then the visit is the only step left",
      body: "About five minutes of private questions, and a US-licensed clinician decides whether it's right for you. No clinic, no waiting room, no explaining yourself to someone who's already decided it's stress.",
    },
  },
  headline: { lead: "The wanting,", accent: "switched on." },
  ledgerEyebrow: "One molecule · one job",
  ledger: [
    {
      dose: "PT-141",
      name: "Bremelanotide",
      slot: "Desire",
      body: "The same molecule as Vyleesi — the only FDA-approved on-demand treatment for low desire in premenopausal women. Not a hormone, not a stimulant. It works through the melanocortin system in the brain, a completely different address from anything else you've been offered. Found by accident, incidentally, by a lab trying to build a sunless tan.",
    },
  ],
  closer: {
    eyebrow: "Why this is different",
    body: "Everything else aimed at this problem either works on the body and hopes the mind follows, or asks you to take something daily for weeks before you find out. This one works where wanting actually starts — and you take it on the nights you want it to matter.",
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
