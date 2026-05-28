# SpicyRx Backend Revenue Model — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone browser tool that projects SpicyRx telehealth subscription revenue over 24 months from adjustable funnel parameters, using a cohort model.

**Architecture:** A self-contained Vite + React + TypeScript app in `backend-model/`, fully isolated from the SpicyRx Next.js marketing site (own package.json, own dev server, excluded from root tooling). A pure TypeScript engine (`src/model/engine.ts`) computes the projection from a `ModelParams` object; the React UI is a skin over it. Charts via Recharts. Params persisted to localStorage with JSON import/export.

**Tech Stack:** Vite, React 19, TypeScript, Vitest (unit tests), Recharts.

---

## File Structure

```
backend-model/
  package.json          # own deps + scripts (dev, build, test)
  tsconfig.json         # own TS config
  vite.config.ts        # Vite + vitest config
  index.html
  src/
    main.tsx            # React entry
    App.tsx             # layout: inputs + dashboard
    model/
      types.ts          # all parameter + output interfaces
      engine.ts         # pure project() + exported helpers
      engine.test.ts    # vitest unit tests
      defaults.ts       # base-case ModelParams
    persistence.ts      # localStorage load/save + JSON import/export
    persistence.test.ts
    components/
      SourcesPanel.tsx
      RatesPanel.tsx
      EconomicsPanel.tsx
      RetentionPanel.tsx
      Dashboard.tsx     # KPI cards + charts
```

Root-tooling isolation: add `backend-model` to the root `tsconfig.json` `exclude` array and root `eslint` ignores so the Next build/lint never touches it.

---

### Task 1: Scaffold the isolated app

**Files:**
- Create: `backend-model/package.json`
- Create: `backend-model/tsconfig.json`
- Create: `backend-model/vite.config.ts`
- Create: `backend-model/index.html`
- Create: `backend-model/src/main.tsx`
- Create: `backend-model/src/App.tsx`
- Modify: root `tsconfig.json` (add to `exclude`)

- [ ] **Step 1: Create `backend-model/package.json`**

```json
{
  "name": "backend-model",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "recharts": "^2.15.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `backend-model/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `backend-model/vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { globals: true, environment: "node" },
});
```

- [ ] **Step 4: Create `backend-model/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SpicyRx Backend Revenue Model</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `backend-model/src/App.tsx` (placeholder) and `backend-model/src/main.tsx`**

```tsx
// App.tsx
export default function App() {
  return <h1>SpicyRx Backend Revenue Model</h1>;
}
```

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 6: Exclude from root tooling**

In the root `tsconfig.json`, add `"backend-model"` to the `exclude` array (create the array if absent). Read the file first; append the entry.

- [ ] **Step 7: Install and verify**

Run: `cd backend-model && npm install && npm run dev`
Expected: Vite serves on localhost; page shows the heading. Stop the server (Ctrl-C) after confirming.

- [ ] **Step 8: Commit**

```bash
git add backend-model tsconfig.json
git commit -m "feat(model): scaffold isolated Vite revenue-model app"
```

---

### Task 2: Define model types

**Files:**
- Create: `backend-model/src/model/types.ts`

- [ ] **Step 1: Write `types.ts`**

```ts
export type SourceType = "flow" | "stock";

export interface Source {
  id: string;
  label: string;
  type: SourceType;
  monthlyVolume: number;     // flow: new entries/month
  monthlyGrowthPct: number;  // flow: growth per month, e.g. 0.02
  poolSize: number;          // stock: initial re-marketable pool
  monthlyConvPct: number;    // stock: % of remaining pool entering funnel/month
  poolDecayPct: number;      // stock: pool fatigue per month
  quizStartRate: number;     // entries -> quiz-start
  cac: number;               // $ per entry (0 for owned/creator)
}

export interface StageRates {
  quizStartToComplete: number;
  completeToIntakeComplete: number;
  intakeToApproved: number;
  approvedToCharge: number;
}

export interface FunnelRates {
  ed: StageRates;
  female: StageRates;
  routing: { edPct: number; femalePct: number; forwardPct: number };
  forwardLinkConv: number; // forwarded link -> new male quiz-start
}

export interface Recovery {
  quizAbandonPct: number;
  intakeAbandonPct: number;
  chargeFailPct: number;
}

export interface TrackEconomics {
  price: number;   // monthly subscription
  rxCogs: number;  // monthly pharmacy COGS
}

export interface Economics {
  ed: TrackEconomics;
  female: TrackEconomics;
  providerReviewCost: number; // per completed-intake review
  processingPct: number;      // payment processing
  callTeamMonthlyCost: number;
}

export interface Retention {
  month1Retention: number;     // fraction surviving into month 2
  steadyMonthlyChurn: number;  // monthly churn after month 1
  supplementAttachPct: number;
  supplementMargin: number;    // monthly margin per attached active sub
  householdCrossSellPct: number; // female new subs converting a male partner
  quarterlyPrepayPct: number;  // reduces effective steady churn
}

export interface ProjectionSettings {
  horizonMonths: number;
}

export interface ModelParams {
  sources: Source[];
  funnel: FunnelRates;
  recovery: Recovery;
  economics: Economics;
  retention: Retention;
  projection: ProjectionSettings;
}

export interface MonthlyPoint {
  month: number;
  newSubsEd: number;
  newSubsFemale: number;
  activeSubsEd: number;
  activeSubsFemale: number;
  mrrBase: number;
  mrrExpansion: number;
  mrr: number;
  contributionMargin: number;
  ownedNewSubs: number;
  paidNewSubs: number;
}

export interface ChannelContribution {
  sourceId: string;
  label: string;
  newSubsTotal: number;
}

export interface WaterfallStage {
  stage: string;
  count: number;
}

export interface ModelOutput {
  monthly: MonthlyPoint[];
  channels: ChannelContribution[];
  waterfallEd: WaterfallStage[];
  waterfallFemale: WaterfallStage[];
  kpis: {
    finalMrr: number;
    arrRunRate: number;
    totalActiveSubs: number;
    blendedCac: number;
    blendedLtv: number;
    ltvToCac: number;
    paybackMonths: number;
    wastedReviewSpend: number;
    ownedPaidCrossoverMonth: number | null;
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add backend-model/src/model/types.ts
git commit -m "feat(model): add model types"
```

---

### Task 3: Engine — per-source monthly entries & quiz starts

**Files:**
- Create: `backend-model/src/model/engine.ts`
- Create: `backend-model/src/model/engine.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, it, expect } from "vitest";
import { sourceEntriesSeries } from "./engine";
import type { Source } from "./types";

const flow: Source = {
  id: "f", label: "Flow", type: "flow",
  monthlyVolume: 1000, monthlyGrowthPct: 0.1,
  poolSize: 0, monthlyConvPct: 0, poolDecayPct: 0,
  quizStartRate: 0.05, cac: 0,
};

const stock: Source = {
  id: "s", label: "Stock", type: "stock",
  monthlyVolume: 0, monthlyGrowthPct: 0,
  poolSize: 1000, monthlyConvPct: 0.1, poolDecayPct: 0,
  quizStartRate: 1, cac: 0,
};

describe("sourceEntriesSeries", () => {
  it("grows a flow source by growth pct each month", () => {
    const s = sourceEntriesSeries(flow, 3);
    expect(s[0]).toBeCloseTo(1000);
    expect(s[1]).toBeCloseTo(1100);
    expect(s[2]).toBeCloseTo(1210);
  });

  it("depletes a stock pool as it converts", () => {
    const s = sourceEntriesSeries(stock, 3);
    expect(s[0]).toBeCloseTo(100); // 1000 * 0.1
    expect(s[1]).toBeCloseTo(90);  // remaining 900 * 0.1
    expect(s[2]).toBeCloseTo(81);  // remaining 810 * 0.1
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: FAIL — `sourceEntriesSeries is not a function`.

- [ ] **Step 3: Implement `sourceEntriesSeries`**

```ts
import type { Source } from "./types";

// Entries (people who reach the funnel) from a single source, per month.
export function sourceEntriesSeries(source: Source, horizon: number): number[] {
  const out: number[] = [];
  if (source.type === "flow") {
    for (let m = 0; m < horizon; m++) {
      out.push(source.monthlyVolume * Math.pow(1 + source.monthlyGrowthPct, m));
    }
    return out;
  }
  let pool = source.poolSize;
  for (let m = 0; m < horizon; m++) {
    const entries = pool * source.monthlyConvPct;
    out.push(entries);
    pool = (pool - entries) * (1 - source.poolDecayPct);
  }
  return out;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add backend-model/src/model/engine.ts backend-model/src/model/engine.test.ts
git commit -m "feat(model): per-source flow/stock entries series"
```

---

### Task 4: Engine — routing, forward loop, funnel chain, reviews

**Files:**
- Modify: `backend-model/src/model/engine.ts`
- Modify: `backend-model/src/model/engine.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { routeQuizStarts, trackChain } from "./engine";
import type { FunnelRates, Recovery, StageRates } from "./types";

const rates: StageRates = {
  quizStartToComplete: 0.5,
  completeToIntakeComplete: 0.5,
  intakeToApproved: 1,
  approvedToCharge: 1,
};
const noRecovery: Recovery = { quizAbandonPct: 0, intakeAbandonPct: 0, chargeFailPct: 0 };

describe("routeQuizStarts", () => {
  it("splits by routing and feeds forwarded leads back to ED", () => {
    const funnel = {
      ed: rates, female: rates,
      routing: { edPct: 0.6, femalePct: 0.2, forwardPct: 0.2 },
      forwardLinkConv: 0.5,
    } as FunnelRates;
    const r = routeQuizStarts(1000, funnel);
    // ED 600 + forwarded (200 * 0.5 = 100) = 700; female 200
    expect(r.ed).toBeCloseTo(700);
    expect(r.female).toBeCloseTo(200);
  });
});

describe("trackChain", () => {
  it("multiplies stage rates to new subs and counts reviews", () => {
    const r = trackChain(1000, rates, noRecovery);
    expect(r.intakeComplete).toBeCloseTo(250); // 1000*.5*.5
    expect(r.reviews).toBeCloseTo(250);
    expect(r.newSubs).toBeCloseTo(250);        // *1*1
  });

  it("applies intake-abandon recovery", () => {
    const r = trackChain(1000, rates, { ...noRecovery, intakeAbandonPct: 0.2 });
    // complete=500, intakeComplete base=250, abandon=250, +250*0.2=50 => 300
    expect(r.intakeComplete).toBeCloseTo(300);
    expect(r.newSubs).toBeCloseTo(300);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: FAIL — `routeQuizStarts`/`trackChain` not exported.

- [ ] **Step 3: Implement both functions in `engine.ts`**

```ts
import type { FunnelRates, Recovery, StageRates } from "./types";

export function routeQuizStarts(total: number, funnel: FunnelRates): { ed: number; female: number } {
  const ed = total * funnel.routing.edPct;
  const female = total * funnel.routing.femalePct;
  const forwarded = total * funnel.routing.forwardPct * funnel.forwardLinkConv;
  return { ed: ed + forwarded, female };
}

export interface ChainResult {
  complete: number;
  intakeComplete: number;
  approved: number;
  reviews: number;
  newSubs: number;
}

export function trackChain(quizStarts: number, rates: StageRates, recovery: Recovery): ChainResult {
  let complete = quizStarts * rates.quizStartToComplete;
  complete += (quizStarts - complete) * recovery.quizAbandonPct;

  let intakeComplete = complete * rates.completeToIntakeComplete;
  intakeComplete += (complete - intakeComplete) * recovery.intakeAbandonPct;

  const reviews = intakeComplete; // every completed intake is reviewed (and billed)
  const approved = intakeComplete * rates.intakeToApproved;

  let newSubs = approved * rates.approvedToCharge;
  newSubs += (approved - newSubs) * recovery.chargeFailPct;

  return { complete, intakeComplete, approved, reviews, newSubs };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend-model/src/model
git commit -m "feat(model): routing, forward loop, funnel chain"
```

---

### Task 5: Engine — cohort survival & active subscribers

**Files:**
- Modify: `backend-model/src/model/engine.ts`
- Modify: `backend-model/src/model/engine.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { survival, expectedLifetimeMonths } from "./engine";
import type { Retention } from "./types";

const ret: Retention = {
  month1Retention: 0.8, steadyMonthlyChurn: 0.1,
  supplementAttachPct: 0, supplementMargin: 0,
  householdCrossSellPct: 0, quarterlyPrepayPct: 0,
};

describe("survival", () => {
  it("is 1 at join, month1Retention at age 1, then decays by churn", () => {
    expect(survival(0, ret)).toBeCloseTo(1);
    expect(survival(1, ret)).toBeCloseTo(0.8);
    expect(survival(2, ret)).toBeCloseTo(0.72);  // 0.8 * 0.9
    expect(survival(3, ret)).toBeCloseTo(0.648); // 0.8 * 0.9^2
  });

  it("quarterly prepay lowers effective churn", () => {
    const r2 = { ...ret, quarterlyPrepayPct: 0.5 }; // effective churn 0.05
    expect(survival(2, r2)).toBeCloseTo(0.76); // 0.8 * 0.95
  });
});

describe("expectedLifetimeMonths", () => {
  it("sums survival across the horizon", () => {
    const lt = expectedLifetimeMonths(ret, 4);
    expect(lt).toBeCloseTo(1 + 0.8 + 0.72 + 0.648);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: FAIL — functions not exported.

- [ ] **Step 3: Implement**

```ts
import type { Retention } from "./types";

export function survival(age: number, ret: Retention): number {
  if (age <= 0) return 1;
  if (age === 1) return ret.month1Retention;
  const effectiveChurn = ret.steadyMonthlyChurn * (1 - ret.quarterlyPrepayPct);
  return ret.month1Retention * Math.pow(1 - effectiveChurn, age - 1);
}

export function expectedLifetimeMonths(ret: Retention, horizon: number): number {
  let sum = 0;
  for (let age = 0; age < horizon; age++) sum += survival(age, ret);
  return sum;
}

// Active subs in each month given a new-subs-per-month series.
export function activeFromCohorts(newSubs: number[], ret: Retention): number[] {
  return newSubs.map((_, m) => {
    let active = 0;
    for (let c = 0; c <= m; c++) active += newSubs[c] * survival(m - c, ret);
    return active;
  });
}
```

- [ ] **Step 4: Add a test for `activeFromCohorts`**

```ts
import { activeFromCohorts } from "./engine";

describe("activeFromCohorts", () => {
  it("accumulates surviving cohorts", () => {
    const active = activeFromCohorts([100, 100], ret);
    expect(active[0]).toBeCloseTo(100);
    expect(active[1]).toBeCloseTo(100 * 0.8 + 100); // old cohort decays, new joins
  });
});
```

- [ ] **Step 5: Run to verify all pass, then commit**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: PASS.

```bash
git add backend-model/src/model
git commit -m "feat(model): cohort survival and active subscribers"
```

---

### Task 6: Engine — top-level `project()` with economics, KPIs, channels, waterfall

**Files:**
- Modify: `backend-model/src/model/engine.ts`
- Modify: `backend-model/src/model/engine.test.ts`

- [ ] **Step 1: Write failing test (integration over a tiny 2-month model)**

```ts
import { project } from "./engine";
import type { ModelParams } from "./types";

function tinyParams(): ModelParams {
  const stageOne = { quizStartToComplete: 1, completeToIntakeComplete: 1, intakeToApproved: 1, approvedToCharge: 1 };
  return {
    sources: [{
      id: "buyers", label: "Buyers", type: "flow",
      monthlyVolume: 100, monthlyGrowthPct: 0,
      poolSize: 0, monthlyConvPct: 0, poolDecayPct: 0,
      quizStartRate: 1, cac: 0,
    }],
    funnel: {
      ed: stageOne, female: stageOne,
      routing: { edPct: 1, femalePct: 0, forwardPct: 0 },
      forwardLinkConv: 0,
    },
    recovery: { quizAbandonPct: 0, intakeAbandonPct: 0, chargeFailPct: 0 },
    economics: {
      ed: { price: 100, rxCogs: 0 }, female: { price: 0, rxCogs: 0 },
      providerReviewCost: 0, processingPct: 0, callTeamMonthlyCost: 0,
    },
    retention: {
      month1Retention: 1, steadyMonthlyChurn: 0,
      supplementAttachPct: 0, supplementMargin: 0,
      householdCrossSellPct: 0, quarterlyPrepayPct: 0,
    },
    projection: { horizonMonths: 2 },
  };
}

describe("project", () => {
  it("accumulates MRR across cohorts with no churn", () => {
    const out = project(tinyParams());
    expect(out.monthly[0].newSubsEd).toBeCloseTo(100);
    expect(out.monthly[0].mrr).toBeCloseTo(100 * 100);   // 100 subs * $100
    expect(out.monthly[1].activeSubsEd).toBeCloseTo(200); // both cohorts alive
    expect(out.monthly[1].mrr).toBeCloseTo(200 * 100);
  });

  it("counts wasted review spend when approvals don't all convert", () => {
    const p = tinyParams();
    p.funnel.ed = { ...p.funnel.ed, approvedToCharge: 0.5 };
    p.economics.providerReviewCost = 10;
    const out = project(p);
    // month0: 100 reviewed, 50 charged => 50 wasted * $10 = 500 (x2 months)
    expect(out.kpis.wastedReviewSpend).toBeCloseTo(1000);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: FAIL — `project` not exported.

- [ ] **Step 3: Implement `project()`**

```ts
import type {
  ModelParams, ModelOutput, MonthlyPoint, ChannelContribution, WaterfallStage,
} from "./types";

export function project(params: ModelParams): ModelOutput {
  const H = params.projection.horizonMonths;
  const { funnel, recovery, economics, retention } = params;

  // Per-source entries and quiz starts.
  const entriesBySource = params.sources.map((s) => sourceEntriesSeries(s, H));
  const quizStartsBySource = params.sources.map((entries, i) =>
    entries.map((e) => e * params.sources[i].quizStartRate)
  );

  const newEd: number[] = [], newFemale: number[] = [];
  const reviewsEd: number[] = [], reviewsFemale: number[] = [];
  const paidNew: number[] = [], ownedNew: number[] = [];
  const acquisitionCost: number[] = [];

  // running totals for waterfall (month 0 representative + summed)
  const chanSubs = params.sources.map(() => 0);

  for (let m = 0; m < H; m++) {
    const totalQuiz = quizStartsBySource.reduce((a, q) => a + q[m], 0);
    const routed = routeQuizStarts(totalQuiz, funnel);
    const ed = trackChain(routed.ed, funnel.ed, recovery);
    let fem = trackChain(routed.female, funnel.female, recovery);

    // household cross-sell: female new subs convert a male partner -> extra ED subs
    const extraEd = fem.newSubs * retention.householdCrossSellPct;
    const edSubs = ed.newSubs + extraEd;

    newEd.push(edSubs);
    newFemale.push(fem.newSubs);
    reviewsEd.push(ed.reviews);
    reviewsFemale.push(fem.reviews);

    // owned vs paid + CAC (attribute by quiz-start share)
    let paid = 0, owned = 0, cost = 0;
    const totalNew = edSubs + fem.newSubs;
    quizStartsBySource.forEach((q, i) => {
      const share = totalQuiz > 0 ? q[m] / totalQuiz : 0;
      const subsFromSource = totalNew * share;
      chanSubs[i] += subsFromSource;
      if (params.sources[i].cac > 0) paid += subsFromSource;
      else owned += subsFromSource;
      cost += entriesBySource[i][m] * params.sources[i].cac;
    });
    paidNew.push(paid);
    ownedNew.push(owned);
    acquisitionCost.push(cost);
  }

  const activeEd = activeFromCohorts(newEd, retention);
  const activeFemale = activeFromCohorts(newFemale, retention);

  const monthly: MonthlyPoint[] = [];
  let wastedReviewSpend = 0, crossover: number | null = null;
  for (let m = 0; m < H; m++) {
    const mrrBase = activeEd[m] * economics.ed.price + activeFemale[m] * economics.female.price;
    const activeTotal = activeEd[m] + activeFemale[m];
    const mrrExpansion = activeTotal * retention.supplementAttachPct * retention.supplementMargin;
    const mrr = mrrBase + mrrExpansion;

    const cogs = activeEd[m] * economics.ed.rxCogs + activeFemale[m] * economics.female.rxCogs;
    const reviewSpend = (reviewsEd[m] + reviewsFemale[m]) * economics.providerReviewCost;
    const charged = newEd[m] + newFemale[m];
    const reviewed = reviewsEd[m] + reviewsFemale[m];
    wastedReviewSpend += (reviewed - charged) * economics.providerReviewCost;

    const contributionMargin =
      mrr - cogs - mrr * economics.processingPct - reviewSpend -
      acquisitionCost[m] - economics.callTeamMonthlyCost;

    monthly.push({
      month: m, newSubsEd: newEd[m], newSubsFemale: newFemale[m],
      activeSubsEd: activeEd[m], activeSubsFemale: activeFemale[m],
      mrrBase, mrrExpansion, mrr, contributionMargin,
      ownedNewSubs: ownedNew[m], paidNewSubs: paidNew[m],
    });
    if (crossover === null && ownedNew[m] > paidNew[m]) crossover = m;
  }

  const channels: ChannelContribution[] = params.sources.map((s, i) => ({
    sourceId: s.id, label: s.label, newSubsTotal: chanSubs[i],
  }));

  const totalNewSubs = newEd.reduce((a, b) => a + b, 0) + newFemale.reduce((a, b) => a + b, 0);
  const totalAcq = acquisitionCost.reduce((a, b) => a + b, 0) +
    reviewsEd.reduce((a, b) => a + b, 0) * economics.providerReviewCost +
    reviewsFemale.reduce((a, b) => a + b, 0) * economics.providerReviewCost +
    economics.callTeamMonthlyCost * H;
  const blendedCac = totalNewSubs > 0 ? totalAcq / totalNewSubs : 0;

  const ltEd = expectedLifetimeMonths(retention, H);
  const cmPerSubEd = economics.ed.price * (1 - economics.processingPct) - economics.ed.rxCogs;
  const cmPerSubFem = economics.female.price * (1 - economics.processingPct) - economics.female.rxCogs;
  const blendedPrice = totalNewSubs > 0
    ? (newEd.reduce((a, b) => a + b, 0) * cmPerSubEd + newFemale.reduce((a, b) => a + b, 0) * cmPerSubFem) / totalNewSubs
    : 0;
  const blendedLtv = blendedPrice * ltEd;
  const monthlyCmPerSub = blendedPrice;

  const last = monthly[H - 1];
  const waterfall = (track: "ed" | "female"): WaterfallStage[] => {
    const totalQuiz0 = quizStartsBySource.reduce((a, q) => a + q[0], 0);
    const routed = routeQuizStarts(totalQuiz0, funnel);
    const r = trackChain(track === "ed" ? routed.ed : routed.female, funnel[track], recovery);
    const starts = track === "ed" ? routed.ed : routed.female;
    return [
      { stage: "Quiz starts", count: starts },
      { stage: "Quiz complete", count: r.complete },
      { stage: "Intake complete", count: r.intakeComplete },
      { stage: "Approved", count: r.approved },
      { stage: "Subscriber", count: r.newSubs },
    ];
  };

  return {
    monthly, channels,
    waterfallEd: waterfall("ed"), waterfallFemale: waterfall("female"),
    kpis: {
      finalMrr: last.mrr,
      arrRunRate: last.mrr * 12,
      totalActiveSubs: last.activeSubsEd + last.activeSubsFemale,
      blendedCac, blendedLtv,
      ltvToCac: blendedCac > 0 ? blendedLtv / blendedCac : 0,
      paybackMonths: monthlyCmPerSub > 0 ? blendedCac / monthlyCmPerSub : 0,
      wastedReviewSpend,
      ownedPaidCrossoverMonth: crossover,
    },
  };
}
```

- [ ] **Step 4: Run to verify all engine tests pass**

Run: `cd backend-model && npx vitest run src/model/engine.test.ts`
Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add backend-model/src/model
git commit -m "feat(model): top-level projection with economics, KPIs, waterfall"
```

---

### Task 7: Base-case defaults

**Files:**
- Create: `backend-model/src/model/defaults.ts`

- [ ] **Step 1: Write `defaults.ts`** (values from the spec; all editable in the UI)

```ts
import type { ModelParams, Source } from "./types";

const owned = (id: string, label: string, type: "flow" | "stock",
  vol: number, pool: number, conv: number, qsr: number): Source => ({
  id, label, type,
  monthlyVolume: type === "flow" ? vol : 0,
  monthlyGrowthPct: type === "flow" ? 0.02 : 0,
  poolSize: type === "stock" ? pool : 0,
  monthlyConvPct: type === "stock" ? conv : 0,
  poolDecayPct: type === "stock" ? 0.05 : 0,
  quizStartRate: qsr, cac: 0,
});

const paid = (id: string, label: string, vol: number, qsr: number, cac: number): Source => ({
  id, label, type: "flow", monthlyVolume: vol, monthlyGrowthPct: 0.03,
  poolSize: 0, monthlyConvPct: 0, poolDecayPct: 0, quizStartRate: qsr, cac,
});

export const DEFAULT_PARAMS: ModelParams = {
  sources: [
    owned("buyers", "Spicy Cubes buyers (post-purchase OTO)", "flow", 15000, 0, 0, 0.04),
    owned("abandoners", "Cart abandoners", "flow", 8000, 0, 0, 0.02),
    owned("noncapture", "Non-buyer email capture (daily)", "flow", 6000, 0, 0, 0.015),
    owned("email", "Email list 400K", "stock", 0, 400000, 0.03, 0.03),
    owned("sms", "SMS list 100K", "stock", 0, 100000, 0.04, 0.04),
    owned("dormant", "Dormant buyers 80K", "stock", 0, 80000, 0.02, 0.03),
    owned("behavioral", "Solo-male + repeat buyers", "stock", 0, 20000, 0.05, 0.06),
    owned("onsite", "Spicy Cubes site soft CTA", "flow", 12000, 0, 0, 0.02),
    owned("alien", "SpicyAlien — Spicy Cubes", "flow", 30000, 0, 0, 0.01),
    owned("hotsauce", "SpicyAlien — Hot Sauce drops", "flow", 10000, 0, 0, 0.05),
    owned("ugc", "UGC roster", "flow", 20000, 0, 0, 0.01),
    paid("search", "Branded + competitor search", 5000, 0.08, 6),
    paid("retarget", "Retargeting + lookalikes", 40000, 0.015, 4),
  ],
  funnel: {
    ed: { quizStartToComplete: 0.55, completeToIntakeComplete: 0.45, intakeToApproved: 0.8, approvedToCharge: 0.7 },
    female: { quizStartToComplete: 0.55, completeToIntakeComplete: 0.4, intakeToApproved: 0.75, approvedToCharge: 0.65 },
    routing: { edPct: 0.65, femalePct: 0.2, forwardPct: 0.15 },
    forwardLinkConv: 0.3,
  },
  recovery: { quizAbandonPct: 0.08, intakeAbandonPct: 0.15, chargeFailPct: 0.4 },
  economics: {
    ed: { price: 129, rxCogs: 35 },
    female: { price: 99, rxCogs: 30 },
    providerReviewCost: 20, processingPct: 0.03, callTeamMonthlyCost: 8000,
  },
  retention: {
    month1Retention: 0.75, steadyMonthlyChurn: 0.12,
    supplementAttachPct: 0.2, supplementMargin: 25,
    householdCrossSellPct: 0.1, quarterlyPrepayPct: 0.2,
  },
  projection: { horizonMonths: 24 },
};
```

- [ ] **Step 2: Add a sanity test** in `engine.test.ts`

```ts
import { DEFAULT_PARAMS } from "./defaults";

describe("defaults", () => {
  it("produce a positive, finite final MRR", () => {
    const out = project(DEFAULT_PARAMS);
    expect(out.kpis.finalMrr).toBeGreaterThan(0);
    expect(Number.isFinite(out.kpis.finalMrr)).toBe(true);
    expect(out.monthly).toHaveLength(24);
  });
});
```

- [ ] **Step 3: Run + commit**

Run: `cd backend-model && npx vitest run`
Expected: PASS.

```bash
git add backend-model/src/model
git commit -m "feat(model): base-case default parameters"
```

---

### Task 8: Persistence (localStorage + JSON import/export)

**Files:**
- Create: `backend-model/src/persistence.ts`
- Create: `backend-model/src/persistence.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { saveParams, loadParams, toJson, fromJson } from "./persistence";
import { DEFAULT_PARAMS } from "./model/defaults";

describe("persistence", () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v; },
    });
  });

  it("round-trips through localStorage", () => {
    saveParams(DEFAULT_PARAMS);
    const loaded = loadParams();
    expect(loaded?.projection.horizonMonths).toBe(24);
  });

  it("round-trips through JSON", () => {
    const json = toJson(DEFAULT_PARAMS);
    expect(fromJson(json)?.economics.ed.price).toBe(129);
  });

  it("returns null on invalid JSON", () => {
    expect(fromJson("not json")).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd backend-model && npx vitest run src/persistence.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `persistence.ts`**

```ts
import type { ModelParams } from "./model/types";

const KEY = "spicyrx-backend-model-params";

export function saveParams(p: ModelParams): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function loadParams(): ModelParams | null {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as ModelParams) : null;
}

export function toJson(p: ModelParams): string {
  return JSON.stringify(p, null, 2);
}

export function fromJson(s: string): ModelParams | null {
  try {
    return JSON.parse(s) as ModelParams;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Run + commit**

Run: `cd backend-model && npx vitest run src/persistence.test.ts`
Expected: PASS.

```bash
git add backend-model/src/persistence.ts backend-model/src/persistence.test.ts
git commit -m "feat(model): params persistence and JSON import/export"
```

---

### Task 9: Input panels

**Files:**
- Create: `backend-model/src/components/SourcesPanel.tsx`
- Create: `backend-model/src/components/RatesPanel.tsx`
- Create: `backend-model/src/components/EconomicsPanel.tsx`
- Create: `backend-model/src/components/RetentionPanel.tsx`

These are controlled-input components. Each takes the relevant slice of `ModelParams` and an `onChange` callback. No unit tests (verified in browser); keep them small and focused.

- [ ] **Step 1: `SourcesPanel.tsx`** — editable table of the 13 sources

```tsx
import type { Source } from "../model/types";

export function SourcesPanel({ sources, onChange }: {
  sources: Source[];
  onChange: (next: Source[]) => void;
}) {
  const update = (i: number, field: keyof Source, value: string) => {
    const next = sources.map((s, idx) =>
      idx === i ? { ...s, [field]: field === "label" || field === "type" ? value : Number(value) } : s
    );
    onChange(next);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Source</th><th>Type</th><th>Vol/Pool</th><th>Quiz-start %</th><th>CAC $</th>
        </tr>
      </thead>
      <tbody>
        {sources.map((s, i) => (
          <tr key={s.id}>
            <td>{s.label}</td>
            <td>{s.type}</td>
            <td>
              <input type="number"
                value={s.type === "flow" ? s.monthlyVolume : s.poolSize}
                onChange={(e) => update(i, s.type === "flow" ? "monthlyVolume" : "poolSize", e.target.value)} />
            </td>
            <td><input type="number" step="0.01" value={s.quizStartRate}
              onChange={(e) => update(i, "quizStartRate", e.target.value)} /></td>
            <td><input type="number" value={s.cac}
              onChange={(e) => update(i, "cac", e.target.value)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- [ ] **Step 2: `RatesPanel.tsx`, `EconomicsPanel.tsx`, `RetentionPanel.tsx`** — number inputs bound to each field

Follow the same controlled-input pattern: each renders labeled `<input type="number">` for every field in `FunnelRates`+`Recovery`, `Economics`, and `Retention` respectively, calling `onChange` with the updated slice. Example for one field (replicate per field):

```tsx
// EconomicsPanel.tsx (excerpt)
import type { Economics } from "../model/types";
export function EconomicsPanel({ economics, onChange }: {
  economics: Economics; onChange: (e: Economics) => void;
}) {
  return (
    <div>
      <label>ED price/mo
        <input type="number" value={economics.ed.price}
          onChange={(e) => onChange({ ...economics, ed: { ...economics.ed, price: Number(e.target.value) } })} />
      </label>
      {/* repeat for ed.rxCogs, female.price, female.rxCogs, providerReviewCost, processingPct, callTeamMonthlyCost */}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add backend-model/src/components
git commit -m "feat(model): parameter input panels"
```

---

### Task 10: Dashboard (KPI cards + charts)

**Files:**
- Create: `backend-model/src/components/Dashboard.tsx`

- [ ] **Step 1: `Dashboard.tsx`** — takes `ModelOutput`, renders KPI cards + Recharts

```tsx
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import type { ModelOutput } from "../model/types";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

export function Dashboard({ out }: { out: ModelOutput }) {
  const { kpis, monthly, channels, waterfallEd } = out;
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Kpi label="Final MRR" value={fmt(kpis.finalMrr)} />
        <Kpi label="ARR run-rate" value={fmt(kpis.arrRunRate)} />
        <Kpi label="Active subs" value={Math.round(kpis.totalActiveSubs).toLocaleString()} />
        <Kpi label="Blended LTV" value={fmt(kpis.blendedLtv)} />
        <Kpi label="LTV:CAC" value={kpis.ltvToCac.toFixed(1) + "x"} />
        <Kpi label="Payback (mo)" value={kpis.paybackMonths.toFixed(1)} />
        <Kpi label="Wasted review $" value={fmt(kpis.wastedReviewSpend)} />
        <Kpi label="Owned>Paid month" value={kpis.ownedPaidCrossoverMonth ?? "—"} />
      </div>

      <h3>MRR over time</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" /><YAxis /><Tooltip />
          <Area dataKey="mrrBase" stackId="1" name="Base" />
          <Area dataKey="mrrExpansion" stackId="1" name="Expansion" />
        </AreaChart>
      </ResponsiveContainer>

      <h3>Owned vs paid new subs</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" /><YAxis /><Tooltip />
          <Line dataKey="ownedNewSubs" name="Owned" />
          <Line dataKey="paidNewSubs" name="Paid" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Channel contribution (subs over horizon)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={channels} layout="vertical">
          <XAxis type="number" /><YAxis type="category" dataKey="label" width={200} /><Tooltip />
          <Bar dataKey="newSubsTotal" />
        </BarChart>
      </ResponsiveContainer>

      <h3>ED funnel waterfall (month 0)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={waterfallEd}>
          <XAxis dataKey="stage" /><YAxis /><Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, minWidth: 120 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add backend-model/src/components/Dashboard.tsx
git commit -m "feat(model): dashboard with KPI cards and charts"
```

---

### Task 11: Wire `App.tsx` together

**Files:**
- Modify: `backend-model/src/App.tsx`

- [ ] **Step 1: Implement `App.tsx`** — state, recompute, persistence, panels + dashboard

```tsx
import { useEffect, useMemo, useState } from "react";
import type { ModelParams } from "./model/types";
import { DEFAULT_PARAMS } from "./model/defaults";
import { project } from "./model/engine";
import { loadParams, saveParams, toJson, fromJson } from "./persistence";
import { SourcesPanel } from "./components/SourcesPanel";
import { RatesPanel } from "./components/RatesPanel";
import { EconomicsPanel } from "./components/EconomicsPanel";
import { RetentionPanel } from "./components/RetentionPanel";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const [params, setParams] = useState<ModelParams>(() => loadParams() ?? DEFAULT_PARAMS);
  useEffect(() => { saveParams(params); }, [params]);
  const out = useMemo(() => project(params), [params]);

  const exportJson = () => {
    const blob = new Blob([toJson(params)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "spicyrx-model.json"; a.click();
  };
  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((t) => { const p = fromJson(t); if (p) setParams(p); });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 24, padding: 24 }}>
      <div>
        <h2>Parameters</h2>
        <button onClick={() => setParams(DEFAULT_PARAMS)}>Reset to base case</button>
        <button onClick={exportJson}>Export JSON</button>
        <input type="file" accept="application/json" onChange={importJson} />
        <SourcesPanel sources={params.sources} onChange={(sources) => setParams({ ...params, sources })} />
        <RatesPanel funnel={params.funnel} recovery={params.recovery}
          onChange={(funnel, recovery) => setParams({ ...params, funnel, recovery })} />
        <EconomicsPanel economics={params.economics}
          onChange={(economics) => setParams({ ...params, economics })} />
        <RetentionPanel retention={params.retention}
          onChange={(retention) => setParams({ ...params, retention })} />
      </div>
      <div>
        <h2>Projection</h2>
        <Dashboard out={out} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run the dev server and verify in browser**

Run: `cd backend-model && npm run dev`
Expected: page loads with parameters on the left and KPI cards + four charts on the right. Editing an input (e.g., ED price, or intake completion rate) updates the dashboard live. Export downloads a JSON; reset restores base case. Refresh preserves edits (localStorage).

- [ ] **Step 3: Run full test suite**

Run: `cd backend-model && npm test`
Expected: all engine + persistence tests PASS.

- [ ] **Step 4: Commit**

```bash
git add backend-model/src/App.tsx
git commit -m "feat(model): wire app, live recompute, persistence, import/export"
```

---

## Self-Review

**Spec coverage:** 13 stock/flow sources (Task 7) ✓; per-source quiz-start + CAC (Tasks 2,3) ✓; funnel chain with routing + forward loop (Task 4) ✓; recovery uplifts (Task 4) ✓; cohort accumulation + churn + quarterly prepay (Task 5) ✓; expansion + household cross-sell (Task 6) ✓; economics incl. per-review provider cost + wasted-review spend (Task 6) ✓; KPIs CAC/LTV/payback (Task 6) ✓; channel contribution + owned/paid crossover + waterfall (Task 6) ✓; UI panels + dashboard (Tasks 9,10,11) ✓; persistence + JSON (Task 8) ✓; isolation from root tooling (Task 1) ✓.

**Placeholder scan:** Task 9 Step 2 intentionally describes a repeated controlled-input pattern with one concrete example — the pattern is fully specified and the panel field lists are enumerated in `types.ts`. All engine/logic tasks contain complete code.

**Type consistency:** `project`, `sourceEntriesSeries`, `routeQuizStarts`, `trackChain`, `survival`, `expectedLifetimeMonths`, `activeFromCohorts` are defined once and reused with matching signatures. `ModelParams`/`ModelOutput` field names match across engine, defaults, persistence, and UI.

**Note for executor:** `RatesPanel` and `RetentionPanel` follow the `EconomicsPanel`/`SourcesPanel` controlled-input pattern; render one number input per field in `FunnelRates`+`Recovery` and `Retention` respectively.
