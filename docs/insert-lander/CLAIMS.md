# Insert-card lander — claim sources

Every factual assertion in `lib/content-card.ts`, with where it came from.

This is a **source table, not a compliance review.** The copy was written to sell;
deciding what is claimable, and how it must be qualified, is the compliance
pass's job. This exists so that pass (and the lawyer after it) doesn't have to
re-derive the evidence.

Evidence tiers:
- **LABEL** — FDA-approved labeling or the EU SmPC
- **TRIAL** — published clinical trial
- **HISTORY** — documented, non-clinical
- **UNTRIALED** — pharmacologically reasoned, no trial of this specific thing

---

## Eros

| Claim in copy | Source | Tier |
|---|---|---|
| "70mg sildenafil. 20mg tadalafil. 4mg apomorphine. 94mg of actives" | Product formulation | — |
| Sublingual absorption, 2mL dose | Product format | — |
| Apomorphine acts centrally, not on blood vessels | EU Uprima SmPC: "operates through a **central mechanism of action**… acts within the central nervous system, particularly the hypothalamic region" | LABEL |
| "men in trial averaged 18 minutes" (apomorphine onset) | EU Uprima SmPC — median time to erection 18–19 min | LABEL |
| 4mg is "the dose from the largest erectile trial ever run on it: 854 men, 8,263 tablets" | Heaton, *World J Urol* 2001 — 3 phase III crossovers, n=854 | TRIAL |
| Sildenafil "men succeeded in 69% of attempts against 22% on placebo" | Goldstein, *NEJM* 1998;338:1397-404, flexible-dose arm, n=329 | TRIAL |
| Tadalafil "348 men… 36 hours later, 59% of attempts worked against 28% on placebo" | Porst, *Urology* 2003, n=348 — 59.2% vs 28.3% at 36h | TRIAL |
| "36 hours isn't where the effect ran out, it's where the researchers stopped measuring" | 36h was the longest timepoint tested; efficacy still significant there | TRIAL |
| Tadalafil half-life "about four and a half times sildenafil's" | FDA labels: tadalafil 17.5h, sildenafil ~4h | LABEL |
| Sublingual sildenafil "roughly six times the blood level at fifteen minutes" | Cuomo, *Front Pharmacol* 2018, n=20 — ~6× serum at 15 min, 3× first-hour AUC | TRIAL |
| "headaches… 5% instead of 35%" | Same study — headache 5% sublingual film vs 35% oral (p<0.05) | TRIAL |
| Apomorphine "works on the part of the brain that decides you're in the mood" | Mechanism is central (LABEL). **Note for review:** apomorphine's phase III program improved four of five IIEF domains and did **not** move sexual desire; Danjou *BJCP* 1988 measured "increased tumescence and rigidity without modifications of sexual arousal." Written as positioning, not as a trial result. | LABEL + see note |
| Closer: apomorphine's signal terminates in cGMP, which the PDE5 pair protects | EU Uprima SmPC describes the chain: dopamine → oxytocin → "local actions of nitric oxide, the conversion of GTP to cGMP" | LABEL |
| **Not claimed anywhere:** that the three-molecule combination is clinically proven | No trial of these three together exists at any sample size. Deliberately absent. | UNTRIALED |

**Deliberately removed from earlier drafts:** "4mg is the top of the clinically
studied range." False in both directions — 5mg and 6mg were trialed in 569 men
(Dula, *Urology* 2000), and sublingual apomorphine is FDA-approved at 10–30mg
for Parkinson's (Kynmobi). This claim is still live in `lib/content-eros.ts:50`
and on `/eros/science`.

---

## Passion

Copy is currently built from the Vyleesi label and the Addyi contrast only.
Deeper research was in flight at time of writing.

| Claim in copy | Source | Tier |
|---|---|---|
| PT-141 = bremelanotide, same molecule as Vyleesi | FDA VYLEESI label | LABEL |
| "the only FDA-approved on-demand treatment for low desire in premenopausal women" | Vyleesi is on-demand and approved for acquired, generalized HSDD in premenopausal women; Addyi is daily | LABEL |
| Works through the melanocortin system in the brain | FDA label: melanocortin receptor agonist, MC1R > MC4R > MC3R > MC5R > MC2R. **Note:** the label also states "the mechanism by which VYLEESI improves HSDD in women is unknown." | LABEL |
| "isn't a hormone and isn't a stimulant" | Correct by class | LABEL |
| "about 45 minutes ahead" | Label: at least 45 minutes before anticipated sexual activity | LABEL |
| "the same kind of fine needle used for insulin, into the thigh or the stomach" | Vyleesi is subcutaneous, abdomen or thigh. This product is a compounded vial + insulin syringe. | LABEL + product |
| "desire itself… the endpoint the trials measured" | RECONNECT co-primary endpoints were FSFI-Desire and FSDS-DAO Q13 distress | TRIAL |
| Daily alternative "takes weeks to build up… comes with a drinking restriction" | Addyi (flibanserin) — daily dosing, alcohol warning | LABEL |
| Origin: Arizona 1989 tanning program, effect found accidentally | Al-Obeidi et al., *J Med Chem* 1989;32:2555-61 (MT-II). Hadley, *Peptides* 2005 — "discovered accidentally while studying… tanning" | HISTORY |

**Numbers deliberately NOT used, and why:**
- RECONNECT effect sizes (FSFI-Desire +0.5 vs +0.2; +0.6 vs +0.2) are
  statistically robust and clinically modest, on a 1.2–6.0 scale. Quoting the
  p-value without the effect size would be misleading.
- The label states there was **no significant difference in satisfying sexual
  events**, a secondary endpoint.
- Nausea occurred in **40%** of patients vs 1.3% placebo. Relevant to any
  tolerability claim.
- The "eight-hour erection" origin anecdote is real and primary-sourced
  (Hadley 2005) but describes an **accidental double dose**, not a therapeutic
  effect. Therapeutic-dose trial durations are far shorter. Not usable as an
  efficacy claim.

---

## Surface note

`/card` is `noindex, nofollow` and carries no nav or footer. It inherits the
global Google Ads gtag from `app/layout.tsx`, as every page on the site does.
Quiz answers are marketing-motive only — no symptom or diagnosis questions.
