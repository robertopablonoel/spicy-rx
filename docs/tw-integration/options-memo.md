# Triple Whale × Shopify — Options Memo & Cross-Sell Strategy Map

**Date:** 2026-07-28 · **Author:** Claude (Phase 1 discovery) · **Status:** DRAFT — pending Cole's scoping answer

> Scoping still open (see §0). SpicyRx is already live in TW via the **Rimo→TW** native pipe (orders SPIC‑0000001–5, $635, **source/UTM attribution only — no `checkout_token` join**). This memo covers all interpretations so it holds regardless of which is true.

---

## 0. The scoping fork (blocks the runbook, not this memo)

"Integrate TW with Shopify on SpicyRx" resolves to one of:
1. **New SpicyRx Shopify storefront** alongside the Next.js→Rimo checkout → TW connects to it natively; must dedupe against the Rimo pipe.
2. **Checkout migrating** off Rimo/Stripe onto Shopify → Rimo→TW eventually retired; compliance surface changes (Rx/ED on Shopify checkout).
3. **Spicy Cubes joining TW** (the strategic core — halo/LTV plays *need* Cubes data). Topology question, not a SpicyRx re-plumb.
4. **Both.**

**Working assumption:** #3 + a side of #1. Confirm, plus: *(a) is there a SpicyRx Shopify store today?* *(b) is Cubes in TW at all yet, or is TW SpicyRx-only?*

---

## 1. TW topology options (cost + limits + recommendation)

**Confirmed primary-source facts:**
- One TW **login can span many stores** via **Portfolio / Multi-Shop View** — true **blended** metrics (blended ROAS/spend/revenue) *and* per-shop drill-down, cross-store order-overlap detection, shop-breakdown reporting, invite users to multiple businesses at once. (kb 6224580, 10290427, 11554323)
- **Billing is per-store.** Each paid store = its own **GMV-tiered** subscription (or add it on the **free tier**). One payer can hold many subscriptions. *(Exact "free vs paid" UI wording = medium confidence, kb snippet only.)*
- **Pricing = trailing-12-mo GMV tiers**, not ad-spend: Free Plan / Founders Dash (free) → Foundation → Automate → Enterprise (~$20M+ GMV; formal **multi-brand reporting** is gated here). *(Exact $/tier from third parties only — e.g. ~$1,129/mo at $5–7M GMV — treat as indicative.)*
- **The Triple Pixel is per-shop** — each store installs its own; wrong `TripleName` sends data to the wrong shop.
- **Non-Shopify/headless (Rimo, custom Next.js, Stripe)** works only via **Data-In API + headless pixel**; native backend+pixel is Shopify/Woo/BigCommerce only.

| Option | Shape | Cost | Limits / risk | Best when |
|---|---|---|---|---|
| **A. One login, both shops, Portfolio View** ⭐ | SpicyRx + Cubes as two shops under one org | Two GMV-priced subs (or 1 paid + 1 free while small) | Formal "multi-brand reporting" is Enterprise-gated; blended view + per-shop works below that | Default — you want cross-brand blended + halo analysis |
| **B. Two fully separate accounts** | Isolated orgs | Two subs, no bundle benefit | **No** cross-store blended view, no order-overlap detection; double admin | Only if legal/compliance demands hard data isolation between the Rx brand and Cubes |
| **C. One paid + one free tier** | Paid on higher-GMV brand, free on the other | One paid sub | Free tier = 12-mo lookback, first/last-click only, **no multi-touch** — cripples the attribution you'd onboard for | Cubes is pre-revenue and you just want it visible |

**Recommendation: Option A.** It's the only topology that makes the cross-sell plays (§4) computable — halo, overlap, blended LTV all require both brands in one Portfolio View. Put the higher-GMV brand on a paid tier that includes **multi-touch attribution** (Foundation+); keep the smaller brand paid too if you need MTA on it, else free as a stopgap. Revisit Enterprise only if/when you need formal multi-brand reporting or Compass (MMM/incrementality).

---

## 2. What TW buys us — per brand

| | **SpicyRx (today: Rimo→TW)** | **Spicy Cubes (Shopify native)** |
|---|---|---|
| Ingestion | Data-In API / native Rimo pipe | **Auto webhooks** (orders/customers/products) |
| Attribution join keys | **UTM/source only — no `checkout_token`** | **`orderId` + `cotkn` (checkout token) + email/phone** handed over natively |
| Fidelity | "An order arrived with these UTMs" | "*This* browser session + full funnel ties to *this* order" |
| Funnel events | Limited | AddToCart, checkoutStarted, address/shipping/payment submitted, Purchase, NewSubscription |
| Post-purchase survey | Manual snippet + order-id injection | One-click Shopify thank-you app block |

**The upgrade the Shopify pixel delivers** (verified from readme.io): moves you from UTM-only to true session↔order stitching via `orderId` + checkout token + email/phone — first-party, iOS/ATT-resilient, recovers delayed attribution. *This only accrues to SpicyRx if SpicyRx checkout actually moves onto Shopify (fork #1/#2).* If SpicyRx stays on Rimo, SpicyRx keeps UTM-only fidelity and only **Cubes** gets the full pixel.

*Unverified: exact OAuth scope strings and whether the default install enables server-side sync — flagged, don't cite as fact.*

---

## 3. The MCC question — benefits enumerated + the health wall

**What one MCC over two subaccounts buys you (measurement side — fully usable by both brands):**
1. **Cross-account conversion tracking** — one conversion action at manager level, tracked across both subaccounts, fewer tags, less double-counting. *Caveat: an account uses account-specific OR cross-account conversions, never both; switching flips campaigns to the MCC default goals (can disrupt optimization). Reversible per Google's docs.*
2. **Consolidated MCC-level reporting / conversion columns** across both brands.
3. **Continuous audience sharing** — your-data (site/app) segments share up/down across subaccounts *(requires per-account permission + "This manager" as remarketing account)*.

### ⚠️ Sensitive-health wall — the load-bearing constraint
Google's **Personalized advertising policy** bars **advertiser-curated + Customer-Match audiences** for sensitive interest categories. **Health** (explicitly *"sexual health"* and *"genital… health"*) and **Sexual content** are both sensitive → **ED is squarely covered.**

**For the SpicyRx subaccount, these are PROHIBITED:** Customer Match · your-data/remarketing segments · lookalikes · audience expansion. You **cannot** target SpicyRx with a shared list, nor share a SpicyRx your-data audience out (may carry sensitive signals). Only **predefined Google audiences** are allowed (sensitive signals auto-excluded). Customer Match also needs good compliance/payment history; enhanced features need 90-day history + $50k lifetime spend, and Google **may contact managed accounts to verify** — an MCC over an ED brand invites that scrutiny.

**Net:** MCC = great for **measurement** across both brands (conversion tracking + consolidated reporting, unaffected). MCC audience-sharing is usable **Cubes→Cubes** but effectively dead on the SpicyRx side. Do **not** architect cross-sell on shared/Customer-Match audiences touching SpicyRx. *(Customer Match cross-subaccount sharing isn't even documented as supported — treat as unsupported.)*

**Verbatim corroboration** (Customer Match policy, adspolicy 6299717) — prohibited: *"Advertising for products related to sensitive information, such as pharmaceutical products, in a Customer Match campaign"* and *"These policies also apply to remarketing with Customer Match."* So it's not interpretation — pharma/health in Customer Match is named explicitly.

**Two nuances worth knowing:**
- **HCP carve-out (May 2025, third-party reported — unverified vs. primary):** the sensitive-health personalization restriction reportedly does *not* apply to campaigns targeting **licensed healthcare professionals in their professional capacity**. That's a B2B/HCP lane — **does not help patient-facing D2C ED**, but flag it if we ever run HCP acquisition.
- **Separate from targeting: the Healthcare & Medicines *certification* gate** (adspolicy 176031). Running Rx ads at all requires **LegitScript Healthcare Merchant Certification** (US) + Google cert — SpicyRx already carries the LegitScript seal (recent footer commits). That's the license to *run*; the sensitive-category rules above are the separate limit on *how you target*.

Sources: adspolicy 143465, 16701855, 16701453, 176031, 6299717; google-ads 3030657, 3061730, 6123188, 6139225, 9515197.

*Reporting footnote: MCC consolidated reporting lives on the Performance page + Report Editor + Dashboards; cross-account **Attribution reports** in the MCC are where consolidated conversion columns roll up. One stale-doc flag: Report Editor historically capped cross-account reporting at ~10 managed accounts ("plan to increase") — immaterial for 2 accounts, but verify in-product.*

---

## 4. Cross-sell strategy map — where TW plugs in

| Play | TW's role | Works? | Watch-outs |
|---|---|---|---|
| **Halo test** (does SpicyRx spend lift Cubes, or vice-versa?) | Portfolio View **blended metrics + cross-store order-overlap** quantify buyers crossing brands; blended ROAS shows halo | ✅ Needs **both brands in one TW org (Option A)** | Overlap join relies on email/customer match across shops — cleaner once Cubes has full pixel |
| **Outbound-link LTV bidding** (bid to downstream LTV, not first order) | TW **Retention/LTV** + Sonar feed true per-cohort LTV back to ad platforms as the bid signal | ✅ for Cubes (full pixel) | On SpicyRx, LTV feedback to Google can't ride Customer Match/your-data — **measurement only**, not personalized targeting |
| **Blended LTV / CAC** | Per-shop + blended LTV:CAC in one dashboard | ✅ Option A | Free-tier brand loses MTA (Option C caveat) |
| **Cross-brand audiences** | Share Cubes buyers as seed for Cubes lookalikes | ⚠️ **Cubes-only** | **Never** route SpicyRx audiences through this — §3 wall |

**Punchline:** TW is the **measurement + LTV-signal backbone** for the cross-sell machine. Halo and blended-LTV live entirely inside TW Portfolio View (Option A). The audience-activation half of cross-sell is legal for Cubes but **walled off from SpicyRx** by Google health policy — so LTV bidding on SpicyRx must be pure measurement feedback, not audience targeting.

---

## 5. Open questions Cole must decide before setup

1. **Scoping fork (§0):** Which of 1–4? Is there a SpicyRx Shopify store today? Is Cubes in TW yet?
2. **Topology:** Option A (one org, both shops) confirmed? Which brand carries the paid MTA tier; is the other paid or free-tier stopgap?
3. **SpicyRx checkout:** Staying on Rimo (UTM-only) or moving to Shopify (gain checkout-token join + compliance rethink)?
4. **Rimo↔Shopify dedupe:** If both pipes run for SpicyRx, how do we prevent double-counted orders?
5. **MCC:** Do we even want one? Confirmed benefit is measurement (conversion tracking + consolidated reporting). Given the health wall, is that worth switching conversion mode (and the managed-account verification exposure)?
6. **Data isolation:** Any legal/compliance requirement to keep the Rx brand's data hard-separated from Cubes (would force Option B over A)?
7. **Budget ceiling:** GMV tiers are per-store — comfortable carrying two subs, and roughly what GMV bracket is each brand in?

---

## 6. The feedback loop — how measurement becomes a Google optimization signal (verified)

**Two distinct loops — don't conflate them:**

**Loop 1 — enriched first-order signal (TW-native).** TW's **Sonar Optimize** *does* send to Google (not Meta-only), via **Google Enhanced Conversions for Leads** — it enriches/recovers Cubes purchase conversions and hands them to Google as conversion actions, lifting match rates so Smart Bidding sees more/cleaner purchases. *(Medium confidence — TW KB 403'd; corroborated across sources + TW's Sonar Optimize page listing Google as a destination.)* This optimizes to the **purchase at time of purchase**, not to LTV.

**Loop 2 — LTV / downstream-value bidding (NOT TW-native).** TW does **not** compute and push a predicted-LTV score to Google as a bid value (confident negative). To bid Google to LTV or to a **downstream cross-brand purchase**, you must either (a) take TW's LTV/downstream value and **upload it yourself via Google offline / enhanced conversion import with that value**, or (b) use a partner (e.g. Shirofune) that consumes TW attribution to steer Google bidding.

**Google-native base for Cubes (do this first, HIGH confidence):** Google & YouTube Shopify app → default conversions (**Purchase primary, with transaction revenue value**) → enable **Enhanced Conversions** → **don't double-count** (one purchase source per campaign) → **Maximize Conversion Value → Target ROAS** once volume is there. TW Sonar Optimize layers enrichment on top of this; it's not a substitute for the native conversion.

**Cross-brand downstream import (Loop 2 mechanics):** capture **GCLID** on the Cubes ad click (auto-tagging on), tie it to the eventual downstream purchase, upload as a conversion **with value** into the account that ran the ad. Identifier paths: **GCLID offline import (90-day window)** or **Enhanced Conversions for Leads (63-day window)**. Consent fields (`ad_user_data`, `ad_personalization`) required or the conversion won't attribute. **⚠️ As of 2026-06-15 these uploads moved to the Data Manager API** — the legacy Google Ads API path is already blocked (today is past that cutoff), so build on Data Manager API / UI.

**Compliance gray area (unchanged):** if the imported downstream value is a **SpicyRx (ED) purchase**, you're using sensitive-health purchase data as a bid signal → get a compliance read before wiring it.

Sources: triplewhale.com/sonar-optimize; support.google.com/merchants 13494537; google-ads 13258081, 7684216, 2998031, 7012522, 7014069, 15081888, 15713840, 10518330.
