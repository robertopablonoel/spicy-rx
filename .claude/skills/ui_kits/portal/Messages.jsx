// Clinician messaging thread

function Messages() {
  const [draft, setDraft] = React.useState('');
  const [thread, setThread] = React.useState([
    { from: 'clinician', text: 'Hey Elias — your intake came through. Looks straightforward. Anything you want to flag before I sign the script?', when: '14 days ago' },
    { from: 'patient',   text: 'Nothing on the meds side. Quick question — does the apomorphine cause any nausea at this dose?', when: '14 days ago' },
    { from: 'clinician', text: 'At 2 mg sublingual, almost never. The receptor saturation curve is sub-emetic. If you do feel anything, it lasts <10 min and we can drop to 1 mg.', when: '14 days ago' },
    { from: 'patient',   text: 'Got it. Approved for the standard stack then.', when: '13 days ago' },
    { from: 'clinician', text: 'Script signed. Lot 0041 is on its way. Log how the first few doses feel and message me before the refill.', when: '13 days ago' },
    { from: 'patient',   text: 'First dose was sharp at ~12 min. Good window. No headache, no flushing.', when: '7 days ago' },
    { from: 'clinician', text: "Glad the 2 mg apomorphine is sitting well. Let's keep it at this dose through the next refill cycle and check in.", when: '2 hr ago' },
  ]);

  const send = () => {
    if (!draft.trim()) return;
    setThread([...thread, { from: 'patient', text: draft, when: 'just now' }]);
    setDraft('');
  };

  return (
    <div style={{ padding: '40px 48px', maxWidth: 880, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ paddingBottom: 28, borderBottom: '1px solid var(--ash)', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999,
            background: 'var(--ultraviolet)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--bone)',
          }}>RV</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--fg)' }}>Dr. Rhea Vance</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fog)' }}>● Online · usually replies in ~6 hr</div>
          </div>
        </div>
        <StatusChip tone="vitals">HIPAA encrypted</StatusChip>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 28 }}>
        {thread.map((m, i) => {
          const mine = m.from === 'patient';
          return (
            <div key={i} style={{
              alignSelf: mine ? 'flex-end' : 'flex-start',
              maxWidth: '76%',
              display: 'flex', flexDirection: 'column',
              alignItems: mine ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                background: mine ? 'var(--hot)' : 'var(--crater)',
                color: mine ? 'var(--void)' : 'var(--fg)',
                border: mine ? '1px solid var(--hot)' : '1px solid var(--ash)',
                padding: '12px 16px',
                fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5,
                borderRadius: 0,
                fontWeight: mine ? 500 : 400,
              }}>{m.text}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fog)', marginTop: 5 }}>
                {mine ? 'YOU' : 'DR. VANCE'} · {m.when}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: '1px solid var(--ash)', paddingTop: 18, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          rows={2}
          placeholder="Message Dr. Vance · this is encrypted"
          style={{
            flex: 1,
            fontFamily: 'var(--font-body)', fontSize: 15,
            color: 'var(--fg)', background: 'var(--cosmos)',
            border: '1px solid var(--ash)',
            padding: '12px 14px',
            borderRadius: 4,
            resize: 'none', outline: 'none',
          }}/>
        <PButton onClick={send}>Send →</PButton>
      </div>
    </div>
  );
}

window.Messages = Messages;
