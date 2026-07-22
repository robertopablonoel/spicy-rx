/**
 * Marketing content tables.
 *
 * Single source of truth for the home-page molecule grid, comparison table,
 * testimonials, FAQ, and stat rows. Pulled out of the inline JSX so a copy
 * change is one diff in one file.
 */

/*
 * LEGITSCRIPT COMPLIANCE PASS (2026-06-05, pre-approval):
 * No efficacy/outcome claims (onset times, duration, strength), no named
 * drug-brand comparisons (Viagra/Cialis/Levitra), no class-superiority
 * claims ("…the PDE5 class can't touch"), no patient testimonials or
 * survey stats until LegitScript approval + a payment processor exist.
 * Copy below describes WHAT the product/service IS, never what it DOES.
 * Pre-pass copy is preserved in git history for post-approval review.
 */

export const HERO_STATS = [
  { label: "Active ingredients", value: "4" },
  { label: "Prescription", value: "Online" },
  { label: "Clinic visits", value: "0" },
  { label: "Shipping", value: "Discreet" },
] as const;

/**
 * The four molecules in Hot Sauce. `slot` is the brand-eyebrow label;
 * `role` is the display headline; `name` is the mono ingredient label.
 * Compliance: roles/mechanisms are pharmacological descriptions only —
 * no outcome or superiority language.
 */
export const INGREDIENTS = [
  {
    key: "apomorphine",
    slot: "Active 01",
    role: "Apomorphine",
    name: "Dopamine agonist",
    mechanism: "A centrally acting dopamine-receptor agonist.",
  },
  {
    key: "vardenafil",
    slot: "Active 02",
    role: "Vardenafil",
    name: "PDE5 inhibitor",
    mechanism: "A selective phosphodiesterase type-5 inhibitor.",
  },
  {
    key: "sildenafil",
    slot: "Active 03",
    role: "Sildenafil",
    name: "PDE5 inhibitor",
    mechanism: "A selective phosphodiesterase type-5 inhibitor.",
  },
  {
    key: "tadalafil",
    slot: "Active 04",
    role: "Tadalafil",
    name: "PDE5 inhibitor",
    mechanism:
      "A selective phosphodiesterase type-5 inhibitor with a long elimination half-life.",
  },
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
    title: "Clinician review",
    body: "A US-licensed clinician reviews your health history. If treatment is appropriate for you, a prescription is issued to a licensed pharmacy.",
    meta: "US-licensed",
  },
  {
    n: "03",
    title: "Discreet delivery",
    body: "Plain unmarked package shipped to your door. Refills auto-renew (or don't — you decide).",
    meta: "tracked",
  },
] as const;

export const FAQS = [
  {
    q: "What is Hot Sauce?",
    a: "Hot Sauce is a compounded prescription formulation that combines four active ingredients — sildenafil, tadalafil, vardenafil, and apomorphine — in a single sublingual liquid. It is available only by prescription, after a US-licensed clinician reviews your health history and determines whether treatment is appropriate for you.",
  },
  {
    q: "What is a sublingual?",
    a: "A sublingual is a formulation absorbed under the tongue rather than swallowed. Your prescribing clinician can discuss whether a sublingual formulation is appropriate for you.",
  },
  {
    q: "How do I take it?",
    a: "Exactly as directed by your prescribing clinician. Dosing instructions are provided with your prescription, and your clinician is available for questions about your treatment.",
  },
  {
    q: "Do I need a prescription?",
    a: "Yes. Hot Sauce is a prescription medication, available only after a US-licensed clinician reviews your medical history. The intake is private and takes about 3 minutes.",
  },
  {
    q: "Is the packaging discreet?",
    a: "Plain unmarked outer package. No \"SpicyRx\" return address. The brand only appears on the bottle inside.",
  },
  {
    q: "Who shouldn't take Hot Sauce?",
    a: "Anyone taking nitrates, alpha-blockers, or with significant cardiovascular disease should not use Hot Sauce. The intake screens for these and the prescribing clinician confirms before approving your script.",
  },
] as const;

export const SCIENCE_STATS = [
  {
    big: "4",
    unit: "",
    label: "Active ingredients",
    body: "Sildenafil, tadalafil, and vardenafil — selective PDE5 inhibitors — plus apomorphine, a centrally acting dopamine-receptor agonist.",
  },
  {
    big: "503A",
    unit: "",
    label: "Compounding pharmacy",
    body: "Compounded in a 503A pharmacy under state board of pharmacy oversight, from USP-grade ingredients.",
  },
  {
    big: "100",
    unit: "%",
    label: "Clinician-reviewed",
    body: "Every prescription follows an individual review of your health history by a US-licensed clinician.",
  },
  {
    big: "1",
    unit: "",
    label: "Sublingual liquid",
    body: "A single dropper-bottle formulation, taken as directed by your prescribing clinician.",
  },
] as const;

/**
 * Hot Sauce (men's) peer testimonials — restored so the men's home mirrors the
 * Passion page (each line shows its own four reviews). Removed in the 2026-06-05
 * LegitScript pass as fabricated patient reviews; reinstated per Cole for the
 * preview. COMPLIANCE: still illustrative (not real patients) — must clear a
 * compliance pass with the Passion testimonials before go-live.
 */
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
