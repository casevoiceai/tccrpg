import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { track } from './analytics'
import {
  createExperienceState,
  loadExperienceState,
  resetExperienceState,
  saveExperienceState,
  type DecisionId,
  type ExperienceState,
} from './experience'
import {
  echoWareDecision,
  extraSuccessDecision,
  firstMoveDecision,
  getDiscoveryBridge,
  getResearchPrompt,
  getSupernaturalDescription,
  party,
  priorityDecision,
  resolutionDecision,
  threatDecision,
  type ExperienceDecision,
} from './experienceContent'
import { loadSession } from './session'
import './experience.css'

const LAST_STEP = 17

function PartyRail() {
  return (
    <div className="party-rail" aria-label="Agents at the table">
      <article className="party-card inspector-card">
        <strong>Inspector</strong>
        <span>Runs the Branch</span>
      </article>
      {party.map((member) => (
        <article className="party-card" key={member.name}>
          <strong>{member.name}</strong>
          <span>{member.role}</span>
        </article>
      ))}
      <article className="party-card you-card">
        <strong>You</strong>
        <span>Fourth Agent</span>
      </article>
    </div>
  )
}

function Inspector({ children }: { children: React.ReactNode }) {
  return (
    <div className="inspector-line">
      <span>Inspector</span>
      <div>{children}</div>
    </div>
  )
}

function DecisionPanel({
  decision,
  state,
  onChoose,
}: {
  decision: ExperienceDecision
  state: ExperienceState
  onChoose: (decisionId: DecisionId, choiceId: string) => void
}) {
  const selectedId = state.choices[decision.id]
  const selectedChoice = decision.choices.find((choice) => choice.id === selectedId)

  return (
    <section className="decision-panel">
      <p className="eyebrow">Your turn</p>
      <h2>{decision.prompt}</h2>
      <div className="experience-choice-list" role="radiogroup" aria-label={decision.prompt}>
        {decision.choices.map((choice) => {
          const selected = choice.id === selectedId
          return (
            <button
              key={choice.id}
              className={`experience-choice${selected ? ' selected' : ''}`}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChoose(decision.id, choice.id)}
            >
              {choice.label}
            </button>
          )
        })}
      </div>

      {selectedChoice && (
        <div className="choice-result" aria-live="polite">
          <p>{selectedChoice.result}</p>
          {selectedChoice.companion && <p className="companion-line">{selectedChoice.companion}</p>}
        </div>
      )}
    </section>
  )
}

function ContinueButton({ disabled = false, onClick, label = 'Continue' }: { disabled?: boolean; onClick: () => void; label?: string }) {
  return (
    <button className="button button-primary experience-continue" type="button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}

function Debrief({ state, onChange, onSubmit }: {
  state: ExperienceState
  onChange: (field: keyof ExperienceState['debrief'], value: string) => void
  onSubmit: () => void
}) {
  const questions = [
    {
      field: 'motivation' as const,
      title: 'What drove your choices most?',
      options: ['Protecting people', 'Solving the mystery', 'Preserving history', 'Understanding the supernatural threat', 'Something else'],
    },
    {
      field: 'evidenceFeeling' as const,
      title: 'Did the historical evidence feel like part of the game?',
      options: ['Definitely', 'Mostly', 'Somewhat', 'Not really'],
    },
    {
      field: 'researchAfter' as const,
      title: 'After experiencing it, how do you feel about research affecting gameplay?',
      options: ['More interested than before', 'About the same', 'Less interested', 'I still need a full session to decide'],
    },
    {
      field: 'wouldPlay' as const,
      title: 'Would you play a full TCC session?',
      options: ['Yes', 'Maybe', 'Probably not'],
    },
  ]

  const complete = Object.values(state.debrief).every(Boolean)

  return (
    <section className="debrief-panel">
      <p className="eyebrow">Post-mission debrief</p>
      <h2>How did that feel?</h2>
      <p className="scene-copy">Answer before discussing the game with anyone else. We want your first reaction.</p>

      {questions.map((question) => (
        <fieldset key={question.field} className="debrief-question">
          <legend>{question.title}</legend>
          <div className="debrief-options">
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={question.field}
                  value={option}
                  checked={state.debrief[question.field] === option}
                  onChange={() => onChange(question.field, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <ContinueButton disabled={!complete} onClick={onSubmit} label="Finish the demo" />
    </section>
  )
}

export default function ExperiencePage() {
  const discovery = useMemo(() => loadSession(), [])
  const [state, setState] = useState<ExperienceState>(() => loadExperienceState())

  useEffect(() => {
    track('experience_started', { demo_version: state.version })
  }, [state.version])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [state.currentStep])

  const update = (next: ExperienceState) => {
    setState(next)
    saveExperienceState(next)
  }

  const nextStep = () => {
    update({ ...state, currentStep: Math.min(state.currentStep + 1, LAST_STEP) })
  }

  const choose = (decisionId: DecisionId, choiceId: string) => {
    update({ ...state, choices: { ...state.choices, [decisionId]: choiceId } })
    track('experience_decision_made', { decision_id: decisionId, choice_id: choiceId })
  }

  const openSource = () => {
    update({ ...state, optionalSourceOpened: true })
    track('experience_optional_source_opened')
  }

  const updateDebrief = (field: keyof ExperienceState['debrief'], value: string) => {
    update({ ...state, debrief: { ...state.debrief, [field]: value } })
  }

  const finish = () => {
    update({ ...state, completed: true, currentStep: LAST_STEP })
    track('experience_completed', { demo_version: state.version, debrief: state.debrief })
  }

  const restart = () => {
    if (!window.confirm('Restart The Missing Name from the beginning?')) return
    resetExperienceState()
    const next = createExperienceState()
    saveExperienceState(next)
    setState(next)
  }

  const selectedFor = (decision: ExperienceDecision) => Boolean(state.choices[decision.id])
  const resolutionId = state.choices.resolution
  const resolution = resolutionDecision.choices.find((choice) => choice.id === resolutionId)

  return (
    <main className="experience-page">
      <header className="experience-header">
        <div>
          <p className="eyebrow">Level 3: Guided Chronicle</p>
          <h1>The Missing Name</h1>
        </div>
        <div className="experience-meta" aria-label="Experience progress">
          <span>Demo 0.2</span>
          <span>Scene {Math.min(state.currentStep + 1, LAST_STEP + 1)} of {LAST_STEP + 1}</span>
          <button className="text-button" type="button" onClick={restart}>Restart</button>
        </div>
      </header>

      <PartyRail />

      {state.currentStep === 0 && (
        <section className="scene-panel">
          <p className="profile-bridge">{getDiscoveryBridge(discovery)}</p>
          <p className="profile-bridge">{getSupernaturalDescription(discovery)}</p>
          <p className="profile-bridge">{getResearchPrompt(discovery)}</p>
          <Inspector>
            <p>A local archive has two copies of an 1894 employee ledger from the same company.</p>
            <p>One lists a worker named Elias Vale. The other does not. Both appear authentic.</p>
            <p>Three days after the discrepancy was discovered, a sealed section of the old works began appearing in photographs where no building exists today.</p>
          </Inspector>
          <div className="assignment-card">
            <h2>Your assignment</h2>
            <ul>
              <li>Identify Elias Vale.</li>
              <li>Recover evidence that he existed.</li>
              <li>Do not assume the historical record is complete.</li>
            </ul>
          </div>
          <ContinueButton onClick={nextStep} label="Enter the Branch" />
        </section>
      )}

      {state.currentStep === 1 && (
        <section className="scene-panel echo-transition">
          <p className="year-mark">1894</p>
          <h2>You open your eyes in a body that is not yours.</h2>
          <div className="echo-card">
            <div><span>Your Agent</span><strong>Persistent modern identity</strong></div>
            <div><span>Your Echo Form</span><strong>24-year-old freight clerk</strong></div>
            <div><span>Useful skills</span><strong>Observe · Move · Persuade</strong></div>
          </div>
          <p className="pull-quote">Your Agent remembers the mission. Your Echo remembers the building.</p>
          <ContinueButton onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 2 && (
        <section className="scene-panel">
          <Inspector><p>The four Agents arrive outside the works as the evening shift changes.</p></Inspector>
          <div className="companion-grid">
            <p><strong>Mara:</strong> “The office will have personnel records.”</p>
            <p><strong>Nia:</strong> “If the ledger was altered, I want another source.”</p>
            <p><strong>Lewis:</strong> “People are still working here. Someone may know him.”</p>
          </div>
          <DecisionPanel decision={firstMoveDecision} state={state} onChoose={choose} />
          <ContinueButton disabled={!selectedFor(firstMoveDecision)} onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 3 && (
        <section className="scene-panel">
          <p className="eyebrow">Historical source</p>
          <h2>The first contradiction</h2>
          <div className="artifact-card" aria-label="Transcribed employee ledger">
            <div className="artifact-heading">Lackawanna Works · Shift Ledger · October 1894</div>
            <div className="artifact-row"><span>Vale, Elias</span><span>Freight · Bay 3</span></div>
            <div className="artifact-row faded"><span>Vale, Elias</span><span>—</span></div>
            <div className="artifact-note">A second copy contains the same page number but no Elias Vale.</div>
          </div>
          <p className="scene-copy"><strong>Elias Vale died here three days from now.</strong> The official ledger is already behaving as though he never existed.</p>
          {!state.optionalSourceOpened ? (
            <button className="button button-secondary" type="button" onClick={openSource}>Look closer at the source</button>
          ) : (
            <div className="optional-source">
              <h3>Look closer</h3>
              <p>The paper, ink, numbering, and supervisor initials match. Neither copy looks forged. The contradiction is not between a real record and a fake one. The Branch is sustaining two records at once.</p>
            </div>
          )}
          <ContinueButton onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 4 && (
        <section className="scene-panel">
          <Inspector><p>This is uncertain, important, and failure could change the situation. That means we roll.</p></Inspector>
          <div className="dice-pool" aria-label="Five six-sided dice showing six, six, four, two, one">
            {[6, 6, 4, 2, 1].map((value, index) => <span className={value === 6 ? 'success' : ''} key={`${value}-${index}`}>{value}</span>)}
          </div>
          <div className="roll-result">
            <strong>Observe + Investigation = 5d6</strong>
            <p>One 6 succeeds. Additional 6s can improve the result.</p>
            <p><strong>Result: success + 1 extra success.</strong></p>
          </div>
          <ContinueButton onClick={nextStep} label="Spend the extra success" />
        </section>
      )}

      {state.currentStep === 5 && (
        <section className="scene-panel">
          <DecisionPanel decision={extraSuccessDecision} state={state} onChoose={choose} />
          <ContinueButton disabled={!selectedFor(extraSuccessDecision)} onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 6 && (
        <section className="scene-panel">
          <h2>The contradiction gets worse.</h2>
          <p className="scene-copy">A second employee name begins fading from the document while Nia is holding it.</p>
          <div className="companion-grid">
            <p><strong>Mara:</strong> “This isn’t somebody changing a ledger.”</p>
            <p><strong>Nia:</strong> “The ledger is changing because the Branch is changing.”</p>
          </div>
          <p className="scene-copy">A worker crosses the room. For a split second, his face disappears from the photograph in Nia’s hand.</p>
          <ContinueButton onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 7 && (
        <section className="scene-panel">
          <DecisionPanel decision={priorityDecision} state={state} onChoose={choose} />
          <ContinueButton disabled={!selectedFor(priorityDecision)} onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 8 && (
        <section className="scene-panel">
          <p className="eyebrow">Group play</p>
          <h2>You are not acting alone.</h2>
          <Inspector><p>The next move is risky. Lewis commits to the action with you.</p></Inspector>
          <div className="help-rule"><strong>Your pool: 4d6 → Lewis helps → 5d6</strong><span>Another Agent can improve your chance when their help makes sense in the fiction.</span></div>
          <p className="companion-line">Lewis: “I’m coming with you.”</p>
          <ContinueButton onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 9 && (
        <section className="scene-panel threat-scene">
          <p className="eyebrow">Temporal threat</p>
          <h2>The Hollow Shift</h2>
          <p className="scene-copy">Inside the sealed machinery room, a human-shaped absence moves between the engines.</p>
          <div className="threat-effects">
            <span>Names disappear.</span>
            <span>Photographs lose people.</span>
            <span>Records change.</span>
            <span>Memories begin to follow.</span>
          </div>
          <Inspector><p>The Hollow Shift turns toward Elias.</p></Inspector>
          <ContinueButton onClick={nextStep} label="Act" />
        </section>
      )}

      {state.currentStep === 10 && (
        <section className="scene-panel">
          <DecisionPanel decision={threatDecision} state={state} onChoose={choose} />
          <ContinueButton disabled={!selectedFor(threatDecision)} onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 11 && (
        <section className="scene-panel consequence-panel">
          <p className="eyebrow">Temporal consequence</p>
          <h2>For several seconds, you remember two versions of the same life.</h2>
          <div className="echo-ware-mark"><strong>Echo Ware +1</strong><span>The borrowed body is beginning to wear under temporal exposure.</span></div>
          <p className="scene-copy">Your Agent remains themselves. The Echo Form is what is being stressed.</p>
          <ContinueButton onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 12 && (
        <section className="scene-panel">
          <DecisionPanel decision={echoWareDecision} state={state} onChoose={choose} />
          <ContinueButton disabled={!selectedFor(echoWareDecision)} onClick={nextStep} />
        </section>
      )}

      {state.currentStep === 13 && (
        <section className="scene-panel">
          <p className="scene-copy">The group now understands enough to stabilize the Branch. The remaining question is what version of the truth you are willing to protect.</p>
          <DecisionPanel decision={resolutionDecision} state={state} onChoose={choose} />
          <ContinueButton disabled={!selectedFor(resolutionDecision)} onClick={nextStep} label="Commit to the choice" />
        </section>
      )}

      {state.currentStep === 14 && (
        <section className="scene-panel resolution-panel">
          <p className="eyebrow">Branch resolution</p>
          <h2>The Branch chooses a shape.</h2>
          <p className="scene-copy">{resolution?.result}</p>
          <p className="scene-copy">The Hollow Shift collapses into the machinery-room doorway. The sound stops first. Then the room does.</p>
          <ContinueButton onClick={nextStep} label="Return" />
        </section>
      )}

      {state.currentStep === 15 && (
        <section className="scene-panel return-panel">
          <p className="eyebrow">Modern day</p>
          <h2>The archive is different.</h2>
          <p className="scene-copy">Elias Vale is present in the collection again. A photograph now shows him standing beside three other workers. The caption is new.</p>
          <div className="artifact-card modern-artifact">
            <div className="artifact-heading">Archive note · revised after Branch return</div>
            <p>VALE, ELIAS — freight clerk. Previously omitted from company payroll copy. See incident file and Bay 3 photograph.</p>
          </div>
          <p className="pull-quote">You solved this Branch. You did not prove it was the only one.</p>
          <ContinueButton onClick={nextStep} label="Debrief" />
        </section>
      )}

      {state.currentStep === 16 && (
        <Debrief state={state} onChange={updateDebrief} onSubmit={finish} />
      )}

      {state.currentStep === 17 && (
        <section className="scene-panel completion-panel">
          <p className="eyebrow">Demo complete</p>
          <h2>You just played a small piece of TCC.</h2>
          <p className="scene-copy">The demo introduced the core pieces without asking you to learn the entire rulebook first.</p>
          <div className="learned-grid">
            {['Agent + Echo Form', 'Inspector', 'Historical evidence', 'Year Zero dice', 'Cooperation', 'Temporal threat', 'Echo Ware', 'Consequential choices', 'Return + debrief'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="completion-actions">
            <Link className="button button-primary" to="/playtest">I want to playtest TCC</Link>
            <Link className="button button-secondary" to="/playtest">I’m interested in being an Inspector</Link>
            <Link className="button button-secondary" to="/updates">Tell me when TCC releases</Link>
            <Link className="text-link" to="/">No thanks. Show me the rest of the website.</Link>
          </div>
        </section>
      )}
    </main>
  )
}
