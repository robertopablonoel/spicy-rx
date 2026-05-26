# SpicyRx Marketing Site — Project Conventions

## Stack
- Next.js 16 App Router, TypeScript strict mode, no `any`
- React 19, Tailwind CSS v4 (PostCSS plugin model)
- Tailwind CSS for all styling; do not introduce CSS modules or styled-components
- shadcn/ui components live in `components/ui/` — extend, don't replace
- Compliance pages live in `app/policies/*/page.mdx` and `app/pages/*/page.mdx`
- PostHog for analytics and feature flags; no other A/B tools

## Brand & content
- Brand name: SpicyRx (public-facing). Do not use "AND Company" or any holding-company reference in copy. Parent-entity naming is unconfirmed and pending Roberto.
- Product: Quattro sublingual (prescription ED medication, under-the-tongue tablet)
- Tone: clinical-credible, not pharma-stiff. Plain language for adults. No bro-speak.
- All medical claims must be reviewed before merge — flag with `<!-- MEDICAL CLAIM: review -->` HTML comment
- Never display LegitScript seal until Rimo confirms certification

## Compliance rules
- Mirror tryrova.co's structural skeleton for T&C, Privacy, Refund, Telehealth Consent
- State-restriction list lives in `lib/state-restrictions.ts` — Rimo provides the authoritative list
- CTAs route to `https://app.caliberrx.co` until Rimo confirms final portal URL
- PHI (patient health information) must never be logged, sent to analytics, or stored client-side

## Code patterns
- Default to React Server Components; mark client components with "use client"
- Forms: server actions, not API routes
- All redirects to Rimo portal go through `<a href={RIMO_PORTAL_URL}>` (not `<Link>`) — Rimo is external
- Pull `RIMO_PORTAL_URL` from env: `process.env.NEXT_PUBLIC_RIMO_PORTAL_URL`

## What NOT to do
- Don't add Shopify, BigCommerce, or any commerce framework — Rimo handles all commerce
- Don't add a cart, checkout, or payment flow
- Don't try to embed Rimo via iframe — pattern is redirect handoff
- Don't display fake state lists, fake certifications, or placeholder medical claims as if final
