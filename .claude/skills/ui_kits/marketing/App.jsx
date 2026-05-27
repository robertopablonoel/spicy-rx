// =====================================================
// Marketing site App — composes screens & handles routing.
// =====================================================

function HomeScreen({ onCta }) {
  return (
    <>
      <Hero onCta={onCta} />
      <MoleculeRow />
      <Comparison />
      <HowItWorks />
      <PullQuote />
      <Testimonials />
      <FAQ />
    </>
  );
}

function ScienceScreen() {
  return (
    <section style={{ padding: '140px 40px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <Eyebrow style={{ marginBottom: 22 }}>● The science</Eyebrow>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(56px,7vw,96px)', letterSpacing: '-0.04em',
        lineHeight: 0.95, margin: 0, color: 'var(--fg)',
      }}>
        Sublingual changes<br/>
        <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>everything.</span>
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 19, lineHeight: 1.5,
        color: 'var(--mist)', maxWidth: 720, marginTop: 28,
      }}>
        Oral PDE5 inhibitors pass through the liver before they reach circulation. We avoid that. Hot Sauce is absorbed through capillaries under the tongue, hitting plasma in 10–15 minutes at roughly half the systemic dose of the oral equivalent.
      </p>

      <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--ash)', border: '1px solid var(--ash)' }}>
        <StatBlock big="~15" unit="min" label="Onset to peak" body="Sublingual absorption skips hepatic first-pass. Measured Tmax: 12–18 minutes vs 45–75 for oral sildenafil." />
        <StatBlock big="~50" unit="%" label="Effective dose vs oral" body="Bypassing liver metabolism roughly halves the systemic dose needed for equivalent plasma concentration." />
        <StatBlock big="36" unit="hr" label="Window of effect" body="Tadalafil's 17.5-hr half-life carries the tail. The window is real — not the same as duration of action." />
        <StatBlock big="2.0" unit="mg" label="Apomorphine — desire" body="Sub-emetic dose hits central D2/D1 pathways. Recruits the CNS arc the PDE5 class cannot." />
      </div>

      <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>● Sourcing</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 40, letterSpacing: '-0.03em', lineHeight: 1.05,
            margin: 0, color: 'var(--fg)',
          }}>503A-compounded. Third-party assayed. Lot-traced.</h2>
        </div>
        <div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--mist)' }}>
            <li style={{ paddingBottom: 18, borderBottom: '1px solid var(--ash)' }}>USP-grade API from FDA-registered manufacturers.</li>
            <li style={{ padding: '18px 0', borderBottom: '1px solid var(--ash)' }}>Compounded in a 503A pharmacy under state board oversight.</li>
            <li style={{ padding: '18px 0', borderBottom: '1px solid var(--ash)' }}>Every batch assayed by an independent ISO-17025 lab. COAs on request.</li>
            <li style={{ padding: '18px 0 0' }}>Lot number on every bottle ties back to assay results in your account.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const StatBlock = ({ big, unit, label, body }) => (
  <div style={{ background: 'var(--cosmos)', padding: '36px 32px', minHeight: 220 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 96, letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--ember)' }}>{big}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.12em', color: 'var(--ember)', textTransform: 'uppercase' }}>{unit}</span>
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)', marginTop: 14 }}>{label}</div>
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--mist)', marginTop: 14, marginBottom: 0 }}>{body}</p>
  </div>
);

function ConsultScreen({ onContinue }) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({ age: '', nitrates: null, history: null });

  const steps = [
    {
      title: 'Are you over 18?',
      sub: 'Hot Sauce is prescribed in 48 states for patients 18+.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
          <input
            value={answers.age}
            onChange={e => setAnswers({ ...answers, age: e.target.value })}
            placeholder="MM / DD / YYYY"
            style={inputStyle}
          />
        </div>
      ),
      canContinue: () => answers.age.length >= 8,
    },
    {
      title: 'Are you taking nitrates or alpha-blockers?',
      sub: 'Combining PDE5 inhibitors with nitrates can cause dangerous drops in blood pressure. We screen carefully.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
          {['No, neither', 'Yes — nitrates', 'Yes — alpha-blockers', "I'm not sure"].map(opt => (
            <button key={opt}
              onClick={() => setAnswers({ ...answers, nitrates: opt })}
              style={{
                ...radioStyle,
                background: answers.nitrates === opt ? 'rgba(255,59,31,0.06)' : 'transparent',
                borderColor: answers.nitrates === opt ? 'var(--hot)' : 'var(--ash)',
                color: answers.nitrates === opt ? 'var(--fg)' : 'var(--mist)',
              }}>
              <span style={{
                width: 16, height: 16, borderRadius: 999,
                border: '1.5px solid ' + (answers.nitrates === opt ? 'var(--hot)' : 'var(--smoke)'),
                position: 'relative',
              }}>
                {answers.nitrates === opt && (
                  <span style={{ position: 'absolute', inset: 3, borderRadius: 999, background: 'var(--hot)' }}/>
                )}
              </span>
              {opt}
            </button>
          ))}
        </div>
      ),
      canContinue: () => !!answers.nitrates,
    },
    {
      title: 'Any history of heart disease or stroke?',
      sub: 'Your clinician needs to know. We won\'t prescribe if it isn\'t safe — full stop.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
          {['No history', 'Mild / managed', 'Significant — I\'ll discuss with the clinician'].map(opt => (
            <button key={opt}
              onClick={() => setAnswers({ ...answers, history: opt })}
              style={{
                ...radioStyle,
                background: answers.history === opt ? 'rgba(255,59,31,0.06)' : 'transparent',
                borderColor: answers.history === opt ? 'var(--hot)' : 'var(--ash)',
                color: answers.history === opt ? 'var(--fg)' : 'var(--mist)',
              }}>
              <span style={{
                width: 16, height: 16, borderRadius: 999,
                border: '1.5px solid ' + (answers.history === opt ? 'var(--hot)' : 'var(--smoke)'),
                position: 'relative',
              }}>
                {answers.history === opt && (
                  <span style={{ position: 'absolute', inset: 3, borderRadius: 999, background: 'var(--hot)' }}/>
                )}
              </span>
              {opt}
            </button>
          ))}
        </div>
      ),
      canContinue: () => !!answers.history,
    },
  ];
  const s = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <section style={{ padding: '140px 40px 80px', maxWidth: 920, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56 }}>
        <Eyebrow>● Consultation · Step {step + 1} of {steps.length}</Eyebrow>
        <div style={{ display: 'flex', gap: 6 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 40, height: 3,
              background: i <= step ? 'var(--hot)' : 'var(--ash)',
              transition: 'background 240ms',
            }}/>
          ))}
        </div>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(40px,5.5vw,68px)', letterSpacing: '-0.035em',
        lineHeight: 1, margin: '0 0 16px', color: 'var(--fg)',
      }}>{s.title}</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.55, color: 'var(--mist)', margin: '0 0 40px', maxWidth: 580 }}>
        {s.sub}
      </p>

      {s.content}

      <div style={{ display: 'flex', gap: 12, marginTop: 56, alignItems: 'center' }}>
        <Button
          size="lg"
          onClick={() => isLast ? onContinue() : setStep(step + 1)}
          style={{ opacity: s.canContinue() ? 1 : 0.4, pointerEvents: s.canContinue() ? 'auto' : 'none' }}>
          {isLast ? 'Submit for review →' : 'Continue →'}
        </Button>
        {step > 0 && <Button variant="ghost" size="lg" onClick={() => setStep(step - 1)}>← Back</Button>}
      </div>
    </section>
  );
}

const inputStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 17,
  color: 'var(--fg)',
  background: 'transparent',
  border: '1px solid var(--ash)',
  borderBottom: '1.5px solid var(--smoke)',
  padding: '14px 16px',
  borderRadius: 4,
  outline: 'none',
};

const radioStyle = {
  display: 'flex', alignItems: 'center', gap: 12,
  fontFamily: 'var(--font-body)', fontSize: 16,
  padding: '16px 18px',
  border: '1px solid var(--ash)',
  borderRadius: 4,
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 200ms cubic-bezier(0.2,0.8,0.2,1)',
};

function App() {
  const [screen, setScreen] = React.useState('hot-sauce');

  // Scroll to top on screen change
  React.useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  return (
    <>
      <Nav current={screen} onNav={setScreen} />
      <main>
        {screen === 'hot-sauce' && <HomeScreen onCta={() => setScreen('consult')} />}
        {screen === 'science'   && <ScienceScreen />}
        {screen === 'consult'   && <ConsultScreen onContinue={() => alert('Submitted — a clinician will review within 24 hours.')} />}
        {(screen === 'clinicians' || screen === 'journal') && (
          <section style={{ padding: '200px 40px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <Eyebrow style={{ marginBottom: 18 }}>● Stub</Eyebrow>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 64, letterSpacing: '-0.04em',
              lineHeight: 0.95, margin: 0, color: 'var(--fg)',
            }}>
              {screen === 'clinicians' ? 'For clinicians' : 'Journal'}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--mist)', marginTop: 22 }}>
              Out of scope for this UI kit. Click another nav item.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
