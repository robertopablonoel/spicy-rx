"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero vessel for Passion (PT-141) — a peptide VIAL drawn in a flat, almost
 * cartoonish style with realistic proportions (modeled on a standard peptide
 * vial: wide neck, short shoulder, squat straight body, rounded base). This is
 * the presentation compounded bremelanotide actually ships in.
 *
 * Styling per Cole: simplistic / cartoonish (flat fills, one bold neon-pink
 * outline — var(--ember)) in the original Passion palette, with the purple
 * "cork" cap kept. No realistic glass rendering. Geometry was iterated against
 * real rendered images (rsvg-convert + a headless-Chrome screenshot of the live
 * /passion hero) so the shapes line up. viewBox 0 33 160 240; vial centered x=80.
 *
 * Motion: whole-vial sway + gentle particle twinkle. useReducedMotion() renders
 * static. Deterministic golden-angle distribution → no hydration drift.
 */

const PHI = 2.39996323; // golden angle in radians
const AURORA = ["#FF6FB0", "#C9A6FF", "#FFD9A8"] as const; // rose · lavender · soft gold

const DOTS = Array.from({ length: 12 }, (_, i) => {
  const a = i * PHI;
  const radius = 32 + ((i * 11) % 34);
  return {
    cx: 50 + Math.cos(a) * radius,
    cy: 50 + Math.sin(a) * radius,
    r: 0.5 + ((i * 17) % 140) / 100,
    base: 0.18 + ((i * 7) % 28) / 100,
    dur: 4 + ((i * 0.7) % 5),
    delay: -((i * 0.4) % 6),
    color: AURORA[i % 3],
  };
});

// Peptide-vial glass — wide neck, short shoulder, straight body, rounded base.
const GLASS_PATH =
  "M57 110 L103 110 L103 116 C103 121 120 122 120 130 L120 214 C120 220 115 224 109 224 L51 224 C45 224 40 220 40 214 L40 130 C40 122 57 121 57 116 Z";
// Liquid fill — lower body only (matches glass sides so it stays inside).
const LIQUID_PATH =
  "M40 132 L120 132 L120 214 C120 220 115 224 109 224 L51 224 C45 224 40 220 40 214 Z";

export function VialKit() {
  const reduced = useReducedMotion();

  return (
    <div className="sa-anim relative flex aspect-[460/560] w-[320px] items-center justify-center sm:w-[380px] md:w-[500px]">
      {/* SUBTLE BACKGROUND AFTERGLOW — soft bloom, not an obvious ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[78%] w-[78%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,46,138,0.2) 0%, rgba(170,120,255,0.11) 38%, rgba(255,46,138,0) 68%)",
          filter: "blur(44px)",
          animation: "sa-breathe 6s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute h-[54%] w-[54%] rounded-full"
        style={{ border: "1px solid rgba(255,111,176,0.08)" }}
      />

      {/* SPARSE SOFT BOKEH PARTICLES */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {DOTS.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={d.color}
            style={{ filter: "blur(0.5px)" }}
            initial={{ opacity: d.base }}
            animate={reduced ? undefined : { opacity: [d.base, d.base + 0.4, d.base] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* THE VIAL — Framer Motion sway */}
      <motion.svg
        width="373"
        height="560"
        viewBox="0 33 160 240"
        className="relative h-[375px] w-[250px] sm:h-[410px] sm:w-[273px] md:h-[560px] md:w-[373px]"
        style={{
          transformOrigin: "50% 60%",
          filter:
            "drop-shadow(0 16px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 16px rgba(255,46,138,0.3))",
        }}
        initial={{ x: 0, y: 0, rotate: -2.5 }}
        animate={
          reduced ? undefined : { x: [0, 3, 0], y: [0, -6, 0], rotate: [-2.5, 2.5, -2.5] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          {/* Purple "cork" cap — simple two-stop orchid */}
          <linearGradient id="pa-cork" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C98AC6" />
            <stop offset="1" stopColor="#7A4A82" />
          </linearGradient>
          <clipPath id="pa-body-clip">
            <path d={GLASS_PATH} />
          </clipPath>
        </defs>

        {/* PURPLE CORK CAP — chunky, wide, flat-topped */}
        <rect x="55" y="76" width="50" height="24" rx="4" fill="url(#pa-cork)" stroke="var(--ember)" strokeWidth="1.6" />
        <rect x="61" y="80" width="6" height="14" rx="3" fill="rgba(255,255,255,0.22)" />

        {/* DARK RUBBER STOPPER BAND under the cap */}
        <rect x="58" y="100" width="44" height="9" rx="1.5" fill="#241A2C" stroke="var(--ember)" strokeWidth="1.4" />

        {/* GLASS BODY — flat fill */}
        <path d={GLASS_PATH} fill="#191221" />
        <g clipPath="url(#pa-body-clip)">
          {/* simple liquid tint */}
          <path d={LIQUID_PATH} fill="rgba(255,46,138,0.14)" />
          {/* single sheen streak */}
          <rect x="48" y="126" width="5" height="94" rx="2.5" fill="rgba(255,235,245,0.10)" />
        </g>
        {/* bold neon outline */}
        <path d={GLASS_PATH} fill="none" stroke="var(--ember)" strokeWidth="2.2" strokeLinejoin="round" />

        {/* LABEL — clean black panel */}
        <rect
          x="44"
          y="144"
          width="72"
          height="68"
          rx="4"
          fill="rgba(6,5,7,0.92)"
          stroke="var(--ember)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <text
          x="80"
          y="166"
          fill="var(--ember)"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="13"
          letterSpacing="0.01em"
        >
          PASSION
        </text>
        <text
          x="80"
          y="180"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.65"
          fontFamily="var(--font-mono)"
          fontSize="4.8"
          letterSpacing="0.06em"
        >
          PT-141 · ON-DEMAND
        </text>
        <line x1="64" y1="189" x2="96" y2="189" stroke="var(--ember)" strokeWidth="1.6" opacity="0.8" />
        <text
          x="80"
          y="203"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.85"
          fontFamily="var(--font-mono)"
          fontSize="5.6"
          letterSpacing="0.1em"
        >
          1-MONTH VIAL
        </text>
      </motion.svg>
    </div>
  );
}
