"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero vessel for Passion (PT-141) — a prefilled subcutaneous auto-injector pen,
 * the injectable analogue of the old apothecary jar. Same visual language kept
 * intact: neon-pink outline (var(--ember)), opaque plasma-tinted body, subtle
 * background afterglow, a clean black label panel, and sparse bokeh. The cap
 * (needle end) is muted orchid/mauve so it bridges the pink↔purple palette
 * without pulling the scene tan. A rose "dose window" shows the liquid.
 *
 * Motion: whole-pen sway + gentle particle twinkle. useReducedMotion() renders
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

// Pen body — a tall rounded capsule (the barrel of the auto-injector).
const BODY_PATH =
  "M62 86 C62 78 68 72 76 72 L84 72 C92 72 98 78 98 86 L98 204 C98 212 92 218 84 218 L76 218 C68 218 62 212 62 204 Z";

export function InjectorPen() {
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

      {/* THE PEN — Framer Motion sway */}
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
          {/* Cap (needle cover) — orchid/mauve, bridges the pink + purple palette */}
          <linearGradient id="pa-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C98AC6" />
            <stop offset="0.5" stopColor="#9A5AA0" />
            <stop offset="1" stopColor="#653C6E" />
          </linearGradient>
          {/* Dose window liquid — rose plasma */}
          <linearGradient id="pa-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,46,138,0.85)" />
            <stop offset="1" stopColor="rgba(201,102,200,0.6)" />
          </linearGradient>
          <linearGradient id="pa-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="pa-body-clip">
            <path d={BODY_PATH} />
          </clipPath>
        </defs>

        {/* ACTIVATION BUTTON — top plunger cap, drawn behind the body */}
        <rect
          x="69"
          y="56"
          width="22"
          height="20"
          rx="4"
          fill="url(#pa-cap)"
          stroke="#A86EAE"
          strokeWidth="1"
        />
        <rect x="72" y="59" width="4" height="11" rx="1" fill="rgba(255,255,255,0.14)" />

        {/* OPAQUE PEN BODY */}
        <path d={BODY_PATH} fill="url(#pa-body)" />
        <g clipPath="url(#pa-body-clip)">
          {/* top sheen */}
          <path
            d="M62 86 C62 78 68 72 76 72 L84 72 C92 72 98 78 98 86 L98 104 C86 96 74 96 62 104 Z"
            fill="url(#pa-sheen)"
            opacity="0.4"
          />
          {/* vertical highlight streak */}
          <rect x="68" y="92" width="6" height="120" rx="3" fill="rgba(255,235,245,0.13)" />
        </g>
        <path d={BODY_PATH} fill="none" stroke="var(--ember)" strokeWidth="1.25" strokeLinejoin="round" />

        {/* DOSE WINDOW — rounded viewport showing the rose liquid + fill line */}
        <rect
          x="67"
          y="92"
          width="26"
          height="40"
          rx="4"
          fill="rgba(6,5,7,0.55)"
          stroke="var(--ember)"
          strokeWidth="1"
          strokeOpacity="0.55"
        />
        <rect x="69.5" y="104" width="21" height="26" rx="2.5" fill="url(#pa-liquid)" />
        <line x1="69.5" y1="104" x2="90.5" y2="104" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />

        {/* NECK — collar between body and cap */}
        <rect x="70" y="214" width="20" height="8" rx="2" fill="url(#pa-body)" stroke="var(--ember)" strokeWidth="1.1" strokeLinejoin="round" />

        {/* CAP — muted mauve needle cover at the bottom (rounded end) */}
        <path
          d="M70 222 L90 222 L90 244 C90 250 85 254 80 254 C75 254 70 250 70 244 Z"
          fill="url(#pa-cap)"
          stroke="#A86EAE"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <rect x="73" y="226" width="3.5" height="18" rx="1.5" fill="rgba(255,255,255,0.12)" />

        {/* LABEL — clean black panel, Hot-Sauce structure */}
        <rect
          x="63"
          y="150"
          width="34"
          height="54"
          rx="3"
          fill="rgba(6,5,7,0.92)"
          stroke="var(--ember)"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
        <text
          x="80"
          y="166"
          fill="var(--ember)"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="9.5"
          letterSpacing="0.02em"
        >
          PASSION
        </text>
        <text
          x="80"
          y="177"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.65"
          fontFamily="var(--font-mono)"
          fontSize="3.6"
          letterSpacing="0.08em"
        >
          PT-141 · ON-DEMAND
        </text>
        <line x1="68" y1="186" x2="92" y2="186" stroke="var(--ember)" strokeWidth="1.5" opacity="0.8" />
        <text
          x="80"
          y="197"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.85"
          fontFamily="var(--font-mono)"
          fontSize="4.6"
          letterSpacing="0.12em"
        >
          1 DOSE PEN
        </text>
      </motion.svg>
    </div>
  );
}
