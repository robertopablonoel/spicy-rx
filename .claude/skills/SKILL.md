---
name: spicy-alien-design
description: Use this skill to generate well-branded interfaces and assets for Spicy Alien — a cosmic-futurist telehealth performance brand (first product: Hot Sauce, a 4-in-1 sublingual ED liquid). Contains design tokens, type, color, voice/copy rules, brand assets, and UI-kit recreations of the marketing site and patient portal. Use for production work, mocks, decks, or throwaway prototypes.
user-invocable: true
---

# Spicy Alien — Design Skill

Read `README.md` first — it's the source of truth for voice, palette, type, motion, iconography, and the visual rules that make a Spicy Alien surface look like Spicy Alien (and not like Roman/Hims/Ro).

## What's here

- `README.md` — full brand brief, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — every design token as a CSS custom property. **Import this in any new HTML you produce.**
- `assets/` — logo mark, wordmark, dropper bottle illustration, molecule schematics, lab-grid and noise patterns. Use these as-is; do not redraw.
- `preview/` — small spec cards demonstrating each token / component (referenced by the Design System tab; useful as visual reference too).
- `ui_kits/marketing/` — recreated marketing site (Hero, HowItWorks, MoleculeRow, FAQ, Footer, etc).
- `ui_kits/portal/` — recreated patient portal (Sidebar, Dashboard, OrderDetail, Messages).

## How to use this skill

If the user asks for **visual artifacts** (slides, mocks, throwaway prototypes, marketing one-pagers, social cards, deck templates, packaging mockups):
1. Read `README.md` end to end.
2. Copy the assets you need from `assets/` and `ui_kits/` into the user's working directory.
3. Build a static HTML file that imports `colors_and_type.css` and uses tokens (`var(--hot)`, `var(--font-display)`, etc) instead of hardcoded values.
4. Lean on the dark warm-black canvas + heat accent + one editorial italic flourish — that is the brand.

If the user is **working in production code**, lift the tokens and CSS into their build, and use this skill's components as reference for spacing, hover behavior, and copywriting voice.

If invoked with no other context, ask the user what they want to build (slide, ad, screen, deck, packaging?), what surface (mobile / web / print?), what tone (manifesto / instructional / pharma-compliant?), then act as an expert designer in this brand.

## Non-negotiables

- Dark, **warm** blacks (`--void` not `#000`). No blueish backgrounds.
- One heat color per surface. Capsaicin gradient = once per page, max.
- Hard corners by default. Pills for chips, badges, and segmented controls.
- Confident, science-literate voice. **No emoji in product UI. No bro-y tone. No euphemisms.**
- Numbers and lab readouts in JetBrains Mono with `0.14em` tracking.
- One italic editorial flourish per surface (Instrument Serif), never two.
