"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero dropper bottle — the marquee animation of the home page.
 *
 * Split per the design plan:
 *
 *   CSS @keyframes (in globals.css):
 *     • Outer + secondary conic-gradient nebulae       (sa-nebula, sa-nebula-rev)
 *     • Heat bloom, dust ring, floor reflection        (sa-breathe, sa-breathe-soft, sa-floor)
 *     • In-bottle core glow, surface shimmer, ribbon   (sa-breathe, sa-shimmer, sa-highlight)
 *
 *   Framer Motion (this file):
 *     • Vial sway (transform on the parent SVG)
 *     • Two liquid wave layers (translateX loops)
 *     • Nine rising bubbles inside the liquid
 *     • Twenty-two ambient star particles around the bottle
 *
 * Deterministic golden-angle pseudo-random distribution so SSR and client
 * render identical positions — no hydration mismatch, no mount pop.
 *
 * useReducedMotion(): if true, every motion element renders static (no
 * `animate` prop). The .sa-anim wrapper class also kills CSS @keyframes
 * via a media query in globals.css.
 */

const PHI = 2.39996323; // golden angle in radians

const STAR_COLORS = ["#FF7A1A", "#FFB30A", "#F5D547"] as const;
const STARS = Array.from({ length: 22 }, (_, i) => {
  const angle = i * PHI;
  const radius = 38 + ((i * 7) % 22);
  return {
    cx: 50 + Math.cos(angle) * radius,
    cy: 50 + Math.sin(angle) * radius,
    r: 0.3 + ((i * 13) % 110) / 100,
    delay: -((i * 0.27) % 6),
    dur: 3 + ((i * 0.41) % 5),
    color: STAR_COLORS[i % 3],
  };
});

const BUBBLES = Array.from({ length: 9 }, (_, i) => ({
  cx: 38 + ((i * 31) % 84),
  r: 1.2 + ((i * 0.27) % 2.4),
  delay: -((i * 0.79) % 7),
  dur: 5 + ((i * 0.61) % 5),
}));

export function DropperBottle() {
  const reduced = useReducedMotion();

  return (
    <div className="sa-anim relative flex aspect-[460/560] w-[280px] items-center justify-center sm:w-[320px] md:w-[460px]">
      {/* OUTER NEBULA — soft conic, rotating, fully circular */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-full w-full rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,59,31,0) 0deg, rgba(255,46,138,0.22) 60deg, rgba(255,179,10,0.32) 130deg, rgba(255,59,31,0) 200deg, rgba(138,77,255,0.22) 260deg, rgba(255,59,31,0) 360deg)",
          filter: "blur(50px)",
          animation: "sa-nebula 28s linear infinite",
          WebkitMaskImage:
            "radial-gradient(circle, black 35%, transparent 75%)",
          maskImage:
            "radial-gradient(circle, black 35%, transparent 75%)",
        }}
      />

      {/* SECONDARY NEBULA — counter-rotating, different hue, slower */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[85%] w-[85%] rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(255,122,26,0) 0deg, rgba(255,122,26,0.25) 90deg, rgba(255,59,31,0) 180deg, rgba(245,213,71,0.22) 270deg, rgba(255,122,26,0) 360deg)",
          filter: "blur(36px)",
          animation: "sa-nebula-rev 42s linear infinite",
          WebkitMaskImage:
            "radial-gradient(circle, black 30%, transparent 75%)",
          maskImage:
            "radial-gradient(circle, black 30%, transparent 75%)",
        }}
      />

      {/* HEAT BLOOM — close circular pulse */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[70%] w-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,59,31,0.55) 0%, rgba(255,122,26,0.25) 40%, rgba(255,59,31,0) 70%)",
          filter: "blur(8px)",
          animation: "sa-breathe 4.5s ease-in-out infinite",
        }}
      />

      {/* DUST RING — thin glowing circle, slow expansion pulse */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[62%] w-[62%] rounded-full"
        style={{
          border: "1px solid rgba(255,179,10,0.18)",
          boxShadow:
            "0 0 40px rgba(255,122,26,0.18), inset 0 0 40px rgba(255,122,26,0.12)",
          animation: "sa-breathe-soft 6s ease-in-out infinite",
        }}
      />

      {/* AMBIENT STAR PARTICLES — distributed on the annulus */}
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
            fill={s.color}
            style={{ filter: "blur(0.3px)" }}
            initial={{ opacity: 0.15, scale: 0.9 }}
            animate={
              reduced
                ? undefined
                : {
                    opacity: [0.15, 1, 0.15],
                    scale: [0.9, 1.3, 0.9],
                  }
            }
            transition={{
              duration: s.dur,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* SOFT FLOOR REFLECTION — beneath the bottle */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-14 left-1/2 h-7 w-[220px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,122,26,0.55) 0%, rgba(255,59,31,0.25) 40%, rgba(255,59,31,0) 75%)",
          filter: "blur(10px)",
          animation: "sa-floor 4.5s ease-in-out infinite",
          transform: "translateX(-50%)",
        }}
      />

      {/* THE VIAL ITSELF — Framer Motion sway */}
      <motion.svg
        width="300"
        height="460"
        viewBox="0 0 160 320"
        className="relative h-[280px] w-[180px] sm:h-[340px] sm:w-[220px] md:h-[460px] md:w-[300px]"
        style={{
          transformOrigin: "50% 60%",
          filter:
            "drop-shadow(0 14px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 26px rgba(255,122,26,0.55))",
        }}
        initial={{ x: 0, y: 0, rotate: -3.5 }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 4, 0],
                y: [0, -8, 0],
                rotate: [-3.5, 3.5, -3.5],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          {/* Liquid — glowing hot-sauce gradient */}
          <linearGradient id="sa-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFB30A" />
            <stop offset="0.25" stopColor="#FF7A1A" />
            <stop offset="0.7" stopColor="#FF3B1F" />
            <stop offset="1" stopColor="#8A1B0A" />
          </linearGradient>
          {/* Glass tint */}
          <linearGradient id="sa-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Internal core glow */}
          <radialGradient id="sa-coreglow" cx="0.5" cy="0.55" r="0.5">
            <stop offset="0" stopColor="rgba(255,220,120,0.85)" />
            <stop offset="0.4" stopColor="rgba(255,122,26,0.4)" />
            <stop offset="1" stopColor="rgba(255,59,31,0)" />
          </radialGradient>
          {/* Bottle interior clip */}
          <clipPath id="sa-bottle-clip">
            <path d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z" />
          </clipPath>
        </defs>

        {/* DROPPER CAP */}
        <g
          stroke="var(--ember)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path
            d="M58 6 C58 6,60 0,80 0 C100 0,102 6,102 6 L102 22 L58 22Z"
            fill="rgba(255,59,31,0.12)"
          />
          <rect
            x="46"
            y="22"
            width="68"
            height="34"
            rx="3"
            fill="rgba(255,59,31,0.08)"
          />
          <line x1="46" y1="34" x2="114" y2="34" />
          <line x1="46" y1="46" x2="114" y2="46" />
          <path d="M62 56 L62 76 L98 76 L98 56" />
        </g>

        {/* BOTTLE GLASS OUTLINE */}
        <path
          d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"
          fill="rgba(20,17,13,0.4)"
          stroke="var(--ember)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* LIQUID + INTERNAL EFFECTS — clipped to bottle interior */}
        <g clipPath="url(#sa-bottle-clip)">
          <rect
            x="20"
            y="110"
            width="120"
            height="220"
            fill="url(#sa-liquid)"
            opacity="0.92"
          />

          {/* Core glow ellipse — CSS-animated breathe */}
          <ellipse
            cx="80"
            cy="220"
            rx="46"
            ry="80"
            fill="url(#sa-coreglow)"
            style={{
              transformOrigin: "80px 220px",
              animation: "sa-breathe 3.6s ease-in-out infinite",
            }}
          />

          {/* WAVE A — far layer (FM translate loop) */}
          <motion.g
            style={{ transformOrigin: "0 0" }}
            initial={{ x: 0 }}
            animate={reduced ? undefined : { x: -80 }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <path
              d="M-40 112 Q -20 106, 0 112 T 40 112 T 80 112 T 120 112 T 160 112 T 200 112 L 200 116 L -40 116 Z"
              fill="#FFB30A"
              opacity="0.55"
            />
          </motion.g>

          {/* WAVE B — near layer (counter-direction) */}
          <motion.g
            style={{ transformOrigin: "0 0" }}
            initial={{ x: 0 }}
            animate={reduced ? undefined : { x: 80 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <path
              d="M-40 114 Q -20 109, 0 114 T 40 114 T 80 114 T 120 114 T 160 114 T 200 114 L 200 118 L -40 118 Z"
              fill="#FF7A1A"
              opacity="0.7"
            />
          </motion.g>

          {/* Surface shimmer — CSS opacity loop */}
          <ellipse
            cx="80"
            cy="113"
            rx="42"
            ry="2.6"
            fill="#FFE8B0"
            style={{ animation: "sa-shimmer 4s ease-in-out infinite" }}
          />

          {/* Rising bubbles — FM y-translate */}
          {BUBBLES.map((b, i) => (
            <motion.circle
              key={i}
              cx={b.cx}
              r={b.r}
              fill="#FFE0B0"
              initial={{ cy: 300, scale: 0.6, opacity: 0 }}
              animate={
                reduced
                  ? { cy: 300, scale: 1, opacity: 0.7 }
                  : {
                      cy: 100,
                      scale: [0.6, 1.1],
                      opacity: [0, 0.9, 0.7, 0],
                    }
              }
              transition={{
                duration: b.dur,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeIn",
                times: [0, 0.15, 0.85, 1],
              }}
            />
          ))}

          {/* Side glass highlight on liquid */}
          <rect
            x="36"
            y="120"
            width="6"
            height="180"
            fill="rgba(255,230,180,0.25)"
            rx="3"
          />

          {/* Vertical drifting light ribbon — CSS highlight pulse */}
          <rect
            x="74"
            y="120"
            width="3"
            height="180"
            fill="rgba(255,255,255,0.18)"
            rx="1.5"
            style={{ animation: "sa-highlight 5s ease-in-out infinite" }}
          />
        </g>

        {/* Glass reflection (outside clip) */}
        <path
          d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"
          fill="url(#sa-glass)"
        />

        {/* LABEL — fully opaque background, five-line readable hierarchy.
              HOT SAUCE   (display, ember, 12 — at 76 SVG units wide, this
                          is the largest size that fits "HOT SAUCE" in
                          Space Grotesk without overflow)
              4-IN-1      (mono, paper, 7)
              SUBLINGUAL  (mono, paper, 7)
              ── ember divider ──
              30 ML       (mono, paper, 7)
            Splitting "4-IN-1 SUBLINGUAL" onto two lines — single-line at
            any legible mono size overflows the label width. */}
        <rect
          x="42"
          y="128"
          width="76"
          height="94"
          rx="2"
          fill="#0A0907"
          stroke="var(--ember)"
          strokeWidth="1.25"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.6))" }}
        />
        <text
          x="80"
          y="152"
          fill="var(--ember)"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="12"
          letterSpacing="0.04em"
        >
          HOT SAUCE
        </text>
        <text
          x="80"
          y="170"
          fill="#F2ECDF"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          fontSize="7"
          letterSpacing="0.08em"
        >
          4-IN-1
        </text>
        <text
          x="80"
          y="182"
          fill="#F2ECDF"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          fontSize="7"
          letterSpacing="0.08em"
        >
          SUBLINGUAL
        </text>
        <line
          x1="58"
          y1="194"
          x2="102"
          y2="194"
          stroke="var(--ember)"
          strokeWidth="1.5"
        />
        <text
          x="80"
          y="213"
          fill="#F2ECDF"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          fontSize="7"
          letterSpacing="0.14em"
        >
          30 ML
        </text>
      </motion.svg>
    </div>
  );
}
