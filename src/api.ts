import type { ExperienceState } from './experience'
import type { DiscoverySession } from './session'

export type ApiResult = {
  ok: boolean
  error?: string
  message?: string
}

async function postJson(path: string, body: Record<string, unknown>): Promise<ApiResult> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    const payload = await response.json().catch(() => ({})) as Record<string, unknown>

    if (!response.ok || payload.ok !== true) {
      const error = typeof payload.error === 'string' ? payload.error : 'request_failed'
      return {
        ok: false,
        error,
        message: error === 'storage_not_configured'
          ? 'Cloudflare storage is not configured yet.'
          : 'The submission could not be saved right now.',
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      error: 'network_error',
      message: 'The submission could not reach the server. Your local progress is still saved.',
    }
  }
}

export function submitPortalSnapshot(
  discovery: DiscoverySession,
  experience: ExperienceState,
): Promise<ApiResult> {
  return postJson('/api/session', {
    session_id: discovery.sessionId,
    portal_version: '0.3',
    demo_version: experience.version,
    discovery: {
      history_interests: discovery.historyInterests,
      play_preference: discovery.playPreference,
      supernatural_preference: discovery.supernaturalPreference,
      research_preference: discovery.researchPreference,
      research_recovery_reaction: discovery.researchRecoveryReaction,
      risk_preference: discovery.riskPreference,
      rpg_experience: discovery.rpgExperience,
      role_preference: discovery.rolePreference,
    },
    choices: experience.choices,
    debrief: experience.debrief,
    optional_source_opened: experience.optionalSourceOpened,
    website: '',
  })
}

export type PlaytestApplicationPayload = {
  session_id: string
  name: string
  email: string
  general_location: string
  participation_mode: 'in_person' | 'remote' | 'either'
  rpg_experience: string
  interests: string[]
  inspector_interest: 'yes' | 'no' | 'maybe'
  availability: string
  accessibility_needs: string
  unfinished_game_ack: boolean
  direct_criticism_ack: boolean
  website?: string
}

export function submitPlaytestApplication(payload: PlaytestApplicationPayload) {
  return postJson('/api/playtest', payload)
}

export function submitReleaseUpdate(payload: {
  session_id: string
  email: string
  consent: boolean
  source: string
  website?: string
}) {
  return postJson('/api/updates', payload)
}
