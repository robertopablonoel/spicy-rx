# SpicyRx — Compliance Inventory

Telehealth platform shipping a prescription compounded medication ("Hot Sauce" — 4-in-1 sublingual ED liquid) through a clinician-partner network and licensed pharmacies. This doc is the checklist of what has to exist, be reviewed, and be linked from the marketing footer before we can take a real order.

**Status of each item is a draft.** Every policy was structurally ported from a peer telehealth site (Tryrova) and find-replaced to SpicyRx. None has been line-edited by legal. The `[REVIEW: …]` markers throughout each document are the canonical list of unresolved items.

---

## Required policies (linked from footer at launch)

| Doc | File | Footer label | Owner of review | Status |
| --- | --- | --- | --- | --- |
| Privacy Policy | `privacy-policy.md` | "Privacy" | Legal + Rimo privacy officer | Draft, structural skeleton |
| Terms of Service | `terms-of-service.md` | "Terms" | Legal | Draft, arbitration clause unresolved |
| Refund Policy | `refund-policy.md` | "Refund policy" | Legal + Rimo pharmacy ops | Draft, return window unconfirmed |
| Telehealth Consent | `telehealth-consent.md` | "Telehealth consent" | Medical counsel | Draft, ED-specific risk section needs MD sign-off |
| Compliance / State Availability | `compliance.md` | "HIPAA notice" / "Compliance" | Rimo regulatory | Draft, state list is illustrative only |

These map 1:1 to the directory structure Tryrova uses (Shopify convention):
- `/policies/privacy-policy`
- `/policies/terms-of-service`
- `/policies/refund-policy`
- `/pages/telehealth-consent`
- `/pages/compliance`

When we rebuild the marketing site, these URLs are the targets the footer should hit.

---

## Open `[REVIEW: …]` items (consolidated)

Pulled from inline markers across the five policies. Every one of these has to be resolved before launch.

### Operational identity

- **Entity name and address.** Footer currently shows "© SpicyRx Inc." with `[REVIEW: licensed states]`. Need the actual legal entity + filing state + registered address.
- **Support phone number.** Privacy + Terms reference one; not set.
- **Effective date.** Every policy has an effective-date placeholder. Set at launch.

### Partner identity

- **Medical Group / clinician-network name.** Telehealth Consent + Terms both have a placeholder for "Consultations are conducted through [Partner Medical Group]." Need the contracted entity name and licensing jurisdictions. (Likely Rimo / Beluga Health analog.)
- **Pharmacy partner name(s).** Refund + Compliance both reference "licensed pharmacy partners" without naming them. Need at least one named pharmacy for public disclosure.

### Refund + return rules

- **Return window length.** Tryrova uses 30 days; Refund Policy currently flags this as TBD. State pharmacy boards generally prohibit return of any dispensed prescription product — confirm with Rimo's pharmacy ops what the actual policy can be.
- **Non-returnable categories.** Confirm the exact exclusion list. Prescription medications post-dispense are almost certainly non-returnable.
- **Consultation-fee carve-out.** "No charge if you don't qualify" — confirm whether this means $0 total or only the Rx fee is waived (consult fee may still apply).

### Telehealth medical disclosures

- **ED-specific risk block** in `telehealth-consent.md` is **not yet medical-counsel reviewed.** It currently lists: nitrate contraindication, cardiovascular preconditions, priapism, sudden vision/hearing changes, alcohol interaction. Medical counsel needs to confirm wording, completeness, and the order of warnings.
- **Synchronous-visit states.** Compliance doc lists Tryrova's set (WV, KS, RI, NM, LA, MS) as the reference; Rimo regulatory has to confirm what applies to SpicyRx's prescribing-eligible states.

### Legal mechanics

- **Arbitration clause.** Terms says "binding individual arbitration" but the provider (AAA / JAMS), seat, governing law, and opt-out window are all unset.
- **Authoritative state list.** Compliance has Tryrova's list as illustrative only — Rimo regulatory provides the real one. **Do not publish until Rimo confirms.**

### Certifications + trust signals

- **LegitScript verification.** Footer guard says "do not display until certification is in hand." Need to start the application and track it.
- **Notice of Privacy Practices** — Privacy Policy currently references "the Notice of Privacy Practices" without there actually being a separate document. Either fold it into Privacy or stand up a separate page.

---

## Compliance hardware to think about (not policies but adjacent)

- **State geo-restriction** — proxy / middleware that detects the visitor's state and blocks the consultation CTA where SpicyRx isn't licensed. The previous build had this stub at `lib/state-restrictions.ts` + a header injection in `proxy.ts` — both were deleted with the clean slate. Re-stand-up when rebuilding.
- **HIPAA-secure intake** — the intake form (whether on-site or redirected to a Rimo-hosted portal) has to meet HIPAA for PHI handling. Confirm what Rimo provides vs. what we have to build.
- **Marketing claim hygiene** — the design system's voice rules push toward making confident comparative claims ("vs. Viagra," "vs. Cialis," "~36% lower"). Every numeric or comparative claim that appears on the marketing site has to be supportable. Flag in code with `{/* MEDICAL CLAIM: review */}` comments where used.
- **Telehealth-consent gating** — confirm patients click-through the consent before the intake form submits, with the timestamp/IP recorded.
- **Cookie banner + analytics consent** — there was a PostHog setup in the previous build (`lib/posthog.ts`, `components/CookieBanner.tsx`) — both deleted. Stand up again when rebuilding analytics.

---

## When this becomes pages again

Each markdown file here is structurally ready to be ported back into the Next.js app as either:
- **MDX in `/app/policies/{slug}/page.mdx`** (Shopify-style URLs) — what the previous build had.
- **Plain markdown rendered through a generic `[slug]` route.** Probably simpler.

Either way, the JSX "draft" banner that wrapped each file should be re-added at the top once we port them back — it's not in the markdown today.

The contents below this point in each file haven't been edited; they're the same body the React/MDX version had, with `SpicyRx` and `support@spicyrx.com` swapped in for the original peer-site references.
