import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { submitDevelopmentSurvey } from './api'
import { track } from './analytics'
import { discoveryQuestions, type QuestionId } from './content'
import {
  createEmptySession,
  loadSession,
  resetSession,
  saveSession,
  type DiscoverySession,
} from './session'

const surveyCopy: Record<QuestionId, { title: string; helper?: string }> = {
  historyInterests: { title: 'What kinds of history interest you?', helper: 'Choose up to three.' },
  playPreference: { title: 'At the table, what sounds most fun?' },
  supernaturalPreference: { title: 'How strange do you want the game to get?' },
  researchPreference: { title: 'How much outside historical research would you want to do?' },
  researchRecoveryReaction: {
    title: 'One Level 2 recovery option can involve historical research tied to the case. What is your first reaction?',
  },
  riskPreference: { title: 'How dangerous do you like your tabletop games?' },
  rpgExperience: { title: 'How much tabletop RPG experience do you have?' },
  rolePreference: { title: 'Which seat interests you more?' },
}
const choiceLabelOverrides: Record<string, string> = {
  supernatural_minimal: 'Keep it historically plausible.',
  supernatural_history_first: 'Leave the supernatural uncertain.',
  supernatural_balanced: 'Mix history with clearly supernatural threats.',
  supernatural_high: 'Let the supernatural become a major part of the Chronicle.',
  research_table_ready: 'None. Give me what I need at the table.',
  research_mixed: 'Some, if it is optional.',
  research_full_agency: 'I would enjoy finding real sources between sessions.',
  research_unsure: 'I need to try the game before I know.',
  recovery_positive: 'That sounds like part of the game.',
  recovery_optional: 'Interesting, but I would want other recovery options too.',
  recovery_negative: 'That sounds too much like homework.',
  recovery_uncertain: 'I would need to try it before deciding.',
  risk_low: 'Mostly forgiving. I am here for the mystery and adventure.',
  risk_recoverable: 'Consequences should matter, but recovery should usually be possible.',
  risk_permanent: 'I like lasting consequences.',
  risk_lethal: 'I am comfortable with lethal stakes when everyone agrees to them.',
  role_agent: 'Agent: I want to play a character inside the story.',
  role_inspector: 'Inspector: I am more interested in running the game.',
  role_either: 'Either.',
  role_unsure: 'I do not know yet.',
}

function selectedTags(session: DiscoverySession, id: QuestionId): string[] {
  switch (id) {
    case 'historyInterests': return session.historyInterests
    case 'playPreference': return session.playPreference ? [session.playPreference] : []
    case 'supernaturalPreference': return session.supernaturalPreference ? [session.supernaturalPreference] : []
    case 'researchPreference': return session.researchPreference ? [session.researchPreference] : []
    case 'researchRecoveryReaction': return session.researchRecoveryReaction ? [session.researchRecoveryReaction] : []
    case 'riskPreference': return session.riskPreference ? [session.riskPreference] : []
    case 'rpgExperience': return session.rpgExperience ? [session.rpgExperience] : []
    case 'rolePreference': return session.rolePreference ? [session.rolePreference] : []
  }
}

function clampQuestionIndex(index: number) {
  return Math.min(Math.max(index, 0), discoveryQuestions.length - 1)
}

export default function DevelopmentSurveyPage() {
  const navigate = useNavigate()
  const [session, setSession] = useState<DiscoverySession>(() => loadSession())
  const [questionIndex, setQuestionIndex] = useState(() => clampQuestionIndex(loadSession().currentQuestion))
  const [submitting, setSubmitting] = useState(false)

  const question = discoveryQuestions[questionIndex]
  const display = surveyCopy[question.id]
  const selected = selectedTags(session, question.id)
  useEffect(() => {
    track('discovery_started', { session_id: session.sessionId })
  }, [session.sessionId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [questionIndex])

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
      case 'playPreference': next = { ...next, playPreference: tag }; break
      case 'supernaturalPreference': next = { ...next, supernaturalPreference: tag }; break
      case 'researchPreference': next = { ...next, researchPreference: tag }; break
      case 'researchRecoveryReaction': next = { ...next, researchRecoveryReaction: tag }; break
      case 'riskPreference': next = { ...next, riskPreference: tag }; break
      case 'rpgExperience': next = { ...next, rpgExperience: tag }; break
      case 'rolePreference': next = { ...next, rolePreference: tag }; break
    }

    updateSession(next)
    track(wasSelected ? 'discovery_answer_changed' : 'discovery_question_answered', {
      session_id: session.sessionId,
      question_id: question.id,
      answer_tag: tag,
    })
  }

  const canContinue = selectedTags(session, question.id).length > 0

  const continueFlow = async () => {
    if (!canContinue || submitting) return

    if (questionIndex === discoveryQuestions.length - 1) {
      const next = { ...session, level2Completed: true, currentQuestion: questionIndex }
      updateSession(next)
      setSubmitting(true)
      track('discovery_completed', { session_id: session.sessionId })
      const result = await submitDevelopmentSurvey(next)
      navigate('/survey-complete', { state: { submitted: result.ok } })
      return
    }

    const nextIndex = questionIndex + 1
    updateSession({ ...session, currentQuestion: nextIndex })
    setQuestionIndex(nextIndex)
  }

  const goBack = () => {
    if (questionIndex === 0) {
      navigate('/')
      return
    }

    const nextIndex = questionIndex - 1
    updateSession({ ...session, currentQuestion: nextIndex })
    setQuestionIndex(nextIndex)
  }

  const startOver = () => {
    if (!window.confirm('Start over? This will clear your current survey answers.')) return
    resetSession()
    const next = createEmptySession()
    saveSession(next)
    setSession(next)
    setQuestionIndex(0)
  }
  return (
    <main className="discovery-page">
      <div className="discovery-shell">
        <div className="progress-row">
          <span>Development survey</span>
          <span>{questionIndex + 1} of {discoveryQuestions.length}</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${((questionIndex + 1) / discoveryQuestions.length) * 100}%` }} />
        </div>

        {questionIndex === 0 && (
          <div className="survey-intro">
            <p className="eyebrow">Help us shape TCC</p>
            <p className="question-helper">
              This survey asks what kinds of history, play, research, and risk interest you. Your answers help us understand what potential players want from the game.
            </p>
          </div>
        )}

        <h1>{display.title}</h1>
        {display.helper && <p className="question-helper">{display.helper}</p>}

        <div
          className="choice-list"
          role={question.selection === 'single' ? 'radiogroup' : 'group'}
          aria-label={display.title}
        >
          {question.choices.map((choice) => {
            const isSelected = selected.includes(choice.tag)
            const atLimit = question.selection === 'multi'
              && !isSelected
              && selected.length >= (question.maxSelections ?? 3)
            const label = choiceLabelOverrides[choice.tag] ?? choice.label

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
                <span className="choice-label">{label}</span>
              </button>
            )
          })}
        </div>

        <div className="discovery-actions">
          <button className="button button-secondary" type="button" onClick={goBack}>Back</button>
          <button className="button button-primary" type="button" disabled={!canContinue || submitting} onClick={continueFlow}>
            {submitting ? 'Saving…' : questionIndex === discoveryQuestions.length - 1 ? 'Finish survey' : 'Continue'}
          </button>
        </div>

        <button className="text-button" type="button" onClick={startOver}>Start over</button>
      </div>
    </main>
  )
}

export function SurveyCompletePage() {
  const location = useLocation()
  const submitted = (location.state as { submitted?: boolean } | null)?.submitted

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <p className="eyebrow">Development survey complete</p>
        <h1>Thanks. That helps us understand what people want from TCC.</h1>
        {submitted === false && (
          <p className="quiet-note">Your answers are still saved in this browser, but the submission did not reach the server. You can continue using the site.</p>
        )}
      </section>
      <section className="profile-next">
        <h2>See the game in context.</h2>
        <p>Read The Missing Name for a concrete example of how a TCC Chronicle can begin at the table.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/experience">Read The Missing Name</Link>
          <Link className="button button-secondary" to="/playtest">Apply to playtest</Link>
          <Link className="button button-secondary" to="/">Return home</Link>
        </div>
      </section>
    </main>
  )
}
