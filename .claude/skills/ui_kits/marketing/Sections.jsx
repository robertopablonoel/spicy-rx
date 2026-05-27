// Sections — long-form marketing components

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Online visit',     d: 'Answer a few questions on our private intake form. Takes 3 minutes — no video calls, no waiting rooms.', meta: '~3 min' },
    { n: '02', t: 'Doctor approval',  d: 'A US-licensed clinician reviews your case within 24 hours. If approved, your script is issued the same day.', meta: '<24 hr' },
    { n: '03', t: 'Discreet delivery', d: 'Plain unmarked package, free rush shipping. Refills auto-renew (or don\'t — you decide).', meta: '2 days' },
  ];
  return (
    <section style={{ padding: '120px 40px', maxWidth: 1280, margin: '0 auto' }}>
      <Eyebrow style={{ marginBottom: 18 }}>● How it works</Eyebrow>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(40px,5.5vw,72px)', letterSpacing: '-0.035em',
        lineHeight: 1, margin: 0, color: 'var(--fg)', maxWidth: 760,
      }}>
        3 steps. <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>Zero awkwardness.</span>
      </h2>
      <div className="m-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 64 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{
            background: 'var(--crater)',
            border: '1px solid var(--ash)',
            padding: 28,
            position: 'relative',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontWeight: 500,
              fontSize: 11, letterSpacing: '0.14em', color: 'var(--ember)',
            }}>STEP {s.n}</div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 28, letterSpacing: '-0.025em', margin: '14px 0 12px',
              color: 'var(--fg)', lineHeight: 1.05,
            }}>{s.t}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--mist)', margin: 0 }}>
              {s.d}
            </p>
            <div style={{
              position: 'absolute', bottom: 20, right: 24,
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
              color: 'var(--fog)', textTransform: 'uppercase',
            }}>{s.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MoleculeRow() {
  const mols = [
    { name: 'Apomorphine', role: 'Ignites desire',
      brand: 'The spark',
      mech: 'Primes brain dopamine receptors to amplify sexual signaling.',
      path: <>
        <polygon points="60,40 80,28 100,40 100,64 80,76 60,64"/>
        <polygon points="100,40 120,28 140,40 140,64 120,76 100,64"/>
        <polygon points="140,40 160,52 140,64"/>
        <line x1="80" y1="28" x2="80" y2="12"/><circle cx="80" cy="8" r="4"/>
        <line x1="120" y1="76" x2="120" y2="96"/><circle cx="120" cy="102" r="6"/>
      </> },
    { name: 'Vardenafil',  role: 'Rapid onset',
      brand: 'The lift',
      mech: 'Fast-acting PDE5 inhibitor — peak in 10–15 minutes.',
      path: <>
        <polygon points="50,40 70,28 90,40 90,64 70,76 50,64"/>
        <polygon points="90,40 110,28 130,40 130,64 110,76 90,64"/>
        <line x1="130" y1="52" x2="150" y2="52"/><circle cx="156" cy="52" r="6"/>
        <line x1="70" y1="76" x2="70" y2="96"/><circle cx="70" cy="102" r="6"/>
      </> },
    { name: 'Sildenafil',  role: 'Peak strength',
      brand: 'The push',
      mech: 'The most potent PDE5 inhibitor for maximum rigidity.',
      path: <>
        <polygon points="40,40 60,28 80,40 80,64 60,76 40,64"/>
        <polygon points="80,40 100,28 120,40 120,64 100,76 80,64"/>
        <polygon points="120,40 140,28 160,40 160,64 140,76 120,64"/>
        <line x1="44" y1="44" x2="44" y2="60"/>
        <line x1="84" y1="44" x2="84" y2="60"/>
        <line x1="124" y1="44" x2="124" y2="60"/>
        <line x1="100" y1="76" x2="100" y2="96"/><circle cx="100" cy="102" r="6"/>
      </> },
    { name: 'Tadalafil',   role: 'Lasts 36 hours',
      brand: 'The window',
      mech: '17.5-hour half-life — one dose covers the whole weekend.',
      path: <>
        <polygon points="30,52 50,40 70,52 70,76 50,88 30,76"/>
        <polygon points="70,52 90,40 110,52 110,76 90,88 70,76"/>
        <polygon points="130,40 150,28 170,40 170,64 150,76 130,64"/>
        <line x1="50" y1="88" x2="50" y2="106"/><circle cx="50" cy="112" r="6"/>
      </> },
  ];
  return (
    <section style={{ padding: '120px 40px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>● The 4-in-1 breakthrough</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(40px,5.5vw,72px)', letterSpacing: '-0.035em',
            lineHeight: 1, margin: 0, color: 'var(--fg)',
          }}>
            One solution.<br/>
            <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>
              Four powerful ingredients.
            </span>
          </h2>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--mist)', maxWidth: 360, margin: 0 }}>
          The active ingredients in Viagra, Cialis, and Levitra — engineered to onset fast, hit peak strength, and last the whole weekend. Plus apomorphine for the half no one else covers.
        </p>
      </div>
      <div className="m-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--ash)', border: '1px solid var(--ash)' }}>
        {mols.map(m => (
          <div key={m.name} style={{ background: 'var(--cosmos)', padding: '32px 26px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ember)' }}>
              {m.brand}
            </div>
            <svg width="100%" height="80" viewBox="0 0 200 120" fill="none"
                 stroke="var(--ember)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                 style={{ marginTop: 14 }}>
              {m.path}
            </svg>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, letterSpacing: '-0.025em', color: 'var(--fg)', marginTop: 20, lineHeight: 1 }}>
              {m.role}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fog)', marginTop: 8 }}>
              {m.name}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--mist)', marginTop: 18, lineHeight: 1.5 }}>
              {m.mech}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section style={{
      padding: '120px 40px',
      background: 'var(--grad-capsaicin)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Eyebrow color="rgba(10,9,7,0.7)" style={{ marginBottom: 24 }}>● Hospital-grade power. Direct to your door.</Eyebrow>
        <blockquote style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(40px,6vw,84px)', letterSpacing: '-0.04em',
          lineHeight: 0.98, color: 'var(--void)', margin: 0,
          textWrap: 'balance',
        }}>
          The power of four meds.<br/>
          <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400 }}>
            One sublingual drop.
          </span><br/>
          No clinic. No pharmacy line.
        </blockquote>
      </div>
    </section>
  );
}

// Comparison — Old way vs Spicy Alien way
function Comparison() {
  const rows = [
    { label: 'Onset time',         pills: '45–60 min', us: '~15 min',         winner: 'us' },
    { label: 'Effective duration', pills: '4–6 hr',     us: 'up to 36 hr',     winner: 'us' },
    { label: 'Works on desire',    pills: 'No',         us: 'Yes — apomorphine', winner: 'us' },
    { label: 'Blocked by a heavy meal', pills: 'Often', us: 'No — sublingual',  winner: 'us' },
    { label: 'Clinic visit required',   pills: 'Often', us: 'No',               winner: 'us' },
    { label: 'Cost vs. retail',     pills: '$$$$',      us: '~36% lower',       winner: 'us' },
  ];
  return (
    <section style={{ padding: '120px 40px', maxWidth: 1280, margin: '0 auto' }}>
      <Eyebrow style={{ marginBottom: 18 }}>● The Spicy Alien advantage</Eyebrow>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(40px,5.5vw,72px)', letterSpacing: '-0.035em',
        lineHeight: 1, margin: 0, color: 'var(--fg)', marginBottom: 12,
      }}>
        Old pills vs. <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>Hot Sauce.</span>
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.5, color: 'var(--mist)', maxWidth: 580, marginBottom: 56 }}>
        See how the 4-in-1 sublingual stacks up against the single-molecule pill you've been waiting an hour for.
      </p>
      <div className="m-grid-cmp" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 0, border: '1px solid var(--ash)' }}>
        <div className="m-cmp-row-text" style={{ padding: '18px 22px', background: 'var(--cosmos)', borderBottom: '1px solid var(--ash)' }}/>
        <div className="m-cmp-old m-cmp-cell" style={{ padding: '18px 22px', background: 'var(--cosmos)', borderBottom: '1px solid var(--ash)', borderLeft: '1px solid var(--ash)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)' }}>The old way</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--mist)', marginTop: 4 }}>Single pill</div>
        </div>
        <div className="m-cmp-cell" style={{ padding: '18px 22px', background: 'rgba(255,59,31,0.06)', borderBottom: '1px solid var(--border-hot)', borderLeft: '1px solid var(--border-hot)', borderTop: '1px solid var(--border-hot)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hot)' }}>● Hot Sauce 4-in-1</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--fg)', marginTop: 4 }}>Sublingual stack</div>
        </div>
        {rows.map((r, i) => (
          <React.Fragment key={r.label}>
            <div className="m-cmp-row-text" style={{ padding: '20px 22px', background: 'var(--cosmos)', borderTop: '1px solid var(--ash)', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg)' }}>{r.label}</div>
            <div className="m-cmp-old m-cmp-cell" style={{ padding: '20px 22px', background: 'var(--cosmos)', borderTop: '1px solid var(--ash)', borderLeft: '1px solid var(--ash)', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fog)' }}>{r.pills}</div>
            <div className="m-cmp-cell" style={{ padding: '20px 22px', background: 'rgba(255,59,31,0.06)', borderTop: '1px solid var(--border-hot)', borderLeft: '1px solid var(--border-hot)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>
              <span style={{ color: 'var(--hot)', marginRight: 8, fontFamily: 'var(--font-mono)' }}>✓</span>{r.us}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// Testimonials — small, mono framing
function Testimonials() {
  const reviews = [
    { name: 'Ethan H.', city: 'Austin, TX',     title: 'The desire piece is the difference', body: '"I\'ve been on sildenafil for years. The apomorphine is the part I didn\'t know I was missing — it\'s the actual want, not just the mechanics."' },
    { name: 'Doug R.',  city: 'Brooklyn, NY',   title: '15 minutes is real', body: '"Skeptical the timing claim was marketing. It isn\'t. Sublingual hits in the time it takes to pour a glass of wine."' },
    { name: 'Amir R.',  city: 'San Diego, CA',  title: 'Worth not waiting an hour', body: '"The 36-hour window means I stopped scheduling around a pill. One drop on Friday and I\'m good through Sunday brunch."' },
    { name: 'Frank N.', city: 'Chicago, IL',    title: 'Direct, professional, discreet', body: '"Intake took three minutes, doctor reviewed the same day, package arrived in plain wrap. No pharmacy line, no awkwardness."' },
  ];
  return (
    <section style={{ padding: '120px 40px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>● Verified patient reviews</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(40px,5.5vw,72px)', letterSpacing: '-0.035em',
            lineHeight: 1, margin: 0, color: 'var(--fg)',
          }}>
            What patients say.
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1 }}>
              4.6<span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fog)', letterSpacing: '0.1em' }}>/5</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fog)', marginTop: 6 }}>2,481 verified reviews</div>
          </div>
        </div>
      </div>
      <div className="m-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {reviews.map(r => (
          <div key={r.name} style={{ background: 'var(--crater)', border: '1px solid var(--ash)', padding: 22 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--serum)', letterSpacing: '0.18em' }}>★ ★ ★ ★ ★</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18,
              letterSpacing: '-0.02em', color: 'var(--fg)', marginTop: 16, lineHeight: 1.1,
            }}>{r.title}</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--mist)', margin: '14px 0 22px' }}>{r.body}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--ash)' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: 'var(--grad-capsaicin)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: 'var(--void)',
              }}>{r.name.split(' ').map(s => s[0]).join('')}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fog)', textTransform: 'uppercase' }}>{r.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: 'How is Hot Sauce different from Viagra or Cialis?', a: 'Hot Sauce combines the active ingredients in Viagra (sildenafil), Cialis (tadalafil), and Levitra (vardenafil) into a single sublingual dose — plus apomorphine, which targets desire through dopamine pathways the PDE5 class can\'t touch. You get faster onset, peak strength, a longer window, and the desire piece, all in one drop.' },
    { q: 'How fast does it work?', a: 'About 15 minutes. Hot Sauce is absorbed under your tongue and goes directly into your bloodstream — it doesn\'t need to be digested. Traditional pills typically take 45–60 minutes, often longer with a heavy meal.' },
    { q: 'How long does it last?', a: 'Up to 36 hours. Tadalafil has a 17.5-hour half-life, so one dose carries you through the weekend. You stay responsive — not perpetually erect.' },
    { q: 'Do I need a prescription?', a: 'Yes. Hot Sauce is a prescription medication, available only after a US-licensed clinician reviews your medical history. The intake is private and takes about 3 minutes.' },
    { q: 'Is the packaging discreet?', a: 'Plain unmarked outer package. No "Spicy Alien" return address. The brand only appears on the bottle inside.' },
    { q: 'Who shouldn\'t take Hot Sauce?', a: 'Anyone taking nitrates, alpha-blockers, or with significant cardiovascular disease should not use Hot Sauce. The intake screens for these and the prescribing clinician confirms before approving your script.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: '120px 40px', maxWidth: 1080, margin: '0 auto' }}>
      <Eyebrow style={{ marginBottom: 18 }}>● Frequently asked</Eyebrow>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(40px,5.5vw,68px)', letterSpacing: '-0.035em',
        lineHeight: 1, margin: '0 0 56px', color: 'var(--fg)',
      }}>
        Your questions, <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>answered.</span>
      </h2>
      <div style={{ borderTop: '1px solid var(--ash)' }}>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--ash)' }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '24px 0',
                background: 'transparent', border: 0, cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 24,
              }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 22, letterSpacing: '-0.02em', color: 'var(--fg)',
              }}>{f.q}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 18,
                color: open === i ? 'var(--ember)' : 'var(--fog)',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 200ms cubic-bezier(0.2,0.8,0.2,1), color 200ms',
                display: 'inline-block',
              }}>+</span>
            </button>
            {open === i && (
              <div style={{
                paddingBottom: 28,
                fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.55,
                color: 'var(--mist)', maxWidth: 760,
              }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--cosmos)',
      borderTop: '1px solid var(--ash)',
      padding: '64px 40px 32px',
    }}>
      <div className="m-footer" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <LogoMark size={28} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
              SPICY ALIEN
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--fog)', maxWidth: 380, margin: 0 }}>
            Compounded medications, prescribed only after a licensed-clinician review.
            Not for use in patients taking nitrates. Side effects may include headache,
            flushing, and dyspepsia.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
            <Pill tone="ember">Rx ONLY</Pill>
            <Pill tone="fog">LegitScript verified</Pill>
          </div>
        </div>
        <FCol title="Product" links={['Hot Sauce', 'Science', 'How it works', 'Pricing']} />
        <FCol title="Company" links={['About', 'Clinicians', 'Journal', 'Press']} />
        <FCol title="Legal" links={['Terms', 'Privacy', 'HIPAA notice', 'Full safety info']} />
      </div>
      <div className="m-footer-meta" style={{
        maxWidth: 1280, margin: '48px auto 0',
        paddingTop: 24,
        borderTop: '1px solid var(--ash)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fog)',
      }}>
        <span>© 2025 SPICY ALIEN INC.</span>
        <span>BATCH 0042 · LICENSED IN 48 STATES</span>
      </div>
    </footer>
  );
}

const FCol = ({ title, links }) => (
  <div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ember)', marginBottom: 18 }}>{title}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {links.map(l => (
        <a key={l} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--mist)', textDecoration: 'none', cursor: 'pointer' }}>{l}</a>
      ))}
    </div>
  </div>
);

Object.assign(window, { HowItWorks, MoleculeRow, PullQuote, Comparison, Testimonials, FAQ, Footer });
