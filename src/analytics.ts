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

export function track(event: PortalEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(
    new CustomEvent('tcc:portal-event', {
      detail: { event, properties, timestamp: new Date().toISOString() },
    }),
  )
}
