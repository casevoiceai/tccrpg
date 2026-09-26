# TCC Reviewer + Playtest Portal — Build 2 Canonical Specification

Status: implementation build

## Purpose

Build 2 replaces the `/experience` placeholder with a controlled 15–20 minute guided TCC Chronicle called **The Missing Name**.

The demo must let one visitor experience a five-person TCC table without requiring four other humans:

- 1 Inspector
- 3 simulated Agents
- 1 visitor-controlled Agent

The visitor makes meaningful choices while the rest of the table advances through authored material.

## Core rules

- The experience is deterministic and authored.
- Build 2 does not use a freeform AI GM.
- The underlying scenario stays standardized so visitor behavior can be compared later.
- Level 2 Discovery answers personalize framing and explanation, not the core outcome structure.
- Historical evidence must matter mechanically.
- The demo should expose only the amount of rules needed to understand the current scene.
- No email, account, or remote database is required.

## Scenario

**The Missing Name**

A local archive has two apparently authentic 1894 employee ledgers. One contains a worker named Elias Vale. The other does not. Elias is supposed to die in an industrial accident three days later, but the Branch is already erasing him from records, photographs, and memory.

The Agents enter the Branch to discover why.

## Visitor decisions

The demo contains six meaningful in-world decisions:

1. First move at the works.
2. How to spend an extra Year Zero success.
3. What to prioritize once Elias is being erased.
4. How to respond to the Hollow Shift.
5. How to react to Echo Ware exposure.
6. How to resolve the Branch.

## Systems demonstrated

- Agent + Echo Form
- Inspector role
- historical evidence
- Year Zero dice pool
- extra successes
- Agent cooperation
- supernatural / temporal threat
- Echo Ware
- consequential choice
- Branch resolution
- return to the modern world
- post-mission debrief

## Personalization

Discovery data may alter:

- the sentence explaining why this scenario is relevant to the visitor's historical interests
- how quickly the supernatural layer is described
- whether optional source detail is highlighted
- how research involvement is framed

Discovery data must not generate a completely different adventure.

## Historical source interaction

The ledger scene provides all required information in readable text. Visitors who want more detail can choose **Look closer at the source**.

No clue depends on deciphering a small image or inaccessible scan.

## Year Zero demonstration

The demo uses a fixed example roll:

`Observe + Investigation = 5d6`

Dice: `6, 6, 4, 2, 1`

Result: success plus one extra success.

The visitor chooses how to spend the extra success.

## Temporal threat

**The Hollow Shift** is a human-shaped absence that attacks historical continuity.

Where it passes:

- names disappear
- photographs lose people
- records change
- memories begin to follow

## Echo Ware demonstration

The visitor receives `Echo Ware +1` after temporal exposure. The site explains only that the borrowed historical body is wearing under the strain while the Agent remains themselves.

## Debrief

Before any signup path, ask:

1. What drove your choices most?
2. Did historical evidence feel like part of the game?
3. How do you feel now about research affecting gameplay?
4. Would you play a full TCC session?

Build 2 stores these answers only in the visitor's browser.

## Completion actions

After the demo, show separate future paths:

- I want to playtest TCC
- I’m interested in being an Inspector
- Tell me when TCC releases
- No thanks, show me the rest of the website

Build 2 does not collect contact information yet. Those forms belong to Build 3.

## Accessibility

- full keyboard access
- visible focus states
- readable source transcript
- no required animation
- reduced-motion setting remains honored
- no clue conveyed through color alone
- large-text and high-contrast controls remain available

## Persistence

Guided Chronicle progress and choices are stored in browser `localStorage` under a versioned key.

The visitor can leave and resume. A Restart control clears only the guided Chronicle state after confirmation.

## Build 2 definition of done

Build 2 passes when a visitor can:

1. Finish Level 2 Discovery.
2. Enter The Missing Name.
3. See the Inspector, three simulated Agents, and their own Agent position.
4. Make all six decisions.
5. See the Year Zero roll and cooperation example.
6. Encounter Echo Ware.
7. Reach a resolution based on the final choice.
8. Complete the post-mission debrief.
9. Reach the separate next-step calls to action.
10. Leave and resume without losing progress.
