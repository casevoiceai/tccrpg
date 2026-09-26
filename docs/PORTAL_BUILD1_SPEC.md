# TCC Reviewer + Playtest Portal — Build 1 Canonical Specification

Status: locked for implementation

## Purpose

Build 1 must let a visitor who knows nothing about Time-Crawl Chronicles:

1. Understand what TCC is.
2. Understand enough of the core structure to decide whether it interests them.
3. Tell us what kind of history and game experience interests them.
4. Receive a personalized TCC profile that leads naturally into the future guided demo.

The portal is simultaneously onboarding, concept testing, market research, usability testing, and a future playtester-recruitment funnel. It is not primarily a marketing homepage.

## Build 1 flow

Arrival → Level 1 Orientation → Level 2 Discovery → TCC Profile → Level 3 placeholder

### Routes

- `/` — Level 1 Orientation
- `/discover` — Level 2 Discovery
- `/profile` — generated TCC profile
- `/experience` — Build 2 placeholder
- `/review` — reviewer-room placeholder
- `/playtest` — playtest-recruitment placeholder
- `/privacy` — Build 1 privacy explanation

## Level 1 Orientation

The orientation teaches only the concepts a first-time visitor needs:

- TCC is a universal local-history tabletop RPG.
- Real local history becomes the setting.
- The modern identity is the Agent.
- The historical vessel is the Echo Form.
- A Branch is an unstable historical reality.
- Players investigate, explore, use evidence, make choices, confront threats, and return home.
- Real historical evidence can affect play.
- Tables choose their stakes through three Rules Levels.
- The Game Master is called the Inspector.

Do not teach detailed combat, the full skill list, Rift Disciplines, Echo Ware values, Branch Tear boxes, factions, Source Engine details, Miss Haven, initiative, specialties, or full character creation in Level 1.

## Level 2 Discovery backbone

Eight questions are locked for the first usability build:

1. Historical interests, choose up to three.
2. Preferred activity inside history.
3. History/supernatural balance.
4. Desired amount of real historical research.
5. Reaction to research being connected to recovery.
6. Preferred danger level.
7. Tabletop RPG experience.
8. Agent versus Inspector interest.

Each question follows:

Question → visitor answer → short TCC-specific response → continue

Discovery must feel conversational rather than like a survey.

## Canonical tags

### History

- `history_local`
- `history_industry`
- `history_crime`
- `history_conflict`
- `history_community`
- `history_disaster`
- `history_environment`
- `history_everyday`
- `history_folklore`
- `history_other`

### Play

- `play_investigate`
- `play_explore`
- `play_social`
- `play_evidence`
- `play_combat`
- `play_protect`
- `play_truth`
- `play_mixed`

### Supernatural tone

- `supernatural_minimal`
- `supernatural_history_first`
- `supernatural_balanced`
- `supernatural_high`

### Research

- `research_table_ready`
- `research_mixed`
- `research_full_agency`
- `research_unsure`

### Research-recovery reaction

- `recovery_positive`
- `recovery_optional`
- `recovery_negative`
- `recovery_uncertain`

### Stakes

- `risk_low`
- `risk_recoverable`
- `risk_permanent`
- `risk_lethal`

### Experience

- `experience_none`
- `experience_beginner`
- `experience_regular`
- `experience_veteran`
- `experience_gm`
- `experience_professional`

### Role

- `role_agent`
- `role_inspector`
- `role_either`
- `role_unsure`

## Profile rules

The profile is descriptive, not a personality test. Do not invent titles such as “The Arcane Historical Investigator.”

The profile reports:

- history interests
- preferred play activity
- supernatural tone
- research preference
- consequence preference
- RPG experience
- preferred seat

The generated explanation must use approved deterministic text blocks. Build 1 uses no AI-generated profile copy.

## Persistence

Build 1 stores Discovery state in browser `localStorage` only.

Required behavior:

- save after every answer
- survive page refresh
- survive closing and reopening the browser
- support Back without losing answers
- allow changing answers
- allow Start Over only after confirmation

No name, email, account, or remote database is required for Build 1.

## AI boundary

Build 1 uses zero AI services.

Later guided experiences may use AI only within authored boundaries. AI must not invent canon, mechanics, historical facts, arbitrary consequences, or unlimited freeform scenes.

## Cloudflare architecture lock

Current stack:

- React
- Vite
- TypeScript
- React Router
- Cloudflare Pages

Build 1 must not introduce Vercel or Supabase.

Future persistence should use Cloudflare-native infrastructure unless the architecture is intentionally reconsidered later. Likely candidates are Cloudflare Workers and D1 when remote testing data becomes necessary.

## Accessibility requirements

Accessibility is part of MVP acceptance, not later polish.

Required:

- non-white default background
- readable base text size
- larger-text control
- higher-contrast control
- reduced-motion control
- full keyboard navigation
- visible focus states
- semantic labels and selection state
- browser zoom must remain usable
- future audio/video must include captions and transcripts
- future historical artifacts must always include readable text equivalents

## Build 1 acceptance test

Build 1 passes when a fresh visitor can:

1. Open the portal.
2. Understand the TCC premise without outside explanation.
3. Complete all eight Discovery questions.
4. Go backward without losing answers.
5. Reload without losing progress.
6. Receive a profile that reflects the selected answers.
7. Use the flow with keyboard navigation and larger text.
8. Reach the Level 3 handoff without creating an account.

After Orientation, a visitor should be able to explain:

- what TCC is
- what an Agent is
- what an Echo Form is
- what a Branch is
- what an Inspector does
- why real history matters

## Immediate failure conditions

Revise before visual polish if visitors believe:

- TCC is only a Carbondale game
- players permanently play historical characters
- rewriting real history is the main objective
- historical research is mandatory homework
- Agent and Echo Form are the same thing
- Inspector is a player class
- TCC is primarily a classroom product
- the site never explains what players actually do

## Parking lot

Not Build 1:

- Miss Haven
- full character creation
- Quick Start download
- reviewer dashboard
- email signup system
- playtester application
- authentication
- community accounts
- multiplayer
- campaign management
- school edition
- store or merch
- achievements
- elaborate animation
- freeform AI GM

## Build sequence

1. Build 1 — Orientation → Discovery → Profile
2. Build 2 — guided 15–20 minute Chronicle
3. Build 3 — feedback, playtest applications, and Cloudflare-native persistence
4. Build 4 — reviewer room and standardized critique rubric
5. Build 5 — visual/audio polish
