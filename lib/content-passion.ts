/**
 * Passion — female product line content tables (PT-141 injectable).
 *
 * PRODUCT (Rimo offering "PT-141 Injections", consumer brand kept as "Passion"):
 * on-demand SUBCUTANEOUS INJECTION of PT-141 (bremelanotide) — a single active,
 * delivered via a prefilled auto-injector pen. Replaces the earlier 3-tablet
 * design-spike formulation. Positioning per Cole: KEEP the female Passion voice
 * (bremelanotide = Vyleesi, FDA-approved for premenopausal women with HSDD, so a
 * female-libido framing is clinically legitimate). The wedge is unchanged:
 * ON-DEMAND, not a daily pill.
 *
 * Voice: modeled on Addyi (addyi.com) — warm, second-person, woman-to-woman,
 * destigmatizing ("it's biology, not a flaw"), peer testimonials. Confident on
 * the science, never bro-y, no competitor-bashing (the comparison is against
 * "the daily pill" as a CATEGORY — Addyi is never named).
 *
 * Pharmacy: Striker Pharmacy (Katy, TX). Provider network: DrTelx.
 *
 * OPEN ITEMS (safe placeholders used; flagged to Cole/Rimo):
 *   - Doses-per-vial: Cole confirmed "monthly supply = multiple doses", but the
 *     exact injection count per 28-day vial is unconfirmed. Copy therefore says
 *     "a 28-day supply of on-demand doses" WITHOUT a hard number. Add a count
 *     ("up to N injections per supply") once Rimo confirms the vial yield.
 *   - Dosing ceiling (≤1 per 24 hr, ≤8 per month) is the Vyleesi label bound —
 *     safe to state; confirm it matches the compounded product before go-live.
 */

/**
 * Hero stat row — kept to three neutral, non-efficacy facts (the page was pulled
 * once for outcome claims; stats stay factual).
 */
export const HERO_STATS = [
  { label: "Taken", value: "On-demand" },
  { label: "The active", value: "PT-141" },
  { label: "Clinic visits", value: "0" },
] as const;

/**
 * PT-141 is a SINGLE active, so the old "three actives" grid is repurposed into
 * three FACETS of the one molecule (pathway / timing / design). Same card shape
 * as before so IngredientRow stays a near-clone of Hot Sauce's MoleculeRow. Only
 * the first card carries molecule art (`mol`); the others render text-only.
 */
export const INGREDIENTS = [
  {
    key: "bremelanotide",
    mol: "/brand/mol-bremelanotide.svg",
    slot: "The pathway",
    role: "Works in the brain",
    name: "PT-141 · Bremelanotide",
    mechanism:
      "PT-141 activates the melanocortin pathway — the brain system that governs sexual desire itself, not blood flow. It works upstream of the physical response, where wanting actually begins.",
  },
  {
    key: "on-demand",
    mol: null,
    slot: "The timing",
    role: "On-demand, not daily",
    name: "Take it before the moment",
    mechanism:
      "A single small injection about 45 minutes ahead of intimacy — used only in the window that matters to you. No daily pill to remember, no weeks-long ramp before anything shifts.",
  },
  {
    key: "non-hormonal",
    mol: null,
    slot: "The design",
    role: "Non-hormonal",
    name: "Doesn't touch your hormones",
    mechanism:
      "PT-141 isn't a hormone and isn't a blood-flow drug. It's a targeted peptide that speaks to the desire pathway directly — delivered through a prefilled pen you use at home.",
  },
] as const;

/**
 * The daily pill (Addyi-style, never named) vs. Passion. On-demand is the wedge:
 * no weeks-long daily ramp, no everyday alcohol restriction.
 */
export const COMPARISON_ROWS = [
  { label: "When you take it", oldWay: "Every single day", passion: "Only when you want to" },
  { label: "Time to notice a change", oldWay: "Weeks of daily dosing", passion: "The day you need it" },
  { label: "How it's taken", oldWay: "A daily pill", passion: "One on-demand injection" },
  { label: "Targets desire in the brain", oldWay: "Varies", passion: "Yes — PT-141 acts on the desire pathway" },
  { label: "Hormonal", oldWay: "Sometimes", passion: "No — non-hormonal" },
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
    title: "Arrives ready to use",
    body: "A plain, unmarked package with everything you need — prefilled pens, alcohol swabs, and a simple first-dose guide. Refill on your terms; pause or cancel whenever you like.",
    meta: "2 days",
  },
] as const;

/**
 * PRICING — three subscription tiers (Rimo dose plan "PT-141 Standard").
 * Source of truth (Rimo): 1-Month (1 vial) $185 · 3-Month (3 vials) $495 ·
 * 6-Month (6 vials) $888. Each vial = a 28-day supply of on-demand doses.
 * `perMonth` is derived (495/3=165, 888/6=148) to tell the savings story.
 * `note` deliberately avoids a hard injection count until Rimo confirms yield.
 */
export const PRICING_TIERS = [
  {
    id: "1mo",
    name: "1 Month",
    supply: "1 vial · 28-day supply",
    price: "$185",
    perMonth: "$185/mo",
    save: null,
    featured: false,
    cta: "Start your visit",
    note: "A full month's supply of on-demand doses. Cancel anytime.",
  },
  {
    id: "3mo",
    name: "3 Months",
    supply: "3 vials · 84-day supply",
    price: "$495",
    perMonth: "$165/mo",
    save: "Save $60",
    featured: true,
    cta: "Start your visit",
    note: "Our most popular plan — a better per-month rate, delivered on your schedule.",
  },
  {
    id: "6mo",
    name: "6 Months",
    supply: "6 vials · 168-day supply",
    price: "$888",
    perMonth: "$148/mo",
    save: "Save $222",
    featured: false,
    cta: "Start your visit",
    note: "The best per-month value for staying on your terms, longer.",
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
    body: `"What I love is using it when I actually want to — not a pill every single morning, hoping something shifts weeks down the line."`,
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
    title: "The pen was easier than I feared",
    body: `"I was nervous about an injection. The first-dose guide and the little pen made it a two-second thing — barely a pinch."`,
  },
] as const;

export const FAQS = [
  {
    q: "What is Passion?",
    a: "Passion is a clinician-prescribed, on-demand treatment for low sexual desire in women. It delivers PT-141 (bremelanotide) — a targeted peptide that works on the brain's desire pathway — through a small, prefilled injection you use only when you want it.",
  },
  {
    q: "How is it different from a daily pill?",
    a: "Daily treatments have to be taken every single day, often for weeks, before you may notice a difference — and they ask you to give up alcohol the whole time. Passion is used on-demand, in the window that matters to you, and works through a different pathway in the brain.",
  },
  {
    q: "It's an injection — does it hurt?",
    a: "It's a small subcutaneous injection you give yourself with a prefilled pen, using a very thin needle in the abdomen or thigh. Most people describe it as a quick pinch. Your kit includes a simple first-dose guide, and support is a message away.",
  },
  {
    q: "How often can I use it?",
    a: "Passion is on-demand — used about 45 minutes before intimacy, only when you want it. To use it safely, take no more than one dose in any 24 hours and no more than eight doses in a month. Your clinician will confirm what's right for you.",
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
    a: "Always. Your order arrives in a plain, unmarked package — no product name and no brand on the outside — with everything you need to store and use it at home.",
  },
  {
    q: "Who shouldn't use Passion?",
    a: "Passion isn't right for everyone — including people with uncontrolled high blood pressure or known cardiovascular disease, since PT-141 can briefly raise blood pressure. The intake screens for this and the prescribing clinician confirms everything before approving your treatment.",
  },
] as const;

export const SCIENCE_STATS = [
  {
    big: "1",
    unit: "active",
    label: "One targeted peptide",
    body: "PT-141 (bremelanotide) works on the brain's desire pathway — one mechanism, aimed where wanting actually starts.",
  },
  {
    big: "1",
    unit: "dose",
    label: "On-demand, not daily",
    body: "Used only when you want it. No weeks-long daily ramp, no everyday pill to remember and build a routine around.",
  },
  {
    big: "~45",
    unit: "min",
    label: "Use ahead of the moment",
    body: "Designed to be used in the window before intimacy, on your timing — not locked to a rigid daily schedule.",
  },
  {
    big: "0",
    unit: "clinics",
    label: "Care from home",
    body: "Private online intake, licensed-clinician review, and discreet delivery — the whole thing, start to finish.",
  },
] as const;
