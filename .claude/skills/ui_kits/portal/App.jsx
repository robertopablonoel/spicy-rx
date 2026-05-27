// Portal App — sidebar + screen

function PortalApp() {
  const [screen, setScreen] = React.useState('dashboard');

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--void)',
      color: 'var(--fg)',
      fontFamily: 'var(--font-body)',
    }}>
      <Sidebar current={screen} onNav={setScreen} />
      <main style={{ flex: 1, minWidth: 0 }}>
        {screen === 'dashboard' && <Dashboard onNav={setScreen} />}
        {screen === 'order'     && <OrderDetail />}
        {screen === 'messages'  && <Messages />}
        {(screen === 'labs' || screen === 'settings') && (
          <div style={{ padding: '120px 48px', maxWidth: 600 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)', marginBottom: 14 }}>
              ● Stub screen
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 48, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, color: 'var(--fg)',
            }}>
              {screen === 'labs' ? 'Lab history' : 'Account'}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--mist)', marginTop: 18, maxWidth: 480 }}>
              Out of scope for this UI kit. Try Dashboard, Hot Sauce, or Messages.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PortalApp />);
