// Top navigation — fixed, hairline reveal on scroll
function Nav({ current = 'hot-sauce', onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'hot-sauce', label: 'Hot Sauce' },
    { id: 'science',   label: 'Science' },
    { id: 'clinicians', label: 'Clinicians' },
    { id: 'journal',   label: 'Journal' },
  ];

  return (
    <nav className="m-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px',
      background: scrolled ? 'rgba(10,9,7,0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--ash)' : '1px solid transparent',
      transition: 'all 240ms cubic-bezier(0.2,0.8,0.2,1)',
    }}>
      <a onClick={() => onNav('hot-sauce')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textDecoration: 'none' }}>
        <LogoMark size={26} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
          SPICY ALIEN
        </span>
      </a>

      <div className="m-nav-links" style={{ display: 'flex', gap: 32 }}>
        {links.map(l => (
          <a key={l.id}
             onClick={() => onNav(l.id)}
             style={{
               fontFamily: 'var(--font-body)',
               fontSize: 14,
               fontWeight: 500,
               color: current === l.id ? 'var(--ember)' : 'var(--mist)',
               textDecoration: 'none',
               cursor: 'pointer',
               transition: 'color 200ms',
             }}>{l.label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a className="m-nav-signin" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--mist)', cursor: 'pointer', textDecoration: 'none' }}>Sign in</a>
        <Button size="sm" onClick={() => onNav('consult')}>Start consultation →</Button>
      </div>
    </nav>
  );
}

window.Nav = Nav;
