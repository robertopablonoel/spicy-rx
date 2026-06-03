/**
 * Passion — female product line content tables (DESIGN SPIKE).
 *
 * Mirrors the shape of lib/content.ts so the Passion section components are
 * near-clones of the Hot Sauce ones — only the copy and the accent (plasma
 * pink, via the [data-theme="passion"] override) differ.
 *
 * Voice: modeled on Addyi (addyi.com) — warm, second-person, woman-to-woman,
 * destigmatizing ("it's biology, not a flaw"), peer testimonials. Confident
 * on the science, never bro-y, no competitor-bashing. The product narrative's
 * edge over the "daily pink pill": Passion is ON-DEMAND, not a daily pill.
 *
 * Formulation (Rimo offering "Passion"): Tadalafil 10mg / Bremelanotide 10mg /
 * Pregnenolone 10mg, PRN, 12 tablets. All copy/pricing is placeholder.
 */

export const HERO_STATS = [
  { label: "Taken", value: "On-demand" },
  { label: "Active ingredients", value: "3" },
  { label: "Clinic visits", value: "0" },
] as const;

/**
 * The three actives in Passion. Same field shape as Hot Sauce's INGREDIENTS,
 * plus `mol` (svg path) since these molecules differ. Order tells a story:
 * desire → arousal → foundation.
 */
export const INGREDIENTS = [
  {
    key: "bremelanotide",
    mol: "/brand/mol-bremelanotide.svg",
    slot: "The desire",
    role: "Reignites wanting",
    name: "Bremelanotide",
    mechanism:
      "Activates the melanocortin pathway in the brain — the system that governs sexual desire itself, not just the physical response.",
  },
  {
    key: "tadalafil",
    mol: "/brand/mol-tadalafil-p.svg",
    slot: "The flow",
    role: "Heightens arousal",
    name: "Tadalafil",
    mechanism:
      "Increases blood flow to intimate tissue, amplifying physical sensation and how readily your body responds.",
  },
  {
    key: "pregnenolone",
    mol: "/brand/mol-pregnenolone.svg",
    slot: "The foundation",
    role: "Steadies the baseline",
    name: "Pregnenolone",
    mechanism:
      "A neurosteroid precursor that supports hormone balance and mood — the groundwork desire is built on.",
  },
] as const;

/**
 * Daily pill (Addyi-style) vs. Passion. The on-demand framing is the wedge:
 * no weeks-long daily ramp, no everyday alcohol restriction.
 */
export const COMPARISON_ROWS = [
  { label: "When you take it", oldWay: "Every single day", passion: "Only when you want to" },
  { label: "Time to notice a change", oldWay: "Weeks of daily dosing", passion: "The day you need it" },
  { label: "Targets desire", oldWay: "Sometimes", passion: "Yes — bremelanotide" },
  { label: "Supports physical arousal", oldWay: "No", passion: "Yes — tadalafil" },
  { label: "Everyday alcohol restriction", oldWay: "Often", passion: "No daily-use limit" },
  { label: "Clinic visit required", oldWay: "Often", passion: "No" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    title: "Share your story",
    body: "A few private questions about you and your health — no video calls, no waiting rooms. Honest, judgment-free, about 3 minutes.",
    meta: "~3 min",
  },
  {
    n: "02",
    title: "Clinician review",
    body: "A US-licensed clinician reviews everything within 24 hours. If Passion is right for you, your prescription is written the same day.",
    meta: "<24 hr",
  },
  {
    n: "03",
    title: "Arrives discreetly",
    body: "A plain, unmarked package at your door with free shipping. Refill on your terms — pause or cancel whenever you like.",
    meta: "2 days",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Maya R.",
    city: "Austin, TX",
    title: "I stopped feeling broken",
    body: `"I'd quietly decided this was just who I was now. Passion gave me back a part of myself I thought was gone for good."`,
  },
  {
    name: "Jordan L.",
    city: "Denver, CO",
    title: "On my terms, not a schedule",
    body: `"What I love is taking it when I actually want to — not a pill every single morning, hoping something shifts weeks down the line."`,
  },
  {
    name: "Priya S.",
    city: "Seattle, WA",
    title: "It's biology, not in my head",
    body: `"My clinician walked me through the brain-chemistry piece and it finally clicked. This was never a willpower problem."`,
  },
  {
    name: "Elena M.",
    city: "Chicago, IL",
    title: "Private and judgment-free",
    body: `"Three minutes, reviewed the same day, arrived in plain wrapping. No awkward appointment, no explaining myself to anyone."`,
  },
] as const;

export const FAQS = [
  {
    q: "What is Passion?",
    a: "Passion is a clinician-prescribed, on-demand treatment for low sexual desire in women. It brings together three actives — bremelanotide, tadalafil, and pregnenolone — to address desire, physical arousal, and the hormonal baseline underneath them, in a single dose you take only when you want to.",
  },
  {
    q: "How is it different from the daily pink pill?",
    a: "Daily treatments have to be taken every single day, often for weeks, before you may notice a difference — and they ask you to give up alcohol the whole time. Passion is taken on-demand, in the window that matters to you, and works through different pathways.",
  },
  {
    q: "Is low desire really a medical thing?",
    a: "Yes. When the brain chemistry that governs desire shifts — from stress, hormones, age, or other medications — wanting can quietly fade. That's biology, not a personal failing, and it's treatable.",
  },
  {
    q: "Do I need a prescription?",
    a: "Yes. Passion is prescription-only, available after a US-licensed clinician reviews your health history. The intake is completely private and takes about 3 minutes.",
  },
  {
    q: "Is the packaging discreet?",
    a: "Always. Your order arrives in a plain, unmarked package — no product name and no brand on the outside.",
  },
  {
    q: "Who shouldn't take Passion?",
    a: "Anyone taking nitrates, with significant cardiovascular disease, or with certain other conditions should not use Passion. The intake screens for these and the prescribing clinician confirms everything before approving your script.",
  },
] as const;

export const SCIENCE_STATS = [
  {
    big: "3",
    unit: "actives",
    label: "One coordinated dose",
    body: "Desire, arousal, and hormonal baseline — addressed together, instead of one narrow mechanism in isolation.",
  },
  {
    big: "1",
    unit: "dose",
    label: "On-demand, not daily",
    body: "Taken only when you want it. No weeks-long daily ramp, no everyday pill to remember and build a routine around.",
  },
  {
    big: "~45",
    unit: "min",
    label: "Take ahead of the moment",
    body: "Designed to be taken in the window before intimacy, on your timing — not locked to a rigid daily schedule.",
  },
  {
    big: "0",
    unit: "clinics",
    label: "Care from home",
    body: "Private online intake, licensed-clinician review, and discreet delivery — the whole thing, start to finish.",
  },
] as const;
