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
1. Add a line to `AFFILIATES` in `lib/affiliates.ts`: `CODE_UPPERCASE: "utm_source_slug"`.
2. The code is matched case-insensitively (`/SPICYALIEN` == `/spicyalien`).
3. **Never** use a code that collides with a top-level route (`passion`, `consult`, `pages`,
   `policies`, `qr`, `science`) — `affiliateSource()` refuses these defensively anyway.
4. Deploy. The link is live at `spicyrx.com/<CODE>`.

## Re-pointing the destination
Set `AFFILIATE_DESTINATION` in Vercel env (default `https://www.spicyrx.com/`) to send affiliate
traffic to a quiz funnel / intake form — no link change. Same dial pattern as `INSERT_QR_DESTINATION`.

## Attribution reaches Rimo via
1. **Server-set `.spicyrx.com` cookie** (path-derived, strip-proof) → forwarded onto the intake link.
2. **URL `utm_source`** → captured by `captureAttribution()` + forwarded (when not stripped).
3. **`affiliate_click` PostHog event** (strip-proof click counter).
