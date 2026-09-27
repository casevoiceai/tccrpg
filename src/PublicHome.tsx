import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { track } from './analytics'

const fullLogo = '/time-crawl-chronicles-logo.svg'

export default function PublicHome() {
  useEffect(() => {
    track('orientation_started')
  }, [])

  return (
    <main className="orientation-page">
      <section className="orientation-hero story-hero" aria-labelledby="hero-heading">
        <div className="orientation-hero-copy">
          <div className="hero-title-lockup" aria-label="Time-Crawl Chronicles, Tabletop Roleplaying Game">
            <p className="hero-title-logo">Time-Crawl Chronicles</p>
            <p className="hero-title-subtitle">Tabletop Roleplaying Game</p>
          </div>
          <h1 id="hero-heading">Real local history becomes mystery, adventure, and storytelling.</h1>
          <p className="lede"><strong>Players dig into the historical record, follow contradictions, and investigate the things history never fully answered.</strong></p>
          <p className="lede"><strong>Every TCC adventure begins in a real place, with its real history: its people, industries, neighborhoods, institutions, folklore, conflicts, and everyday life.</strong></p>
          <p className="lede"><strong>TCC plays with the unknowns of history, not the facts themselves.</strong></p>
          <p className="lede">Documented people, events, dates, places, and outcomes remain what the historical sources support. TCC builds its fictional mysteries around those facts, especially in the gaps, contradictions, unanswered questions, and stories the surviving record leaves behind. Players do not replace or inhabit documented historical figures. You cannot step into Abraham Lincoln’s body or rewrite a real person’s life. The fictional story plays alongside the historical record, not instead of it.</p>
          <p className="lede">The Game Master, called the <strong>Inspector</strong>, brings real historical material to the table: photographs, maps, newspapers, directories, ledgers, minutes, and other surviving records from the community. Those sources help shape the mysteries, locations, puzzles, and threats the players encounter.</p>
          <p className="lede">The players, called <strong>Agents</strong>, investigate what is happening. The sources are not scenery. They are evidence.</p>
          <p className="lede">A map might reveal a route nobody knew existed. A directory might put a name at the center of the case. A newspaper might contradict a witness. A ledger might give the Agents the leverage they need to get through a locked door or force someone to start talking.</p>
          <p className="lede">In research-heavy play, the group can go further. During <strong>Session Zero</strong> and between later sessions, players may search for additional real-world sources and bring what they find back to the table. Those discoveries can change the investigation and influence where the adventure goes next.</p>
          <p className="lede"><strong>The sources are real. The mystery built around them belongs to the game.</strong></p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-tcc-works">See how play begins</a>
            <Link className="button button-secondary" to="/experience">Enter The Missing Name</Link>
          </div>
        </div>
        <div className="orientation-hero-art" aria-hidden="true">
          <img src={fullLogo} alt="" />
        </div>
      </section>

      <section className="orientation-section" id="how-tcc-works">
        <div>
          <p className="eyebrow">The table opens</p>
          <h2>Someone describes the room. You decide what your character does.</h2>
          <p>The person running the game tells you what your character can see, hear, and know. They portray the people and threats around you, answer questions about the world, and decide when an uncertain action needs a roll.</p>
          <p>TCC calls that person the <strong>Inspector</strong>.</p>
          <div className="play-example">
            <p><strong>Inspector:</strong> “The records room smells like coal smoke. A locked cabinet sits against the far wall. You hear footsteps in the hall. What do you do?”</p>
            <p><strong>Player:</strong> “I check the cabinet for a label before I touch it.”</p>
            <p>The label is plainly visible. The Inspector gives the information. No roll is needed.</p>
            <p><strong>Another player:</strong> “I force the cabinet open before whoever is in the hall gets here.”</p>
            <p>Now the timing matters. Failure would change the scene, so the dice come out.</p>
          </div>
          <p>TCC uses pools of six-sided dice when an action is uncertain and meaningful. <strong>One 6 succeeds. Extra 6s improve the result. Failure changes the situation instead of stopping the game.</strong></p>
          <p>The modern-day character you carry from one case to the next is called an <strong>Agent</strong>. You decide what that Agent says, investigates, risks, protects, refuses, or attempts.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">The evidence is real</p>
          <h2>The map on the table is not flavor text. It can change the plan.</h2>
          <p>In TCC, historical research is brought into play. The Inspector can prepare verified source material for the case: maps, photographs, newspapers, directories, ledgers, minutes, memorial records, industrial records, and other sources the locality actually left behind.</p>
          <p>Depending on the Research Mode, players can also follow real-world leads between sessions and bring new sources back to the table.</p>
          <p>A map can reveal a route. A photograph can expose a contradiction. A directory can identify the person the group needs to find. A newspaper can show that somebody's story does not match the record.</p>
          <p>The source does not dictate the answer. It changes what the players know, what they can try, and what leverage they have.</p>
          <div className="history-boundary-grid">
            <article><h3>What the sources support</h3><p>That is the real historical record the case must respect.</p></article>
            <article><h3>What the game invents</h3><p>That is the fictional case built around the history for play.</p></article>
            <article><h3>What people believe</h3><p>A witness, source, community, or character may be right, wrong, mistaken, frightened, or lying.</p></article>
          </div>
          <p>Once that boundary is clear, TCC can build a fictional historical reality around the verified past. TCC calls that reality a <strong>Branch</strong>.</p>
          <p>A supernatural event can be completely real inside a Branch without being presented as real-world history.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">You cross over</p>
          <h2>You keep your memories. You do not keep your body.</h2>
          <div className="cold-open compact-cold-open">
            <p>Yesterday, your character was sixty-eight years old.</p>
            <p>Tonight, they open their eyes in 1897 with a young laborer's hands and a foreman calling them by a name that belongs to this assignment.</p>
          </div>
          <p>The person behind those eyes is still the same continuing modern-day Agent. Their memories, judgment, relationships, Skills, and long-term choices carry from one Chronicle to another.</p>
          <p>The historical body and local identity used inside the Branch is called <strong>Echo Ware</strong>. It is fictional and period-compatible. The Agent does not replace, possess, or secretly inhabit a documented historical person.</p>
          <p>Another case may require completely different Echo Ware. The body changes with the assignment. The Agent is the person who returns.</p>
        </div>
      </section>
      <section className="orientation-section">
        <div>
          <p className="eyebrow">The case is waiting</p>
          <h2>Friday night does not begin with a research assignment.</h2>
          <p>For the baseline version of TCC, the Inspector arrives with the case prepared. The verified sources needed for play are ready. The historical boundary is clear. The active problem is in motion. The available Echo Ware is ready to choose.</p>
          <p>This is a <strong>Ready Case</strong>.</p>
          <p>The group receives the briefing, chooses from the supplied assignment options, enters the Branch, and plays a complete RPG session. No outside research is required before the table can begin.</p>
          <p>Groups that enjoy research can go farther. The Inspector can offer real-world leads between sessions, and players may search online collections, libraries, archives, historical societies, field locations, newspapers, interviews, maps, photographs, and other appropriate sources.</p>
          <p>At the deepest research setting, the players can help build the Chronicle by conducting real-world research and submitting what they find. The Inspector still verifies what those sources actually support before that material becomes part of the case.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">Before the first scene</p>
          <h2>The table agrees on what can be true, how hard it can hurt, and where the evidence comes from.</h2>
          <p>One group may want a grounded historical mystery where every strange event might still have an ordinary explanation. Another may want spirits, monsters, magic, and other impossible things to be objectively real inside the Branch.</p>
          <p>One group may want forgiving consequences. Another may deliberately choose lasting or potentially lethal stakes.</p>
          <p>One group may want every historical source ready at the table. Another may want to spend the week between sessions chasing a lead through an archive.</p>
          <div className="setting-grid">
            <article>
              <h3>Campaign Mode</h3>
              <p>Answers one question: <strong>What kind of reality can be true?</strong> A case can stay historically plausible, leave the supernatural uncertain, or make supernatural forces objectively real.</p>
            </article>
            <article>
              <h3>Rules Level</h3>
              <p>Answers: <strong>How much danger and mechanical detail does the table want?</strong> It can range from a forgiving learning game to permanent and potentially lethal stakes.</p>
            </article>
            <article>
              <h3>Research Mode</h3>
              <p>Answers: <strong>Where does the historical evidence come from?</strong> The case can arrive fully prepared, include optional guided research, or be built through deeper player research.</p>
            </article>
          </div>
          <p>These settings are independent. A grounded case can still be deadly. A supernatural campaign can use forgiving rules. A Ready Case can be played at any Rules Level.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">Change the place</p>
          <h2>The rules stay. The history does not.</h2>
          <p>A mining town leaves behind one kind of record. A port city leaves another. A rural county, industrial neighborhood, river community, or courthouse town carries different institutions, conflicts, industries, folklore, geography, and people into play.</p>
          <p>A TCC Chronicle is rebuilt around the locality being played rather than dropping the same fictional lore onto every place.</p>
          <p><strong>Carbondale, Pennsylvania</strong> is the first worked TCC locality because it gives the project a real community and real source material against which the system can be tested. It is the first implementation of TCC, not the definition of the game.</p>
        </div>
      </section>

      <section className="orientation-cta">
        <p className="eyebrow">A case is already open</p>
        <h2>The Missing Name</h2>
        <p>Two copies of the same 1894 employee ledger lie side by side. One names a freight worker named Elias Vale. The other does not. Both appear genuine.</p>
        <p>Then old photographs begin showing a sealed section of the works that does not exist on the surviving plans.</p>
        <p>The case is fictional, but it demonstrates the actual TCC loop: evidence at the table, free player decisions, dice when uncertainty matters, and a Branch that reacts to what the group discovers.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/experience">Enter The Missing Name</Link>
          <Link className="button button-secondary" to="/discover">Take the development survey</Link>
          <Link className="button button-secondary" to="/playtest">Apply to playtest</Link>
        </div>
      </section>
    </main>
  )
}
