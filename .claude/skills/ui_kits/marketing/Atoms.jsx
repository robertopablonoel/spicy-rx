// =====================================================
// Atoms — shared across the marketing kit.
// =====================================================

const Pill = ({ children, tone = 'ember', solid = false, style }) => {
  const tones = {
    ember:  { c: 'var(--ember)',  b: 'rgba(255,122,26,0.4)' },
    hot:    { c: 'var(--hot)',    b: 'rgba(255,59,31,0.4)' },
    vitals: { c: 'var(--vitals)', b: 'rgba(56,255,161,0.3)' },
    fog:    { c: 'var(--fog)',    b: 'var(--ash)' },
    plasma: { c: 'var(--plasma)', b: 'rgba(255,46,138,0.4)' },
  };
  const t = tones[tone] || tones.ember;
  const base = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: '5px 11px',
    borderRadius: 999,
    border: `1px solid ${t.b}`,
    color: t.c,
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    ...(solid ? { background: t.c, color: 'var(--void)', borderColor: t.c } : {}),
    ...style,
  };
  return <span style={base}>
    <span style={{ width: 5, height: 5, borderRadius: 999, background: 'currentColor' }} />
    {children}
  </span>;
};

const Button = ({ children, variant = 'primary', size = 'md', onClick, style }) => {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 12 },
    md: { padding: '13px 22px', fontSize: 14 },
    lg: { padding: '16px 28px', fontSize: 15 },
  };
  const variants = {
    primary:   { background: 'var(--hot)', color: 'var(--void)', border: '1px solid var(--hot)' },
    secondary: { background: 'transparent', color: 'var(--fg)', border: '1px solid var(--smoke)' },
    ghost:     { background: 'transparent', color: 'var(--fg)', border: '1px solid transparent' },
  };
  const [hover, setHover] = React.useState(false);
  const hoverFx = {
    primary:   { boxShadow: hover ? '0 0 0 1px rgba(255,59,31,0.4), 0 0 32px rgba(255,59,31,0.45)' : 'none' },
    secondary: { borderColor: hover ? 'var(--mist)' : 'var(--smoke)' },
    ghost:     { color: hover ? 'var(--ember)' : 'var(--fg)' },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'all 200ms cubic-bezier(0.2,0.8,0.2,1)',
        ...sizes[size],
        ...variants[variant],
        ...hoverFx[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const Eyebrow = ({ children, color = 'var(--ember)', style }) => (
  <div style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color,
    ...style,
  }}>{children}</div>
);

const LogoMark = ({ size = 28 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
    <defs>
      <linearGradient id="lg-heat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFB30A"/>
        <stop offset=".45" stopColor="#FF7A1A"/>
        <stop offset="1" stopColor="#FF3B1F"/>
      </linearGradient>
    </defs>
    <path d="M50 4 C50 4,12 50,12 78 C12 98,29 114,50 114 C71 114,88 98,88 78 C88 50,50 4,50 4Z" fill="url(#lg-heat)"/>
    <ellipse cx="38" cy="72" rx="6" ry="13" fill="#0A0907" transform="rotate(-18 38 72)"/>
    <ellipse cx="62" cy="72" rx="6" ry="13" fill="#0A0907" transform="rotate(18 62 72)"/>
  </svg>
);

Object.assign(window, { Pill, Button, Eyebrow, LogoMark });
