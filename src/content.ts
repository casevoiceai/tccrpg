export type QuestionId =
  | 'historyInterests'
  | 'playPreference'
  | 'supernaturalPreference'
  | 'researchPreference'
  | 'researchRecoveryReaction'
  | 'riskPreference'
  | 'rpgExperience'
  | 'rolePreference'

export type DiscoveryChoice = {
  tag: string
  label: string
  helper?: string
  response: string
}

export type DiscoveryQuestion = {
  id: QuestionId
  title: string
  helper?: string
  selection: 'single' | 'multi'
  maxSelections?: number
  choices: DiscoveryChoice[]
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: 'historyInterests',
    title: 'What kinds of history pull you in?',
    helper: 'Choose up to three.',
    selection: 'multi',
    maxSelections: 3,
    choices: [
      {
        tag: 'history_local',
        label: 'Local legends and forgotten stories',
        response:
          'Small stories can hide enormous mysteries. TCC is built so a forgotten building, neighborhood story, local legend, or half-remembered event can become the center of an entire Chronicle.',
      },
      {
        tag: 'history_industry',
        label: 'Industry, labor, and working life',
        response:
          'TCC can put you inside mines, mills, factories, company towns, strikes, disasters, and the lives of the people whose work shaped a community.',
      },
      {
        tag: 'history_crime',
        label: 'Crime, corruption, and hidden power',
        response:
          'Historical records rarely tell the whole story. TCC can turn old crimes, corruption, cover-ups, and struggles for power into investigations where evidence matters.',
      },
      {
        tag: 'history_conflict',
        label: 'War, conflict, and political change',
        response:
          'Political change can become personal very quickly. TCC can explore how major conflicts affect ordinary people, institutions, neighborhoods, and individual choices.',
      },
      {
        tag: 'history_community',
        label: 'Immigration and community history',
        response:
          'TCC can follow how communities form, change, clash, survive, and leave their mark on a place.',
      },
      {
        tag: 'history_disaster',
        label: 'Disaster and survival',
        response:
          'Fires, floods, explosions, epidemics, collapses, and other historical disasters can create some of TCC’s most intense Branches.',
      },
      {
        tag: 'history_environment',
        label: 'Environment and changing landscapes',
        response:
          'A river changing course, a mine opening, a forest disappearing, or an industry poisoning the land can all become part of the historical mystery.',
      },
      {
        tag: 'history_everyday',
        label: 'Everyday life in another era',
        response:
          'History does not have to mean famous battles or famous people. Sometimes the most interesting question is simply: what was it like to live here then?',
      },
      {
        tag: 'history_folklore',
        label: 'Folklore, strange events, and unexplained history',
        response:
          'TCC lives in the space where documented history meets the strange stories people told about it.',
      },
      {
        tag: 'history_other',
        label: 'Something else',
        response:
          'Good. TCC is meant to work with the history that matters to a particular place, not with a fixed list of approved subjects.',
      },
    ],
  },
  {
    id: 'playPreference',
    title: 'If you could step into that history, what would you most want to do?',
    selection: 'single',
    choices: [
      {
        tag: 'play_investigate',
        label: 'Investigate a mystery',
        response:
          'Then you are already close to the heart of TCC. Players gather information, compare evidence, question people, and decide what they believe is happening.',
      },
      {
        tag: 'play_explore',
        label: 'Explore a historical place',
        response:
          'Places matter in TCC. A mine, mansion, street, forest, hospital, courthouse, or factory can become almost a character of its own.',
      },
      {
        tag: 'play_social',
        label: 'Talk to people from the period',
        response:
          'Historical people are not just information dispensers. They have motives, fears, loyalties, prejudices, secrets, and incomplete knowledge.',
      },
      {
        tag: 'play_evidence',
        label: 'Solve puzzles and interpret evidence',
        response:
          'TCC can turn maps, newspapers, photographs, directories, records, and physical clues into things the players actually use.',
      },
      {
        tag: 'play_combat',
        label: 'Fight something dangerous',
        response:
          'TCC has danger and combat, but fighting is only one tool. Sometimes the threat is a person. Sometimes it is supernatural. Sometimes the threat is the Branch itself.',
      },
      {
        tag: 'play_protect',
        label: 'Protect someone or something',
        response:
          'Some Chronicles are not about defeating an enemy. They are about preserving a person, object, truth, place, or historical outcome long enough to get home.',
      },
      {
        tag: 'play_truth',
        label: 'Discover what really happened',
        response:
          'That is one of TCC’s core pleasures: figuring out what the records say, what people believed, and what is actually happening inside the Branch.',
      },
      {
        tag: 'play_mixed',
        label: 'Give me a mixture',
        response:
          'That is probably the most typical TCC experience. Investigation, exploration, roleplay, evidence, danger, and supernatural conflict can all appear in the same Chronicle.',
      },
    ],
  },
  {
    id: 'supernaturalPreference',
    title: 'How closely should the adventure stay tied to documented history?',
    selection: 'single',
    choices: [
      {
        tag: 'supernatural_minimal',
        label: 'Mostly factual',
        helper: 'Real people, places, and events. Very little supernatural material.',
        response:
          'You would probably enjoy a Chronicle where the mystery grows directly from historical evidence and the supernatural stays subtle.',
      },
      {
        tag: 'supernatural_history_first',
        label: 'History first',
        helper: 'The historical reality dominates, but something strange is hidden underneath.',
        response:
          'This is close to TCC’s default tone. The history remains recognizable and important, but something impossible is hiding inside it.',
      },
      {
        tag: 'supernatural_balanced',
        label: 'Balanced',
        helper: 'History and supernatural conflict matter about equally.',
        response:
          'Then the Branch can begin historically grounded and gradually reveal a much larger supernatural problem.',
      },
      {
        tag: 'supernatural_high',
        label: 'History is the doorway',
        helper: 'Start with real history, then let the supernatural side become much larger.',
        response:
          'You are giving the Branch permission to get strange. The historical event becomes the foundation, but not necessarily the limit.',
      },
    ],
  },
  {
    id: 'researchPreference',
    title: 'How much real historical research sounds fun to you?',
    selection: 'single',
    choices: [
      {
        tag: 'research_table_ready',
        label: 'Give me everything I need at the table.',
        response:
          'TCC supports that. A Table-Ready Chronicle can provide the material needed to play without sending anyone home with homework.',
      },
      {
        tag: 'research_mixed',
        label: 'Give me some material, but let me investigate a little.',
        response:
          'That fits TCC’s Mixed approach. The Inspector supplies the core material, while interested players can dig further.',
      },
      {
        tag: 'research_full_agency',
        label: 'I would enjoy finding real historical sources myself.',
        response:
          'TCC can support that too. Players can use libraries, museums, archives, historical societies, maps, newspapers, and other real sources as part of play.',
      },
      {
        tag: 'research_unsure',
        label: 'I honestly do not know yet.',
        response:
          'That is exactly why TCC supports different Research Modes. You should not have to commit to homework before you know whether the research is actually fun.',
      },
    ],
  },
  {
    id: 'researchRecoveryReaction',
    title: 'What is your immediate reaction?',
    helper:
      'In some versions of TCC, a character can suffer serious temporal consequences inside a historical Branch. One way to recover from certain consequences is by completing historical research connected to that Branch.',
    selection: 'single',
    choices: [
      {
        tag: 'recovery_positive',
        label: 'That sounds like part of the game.',
        response:
          'That is the intended upside: research becomes something that matters mechanically instead of just background reading.',
      },
      {
        tag: 'recovery_optional',
        label: 'Interesting, but I would want it optional.',
        response:
          'That is useful feedback. TCC is already being designed so tables can use different levels of research involvement.',
      },
      {
        tag: 'recovery_negative',
        label: 'That sounds too much like homework.',
        response:
          'That is exactly the risk we are testing. If a learning mechanic stops feeling like play, it is not doing its job.',
      },
      {
        tag: 'recovery_uncertain',
        label: 'I need to experience it before deciding.',
        response:
          'Fair. Some mechanics are almost impossible to judge from a paragraph. We will let the actual play experience do some of the explaining.',
      },
    ],
  },
  {
    id: 'riskPreference',
    title: 'How dangerous would you want your TCC game to be?',
    selection: 'single',
    choices: [
      {
        tag: 'risk_low',
        label: 'Exploration first',
        helper: 'I want mystery and adventure without worrying much about permanent consequences.',
        response:
          'TCC can be played that way. The game does not require every table to want permanent consequences.',
      },
      {
        tag: 'risk_recoverable',
        label: 'Consequences, but recovery',
        helper: 'Bad things should matter, but the game should usually give me a way back.',
        response:
          'That creates tension without making every serious mistake final.',
      },
      {
        tag: 'risk_permanent',
        label: 'Serious stakes',
        helper: 'I want consequences that can permanently change what my character can do.',
        response:
          'Then consequences can become part of the long-term story instead of disappearing after a rest.',
      },
      {
        tag: 'risk_lethal',
        label: 'Lethal stakes',
        helper: 'If everyone agrees to it, I am comfortable with a game where a character can actually be lost.',
        response:
          'TCC can support lethal stakes, but they should never arrive as a surprise. The table has to know what kind of game it agreed to play.',
      },
    ],
  },
  {
    id: 'rpgExperience',
    title: 'What is your tabletop RPG experience?',
    selection: 'single',
    choices: [
      {
        tag: 'experience_none',
        label: 'I have never played one.',
        response:
          'Good. TCC is being designed so you should not need twenty years of RPG experience to understand what is happening.',
      },
      {
        tag: 'experience_beginner',
        label: 'I have played a few times.',
        response:
          'You know enough to recognize the basics without necessarily having every RPG convention burned into your brain.',
      },
      {
        tag: 'experience_regular',
        label: 'I play regularly.',
        response:
          'You will probably recognize some familiar structures while seeing where TCC deliberately does things differently.',
      },
      {
        tag: 'experience_veteran',
        label: 'I have played for years.',
        response:
          'You have enough experience to notice where the game fights against established RPG habits as well as where those habits help.',
      },
      {
        tag: 'experience_gm',
        label: 'I regularly run games as a GM or DM.',
        response:
          'Your perspective is especially useful. TCC is trying to reduce the amount of historical preparation and cognitive load placed on the Inspector.',
      },
      {
        tag: 'experience_professional',
        label: 'I design, review, or professionally work with tabletop games.',
        response:
          'Then we especially want you to challenge the structure rather than just the premise. If something is unclear, unnecessary, derivative, overloaded, or missing, that is useful information.',
      },
    ],
  },
  {
    id: 'rolePreference',
    title: 'Which role sounds more interesting?',
    selection: 'single',
    choices: [
      {
        tag: 'role_agent',
        label: 'Agent',
        helper: 'I want to enter the Branch and make decisions inside the story.',
        response:
          'Good. The short experience coming next will put you directly into an Agent’s seat.',
      },
      {
        tag: 'role_inspector',
        label: 'Inspector',
        helper: 'I am more interested in running the Chronicle for the group.',
        response:
          'We will still put you in the Agent seat for the short demo, but we will also point out a few things the Inspector is managing behind the scenes.',
      },
      {
        tag: 'role_either',
        label: 'Either one',
        helper: 'Both sound interesting.',
        response:
          'The demo will show you the Agent side first. Later we can show what the same scene looks like from the Inspector’s side.',
      },
      {
        tag: 'role_unsure',
        label: 'I have no idea yet',
        helper: 'Show me the game first.',
        response:
          'Then the demo gets to do its job before you have to decide.',
      },
    ],
  },
]

export const labelForTag = new Map(
  discoveryQuestions.flatMap((question) =>
    question.choices.map((choice) => [choice.tag, choice.label] as const),
  ),
)
