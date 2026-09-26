import { labelForTag } from './content'

export type DiscoverySession = {
  sessionId: string
  createdAt: string
  updatedAt: string
  historyInterests: string[]
  playPreference: string | null
  supernaturalPreference: string | null
  researchPreference: string | null
  researchRecoveryReaction: string | null
  riskPreference: string | null
  rpgExperience: string | null
  rolePreference: string | null
  level1Completed: boolean
  level2Started: boolean
  level2Completed: boolean
  currentQuestion: number
  profileViewed: boolean
}

const STORAGE_KEY = 'tcc_portal_discovery_v1'

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `tcc-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function createEmptySession(): DiscoverySession {
  const now = new Date().toISOString()
  return {
    sessionId: createSessionId(),
    createdAt: now,
    updatedAt: now,
    historyInterests: [],
    playPreference: null,
    supernaturalPreference: null,
    researchPreference: null,
    researchRecoveryReaction: null,
    riskPreference: null,
    rpgExperience: null,
    rolePreference: null,
    level1Completed: false,
    level2Started: false,
    level2Completed: false,
    currentQuestion: 0,
    profileViewed: false,
  }
}

export function loadSession(): DiscoverySession {
  if (typeof window === 'undefined') return createEmptySession()

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return createEmptySession()

  try {
    return { ...createEmptySession(), ...JSON.parse(saved) }
  } catch {
    return createEmptySession()
  }
}

export function saveSession(session: DiscoverySession) {
  if (typeof window === 'undefined') return
  const next = { ...session, updatedAt: new Date().toISOString() }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function resetSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

function label(tag: string | null) {
  if (!tag) return 'Not selected'
  return labelForTag.get(tag) ?? tag
}

export type ProfileSummary = {
  history: string
  play: string
  tone: string
  research: string
  consequences: string
  experience: string
  seat: string
  explanation: string
}

export function buildProfile(session: DiscoverySession): ProfileSummary {
  const history = session.historyInterests.length
    ? session.historyInterests.map((tag) => label(tag)).join(', ')
    : 'Not selected'

  const play = label(session.playPreference)
  const tone = label(session.supernaturalPreference)
  const research = label(session.researchPreference)
  const consequences = label(session.riskPreference)
  const experience = label(session.rpgExperience)
  const seat = label(session.rolePreference)

  const tonePhrase: Record<string, string> = {
    supernatural_minimal: 'keep the supernatural subtle and let the historical mystery do most of the work',
    supernatural_history_first: 'keep real history in the foreground while something impossible emerges underneath it',
    supernatural_balanced: 'balance historical investigation with a larger supernatural conflict',
    supernatural_high: 'use real history as the doorway into a stranger, more openly supernatural Branch',
  }

  const researchPhrase: Record<string, string> = {
    research_table_ready: 'You prefer the historical material prepared at the table, without required homework.',
    research_mixed: 'You are open to some historical investigation as long as the Inspector provides the core material.',
    research_full_agency: 'You are interested in digging into real historical sources as part of play.',
    research_unsure: 'You want to see the research mechanics in action before deciding how much you want.',
  }

  const riskPhrase: Record<string, string> = {
    risk_low: 'You favor exploration and mystery with forgiving consequences.',
    risk_recoverable: 'You want consequences to matter while still leaving room for recovery.',
    risk_permanent: 'You are comfortable with serious consequences that can permanently alter a Branch relationship.',
    risk_lethal: 'You are open to clearly signaled lethal stakes when the table agrees to them.',
  }

  const historyPhrase =
    session.historyInterests.length > 0
      ? `Your version of TCC would draw from ${history.toLowerCase()}.`
      : 'Your version of TCC would begin with the history that interests you most.'

  const playPhrase = session.playPreference
    ? `You are most interested in ${play.toLowerCase()}.`
    : ''

  const tone = session.supernaturalPreference
    ? tonePhrase[session.supernaturalPreference] ?? 'keep the history and supernatural material connected'
    : 'keep the history and supernatural material connected'

  return {
    history,
    play,
    tone: label(session.supernaturalPreference),
    research,
    consequences,
    experience,
    seat,
    explanation: `${historyPhrase} ${playPhrase} The adventure should ${tone}. ${researchPhrase[session.researchPreference ?? ''] ?? ''} ${riskPhrase[session.riskPreference ?? ''] ?? ''}`.replace(/\s+/g, ' ').trim(),
  }
}
