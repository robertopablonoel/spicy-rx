// Order detail screen — lot card with assay readouts + shipment timeline

function OrderDetail() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1080 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)', marginBottom: 10 }}>
        ● Active prescription
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 46, letterSpacing: '-0.035em', lineHeight: 1,
        margin: '0 0 32px', color: 'var(--fg)',
      }}>
        Hot Sauce <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>· 30 ml</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <CardEyebrow>● Lot 0042 · compounded 26 May</CardEyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <LabReadout label="Sildenafil" value="25" unit="mg/ml" />
            <LabReadout label="Tadalafil"  value="5"  unit="mg/ml" />
            <LabReadout label="Vardenafil" value="5"  unit="mg/ml" />
            <LabReadout label="Apomorphine" value="2" unit="mg/ml" />
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--ash)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)' }}>Assay purity · independent lab</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--vitals)', fontWeight: 600, marginTop: 4 }}>99.6% &nbsp; <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fog)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ISO-17025 · COA-22a</span></div>
            </div>
            <PButton variant="secondary" size="sm">View COA</PButton>
          </div>
        </Card>

        <Card>
          <CardEyebrow color="var(--vitals)">● Shipment · 1Z999AA10123456784</CardEyebrow>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
            {[
              { t: 'Order received', d: 'Mon, 26 May · 09:14', done: true },
              { t: 'Compounded + labeled', d: 'Mon, 26 May · 14:02', done: true },
              { t: 'Assay passed', d: 'Tue, 27 May · 08:30', done: true, hot: true },
              { t: 'Picked up by carrier', d: 'expected Wed', done: false },
              { t: 'Out for delivery', d: 'expected Thu', done: false },
            ].map((s, i, arr) => (
              <li key={i} style={{ display: 'flex', gap: 14, padding: '6px 0', position: 'relative' }}>
                <div style={{ position: 'relative', width: 14, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 999,
                    background: s.done ? (s.hot ? 'var(--ember)' : 'var(--vitals)') : 'transparent',
                    border: s.done ? 'none' : '1.5px solid var(--smoke)',
                    marginTop: 6,
                    boxShadow: s.hot ? '0 0 12px rgba(255,122,26,0.6)' : 'none',
                  }}/>
                  {i < arr.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 18, bottom: -10, width: 1.5,
                      background: s.done && arr[i+1].done ? 'var(--vitals)' : 'var(--ash)',
                    }}/>
                  )}
                </div>
                <div style={{ paddingBottom: 18, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: s.done ? 'var(--fg)' : 'var(--fog)' }}>{s.t}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fog)', marginTop: 2 }}>{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card>
        <CardEyebrow color="var(--fog)">● Dosing log · last 14 days</CardEyebrow>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 80 }}>
          {[0,1,0,2,0,0,1,0,0,1,0,2,0,1].map((v, i) => (
            <div key={i} style={{
              flex: 1,
              height: v === 0 ? 4 : v === 1 ? 32 : 64,
              background: v === 0 ? 'var(--ash)' : v === 1 ? 'var(--ember)' : 'var(--hot)',
              borderRadius: 0,
            }}/>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fog)' }}>
          <span>14 days ago</span>
          <span>today</span>
        </div>
      </Card>
    </div>
  );
}

window.OrderDetail = OrderDetail;
