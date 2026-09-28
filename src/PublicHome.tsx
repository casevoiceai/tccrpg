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
        <div className="hero-centered-header">
          <div className="hero-title-lockup" aria-label="Time Crawl Chronicles, Tabletop Roleplaying Game">
            <p className="hero-title-logo">Time Crawl Chronicles</p>
            <p className="hero-title-subtitle">Tabletop Roleplaying Game</p>
          </div>
          <h1 id="hero-heading">Real local history becomes mystery, adventure, and storytelling.</h1>
        </div>
        <div className="orientation-hero-copy">
          <p className="lede"><strong>Players dig into the historical record, follow contradictions, and investigate the things history never fully answered.</strong></p>
          <p className="lede hero-adventure-lead"><strong>Every TCC adventure begins in a real place, with its real history: its people, industries, neighborhoods, institutions, folklore, conflicts, and everyday life.</strong></p>
          <p className="lede hero-hairline"><strong>TCC plays with the unknowns of history, not the facts themselves.</strong></p>
          <p className="lede">Documented people, events, dates, places, and outcomes remain what the historical sources support. TCC builds its fictional mysteries around those facts, especially in the gaps, contradictions, unanswered questions, and stories the surviving record leaves behind.</p>
          <p className="lede">Players do not replace or inhabit documented historical figures. You cannot step into Abraham Lincoln’s body or rewrite a real person’s life. The fictional story plays alongside the historical record, not instead of it.</p>
          <p className="lede">The Game Master, called the <strong>Inspector</strong>, brings real historical material to the table: photographs, maps, newspapers, directories, ledgers, minutes, and other surviving records from the community. Those sources help shape the mysteries, locations, puzzles, and threats the players encounter.</p>
          <p className="lede">The players, called <strong>Agents</strong>, investigate what is happening.</p>
          <p className="lede hero-hairline"><strong>The sources are not scenery. They are evidence.</strong></p>
          <ul className="hero-evidence-list">
            <li><strong>A map</strong> might reveal a route nobody knew existed.</li>
            <li><strong>A directory</strong> might put a name at the center of the case.</li>
            <li><strong>A newspaper</strong> might contradict a witness.</li>
            <li><strong>A ledger</strong> might give the Agents the leverage they need to get through a locked door or force someone to start talking.</li>
          </ul>
          <p className="lede">In research-heavy play, the group can go further. During <strong>Session Zero</strong> and between later sessions, players may search for additional real-world sources and bring what they find back to the table. Those discoveries can change the investigation and influence where the adventure goes next.</p>
          <p className="lede"><strong>The historical record sets the boundaries.<br />The adventure begins with what it leaves open.</strong></p>
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
          <h2 className="table-opening-heading" style={{ maxWidth: '20ch', fontSize: 'clamp(2.8rem, 5.4vw, 4.7rem)', lineHeight: 1.02, letterSpacing: '-0.04em', textWrap: 'balance' }}>The records room smells like coal smoke.</h2>
          <p className="table-scene-setting">Dust hangs in the lamplight. Ledgers sag on iron shelves.<br />Somewhere in the corridor, a pair of footsteps stops...<br />Then starts again, closer this time.</p>
          <figure className="records-room-art" style={{ width: '100%', maxWidth: 'none', margin: '2rem 0 2.1rem', borderWidth: '1px', boxShadow: '0 1.5rem 3.5rem rgba(0, 0, 0, 0.42)' }}>
            <img src="/records-room-scene.webp" alt="An empty historical records room with iron shelves, old ledgers, a locked cabinet, and a dim corridor beyond." style={{ display: 'block', width: '100%', aspectRatio: '1916 / 821', objectFit: 'cover' }} />
          </figure>
          <div className="table-play-card">
            <p><strong>Inspector:</strong> “The door eases shut behind you. A locked cabinet stands against the far wall. Brass plate: MUNICIPAL RECORDS — 1891–1896. In the corridor, the footsteps slow.”</p>
            <p><strong>Player:</strong> “Before I touch it, I check the lock. Has somebody opened it recently?”</p>
            <p><strong>Inspector:</strong> “Fresh scratches around the keyhole. Somebody has been in this cabinet recently. No roll.”</p>
            <p><strong>Another player:</strong> “Then I’m not waiting. I force it open before whoever is out there reaches the room.”</p>
            <p><strong>Inspector:</strong> “Strength plus Force.”</p>
            <p className="scene-roll"><strong>Strength 4 + Force 2 = 6d6</strong> → 1, 2, 3, 5, 6, 6.</p>
            <p className="scene-ending"><strong>Inspector:</strong> “Two 6s. The cabinet gives before the footsteps reach the door, and you keep the noise down. Inside are city records tied in black cord. One space on the shelf is empty, the dust around it freshly disturbed. One folder is missing. Then the footsteps stop outside the records-room door.”</p>
          </div>
          <div className="year-zero-bridge">
            <p className="year-zero-summary"><strong>That is the <a className="year-zero-link" href="https://freeleaguepublishing.com/wp-content/uploads/2023/11/YZE-Standard-Reference-Document.pdf" target="_blank" rel="noreferrer">Year Zero Engine</a> at work.</strong> Obvious information moves without a roll. When the outcome is uncertain and matters, <strong>Attribute + Skill</strong> builds the dice pool: one 6 succeeds, extra 6s improve the result, and no 6s means the situation changes.</p>
            <p className="year-zero-heading"><strong>But opening the cabinet is only the beginning.</strong></p>
            <p className="year-zero-next">The missing folder is not just a clue. It is evidence. And in TCC, evidence can change what the players are able to do next.</p>
            <p className="year-zero-next">A source can tell the table which building really stood on the block, who actually held an office, when a road opened, where a rail spur ran, or whether a witness’s story matches the surviving record. That does not solve the mystery for the players. It changes the position they are in when they make the next decision.</p>
            <p className="year-zero-next">A verified map might reveal another way into the site. A directory might identify the person who had authority to sign a document. A newspaper account might give the Agents something concrete to challenge. A ledger might connect a name to a room, a shift, a company, or a date that nobody at the table could have known from guesswork alone.</p>
            <p className="year-zero-next">That evidence can create leverage, expose a contradiction, open a route, protect an innocent person, narrow a search, or make a new question possible. The Inspector still runs the world. The players still choose what to attempt. The dice still come out only when the outcome is uncertain and the result matters.</p>
            <p className="year-zero-next">Then the loop continues: <strong>look at the record, decide what it means, act on it, and discover what the Branch does in response.</strong></p>
            <p className="year-zero-final"><strong><span>The roll gets you into the cabinet.</span><br /><span>The evidence inside changes the case.</span></strong></p>
          </div>
        </div>
      </section>

      <section className="orientation-section evidence-change-section">
        <div>
          <h2>A source matters when it gives you a choice you did not have before.</h2>
          <div className="evidence-change-lead">
          <p>A verified building plan shows a basement coal room. That room belongs to the historical record. You can point to it on the page.</p>
          <p>Inside the adventure, the coal room may open into an impossible corridor that appears on no surviving plan. A caretaker may swear dead workers built it and that it only opens at midnight.</p>
          <p>The plan did not solve the case for you. It did something better: it told you what the history supports, exposed where the fiction begins, and gave you something concrete to act on.</p>
          <p>That is how evidence earns its place in TCC. It can reveal a route, expose a false claim, identify the right person, protect someone, create an escape, strengthen a negotiation, or open another meaningful choice.</p>
          </div>
          <div className="history-boundary-grid">
            <article><h3>On the page</h3><p>What the sources actually support remains the historical record.</p></article>
            <article><h3>Inside the adventure</h3><p>TCC can build mysteries, threats, impossible places, and other fiction around that record.</p></article>
            <article><h3>In somebody's mouth</h3><p>A witness, character, community, source, or tradition can be right, wrong, frightened, mistaken, or lying.</p></article>
          </div>
          <div className="evidence-change-close">
          <p>Once that line is clear, the fictional historical reality built around the verified past has a name: a <strong>Branch</strong>.</p>
          <p>A supernatural event can be completely real inside a Branch without being presented as real-world history. The map stays honest even when the corridor does not.</p>
          </div>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">Then you cross over</p>
          <h2>Your consciousness crosses. Your modern body stays behind.</h2>
          <div className="cold-open compact-cold-open">
            <p>This morning, your character was sixty-eight years old.</p>
            <p>Tonight, they open their eyes in 1897 with a young laborer's hands, period clothes on their back, and a foreman shouting a name that belongs to this assignment.</p>
          </div>
          <p>The person behind those eyes has not been replaced. Their memories, judgment, personality, relationships, and long-term choices still belong to the same continuing Agent.</p>
          <p>Back in the present, the team works through an organization that creates and stabilizes a fictional historical body and local identity for each assignment. That identity can come with an occupation, social position, responsibilities, relationships, ordinary possessions, money, and a place to live or work.</p>
          <p>TCC calls that present-day organization the <strong>Agency</strong>. It calls the historical body <strong>Echo Ware</strong>.</p>
          <p>Echo Ware is never a documented historical person. The Agent does not possess Abraham Lincoln, replace a real miner, or secretly take over somebody who actually lived.</p>
          <p>When the assignment ends, the Agent returns. Memory and consequences can come home. Period money, tools, clothing, and other physical matter stay in the Branch.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">Friday night starts at the table</p>
          <h2>You can sit down and play without doing homework first.</h2>
          <p>The case can already be waiting when the group arrives: the verified sources, the historical boundary, the active problem, the evidence that matters, and the available Echo Ware choices.</p>
          <p>You get the briefing. You choose from the supplied assignment options. You enter the Branch. The game starts.</p>
          <p>That ready-to-run format is called a <strong>Ready Case</strong>, and it is the baseline Friday-night version of TCC.</p>
          <p>No player has to spend the week in an archive before the next session can happen. If the group wants more research, the Inspector can open optional real-world leads between sessions and players can follow them through online collections, libraries, archives, historical societies, field locations, newspapers, interviews, maps, photographs, and other sources.</p>
          <p>Those discoveries can add context, leverage, alternate routes, encounters, or new questions. The next session never depends on somebody completing outside research.</p>
          <p>At the deepest research setting, players can make real-world research part of play itself. The Inspector still verifies what the sources actually support before that material becomes part of the adventure.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">Before the first door opens</p>
          <h2>Three questions decide what kind of night this becomes.</h2>
          <p>Can the impossible be objectively real, or must every strange event remain explainable? How hard can consequences hit? Is the evidence already waiting at the table, or does the group want to go looking for more?</p>
          <p>TCC separates those decisions so a table can choose the kind of experience it actually wants.</p>
          <div className="setting-grid">
            <article>
              <h3>What can be true?</h3>
              <p>A case can stay grounded in historically plausible explanations, leave folklore and strange events unresolved, or make supernatural forces objectively real inside the Branch. TCC calls that choice <strong>Campaign Mode</strong>.</p>
            </article>
            <article>
              <h3>How hard can it hurt?</h3>
              <p>The table can choose forgiving learning play, stronger consequences with recovery, or full stakes where lasting damage and clearly warned lethal risk can enter the game. That choice is the <strong>Rules Level</strong>.</p>
            </article>
            <article>
              <h3>Where does the evidence come from?</h3>
              <p>The historical material can arrive fully prepared, open optional guided research between sessions, or make deeper player research part of the game. That choice is <strong>Research Mode</strong>.</p>
            </article>
          </div>
          <p>Those three settings are independent. A grounded case can be dangerous. A supernatural case can use forgiving rules. A fully prepared Ready Case can be played at any Rules Level.</p>
        </div>
      </section>

      <section className="orientation-section">
        <div>
          <p className="eyebrow">Change the place and the story changes</p>
          <h2>TCC is not one town wearing different street names.</h2>
          <p>A coal town leaves one trail behind. A port city leaves another. A rural county, industrial neighborhood, river community, courthouse town, or old resort district carries different maps, institutions, industries, conflicts, folklore, geography, and people into play.</p>
          <p>The rules travel. The history does not. Each locality changes the evidence on the table, the kinds of questions worth asking, the places an Agent can go, and the pressures that can grow into an adventure.</p>
          <p><strong>Carbondale, Pennsylvania</strong> is the first worked TCC locality because it gives the system a real community and real source material against which it can be tested. Carbondale is the first implementation of TCC, not the definition of the game.</p>
          <p>Your town, county, neighborhood, or city does not need to resemble Carbondale to work. It needs a history the table can investigate.</p>
        </div>
      </section>

      <section className="orientation-cta">
        <p className="eyebrow">Now open a case</p>
        <h2>Two ledgers. One missing name.</h2>
        <p>It is 1894. Two copies of the same employee ledger lie side by side. In one, a freight worker named Elias Vale exists. In the other, he does not. Both appear genuine.</p>
        <p>Then old photographs show a sealed section of the works that does not exist on the surviving plans.</p>
        <p>When the Agents finally reach Elias, his name begins fading from the page while he is still standing in front of them.</p>
        <p><strong>The Missing Name</strong> is a fictional demonstration case. Its sample documents stand in for the verified local historical sources a published Ready Case would actually bring to the table.</p>
        <p>Enter it to see the TCC loop in motion: evidence on the table, free player decisions, dice only when uncertainty matters, and a Branch that changes as the group discovers what is happening.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/experience">Enter The Missing Name</Link>
          <Link className="button button-secondary" to="/discover">Take the development survey</Link>
          <Link className="button button-secondary" to="/playtest">Apply to playtest</Link>
        </div>
      </section>
    </main>
  )
}
