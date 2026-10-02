import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { track } from './analytics'
import './experience.css'

type Agent = {
  id: string
  name: string
  age: number
  role: string
  cue: string
  strength: number
  agility: number
  wits: number
  empathy: number
  resolve: number
  skills: Record<string, number>
  specialty: string
}

type Echo = {
  id: string
  name: string
  role: string
  strength: number
  agility: number
  access: string
  duty: string
  gear: string
  sturdyTool: boolean
}
type RollState = {
  label: string
  pool: number
  dice: number[]
  pushed: boolean
}

const AGENTS: Agent[] = [
  {
    id: 'miriam', name: 'Miriam Cole', age: 68, role: 'Retired librarian',
    cue: 'Compare what people claim with what the record actually says.',
    strength: 2, agility: 3, wits: 5, empathy: 4, resolve: 6,
    skills: { Research: 3, Observation: 2, Insight: 2, Persuasion: 1, Medicine: 1, Survival: 1 },
    specialty: 'Archival Catalogs: +1 die to Research when locating, organizing, or cross-checking cataloged records.',
  },
  {
    id: 'theo', name: 'Theo Alvarez', age: 34, role: 'Paramedic',
    cue: 'Keep people moving and deal with the immediate danger first.',
    strength: 3, agility: 4, wits: 3, empathy: 4, resolve: 5,
    skills: { Medicine: 3, Mobility: 2, Observation: 2, Insight: 1, Persuasion: 1, Force: 1 },
    specialty: 'Emergency Triage: +1 die to Medicine when assessing or stabilizing an injured person under immediate pressure.',
  },
  {
    id: 'janelle', name: 'Janelle Brooks', age: 42, role: 'Electrical maintenance technician',
    cue: 'Look for what the environment is doing and how to physically change it.',
    strength: 4, agility: 3, wits: 4, empathy: 3, resolve: 5,
    skills: { Crafting: 3, Operate: 2, Observation: 2, Force: 1, Mobility: 1, Research: 1 },
    specialty: 'Electrical Systems: +1 die to Crafting when diagnosing, repairing, or safely disabling electrical systems.',
  },
  {
    id: 'marcus', name: 'Marcus Chen', age: 29, role: 'Community reporter',
    cue: 'Ask direct questions and notice where two stories stop matching.',
    strength: 2, agility: 4, wits: 4, empathy: 4, resolve: 5,
    skills: { Persuasion: 3, Observation: 2, Research: 2, Insight: 1, Stealth: 1, Mobility: 1 },
    specialty: 'Interviewing: +1 die to Persuasion when conducting a focused interview to get a person to explain what they know.',
  },
]

const ECHOES: Echo[] = [
  { id: 'elias', name: 'Elias Turner, 37', role: 'Rail-office clerk', strength: 2, agility: 5, access: 'Office counters, workrooms, schedules, ledgers, notices, and ordinary correspondence.', duty: 'Reconcile daily paperwork.', gear: 'Ledger, pencil, keys, satchel.', sturdyTool: false },
  { id: 'nora', name: 'Nora Finch, 29', role: 'Printer / records copyist', strength: 2, agility: 5, access: 'Public notices, copied records, wording, dates, editions, and duplicated text.', duty: 'Finish copies before closing.', gear: 'Notebook, pencils, type samples, satchel.', sturdyTool: false },
  { id: 'owen', name: 'Owen Marsh, 35', role: 'Machinist / mechanic', strength: 4, agility: 3, access: 'Workshops, service areas, moving equipment, fasteners, and repair routines.', duty: 'Keep a repair on schedule.', gear: 'Wrench, hammer, oil rag, chalk.', sturdyTool: true },
  { id: 'mary', name: 'Mary Bell, 41', role: 'Shopkeeper / account clerk', strength: 3, agility: 4, access: 'Commercial rooms, invoices, prices, receipts, and local business knowledge.', duty: 'Balance accounts and receive deliveries.', gear: 'Account book, keys, pencil, small cash box.', sturdyTool: false },
  { id: 'caleb', name: 'Caleb Stone, 32', role: 'Surveyor / draftsman assistant', strength: 3, agility: 4, access: 'Mapped routes, work sites, plans, measurements, and spatial comparison.', duty: 'Return measurements and a clean sketch.', gear: 'Notebook, rule, compass, pencils.', sturdyTool: false },
  { id: 'jane', name: 'Jane Reed, 45', role: 'Boardinghouse worker / community connector', strength: 3, agility: 4, access: 'Homes, neighborhood spaces, routines, messages, and local memory.', duty: 'Keep meals, rooms, and messages moving.', gear: 'Keys, basket, household notebook.', sturdyTool: false },
  { id: 'lewis', name: 'Lewis Hart, 27', role: 'Teamster / freight worker', strength: 5, agility: 2, access: 'Loading areas, service entrances, cargo routes, deliveries, and physical access points.', duty: 'Complete a scheduled haul.', gear: 'Gloves, rope, hook, route notes.', sturdyTool: true },
  { id: 'sarah', name: 'Sarah Vale, 34', role: 'Medical / apothecary assistant', strength: 3, agility: 4, access: 'Homes, care spaces, health observations, ordinary supplies, and confidential conversation.', duty: 'Deliver supplies and check patients.', gear: 'Bandages, medicine case, notebook.', sturdyTool: false },
]
const SOURCES = [
  { id: 'A', title: 'Smithsonian National Museum of American History', claim: 'Identifies the Stourbridge Lion as the first steam locomotive to operate in the Western Hemisphere and places its Honesdale test on August 8, 1829.', prompt: 'What qualifiers narrow the “first” claim?', url: 'https://americanhistory.si.edu/collections/object/nmah_687356' },
  { id: 'B', title: 'Smithsonian National Postal Museum', claim: 'Describes the Stourbridge Lion as the first locomotive to run on tracks in America.', prompt: 'Does this make the same claim as Source A?', url: 'https://www.si.edu/object/22c-stourbridge-lion-booklet-single:npm_1989.0496.10170' },
  { id: 'C', title: 'National Park Service', claim: 'Refers to the Stourbridge Lion as America’s first steam locomotive and connects the experiment to the D&H transportation system.', prompt: 'What does its “first” wording leave unspecified?', url: 'https://www.nps.gov/upde/learn/historyculture/dhcanal.htm' },
  { id: 'D', title: 'Historic American Engineering Record', claim: 'Describes August 8, 1829 as the first successful steam-locomotive run on tracks in the United States.', prompt: 'Compare successful, steam, tracks, and United States with the other claims.', url: 'https://tile.loc.gov/storage-services/master/pnp/habshaer/pa/pa2000/pa2002/data/pa2002data.pdf' },
  { id: 'E', title: 'Wayne County Historical Society', claim: 'Says the Stourbridge Lion remained stored at Honesdale until 1849, when it was moved to the Carbondale workshops and dismantled.', prompt: 'Record exactly what moved, when, and where. Do not merge this with Source F.', url: 'https://www.waynehistorypa.com/exhibitions/permanent/stourbridge' },
  { id: 'F', title: 'Smithsonian NMAH later object history', claim: 'Says that around 1845 the boiler was sold to a nearby foundry and used as a stationary steam engine until 1871.', prompt: 'Why does this complicate a simple reading of Source E?', url: 'https://americanhistory.si.edu/collections/object/nmah_687356' },
]

const LOCKS = [
  { id: 'absolute', name: 'ABSOLUTE FIRST', help: 'Compare Sources A–D and preserve their different scopes and qualifiers.' },
  { id: 'timeline', name: 'SINGLE TIMELINE', help: 'Compare Sources E and F without forcing their conflicting later-history claims into one answer.' },
  { id: 'certainty', name: 'OFFICIAL CERTAINTY', help: 'Treat official-looking wording as a claim to test, not proof that uncertainty is settled.' },
]

const FATES = [
  'File a qualified correction inside Branch Canon.',
  'Quarantine the Master Record as a known Architect artifact.',
  'Seal it for later investigation.',
  'Use it as bait to trace the Architect.',
  'Return control of the archive to the fictional clerk.',
  'Destroy the Branch copy.',
]
function rollDice(count: number) {
  return Array.from({ length: Math.max(1, count) }, () => Math.floor(Math.random() * 6) + 1)
}

function countSuccesses(dice: number[]) {
  return dice.filter((die) => die === 6).length
}

function DicePool({ roll }: { roll: RollState }) {
  const successes = countSuccesses(roll.dice)
  return (
    <div className="roll-result">
      <strong>{roll.label} = {roll.pool}d6</strong>
      <div className="dice-pool" aria-label={`${roll.pool} six-sided dice`}>
        {roll.dice.map((value, index) => <span className={value === 6 ? 'success' : ''} key={`${value}-${index}`}>{value}</span>)}
      </div>
      <p>{successes === 0 ? 'No 6s: the action fails and the situation changes.' : `${successes} success${successes === 1 ? '' : 'es'}: the action succeeds${successes > 1 ? ` with ${successes - 1} extra success${successes === 2 ? '' : 'es'}` : ''}.`}</p>
      {roll.pushed && <p><strong>Pushed:</strong> existing 6s were kept and eligible non-6s were rerolled once.</p>}
    </div>
  )
}

function SourceGrid() {
  return (
    <div className="source-grid">
      {SOURCES.map((source) => (
        <article className="source-card" key={source.id}>
          <p className="eyebrow">Verified Source {source.id}</p>
          <h3>{source.title}</h3>
          <p>{source.claim}</p>
          <p><strong>Table prompt:</strong> {source.prompt}</p>
          <a href={source.url} target="_blank" rel="noreferrer">Open institutional source</a>
        </article>
      ))}
    </div>
  )
}
export default function SampleChroniclePage() {
  const [step, setStep] = useState(0)
  const [agentId, setAgentId] = useState('')
  const [echoId, setEchoId] = useState('')
  const [firstAction, setFirstAction] = useState('')
  const [helper, setHelper] = useState(false)
  const [firstRoll, setFirstRoll] = useState<RollState | null>(null)
  const [brokenLocks, setBrokenLocks] = useState<string[]>([])
  const [initiative, setInitiative] = useState<{ agents: number, unit: number } | null>(null)
  const [health, setHealth] = useState(5)
  const [fileUnitHealth, setFileUnitHealth] = useState(3)
  const [sourceAccess, setSourceAccess] = useState(true)
  const [clerkSafe, setClerkSafe] = useState(false)
  const [conflictRoll, setConflictRoll] = useState<RollState | null>(null)
  const [conflictAction, setConflictAction] = useState('')
  const [conflictLog, setConflictLog] = useState<string[]>([])
  const [conflictOver, setConflictOver] = useState(false)
  const [recordFate, setRecordFate] = useState('')

  const agent = useMemo(() => AGENTS.find((item) => item.id === agentId), [agentId])
  const echo = useMemo(() => ECHOES.find((item) => item.id === echoId), [echoId])

  useEffect(() => {
    track('experience_started', { sample_version: 'record-doesnt-agree-v7-1' })
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [step])

  const restart = () => {
    if (!window.confirm('Restart The Record Doesn’t Agree from the beginning?')) return
    setStep(0); setAgentId(''); setEchoId(''); setFirstAction(''); setHelper(false); setFirstRoll(null)
    setBrokenLocks([]); setInitiative(null); setHealth(5); setFileUnitHealth(3); setSourceAccess(true)
    setClerkSafe(false); setConflictRoll(null); setConflictAction(''); setConflictLog([]); setConflictOver(false); setRecordFate('')
  }
  const firstPool = useMemo(() => {
    if (!agent || !echo || !firstAction) return 0
    let pool = 0
    if (firstAction === 'research') pool = agent.wits + (agent.skills.Research ?? 0) + (agent.id === 'miriam' ? 1 : 0)
    if (firstAction === 'persuade') pool = agent.empathy + (agent.skills.Persuasion ?? 0) + (agent.id === 'marcus' ? 1 : 0)
    if (firstAction === 'block') pool = echo.strength + (agent.skills.Force ?? 0)
    if (firstAction === 'observe') pool = agent.wits + (agent.skills.Observation ?? 0)
    return pool + (helper ? 1 : 0)
  }, [agent, echo, firstAction, helper])

  const firstLabel = firstAction === 'research' ? 'Wits + Research' : firstAction === 'persuade' ? 'Empathy + Persuasion' : firstAction === 'block' ? 'Echo Strength + Force' : 'Wits + Observation'

  const makeFirstRoll = () => {
    if (!firstPool) return
    setFirstRoll({ label: firstLabel, pool: firstPool, dice: rollDice(firstPool), pushed: false })
  }

  const pushFirstRoll = () => {
    if (!firstRoll || firstRoll.pushed) return
    setFirstRoll({ ...firstRoll, dice: firstRoll.dice.map((die) => die === 6 ? die : rollDice(1)[0]), pushed: true })
  }

  const breakLock = (id: string) => {
    setBrokenLocks((current) => current.includes(id) ? current : [...current, id])
  }

  const rollInitiative = () => {
    let agents = rollDice(1)[0]
    let unit = rollDice(1)[0]
    while (agents === unit) { agents = rollDice(1)[0]; unit = rollDice(1)[0] }
    setInitiative({ agents, unit })
    if (unit > agents) {
      const threat = rollDice(5)
      const hit = countSuccesses(threat) > 0
      setConflictLog([`Moving File Unit acts first: ${threat.join(', ')}.${hit ? ' It cuts the team off from a source station.' : ' No 6s; its route fails to gain ground.'}`])
      if (hit) setSourceAccess(false)
    }
  }
  const conflictPoolFor = (action: string) => {
    if (!agent || !echo) return { pool: 0, label: '' }
    if (action === 'fight') return { pool: echo.strength + (echo.sturdyTool ? 1 : 0), label: `Echo Strength${echo.sturdyTool ? ' + sturdy work tool' : ' + improvised object'}` }
    if (action === 'block') return { pool: echo.strength + (agent.skills.Force ?? 0), label: 'Echo Strength + Force' }
    if (action === 'evidence') return { pool: agent.wits + (agent.skills.Research ?? 0) + (agent.id === 'miriam' ? 1 : 0), label: 'Wits + Research' }
    return { pool: agent.empathy + (agent.skills.Persuasion ?? 0) + (agent.id === 'marcus' ? 1 : 0), label: 'Empathy + Persuasion' }
  }

  const beginConflictAction = (action: string) => {
    const { pool, label } = conflictPoolFor(action)
    if (!pool || conflictOver) return
    setConflictAction(action)
    setConflictRoll({ label, pool, dice: rollDice(pool), pushed: false })
  }

  const pushConflict = () => {
    if (!conflictRoll || conflictRoll.pushed) return
    setConflictRoll({ ...conflictRoll, dice: conflictRoll.dice.map((die) => die === 6 ? die : rollDice(1)[0]), pushed: true })
  }

  const resolveConflictAction = () => {
    if (!conflictRoll || !conflictAction) return
    const successes = countSuccesses(conflictRoll.dice)
    let nextUnitHealth = fileUnitHealth
    let nextSourceAccess = sourceAccess
    let nextClerkSafe = clerkSafe
    let nextHealth = health
    const nextLocks = [...brokenLocks]
    const log = [...conflictLog]

    if (successes > 0 && conflictAction === 'fight') {
      const damage = 2 + Math.max(0, successes - 1)
      nextUnitHealth = Math.max(0, fileUnitHealth - damage)
      log.push(`Your attack succeeds for ${damage} damage. The Moving File Unit has ${nextUnitHealth} Health left.`)
    } else if (successes > 0 && conflictAction === 'block') {
      nextSourceAccess = true
      log.push('You brace the filing route and reopen access to the source station.')
    } else if (successes > 0 && conflictAction === 'evidence') {
      const nextLock = ['timeline', 'certainty', 'absolute'].find((id) => !nextLocks.includes(id))
      if (nextLock) nextLocks.push(nextLock)
      nextSourceAccess = true
      log.push(nextLock ? `The evidence breaks ${LOCKS.find((lock) => lock.id === nextLock)?.name}.` : 'The evidence preserves the source route and removes the construct’s leverage.')
    } else if (successes > 0 && conflictAction === 'clerk') {
      nextClerkSafe = true
      log.push('The clerk resists the false filing pressure and stays with the verified record.')
    } else {
      log.push('No 6s. The action fails; the situation changes, but no essential historical fact disappears.')
    }
    const secure = nextUnitHealth === 0 || (nextClerkSafe && nextSourceAccess && nextLocks.length >= 2)
    if (secure) {
      log.push('The Master Record and clerk are secure. Exact order no longer matters, so structured conflict ends.')
      setConflictOver(true)
    } else {
      const threat = rollDice(5)
      const threatSuccesses = countSuccesses(threat)
      if (threatSuccesses > 0) {
        if (nextSourceAccess) {
          nextSourceAccess = false
          log.push(`File Run: ${threat.join(', ')}. The unit cuts you off from a source station until somebody changes the position.`)
        } else {
          nextHealth = Math.max(0, nextHealth - 1)
          log.push(`File Run: ${threat.join(', ')}. The unit deals 1 Health. Echo Health is now ${nextHealth}.`)
        }
      } else {
        log.push(`File Run: ${threat.join(', ')}. No 6s; the construct fails to improve its position.`)
      }
    }

    setFileUnitHealth(nextUnitHealth)
    setSourceAccess(nextSourceAccess)
    setClerkSafe(nextClerkSafe)
    setHealth(nextHealth)
    setBrokenLocks(nextLocks)
    setConflictLog(log)
    setConflictRoll(null)
    setConflictAction('')
  }

  const firstRollSuccesses = firstRoll ? countSuccesses(firstRoll.dice) : 0

  return (
    <main className="experience-page sample-chronicle-page">
      <header className="experience-header story-sample-header">
        <div>
          <p className="eyebrow">Guided V7 Quick Start</p>
          <h1>The Record Doesn’t Agree</h1>
          <p className="sample-intro">A browser-guided version of the same Level 2 Ready Case used in the tabletop Quick Start.</p>
        </div>
        <div className="experience-meta"><span>V7 · Level 2</span><span>Step {step + 1} of 10</span><button className="text-button" type="button" onClick={restart}>Restart</button></div>
      </header>

      <div className="demo-frame-note"><strong>Guided table simulation.</strong> The rules, case, Agents, Echo Ware, source claims, Authority Locks, and Moving File Unit match the Quick Start. The browser offers representative actions; at a real table, you may attempt anything that makes sense in the fiction.</div>
      {agent && echo && (
        <section className="tracker-bar" aria-label="Level 2 tracker">
          <span><strong>Agent</strong>{agent.name}</span><span><strong>Echo</strong>{echo.name}</span><span><strong>Health</strong>{health}/5</span>
          <span><strong>Resolve</strong>{agent.resolve}/{agent.resolve}</span><span><strong>Echo Dissonance</strong>0/4</span><span><strong>Ware Strain</strong>0/5</span><span><strong>Branch Tear</strong>separate record</span>
        </section>
      )}

      {step === 0 && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Agency briefing</p>
          <h2>The archive is trying to turn uncertainty into authority.</h2>
          <p className="scene-copy">Inside a fictional Branch archive, a Master Record is being treated as more certain than the verified historical sources allow. A fictional clerk is under pressure to file it as the official version.</p>
          <p className="scene-copy">The verified source packet contains competing wording about the Stourbridge Lion and later-history questions that the available sources do not fully settle.</p>
          <div className="assignment-card">
            <h2>Your assignment</h2>
            <ul><li>Find what the verified sources actually support.</li><li>Stop the false Master Record from gaining authority.</li><li>Protect the clerk, source stations, and records.</li><li>Decide what happens to the fictional Master Record.</li></ul>
          </div>
          <div className="lantern-strip"><strong>Lantern safety:</strong><span>LIT — continue</span><span>RAISED — change something</span><span>OUT — step out, no penalty or explanation</span></div>
          <button className="button button-primary experience-continue" type="button" onClick={() => setStep(1)}>Choose your Agent</button>
        </section>
      )}

      {step === 1 && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Modern Agent</p><h2>Who are you before you cross time?</h2>
          <div className="character-grid">
            {AGENTS.map((item) => <button type="button" className={`character-card${agentId === item.id ? ' selected' : ''}`} onClick={() => setAgentId(item.id)} key={item.id}><strong>{item.name}</strong><span>{item.age} · {item.role}</span><p>{item.cue}</p><small>STR {item.strength} · AGI {item.agility} · WIT {item.wits} · EMP {item.empathy} · Resolve {item.resolve}</small><small>{item.specialty}</small></button>)}
          </div>
          <button className="button button-primary experience-continue" type="button" disabled={!agent} onClick={() => setStep(2)}>Choose Echo Ware</button>
        </section>
      )}
      {step === 2 && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Echo Ware</p><h2>Your mind enters a fictional historical body built for this assignment.</h2>
          <p className="scene-copy">Inside the Branch, use the Echo Ware’s Strength and Agility. Keep your Agent’s Wits, Empathy, Skills, memories, personality, and judgment. All Echo choices begin at 5 Health.</p>
          <div className="character-grid">
            {ECHOES.map((item) => <button type="button" className={`character-card${echoId === item.id ? ' selected' : ''}`} onClick={() => { setEchoId(item.id); setHealth(5) }} key={item.id}><strong>{item.name}</strong><span>{item.role} · Echo STR {item.strength} · AGI {item.agility}</span><p><strong>Access:</strong> {item.access}</p><small><strong>Duty:</strong> {item.duty}</small><small><strong>Gear:</strong> {item.gear}</small></button>)}
          </div>
          <button className="button button-primary experience-continue" type="button" disabled={!echo} onClick={() => setStep(3)}>Enter the Branch archive</button>
        </section>
      )}

      {step === 3 && agent && echo && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Scene 1 · The Master Record Is Already Wrong</p>
          <h2>The filing point is ready. The clerk looks nervous.</h2>
          <div className="master-record-grid">
            <article className="artifact-card"><div className="artifact-heading">TCC FICTION · OFFICIAL MASTER RECORD</div><p><strong>The Stourbridge Lion was the first steam locomotive in America.</strong></p><p className="quiet-note">This fictional wording deliberately removes the narrower qualifiers and scopes found across verified Sources A–D.</p></article>
            <article className="artifact-card"><div className="artifact-heading">TCC FICTION · LATER HISTORY</div><p><strong>The locomotive remained intact at Honesdale until 1849, when it was moved to Carbondale and dismantled there.</strong></p><p className="quiet-note">This fictional record forces later history into one clean sequence even though Sources E and F conflict.</p></article>
          </div>
          <p className="scene-copy"><strong>Inspector:</strong> “The verified source cards never change. The Master Record can. What do you do?”</p>
          <div className="experience-choice-list">
            <button className={`experience-choice${firstAction === 'research' ? ' selected' : ''}`} type="button" onClick={() => { setFirstAction('research'); setFirstRoll(null) }}>Compare the Master Record against the source packet. <small>Wits + Research</small></button>
            <button className={`experience-choice${firstAction === 'persuade' ? ' selected' : ''}`} type="button" onClick={() => { setFirstAction('persuade'); setFirstRoll(null) }}>Get the clerk to explain who ordered the filing. <small>Empathy + Persuasion</small></button>
            <button className={`experience-choice${firstAction === 'block' ? ' selected' : ''}`} type="button" onClick={() => { setFirstAction('block'); setFirstRoll(null) }}>Physically stop the record from reaching the filing point. <small>Echo Strength + Force</small></button>
            <button className={`experience-choice${firstAction === 'observe' ? ' selected' : ''}`} type="button" onClick={() => { setFirstAction('observe'); setFirstRoll(null) }}>Inspect the room before committing. <small>Wits + Observation</small></button>
          </div>
          <label className="helper-toggle"><input type="checkbox" checked={helper} onChange={(event) => { setHelper(event.target.checked); setFirstRoll(null) }} /> Another Agent makes a concrete contribution: +1 die.</label>
          <button className="button button-primary experience-continue" type="button" disabled={!firstAction} onClick={() => setStep(4)}>Resolve the action</button>
        </section>
      )}
      {step === 4 && agent && echo && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Core roll</p><h2>Roll only because the outcome is uncertain and matters.</h2>
          <div className="roll-breakdown"><strong>{firstLabel}</strong><span>Pool: {firstPool}d6{helper ? ' including +1 Help' : ''}</span><span>One 6 succeeds. Extra 6s improve the result.</span></div>
          {!firstRoll && <button className="button button-primary" type="button" onClick={makeFirstRoll}>Roll {firstPool}d6</button>}
          {firstRoll && <DicePool roll={firstRoll} />}
          {firstRoll && firstRollSuccesses === 0 && !firstRoll.pushed && <button className="button button-secondary" type="button" onClick={pushFirstRoll}>Push once: keep 6s, reroll eligible non-6s</button>}
          {firstRoll && (firstRollSuccesses > 0 || firstRoll.pushed) && <div className="choice-result"><p>{firstRollSuccesses > 0 ? 'The action succeeds. The Inspector describes what changed and asks what you do next.' : 'The Push still produced no 6s. The action fails, but the verified facts remain true. Failure changes position, time, access, trust, or danger instead of deleting the clue.'}</p></div>}
          <button className="button button-primary experience-continue" type="button" disabled={!firstRoll || (firstRollSuccesses === 0 && !firstRoll.pushed)} onClick={() => setStep(5)}>See how the Branch reacts</button>
        </section>
      )}

      {step === 5 && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Scene 2 · The Archive Pushes Back</p><h2>The fictional record changes. The verified sources do not.</h2>
          <p className="scene-copy">A qualifier disappears. A drawer label changes. A shelf points somewhere impossible. Three Authority Locks become visible around the false record.</p>
          <SourceGrid />
          <div className="lock-grid">
            {LOCKS.map((lock) => <article className={`lock-card${brokenLocks.includes(lock.id) ? ' broken' : ''}`} key={lock.id}><h3>{lock.name}</h3><p>{lock.help}</p><button type="button" className="button button-secondary" disabled={brokenLocks.includes(lock.id)} onClick={() => breakLock(lock.id)}>{brokenLocks.includes(lock.id) ? 'Lock broken' : 'Use the evidence against this lock'}</button></article>)}
          </div>
          <p className="scene-copy">QUALIFY, CROSS-CHECK, and HOLD OPEN are examples, not passwords. At a real table, any historically honest use of a verified source can weaken a lock when it actually undermines the false behavior.</p>
          <button className="button button-primary experience-continue" type="button" disabled={brokenLocks.length === 0} onClick={() => setStep(6)}>The archive becomes dangerous</button>
        </section>
      )}
      {step === 6 && agent && echo && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Scene 3 · The Filing Run</p><h2>The Moving File Unit tears free and runs the false filing route.</h2>
          <div className="threat-card"><strong>Moving File Unit · Rank 2 Construct</strong><span>Core Pool 5d6 · Health {fileUnitHealth}/3 · Armor 0 · Base Damage 1 Health · does not Block</span></div>
          <p className="scene-copy">The team must keep the clerk out of the final filing, keep access to verified source stations, and stop the Master Record from stabilizing. Destroying the construct is one solution, not the only one.</p>
          {!initiative && <button className="button button-primary" type="button" onClick={rollInitiative}>Roll side initiative</button>}
          {initiative && <div className="initiative-card"><strong>Side initiative</strong><span>Agents: {initiative.agents}</span><span>Moving archive: {initiative.unit}</span><span>{initiative.agents > initiative.unit ? 'Agents choose the first actor.' : 'The Moving File Unit acts first; then sides alternate.'}</span></div>}
          {initiative && !conflictOver && !conflictRoll && (
            <div className="experience-choice-list">
              <button className="experience-choice" type="button" onClick={() => beginConflictAction('fight')}>Fight it with the tool or object your Echo Ware can reach. <small>You Can Always Try: Echo Strength + tool Bonus.</small></button>
              <button className="experience-choice" type="button" onClick={() => beginConflictAction('block')}>Brace a cart or block the track. <small>Echo Strength + Force.</small></button>
              <button className="experience-choice" type="button" onClick={() => beginConflictAction('evidence')}>Use verified evidence under pressure. <small>Wits + Research.</small></button>
              <button className="experience-choice" type="button" onClick={() => beginConflictAction('clerk')}>Steady the clerk against the false filing pressure. <small>Empathy + Persuasion.</small></button>
            </div>
          )}
          {conflictRoll && <><DicePool roll={conflictRoll} /><div className="roll-actions">{countSuccesses(conflictRoll.dice) === 0 && !conflictRoll.pushed && <button className="button button-secondary" type="button" onClick={pushConflict}>Push this roll</button>}<button className="button button-primary" type="button" onClick={resolveConflictAction}>{countSuccesses(conflictRoll.dice) === 0 ? 'Accept the result and continue' : 'Apply the result'}</button></div></>}
          {initiative && <div className="conflict-status"><span>Echo Health: <strong>{health}/5</strong></span><span>Source access: <strong>{sourceAccess ? 'open' : 'cut off'}</strong></span><span>Clerk: <strong>{clerkSafe ? 'resisting the filing' : 'under pressure'}</strong></span><span>Authority Locks broken: <strong>{brokenLocks.length}/3</strong></span></div>}
          {conflictLog.length > 0 && <div className="conflict-log">{conflictLog.slice(-5).map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}</div>}
          {health === 0 && !conflictOver && <p className="quiet-note"><strong>Echo Ware is Broken.</strong> At a real table, another Agent would need to stabilize the situation or carry the immediate objective while your Echo cannot take normal physical actions.</p>}
          {conflictOver && <button className="button button-primary experience-continue" type="button" onClick={() => setStep(7)}>End structured conflict</button>}
        </section>
      )}
      {step === 7 && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Scene 4 · Decide the Record’s Fate</p><h2>The immediate threat is controlled. The fictional Master Record is in your hands.</h2>
          <p className="scene-copy">Combat solved the immediate physical problem. Evidence and player choices resolve the larger Branch problem. There is no single required ending.</p>
          <div className="experience-choice-list">
            {FATES.map((fate) => <button className={`experience-choice${recordFate === fate ? ' selected' : ''}`} type="button" key={fate} onClick={() => setRecordFate(fate)}>{fate}</button>)}
          </div>
          <button className="button button-primary experience-continue" type="button" disabled={!recordFate} onClick={() => setStep(8)}>Close the assignment</button>
        </section>
      )}

      {step === 8 && agent && echo && (
        <section className="scene-panel story-panel">
          <p className="eyebrow">Return to the present</p><h2>The active Echo Ware connection ends.</h2>
          <div className="assignment-card">
            <p><strong>Record fate:</strong> {recordFate}</p>
            <p><strong>Authority Locks broken:</strong> {brokenLocks.map((id) => LOCKS.find((lock) => lock.id === id)?.name).join(', ') || 'none'}</p>
            <p><strong>Echo Health:</strong> {health}/5</p>
            <p><strong>Echo Dissonance:</strong> 0/4. The active 0–4 track ends with Echo Ware.</p>
            <p><strong>Ware Strain:</strong> 0/5. This guided run did not invent catastrophic temporal trauma just to fill a box.</p>
            <p><strong>Branch Tear:</strong> remains a separate table-side continuity record.</p>
          </div>
          <p className="scene-copy">In Level 2, a filled Ware Strain box can be cleared only through an Inspector-approved <strong>Miss Haven Research Challenge</strong> tied to this Branch while it remains open. An ordinary debrief or ordinary rest does not clear Ware Strain.</p>
          <div className="lantern-strip"><strong>What this browser cannot reproduce:</strong><span>a human Inspector reacting to any off-script idea</span><span>three other players making independent decisions</span><span>the full social freedom of a tabletop session</span></div>
          <button className="button button-primary experience-continue" type="button" onClick={() => setStep(9)}>Finish the guided Quick Start</button>
        </section>
      )}

      {step === 9 && (
        <section className="scene-panel completion-panel">
          <p className="eyebrow">Guided Quick Start complete</p><h2>This was the same case the tabletop Quick Start uses.</h2>
          <p className="scene-copy">You chose a real Quick Start Agent and Echo Ware, used V7 dice rules, saw Help and Push, handled verified source claims, broke Authority Locks, entered structured conflict with the Moving File Unit, tracked Level 2 consequences, and chose the fictional Master Record’s fate.</p>
          <p className="scene-copy">At a real table the Inspector follows whatever the players actually try. The browser narrows the menu so it can demonstrate the procedures without pretending to replace a human GM.</p>
          <div className="completion-actions"><Link className="button button-primary" to="/playtest">Playtest TCC</Link><Link className="button button-secondary" to="/discover">Help shape TCC</Link><Link className="text-link" to="/">Return to the overview</Link></div>
        </section>
      )}
    </main>
  )
}
