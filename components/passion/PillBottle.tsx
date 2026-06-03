"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero vessel for Passion — a cylindrical apothecary jar of tablets with a
 * cork, modeled on the reference: a defined glass lip ring, a rounded-but-
 * defined shoulder, straight cylindrical sides, and a defined base (cylindrical
 * quality, not fully rounded, not fully angular). Same style otherwise (neon-
 * pink outline, opaque body, subtle background afterglow, clean black label,
 * sparse bokeh). The cork is muted/desaturated so it doesn't pull the palette
 * toward tan. Still clearly tablets.
 *
 * Motion: whole-bottle sway + gentle particle twinkle. useReducedMotion()
 * renders static. Deterministic golden-angle distribution → no hydration drift.
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

// Cylindrical apothecary body — defined shoulder, straight sides, defined base.
const GLASS_PATH =
  "M60 116 C46 120 38 132 38 148 L38 214 C38 221 43 225 50 225 L110 225 C117 225 122 221 122 214 L122 148 C122 132 114 120 100 116 Z";

export function PillBottle() {
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

      {/* THE VESSEL — Framer Motion sway */}
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
          {/* Opaque body — cylindrical shading, faint plasma tint */}
          <linearGradient id="pa-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#140E16" />
            <stop offset="0.18" stopColor="#2C2030" />
            <stop offset="0.5" stopColor="#171120" />
            <stop offset="0.82" stopColor="#241A28" />
            <stop offset="1" stopColor="#0E0A12" />
          </linearGradient>
          {/* Cork — orchid/mauve, bridges the pink + purple palette */}
          <linearGradient id="pa-cork" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C98AC6" />
            <stop offset="0.5" stopColor="#9A5AA0" />
            <stop offset="1" stopColor="#653C6E" />
          </linearGradient>
          <linearGradient id="pa-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="pa-body-clip">
            <path d={GLASS_PATH} />
          </clipPath>
        </defs>

        {/* CORK — simple purple plug, drawn BEHIND the bottle: the opaque body
            + lip ring (drawn after) hide the inserted lower portion, so only
            the part above the mouth shows. Bottom (y124) sits inside the neck. */}
        <path
          d="M63 126 L61 80 L99 80 L97 126 Z"
          fill="url(#pa-cork)"
          stroke="#A86EAE"
          strokeWidth="1"
          strokeLinejoin="miter"
        />
        <rect x="66" y="83" width="4" height="13" rx="1" fill="rgba(255,255,255,0.12)" />

        {/* OPAQUE CYLINDRICAL BODY */}
        <path d={GLASS_PATH} fill="url(#pa-body)" />
        <g clipPath="url(#pa-body-clip)">
          <path d="M60 116 C46 120 38 132 38 150 L38 160 C60 132 100 132 122 160 L122 150 C122 132 114 120 100 116 Z" fill="url(#pa-sheen)" opacity="0.4" />
          <rect x="44" y="152" width="6" height="64" rx="3" fill="rgba(255,235,245,0.13)" />
        </g>
        <path d={GLASS_PATH} fill="none" stroke="var(--ember)" strokeWidth="1.25" strokeLinejoin="round" />

        {/* GLASS LIP RING — defined collar + top bead, sits on the neck */}
        <rect x="58" y="103" width="44" height="14" rx="2.5" fill="url(#pa-body)" stroke="var(--ember)" strokeWidth="1.25" strokeLinejoin="round" />
        <rect x="55" y="99" width="50" height="6" rx="2.5" fill="url(#pa-body)" stroke="var(--ember)" strokeWidth="1.25" strokeLinejoin="round" />

        {/* LABEL — clean black panel, Hot-Sauce structure */}
        <rect
          x="46"
          y="152"
          width="68"
          height="60"
          rx="3"
          fill="rgba(6,5,7,0.92)"
          stroke="var(--ember)"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
        <text
          x="80"
          y="175"
          fill="var(--ember)"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="13"
          letterSpacing="0.04em"
        >
          PASSION
        </text>
        <text
          x="80"
          y="188"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.65"
          fontFamily="var(--font-mono)"
          fontSize="4.6"
          letterSpacing="0.1em"
        >
          3-IN-1 · ON-DEMAND
        </text>
        <line x1="62" y1="197" x2="98" y2="197" stroke="var(--ember)" strokeWidth="1.75" opacity="0.8" />
        <text
          x="80"
          y="208"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.85"
          fontFamily="var(--font-mono)"
          fontSize="5"
          letterSpacing="0.12em"
        >
          12 TABLETS
        </text>
      </motion.svg>
    </div>
  );
}
