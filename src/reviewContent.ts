export type RatingItem = {
  id: string
  label: string
}

export type RatingGroup = {
  id: string
  title: string
  description?: string
  items: RatingItem[]
}

export const reviewerTypes = [
  ['new_player', 'New to tabletop RPGs'],
  ['casual_player', 'Casual player'],
  ['regular_player', 'Regular player'],
  ['veteran_player', 'Veteran player'],
  ['gm', 'GM / DM / game facilitator'],
  ['designer', 'Game designer'],
  ['reviewer', 'Reviewer / critic'],
  ['historian', 'Historian / researcher'],
  ['educator', 'Educator'],
  ['other', 'Other'],
] as const

export const materialsReviewed = [
  ['orientation', 'Level 1 Orientation'],
  ['discovery', 'Level 2 Discovery'],
  ['guided_demo', 'The Missing Name guided demo'],
  ['quick_start', 'Quick Start'],
  ['selected_chapters', 'Selected manuscript chapters'],
  ['full_manuscript', 'Full manuscript'],
  ['playtest', 'Actual playtest session'],
] as const

export const focusModules = [
  ['rules', 'Rules & mechanics'],
  ['inspector', 'Inspector experience'],
  ['history', 'Historical integration'],
  ['adventure', 'Adventure design'],
  ['manuscript', 'Manuscript & layout'],
  ['new_player', 'New-player accessibility'],
  ['veteran', 'Experienced-RPG perspective'],
  ['commercial', 'Commercial / product perspective'],
] as const

export const coreRatingGroups: RatingGroup[] = [
  {
    id: 'premise',
    title: 'The core idea',
    items: [
      { id: 'understand_tcc', label: 'I understand what TCC is.' },
      { id: 'understand_play', label: 'I understand what players actually do during play.' },
      { id: 'history_supernatural_coherent', label: 'Real history and supernatural RPG play feel coherent together.' },
      { id: 'meaningfully_different', label: 'TCC appears meaningfully different from RPGs I already know.' },
      { id: 'curious_to_continue', label: 'The concept makes me curious enough to continue.' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning the game',
    items: [
      { id: 'terminology_clear', label: 'The terminology is understandable.' },
      { id: 'concept_order', label: 'New concepts are introduced in a sensible order.' },
      { id: 'examples_where_needed', label: 'Examples appear where I need them.' },
      { id: 'information_manageable', label: 'The amount of information feels manageable.' },
      { id: 'find_again', label: 'I can find information again after learning it.' },
      { id: 'new_player_can_learn', label: 'A new RPG player could learn this.' },
      { id: 'experienced_can_learn', label: 'An experienced player could learn this without unnecessary explanation.' },
    ],
  },
  {
    id: 'history',
    title: 'Does history actually matter?',
    items: [
      { id: 'history_changes_decisions', label: 'Historical material affects player decisions.' },
      { id: 'research_connected', label: 'Research feels connected to gameplay.' },
      { id: 'sources_as_game_objects', label: 'Historical sources feel like game components rather than reading assignments.' },
      { id: 'supernatural_grows_from_history', label: 'The supernatural story grows from the history instead of sitting on top of it.' },
      { id: 'learn_without_stopping', label: 'I can learn something without the game stopping to teach me.' },
      { id: 'history_treated_carefully', label: 'The historical material appears treated with appropriate care.' },
      { id: 'adapt_to_my_place', label: 'I can imagine adapting TCC to my own city or region.' },
    ],
  },
  {
    id: 'fun',
    title: 'Fun and engagement',
    items: [
      { id: 'wanted_next', label: 'I wanted to know what happened next.' },
      { id: 'meaningful_choices', label: 'The choices felt meaningful.' },
      { id: 'investigation_fun', label: 'Investigation looks enjoyable.' },
      { id: 'history_discovery_fun', label: 'Historical discovery looks enjoyable.' },
      { id: 'social_fun', label: 'Social scenes look enjoyable.' },
      { id: 'danger_fun', label: 'Danger and conflict look enjoyable.' },
      { id: 'supernatural_interest', label: 'The supernatural elements increase my interest.' },
      { id: 'would_play', label: 'I would voluntarily play a full session.' },
    ],
  },
]

export const inspectorRatingGroup: RatingGroup = {
  id: 'inspector',
  title: 'Inspector burden',
  description: 'Complete this if you run games or reviewed the Inspector-facing material.',
  items: [
    { id: 'prep_clear', label: 'I understand what the Inspector prepares.' },
    { id: 'improv_clear', label: 'I understand what the Inspector improvises.' },
    { id: 'research_manageable', label: 'Historical research requirements appear manageable.' },
    { id: 'npc_manageable', label: 'NPC management appears manageable.' },
    { id: 'rules_manageable', label: 'Rules management appears manageable.' },
    { id: 'branch_manageable', label: 'Branch management appears manageable.' },
    { id: 'rules_findable', label: 'I could locate needed rules during play.' },
    { id: 'examples_enough', label: 'The book appears to give the Inspector enough examples.' },
    { id: 'run_without_designer', label: 'I would consider running TCC without the designer present.' },
  ],
}

export const manuscriptRatingGroup: RatingGroup = {
  id: 'manuscript',
  title: 'Book and information design',
  items: [
    { id: 'chapter_order', label: 'Chapter order makes sense.' },
    { id: 'why_material_matters', label: 'Chapters explain why the material matters.' },
    { id: 'concepts_before_use', label: 'Concepts are explained before they are used.' },
    { id: 'examples_frequency', label: 'Examples are frequent enough.' },
    { id: 'examples_not_excessive', label: 'Examples are not excessive.' },
    { id: 'rules_examples_distinct', label: 'Rules and examples are visually distinguishable.' },
    { id: 'reference_findable', label: 'Reference material is easy to locate.' },
    { id: 'tables_help', label: 'Tables improve usability.' },
    { id: 'learn_from_book', label: 'The book works as something to learn from.' },
    { id: 'reference_during_play', label: 'The book works as something to reference during play.' },
    { id: 'print_works', label: 'The material should work in print.' },
    { id: 'digital_works', label: 'The material should work digitally.' },
  ],
}

export const systemItems = [
  'Year Zero dice system',
  'Agent + Echo Form',
  'Echo Roles',
  'Rift Disciplines',
  'Echo Ware',
  'Branch Tear',
  'Rules Levels',
  'Research Modes',
  'Historical-source mechanics',
  'Combat',
  'Temporal / supernatural danger',
  'Post-mission debrief',
] as const

export const systemStatuses = ['Clear', 'Interesting', 'Needs Work', 'Unnecessary', 'I do not understand it yet'] as const

export const redFlags = [
  'Confusing',
  'Contradictory',
  'Unnecessarily complicated',
  'Too derivative',
  'Historically questionable',
  'Tonally inappropriate',
  'Too much like homework',
  'Too difficult to run',
  'Too slow',
  'Too lethal',
  'Not dangerous enough',
  'Missing an obvious rule',
  'Other',
] as const

export const readinessOptions = [
  'Not ready for outside playtesting',
  'Ready for tightly controlled playtesting',
  'Ready for broader playtesting',
  'Nearly publication-ready',
  'I do not have enough information',
] as const
