/**
 * Eros — men's premium product line content tables (3-in-1 sublingual elixir).
 *
 * PRODUCT: a compounded, 3-in-1 SUBLINGUAL LIQUID (2 mL under the tongue)
 * combining two PDE5 actives for vascular support — sildenafil (70 mg) +
 * tadalafil (20 mg) — with apomorphine (4 mg), which engages the brain's
 * dopamine pathways tied to arousal and sexual motivation. The wedge is
 * "body + brain": most ED medicine works only on blood flow; Eros adds the
 * brain half a PDE5-only pill was never designed to touch. Consumer brand kept
 * as "Eros" (same pattern as "Hot Sauce" / "Passion"). Prescribed online after
 * a US-licensed clinician reviews the intake.
 *
 * Design source of truth: mockups/eros-main.html (Cole-approved). Copy here is
 * taken verbatim from that mockup where it exists.
 *
 * Voice: classical, elevated, "the oldest idea in medicine, made modern."
 * Headings set in Cormorant Garamond with Instrument Serif italic accents.
 *
 * COMPLIANCE discipline: descriptive, non-efficacy. The apomorphine claim is
 * framed as dose disclosure, NOT superiority — "4mg — the top of the clinically
 * studied range for sublingual apomorphine" (never "most apomorphine"). All
 * numbers are milligram / volume facts, not guaranteed clinical effects.
 */

/**
 * Hero stat row — four neutral facts: the two PDE5 doses, the apomorphine dose,
 * and the sublingual delivery volume. Milligram/volume disclosure only.
 */
export const HERO_STATS = [
  { label: "Sildenafil", value: "70mg" },
  { label: "Tadalafil", value: "20mg" },
  { label: "Apomorphine", value: "4mg" },
  { label: "Sublingual", value: "2mL" },
] as const;

/**
 * The three actives. Apomorphine is listed FIRST — it's the differentiator (the
 * brain half) and the only card that carries molecule art (`mol`). Sildenafil
 * and tadalafil follow as the vascular pair, rendered text-only. Same card
 * shape as the other lines so IngredientRow stays a near-clone.
 */
export const INGREDIENTS = [
  {
    key: "apomorphine",
    mol: "/brand/molecule-apomorphine-eros.svg",
    slot: "The brain · dopamine",
    role: "The wanting, switched on",
    name: "Apomorphine · 4mg",
    mechanism:
      "Apomorphine engages dopamine pathways tied to arousal and sexual motivation — the active most pills never bring, and the reason Eros is a step-up, not another refill. Its 4mg is the top of the clinically studied range for sublingual apomorphine.",
  },
  {
    key: "sildenafil",
    mol: null,
    slot: "The body · vascular",
    role: "Firm, and ready",
    name: "Sildenafil · 70mg",
    mechanism:
      "Sildenafil is a PDE5 active that supports blood flow and firmness — the fast-acting half of the vascular pair, and the part of the response you already know.",
  },
  {
    key: "tadalafil",
    mol: null,
    slot: "The body · window",
    role: "A window that stays open",
    name: "Tadalafil · 20mg",
    mechanism:
      "Tadalafil is a longer-acting PDE5 active that widens the window, so support can stay open toward the next day. Together with sildenafil, 90mg of PDE5 support in a single dose.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    title: "Online visit",
    body: "Answer a few private questions about you and your health. About three minutes — no video calls, no clinic, no waiting room.",
    meta: "~3 min",
  },
  {
    n: "02",
    title: "Clinician review",
    body: "A US-licensed clinician reviews your history and, if appropriate, issues a prescription to a licensed pharmacy.",
    meta: "US-licensed",
  },
  {
    n: "03",
    title: "Discreet delivery",
    body: "A plain, unmarked package to your door, tracked the whole way. Refills renew — or don't. You decide, and can change or cancel anytime.",
    meta: "tracked",
  },
] as const;

export const FAQS = [
  {
    q: "What exactly is Eros?",
    a: "A compounded, 3-in-1 sublingual liquid — sildenafil, tadalafil and apomorphine — prescribed online after a licensed-clinician review. Two milliliters under the tongue.",
  },
  {
    q: "Why is it called Eros?",
    a: "Eros was the Greek word for desire itself — the drive that pulls a man toward life, not just the act. That's the half most ED pills miss and the half Eros is built for: the wanting, not only the working. Body and brain, in one dose.",
  },
  {
    q: "How is it different from my current pill?",
    a: "Most ED medicine works only on the body's blood flow. Eros adds apomorphine, which engages the brain's dopamine pathways tied to desire — the wanting a plumbing-only pill was never designed to touch.",
  },
  {
    q: "Is it FDA-approved?",
    a: "Eros is a compounded medication. Compounded drugs are not FDA-approved finished products; every order is prescribed only after a licensed clinician reviews your intake.",
  },
  {
    q: "How is it shipped?",
    a: "Discreetly, in a plain unmarked package, tracked to your door. Subscriptions renew automatically until you change or cancel them.",
  },
  {
    q: "Do I need a prescription?",
    a: "Yes. Eros is prescription-only, available after a US-licensed clinician reviews your health history. The intake is completely private and takes about three minutes.",
  },
  {
    q: "Who shouldn't take Eros?",
    a: "Eros isn't right for everyone — including anyone taking nitrates. The intake screens for this, and the prescribing clinician confirms everything before approving your treatment. Side effects may include headache, flushing, and dyspepsia.",
  },
] as const;

export const SCIENCE_STATS = [
  {
    big: "3",
    unit: "actives",
    label: "Body and brain, in one",
    body: "Sildenafil and tadalafil for the vascular response; apomorphine for the brain's dopamine pathway — the two halves in a single sublingual dose.",
  },
  {
    big: "94",
    unit: "mg",
    label: "Disclosed to the milligram",
    body: "70mg sildenafil, 20mg tadalafil, 4mg apomorphine — 94mg of actives in one 2mL dose. Nothing hidden, every number on the label.",
  },
  {
    big: "4",
    unit: "mg",
    label: "Apomorphine, the brain half",
    body: "The top of the clinically studied range for sublingual apomorphine — the active that engages dopamine pathways tied to arousal, which a PDE5-only pill never carries.",
  },
  {
    big: "2",
    unit: "mL",
    label: "Sublingual, under the tongue",
    body: "A liquid held under the tongue rather than a swallowed tablet — a delivery format chosen for the actives in this formula, prescribed and prepared per order.",
  },
] as const;
