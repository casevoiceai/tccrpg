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
          <p className="evidence-change-intro">The historical record does not tell the Agents what to do. It tells them what is real enough to act on.</p>
          <div className="evidence-example">
            <p><strong>The source:</strong> A verified building plan shows a basement coal room. That room belongs to the historical record.</p>
            <p><strong>The Branch:</strong> Inside the adventure, that same coal room may open into an impossible corridor that appears on no surviving plan.</p>
            <p><strong>The choice:</strong> The plan does not solve the mystery. It gives the Agents a real place to investigate, a fact to test, and something concrete to use when the situation changes.</p>
          </div>
          <div className="evidence-choice-grid">
            <article><h3>Verified history</h3><p>Documented people, places, dates, events, and outcomes remain what the surviving sources support.</p></article>
            <article><h3>Branch fiction</h3><p>TCC can build mysteries, threats, impossible places, and other fiction around the verified record without rewriting it.</p></article>
            <article><h3>Player choice</h3><p>Evidence should change what the Agents can try: reveal a route, expose a false claim, gain access, protect someone, strengthen a negotiation, or open another meaningful option.</p></article>
          </div>
          <div className="evidence-change-close">
            <p className="evidence-close-lines"><span style={{ display: 'block' }}>History sets the boundary.</span><span style={{ display: 'block' }}>Evidence changes the options.</span><span style={{ display: 'block' }}>The players decide what to do next.</span></p>
          </div>
        </div>
      </section>

      <section className="orientation-section crossover-section">
        <div>
          <h2 className="crossover-title"><span>Your consciousness crosses time.</span><span>Your modern body stays behind.</span></h2>
          <div className="crossover-scene">
            <p>This morning, your Agent is sixty-eight years old.</p>
            <p>Tonight, they open their eyes in 1897 with a young laborer&apos;s hands, period clothes, and a foreman shouting a name that belongs to the assignment.</p>
          </div>
          <div className="crossover-identity">
            <p className="crossover-identity-kicker">Same Agent. Different body.</p>
            <p>Your memories, judgment, and identity cross with you. The Branch changes the body, role, and circumstances around you—not the person making the choices.</p>
          </div>
          <div className="crossover-grid">
            <article><h3>Mind: the Agent</h3><p>Your memories, personality, judgment, Skills, modern knowledge, Resolve, and long-term choices remain with the continuing Agent.</p></article>
            <article><h3>Body: Echo Ware</h3><p>Echo Ware supplies the historical body: physical capability, period appearance, a local role, ordinary possessions, and a believable place in that Branch.</p></article>
            <article><h3>Connection: the Link</h3><p>The present-day Agency uses Rift systems to connect Agent and Echo Ware. Ware Strain measures trouble in that active link.</p></article>
          </div>
          <div className="crossover-close">
            <h3>Echo Ware is fictional. The Agent is the continuing character.</h3>
            <p>An Agent never replaces, possesses, or secretly inhabits a documented historical person. When the assignment ends, the Agent returns to the present with memory, knowledge, emotional consequences, and Branch Canon. Period money, tools, clothing, and other physical matter stay in the Branch.</p>
          </div>
        </div>
      </section>

      <section className="orientation-section ready-case-section">
        <div>
          <h2 className="ready-case-title">You can sit down and play without doing homework first.</h2>
          <p className="ready-case-intro"><strong>A Ready Case arrives ready to play.</strong> The historical material, evidence, active problem, and Echo Ware choices are already assembled before the group sits down.</p>
          <div className="ready-case-flow">
            <article><span>1</span><h3>Get the briefing</h3><p>The Inspector explains where the case is happening, what is known, what is uncertain, and why the Agency is sending the team in.</p></article>
            <article><span>2</span><h3>Choose your Echo Ware</h3><p>Pick from the supplied assignment profiles, review what you need to know, and decide how your Agent enters the situation.</p></article>
            <article><span>3</span><h3>Enter the Branch</h3><p>The scene begins. Investigate, talk, take risks, follow evidence, and make choices. No outside research is required first.</p></article>
          </div>
          <div className="ready-case-research">
            <h3>Want to go deeper?</h3>
            <p>Guided Investigation can open optional real-world leads between sessions. Those discoveries can add context, leverage, alternate routes, encounters, or new questions. Tables that deliberately choose Full Agency can make research part of play itself, with the Inspector verifying what the sources actually support.</p>
          </div>
        </div>
      </section>

      <section className="orientation-section settings-section">
        <div>
          <h2 className="settings-title">Three choices shape every TCC campaign.</h2>
          <p className="settings-intro">Decide what can be true, how dangerous play can become, and how much research your table wants to do.</p>
          <div className="settings-choice-grid">
            <article><h3>Campaign Mode</h3><p className="settings-question">What kind of reality can be true?</p><p>Keep the Branch grounded in historically plausible explanations, leave folklore unresolved, or allow supernatural forces to be objectively real.</p></article>
            <article><h3>Rules Level</h3><p className="settings-question">How dangerous and mechanically detailed is play?</p><p>Choose forgiving learning play, recoverable consequences, or permanent Level 3 stakes with clearly warned lethal risk.</p></article>
            <article><h3>Research Mode</h3><p className="settings-question">Where does the historical evidence come from?</p><p>Play a fully prepared Ready Case, follow optional Guided Investigation leads, or make real-world research part of play through Full Agency.</p></article>
          </div>
          <div className="settings-handoff">
            <h3>Choose how the table plays. Then choose where.</h3>
            <p>Campaign Mode, Rules Level, and Research Mode set the table&apos;s reality, danger, and research style. They do not supply the mystery. TCC gets that from a real place and the historical record it leaves behind.</p>
          </div>
        </div>
      </section>

      <section className="orientation-section locality-section">
        <div>
          <h2 className="locality-title">The rules travel. The history changes with the place.</h2>
          <p className="locality-intro">TCC does not move the same adventure from town to town. Each locality brings different evidence, institutions, people, geography, folklore, conflicts, and unanswered questions to the table.</p>
          <div className="locality-grid">
            <article><h3>The record changes</h3><p>Maps, photographs, newspapers, directories, public records, buildings, oral histories, and other surviving sources determine what the table can actually know.</p></article>
            <article><h3>The world changes</h3><p>Local industries, neighborhoods, institutions, jobs, customs, routes, and social access shape the Echo Ware, NPCs, locations, and choices available inside the Branch.</p></article>
            <article><h3>The adventure changes</h3><p>The sources reveal different pressures, contradictions, gaps, and open questions. Those are where a locality begins producing mysteries that belong to that place.</p></article>
          </div>
          <div className="locality-finale">
            <h3>Carbondale is the first worked locality - not the template.</h3>
            <p className="locality-finale-copy"><span>Carbondale shows how one real community can shape a Chronicle from its own records, people, places, and pressures.</span><span>Another locality keeps the same TCC rules and brings its own history to the table.</span></p>
            <p className="locality-finale-rule">Same rules. Different place. Different history. Different adventure.</p>
            <p className="locality-finale-next">Next, see that process in play.</p>
          </div>
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
