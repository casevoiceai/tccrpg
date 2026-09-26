export type DecisionId =
  | 'firstMove'
  | 'extraSuccess'
  | 'priority'
  | 'threatResponse'
  | 'echoWareResponse'
  | 'resolution'

export type ExperienceDebrief = {
  motivation: string | null
  evidenceFeeling: string | null
  researchAfter: string | null
  wouldPlay: string | null
}

export type SubmissionStatus = 'not_submitted' | 'submitting' | 'submitted' | 'failed'

export type ExperienceState = {
  version: 'missing-name-0.2'
  startedAt: string
  updatedAt: string
  currentStep: number
  choices: Partial<Record<DecisionId, string>>
  optionalSourceOpened: boolean
  completed: boolean
  submissionStatus: SubmissionStatus
  submissionError: string | null
  debrief: ExperienceDebrief
}

const STORAGE_KEY = 'tcc_missing_name_v1'

export function createExperienceState(): ExperienceState {
  const now = new Date().toISOString()
  return {
    version: 'missing-name-0.2',
    startedAt: now,
    updatedAt: now,
    currentStep: 0,
    choices: {},
    optionalSourceOpened: false,
    completed: false,
    submissionStatus: 'not_submitted',
    submissionError: null,
    debrief: {
      motivation: null,
      evidenceFeeling: null,
      researchAfter: null,
      wouldPlay: null,
    },
  }
}

export function loadExperienceState(): ExperienceState {
  if (typeof window === 'undefined') return createExperienceState()

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return createExperienceState()

  try {
    const parsed = JSON.parse(raw) as Partial<ExperienceState>
    if (parsed.version !== 'missing-name-0.2') return createExperienceState()
    return {
      ...createExperienceState(),
      ...parsed,
      choices: parsed.choices ?? {},
      debrief: {
        ...createExperienceState().debrief,
        ...(parsed.debrief ?? {}),
      },
    }
  } catch {
    return createExperienceState()
  }
}

export function saveExperienceState(state: ExperienceState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...state, updatedAt: new Date().toISOString() }),
  )
}

export function resetExperienceState() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
