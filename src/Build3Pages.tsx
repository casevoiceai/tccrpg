import { FormEvent, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  submitPlaytestApplication,
  submitReleaseUpdate,
  type ApiResult,
  type PlaytestApplicationPayload,
} from './api'
import { loadSession } from './session'
import './forms.css'

const interestOptions = [
  ['history', 'History'],
  ['mystery', 'Mystery'],
  ['roleplay', 'Roleplaying'],
  ['investigation', 'Investigation'],
  ['combat', 'Combat'],
  ['supernatural', 'Supernatural / horror'],
  ['research_puzzles', 'Research / puzzles'],
] as const

const experienceOptions = [
  ['experience_none', 'I have never played a tabletop RPG.'],
  ['experience_beginner', 'I have played a few times.'],
  ['experience_regular', 'I play regularly.'],
  ['experience_veteran', 'I have played for years.'],
  ['experience_gm', 'I regularly run games as a GM or DM.'],
  ['experience_professional', 'I design, review, or professionally work with tabletop games.'],
] as const

type PlaytestFormState = {
  name: string
  email: string
  generalLocation: string
  participationMode: 'in_person' | 'remote' | 'either'
  rpgExperience: string
  interests: string[]
  inspectorInterest: 'yes' | 'no' | 'maybe'
  availability: string
  accessibilityNeeds: string
  unfinishedGameAck: boolean
  directCriticismAck: boolean
  website: string
}

export function PlaytestPage() {
  const [searchParams] = useSearchParams()
  const discovery = useMemo(() => loadSession(), [])
  const roleHint = searchParams.get('role')
  const initialInspector = roleHint === 'inspector'
    ? 'yes'
    : discovery.rolePreference === 'role_inspector'
      ? 'yes'
      : discovery.rolePreference === 'role_either'
        ? 'maybe'
        : 'no'

  const [form, setForm] = useState<PlaytestFormState>({
    name: '',
    email: '',
    generalLocation: '',
    participationMode: 'either',
    rpgExperience: discovery.rpgExperience ?? 'experience_none',
    interests: [],
    inspectorInterest: initialInspector,
    availability: '',
    accessibilityNeeds: '',
    unfinishedGameAck: false,
    directCriticismAck: false,
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<ApiResult | null>(null)

  const toggleInterest = (value: string) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(value)
        ? current.interests.filter((item) => item !== value)
        : [...current.interests, value],
    }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setResult(null)

    const payload: PlaytestApplicationPayload = {
      session_id: discovery.sessionId,
      name: form.name,
      email: form.email,
      general_location: form.generalLocation,
      participation_mode: form.participationMode,
      rpg_experience: form.rpgExperience,
      interests: form.interests,
      inspector_interest: form.inspectorInterest,
      availability: form.availability,
      accessibility_needs: form.accessibilityNeeds,
      unfinished_game_ack: form.unfinishedGameAck,
      direct_criticism_ack: form.directCriticismAck,
      website: form.website,
    }

    const response = await submitPlaytestApplication(payload)
    setResult(response)
    setStatus(response.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <main className="form-page">
        <section className="form-success">
          <p className="eyebrow">Playtest application received</p>
          <h1>Thank you.</h1>
          <p>
            Applying does not guarantee a seat. Early TCC tables will be deliberately mixed by experience level so the game can be tested from several perspectives.
          </p>
          <div className="form-success-actions">
            <Link className="button button-primary" to="/experience">Replay The Missing Name</Link>
            <Link className="button button-secondary" to="/">Return home</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="form-page">
      <section className="form-intro">
        <p className="eyebrow">TCC development playtesters</p>
        <h1>Help us find where the game breaks.</h1>
        <p className="lede">
          Time-Crawl Chronicles is still under development. Early playtests are for learning whether people can understand, run, and enjoy the game without its designer explaining every step.
        </p>
        <p>No previous RPG experience is required. Direct criticism is useful.</p>
      </section>

      <form className="portal-form" onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="playtest-name">Name</label>
          <input id="playtest-name" required maxLength={120} autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </div>

        <div className="form-field">
          <label htmlFor="playtest-email">Email</label>
          <input id="playtest-email" type="email" required maxLength={254} autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <p className="field-note">Used for playtest scheduling only. This does not add you to the release mailing list.</p>
        </div>

        <div className="form-field">
          <label htmlFor="playtest-location">General location</label>
          <input id="playtest-location" required maxLength={160} placeholder="City / region is enough" value={form.generalLocation} onChange={(event) => setForm({ ...form, generalLocation: event.target.value })} />
        </div>

        <fieldset className="form-field">
          <legend>How could you participate?</legend>
          <div className="radio-stack">
            {([
              ['in_person', 'In person'],
              ['remote', 'Online / remote'],
              ['either', 'Either'],
            ] as const).map(([value, label]) => (
              <label key={value}>
                <input type="radio" name="participation" value={value} checked={form.participationMode === value} onChange={() => setForm({ ...form, participationMode: value })} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-field">
          <label htmlFor="playtest-experience">Tabletop RPG experience</label>
          <select id="playtest-experience" value={form.rpgExperience} onChange={(event) => setForm({ ...form, rpgExperience: event.target.value })}>
            {experienceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>

        <fieldset className="form-field">
          <legend>What interests you?</legend>
          <p className="field-note">Choose any that apply.</p>
          <div className="check-grid">
            {interestOptions.map(([value, label]) => (
              <label key={value}>
                <input type="checkbox" checked={form.interests.includes(value)} onChange={() => toggleInterest(value)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="form-field">
          <legend>Would you consider running TCC as the Inspector?</legend>
          <div className="radio-stack">
            {([
              ['yes', 'Yes'],
              ['maybe', 'Maybe'],
              ['no', 'No'],
            ] as const).map(([value, label]) => (
              <label key={value}>
                <input type="radio" name="inspector" value={value} checked={form.inspectorInterest === value} onChange={() => setForm({ ...form, inspectorInterest: value })} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-field">
          <label htmlFor="playtest-availability">General availability</label>
          <textarea id="playtest-availability" required maxLength={1200} rows={4} placeholder="For example: weekday evenings, Saturday afternoons, flexible online" value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value })} />
        </div>

        <div className="form-field">
          <label htmlFor="playtest-access">Anything we should know to make a session accessible? <span className="optional-label">Optional</span></label>
          <textarea id="playtest-access" maxLength={1200} rows={4} value={form.accessibilityNeeds} onChange={(event) => setForm({ ...form, accessibilityNeeds: event.target.value })} />
          <p className="field-note">Share only what you want the playtest organizer to know.</p>
        </div>

        <div className="acknowledgements">
          <label>
            <input type="checkbox" required checked={form.unfinishedGameAck} onChange={(event) => setForm({ ...form, unfinishedGameAck: event.target.checked })} />
            <span>I understand that TCC is unfinished and rules may change during development.</span>
          </label>
          <label>
            <input type="checkbox" required checked={form.directCriticismAck} onChange={(event) => setForm({ ...form, directCriticismAck: event.target.checked })} />
            <span>I am comfortable giving direct criticism about what confused me, slowed the game down, or was not fun.</span>
          </label>
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="playtest-website">Website</label>
          <input id="playtest-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
        </div>

        {status === 'error' && (
          <div className="form-error" role="alert">
            <strong>Application not sent.</strong>
            <p>{result?.message ?? 'Please try again.'}</p>
          </div>
        )}

        <button className="button button-primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Apply to playtest TCC'}
        </button>

        <p className="form-privacy-note">
          Playtest applications are separate from release updates. Submitting this form does not subscribe you to marketing email.
        </p>
      </form>
    </main>
  )
}

export function UpdatesPage() {
  const discovery = useMemo(() => loadSession(), [])
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<ApiResult | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!consent || status === 'submitting') return
    setStatus('submitting')
    setResult(null)

    const response = await submitReleaseUpdate({
      session_id: discovery.sessionId,
      email,
      consent,
      source: 'guided_demo',
      website,
    })

    setResult(response)
    setStatus(response.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <main className="form-page">
        <section className="form-success">
          <p className="eyebrow">TCC release updates</p>
          <h1>You’re on the update list.</h1>
          <p>This signup is only for TCC release and major project updates. It does not make you a playtester.</p>
          <Link className="button button-primary" to="/">Return home</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="form-page compact-form-page">
      <section className="form-intro">
        <p className="eyebrow">TCC release updates</p>
        <h1>Tell me when TCC is ready.</h1>
        <p className="lede">This is separate from the playtester application. We will use this address for TCC release and major project updates.</p>
      </section>

      <form className="portal-form compact-form" onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="updates-email">Email</label>
          <input id="updates-email" type="email" required maxLength={254} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <label className="consent-row">
          <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>I want to receive TCC release and major project updates by email.</span>
        </label>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="updates-website">Website</label>
          <input id="updates-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </div>

        {status === 'error' && (
          <div className="form-error" role="alert">
            <strong>Signup not sent.</strong>
            <p>{result?.message ?? 'Please try again.'}</p>
          </div>
        )}

        <button className="button button-primary" type="submit" disabled={!consent || status === 'submitting'}>
          {status === 'submitting' ? 'Saving…' : 'Send me TCC updates'}
        </button>
      </form>
    </main>
  )
}
