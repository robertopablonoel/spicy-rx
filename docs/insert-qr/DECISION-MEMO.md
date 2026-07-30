# Package-Insert QR Attribution — Decision Memo (pre-build)

**Status:** ✅ scheme signed off by Cole (2026-07-28). Route + QR built on branch `insert-qr-redirect`.
Remaining gates: (1) confirm final QR slug before print, (2) Vercel preview QA + real-device scan, (3) Roberto merges.
**Author:** insert-qr agent · **Date:** 2026-07-28

## Cole's decisions (2026-07-28)
- **Design tag → `utm_content`** (`playing-card` / `black-card`); `utm_term` untouched. Reframe: this
  is a **traffic source**, not a website-managed A/B test — fulfillment picks the card, the site never
  randomizes. `utm_content` is the honest home; `utm_term` is already owned by the live form test.
- **Landing → `spicyrx.com` for now**, but the destination must be a **swappable dial** — Cole wants to
  re-route inserts later (quiz funnel, or the intake form directly) **without reprinting the QR**.
  Implemented as env var `INSERT_QR_DESTINATION` (default `https://www.spicyrx.com/`).
- **Slugs → `/qr/pc` and `/qr/bc`** (simplest). The subdirectory redirect IS the control point; it
  **always** stamps the design's UTM tags, then redirects to the current destination.
- **VPN / utm-strip resilience:** the route ALSO writes the `.spicyrx.com` attribution cookie
  server-side on the 307 (`insertQrSnapshot`), keyed off the PATH — so the design survives even if a
  privacy browser strips `utm_*` off the URL before `captureAttribution()` runs. Carries the sticky
  `form_arm` forward; last-touch-replaces the rest (byte-identical to the client writer & `/consult`).
  Three independent design signals now: (1) server cookie, (2) URL→Rimo UTM, (3) `insert_qr_scan` event.

Two QR codes go on the physical insert in **every** Spicy Cubes package, advertising SpicyRx.
The insert is an A/B test of two designs — **playing-card** vs **black-card** — each design gets
its own QR so scans attribute to the design that drove them. Print is immutable (must last years),
so the QR encodes a **short own-domain URL** that redirects server-side to the full UTM landing —
destination + params stay editable forever without reprinting.

---

## 1. THE ONE DECISION I NEED FROM YOU — where the design (A/B arm) lives

Your standing contract says *"utm_term is reserved exclusively for experiment arms."* Taken
literally, the insert design would go on `utm_term`. **I recommend against that**, and here's the
evidence from your own wiki:

- The **Form A/B test** owns `utm_term` and is **merged to `main` / live now** (commit `58ce75c`).
  It stamps `utm_term=arm_spic|arm_qmv` **only when utm_term is free**.
- The **Halo test** originally claimed `utm_term` too — and it **blinded the form test on the
  entire overlap cohort**. The fix was to move Halo's arm onto `utm_content`
  (`utm_content=<surface>__<arm>`). Hard-learned rule, verbatim from the wiki:
  **"one param = one experiment."**
- **Every insert scanner lands on www.spicyrx.com → gets sticky-assigned a form arm.** So the
  overlap here isn't partial like Halo's — it's **100%**. If the insert claims `utm_term`, it
  blinds the form test on *all* insert traffic. Worst possible collision.

**Recommendation: put the design on `utm_content`, leave `utm_term` untouched (free for the form
test).** This is exactly the Halo precedent, upholds "one param = one experiment," and lets the two
experiments compose cleanly — an insert order carries BOTH `utm_content=playing-card` (design) AND
`utm_term=arm_spic` (form arm), orthogonal and un-collided.

**Trade-off you're accepting (from the Halo wiki, honest disclosure):** Triple Whale natively
splits by `utm_term` (arm) but **does *not* prominently surface `utm_content`**. So TW won't show
you playing-card vs black-card natively. BUT design attribution has three stronger recovery layers
that don't depend on TW:
  1. **Server-side redirect hit count** at `/qr/pc` vs `/qr/bc` — distinct paths, counted in our
     own route handler **before any param can be stripped**. Immune to privacy-tool UTM stripping.
     This is the most reliable "which design got scanned" signal.
  2. **`utm_content` on Rimo submissions** — Rimo stores all UTMs per submission, ties design → the
     actual consult/order. (Survives unless a privacy tool strips utm_*.)
  3. **PostHog 446371** landing behavior by `utm_content`.

---

## 2. Proposed URLs (locked-contract mapping)

| Field | Value | Source of truth |
|---|---|---|
| `utm_source` | `spicycubes` | exact locked string everything keys on |
| `utm_medium` | `insert` | **NEW mechanism family** (joins `halo`, `post-purchase`) — needs your OK |
| `utm_campaign` | `package_insert` | ONE stable name for this mechanism, never reused |
| `utm_content` | `playing-card` \| `black-card` | the design = the A/B variable |
| `utm_term` | *(not set by insert)* | left free for the form A/B test |

**QR encodes (short, apex, lowest module density):**
- Playing-card → `spicyrx.com/qr/pc`
- Black-card  → `spicyrx.com/qr/bc`

**Each redirects (server-side) to:**
- `https://www.spicyrx.com/?utm_source=spicycubes&utm_medium=insert&utm_campaign=package_insert&utm_content=playing-card`
- `https://www.spicyrx.com/?utm_source=spicycubes&utm_medium=insert&utm_campaign=package_insert&utm_content=black-card`

**Full chain (every hop verified or specified):**
```
spicyrx.com/qr/pc
  └─(Vercel apex 307 — path+query preserved, curl-verified 2026-07-28)→ www.spicyrx.com/qr/pc
      └─(our NEW route handler, 307)→ www.spicyrx.com/?utm_source=spicycubes&utm_medium=insert&utm_campaign=package_insert&utm_content=playing-card
          └─ captureAttribution() on load → .spicyrx.com cookie + sessionStorage (utm_content included; utm_content already in PARAM_KEYS)
              └─ CTA click → withAttribution() (+ form test's withArmTerm stamps utm_term=arm_xxx since free)
                  └→ my.spicyrx.com/intake/…?utm_source=spicycubes&utm_medium=insert&utm_campaign=package_insert&utm_content=playing-card&utm_term=arm_xxx
                      └─ Rimo stores UTMs → Triple Whale (arm via utm_term; design recovered via redirect-hits/Rimo/PostHog)
```

**Landing target = the marketing homepage `www.spicyrx.com/`** (NOT straight to Rimo). The scanner
is a Spicy Cubes customer being *introduced* to SpicyRx — they should see the pitch, then convert
via CTA. This also runs `captureAttribution()` on load exactly like Halo did.

---

## 3. Where the redirect lives — a route handler (mirrors `/consult`)

**Recommendation:** new `app/(marketing)/qr/[code]/route.ts`, mirroring the existing `/consult`
route handler. Maps `pc → playing-card`, `bc → black-card`, returns `NextResponse.redirect(fullUrl, 307)`.

Why a route handler over `next.config` redirects or middleware:
- **Runs code** → we can count the scan server-side per design (strongest attribution layer, immune
  to UTM stripping), optionally firing a PostHog `insert_qr_scan` event exactly like `/consult`
  fires `form_ab_assigned`.
- **House pattern already** — identical shape to `/consult`, low review surface.
- Destination + params fully editable server-side forever → **the printed QR never changes.**
- Unknown `/qr/<junk>` → 404 or fallback to homepage (safe for crawler/garbage scans).

`next.config` static redirects would work but can't log/count and are less flexible; middleware is
overkill. Either way the *edit path is a deploy* — that's fine: the point is the **card never
reprints**, not that changes are code-free.

---

## 4. QR generation spec

- **Library-first (primary):** Python `segno` (print-quality SVG + high-res PNG). *(Not currently
  installed — `pip install segno` at build time.)*
- **Error correction: H (30%)** — payload is tiny (~17 chars), so even H stays a low-version,
  low-density symbol that scans easily; H maximizes durability against print wear. 4-module quiet
  zone minimum.
- **Formats delivered:** vector **SVG** (print master) + **≥1000px PNG** (300dpi at target size).
- **Min print size:** ~**2 cm** floor, **2.5–3 cm** preferred (10:1 rule — scannable distance ≈
  10× symbol width; handheld phone reads at ~25–30 cm). True black modules on white, max contrast.
- **Black-card handling — DO NOT print an inverted (white-on-black) QR.** Many camera scanners
  expect dark-on-light and fail on inversion. Safe approach: place a **normal dark-on-light QR
  inside a white/light rounded panel** (with its quiet zone) on the black card. I can also produce
  an inverted variant if you want to try it, but it must be test-scanned and is not recommended.
- **Test-scan mandate:** scan BOTH codes from a **real printed sample** before the print run.

**No-subscription web-tool fallback (for your own use):** because we encode *our own* short URL,
**any *static* QR generator is safe** — the QR just holds `spicyrx.com/qr/pc`; there is no
third-party dynamic layer to expire. Use **STATIC mode only** (never "dynamic" — those route through
the vendor's domain and can brick). Candidates: **qrcode.tec-it.com** and **the-qrcode-generator.com**
(static/URL mode). I'll confirm they're still free + static at build time. The library route is
primary.

---

## 5. What needs a deploy / Roberto

**Needs a PR + deploy (code in this repo):**
- New `app/(marketing)/qr/[code]/route.ts` (redirect + optional scan event).
- **No `PARAM_KEYS` change** — `utm_content` is already whitelisted. No deploy-gated constant edit.

**Needs Roberto / Vercel access:**
- Confirm the **apex→www redirect** covers `/qr/*` in prod (it's a Vercel domain-level redirect;
  generically proven + curl-verified for this path today, but Roberto owns the config).
- **Merge the PR** — you lack Vercel; Roberto merges after preview QA.

**Ship pattern:** feature branch → PR on `robertopablonoel/spicy-rx` → Vercel preview URL → QA on
preview (scan QR / open URL, confirm `.spicyrx.com` cookie + forwarded Rimo link carries params) →
Roberto merges.

**Privacy re-raise (once, per your standing call):** NordVPN/Brave strip `utm_*`. You previously
declined a custom non-blocklisted redundancy param. QR scans are mostly mobile-camera → default
browser, so exposure is low — AND the server-side `/qr/pc` vs `/qr/bc` hit-count gives us a
strip-proof design signal regardless. I'm comfortable **not** adding a redundancy param unless you
say otherwise.

---

## 6. Handoff (after preview QA)

Message the **`rx-datachain`** agent to verify the full chain for BOTH QR URLs: redirect → landing
capture (cookie contents) → `withAttribution` forwarding onto the Rimo link → (post-launch) UTMs
visible on Rimo submissions / TW orders.
