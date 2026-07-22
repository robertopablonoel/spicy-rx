"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero vessel for Passion (PT-141) — the ACCURATE presentation: a refrigerated
 * multi-dose glass VIAL (rubber stopper + crimp cap, rose plasma liquid) with an
 * insulin SYRINGE resting below it, i.e. the compounded-bremelanotide kit that
 * actually ships (vial + syringe + swabs, self-drawn subcutaneously). Replaces
 * the earlier auto-injector-pen concept, which was wrong for a compounding-
 * pharmacy product (a reconstituted vial "use within 28 days" is exactly Rimo's
 * 1-dose-per-28-days plan — a multi-dose vial, not a single-dose pen).
 *
 * Visual language kept intact from the old vessel: neon-pink outline
 * (var(--ember)), opaque plasma-tinted glass, subtle background afterglow, a
 * clean black label panel, sparse bokeh.
 *
 * Motion: whole-kit sway + gentle particle twinkle. useReducedMotion() renders
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

// Vial — straight-sided glass body with a sloped shoulder up to a short neck.
const VIAL_BODY =
  "M62 150 L62 202 C62 206 65 209 69 209 L91 209 C95 209 98 206 98 202 L98 150 C98 141 91 135 80 135 C69 135 62 141 62 150 Z";

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

      {/* THE KIT — Framer Motion sway */}
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
          {/* Opaque glass body — cylindrical shading, faint plasma tint */}
          <linearGradient id="pa-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#140E16" />
            <stop offset="0.18" stopColor="#2C2030" />
            <stop offset="0.5" stopColor="#171120" />
            <stop offset="0.82" stopColor="#241A28" />
            <stop offset="1" stopColor="#0E0A12" />
          </linearGradient>
          {/* Crimp cap — orchid/mauve metal, bridges the pink + purple palette */}
          <linearGradient id="pa-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C98AC6" />
            <stop offset="0.5" stopColor="#9A5AA0" />
            <stop offset="1" stopColor="#653C6E" />
          </linearGradient>
          {/* Liquid — rose plasma */}
          <linearGradient id="pa-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,46,138,0.82)" />
            <stop offset="1" stopColor="rgba(201,102,200,0.55)" />
          </linearGradient>
          <linearGradient id="pa-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="pa-body-clip">
            <path d={VIAL_BODY} />
          </clipPath>
        </defs>

        {/* ── INSULIN SYRINGE — resting below the vial, gentle uphill tilt ── */}
        <g transform="translate(26 232) rotate(-8)" opacity="0.92">
          {/* thumb rest */}
          <rect x="0" y="-8" width="4.5" height="16" rx="1.5" fill="url(#pa-body)" stroke="var(--ember)" strokeWidth="0.9" />
          {/* plunger rod */}
          <rect x="4.5" y="-1.6" width="36" height="3.2" fill="url(#pa-body)" stroke="var(--ember)" strokeWidth="0.6" />
          {/* barrel */}
          <rect x="40" y="-6.5" width="54" height="13" rx="3" fill="url(#pa-body)" stroke="var(--ember)" strokeWidth="1" />
          {/* barrel liquid */}
          <rect x="44" y="-4.2" width="40" height="8.4" rx="2" fill="url(#pa-liquid)" />
          {/* graduation ticks */}
          {[52, 60, 68, 76, 84].map((x) => (
            <line key={x} x1={x} y1="-6.5" x2={x} y2="-2.5" stroke="var(--ember)" strokeWidth="0.5" opacity="0.6" />
          ))}
          {/* tip cone → hub */}
          <path d="M94 -6.5 L94 6.5 L100 2.2 L100 -2.2 Z" fill="url(#pa-cap)" stroke="var(--ember)" strokeWidth="0.6" />
          {/* needle */}
          <line x1="100" y1="0" x2="120" y2="0" stroke="#C9A6FF" strokeWidth="1.1" strokeLinecap="round" />
        </g>

        {/* ── VIAL ── crimp cap (drawn first, behind body top) */}
        {/* crimp cap band */}
        <rect x="68" y="104" width="24" height="11" rx="1.5" fill="url(#pa-cap)" stroke="#A86EAE" strokeWidth="1" />
        {/* flip-top center hub */}
        <ellipse cx="80" cy="103" rx="6" ry="2.4" fill="url(#pa-cap)" stroke="#A86EAE" strokeWidth="0.8" />
        {/* rubber stopper (neck) */}
        <rect x="71" y="115" width="18" height="9" rx="1" fill="#3A2E3E" stroke="var(--ember)" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* neck below stopper into shoulder */}
        <rect x="72" y="124" width="16" height="12" fill="url(#pa-body)" />

        {/* OPAQUE GLASS BODY */}
        <path d={VIAL_BODY} fill="url(#pa-body)" />
        <g clipPath="url(#pa-body-clip)">
          {/* liquid fill (partial) */}
          <rect x="62" y="160" width="36" height="49" fill="url(#pa-liquid)" />
          <line x1="62" y1="160" x2="98" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          {/* shoulder sheen */}
          <path
            d="M62 150 C62 141 71 135 80 135 C89 135 98 141 98 150 L98 162 C86 154 74 154 62 162 Z"
            fill="url(#pa-sheen)"
            opacity="0.4"
          />
          {/* vertical highlight streak */}
          <rect x="67" y="142" width="5" height="64" rx="2.5" fill="rgba(255,235,245,0.13)" />
        </g>
        <path d={VIAL_BODY} fill="none" stroke="var(--ember)" strokeWidth="1.25" strokeLinejoin="round" />

        {/* LABEL — clean black panel, Hot-Sauce structure */}
        <rect
          x="63"
          y="158"
          width="34"
          height="44"
          rx="3"
          fill="rgba(6,5,7,0.92)"
          stroke="var(--ember)"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
        <text
          x="80"
          y="172"
          fill="var(--ember)"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="9"
          letterSpacing="0.02em"
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
          fontSize="3.4"
          letterSpacing="0.07em"
        >
          PT-141 · ON-DEMAND
        </text>
        <line x1="68" y1="189" x2="92" y2="189" stroke="var(--ember)" strokeWidth="1.5" opacity="0.8" />
        <text
          x="80"
          y="199"
          fill="var(--ember)"
          textAnchor="middle"
          opacity="0.85"
          fontFamily="var(--font-mono)"
          fontSize="4.2"
          letterSpacing="0.1em"
        >
          28-DAY VIAL
        </text>
      </motion.svg>
    </div>
  );
}
