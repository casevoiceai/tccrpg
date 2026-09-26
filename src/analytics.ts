import { submitPortalSnapshot } from './api'
import { loadExperienceState, saveExperienceState } from './experience'
import { loadSession } from './session'

export type PortalEvent =
  | 'orientation_started'
  | 'orientation_completed'
  | 'discovery_started'
  | 'discovery_question_answered'
  | 'discovery_answer_changed'
  | 'discovery_completed'
  | 'profile_viewed'
  | 'experience_cta_clicked'
  | 'discovery_abandoned'
  | 'experience_started'
  | 'experience_decision_made'
  | 'experience_optional_source_opened'
  | 'experience_completed'

async function submitCompletedExperience() {
  const discovery = loadSession()
  const experience = loadExperienceState()

  if (!experience.completed || experience.submissionStatus === 'submitted') return

  saveExperienceState({
    ...experience,
    submissionStatus: 'submitting',
    submissionError: null,
  })

  const result = await submitPortalSnapshot(discovery, experience)
  const latest = loadExperienceState()

  saveExperienceState({
    ...latest,
    submissionStatus: result.ok ? 'submitted' : 'failed',
    submissionError: result.ok ? null : (result.error ?? 'request_failed'),
  })
}

export function retryPendingPortalSubmission() {
  if (typeof window === 'undefined') return
  const experience = loadExperienceState()

  if (
    experience.completed
    && (experience.submissionStatus === 'not_submitted' || experience.submissionStatus === 'failed')
  ) {
    void submitCompletedExperience()
  }
}

export function track(event: PortalEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(
    new CustomEvent('tcc:portal-event', {
      detail: { event, properties, timestamp: new Date().toISOString() },
    }),
  )

  if (event === 'experience_completed') {
    void submitCompletedExperience()
  }
}
