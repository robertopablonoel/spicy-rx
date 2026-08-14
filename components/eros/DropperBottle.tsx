"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Eros hero dropper bottle — the marquee animation of the /eros page.
 *
 * A faithful reproduction of the lapis neon-outline dropper from
 * mockups/eros-main.html: a cosmic scene wrapper (rotating conic nebulae, a
 * breathing bloom, a glowing ring, twinkling stars) around an SVG bottle with a
 * neon-lapis outline, blue liquid (two drifting wave layers, a breathing core
 * glow, rising bubbles, a surface shimmer and a side sheen) and an ornate cream
 * apothecary label reading EROS · BODY · BRAIN · 3-IN-1 · SUBLINGUAL · 2 ML.
 *
 * Motion is split as in components/marketing/DropperBottle.tsx:
 *   • CSS @keyframes (globals.css, eros-* prefixed) drive the nebulae, bloom,
 *     shimmer and core glow.
 *   • Framer Motion drives the bottle sway, the two wave layers, the rising
 *     bubbles and the star twinkle.
 * useReducedMotion() renders every FM element static; the .eros-anim wrapper
 * class also kills the CSS @keyframes via a media query in globals.css.
 *
 * Deterministic bubble/star tables so SSR and client render identical positions
 * — no hydration mismatch.
 */

const STARS = [
  { cx: 18, cy: 24, r: 0.7, fill: "#7FE4F2", delay: -1 },
  { cx: 82, cy: 30, r: 1.1, fill: "#6A96FF", delay: -2.4 },
  { cx: 26, cy: 70, r: 0.6, fill: "#E7C892", delay: -0.6 },
  { cx: 74, cy: 66, r: 0.9, fill: "#7FE4F2", delay: -3.1 },
  { cx: 14, cy: 50, r: 0.8, fill: "#6A96FF", delay: -1.7 },
  { cx: 88, cy: 52, r: 0.7, fill: "#7FE4F2", delay: -2.9 },
  { cx: 34, cy: 16, r: 0.5, fill: "#E7C892", delay: -0.3 },
  { cx: 66, cy: 14, r: 0.8, fill: "#7FE4F2", delay: -3.6 },
  { cx: 50, cy: 84, r: 0.7, fill: "#6A96FF", delay: -2.1 },
  { cx: 10, cy: 36, r: 0.5, fill: "#7FE4F2", delay: -1.2 },
  { cx: 90, cy: 40, r: 0.6, fill: "#E7C892", delay: -2.6 },
  { cx: 40, cy: 88, r: 0.6, fill: "#7FE4F2", delay: -0.9 },
] as const;

const BUBBLES = [
  { cx: 60, r: 1.6, delay: -1, dur: 6 },
  { cx: 92, r: 2, delay: -3.4, dur: 6.4 },
  { cx: 74, r: 1.3, delay: -5, dur: 5.6 },
  { cx: 104, r: 1.7, delay: -2.2, dur: 6.2 },
] as const;

export function DropperBottle() {
  const reduced = useReducedMotion();

  return (
    <div className="eros-anim relative flex aspect-[460/560] w-full max-w-[280px] items-center justify-center sm:max-w-[320px] md:max-w-[460px]">
      {/* OUTER NEBULA — soft conic, rotating, fully circular */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-full w-full rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(16,52,166,0) 0deg, rgba(56,208,232,0.26) 70deg, rgba(122,150,255,0.3) 150deg, rgba(16,52,166,0) 210deg, rgba(201,161,90,0.18) 300deg, rgba(16,52,166,0) 360deg)",
          filter: "blur(50px)",
          animation: "eros-nebula 30s linear infinite",
          WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 74%)",
          maskImage: "radial-gradient(circle, black 35%, transparent 74%)",
        }}
      />

      {/* SECONDARY NEBULA — counter-rotating, cyan, slower */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[82%] w-[82%] rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(56,208,232,0) 0deg, rgba(56,208,232,0.2) 90deg, rgba(16,52,166,0) 180deg, rgba(122,150,255,0.18) 270deg, rgba(56,208,232,0) 360deg)",
          filter: "blur(38px)",
          animation: "eros-nebula-rev 44s linear infinite",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 74%)",
          maskImage: "radial-gradient(circle, black 30%, transparent 74%)",
        }}
      />

      {/* BLOOM — close circular pulse */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[64%] w-[64%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,208,232,0.42) 0%, rgba(56,130,240,0.2) 42%, rgba(16,52,166,0) 70%)",
          filter: "blur(8px)",
          animation: "eros-breathe 4.6s ease-in-out infinite",
        }}
      />

      {/* RING — thin glowing circle */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[60%] w-[60%] rounded-full"
        style={{
          border: "1px solid rgba(56,208,232,0.14)",
          boxShadow:
            "0 0 40px rgba(56,130,240,0.16), inset 0 0 40px rgba(56,130,240,0.1)",
        }}
      />

      {/* AMBIENT STARS */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.fill}
            initial={{ opacity: 0.15 }}
            animate={reduced ? undefined : { opacity: [0.15, 1, 0.15] }}
            transition={{
              duration: 4,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* THE BOTTLE — Framer Motion sway */}
      <motion.svg
        width="300"
        height="460"
        viewBox="0 0 160 320"
        className="relative h-[280px] w-[180px] sm:h-[340px] sm:w-[220px] md:h-[460px] md:w-[300px]"
        style={{
          transformOrigin: "50% 60%",
          filter:
            "drop-shadow(0 14px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(56,130,240,0.5))",
        }}
        initial={{ x: 0, y: 0, rotate: -3 }}
        animate={
          reduced
            ? undefined
            : { x: [0, 4, 0], y: [0, -8, 0], rotate: [-3, 3, -3] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="eros-liq" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4C86F0" />
            <stop offset="0.5" stopColor="#1B44B8" />
            <stop offset="1" stopColor="#0A2178" />
          </linearGradient>
          <linearGradient id="eros-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="eros-core" cx="0.5" cy="0.55" r="0.5">
            <stop offset="0" stopColor="rgba(150,210,255,0.85)" />
            <stop offset="0.4" stopColor="rgba(56,130,240,0.4)" />
            <stop offset="1" stopColor="rgba(16,52,166,0)" />
          </radialGradient>
          <clipPath id="eros-clip">
            <path d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z" />
          </clipPath>
        </defs>

        {/* DROPPER CAP */}
        <g
          stroke="#3E74E4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path
            d="M58 6 C58 6,60 0,80 0 C100 0,102 6,102 6 L102 22 L58 22Z"
            fill="rgba(56,130,240,0.12)"
          />
          <rect
            x="46"
            y="22"
            width="68"
            height="34"
            rx="3"
            fill="rgba(56,130,240,0.08)"
          />
          <line x1="46" y1="34" x2="114" y2="34" />
          <line x1="46" y1="46" x2="114" y2="46" />
          <path d="M62 56 L62 76 L98 76 L98 56" />
        </g>

        {/* BOTTLE GLASS OUTLINE — neon lapis */}
        <path
          d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"
          fill="rgba(10,20,50,0.4)"
          stroke="#3E74E4"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* LIQUID + INTERNAL EFFECTS — clipped to bottle interior */}
        <g clipPath="url(#eros-clip)">
          <rect
            x="20"
            y="110"
            width="120"
            height="220"
            fill="url(#eros-liq)"
            opacity="0.92"
          />

          {/* Core glow ellipse — CSS-animated breathe */}
          <ellipse
            cx="80"
            cy="220"
            rx="46"
            ry="80"
            fill="url(#eros-core)"
            style={{
              transformOrigin: "80px 220px",
              animation: "eros-breathe 3.6s ease-in-out infinite",
            }}
          />

          {/* WAVE A — far layer (FM translate loop) */}
          <motion.g
            style={{ transformOrigin: "0 0" }}
            initial={{ x: 0 }}
            animate={reduced ? undefined : { x: -80 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M-40 112 Q -20 106, 0 112 T 40 112 T 80 112 T 120 112 T 160 112 T 200 112 L 200 116 L -40 116 Z"
              fill="#7FB8FF"
              opacity="0.5"
            />
          </motion.g>

          {/* WAVE B — near layer (counter-direction) */}
          <motion.g
            style={{ transformOrigin: "0 0" }}
            initial={{ x: 0 }}
            animate={reduced ? undefined : { x: 80 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M-40 114 Q -20 109, 0 114 T 40 114 T 80 114 T 120 114 T 160 114 T 200 114 L 200 118 L -40 118 Z"
              fill="#4C86F0"
              opacity="0.65"
            />
          </motion.g>

          {/* Surface shimmer — CSS opacity loop */}
          <ellipse
            cx="80"
            cy="113"
            rx="42"
            ry="2.6"
            fill="#CFE8FF"
            style={{ animation: "eros-shimmer 4s ease-in-out infinite" }}
          />

          {/* Rising bubbles — FM y-translate */}
          {BUBBLES.map((b, i) => (
            <motion.circle
              key={i}
              cx={b.cx}
              r={b.r}
              fill="#CFE8FF"
              initial={{ cy: 300, opacity: 0 }}
              animate={
                reduced
                  ? { cy: 300, opacity: 0.6 }
                  : { cy: 112, opacity: [0, 0.9, 0.5, 0] }
              }
              transition={{
                duration: b.dur,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeIn",
                times: [0, 0.15, 0.8, 1],
              }}
            />
          ))}

          {/* Side glass sheen on liquid */}
          <rect
            x="36"
            y="120"
            width="6"
            height="180"
            fill="rgba(200,225,255,0.25)"
            rx="3"
          />
        </g>

        {/* Glass reflection (outside clip) */}
        <path
          d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"
          fill="url(#eros-glass)"
        />

        {/* ORNATE CREAM APOTHECARY LABEL */}
        <rect
          x="38"
          y="146"
          width="84"
          height="90"
          rx="2"
          fill="#F6F2E9"
          stroke="#C9A15A"
          strokeWidth="1"
        />
        <rect
          x="42"
          y="150"
          width="76"
          height="82"
          fill="none"
          stroke="#C9A15A"
          strokeWidth="0.5"
          strokeOpacity="0.55"
        />
        <rect
          x="78.3"
          y="156.3"
          width="3.4"
          height="3.4"
          transform="rotate(45 80 158)"
          fill="#C9A15A"
        />
        <text
          x="80"
          y="180"
          fill="#10318F"
          textAnchor="middle"
          fontFamily="var(--font-classical), 'Cormorant Garamond', serif"
          fontWeight="600"
          fontSize="19"
          letterSpacing="5"
        >
          EROS
        </text>
        <g stroke="#C9A15A" strokeWidth="0.8">
          <line x1="54" y1="187" x2="73" y2="187" />
          <line x1="87" y1="187" x2="106" y2="187" />
        </g>
        <rect
          x="78.3"
          y="185.3"
          width="3.4"
          height="3.4"
          transform="rotate(45 80 187)"
          fill="#C9A15A"
        />
        <text
          x="80"
          y="201"
          fill="#59627c"
          textAnchor="middle"
          fontFamily="var(--font-classical), 'Cormorant Garamond', serif"
          fontWeight="500"
          fontSize="6.4"
          letterSpacing="0.6"
        >
          BODY · BRAIN
        </text>
        <text
          x="80"
          y="210"
          fill="#59627c"
          textAnchor="middle"
          fontFamily="var(--font-classical), 'Cormorant Garamond', serif"
          fontWeight="500"
          fontSize="6.4"
          letterSpacing="0.6"
        >
          3-IN-1 · SUBLINGUAL
        </text>
        <line
          x1="66"
          y1="217"
          x2="94"
          y2="217"
          stroke="#C9A15A"
          strokeWidth="0.5"
          strokeOpacity="0.6"
        />
        <text
          x="80"
          y="228"
          fill="#8A93A8"
          textAnchor="middle"
          fontFamily="var(--font-mono), 'JetBrains Mono', monospace"
          fontSize="5"
          letterSpacing="2"
        >
          2 ML
        </text>
      </motion.svg>
    </div>
  );
}
