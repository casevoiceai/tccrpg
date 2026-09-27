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
      <section className="orientation-hero" aria-labelledby="hero-heading">
        <div className="orientation-hero-copy">
          <p className="eyebrow">A tabletop roleplaying game of historical mysteries</p>
          <h1 id="hero-heading">Every place has a past. In TCC, something in it has gone wrong.</h1>
          <p className="lede">
            Time-Crawl Chronicles sends your group into fictional versions of real places and times. You follow evidence, deal with the people and dangers inside the Branch, and decide what happens next.
          </p>
          <p className="lede">The history gives the mystery its shape. The players decide what to do with it.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-tcc-plays">See how TCC plays</a>
            <Link className="button button-secondary" to="/experience">Read The Missing Name</Link>
          </div>
        </div>
        <div className="orientation-hero-art" aria-hidden="true">
          <img src={fullLogo} alt="" />
        </div>
      </section>

      <section className="orientation-section" id="how-tcc-plays">
        <p className="section-number">01</p>
        <div>
          <p className="eyebrow">How TCC plays</p>
          <h2>One person runs the world. Everyone else decides what to do in it.</h2>
          <p>
            One person is the <strong>Inspector</strong>, TCC's name for the Game Master. The Inspector describes the situation, plays the people and threats the group encounters, and decides when a roll is needed.
          </p>
          <p>
            Everyone else plays an <strong>Agent</strong>. Players decide what their Agents say, investigate, risk, protect, avoid, or attempt.
          </p>
          <p>Most of the game is conversation. Dice only come out when the outcome is uncertain and the result matters.</p>
          <div className="pull-quote">The Inspector presents the situation. The players choose what to do. The rules step in when uncertainty matters.</div>
        </div>
      </section>
      <section className="orientation-section">
        <p className="section-number">02</p>
        <div>
          <p className="eyebrow">Thirty seconds at the table</p>
          <h2>A simple example.</h2>
          <div className="example-grid">
            <p><strong>Inspector:</strong> “The records room smells like coal smoke. A locked cabinet sits against the far wall. You hear footsteps in the hall. What do you do?”</p>
            <p><strong>Player:</strong> “I check the cabinet for a label before I touch it.”</p>
            <p>If the label is easy to read, the Inspector simply tells the player what it says. No roll.</p>
            <p><strong>Another player:</strong> “I want to force the cabinet open before whoever is in the hall gets here.”</p>
          </div>
          <p>
            Now the timing matters and failure could change the scene, so the Inspector calls for a roll.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">03</p>
        <div>
          <p className="eyebrow">History and fiction</p>
          <h2>History comes first.</h2>
          <p>
            TCC starts with what the available sources actually support. The game does not ask the table to treat invented material as documented fact.
          </p>
          <p>Once the historical foundation is clear, the Chronicle can build fiction around it.</p>
          <p>
            A real building plan might show a basement coal room. That room belongs to the historical record. Inside the Chronicle, the Agents might discover that the coal room opens into a corridor that never existed on the plan.
          </p>
          <p>The corridor can be completely real inside the Branch, but it is still fiction created for the game.</p>
          <p className="pull-quote">The history is real. What is hiding inside it is not.</p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">04</p>
        <div>
          <p className="eyebrow">The character you play</p>
          <h2>Your Agent stays the same. The body can change.</h2>
          <p>
            Your <strong>Agent</strong> is a continuing modern-day character. Their memories, judgment, relationships, and long-term choices carry from one Chronicle to another.
          </p>
          <p>
            When an Agent enters a historical Branch, they do so through <strong>Echo Ware</strong>: a fictional person created to fit that place, time, and assignment.
          </p>
          <p>
            A retired librarian in the present might enter an 1897 Branch as a young laborer. In another Chronicle, the same Agent might use the body and local identity of a clerk, medic, miner, or field worker.
          </p>
          <p>
            Echo Ware gives the Agent a believable place in the period without replacing or rewriting a documented historical person's life.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">05</p>
        <div>
          <p className="eyebrow">What you do in a session</p>
          <h2>Follow the evidence. Decide what matters.</h2>
          <div className="action-grid">
            <article><h3>Investigate</h3><p>Find contradictions in records, testimony, and physical evidence.</p></article>
            <article><h3>Explore</h3><p>Enter real places as they existed in another period.</p></article>
            <article><h3>Talk</h3><p>Deal with people who have motives, loyalties, secrets, and incomplete knowledge.</p></article>
            <article><h3>Use evidence</h3><p>Maps, photographs, newspapers, directories, and records can open new options.</p></article>
            <article><h3>Take action</h3><p>Protect someone, escape danger, bargain, fight, or try another approach.</p></article>
            <article><h3>Face the impossible</h3><p>Threats may be human, temporal, folkloric, or supernatural, depending on the campaign.</p></article>
          </div>
          <p>There is no single required solution. Evidence should give the players better choices, not replace those choices.</p>
        </div>
      </section>
      <section className="orientation-section">
        <p className="section-number">06</p>
        <div>
          <p className="eyebrow">Research without homework</p>
          <h2>You do not need to be a historian to play.</h2>
          <p>
            The normal starting point is a <strong>Ready Case</strong>. The historical material, evidence, and other pieces needed for play are already assembled. The group can sit down, get the briefing, and begin.
          </p>
          <p>
            Groups that enjoy research can go further. They can use archives, libraries, historical societies, newspapers, maps, photographs, interviews, and online collections to find material that adds context, leverage, alternate routes, or new questions.
          </p>
          <p>
            That deeper research is optional. A player should never become less important at the table because they have less free time, money, transportation, academic access, or technology.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">07</p>
        <div>
          <p className="eyebrow">Choose the kind of TCC you want</p>
          <h2>Decide how strange it gets and how hard failure can hit.</h2>
          <p>
            A Chronicle can stay historically plausible, leave the supernatural uncertain, or make monsters, magic, spirits, and other impossible things objectively real.
          </p>
          <p>
            A table can keep play forgiving and nonlethal, add serious but recoverable consequences, or deliberately choose permanent and lethal stakes.
          </p>
          <p>
            Those choices are separate. A grounded historical mystery can still be dangerous. A supernatural game can still use light, forgiving rules.
          </p>
          <p className="quiet-note">The full rulebook gives these settings formal names and details. You do not need to learn the whole grid before understanding the game.</p>
        </div>
      </section>

      <section className="orientation-cta">
        <p className="eyebrow">See a Chronicle</p>
        <h2>Start with The Missing Name.</h2>
        <p>
          Two copies of the same 1894 company ledger disagree about whether a worker named Elias Vale ever existed. Both appear genuine.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/experience">Read The Missing Name</Link>
          <Link className="button button-secondary" to="/discover">Help shape TCC</Link>
          <Link className="button button-secondary" to="/playtest">Apply to playtest</Link>
        </div>
      </section>
    </main>
  )
}
