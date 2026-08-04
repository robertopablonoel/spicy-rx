# Affiliate vanity redirects — `spicyrx.com/<CODE>`

Same attribution machinery as the [package-insert QR](./insert-qr/DECISION-MEMO.md), for
affiliates. A bare vanity link (e.g. `spicyrx.com/SPICYALIEN`) 307-redirects to a configurable
destination with the affiliate stamped as the traffic source, and writes the `.spicyrx.com`
attribution cookie server-side so the source survives VPN/privacy `utm_*` stripping.

## Mapping
| Field | Value |
|---|---|
| `utm_source` | the affiliate handle, e.g. `spicyalien` (TW splits by this natively) |
| `utm_medium` | `affiliate` |
| `utm_campaign` | `affiliate_program` |
| `utm_content` / `utm_term` | left free (`utm_term` stays owned by the live form A/B test) |

Attribution only for now — no payout/commission integration. `utm_source` carries the handle, so
per-order recovery works later; add a dedicated non-UTM `ref` param when we build payouts.

## Where it lives
- **`middleware.ts`** — intercepts ONLY known codes; everything else falls through to normal routing
  (real pages + styled 404s untouched). Sets the cookie on the 307 and fires an `affiliate_click`
  PostHog event via `waitUntil`.
- **`lib/affiliates.ts`** — the registry, UTM constants, `AFFILIATE_DESTINATION` env dial, and the
  strip-proof cookie snapshot builder.

## Adding an affiliate
1. Add an entry to `AFFILIATES` in `lib/affiliates.ts`: `CODE_UPPERCASE: { source: "utm_source_slug" }`.
2. The code is matched case-insensitively (`/SPICYALIEN` == `/spicyalien`).
3. **Never** use a code that collides with a top-level route (`passion`, `consult`, `pages`,
   `policies`, `qr`, `science`) — `lookupAffiliate()` refuses these defensively anyway.
4. Deploy. The link is live at `spicyrx.com/<CODE>`.

## Direct-to-teleform affiliates (bypass the A/B test)
Some affiliates are force-routed straight to one specific Rimo intake form instead of the homepage
funnel — which also holds them OUT of the intake-form A/B test (we're not testing teleforms on that
traffic). Configure with `destination` + `excludeFromFormAbTest`:

```ts
SPICYALIEN: {                         // Jamie Lynn
  source: "spicyalien",
  destination: RIMO_INTAKE_URL_B,     // https://my.spicyrx.com/intake/qmv-07cx6s (the qmv form)
  excludeFromFormAbTest: true,
},
```

What this does:
- **Redirects directly to the teleform**, skipping the marketing site — so both A/B assignment paths
  (the client `IntakeLink` CTA and the `/consult` route) are bypassed: **no `form_arm`, no
  `utm_term=arm_qmv` stamp, no `form_ab_assigned` event.**
- **Forwards attribution onto the intake URL** — affiliate UTMs (`utm_source=spicyalien`,
  `utm_medium=affiliate`, `utm_campaign=affiliate_program`) plus the visitor's inbound click
  IDs/UTMs (fbclid/gclid/…). This is essential because a direct-to-teleform visitor never runs our
  `captureAttribution()` — Rimo captures **URL params**, not our cookie.
- ⚠ **Analytics:** their orders still land in that form's Rimo channel export next to real arm-B
  traffic. **Filter them out of arm-B analysis by `utm_source=spicyalien`** (`utm_medium=affiliate`).
  Also noted in `lib/form-ab-shared.ts`.

## Re-pointing the destination
Set `AFFILIATE_DESTINATION` in Vercel env (default `https://www.spicyrx.com/`) to send affiliate
traffic to a quiz funnel / intake form — no link change. Same dial pattern as `INSERT_QR_DESTINATION`.

## Attribution reaches Rimo via
1. **Server-set `.spicyrx.com` cookie** (path-derived, strip-proof) → forwarded onto the intake link.
2. **URL `utm_source`** → captured by `captureAttribution()` + forwarded (when not stripped).
3. **`affiliate_click` PostHog event** (strip-proof click counter).
