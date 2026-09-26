import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { discoveryQuestions, type QuestionId } from './content'
import { track } from './analytics'
import {
  buildProfile,
  createEmptySession,
  loadSession,
  resetSession,
  saveSession,
  type DiscoverySession,
} from './session'

type AccessibilitySettings = {
  largeText: boolean
  highContrast: boolean
  reduceMotion: boolean
}

const ACCESSIBILITY_KEY = 'tcc_portal_accessibility_v1'

function loadAccessibility(): AccessibilitySettings {
  const defaults: AccessibilitySettings = {
    largeText: false,
    highContrast: false,
    reduceMotion: false,
  }

  if (typeof window === 'undefined') return defaults

  try {
    return {
      ...defaults,
      ...JSON.parse(window.localStorage.getItem(ACCESSIBILITY_KEY) ?? '{}'),
    }
  } catch {
    return defaults
  }
}

function SiteHeader({
  settings,
  onSettingsChange,
}: {
  settings: AccessibilitySettings
  onSettingsChange: (next: AccessibilitySettings) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Time-Crawl Chronicles home">
        <span className="brand-mark" aria-hidden="true">TCC</span>
        <span className="brand-copy">
          <strong>Time-Crawl Chronicles</strong>
          <span>Reviewer + Playtest Portal</span>
        </span>
      </Link>

      <div className="accessibility-wrap">
        <button
          className="utility-button"
          type="button"
          aria-expanded={open}
          aria-controls="accessibility-panel"
          onClick={() => setOpen((value) => !value)}
        >
          Accessibility
        </button>

        {open && (
          <div className="accessibility-panel" id="accessibility-panel">
            <label>
              <input
                type="checkbox"
                checked={settings.largeText}
                onChange={(event) =>
                  onSettingsChange({ ...settings, largeText: event.target.checked })
                }
              />
              Larger text
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(event) =>
                  onSettingsChange({ ...settings, highContrast: event.target.checked })
                }
              />
              Higher contrast
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.reduceMotion}
                onChange={(event) =>
                  onSettingsChange({ ...settings, reduceMotion: event.target.checked })
                }
              />
              Reduce motion
            </label>
          </div>
        )}
      </div>
    </header>
  )
}

function OrientationPage() {
  useEffect(() => {
    track('orientation_started')
  }, [])

  const markComplete = () => {
    const session = loadSession()
    saveSession({ ...session, level1Completed: true, level2Started: true })
    track('orientation_completed')
  }

  return (
    <main className="orientation-page">
      <section className="orientation-hero" aria-labelledby="hero-heading">
        <p className="eyebrow">Time-Crawl Chronicles</p>
        <h1 id="hero-heading">History happened once. The Branch remembers differently.</h1>
        <p className="lede">
          Time-Crawl Chronicles is a tabletop roleplaying game where real local history becomes the setting for investigation, supernatural conflict, and adventure.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#campaign-setting">See how TCC works</a>
          <Link className="button button-secondary" to="/review">I’m here to review TCC</Link>
        </div>
      </section>

      <section className="orientation-section" id="campaign-setting">
        <p className="section-number">01</p>
        <div>
          <h2>Your city already has a campaign setting.</h2>
          <p>
            Every place has history. Old industries. Neighborhoods. Disasters. Forgotten people. Political struggles. Local legends. Photographs. Newspapers. Buildings that disappeared.
          </p>
          <p>TCC turns that material into something your group can enter and investigate.</p>
          <p className="pull-quote">The history is real. What is hiding inside it is not.</p>
        </div>
      </section>

      <section className="orientation-section split-section">
        <p className="section-number">02</p>
        <div>
          <h2>The Agent stays. The body changes.</h2>
          <div className="concept-grid">
            <article className="concept-card">
              <p className="eyebrow">Now</p>
              <h3>The Agent</h3>
              <p>Your Agent is the person who exists in the modern world.</p>
              <p>Their identity, memories, relationships, and decisions persist across Chronicles.</p>
            </article>
            <article className="concept-card">
              <p className="eyebrow">Then</p>
              <h3>The Echo Form</h3>
              <p>Inside a historical Branch, the Agent inhabits a body belonging to that place and time.</p>
              <p><strong>The body changes. You do not.</strong></p>
            </article>
          </div>
          <p className="example-note">
            A 68-year-old librarian in the present might enter 1897 through the body of a 23-year-old lumber worker.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">03</p>
        <div>
          <h2>History isn’t supposed to do this.</h2>
          <p>A Branch is a historical reality that has become unstable.</p>
          <div className="example-grid">
            <p>A worker disappears from every company record.</p>
            <p>A building appears in photographs before it existed.</p>
            <p>Witnesses remember two versions of the same disaster.</p>
            <p>A local legend begins leaving physical evidence.</p>
          </div>
          <p>The Agents enter the Branch to discover what is happening.</p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">04</p>
        <div>
          <h2>TCC isn’t just combat.</h2>
          <div className="action-grid">
            <article><h3>Investigate</h3><p>Find contradictions and follow evidence.</p></article>
            <article><h3>Explore</h3><p>Experience historical locations as they existed.</p></article>
            <article><h3>Use evidence</h3><p>Maps, photographs, newspapers, records, and other sources can affect play.</p></article>
            <article><h3>Make choices</h3><p>There is not always one correct solution.</p></article>
            <article><h3>Confront the impossible</h3><p>Threats may be human, supernatural, or temporal.</p></article>
            <article><h3>Get home</h3><p>Leaving the Branch does not necessarily mean leaving unchanged.</p></article>
          </div>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">05</p>
        <div>
          <h2>The history is not background decoration.</h2>
          <div className="evidence-lines">
            <p>A newspaper can contradict an NPC.</p>
            <p>A map can show where something once stood.</p>
            <p>A photograph can contain someone who should not be there.</p>
            <p>A historical record can change what the group decides to do.</p>
          </div>
          <p>TCC is designed so discovering real history can affect the game itself.</p>
          <p className="quiet-note">
            How deeply your group researches is adjustable. Some tables can play entirely from prepared material. Others can investigate real historical sources themselves.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">06</p>
        <div>
          <h2>Your table chooses the stakes.</h2>
          <div className="stakes-grid">
            <article><span>Rules Level 1</span><h3>Learn</h3><p>Forgiving play designed to learn the game.</p></article>
            <article><span>Rules Level 2</span><h3>Consequence + Recovery</h3><p>Serious events matter, but recovery can remain possible.</p></article>
            <article><span>Rules Level 3</span><h3>Lethal Risk</h3><p>Tables can deliberately choose permanent consequences and lethal stakes.</p></article>
          </div>
          <p>TCC does not assume every group wants the same amount of danger.</p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">07</p>
        <div>
          <h2>One person runs the Branch.</h2>
          <p>
            TCC calls the Game Master the <strong>Inspector</strong>. The Inspector presents the world, portrays people and threats, manages hidden information, and responds to the Agents’ decisions.
          </p>
          <p className="pull-quote">The Inspector should not need to become a professional historian before game night.</p>
        </div>
      </section>

      <section className="orientation-cta">
        <p className="eyebrow">Level 2: Discovery</p>
        <h2>What would your TCC game look like?</h2>
        <p>
          Some players want mysteries. Some want supernatural danger. Some want to search real historical records. Some want everything prepared before they sit down. We want to know what interests you.
        </p>
        <p>The next section takes a few minutes. Your answers will shape the short TCC experience that follows.</p>
        <Link className="button button-primary" to="/discover" onClick={markComplete}>
          Build my TCC experience
        </Link>
      </section>
    </main>
  )
}

function selectedTags(session: DiscoverySession, id: QuestionId): string[] {
  switch (id) {
    case 'historyInterests':
      return session.historyInterests
    case 'playPreference':
      return session.playPreference ? [session.playPreference] : []
    case 'supernaturalPreference':
      return session.supernaturalPreference ? [session.supernaturalPreference] : []
    case 'researchPreference':
      return session.researchPreference ? [session.researchPreference] : []
    case 'researchRecoveryReaction':
      return session.researchRecoveryReaction ? [session.researchRecoveryReaction] : []
    case 'riskPreference':
      return session.riskPreference ? [session.riskPreference] : []
    case 'rpgExperience':
      return session.rpgExperience ? [session.rpgExperience] : []
    case 'rolePreference':
      return session.rolePreference ? [session.rolePreference] : []
  }
}

function DiscoveryPage() {
  const navigate = useNavigate()
  const [session, setSession] = useState<DiscoverySession>(() => loadSession())
  const [questionIndex, setQuestionIndex] = useState(() => {
    const saved = loadSession()
    return Math.min(Math.max(saved.currentQuestion, 0), discoveryQuestions.length - 1)
  })
  const [responseTag, setResponseTag] = useState<string | null>(null)

  const question = discoveryQuestions[questionIndex]
  const selected = selectedTags(session, question.id)
  const selectedChoice = question.choices.find((choice) => choice.tag === responseTag)

  useEffect(() => {
    track('discovery_started', { session_id: session.sessionId })
  }, [session.sessionId])

  useEffect(() => {
    const firstSelected = selectedTags(session, question.id)[0] ?? null
    setResponseTag(firstSelected)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [question.id, questionIndex])

  const updateSession = (next: DiscoverySession) => {
    setSession(next)
    saveSession(next)
  }

  const selectChoice = (tag: string) => {
    const wasSelected = selected.includes(tag)
    let next: DiscoverySession = { ...session, level2Started: true }

    switch (question.id) {
      case 'historyInterests': {
        const current = session.historyInterests
        if (wasSelected) {
          next = { ...next, historyInterests: current.filter((value) => value !== tag) }
        } else if (current.length < (question.maxSelections ?? 3)) {
          next = { ...next, historyInterests: [...current, tag] }
        } else {
          return
        }
        break
      }
      case 'playPreference':
        next = { ...next, playPreference: tag }
        break
      case 'supernaturalPreference':
        next = { ...next, supernaturalPreference: tag }
        break
      case 'researchPreference':
        next = { ...next, researchPreference: tag }
        break
      case 'researchRecoveryReaction':
        next = { ...next, researchRecoveryReaction: tag }
        break
      case 'riskPreference':
        next = { ...next, riskPreference: tag }
        break
      case 'rpgExperience':
        next = { ...next, rpgExperience: tag }
        break
      case 'rolePreference':
        next = { ...next, rolePreference: tag }
        break
    }

    updateSession(next)
    setResponseTag(wasSelected && question.selection === 'multi' ? null : tag)
    track(wasSelected ? 'discovery_answer_changed' : 'discovery_question_answered', {
      session_id: session.sessionId,
      question_id: question.id,
      answer_tag: tag,
    })
  }

  const canContinue = selectedTags(session, question.id).length > 0

  const continueFlow = () => {
    if (!canContinue) return

    if (questionIndex === discoveryQuestions.length - 1) {
      const next = {
        ...session,
        level2Completed: true,
        currentQuestion: questionIndex,
      }
      updateSession(next)
      track('discovery_completed', { session_id: session.sessionId })
      navigate('/profile')
      return
    }

    const nextIndex = questionIndex + 1
    updateSession({ ...session, currentQuestion: nextIndex })
    setQuestionIndex(nextIndex)
    setResponseTag(null)
  }

  const goBack = () => {
    if (questionIndex === 0) {
      navigate('/')
      return
    }

    const nextIndex = questionIndex - 1
    updateSession({ ...session, currentQuestion: nextIndex })
    setQuestionIndex(nextIndex)
    setResponseTag(null)
  }

  const startOver = () => {
    if (!window.confirm('Start over? This will clear your current TCC Discovery answers.')) return
    resetSession()
    const next = createEmptySession()
    saveSession(next)
    setSession(next)
    setQuestionIndex(0)
    setResponseTag(null)
  }

  return (
    <main className="discovery-page">
      <div className="discovery-shell">
        <div className="progress-row">
          <span>Level 2: Discovery</span>
          <span>{questionIndex + 1} of {discoveryQuestions.length}</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${((questionIndex + 1) / discoveryQuestions.length) * 100}%` }} />
        </div>

        {question.id === 'researchRecoveryReaction' && (
          <p className="eyebrow">Now we want your opinion on an actual TCC design decision.</p>
        )}
        <h1>{question.title}</h1>
        {question.helper && <p className="question-helper">{question.helper}</p>}

        <div className="choice-list" role={question.selection === 'single' ? 'radiogroup' : 'group'} aria-label={question.title}>
          {question.choices.map((choice) => {
            const isSelected = selected.includes(choice.tag)
            const atLimit = question.selection === 'multi' && !isSelected && selected.length >= (question.maxSelections ?? 3)

            return (
              <button
                key={choice.tag}
                className={`choice-card${isSelected ? ' selected' : ''}`}
                type="button"
                role={question.selection === 'single' ? 'radio' : undefined}
                aria-checked={question.selection === 'single' ? isSelected : undefined}
                aria-pressed={question.selection === 'multi' ? isSelected : undefined}
                disabled={atLimit}
                onClick={() => selectChoice(choice.tag)}
              >
                <span className="choice-label">{choice.label}</span>
                {choice.helper && <span className="choice-helper">{choice.helper}</span>}
              </button>
            )
          })}
        </div>

        {selectedChoice && selected.includes(selectedChoice.tag) && (
          <aside className="response-card" aria-live="polite">
            <p>{selectedChoice.response}</p>
            {question.id === 'researchRecoveryReaction' && (
              <p className="response-emphasis">We are not trying to convince you that the mechanic works. We are trying to find out whether it actually does.</p>
            )}
            {question.id === 'riskPreference' && (
              <p className="response-emphasis">TCC handles this through different Rules Levels rather than assuming every group wants the same amount of danger.</p>
            )}
          </aside>
        )}

        <div className="discovery-actions">
          <button className="button button-secondary" type="button" onClick={goBack}>Back</button>
          <button className="button button-primary" type="button" disabled={!canContinue} onClick={continueFlow}>
            {questionIndex === discoveryQuestions.length - 1 ? 'Build my TCC profile' : 'Continue'}
          </button>
        </div>

        <button className="text-button" type="button" onClick={startOver}>Start over</button>
      </div>
    </main>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const [session, setSession] = useState<DiscoverySession>(() => loadSession())
  const profile = useMemo(() => buildProfile(session), [session])

  useEffect(() => {
    if (!session.profileViewed) {
      const next = { ...session, profileViewed: true }
      setSession(next)
      saveSession(next)
      track('profile_viewed', { session_id: session.sessionId })
    }
  }, [session])

  if (!session.level2Completed) {
    return (
      <main className="placeholder-page">
        <p className="eyebrow">TCC Discovery</p>
        <h1>Finish Discovery first.</h1>
        <p>Your profile is built from the eight Discovery questions.</p>
        <Link className="button button-primary" to="/discover">Continue Discovery</Link>
      </main>
    )
  }

  const startOver = () => {
    if (!window.confirm('Start over? This will clear your current TCC Discovery answers.')) return
    resetSession()
    navigate('/discover')
  }

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <p className="eyebrow">Your TCC profile</p>
        <h1>Here is the TCC experience you just described.</h1>
        <p className="lede">{profile.explanation}</p>
      </section>

      <dl className="profile-grid">
        <div><dt>History</dt><dd>{profile.history}</dd></div>
        <div><dt>What you want to do</dt><dd>{profile.play}</dd></div>
        <div><dt>Tone</dt><dd>{profile.tone}</dd></div>
        <div><dt>Research</dt><dd>{profile.research}</dd></div>
        <div><dt>Consequences</dt><dd>{profile.consequences}</dd></div>
        <div><dt>Experience</dt><dd>{profile.experience}</dd></div>
        <div><dt>Seat</dt><dd>{profile.seat}</dd></div>
      </dl>

      <section className="profile-next">
        <p className="eyebrow">Level 3: Guided Chronicle</p>
        <h2>Ready to try it?</h2>
        <p>
          The next step will place you at a TCC table with an Inspector and three simulated Agents. You will control the fourth Agent.
        </p>
        <Link
          className="button button-primary"
          to="/experience"
          onClick={() => track('experience_cta_clicked', { session_id: session.sessionId })}
        >
          Enter the Branch
        </Link>
        <div className="profile-links">
          <Link to="/discover">Change my answers</Link>
          <button className="text-button" type="button" onClick={startOver}>Start over</button>
        </div>
      </section>
    </main>
  )
}

function ExperiencePlaceholder() {
  return (
    <main className="placeholder-page">
      <p className="eyebrow">Level 3</p>
      <h1>The guided Chronicle is being prepared.</h1>
      <p>
        Build 1 ends here. The next portal release will add the 15–20 minute guided TCC scenario with an Inspector, three simulated Agents, and you controlling the fourth Agent.
      </p>
      <Link className="button button-secondary" to="/profile">Return to my profile</Link>
    </main>
  )
}

function ReviewPlaceholder() {
  return (
    <main className="placeholder-page">
      <p className="eyebrow">Private Review</p>
      <h1>The reviewer room is the next review build.</h1>
      <p>
        The planned paths are a 15-minute guided experience, a focused review of one TCC system, or a deep manuscript review using the standardized critique rubric.
      </p>
      <Link className="button button-primary" to="/discover">Try Discovery</Link>
    </main>
  )
}

function PlaytestPlaceholder() {
  return (
    <main className="placeholder-page">
      <p className="eyebrow">Playtesting</p>
      <h1>Controlled playtest recruitment is not open yet.</h1>
      <p>
        The first external playtest will open after the guided Chronicle and feedback system are ready.
      </p>
      <Link className="button button-primary" to="/discover">Build my TCC experience</Link>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main className="placeholder-page privacy-page">
      <p className="eyebrow">Privacy</p>
      <h1>Build 1 does not require your name or email.</h1>
      <p>
        Discovery answers are stored in your browser so you can leave and come back without losing progress. Build 1 does not send those answers to a TCC database.
      </p>
      <p>
        Later testing versions may collect anonymous interaction data and optional contact information. Those features will be documented here before they are enabled, and release updates will remain separate from playtester applications.
      </p>
      <Link className="button button-secondary" to="/">Return home</Link>
    </main>
  )
}

function App() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => loadAccessibility())

  useEffect(() => {
    window.localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(settings))
    document.documentElement.dataset.largeText = settings.largeText ? 'true' : 'false'
    document.documentElement.dataset.highContrast = settings.highContrast ? 'true' : 'false'
    document.documentElement.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false'
  }, [settings])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader settings={settings} onSettingsChange={setSettings} />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<OrientationPage />} />
          <Route path="/discover" element={<DiscoveryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/experience" element={<ExperiencePlaceholder />} />
          <Route path="/review" element={<ReviewPlaceholder />} />
          <Route path="/playtest" element={<PlaytestPlaceholder />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<OrientationPage />} />
        </Routes>
      </div>
      <footer>
        <nav aria-label="Footer navigation">
          <Link to="/review">Review TCC</Link>
          <Link to="/playtest">Playtest</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
        <p>© {new Date().getFullYear()} Vogtcom LLC. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
