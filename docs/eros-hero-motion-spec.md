# EROS Hero Motion — Technical Scope & Spec Sheet
_For @spicyrx-brand (Trench OS media gen) · 2026-08-15_

## TL;DR (the honest call, as you invited)
**Don't AI-generate video for the hero vial.** Scroll-drive **vector** instead — enhance the existing framer-motion SVG now, or author it in **Rive** if we want richer motion. Scroll-scrub vector *is* the thing Cole actually wants (the Apple feel is the *interaction*, not the *codec*), and it wins on every axis that matters for THIS hero: compositing, label legibility, payload/LCP, iOS stability, and reversible scrub. Point Trench OS video at **ad/social creative** (where motion sells and there's no haze-composite constraint) and, if we want canvas-scrub richness, an **optional controlled alpha turntable** (a non-AI render). Full reasoning below.

## 1. Technique fork — verdict
- **(a) `<video>` + `currentTime` scrub:** iOS Safari is actually OK-ish (it recreates delta frames), but cross-browser it needs a dense GOP (keyframe ≈every 5 frames; Firefox every 2) or it's janky, and — the killer — it **can't composite cleanly over our haze** (§2). Skip for the hero.
- **(b) image-sequence + canvas `drawImage` (Apple AirPods pattern):** frame-accurate, reliable, reverses perfectly. Viable for us **only if the frames carry ALPHA** (transparent PNG/WebP), which requires a **controlled render, not AI**. This is the "rich/photoreal" path if we want it.
- **(c) WebCodecs / rAF decode:** bleeding-edge, weak Safari story, overkill. No.
- **(d) RECOMMENDED — scroll-driven vector:** drive the existing SVG via framer-motion `useScroll`→`useTransform` (already in the repo), or Rive (GPU renderer, alpha-native, tiny .riv). Perfect compositing, crisp at any DPR, label always legible, ~0 payload, reverses exactly.

## 2. Compositing — the decisive blocker (checked against the SHIPPED gradient)
Shipped hero bg (`components/eros/Hero.tsx`, live on main):
`radial-gradient(125% 105% at 70% -8%, #12245E 0%, #070B18 64%, var(--bg=#0A0907) 100%)`
The vial sits center-right, vertically centered → **the background directly behind it is deep blue (~#0A1A3E → #070B18), not black.** So:
- **`mix-blend-mode: screen`** is identity *only over pure black*. AI/codec "black" is really ~#08080F + block noise → screen **lifts and milk-washes the lapis haze** and reveals a brighter block/banding right where Cole just asked to keep the deep blue. ✗
- **`mix-blend-mode: lighten`** preserves the haze in dark areas (per-channel max) but then **eats the vial's own dark-blue glass/shadows into the haze** and hard-edges the glow. ✗ mediocre.
- **True alpha** is correct — but AI models don't output alpha, matte-extracting a *glowing translucent* vial is ~impossible, and the dual-source workaround (HEVC-alpha for Safari + VP9/WebM-alpha for Chrome/FF) is fiddly and **multiple WebM `<video>` elements crash iOS 17/18.**
- **Net:** there is **no clean blend route** for a black-background video over our haze. Clean compositing needs alpha, and alpha is only free from a **controlled render or vector**. This alone rules AI video out of the hero *unless we abandon the haze behind the vial* (we shouldn't — Cole just asked to protect it).

**Background colour to generate on:** vector/controlled-alpha path → **transparent**. If Cole insists on AI video anyway → **pure #000000**, and we'd have to redesign the hero so the vial sits over pure black (losing the haze there). Flag before generating.

## 3. Budgets + constraints
- **LCP:** hero is above-the-fold on the money page. Keep the vial media **out of the LCP path** — SSR the static SVG for instant first paint (already happens), then progressively upgrade to the scrubbed media after load. LCP element should be the H1 text, not the vial.
- **Payload:** target <200KB mobile (ideal), <500KB ceiling for the vial media. SVG ≈10KB (wins outright). Rive `.riv` ≈20–60KB. Alpha frame-sequence (36 frames @600×730 WebP-alpha) ≈0.4–0.8MB (borderline — trim frames / AVIF-alpha / smaller mobile asset).
- **Dimensions / aspect:** match the current scene aspect **460:560 (portrait, ~0.821)**. Desktop display max 460px wide → deliver a 2× master. Recommended master **920×1120** (or 1080×1320) + a downscaled mobile asset (css 280–320 → ~640px).
- **Frame count (if sequence):** **30–40 frames** for a one-shot scrub beat (Apple used ~147 for a long multi-section page; we're a single section). If video: 3–4s @30fps, GOP keyframe every 5 frames.
- **Reduced-motion / no-JS:** the **static SVG stays as the fallback** (already SSR + respects `useReducedMotion`). SVG is the floor regardless of path.
- **Replace vs layer:** keep the ambient CSS layers (nebula / bloom / ring / stars / haze) — they compose with the hero haze and cost ~0. **Replace/scrub only the vial layer**; ambient stays behind it; reduced-motion → static SVG vial.

## 4. Motion — what reads best scrubbed BOTH directions
- Scrub reverses constantly (users scroll up too) → the motion must be a **monotonic, continuous gesture with no cuts or loops.**
- **Cole's favorite** (tilt → cyan drop forming at the lip → drop releases + gold rule draws under the headline) works **if authored as one continuous arc** that cleanly *un-forms* on scroll-up. ✓ On-brand, reads well both ways.
- A slow **turntable/orbit** also reverses cleanly and is trivial in vector; less "story" than the drop beat.
- Don't scrub the current idle **sway** (a loop looks wrong when scrubbed) — keep sway as tiny idle ambient *between* scroll; scrub the drop beat.
- **Label legibility MUST hold throughout** (the EROS cartouche is the product ID). Vector / controlled render holds it; AI video won't — which would force defocusing/cropping the label = losing brand identity = another reason AI video loses here.

## 5. Prior art (what they actually shipped under the hood)
- **Apple AirPods Pro:** image-sequence + canvas `drawImage` + GSAP ScrollTrigger; ~147 preloaded JPEG frames @1158×770, drawn per scroll position in rAF. Opaque product on white → no alpha needed (not our situation).
- **Video-scrub sites:** `<video>` + `currentTime` on scroll; iOS Safari recreates delta frames (OK) but needs dense keyframes or it's janky; threshold-seek (skip <0.1s deltas) to avoid thrash.
- **Vector-scrub (Stripe/Linear/Vercel-style + Rive/Lottie):** scroll-linked vector/WebGL; **Rive `.riv` is 50–80% smaller than Lottie JSON** and GPU-accelerated (WebGL/Metal) at 60fps; Lottie's CPU-SVG renderer can jank with many objects. Both stay crisp at any DPR and keep labels legible.
- **Transparent-video reality:** Safari = HEVC-alpha only; Chrome/FF = VP9/WebM-alpha only → dual-source required; **multiple WebM `<video>` elements crash iOS 17/18.**

Sources: CSS-Tricks & GSAP forums (AirPods canvas sequence); Muffin Man / Yoann Gueny / Apple QA1820 (video scrub + GOP); Rive.app / LottieFiles / Unicorn Icons (vector scrub perf); JakeArchibald.com / Rotato / terhech.de (transparent-video support + iOS crash).

## 6. What I need from you, per path
- **SVG / Rive (recommended):** no generated media for the vial. If Rive, hand me a `.riv` (or a layered vector / 2× still to author against).
- **Controlled alpha turntable (rich path):** render (Blender/C4D, or 3D built from our approved still) → **36 transparent PNG/WebP frames, 920×1120, one continuous tilt→drop arc, label crisp and in-frame throughout, transparent bg.** NOT free-gen AI (identity/label won't hold across frames).
- **Where AI video DOES pay off:** ad/social creative (no haze-composite constraint; motion sells) and possibly a full-bleed ambient background — **not** the crisp hero vial.

## 7. PATH DECISION — feasibility & honest pricing (validated 2026-08-15)
Cole picked the **controlled alpha turntable, canvas-scrubbed**. Two ways to source those alpha frames — priced honestly:

### 7a. TRUE 3D TURNTABLE (Blender/C4D) — NOT recommended for this object
- **Feasibility gap:** there is **no 3D pipeline and no 3D model** of the vial. The only approved assets are a 2D AI still + our SVG. A true turntable requires modelling the vial + cap + ornate label + **translucent glass and liquid** from scratch, shading/lighting them, and rendering to a transparent sequence.
- **Cost (rough):** an external 3D artist, ~**3–6 days** (model + translucent glass/liquid shading is the slow part + lighting + a render pass), plus a software pipeline we don't have. Real budget Cole may not have priced.
- **Marginal value is LOW here:** the dropper is near radially-symmetric and its only "face" is the EROS cartouche. Rotating it mostly **hides the brand**. A turntable buys little for this specific silhouette.

### 7b. HEADLESS-CHROME SVG → ALPHA SEQUENCE — RECOMMENDED (validated, ~free)
- **VALIDATED today:** rendered the vial via headless Chrome with `--default-background-color=00000000` → `mockups/shots/alpha-vial.png`, `sips hasAlpha: yes`. The cyan glow captured as soft alpha (composites over the lapis haze perfectly); the **EROS label is razor-crisp**. Proof-of-concept file: `mockups/alpha-test.html`.
- **How:** parameterize the existing SVG vial by a progress value `t` (0→1), render N transparent frames (36) across the tilt→drop arc, canvas `drawImage(frames[t])` on scroll. True alpha, crisp label, no 3D, no modelling, no external artist.
- **Delivers Cole's actual favorite** — the tilt → cyan drop forms at the lip → drop falls → gold rule draws — because that beat is **2D-expressible** (transform + path morph + liquid slosh + glow pulse). Reverses cleanly on scroll-up.
- **The one limitation:** it's 2D. No true 3D rotation/parallax/back-of-bottle. For a symmetric dropper whose story is the drop (not the spin), that's ~0 loss.
- **Cost:** effectively free — my existing render rig. I can produce the 36-frame sequence + wire the canvas scrub as a working prototype in hours.

**Honest value call:** build **7b**. It's the "controlled alpha, canvas-scrubbed" thing Cole picked, delivering the drop beat at ~0% of the 3D cost with a perfectly legible label. Reserve 7a only if Cole specifically wants a literal spinning turntable — which, for this object, I'd advise against.

### Correction accepted (from @spicyrx-brand)
Trench OS **image-to-video cannot feed the turntable path even if it holds the label** — it still can't output alpha, and a glowing translucent vial can't be keyed after the fact. Struck from the plan: the alpha frames come from a controlled render (7a or the validated 7b), never from AI. Trench OS video = **ads only** (and possibly an ambient bg layer).

## Offer
I can build **7b end-to-end** — the 36-frame alpha sequence off the SVG + the canvas scroll-scrub of the tilt→drop beat — as a working prototype on `/eros`, so Cole feels it before anyone commits a 3D budget. Say go.
