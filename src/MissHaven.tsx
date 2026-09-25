import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const lengths = {
  quick: { label: 'Quick', note: '3–5 minutes' },
  standard: { label: 'Standard', note: '8–12 minutes' },
  deep: { label: 'Deep', note: '15–20 minutes' },
} as const

type LengthKey = keyof typeof lengths
type RulesLevel = '1' | '2' | '3'
type RecordView = 'player' | 'inspector' | 'community'

type Brief = {
  agent: string
  branch: string
  era: string
  location: string
  rulesLevel: RulesLevel
  echoWare: string
  open: string
  probe: string
  sealed: string
}

const emptyBrief: Brief = {
  agent: '', branch: '', era: '', location: '', rulesLevel: '1', echoWare: '',
  open: '', probe: '', sealed: '',
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function MissHaven() {
  const [stage, setStage] = useState<'welcome' | 'brief' | 'length' | 'account' | 'questions' | 'record'>('welcome')
  const [brief, setBrief] = useState<Brief>(emptyBrief)
  const [length, setLength] = useState<LengthKey>('standard')
  const [account, setAccount] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [view, setView] = useState<RecordView>('player')
  const [communityOptIn, setCommunityOptIn] = useState(false)

  const questions = useMemo(() => {
    const base = [
      ['mattered', 'What mattered most to you during this assignment?'],
      ['unclear', 'What still feels unclear or unresolved?'],
      ['record', 'What do you want included in the official record?'],
    ]
    const standard = [
      ['decision', 'Which decision do you think changed the Branch the most?'],
      ['relationship', 'Did any person, place, duty, or relationship inside the Branch become important to you?'],
    ]
    const deep = [
      ['unexpected', 'What happened that you did not expect?'],
      ['return', 'What, if anything, feels different now that you are back?'],
      ['next', 'If you returned to this Branch, what would you do differently?'],
    ]
    const level2 = brief.rulesLevel === '2'
      ? [['strain', 'Did the assignment end with serious Ware Strain, forced return, or a Branch Tear? What happened?']] : []
    const level3 = brief.rulesLevel === '3'
      ? [['lethal', 'Was there a Lethal-Risk Call? If so, what choice did you make after the warning?']] : []
    const readiness = brief.rulesLevel === '2'
      ? [['readiness', 'Are you ready for another assignment, or do you need recovery time first?']] : []

    if (length === 'quick') return [...base, ...level2, ...level3, ...readiness]
    if (length === 'standard') return [...base, ...standard, ...level2, ...level3, ...readiness]
    return [...base, ...standard, ...deep, ...level2, ...level3, ...readiness]
  }, [length, brief.rulesLevel])

  const playerRecord = useMemo(() => {
    const lines = [
      'TIME-CRAWL CHRONICLES — MISS HAVEN INCIDENT FILE',
      '',
      `Agent: ${brief.agent || 'Not provided'}`,
      `Branch: ${brief.branch || 'Not provided'}`,
      `Era: ${brief.era || 'Not provided'}`,
      `Location: ${brief.location || 'Not provided'}`,
      `Rules Level: ${brief.rulesLevel}`,
      `Echo Ware: ${brief.echoWare || 'Not provided'}`,
      '',
      'AGENT ACCOUNT',
      account || 'No account provided.',
      '',
      'DEBRIEF',
      ...questions.flatMap(([key, q]) => [q, answers[key] || 'Declined / no response', '']),
      'Archive status: Private Table Record',
    ]
    return lines.join('\n')
  }, [brief, account, questions, answers])

  const inspectorRecord = useMemo(() => [
    playerRecord,
    '',
    'INSPECTOR-ONLY CONTEXT',
    `OPEN: ${brief.open || 'None provided'}`,
    `PROBE: ${brief.probe || 'None provided'}`,
    `SEALED: ${brief.sealed || 'None provided'}`,
  ].join('\n'), [playerRecord, brief])

  const communityRecord = useMemo(() => [
    'TIME-CRAWL CHRONICLES — COMMUNITY ARCHIVE COPY',
    '',
    `Branch: ${brief.branch || 'Not provided'}`,
    `Era: ${brief.era || 'Not provided'}`,
    `Location: ${brief.location || 'Not provided'}`,
    `Rules Level: ${brief.rulesLevel}`,
    '',
    'ANONYMIZED AGENT ACCOUNT',
    account || 'No account provided.',
    '',
    'SELECTED DEBRIEF RESPONSES',
    ...questions.flatMap(([key, q]) => [q, answers[key] || 'Declined / no response', '']),
    'No player-identifying information or Inspector-only OPEN / PROBE / SEALED material is included.',
    'This file has NOT been uploaded anywhere.',
  ].join('\n'), [brief, account, questions, answers])

  const recordText = view === 'player' ? playerRecord : view === 'inspector' ? inspectorRecord : communityRecord

  const updateBrief = (key: keyof Brief, value: string) => setBrief((current) => ({ ...current, [key]: value }))

  return (
    <main className="haven-page">
      <div className="haven-shell">
        <div className="haven-topline">
          <Link to="/" className="text-link">← TCC home</Link>
          <span>Miss Haven V1</span>
        </div>

        {stage === 'welcome' && (
          <section className="haven-card haven-intro">
            <p className="eyebrow">Post-assignment debrief</p>
            <h1>Miss Haven</h1>
            <p className="haven-lead">Tell the record what happened in your own words. You can skip any question. Nothing in this V1 is uploaded or shared automatically.</p>
            <div className="haven-actions">
              <button className="button button-primary" onClick={() => setStage('brief')}>Begin debrief</button>
              <Link className="button button-secondary" to="/">Not now</Link>
            </div>
          </section>
        )}

        {stage === 'brief' && (
          <section className="haven-card">
            <p className="eyebrow">Inspector brief</p>
            <h2>Set the assignment context</h2>
            <p className="haven-note">The Agent-facing record never includes PROBE or SEALED material. You can leave any field blank.</p>
            <div className="haven-grid">
              <label>Agent name<input value={brief.agent} onChange={(e) => updateBrief('agent', e.target.value)} /></label>
              <label>Echo Ware<input value={brief.echoWare} onChange={(e) => updateBrief('echoWare', e.target.value)} /></label>
              <label>Branch<input value={brief.branch} onChange={(e) => updateBrief('branch', e.target.value)} /></label>
              <label>Era<input value={brief.era} onChange={(e) => updateBrief('era', e.target.value)} /></label>
              <label>Location<input value={brief.location} onChange={(e) => updateBrief('location', e.target.value)} /></label>
              <label>Rules Level<select value={brief.rulesLevel} onChange={(e) => updateBrief('rulesLevel', e.target.value)}><option value="1">Level 1</option><option value="2">Level 2</option><option value="3">Level 3</option></select></label>
            </div>
            <details className="haven-private">
              <summary>Inspector-only context: OPEN / PROBE / SEALED</summary>
              <label>OPEN<textarea value={brief.open} onChange={(e) => updateBrief('open', e.target.value)} /></label>
              <label>PROBE<textarea value={brief.probe} onChange={(e) => updateBrief('probe', e.target.value)} /></label>
              <label>SEALED<textarea value={brief.sealed} onChange={(e) => updateBrief('sealed', e.target.value)} /></label>
            </details>
            <div className="haven-actions"><button className="button button-secondary" onClick={() => setStage('welcome')}>Back</button><button className="button button-primary" onClick={() => setStage('length')}>Continue</button></div>
          </section>
        )}

        {stage === 'length' && (
          <section className="haven-card">
            <p className="eyebrow">Choose the debrief</p>
            <h2>How much time do you want?</h2>
            <div className="haven-choice-grid">
              {(Object.keys(lengths) as LengthKey[]).map((key) => <button key={key} className={`haven-choice ${length === key ? 'selected' : ''}`} onClick={() => setLength(key)}><strong>{lengths[key].label}</strong><span>{lengths[key].note}</span></button>)}
            </div>
            <div className="haven-actions"><button className="button button-secondary" onClick={() => setStage('brief')}>Back</button><button className="button button-primary" onClick={() => setStage('account')}>Continue</button></div>
          </section>
        )}

        {stage === 'account' && (
          <section className="haven-card">
            <p className="eyebrow">Agent account</p>
            <h2>Tell me what happened in your own words.</h2>
            <textarea className="haven-account" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Speak or write naturally. This is your version of events." />
            <p className="haven-note">Miss Haven does not treat your account as an objective answer key.</p>
            <div className="haven-actions"><button className="button button-secondary" onClick={() => setStage('length')}>Back</button><button className="button button-primary" onClick={() => setStage('questions')}>Continue</button></div>
          </section>
        )}

        {stage === 'questions' && (
          <section className="haven-card">
            <p className="eyebrow">Debrief</p>
            <h2>Follow-up questions</h2>
            <p className="haven-note">“I don’t know,” “I don’t remember,” and declining are all valid answers.</p>
            <div className="haven-question-list">
              {questions.map(([key, question]) => <label key={key}><span>{question}</span><textarea value={answers[key] || ''} onChange={(e) => setAnswers((current) => ({ ...current, [key]: e.target.value }))} placeholder="Answer, write ‘decline,’ or leave blank." /></label>)}
            </div>
            <div className="haven-actions"><button className="button button-secondary" onClick={() => setStage('account')}>Back</button><button className="button button-primary" onClick={() => setStage('record')}>Close the case file</button></div>
          </section>
        )}

        {stage === 'record' && (
          <section className="haven-card">
            <p className="eyebrow">Case file complete</p>
            <h2>Your record</h2>
            <div className="haven-tabs" role="tablist" aria-label="Record views">
              <button className={view === 'player' ? 'active' : ''} onClick={() => setView('player')}>Player Record</button>
              <button className={view === 'inspector' ? 'active' : ''} onClick={() => setView('inspector')}>Inspector Record</button>
              <button disabled={!communityOptIn} className={view === 'community' ? 'active' : ''} onClick={() => setView('community')}>Community Copy</button>
            </div>
            <pre className="haven-record">{recordText}</pre>
            <label className="haven-optin"><input type="checkbox" checked={communityOptIn} onChange={(e) => { setCommunityOptIn(e.target.checked); if (!e.target.checked && view === 'community') setView('player') }} /><span>Prepare an anonymized copy for possible community sharing. This does not upload anything.</span></label>
            <div className="haven-actions">
              <button className="button button-secondary" onClick={() => downloadText(`tcc-${view}-record.txt`, recordText)}>Download this record</button>
              <button className="button button-secondary" onClick={() => window.print()}>Print / Save PDF</button>
              <button className="button button-primary" onClick={() => { setBrief(emptyBrief); setAccount(''); setAnswers({}); setCommunityOptIn(false); setView('player'); setStage('welcome') }}>New debrief</button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
