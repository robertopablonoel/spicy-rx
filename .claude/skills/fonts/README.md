# fonts/

The current design system uses Google Fonts proxies, loaded via the `@import` at the top of `colors_and_type.css`:

| Role        | Family in use     | Production direction (if licensed)        |
| ----------- | ----------------- | ------------------------------------------ |
| Display     | Space Grotesk     | Söhne · GT America · ABC Diatype (display) |
| Body        | Manrope           | Söhne · GT America Mono · ABC Diatype      |
| Editorial   | Instrument Serif  | GT Sectra · Domaine Display Italic         |
| Mono        | JetBrains Mono    | NB Akademie Mono · Söhne Mono              |

> ⚠️ **Substitution flag:** none of the production directions are licensed. The Google Fonts cuts above are stand-ins picked for *closest tonal match* — Space Grotesk's mechanical g and angled terminals stand in for Söhne; Manrope sits in for clean grotesks like GT America Mono; Instrument Serif stands in for the pharma-editorial italics of GT Sectra.

If you have licensed font files, drop them here as `.woff2` and replace the `@import` in `colors_and_type.css` with `@font-face` declarations. Update `--font-display`, `--font-body`, `--font-editorial`, `--font-mono` to point at the new families.
