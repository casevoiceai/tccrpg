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

export function track(event: PortalEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(
    new CustomEvent('tcc:portal-event', {
      detail: { event, properties, timestamp: new Date().toISOString() },
    }),
  )

  if (import.meta.env.DEV) {
    console.info('[TCC portal event]', event, properties)
  }
}
