# SPICY ALIEN — Design System

> Every human is just an alien running factory firmware. Modern pharmacology is the cheat code.

Spicy Alien is a telehealth brand for people who treat their body as a system to upgrade, not a default to accept. We're a **performance brand that happens to be regulated** — not a wellness brand.

## The brief

- **First product:** *Hot Sauce* — a 4‑in‑1 sublingual ED liquid combining sildenafil, tadalafil, vardenafil, and apomorphine. Hits in ~15 min, lasts up to 36 hrs, works on **desire and performance**.
- **Model:** clinician‑prescribed, shipped discreetly, no clinic visit, no pharmacy line.
- **Roadmap:** ED is the wedge. Hair, sleep, recovery, longevity — anywhere pharmacology meets self‑optimization.
- **Voice:** confident, irreverent, science‑literate, never bro‑y.
- **Visual:** cosmic, futurist, lab‑grade pharma meets hot‑sauce heat.

## Sources

> **No production codebase, Figma file, or screenshots were provided.** This system was built from the brand brief above. Every visual decision is an opinionated first draft — tag changes liberally so we converge on the real direction.

If you have any of the following, drop them in and ask us to re-align:

- Brand book / mood board (PDF, Figma, Notion)
- Product UI for the marketing site or patient portal
- Logo / wordmark assets (SVG preferred)
- Approved color values, type licenses, photography style guide

---

## CONTENT FUNDAMENTALS

> Sound like a confident, clinically-grounded performance brand. Lead with benefits. Name the comparison. Let the science do the heavy lifting.

### Voice traits (and what they kill)

| ✅ Do                                                              | ❌ Don't                                            |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| **Benefit-first.** Lead with what the user gets.                   | Lead with mechanism, brand mission, or manifesto.   |
| **Confident.** Make claims. Back them with numbers.                | Hedge, ask permission, apologize.                   |
| **Comparative.** Name the alternative ("vs. Viagra," "vs. pills"). | Pretend the category doesn't exist.                 |
| **Science-literate, not science-leading.** Mechanism is the *evidence*, not the headline. | Lead a marketing page with a receptor diagram.      |
| **Direct.** Say "erectile dysfunction." Say "desire."              | Euphemisms. "Down there." "Performance issues."     |
| **Triplet rhythm.** Speed. Strength. Stamina.                      | Long, ornate sentences in a hero.                   |
| **Lightly editorial.** One italic flourish per page.               | Two italic flourishes. Or zero — fully sterile.     |

### The triplet headline pattern

Spicy Alien headlines lean on **three short benefit clauses**, often followed by one editorial line that flips or extends them. This is the canonical shape.

```
Faster onset.
Peak strength.
36-hour window.
Plus desire.
```

Other examples — same shape:
- "Speed. Strength. Stamina." → "Plus desire."
- "One drop. Four ingredients. Fifteen minutes."
- "3 steps. Zero awkwardness."
- "One solution. Four powerful ingredients."

### Casing & punctuation

- **Sentence case** in product UI, button labels, and section headers.
- **Title Case** only for the wordmark and product names (**Spicy Alien**, **Hot Sauce**, **Quad** when comparing).
- **All caps** only for eyebrows, lab readouts, badges (`SCHEDULE IV`, `Rx ONLY`, `LOT 0042`). Always mono + 0.14em tracking.
- **Oxford comma.** Always.
- **No exclamation marks** in body copy. One per landing page, max, in a callout.
- **Em dashes — like this —** for asides. No spaced en dashes.

### Pronouns

- **"You"** for the reader. Direct address.
- **"We"** only when we (Spicy Alien) are taking action — "We ship in unmarked packaging," "We don't prescribe to anyone we wouldn't prescribe ourselves."
- Never "us" or "the team."

### Emoji & special chars

- **No emoji in product UI.** Ever.
- **No emoji in marketing** either, going forward — Quad-style is restrained. Lab-readout dots (●) and the arrow (→) are the only ornaments allowed.
- Unicode allowed for technical content: `μg`, `≥`, `±`, `°`, `½`, `→`.
- Use `→` (not `>`) for "next" / progression. Use `·` (middle dot) as a metadata separator.

### Example copy

**Hero headline:**
> Faster onset.
> Peak strength.
> 36-hour window.
> *Plus desire.*

**Hero subhead:**
> Hot Sauce is a 4-in-1 sublingual that stacks the active ingredients in Viagra, Cialis, and Levitra — plus apomorphine to ignite desire. Hits in 15 minutes. Goes the whole weekend. Clinician-prescribed, shipped discreetly.

**Primary CTA:** `See if you qualify →`

**Section header (comparison):** *Old pills vs. Hot Sauce.*

**Section header (ingredients):** *One solution. Four powerful ingredients.*

**Section header (process):** *3 steps. Zero awkwardness.*

**Eyebrow:** `● USA-MADE · CLINICIAN-PRESCRIBED · 4-IN-1`

**Ingredient role labels (mono eyebrow → display headline → mono name → body):**
- The spark · **Ignites desire** · APOMORPHINE
- The lift · **Rapid onset** · VARDENAFIL
- The push · **Peak strength** · SILDENAFIL
- The window · **Lasts 36 hours** · TADALAFIL

**Disclosure (footer-style):**
> Hot Sauce is a compounded medication available only by prescription from a US-licensed clinician. Not for use in patients taking nitrates. Side effects may include headache, flushing, and dyspepsia. Full safety info →

**Microcopy (mono, lab register):**
- Loading: `Calibrating · 02s remaining`
- Success: `Order received · clinician review queued`
- Error: `Address rejected · we don't ship to PO boxes`

### Comparison framing

When we name the competitor or category, **we use first-person plural for ourselves and "the old way" or the specific drug name for theirs.** Never disparage by name — frame the molecule, not the brand.

| Axis            | The old way   | Hot Sauce           |
| --------------- | ------------- | ------------------- |
| Onset time      | 45–60 min     | ~15 min             |
| Window          | 4–6 hr        | up to 36 hr         |
| Works on desire | No            | Yes — apomorphine   |
| Clinic visit    | Often required | No                 |

### Headline patterns we use a lot

- **Triplet → editorial twist:** "Speed. Strength. Stamina. *Plus desire.*"
- **The comparison:** "Old pills vs. Hot Sauce." "What single-molecule pills can't do."
- **The shortcut:** "Skip the clinic. Skip the pharmacy line." "3 steps. Zero awkwardness."
- **The ingredient call-out:** "One solution. Four powerful ingredients." "Four molecules. One drop."

### What we no longer do (deprecated)

- **The firmware metaphor** ("Factory firmware ships with bugs. Patch yours.") — too abstract for performance marketing; reserve for brand-mission moments only, never the home hero.
- **The "not a wellness brand" line** as a hero pull quote — replaced by the harder-working "Hospital-grade power. Direct to your door."
- **Naming the schedule** (`SCHEDULE IV · Rx ONLY · LOT 0042`) in the hero eyebrow — moved to the legal footer where it belongs. Hero eyebrows now lead with proof points (USA-made, clinician-prescribed, 4-in-1).

---

## VISUAL FOUNDATIONS

### Palette

| Role          | Token            | Hex       | Use                                             |
| ------------- | ---------------- | --------- | ----------------------------------------------- |
| Page bg dark  | `--void`         | `#0A0907` | Default canvas, deep space                      |
| Surface dark  | `--crater`       | `#1F1A14` | Cards, modals on dark                           |
| Page bg light | `--bone`         | `#FAF6EE` | Inverse / forms / labels                        |
| Heat primary  | `--hot`          | `#FF3B1F` | Brand mark, primary CTA, capsaicin              |
| Heat warm     | `--ember`        | `#FF7A1A` | Secondary heat, eyebrows                        |
| Lab yellow    | `--serum`        | `#F5D547` | Warnings, lab highlights                        |
| Lab green     | `--vitals`       | `#38FFA1` | "System ok," success, vitals                    |
| Cosmic pink   | `--plasma`       | `#FF2E8A` | Irreverent pop, "specimen" labels               |
| Alien blue    | `--cobalt`       | `#2A4FFF` | Rare beacon, info                               |
| Violet        | `--ultraviolet`  | `#8A4DFF` | Deep-space gradients                            |

**Rules:**
- The default canvas is **dark and warm**, not blue-black.
- **One heat color per surface.** Don't stack `--hot` + `--plasma` next to each other; pick.
- `--vitals` and `--cobalt` are *signal* colors, not decoration. If something is green, it means "ok." If something is blue, it means "alien" or "info." Don't dilute.

### Type

- **Display — Space Grotesk** (600/700) at *tight tracking* (`-0.03em`). Used at sizes ≥34px.
- **Body — Manrope** (400/500/600). 16px default, 18px for prose.
- **Editorial — Instrument Serif** (italic). Used sparingly for pharma-editorial pull quotes and product names in long-form copy. Always italic.
- **Mono — JetBrains Mono.** Eyebrows, lab readouts, ingredient lists, dosing, timecodes.

> ⚠️ **Font substitution flag:** These are Google Fonts proxies for the directional cuts we'd license in production (something like Söhne / GT America for body, NB Akademie Mono for readouts, Söhne Mono, ABC Diatype). If you have approved files, drop them in `fonts/` and we'll swap.

### Backgrounds

- Default: solid `--void`. **Black is the brand.**
- Hero surfaces: `--grad-vacuum` (radial fade to elevate the top-center).
- Section breaks: occasional `--grad-capsaicin` full-bleed band (the only reliable place to use the full hot-sauce gradient — once per page, max).
- **No stock photography.** No people-on-couches. No "lifestyle" shots. Imagery is either product, microscopy, or cosmic textures.
- Grain: subtle film grain overlay (`opacity: 0.04`) on dark surfaces — *not* on light surfaces.

### Imagery direction

- **Product:** dropper bottle, deep amber liquid, hard rim light, black backdrop. Single hero hero per page.
- **Macro:** microscopy of crystal formations, capsaicin under polarized light, molecular renders.
- **Cosmic:** nebulae, planetary surfaces, lab-photographed liquids that look like galaxies.
- **Color grade:** warm-shifted blacks, high-contrast highlights, no muddy mids. Either pitch dark or pharma-bright.
- **Avoid:** stock medical imagery, gym shots, sunset beaches, "concerned man" photography, anything that feels like Hims/Roman/Ro.

### Layout rules

- **12-column grid, 1280px max.** 32px gutter. 96px section padding.
- **Asymmetric hero composition.** Never center-align everything; let one column carry weight.
- **Fixed nav** on marketing, with a hairline border that appears on scroll (`var(--hairline)` reveal at >24px scroll).
- **Readouts in the margin.** Use mono labels (`SCHEDULE IV`, `LOT 0042`) as marginal metadata, not as headers.

### Corners & borders

- **Hard corners by default** (`--r-0`). Pharma-grade. Surgical.
- `--r-sm` (4px) on inputs, secondary cards.
- `--r-pill` (999px) on chips, badges, segmented controls — the dropper-bottle echo.
- **No medium-soft radii** (8–14px). They feel SaaS. We're either sharp or fully round.
- Borders: 1px hairline in `--ash` on dark, in a slightly-darker bone tone on light. 1.5px for input focus.

### Shadows

Two systems — never mix.

- **Lab shadows** (`--sh-lab-*`): clinical, even, dark. For cards and modals.
- **Heat glow** (`--sh-heat`, `--sh-heat-lg`): used **only** on primary CTAs and the "live" product card on the order flow. Pairs an inset ring with an outer glow.
- **Vitals glow** (`--sh-vitals`): success states only.

### Transparency & blur

- Use `backdrop-filter: blur(20px) saturate(140%)` on fixed nav after scroll.
- Modals: 70% `--void` underlay, blur 12px.
- Glass surfaces (rare): `rgba(31, 26, 20, 0.6)` over `--grad-vacuum`. Only on hero overlays.

### Motion

Snappy, mechanical. **Aliens don't bounce.**

- **Default ease:** `--ease-out` (`cubic-bezier(0.2, 0.8, 0.2, 1)`). 200–320ms.
- **Press / micro:** 120ms, `--ease-out`.
- **Snap (chips, toggles):** `--ease-snap` — tiny overshoot, 200ms.
- **Page transitions:** crossfade + 8px upward translate, 320ms. No slide-in panels longer than 400ms.
- **Hero "drop":** the dropper-bottle illustration on the hero falls in with a 2-stage spring; this is the one place a longer animation is allowed.
- **No parallax.** Reads as 2014.
- **Loading:** prefer determinate counters in mono ("Calibrating · 02s") over spinners. If you must spin, it's a thin 1.5px ring in `--hot`.

### Hover & press

- **Hover (buttons):** brighten 4% + the heat glow grows by 20% over 200ms. Never change color hue on hover.
- **Hover (links):** underline appears (1px, current color, offset 4px).
- **Hover (cards):** lift 2px via `transform: translateY(-2px)`. No shadow swap.
- **Press:** scale to 0.98, 120ms. No fill change.

### Spacing

- **4px base.** Tight inside components, generous between sections.
- **Two valid rhythms:** *tight* (4/8/12/16) for inside cards, *loose* (32/48/64/96) between sections. Avoid 20/24/28 — they pollute the cadence.

### What we never do

- Bluish-purple Spotify gradient backgrounds.
- Rounded cards with a single colored left-border accent stripe.
- Emoji-decorated value-prop cards.
- "Trusted by 50,000+ men" social-proof bars under the hero.
- Smiling-doctor stock photography.
- "Free shipping!" on the CTA.
- Hand-drawn squiggle-underline emphasis.

---

## ICONOGRAPHY

We use a **single icon family — Lucide** (CDN) — at **1.75px stroke weight**, drawn with round caps and round joins. Lucide reads as lab equipment when sized small (~16–20px) and as schematic illustration when sized large (~40–80px), which gives us range without two icon systems.

### Rules

- **Stroke** icons only. No filled or duotone variants.
- **1.75px stroke** at 24px reference size. Scale stroke linearly with size.
- **Currentcolor.** Never hardcode an icon color; let the parent set it.
- **Sizes:** 16, 20, 24, 32, 48, 64. No in-between.
- **No emoji as icon.** Ever.
- **No unicode dingbats** for navigation. `→` is allowed in copy but not as a UI element.

### Custom marks

A handful of brand-specific marks live in `assets/icons/` as static SVG:

- `logo-mark.svg` — the alien-droplet glyph
- `logo-wordmark.svg` — full wordmark
- `dropper.svg` — the Hot Sauce dropper bottle (line illustration)
- `molecule-*.svg` — schematic molecule diagrams for sildenafil/tadalafil/vardenafil/apomorphine
- `pattern-grid.svg` — lab-paper grid background tile
- `pattern-noise.png` — film grain overlay (used at `opacity: 0.04`)

### CDN

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="droplet"></i>
<script>lucide.createIcons();</script>
```

> **Substitution flag:** Lucide is our placeholder. The brand may eventually license a custom icon set drawn to the dropper-bottle's geometry. Until then, Lucide at 1.75px is the canonical look.

---

## Index — what's in this folder

```
README.md                  this file
SKILL.md                   agent-skill manifest (auto-loaded by Claude Code)
colors_and_type.css        the only token file you need to import
fonts/                     webfont CSS imports (Google Fonts proxies for now)
assets/
  logo-mark.svg            primary alien-droplet mark
  logo-wordmark.svg        full "SPICY ALIEN" wordmark
  dropper.svg              Hot Sauce bottle line illustration
  molecule-sildenafil.svg  + tadalafil, vardenafil, apomorphine
  pattern-grid.svg         lab-paper background tile
  pattern-noise.svg        film-grain overlay
  icons/                   custom marks not in Lucide
preview/                   design-system tab cards (~700×varies)
ui_kits/
  marketing/               5-screen marketing-site recreation
  portal/                  patient consultation + checkout flow
```

### When in doubt

1. Dark, warm, sharp corners.
2. One heat color per surface.
3. If it doesn't move the bottle forward, kill it.

