# SpicyRx Backend Revenue Model — Design Spec

- **Date:** 2026-05-28
- **Status:** Approved (design), pending implementation plan
- **Owner:** Roberto

## Purpose

An internal, browser-based tool to project **SpicyRx backend (telehealth subscription) revenue** under adjustable parameters. It mirrors the backend-funnel swim lanes (Traffic → Capture → Convert → Recover → Retain) and is **cohort-based and time-phased** — because subscription revenue compounds as cohorts accumulate net of churn, a single-period snapshot would badly undercount it.

This is a decision tool for pressure-testing assumptions ("what does backend revenue look like if intake completion is 40% vs 55%, or if the call team recovers 15% of abandons?"), not a production system.

## Architecture

- **Standalone Vite + React + TypeScript app** in a subfolder: `backend-model/`.
- **Fully isolated** from the SpicyRx marketing site: its own `package.json`, its own dev server, its own `tsconfig`. It must never ship in the public marketing build. The root `tsconfig`/eslint/Next build must exclude it (verify during implementation).
- Charts via **Recharts**. Styling minimal (plain CSS or a tiny utility setup — no dependency on the marketing site's Tailwind/shadcn).
- The `AGENTS.md` "modified Next.js" warning does **not** apply here — this app is Vite, independent of Next.
- **Persistence:** current parameters saved to `localStorage` (refresh-safe) + JSON export/import so a "base case" can be saved to a file.

### Layout

```
backend-model/
  package.json
  tsconfig.json
  vite.config.ts
  index.html
  src/
    model/
      types.ts          # parameter + output type definitions
      engine.ts         # pure projection function (no UI, no side effects)
      defaults.ts       # base-case parameter values
      engine.test.ts    # unit tests (TDD)
    components/         # input panels + dashboard widgets
    App.tsx
    main.tsx
    persistence.ts      # localStorage + JSON import/export
```

## Model engine (`engine.ts`)

A **pure function**: `project(params: ModelParams): ModelOutput`. No UI, no side effects → unit-testable with known-input/known-output assertions. This is the heart of the tool; the UI is a skin over it.

### Sources (13) — tagged STOCK or FLOW

Each source has a `type` that changes how it contributes each month:

- **FLOW** = recurring *new* volume each month → fresh conversion. Input: monthly volume + monthly growth %.
- **STOCK** = a finite pool re-marketed, converting at a *declining* monthly rate as it is worked/fatigues. Input: pool size + monthly conversion % + decay %. The pool depletes each month.

| # | Source | Type |
|---|--------|------|
| 1 | Spicy Cubes buyers ~15K orders/mo (post-purchase OTO) | FLOW |
| 2 | Spicy Cubes cart abandoners (checkout started, not completed) | FLOW |
| 3 | Spicy Cubes non-buyer email capture (daily pop-up/newsletter) | FLOW |
| 4 | Buyer + lifetime email list 400K (gender-segmented) | STOCK |
| 5 | SMS list 100K (gender-segmented) | STOCK |
| 6 | Dormant buyers ~80K | STOCK |
| 7 | Behavioral segments (solo-male + repeat buyers) | STOCK |
| 8 | Spicy Cubes website soft CTA (A/B tested) | FLOW |
| 9 | SpicyAlien — Spicy Cubes default | FLOW |
| 10 | SpicyAlien — periodic Hot Sauce ManyChat drops | FLOW |
| 11 | UGC creator roster | FLOW |
| 12 | Branded + competitor search | FLOW |
| 13 | Retargeting + lookalikes | FLOW |

Each source also carries a `source → quiz-start` conversion rate (absorbs routing differences: DM CTR, on-site CTA, email→LP, etc.) and a per-source CAC ($0 for owned/creator, >$0 for paid). Non-buyer captures and abandoners get **lower** quiz-start rates so their colder intent is visible.

**Owned-pool accumulation:** non-converting non-buyer captures and abandoners roll into the re-marketable owned pool, so owned-channel contribution *rises* over the horizon. (v1 simplification: model fresh-month conversion as FLOW; represent ongoing re-marketing via the growing STOCK list. Note the simplification in code.)

### Funnel stages (shared, per-track rates)

`quiz-start → quiz-complete → intake-complete → approved → first charge` = new subscriber.

- At quiz-complete, a **routing split** assigns: % male (ED track), % female (libido track), % "forward to partner".
- The **forward-to-partner** path generates additional *male* quiz-starts at a forward-link conversion rate (feedback loop).
- Each downstream stage rate can differ by track (ED vs female libido).

### Recovery uplifts (per leak point)

Applied as additive recovery of the abandoning population:
- quiz-abandon recovery %
- intake-abandon recovery % (call team + SMS)
- approved/charge-fail recovery % (dunning + call)

### Cohort accumulation & retention

Each month's new subscribers form a cohort. Active subscribers in month *m* = sum over cohorts of `cohort_size × survival(age)`. Survival uses:
- month-1 retention (large first-month drop),
- steady-state monthly churn after that.

**Expansion revenue** layers on active subs:
- supplement attach % × monthly supplement margin,
- household cross-sell: % of female subs convert a male partner to ED (and vice versa) → feeds new subs,
- quarterly-prepay adoption (improves effective retention / LTV).

### Economics (per track)

- subscription price /mo
- Rx/pharmacy COGS /mo
- **provider review cost** — charged **per review, approve or not** (card-before-review filters low intent but reviews still cost money)
- payment processing %
- per-source CAC
- call-team cost (loaded monthly or per-dial)

### Outputs (`ModelOutput`)

- new subscribers/month (per track, with per-source breakdown)
- active subscribers over time (cohort accumulation)
- MRR over time (stacked: base subs + expansion), and ARR run-rate
- contribution margin over time
- blended + per-track **CAC, LTV, LTV:CAC, payback period**
- **funnel waterfall** per track (traffic → quiz → intake → approved → subscriber) with leak sizes
- **channel contribution** (which source drives backend revenue)
- **owned-vs-paid contribution over time**, with crossover month flagged
- **wasted review spend** — provider reviews paid for that never became a charge (makes the pre-qualification lever visible)

## UI

- **Input panels**, grouped and collapsible: Sources (table, 13 rows), Funnel rates, Recovery, Economics, Retention/Expansion, Projection settings (horizon, default 24 mo).
- **Dashboard:** KPI cards (M24 MRR, ARR run-rate, total active subs, blended LTV/CAC/payback, wasted review spend) + charts (stacked-area MRR, active-sub curve, funnel waterfall, channel contribution bar, owned-vs-paid crossover).
- All inputs pre-filled with sane **base-case defaults** (below) so the model runs immediately; every value editable.

## Default base-case values (editable placeholders)

- ED price $129/mo, COGS $35/mo; female-libido price $99/mo, COGS $30/mo.
- Provider review cost $20/review; processing 3%.
- Stage rates: quiz-start→complete 55%, →intake-complete 45% (biggest leak), →approved 80%, →first-charge 70%.
- Quiz routing: 65% ED, 20% female, 15% forward-to-partner; forward-link→new-male conversion 30%.
- Recovery uplifts: quiz-abandon +8%, intake-abandon +15%, charge-fail +40%.
- Retention: month-1 retention 75%, steady-state monthly churn 12%.
- Expansion: supplement attach 20% @ $25/mo margin; female→partner cross-sell 10%.
- Source volumes/rates: per-source defaults seeded in `defaults.ts` (e.g., 15K buyers/mo @ 4% quiz-start; non-buyer capture 6K/mo @ 1.5%; etc.) — clearly marked as guesses.

## Testing

Engine built **test-first**:
- funnel multiplication (volume × stage rates → expected subs),
- FLOW growth and STOCK depletion/decay behavior,
- cohort accumulation + churn decay over months,
- recovery-uplift math,
- LTV / payback / contribution-margin calcs,
- expansion + household cross-sell feedback.
UI verified by running the dev server in the browser and exercising inputs.

## Out of scope (YAGNI)

- Multi-scenario side-by-side compare UI and sensitivity/tornado analysis (chose cohort projection only; JSON export covers manual scenario saving).
- Auth, server, database, real-data integration (Shopify/Klaviyo APIs).
- Mobile-optimized layout (desktop internal tool).
```
