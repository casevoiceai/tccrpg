import type { DiscoverySession } from './session'
import type { DecisionId } from './experience'

export type ExperienceChoice = {
  id: string
  label: string
  result: string
  companion?: string
}

export type ExperienceDecision = {
  id: DecisionId
  prompt: string
  choices: ExperienceChoice[]
}

export const party = [
  { name: 'Mara', role: 'Investigation', line: 'I want records before assumptions.' },
  { name: 'Lewis', role: 'Social + Action', line: 'People know things paper does not.' },
  { name: 'Nia', role: 'Research + Observation', line: 'If one source changed, we find another.' },
]

export const firstMoveDecision: ExperienceDecision = {
  id: 'firstMove',
  prompt: 'The group reaches the works. What do you do first?',
  choices: [
    {
      id: 'records',
      label: 'Go with Mara to the records office.',
      result: 'You and Mara find a payroll ledger with one line scraped thin enough to see daylight through the paper.',
      companion: 'Mara: “Someone did not just cross this out. The page is forgetting him.”',
    },
    {
      id: 'source',
      label: 'Help Nia search for another historical source.',
      result: 'You and Nia find a shift roster pinned under a cracked glass pane. Elias Vale is listed there even though the payroll ledger no longer shows him.',
      companion: 'Nia: “Good. Two records disagree. That gives us somewhere to work.”',
    },
    {
      id: 'workers',
      label: 'Question the workers with Lewis.',
      result: 'A machine hand remembers Elias clearly, but another swears no one by that name has ever worked this shift.',
      companion: 'Lewis: “Same room. Same day. Two different pasts.”',
    },
    {
      id: 'building',
      label: 'Examine the building before entering.',
      result: 'A loading-bay door appears in the masonry only when you look at it through a brass inspection mirror.',
      companion: 'Mara: “That door is not on the floor plan.”',
    },
  ],
}

export const extraSuccessDecision: ExperienceDecision = {
  id: 'extraSuccess',
  prompt: 'The roll succeeds, and you have one extra success. What do you spend it on?',
  choices: [
    {
      id: 'detail',
      label: 'Notice something everyone else missed.',
      result: 'The ink around Elias Vale is not fading outward. It is being pulled toward a tiny black smear shaped like a doorway.',
    },
    {
      id: 'speed',
      label: 'Finish before someone arrives.',
      result: 'You copy the changing line moments before a foreman enters and removes the ledger from the room.',
    },
    {
      id: 'branch',
      label: 'Learn something useful about the Branch.',
      result: 'The contradiction gets worse near one specific section of the works: the sealed machinery room.',
    },
    {
      id: 'help',
      label: 'Set up another Agent for success.',
      result: 'You spot a notation Nia recognizes, giving her enough context to connect the ledger to a second archival source.',
      companion: 'Nia: “That gives me the date. Three days from now.”',
    },
  ],
}

export const priorityDecision: ExperienceDecision = {
  id: 'priority',
  prompt: 'Elias is supposed to die in an industrial accident three days from now. But the Branch is erasing him now. What matters most?',
  choices: [
    {
      id: 'warn',
      label: 'Warn Elias immediately.',
      result: 'Lewis finds Elias on the floor and pulls him aside. Elias believes you only after his own name disappears from a posted shift list while he is reading it.',
    },
    {
      id: 'anomaly',
      label: 'Find what is altering the Branch.',
      result: 'Mara tracks the strongest contradiction to the sealed machinery room, where the air feels thinner than the rest of the building.',
    },
    {
      id: 'evidence',
      label: 'Recover more evidence before acting.',
      result: 'Nia secures a time card, a roster, and a photograph. Each confirms Elias existed, though the photograph begins losing his face at the edges.',
    },
    {
      id: 'accident',
      label: 'Find the site of the coming accident.',
      result: 'You identify a pressure line running directly beneath the sealed room. The accident and the anomaly are tied to the same place.',
    },
  ],
}

export const threatDecision: ExperienceDecision = {
  id: 'threatResponse',
  prompt: 'The Hollow Shift moves toward Elias. How do you respond?',
  choices: [
    {
      id: 'block',
      label: 'Physically block its path.',
      result: 'You step between Elias and the absence. Lewis braces beside you, adding 1 die to the attempt.',
      companion: 'Lewis: “You are not doing that alone.”',
    },
    {
      id: 'evidence',
      label: 'Use the recovered evidence to identify where it can be stopped.',
      result: 'You compare the records and point to the sealed machinery room as the common anchor. The evidence does not hurt the Hollow Shift. It tells the group where the real action needs to happen.',
      companion: 'Nia: “The records tell us where it is anchored. Now we do something about it.”',
    },
    {
      id: 'draw',
      label: 'Draw it away from Elias.',
      result: 'You force the thing to follow you toward the machinery room, buying Elias time but putting your Echo Ware directly in its path.',
      companion: 'Mara: “Keep moving. We will close behind you.”',
    },
    {
      id: 'study',
      label: 'Study it long enough to find its anchor.',
      result: 'You realize the Hollow Shift is not attached to Elias. It is attached to the contradiction between the records and the sealed room.',
      companion: 'Mara: “Then the records are telling us why this is happening, not fighting it for us.”',
    },
  ],
}

export const echoWareDecision: ExperienceDecision = {
  id: 'echoWareResponse',
  prompt: 'Temporal exposure strains the connection between your Agent and Echo Ware. Two versions of the same life exist in your head at once. What do you do?',
  choices: [
    {
      id: 'anchor',
      label: 'Anchor yourself in your modern Agent identity.',
      result: 'You repeat your own name, the current year, and the reason you came here. The borrowed memories stop crowding out your own.',
    },
    {
      id: 'echo',
      label: 'Let an Echo Ware memory surface for a moment.',
      result: 'A borrowed memory shows you a maintenance key hidden beneath the third engine housing.',
    },
    {
      id: 'evidence',
      label: 'Use the historical evidence to orient yourself.',
      result: 'The copied ledger line gives you one stable fact to hold onto long enough to think clearly.',
    },
    {
      id: 'retreat',
      label: 'Back away and let another Agent take point.',
      result: 'Mara takes the lead while you recover enough control to keep moving.',
      companion: 'Mara: “You are still here. Stay with us.”',
    },
  ],
}

export const resolutionDecision: ExperienceDecision = {
  id: 'resolution',
  prompt: 'You can stabilize the Branch, but not preserve every version of events. What do you do?',
  choices: [
    {
      id: 'save',
      label: 'Save Elias, even if the historical record changes.',
      result: 'You force the Branch to keep Elias present. The accident record changes, but the alteration leaves a visible scar in the archive.',
    },
    {
      id: 'preserve',
      label: 'Preserve the documented event and recover proof that Elias existed.',
      result: 'You restore Elias to the record without preventing the documented accident. His life remains part of history instead of being erased before it ends.',
    },
    {
      id: 'destroy',
      label: 'Destroy the distorted source anchoring the anomaly.',
      result: 'The blackened contradiction collapses. Several records revert at once, though one page is permanently lost.',
    },
    {
      id: 'third',
      label: 'Refuse the apparent choice and use what you learned to force a third solution.',
      result: 'Because the group collected enough contradictions to understand the Branch, you bind the anomaly to the sealed room instead of Elias. The Branch keeps both the documented event and the proof that he existed.',
    },
  ],
}

export function getDiscoveryBridge(session: DiscoverySession) {
  const interest = session.historyInterests[0]

  const interestLines: Record<string, string> = {
    history_industry: 'You picked industry and working life, so this Branch begins in a late-19th-century industrial works.',
    history_crime: 'You picked crime and hidden power, so pay attention to who benefits when a person disappears from the record.',
    history_community: 'You picked community history, so notice how quickly one missing worker changes what everyone around him remembers.',
    history_folklore: 'You picked folklore and unexplained history, so watch the moment when a documentary contradiction becomes physically impossible.',
    history_environment: 'You picked environment and changing landscapes, so pay attention to the building, machinery, and place as evidence.',
    history_disaster: 'You picked disaster and survival, so the coming industrial accident matters as much as the anomaly itself.',
    history_conflict: 'You picked conflict and political change, so watch how authority and records shape whose version of history survives.',
    history_everyday: 'You picked everyday life, so this mission focuses on an ordinary worker whose existence should have been easy to overlook.',
    history_local: 'You picked local and forgotten history, so this mission begins with one missing name in an otherwise ordinary archive.',
    history_other: 'Your interests fall outside the standard list, so use this mission as a demonstration of TCC structure rather than a limit on subject matter.',
  }

  return interestLines[interest] ?? interestLines.history_local
}

export function getSupernaturalDescription(session: DiscoverySession) {
  switch (session.supernaturalPreference) {
    case 'supernatural_minimal':
      return 'At first the anomaly is subtle: a line of ink, a missing face, a door that should not be there.'
    case 'supernatural_balanced':
      return 'The Branch starts grounded, but the impossible becomes visible quickly once the records contradict each other.'
    case 'supernatural_high':
      return 'The history is real, but the Branch does not stay quiet for long. Once the contradiction opens, reality becomes visibly unstable.'
    default:
      return 'The history remains recognizable and important, but something impossible is hiding underneath it.'
  }
}

export function getResearchPrompt(session: DiscoverySession) {
  switch (session.researchPreference) {
    case 'research_full_agency':
      return 'You asked for deeper research. Optional source details are available during the demo.'
    case 'research_mixed':
      return 'You asked for mixed research. The core clues are provided, with optional detail if you want it.'
    case 'research_table_ready':
      return 'You asked for table-ready play. Everything required to continue is provided in the scene.'
    default:
      return 'You were not sure how much research you want. This demo keeps the core material at the table and lets you look closer if you choose.'
  }
}
