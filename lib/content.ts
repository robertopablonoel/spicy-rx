/**
 * Marketing content tables.
 *
 * Single source of truth for the home-page molecule grid, comparison table,
 * testimonials, FAQ, and stat rows. Pulled out of the inline JSX so a copy
 * change is one diff in one file.
 */

export const HERO_STATS = [
  { label: "Onset", value: "15 min" },
  { label: "Window", value: "36 hr" },
  { label: "Active ingredients", value: "4" },
  { label: "Clinic visits", value: "0" },
] as const;

/**
 * The four molecules in Hot Sauce. `slot` is the brand-eyebrow label;
 * `role` is the display headline; `name` is the mono ingredient label.
 * Order matches the original marketing kit (apomorphine → vardenafil →
 * sildenafil → tadalafil) which reads as: spark → lift → push → window.
 */
export const INGREDIENTS = [
  {
    key: "apomorphine",
    slot: "The spark",
    role: "Ignites desire",
    name: "Apomorphine",
    mechanism:
      "Primes brain dopamine receptors to amplify sexual signaling.",
  },
  {
    key: "vardenafil",
    slot: "The lift",
    role: "Rapid onset",
    name: "Vardenafil",
    mechanism: "Fast-acting PDE5 inhibitor — peak in 10–15 minutes.",
  },
  {
    key: "sildenafil",
    slot: "The push",
    role: "Peak strength",
    name: "Sildenafil",
    mechanism: "The most potent PDE5 inhibitor for maximum rigidity.",
  },
  {
    key: "tadalafil",
    slot: "The window",
    role: "Lasts 36 hours",
    name: "Tadalafil",
    mechanism: "17.5-hour half-life — one dose covers the whole weekend.",
  },
] as const;

export const COMPARISON_ROWS = [
  { label: "Onset time", oldWay: "45–60 min", hotSauce: "~15 min" },
  { label: "Effective duration", oldWay: "4–6 hr", hotSauce: "up to 36 hr" },
  { label: "Works on desire", oldWay: "No", hotSauce: "Yes — apomorphine" },
  {
    label: "Blocked by a heavy meal",
    oldWay: "Often",
    hotSauce: "No — sublingual",
  },
  { label: "Clinic visit required", oldWay: "Often", hotSauce: "No" },
  { label: "Cost vs. retail", oldWay: "$$$$", hotSauce: "~36% lower" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    title: "Online visit",
    body: "Answer a few questions on our private intake form. Takes 3 minutes — no video calls, no waiting rooms.",
    meta: "~3 min",
  },
  {
    n: "02",
    title: "Doctor approval",
    body: "A US-licensed clinician reviews your case within 24 hours. If approved, your script is issued the same day.",
    meta: "<24 hr",
  },
  {
    n: "03",
    title: "Discreet delivery",
    body: "Plain unmarked package, free rush shipping. Refills auto-renew (or don't — you decide).",
    meta: "2 days",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Ethan H.",
    city: "Austin, TX",
    title: "The desire piece is the difference",
    body: `"I've been on sildenafil for years. The apomorphine is the part I didn't know I was missing — it's the actual want, not just the mechanics."`,
  },
  {
    name: "Doug R.",
    city: "Brooklyn, NY",
    title: "15 minutes is real",
    body: `"Skeptical the timing claim was marketing. It isn't. Sublingual hits in the time it takes to pour a glass of wine."`,
  },
  {
    name: "Amir R.",
    city: "San Diego, CA",
    title: "Worth not waiting an hour",
    body: `"The 36-hour window means I stopped scheduling around a pill. One drop on Friday and I'm good through Sunday brunch."`,
  },
  {
    name: "Frank N.",
    city: "Chicago, IL",
    title: "Direct, professional, discreet",
    body: `"Intake took three minutes, doctor reviewed the same day, package arrived in plain wrap. No pharmacy line, no awkwardness."`,
  },
] as const;

export const FAQS = [
  {
    q: "How is Hot Sauce different from Viagra or Cialis?",
    a: "Hot Sauce combines the active ingredients in Viagra (sildenafil), Cialis (tadalafil), and Levitra (vardenafil) into a single sublingual dose — plus apomorphine, which targets desire through dopamine pathways the PDE5 class can't touch. You get faster onset, peak strength, a longer window, and the desire piece, all in one drop.",
  },
  {
    q: "How fast does it work?",
    a: "About 15 minutes. Hot Sauce is absorbed under your tongue and goes directly into your bloodstream — it doesn't need to be digested. Traditional pills typically take 45–60 minutes, often longer with a heavy meal.",
  },
  {
    q: "How long does it last?",
    a: "Up to 36 hours. Tadalafil has a 17.5-hour half-life, so one dose carries you through the weekend. You stay responsive — not perpetually erect.",
  },
  {
    q: "Do I need a prescription?",
    a: "Yes. Hot Sauce is a prescription medication, available only after a US-licensed clinician reviews your medical history. The intake is private and takes about 3 minutes.",
  },
  {
    q: "Is the packaging discreet?",
    a: "Plain unmarked outer package. No \"Spicy Alien\" return address. The brand only appears on the bottle inside.",
  },
  {
    q: "Who shouldn't take Hot Sauce?",
    a: "Anyone taking nitrates, alpha-blockers, or with significant cardiovascular disease should not use Hot Sauce. The intake screens for these and the prescribing clinician confirms before approving your script.",
  },
] as const;

export const SCIENCE_STATS = [
  {
    big: "~15",
    unit: "min",
    label: "Onset to peak",
    body: "Sublingual absorption skips hepatic first-pass. Measured Tmax: 12–18 minutes vs 45–75 for oral sildenafil.",
  },
  {
    big: "~50",
    unit: "%",
    label: "Effective dose vs oral",
    body: "Bypassing liver metabolism roughly halves the systemic dose needed for equivalent plasma concentration.",
  },
  {
    big: "36",
    unit: "hr",
    label: "Window of effect",
    body: "Tadalafil's 17.5-hr half-life carries the tail. The window is real — not the same as duration of action.",
  },
  {
    big: "2.0",
    unit: "mg",
    label: "Apomorphine — desire",
    body: "Sub-emetic dose hits central D2/D1 pathways. Recruits the CNS arc the PDE5 class cannot.",
  },
] as const;
