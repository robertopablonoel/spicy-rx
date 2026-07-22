"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero vessel for Passion (PT-141) — a classic peptide VIAL: squat tinted-glass
 * body, rounded shoulder, a knurled aluminum crimp collar under a mauve flip-off
 * cap, and a wrap label. This is the presentation compounded bremelanotide
 * actually ships in (a multi-dose vial you draw from with an insulin syringe).
 * Modeled on a standard peptide vial silhouette, rendered in the Passion theme.
 *
 * Visual language kept from the prior vessel: neon-pink outline (var(--ember)),
 * opaque plasma-tinted glass, subtle background afterglow, a clean black label
 * panel, sparse bokeh. Geometry was iterated against a real rendered image so
 * the shapes line up (viewBox 0 33 160 240; vial centered at x=80).
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

// Peptide-vial glass — short neck, rounded shoulder into a straight body, round base.
const GLASS_PATH =
  "M71 107 L89 107 L89 115 C89 123 117 125 117 138 L117 208 C117 214 112 218 105 218 L55 218 C48 218 43 214 43 208 L43 138 C43 125 71 123 71 115 Z";

// Vertical knurl ticks across the aluminum crimp collar.
const KNURL = [67, 71, 75, 79, 83, 87, 91];

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
          {/* Opaque tinted glass — cylindrical shading, faint plasma tint */}
          <linearGradient id="pa-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#140E16" />
            <stop offset="0.18" stopColor="#2C2030" />
            <stop offset="0.5" stopColor="#171120" />
            <stop offset="0.82" stopColor="#241A28" />
            <stop offset="1" stopColor="#0E0A12" />
          </linearGradient>
          {/* Flip-off cap — orchid/mauve plastic */}
          <linearGradient id="pa-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C98AC6" />
            <stop offset="0.5" stopColor="#9A5AA0" />
            <stop offset="1" stopColor="#653C6E" />
          </linearGradient>
          {/* Aluminum crimp collar — brushed silver-mauve */}
          <linearGradient id="pa-crimp" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6E5A72" />
            <stop offset="0.5" stopColor="#C9B0CC" />
            <stop offset="1" stopColor="#5A4860" />
          </linearGradient>
          {/* Liquid — muted rose plasma */}
          <linearGradient id="pa-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,46,138,0.66)" />
            <stop offset="1" stopColor="rgba(180,96,200,0.42)" />
          </linearGradient>
          <linearGradient id="pa-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="pa-body-clip">
            <path d={GLASS_PATH} />
          </clipPath>
        </defs>

        {/* FLIP-OFF CAP — plastic top, sits flush on the crimp */}
        <rect x="67" y="77" width="26" height="13" rx="5" fill="url(#pa-cap)" stroke="#A86EAE" strokeWidth="1" />
        <ellipse cx="80" cy="79.5" rx="8.5" ry="2.4" fill="#B87ABE" />

        {/* ALUMINUM CRIMP COLLAR — knurled, with a rolled bottom lip */}
        <rect x="63" y="89" width="34" height="18" rx="2.5" fill="url(#pa-crimp)" stroke="#8A6E90" strokeWidth="0.8" />
        <g stroke="#4A3A50" strokeWidth="0.5" opacity="0.55">
          {KNURL.map((x) => (
            <line key={x} x1={x} y1="91" x2={x} y2="105" />
          ))}
        </g>
        <line x1="64" y1="103.5" x2="96" y2="103.5" stroke="#3A2E40" strokeWidth="0.8" opacity="0.7" />

        {/* GLASS BODY */}
        <path d={GLASS_PATH} fill="url(#pa-body)" />
        <g clipPath="url(#pa-body-clip)">
          {/* liquid fill + meniscus */}
          <rect x="43" y="136" width="74" height="82" fill="url(#pa-liquid)" />
          <line x1="43" y1="136" x2="117" y2="136" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          {/* shoulder sheen */}
          <path
            d="M71 115 C57 120 43 126 43 138 L43 150 C60 140 100 140 117 150 L117 138 C117 126 103 120 89 115 Z"
            fill="url(#pa-sheen)"
            opacity="0.42"
          />
          {/* vertical highlight streak */}
          <rect x="51" y="128" width="6" height="88" rx="3" fill="rgba(255,235,245,0.13)" />
        </g>
        <path d={GLASS_PATH} fill="none" stroke="var(--ember)" strokeWidth="1.25" strokeLinejoin="round" />

        {/* LABEL — clean black panel, Hot-Sauce structure */}
        <rect
          x="48"
          y="148"
          width="64"
          height="66"
          rx="4"
          fill="rgba(6,5,7,0.92)"
          stroke="var(--ember)"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
        <text
          x="80"
          y="168"
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
          y="182"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.65"
          fontFamily="var(--font-mono)"
          fontSize="4.8"
          letterSpacing="0.06em"
        >
          PT-141 · ON-DEMAND
        </text>
        <line x1="64" y1="191" x2="96" y2="191" stroke="var(--ember)" strokeWidth="1.6" opacity="0.8" />
        <text
          x="80"
          y="205"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.85"
          fontFamily="var(--font-mono)"
          fontSize="5.6"
          letterSpacing="0.1em"
        >
          28-DAY VIAL
        </text>
      </motion.svg>
    </div>
  );
}
