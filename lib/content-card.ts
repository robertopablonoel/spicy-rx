/**
 * Insert-card lander copy.
 *
 * ── STRUCTURE: ONE SHARED PROBLEM QUESTION, THEN SPLIT PATHS ───────────────
 * Q1 is the problem and nothing else — no product, no molecule. An earlier
 * version opened by asking which product you wanted, which only parses for
 * someone already shopping; a Cubes buyer scanning a card has a private
 * problem, not a shortlist.
 *
 * Routing happens at Q2. From there the two lines own EVERYTHING: their own
 * Q3, their own Q4, their own beats, ledger, closer and fair balance.
 *
 *   Q1  shared   when it changed
 *   Q2  shared   who it's for
 *   Q3  line     Eros: how strong · Passion: how it shows up
 *   Q4  line     Eros: fast or long · Passion: what you've been told
 *
 * The EROS path is the original funnel, restored verbatim — it is the version
 * Cole preferred, and the only change is that it now sits behind the two
 * shared questions rather than starting cold.
 *
 * The split is a correctness requirement, not a preference. The dismissal
 * statistics are from a study of 530 WOMEN and must never be shown to a man,
 * and the fair balance differs entirely by molecule — nitrates for the PDE5
 * stack, nausea for the peptide.
 *
 * Beats render at the top of the NEXT screen, so the pitch sharpens as they go
 * without costing a screen of drop-off. The matching is INVISIBLE — never
 * "because you said X."
 *
 * This is the sales pass. Compliance is a separate agent's job downstream.
 */

export type Beat = { eyebrow: string; body: string };

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

/* ══════════════  SHARED OPENING — no product, no molecules  ══════════════ */

export const OPENING = {
  hook: {
    lead: "The card in your box opens something",
    accent: "the website doesn't.",
  },

  /** Q1 — problem recognition, shared by both lines. Deliberately universal:
   *  it must read the same whether the person is a man, a woman, or shopping
   *  for a partner, because routing hasn't happened yet. */
  q1: {
    prompt: "Be honest — when did you last want it without trying?",
    options: [
      ["recent", "Recently, actually"],
      ["months", "A while ago. Months."],
      ["forget", "I genuinely can't remember"],
      ["comes", "It comes and goes"],
    ],
  } satisfies Question,

  afterQ1: {
    recent: {
      eyebrow: "Then you caught it early",
      body: "Most people don't go looking until it's been years. Wanting that flickers is far easier to work with than wanting that's gone quiet altogether.",
    },
    months: {
      eyebrow: "That's the usual answer",
      body: "In the trials for this, people had been living with it for an average of four years before anyone did anything. Months is early by that standard.",
    },
    forget: {
      eyebrow: "You are not the outlier here",
      body: "Someone described it at an FDA hearing like this: in a beautiful place, with the person they loved, their body was a shell with nothing inside. People rarely say that out loud. It's far more common than the silence suggests.",
    },
    comes: {
      eyebrow: "That's worth paying attention to",
      body: "Coming and going means the wiring works — something is interrupting the signal rather than the signal being gone. Different problem, and usually a more tractable one.",
    },
  } as Record<string, Beat>,

  /** Q2 — routing. Early enough that each line owns everything downstream,
   *  late enough that the first thing asked was the problem, not the purchase. */
  q2: {
    prompt: "Who are we finding this for?",
    options: [
      ["eros", "For a man"],
      ["passion", "For a woman"],
      ["both", "For both of us"],
    ],
  } satisfies Question,

  routeNote:
    "Two prescriptions, built for two different bodies. Plenty of people here are shopping for someone else.",
};

export type ProductCopy = {
  /** Unlocked by the routing answer — the first time a product is mentioned. */
  afterRoute: Beat;
  /** Q3 and Q4 are OWNED BY THE LINE. They are not shared, and they must not
   *  be: the dismissal statistics are from a study of 530 women, and showing
   *  them to a man is simply the wrong audience. */
  q3: Question;
  afterQ3: Record<string, Beat>;
  q4: Question;
  afterQ4: Record<string, Beat>;
  headline: { lead: string; accent: string };
  /** Optional paragraph under the headline. Eros deliberately has none: its
   *  original reveal went straight from headline to the answer-matched beat,
   *  and that is the version that tested well with Cole. */
  pitch?: string;
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
  q3: {
    prompt:
      "When you take something for a night like this — how much do you want to feel it?",
    options: [
      ["low", "A little goes a long way"],
      ["mid", "Noticeable — no guessing"],
      ["max", "As strong as they make it"],
    ],
  },
  afterQ3: {
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
  q4: {
    prompt: "And when the moment hits — how do you want it to work?",
    options: [
      ["fast", "Fast — minutes, not an hour"],
      ["long", "Steady — a longer window"],
      ["both", "Both, honestly"],
    ],
  },
  afterQ4: {
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
    eyebrow: "Then here's what's different",
    body: "They tried Viagra on women. It worked — blood flow went up, measurably, in Pfizer's own studies. It just didn't make anyone want anything. For women, this was never a plumbing problem. It's a getting-out-of-your-own-head problem.",
  },
  q3: {
    prompt: "And how does it show up?",
    options: [
      ["avoid", "I've started finding ways to avoid it"],
      ["going", "I go through with it. I'm just not there."],
      ["silent", "We've stopped talking about it"],
      ["me", "It's mostly me. I miss feeling like myself."],
    ],
  },
  afterQ3: {
    avoid: {
      eyebrow: "Women describe exactly this",
      body: "At the FDA's own patient meeting, they talked about going to bed after their partner was already asleep, getting up before he woke, avoiding even a hug — just to not have the conversation. And they were emphatic it wasn't the relationship.",
    },
    going: {
      eyebrow: "There's a phrase for it",
      body: "Women at that same meeting called it duty sex. One said she could grit through it, but she did it for him, not for her. What she wanted back wasn't the act — it was knowing she actually wanted him.",
    },
    silent: {
      eyebrow: "The silence is usually the worst part",
      body: "Not the frequency. Partners read it as rejection and stop asking; the person living it reads that as relief, and then as loss. Nobody is being unkind and it still gets worse.",
    },
    me: {
      eyebrow: "That's the sentence that comes up most",
      body: "Not about a partner. About yourself. Women describe the gap between who they were and who they became — one said she felt like she'd pulled a bait and switch on her own husband, and wondered where the old her had gone.",
    },
  },
  q4: {
    prompt: "Has anyone given you an explanation for it?",
    options: [
      ["stress", "Stress. Or that I'm just tired."],
      ["age", "That it's normal at my age"],
      ["relationship", "That it's the relationship"],
      ["nobody", "I haven't asked anyone"],
    ],
  },
  afterQ4: {
    stress: {
      eyebrow: "That's the most common answer, and it's usually wrong",
      body: "In a study of 530 women who went to a doctor about exactly this, 44% were told it was something else — stress, anxiety, being tired. 52% were handed a lubricant, for a problem that has nothing to do with dryness. Only 7% were offered the one treatment actually approved for it.",
    },
    age: {
      eyebrow: "35% get told that. It isn't a diagnosis.",
      body: "In that same study of 530 women, more than a third were told low desire was normal for their age and sent home. It has a name, it has a diagnosis, and there is one approved treatment — a strange thing to be true of something that's supposedly just getting older.",
    },
    relationship: {
      eyebrow: "Women in these studies push back hard on that",
      body: "At the FDA meeting one said flatly there were no other stressors, no issues in their life. Another said it wasn't situational — it didn't come back on holiday, away from everything she could have blamed. Sometimes it is the relationship. Very often it isn't, and being told it is costs years.",
    },
    nobody: {
      eyebrow: "Most don't. That's the whole problem.",
      body: "Roughly a quarter never raise it out of embarrassment, and only about 40% of OB-GYNs ask unprompted — so it goes unsaid in both directions. Women who do ask wait an average of ten months first.",
    },
  },
  headline: { lead: "Get out of your head.", accent: "Back into your body." },
  pitch:
    "Researchers at Imperial College scanned 31 women with this exact problem, on the drug and on a placebo, and watched what changed. The part of the brain that monitors you — that narrates, checks in, keeps score — went quiet. Their words: it worked by reducing self-consciousness. Twenty-one of the thirty-one reported more desire over the next day. Eight did on the placebo.",
  ledgerEyebrow: "One molecule · one job",
  ledger: [
    {
      dose: "PT-141",
      name: "Bremelanotide",
      slot: "Desire",
      body: "The same molecule as Vyleesi — the only FDA-approved on-demand treatment for low desire in premenopausal women. Not a hormone, not a stimulant, and nothing to take every day. Found by accident, incidentally, by a lab trying to build a sunless tan.",
    },
    {
      dose: "The shot",
      name: "What it's actually like",
      slot: "The part everyone asks about",
      body: "A fine needle just under the skin of the thigh or stomach — the same thing a lot of people are already doing on a Sunday night for weight loss, and finer than the needle inside the branded auto-injector. It takes seconds. In the trials, most women used it two or three times a month, not daily.",
    },
  ],
  closer: {
    eyebrow: "Why this and not another pill",
    body: "The daily option takes weeks to build up and comes with a drinking restriction. This is one dose before a night you actually want — and nothing to think about the rest of the time.",
  },
  disclaimer:
    "Rx only. A US-licensed clinician reviews your health answers and, if appropriate, issues a prescription. Side effects may include nausea, flushing, and injection-site reactions. Nausea is most common after the first dose and improves for most people with the second.",
};

export const LINE_COPY: Record<"eros" | "passion" | "both", ProductCopy> = {
  eros: EROS,
  passion: PASSION,
  both: EROS,
};
