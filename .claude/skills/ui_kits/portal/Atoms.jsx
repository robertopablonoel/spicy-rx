// =====================================================
// Portal atoms — shared across portal screens.
// =====================================================

const PortalLogo = ({ size = 22 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
    <defs>
      <linearGradient id="pl-heat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFB30A"/>
        <stop offset=".45" stopColor="#FF7A1A"/>
        <stop offset="1" stopColor="#FF3B1F"/>
      </linearGradient>
    </defs>
    <path d="M50 4 C50 4,12 50,12 78 C12 98,29 114,50 114 C71 114,88 98,88 78 C88 50,50 4,50 4Z" fill="url(#pl-heat)"/>
    <ellipse cx="38" cy="72" rx="6" ry="13" fill="#0A0907" transform="rotate(-18 38 72)"/>
    <ellipse cx="62" cy="72" rx="6" ry="13" fill="#0A0907" transform="rotate(18 62 72)"/>
  </svg>
);

const StatusChip = ({ tone = 'vitals', children }) => {
  const tones = {
    vitals: { c: 'var(--vitals)', b: 'rgba(56,255,161,0.3)' },
    ember:  { c: 'var(--ember)',  b: 'rgba(255,122,26,0.4)' },
    hot:    { c: 'var(--hot)',    b: 'rgba(255,59,31,0.4)' },
    fog:    { c: 'var(--fog)',    b: 'var(--ash)' },
    serum:  { c: 'var(--serum)',  b: 'rgba(245,213,71,0.35)' },
  };
  const t = tones[tone] || tones.vitals;
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      padding: '4px 9px', borderRadius: 999,
      border: `1px solid ${t.b}`, color: t.c, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: 'currentColor', display: 'inline-block' }}/>
      {children}
    </span>
  );
};

const Card = ({ children, glow = false, style }) => (
  <div style={{
    background: 'var(--crater)',
    border: glow ? '1px solid rgba(255,59,31,0.4)' : '1px solid var(--ash)',
    padding: 28,
    borderRadius: 0,
    boxShadow: glow
      ? '0 0 0 1px rgba(255,59,31,0.25), 0 0 48px rgba(255,59,31,0.18)'
      : '0 1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.25)',
    ...style,
  }}>{children}</div>
);

const CardEyebrow = ({ children, color = 'var(--ember)' }) => (
  <div style={{
    fontFamily: 'var(--font-mono)', fontSize: 10,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
  }}>
    <span style={{ width: 5, height: 5, borderRadius: 999, background: 'currentColor' }}/>
    {children}
  </div>
);

const LabReadout = ({ label, value, unit, tone = 'fg' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 10,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)',
    }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32,
        letterSpacing: '-0.02em', color: tone === 'vitals' ? 'var(--vitals)' : tone === 'ember' ? 'var(--ember)' : 'var(--fg)',
        lineHeight: 1,
      }}>{value}</span>
      {unit && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--fog)', textTransform: 'uppercase' }}>{unit}</span>
      )}
    </div>
  </div>
);

const PButton = ({ children, variant = 'primary', size = 'md', onClick, style }) => {
  const sizes = {
    sm: { padding: '7px 12px', fontSize: 12 },
    md: { padding: '11px 18px', fontSize: 13 },
    lg: { padding: '14px 24px', fontSize: 15 },
  };
  const variants = {
    primary:   { background: 'var(--hot)', color: 'var(--void)', border: '1px solid var(--hot)' },
    secondary: { background: 'transparent', color: 'var(--fg)', border: '1px solid var(--smoke)' },
    ghost:     { background: 'transparent', color: 'var(--mist)', border: '1px solid transparent' },
  };
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-body)', fontWeight: 600,
      borderRadius: 0, cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.2,0.8,0.2,1)',
      ...sizes[size], ...variants[variant], ...style,
    }}>{children}</button>
  );
};

Object.assign(window, { PortalLogo, StatusChip, Card, CardEyebrow, LabReadout, PButton });
