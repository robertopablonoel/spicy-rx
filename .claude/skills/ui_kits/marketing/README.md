# Marketing site — UI kit

Hi-fi recreation of the **spicyalien.co** marketing surface. This isn't production code — components are mainly cosmetic, but the structure and styling are pixel-aligned with the brand.

> **No actual codebase was provided.** This kit is built from the brand brief. Pages, copy, and component structure are first-draft opinions.

## Screens

1. **Home / Hot Sauce landing** — hero, the 4-in-1 explainer, science, FAQ, footer.
2. **Science** — deeper pharmacology, molecule breakdown, clinical sourcing.
3. **Consultation entry** — start-of-flow CTA page, eligibility check.

Open `index.html` and use the nav to move between them.

## Components

- `Nav.jsx` — fixed top nav with hairline-on-scroll
- `Hero.jsx` — full-bleed hero with droplet illustration
- `MoleculeRow.jsx` — schematic molecule cells, used in science section
- `HowItWorks.jsx` — three-step timeline (consult / ship / dose)
- `FAQ.jsx` — expandable disclosure list
- `Footer.jsx` — disclaimers, sitemap, regulatory marks
- `Pill.jsx`, `Button.jsx` — primitive atoms

All styling pulls from `../../colors_and_type.css`.
