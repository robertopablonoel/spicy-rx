// Portal sidebar

function Sidebar({ current, onNav }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard',  icon: 'home' },
    { id: 'order',     label: 'Hot Sauce',  icon: 'pill' },
    { id: 'messages',  label: 'Messages',   icon: 'msg', badge: 1 },
    { id: 'labs',      label: 'Lab history', icon: 'flask' },
    { id: 'settings',  label: 'Account',    icon: 'gear' },
  ];

  const icon = (k, active) => {
    const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
                    stroke: active ? 'var(--ember)' : 'var(--fog)', strokeWidth: 1.75,
                    strokeLinecap: 'round', strokeLinejoin: 'round' };
    switch (k) {
      case 'home':  return <svg {...props}><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/></svg>;
      case 'pill':  return <svg {...props}><path d="M10.5 20.5a7 7 0 1 1 9.9-9.9l-9.9 9.9z"/><path d="M8.5 8.5l7 7"/></svg>;
      case 'msg':   return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
      case 'flask': return <svg {...props}><path d="M9 2v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 8V2"/><line x1="8" y1="2" x2="16" y2="2"/><line x1="6" y1="14" x2="18" y2="14"/></svg>;
      case 'gear':  return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
      default: return null;
    }
  };

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--cosmos)',
      borderRight: '1px solid var(--ash)',
      display: 'flex', flexDirection: 'column',
      padding: '20px 14px',
      height: '100vh',
      position: 'sticky', top: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', marginBottom: 32 }}>
        <PortalLogo size={22} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
          SPICY ALIEN
        </span>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)', padding: '0 12px', marginBottom: 12 }}>
        Patient
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => {
          const active = current === it.id;
          return (
            <button key={it.id} onClick={() => onNav(it.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px',
              background: active ? 'rgba(255,122,26,0.08)' : 'transparent',
              border: 0, borderLeft: active ? '2px solid var(--ember)' : '2px solid transparent',
              color: active ? 'var(--fg)' : 'var(--mist)',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 200ms',
            }}>
              {icon(it.icon, active)}
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge && (
                <span style={{
                  background: 'var(--hot)', color: 'var(--void)',
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                  padding: '1px 6px', borderRadius: 999,
                }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '14px 12px', borderTop: '1px solid var(--ash)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999,
            background: 'var(--grad-capsaicin)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--void)',
          }}>EM</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Elias Marsh</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fog)', letterSpacing: '0.08em' }}>PT-0042 · BROOKLYN, NY</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
