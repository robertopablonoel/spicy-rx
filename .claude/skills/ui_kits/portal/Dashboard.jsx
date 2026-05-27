// Portal screens

function Dashboard({ onNav }) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1080 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)', marginBottom: 10 }}>
            ● Tuesday, 27 May 2026
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 46, letterSpacing: '-0.035em', lineHeight: 1,
            margin: 0, color: 'var(--fg)',
          }}>
            Calibrating, Elias.
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <PButton variant="secondary">Request refill</PButton>
          <PButton>Talk to clinician →</PButton>
        </div>
      </header>

      {/* Hero status card */}
      <Card glow style={{ marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <CardEyebrow>● Active prescription · Hot Sauce</CardEyebrow>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 32, letterSpacing: '-0.025em', lineHeight: 1.05,
              color: 'var(--fg)', marginBottom: 16,
            }}>
              Bottle <em style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--ember)' }}>02</em> · arriving Thursday.
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--mist)', margin: 0, maxWidth: 420 }}>
              Compounded yesterday, assayed this morning. Lot 0042, signed off by Dr. Vance. We'll text the tracking number once it ships.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <StatusChip tone="vitals">Lot 0042 · signed</StatusChip>
              <StatusChip tone="ember">Ships Wednesday</StatusChip>
              <StatusChip tone="fog">2-day expedited</StatusChip>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="120" height="240" viewBox="0 0 160 320" fill="none"
                 stroke="var(--ember)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                 style={{ filter: 'drop-shadow(0 0 20px rgba(255,122,26,0.4))' }}>
              <path d="M58 6 C58 6,60 0,80 0 C100 0,102 6,102 6 L102 22 L58 22Z"/>
              <rect x="46" y="22" width="68" height="34" rx="3"/>
              <path d="M62 56 L62 76 L98 76 L98 56"/>
              <path d="M30 76 L30 296 C30 308,38 316,50 316 L110 316 C122 316,130 308,130 296 L130 76Z" fill="rgba(255,59,31,0.08)"/>
              <rect x="42" y="130" width="76" height="92" rx="2"/>
              <text x="80" y="160" fill="var(--ember)" stroke="none" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="11" letterSpacing="0.04em">HOT SAUCE</text>
              <line x1="52" y1="184" x2="108" y2="184" strokeWidth="2.5"/>
            </svg>
          </div>
        </div>
      </Card>

      {/* Vitals strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--ash)', border: '1px solid var(--ash)', marginBottom: 28 }}>
        <div style={{ background: 'var(--crater)', padding: '24px 22px' }}><LabReadout label="Days remaining" value="14" unit="d" tone="vitals" /></div>
        <div style={{ background: 'var(--crater)', padding: '24px 22px' }}><LabReadout label="Next refill" value="Jun 10" tone="ember" /></div>
        <div style={{ background: 'var(--crater)', padding: '24px 22px' }}><LabReadout label="Assay purity" value="99.6" unit="%" tone="vitals" /></div>
        <div style={{ background: 'var(--crater)', padding: '24px 22px' }}><LabReadout label="Doses logged" value="07" tone="fg" /></div>
      </div>

      {/* Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <Card>
          <CardEyebrow color="var(--fog)">● Recent updates</CardEyebrow>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { t: 'Lot 0042 assayed at 99.6% purity', when: '4 hr ago', tone: 'vitals' },
              { t: 'Dr. Vance approved refill #2', when: 'Yesterday', tone: 'ember' },
              { t: 'Lot 0041 shipped — tracking 1Z…', when: '3 days ago', tone: 'fog' },
              { t: 'Intake reviewed · prescribed Hot Sauce', when: '2 weeks ago', tone: 'fog' },
            ].map((r, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 0',
                borderTop: i === 0 ? '1px solid var(--ash)' : 'none',
                borderBottom: '1px solid var(--ash)',
              }}>
                <StatusChip tone={r.tone}>{i === 0 ? 'NEW' : 'LOG'}</StatusChip>
                <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg)' }}>{r.t}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fog)', textTransform: 'uppercase' }}>{r.when}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardEyebrow>● Clinician · Dr. Vance</CardEyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 999, flexShrink: 0,
              background: 'var(--ultraviolet)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--bone)',
            }}>RV</div>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--fg)' }}>Rhea Vance, MD</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fog)' }}>NY-LIC-44829 · usually replies in ~6 hr</div>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--mist)', margin: '0 0 18px' }}>
            "Glad the 2 mg apomorphine is sitting well. Let's keep it at this dose through the next refill cycle and check in."
          </p>
          <PButton size="sm" variant="secondary" onClick={() => onNav('messages')}>Open thread →</PButton>
        </Card>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
