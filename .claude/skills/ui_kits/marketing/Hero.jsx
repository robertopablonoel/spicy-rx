// Hero — asymmetric, droplet illustration on the right
function Hero({ onCta }) {
  return (
    <section className="m-hero" style={{
      minHeight: '92vh',
      padding: '140px 40px 80px',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 60,
      alignItems: 'center',
      background: 'radial-gradient(120% 80% at 70% 0%, #1F1A14 0%, #0A0907 70%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 0H40M0 40H40M0 0V40M40 0V40' stroke='rgba(255,255,255,0.04)' /></svg>")`,
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        <Eyebrow style={{ marginBottom: 22 }}>● USA-made · Clinician-prescribed · 4-in-1</Eyebrow>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(56px, 7.5vw, 104px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          margin: 0,
          color: 'var(--fg)',
          textWrap: 'balance',
        }}>
          Faster onset.<br/>
          Peak strength.<br/>
          36-hour window.<br/>
          <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>
            Plus desire.
          </span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 19, lineHeight: 1.5,
          color: 'var(--mist)',
          maxWidth: 520,
          marginTop: 28,
        }}>
          Hot Sauce is a 4-in-1 sublingual that stacks the active ingredients in Viagra, Cialis, and Levitra — <em style={{ color: 'var(--fg)', fontStyle: 'normal', fontWeight: 600 }}>plus apomorphine</em> to ignite desire. Hits in 15 minutes. Goes the whole weekend. Clinician-prescribed, shipped discreetly.
        </p>
        <div className="m-hero-cta" style={{ display: 'flex', gap: 14, marginTop: 36, alignItems: 'center' }}>
          <Button size="lg" onClick={onCta}>See if you qualify →</Button>
          <Button variant="ghost" size="lg">How it works</Button>
        </div>
        <div className="m-stats" style={{ display: 'flex', gap: 28, marginTop: 44, alignItems: 'center' }}>
          <Stat label="Onset" value="15 min" />
          <Divider />
          <Stat label="Window" value="36 hr" />
          <Divider />
          <Stat label="Active ingredients" value="4" />
          <Divider />
          <Stat label="Clinic visits" value="0" />
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DropperBottle />
      </div>
    </section>
  );
}

const Stat = ({ label, value }) => (
  <div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)' }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, color: 'var(--fg)', letterSpacing: '-0.02em', marginTop: 4 }}>{value}</div>
  </div>
);

const Divider = () => (
  <div className="m-divider" style={{ width: 1, height: 32, background: 'var(--ash)' }} />
);

function DropperBottle() {
  // Bottle interior in viewBox coords: x 30→130, y 76→316.
  // Liquid surface oscillates near y = 110.
  const bubbles = React.useMemo(() => (
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      x: 38 + Math.random() * 84,
      r: 1.2 + Math.random() * 2.4,
      delay: -(Math.random() * 7),
      dur: 5 + Math.random() * 5,
    }))
  ), []);
  const stars = React.useMemo(() => (
    Array.from({ length: 22 }, (_, i) => {
      // Distribute on an annulus around the bottle, not uniformly across the box
      const angle = Math.random() * Math.PI * 2;
      const radius = 38 + Math.random() * 22;
      return {
        id: i,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        r: 0.3 + Math.random() * 1.1,
        delay: -(Math.random() * 6),
        dur: 3 + Math.random() * 5,
      };
    })
  ), []);

  return (
    <div className="m-vial-wrap" style={{
      position: 'relative',
      width: 460, height: 560,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes sa-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.08); }
        }
        @keyframes sa-breathe-soft {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.04); }
        }
        @keyframes sa-nebula {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sa-nebula-rev {
          0%   { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes sa-wave-a { 0% { transform: translateX(0); } 100% { transform: translateX(-80px); } }
        @keyframes sa-wave-b { 0% { transform: translateX(0); } 100% { transform: translateX(80px); } }
        @keyframes sa-shimmer {
          0%, 100% { opacity: 0.18; }
          50%      { opacity: 0.5; }
        }
        @keyframes sa-bubble {
          0%   { transform: translateY(0)     scale(0.6); opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.7; }
          100% { transform: translateY(-200px) scale(1.1); opacity: 0; }
        }
        @keyframes sa-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes sa-sway {
          0%   { transform: translate(0,  0)   rotate(-3.5deg); }
          50%  { transform: translate(4px,-8px) rotate( 3.5deg); }
          100% { transform: translate(0,  0)   rotate(-3.5deg); }
        }
        @keyframes sa-floor {
          0%, 100% { opacity: 0.55; transform: translateX(-50%) scaleX(1);    }
          50%      { opacity: 0.85; transform: translateX(-50%) scaleX(1.08); }
        }
        @keyframes sa-highlight {
          0%, 100% { opacity: 0;   transform: translateY(0); }
          50%      { opacity: 0.5; transform: translateY(-6px); }
        }
        .sa-vial { animation: sa-sway 8s ease-in-out infinite; transform-origin: 50% 60%; }
      `}</style>

      {/* OUTER NEBULA — soft conic, rotating, fully circular */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, rgba(255,59,31,0) 0deg, rgba(255,46,138,0.22) 60deg, rgba(255,179,10,0.32) 130deg, rgba(255,59,31,0) 200deg, rgba(138,77,255,0.22) 260deg, rgba(255,59,31,0) 360deg)',
        filter: 'blur(50px)',
        animation: 'sa-nebula 28s linear infinite',
        pointerEvents: 'none',
        // Fade outer edge so corners don't show
        WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 75%)',
        maskImage: 'radial-gradient(circle, black 35%, transparent 75%)',
      }} />

      {/* SECONDARY NEBULA — counter-rotating, different hue, slower */}
      <div style={{
        position: 'absolute', width: '85%', height: '85%',
        borderRadius: '50%',
        background: 'conic-gradient(from 180deg, rgba(255,122,26,0) 0deg, rgba(255,122,26,0.25) 90deg, rgba(255,59,31,0) 180deg, rgba(245,213,71,0.22) 270deg, rgba(255,122,26,0) 360deg)',
        filter: 'blur(36px)',
        animation: 'sa-nebula-rev 42s linear infinite',
        pointerEvents: 'none',
        WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 75%)',
        maskImage: 'radial-gradient(circle, black 30%, transparent 75%)',
      }} />

      {/* HEAT BLOOM — close circular pulse */}
      <div style={{
        position: 'absolute', width: '70%', height: '70%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 50%, rgba(255,59,31,0.55) 0%, rgba(255,122,26,0.25) 40%, rgba(255,59,31,0) 70%)',
        filter: 'blur(8px)',
        animation: 'sa-breathe 4.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* DUST RING — thin glowing circle, slow expansion pulse */}
      <div style={{
        position: 'absolute', width: '62%', height: '62%',
        borderRadius: '50%',
        border: '1px solid rgba(255,179,10,0.18)',
        boxShadow: '0 0 40px rgba(255,122,26,0.18), inset 0 0 40px rgba(255,122,26,0.12)',
        animation: 'sa-breathe-soft 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* AMBIENT STAR PARTICLES — distributed on the annulus */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none"
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <circle key={s.id} cx={s.x} cy={s.y} r={s.r}
                  fill={s.id % 3 === 0 ? '#FF7A1A' : s.id % 3 === 1 ? '#FFB30A' : '#F5D547'}
                  style={{
                    animation: `sa-twinkle ${s.dur}s ease-in-out infinite`,
                    animationDelay: `${s.delay}s`,
                    filter: 'blur(0.3px)',
                  }}/>
        ))}
      </svg>

      {/* SOFT FLOOR REFLECTION — beneath the bottle */}
      <div style={{
        position: 'absolute',
        bottom: 56,
        left: '50%',
        width: 220, height: 28,
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(255,122,26,0.55) 0%, rgba(255,59,31,0.25) 40%, rgba(255,59,31,0) 75%)',
        filter: 'blur(10px)',
        animation: 'sa-floor 4.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* THE VIAL ITSELF — drifts + tilts via sa-sway */}
      <svg className="sa-vial"
           width="300" height="460" viewBox="0 0 160 320"
           style={{ position: 'relative', filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 26px rgba(255,122,26,0.55))' }}>
        <defs>
          {/* Liquid: glowing hot-sauce gradient with internal highlight */}
          <linearGradient id="sa-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0"    stopColor="#FFB30A"/>
            <stop offset="0.25" stopColor="#FF7A1A"/>
            <stop offset="0.7"  stopColor="#FF3B1F"/>
            <stop offset="1"    stopColor="#8A1B0A"/>
          </linearGradient>
          {/* Glass tint */}
          <linearGradient id="sa-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"   stopColor="rgba(255,255,255,0)"/>
            <stop offset="0.5" stopColor="rgba(255,255,255,0.08)"/>
            <stop offset="1"   stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          {/* Internal core glow */}
          <radialGradient id="sa-coreglow" cx="0.5" cy="0.55" r="0.5">
            <stop offset="0"   stopColor="rgba(255,220,120,0.85)"/>
            <stop offset="0.4" stopColor="rgba(255,122,26,0.4)"/>
            <stop offset="1"   stopColor="rgba(255,59,31,0)"/>
          </radialGradient>
          {/* Bottle interior shape (clip for liquid + bubbles) */}
          <clipPath id="sa-bottle-clip">
            <path d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"/>
          </clipPath>
        </defs>

        {/* DROPPER CAP */}
        <g stroke="var(--ember)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M58 6 C58 6,60 0,80 0 C100 0,102 6,102 6 L102 22 L58 22Z" fill="rgba(255,59,31,0.12)"/>
          <rect x="46" y="22" width="68" height="34" rx="3" fill="rgba(255,59,31,0.08)"/>
          <line x1="46" y1="34" x2="114" y2="34"/>
          <line x1="46" y1="46" x2="114" y2="46"/>
          <path d="M62 56 L62 76 L98 76 L98 56"/>
        </g>

        {/* BOTTLE GLASS OUTLINE */}
        <path d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"
              fill="rgba(20,17,13,0.4)"
              stroke="var(--ember)" strokeWidth="1.5" strokeLinejoin="round"/>

        {/* LIQUID + INTERNAL EFFECTS — clipped to bottle interior */}
        <g clipPath="url(#sa-bottle-clip)">
          <rect x="20" y="110" width="120" height="220" fill="url(#sa-liquid)" opacity="0.92"/>

          {/* Inner core glow — molten plasma feel */}
          <ellipse cx="80" cy="220" rx="46" ry="80" fill="url(#sa-coreglow)"
                   style={{
                     transformOrigin: '80px 220px',
                     animation: 'sa-breathe 3.6s ease-in-out infinite',
                   }}/>

          {/* WAVE A — far layer */}
          <g style={{ animation: 'sa-wave-a 7s linear infinite', transformOrigin: '0 0' }}>
            <path d="M-40 112 Q -20 106, 0 112 T 40 112 T 80 112 T 120 112 T 160 112 T 200 112 L 200 116 L -40 116 Z"
                  fill="#FFB30A" opacity="0.55"/>
          </g>
          {/* WAVE B — near layer */}
          <g style={{ animation: 'sa-wave-b 5s linear infinite', transformOrigin: '0 0' }}>
            <path d="M-40 114 Q -20 109, 0 114 T 40 114 T 80 114 T 120 114 T 160 114 T 200 114 L 200 118 L -40 118 Z"
                  fill="#FF7A1A" opacity="0.7"/>
          </g>

          {/* Surface shimmer */}
          <ellipse cx="80" cy="113" rx="42" ry="2.6" fill="#FFE8B0"
                   style={{ animation: 'sa-shimmer 4s ease-in-out infinite' }}/>

          {/* Rising bubbles */}
          {bubbles.map(b => (
            <circle key={b.id} cx={b.x} cy={300} r={b.r}
                    fill="#FFE0B0" opacity="0.85"
                    style={{
                      animation: `sa-bubble ${b.dur}s ease-in infinite`,
                      animationDelay: `${b.delay}s`,
                    }}/>
          ))}

          {/* Side glass highlight on liquid */}
          <rect x="36" y="120" width="6" height="180" fill="rgba(255,230,180,0.25)" rx="3"/>

          {/* Vertical drifting light ribbon */}
          <rect x="74" y="120" width="3" height="180" fill="rgba(255,255,255,0.18)" rx="1.5"
                style={{ animation: 'sa-highlight 5s ease-in-out infinite' }}/>
        </g>

        {/* Glass reflection (outside clip) */}
        <path d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76 Z"
              fill="url(#sa-glass)"/>

        {/* LABEL */}
        <rect x="42" y="130" width="76" height="92" rx="2"
              fill="rgba(10,9,7,0.72)" stroke="var(--ember)" strokeWidth="1"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}/>
        <text x="80" y="156" fill="var(--ember)" textAnchor="middle"
              fontFamily="Space Grotesk" fontWeight="700" fontSize="11" letterSpacing="0.04em">HOT SAUCE</text>
        <text x="80" y="172" fill="var(--ember)" textAnchor="middle" opacity="0.6"
              fontFamily="JetBrains Mono" fontSize="6" letterSpacing="0.2em">4-IN-1 SUBLINGUAL · 30 ML</text>
        <line x1="52" y1="184" x2="108" y2="184" stroke="var(--ember)" strokeWidth="2.5"/>
        <text x="80" y="204" fill="var(--ember)" textAnchor="middle" opacity="0.7"
              fontFamily="JetBrains Mono" fontSize="5" letterSpacing="0.16em">SIL · TAD · VAR · APO</text>
      </svg>
    </div>
  );
}

window.Hero = Hero;
