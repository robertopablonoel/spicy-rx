/**
 * Insert-card lander copy.
 *
 * ── STRUCTURE: PROBLEM-AWARE FIRST ─────────────────────────────────────────
 * The funnel opens on the PROBLEM, not the product. The earlier version asked
 * "who are we finding this for?" on screen one, which only parses for someone
 * already shopping — it assumed solution awareness this audience doesn't have.
 * A Spicy Cubes buyer scanning a card has a private problem, not a shortlist.
 *
 * So the first three questions never mention a medication. They ask when it
 * changed, how it shows up, and what they've been told about it. Only after
 * that — once the person has been seen and, critically, VALIDATED against the
 * dismissal they've probably already experienced — does the quiz ask which
 * line it's for and start talking about molecules.
 *
 * The payoff is that Q3 ("what have you been told?") sets up the single most
 * persuasive fact available: most women who ask for help get told it's stress,
 * their age, or handed a lubricant. Answering that at the exact moment they've
 * just admitted it happened to them is worth more than any mechanism claim.
 *
 * OPENING is shared across lines and runs BEFORE routing. Each ProductCopy
 * then owns everything downstream so the two paths can never bleed — the
 * women's path once inherited Eros's beats and PDE5 fair balance about
 * nitrates, and splitting the objects is what makes that unrepresentable.
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

  /** Q1 — problem recognition. Nothing here presumes they want to buy. */
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
      body: "Most people don't come looking until it's been years. Wanting that flickers is a lot easier to work with than wanting that's gone quiet completely.",
    },
    months: {
      eyebrow: "That's the usual answer",
      body: "In the trials for the one treatment approved for this, the average person had been living with it for four years before anyone did anything about it. Months is early by that standard.",
    },
    forget: {
      eyebrow: "You are not the outlier here",
      body: "One woman described it at an FDA hearing like this: in a beautiful place, with the man she loved, her body was a shell with nothing inside. People do not say that out loud often. It is far more common than the silence suggests.",
    },
    comes: {
      eyebrow: "That's worth paying attention to",
      body: "Coming and going means the wiring works — something is interrupting the signal rather than the signal being gone. That's a different problem, and usually a more tractable one.",
    },
  } as Record<string, Beat>,

  /** Q2 — how it actually shows up. The lived experience, not a symptom list. */
  q2: {
    prompt: "And how does it show up?",
    options: [
      ["avoid", "I've started finding ways to avoid it"],
      ["going", "I go through with it. I'm just not there."],
      ["silent", "We've stopped talking about it"],
      ["me", "It's mostly me. I miss feeling like myself."],
    ],
  } satisfies Question,

  afterQ2: {
    avoid: {
      eyebrow: "People do exactly this",
      body: "At the FDA's own patient meeting, women described going to bed after their partner was already asleep, getting up before he woke, avoiding even a hug — just to not have the conversation. And they were emphatic it wasn't the relationship.",
    },
    going: {
      eyebrow: "There's a phrase for it",
      body: "Women at that same meeting called it duty sex. One said she could grit through it, but she did it for him, not for her. Another said what she wanted back wasn't the act — it was knowing she actually wanted him.",
    },
    silent: {
      eyebrow: "The silence is usually the worst part",
      body: "Not the frequency. Partners tend to read it as rejection and stop asking; the person living it reads that as relief and then as loss. Nobody is being unkind and it still gets worse.",
    },
    me: {
      eyebrow: "That's the sentence that comes up most",
      body: "Not about a partner. About yourself. Women describe the gap between who they were and who they became — one said she felt like she'd pulled a bait and switch on her own husband, and was wondering where the old her had gone.",
    },
  } as Record<string, Beat>,

  /** Q3 — what they've been told. Sets up the strongest fact in the file. */
  q3: {
    prompt: "Has anyone given you an explanation for it?",
    options: [
      ["stress", "Stress. Or that I'm just tired."],
      ["age", "That it's normal at my age"],
      ["relationship", "That it's the relationship"],
      ["nobody", "I haven't asked anyone"],
    ],
  } satisfies Question,

  afterQ3: {
    stress: {
      eyebrow: "That is the most common answer, and it's usually wrong",
      body: "In a study of 530 women who went to a doctor about this exact thing, 44% were told it was something else — stress, anxiety, being tired. 52% were handed a lubricant, for a problem that has nothing to do with dryness. Only 7% were offered the one treatment actually approved for it.",
    },
    age: {
      eyebrow: "35% get told that. It isn't a diagnosis.",
      body: "In the same study of 530 women, more than a third were told low desire was normal for their age and sent home. It has a name, it has a diagnosis, and there is one treatment approved for it — which is a strange thing to be true of something that's supposedly just getting older.",
    },
    relationship: {
      eyebrow: "Women in these studies push back hard on that",
      body: "At the FDA meeting, one said flatly there were no other stressors and no issues in their life. Another said the loss of desire wasn't situational — it didn't come back on holiday, away from every stressor she could name. Sometimes it is the relationship. Very often it is not, and being told it is costs years.",
    },
    nobody: {
      eyebrow: "Most people don't. That's the whole problem.",
      body: "Roughly a quarter never raise it out of embarrassment, and only about 40% of OB-GYNs ask unprompted — so it mostly goes unsaid in both directions. When women do ask, they wait an average of ten months first.",
    },
  } as Record<string, Beat>,

  /** Q4 — routing. Late, on purpose: by now they're bought in on the problem. */
  q4: {
    prompt: "Last one. Who are we finding this for?",
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
  headline: { lead: string; accent: string };
  /** The pitch, under the headline, on the reveal. */
  pitch: string;
  ledgerEyebrow: string;
  ledger: Ingredient[];
  closer: Beat | null;
  /** Product-specific fair balance. Never share this between lines. */
  disclaimer: string;
};

/* ─────────────────────────────  EROS  ───────────────────────────── */

export const EROS: ProductCopy = {
  afterRoute: {
    eyebrow: "Then here's what's different",
    body: "Every pill you've tried worked on the machinery. None of them touched the wanting. Eros carries the actives you already know — and a third one that goes after desire itself.",
  },
  headline: {
    lead: "Hard is the easy part.",
    accent: "The wanting is the rest.",
  },
  pitch:
    "Three molecules in a single drop under the tongue. Two handle the plumbing you already know about. The third works somewhere else entirely.",
  ledgerEyebrow: "94mg of actives · nothing hidden",
  ledger: [
    {
      dose: "4mg",
      name: "Apomorphine",
      slot: "Desire",
      body: "The one that goes after wanting. Every other pill on the market waits until you're already in the mood — this works on the part of the brain that decides you're in the mood. It's the difference between being able to and actually wanting to.",
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
      body: "The long weekend. One dose Friday night was still working a day and a half later in trial — 59% of attempts against 28% on placebo.",
    },
  ],
  closer: {
    eyebrow: "Three levers, one dose",
    body: "Most pills give you one thing: blood flow, for a few hours, if you're already in the mood. This gives you the wanting, the firmness, and the window.",
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
