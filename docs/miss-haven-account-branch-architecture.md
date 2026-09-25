# Miss Haven Account + Branch Architecture

Status: working product architecture for TCC Miss Haven.

## Identity

- Minimum signup age: 13+.
- Age gate happens before name/email collection.
- Store age band rather than full birth date unless later legal review requires more: 13-17 or 18+.
- Account fields: account name, verified email, role.
- Roles: Agent or Inspector.
- System assigns a permanent public-facing TCC ID such as AGT-XXXX or INS-XXXX.
- TCC ID is a username/identity label, not an authentication secret.
- Login uses verified email / magic-link style authentication.

## Branches and Tables

- Inspector creates a Branch/table record.
- Branch receives a separate join code.
- Agents join the Branch using the Branch code while logged into their own accounts.
- A Branch stores assignment context such as location, era, Rules Level, Echo Ware, and campaign state.
- Agent and Inspector identities remain separate from Branch codes.

## Miss Haven Debrief Flow

1. Agent opens the Branch after a session.
2. Miss Haven already knows the Branch context.
3. Agent chooses Quick, Standard, or Deep debrief.
4. Agent gives their account first by text or voice-to-text.
5. Miss Haven asks only useful follow-up questions.
6. Agent may answer, say they do not know/remember, or decline.
7. A Player Record is created.
8. Inspector-only context remains in a separate Inspector Record.
9. Community Archive copy is separate and opt-in.

## Optional Follow-Up by Email

- Miss Haven may send an optional clarification request to an Agent or Inspector after a debrief.
- Email should contain only a neutral notification and secure link, not sensitive debrief content.
- Example: "Miss Haven has one optional follow-up for Branch BR-XXXX."
- Replies are optional and do not block play.
- New Agent updates notify the Branch Inspector by email with a secure link to review the update.

## Inspector Conference Room

Each Branch has a private Inspector + Miss Haven workspace.

The conference room is not visible to Agents during active play.

It can contain:
- Inspector notes
- Agent-vs-Inspector discrepancies
- Hidden facts
- Faction/threat activity
- Unresolved questions
- Future hooks
- OPEN / PROBE / SEALED classifications
- Miss Haven suggestions for follow-up questions
- Record-reconciliation notes

Miss Haven may help the Inspector compare what Agents remember with what actually occurred in the Branch record without revealing hidden facts to Agents prematurely.

## Sealed Material

SEALED must be split into two classes.

### Campaign-Secret SEALED

Examples:
- hidden antagonist plans
- unrevealed facts
- behind-the-scenes causation
- alternate interpretations the Inspector was tracking
- future hooks and campaign secrets

These may be released after the campaign or Branch is formally closed.

### Private SEALED

Examples:
- player-identifying information
- safety notes
- personal disclosures
- information supplied privately by one participant
- moderation or account-security notes

Private SEALED material never auto-releases at campaign end. It remains private unless the person who supplied it explicitly authorizes release.

## Campaign Closeout / Post-Campaign Archive

When the Inspector closes a campaign or Branch:

1. Miss Haven prepares a closeout review.
2. Inspector reviews Campaign-Secret SEALED entries.
3. Inspector chooses which campaign-secret entries are safe and appropriate to release.
4. Released material becomes part of the Post-Campaign Archive.
5. Agents can revisit the Branch and read the behind-the-scenes record, including previously hidden campaign facts and Inspector commentary.
6. Private SEALED material remains excluded.

This creates a director-commentary style historical archive without exposing private player information.

## Community Archive

- Community contribution is always opt-in.
- Completing a debrief never publishes anything.
- Player-identifying information is omitted from community copies by default.
- Inspector-only and Private SEALED material is never included.
- For 13-17 accounts, public/community submission remains disabled until youth/privacy rules receive legal review.

## V1 Build Boundary

Build now:
- account architecture
- role selection
- TCC IDs
- Branch membership
- Miss Haven debrief records
- Inspector notifications
- Inspector Conference Room structure
- OPEN / PROBE / SEALED handling
- campaign-closeout release workflow

Do not build yet:
- public community archive publishing
- reward/currency economy
- social profiles
- public messaging between users
- complex moderation/community features
