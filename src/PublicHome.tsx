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
          <p className="eyebrow">Time-Crawl Chronicles</p>
          <h1 id="hero-heading">A tabletop RPG built around real local history.</h1>
          <p className="lede">
            In TCC, you play a modern-day Agent sent into a historical Branch: a fictional historical reality built around a real place and period, with historical evidence as its foundation.
          </p>
          <p className="lede">
            The sourced history establishes what the evidence supports. The Branch adds the case: a contradiction, disappearance, threat, or impossible event created for play.
          </p>
          <p className="lede">
            Your group goes in to find out what is happening and decide what to do about it.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-tcc-works">How TCC works</a>
            <Link className="button button-secondary" to="/experience">Read The Missing Name</Link>
          </div>
        </div>
        <div className="orientation-hero-art" aria-hidden="true">
          <img src={fullLogo} alt="" />
        </div>
      </section>

      <section className="orientation-section" id="how-tcc-works">
        <p className="section-number">01</p>
        <div>
          <p className="eyebrow">At the table</p>
          <h2>The Inspector describes the situation. The players decide what happens next.</h2>
          <p>
            One person is the <strong>Inspector</strong>, TCC's Game Master. The Inspector runs the Branch, portrays the people and threats inside it, answers questions about the world, and calls for a roll when the outcome of an action is uncertain and matters.
          </p>
          <p>
            Everyone else plays an <strong>Agent</strong>. A player can investigate, talk, lie, run, fight, protect someone, ignore a lead, try something the Inspector did not expect, or refuse the obvious choice entirely.
          </p>
          <p>
            If the outcome is obvious, it simply happens. If the outcome is uncertain and meaningful, TCC uses a pool of six-sided dice. One 6 succeeds. Extra 6s improve the result. Failure changes the situation instead of stopping the game.
          </p>
          <div className="play-example">
            <p><strong>Inspector:</strong> “The records room smells like coal smoke. A locked cabinet sits against the far wall. You hear footsteps in the hall. What do you do?”</p>
            <p><strong>Player:</strong> “I check the cabinet for a label before I touch it.”</p>
            <p>The label is visible, so the Inspector gives the information. No roll is needed.</p>
            <p><strong>Another player:</strong> “I force the cabinet open before whoever is in the hall gets here.”</p>
            <p>Now the timing matters and failure could change the scene, so the Inspector calls for a roll.</p>
          </div>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">02</p>
        <div>
          <p className="eyebrow">What the history does</p>
          <h2>The history is part of the problem the players are solving.</h2>
          <p>
            A TCC case starts by separating what the sources support from what the game invents. Maps, photographs, newspapers, directories, ledgers, minutes, memorial records, and other historical material can become evidence inside the case.
          </p>
          <p>
            That evidence is useful because it changes what the Agents know or what they can do. A map can reveal a route. A photograph can expose a contradiction. A directory can identify the person the group needs to find. A newspaper can show that an NPC's story does not match the record.
          </p>
          <p>
            The history is not there to decorate the adventure. If removing the historical evidence would leave the case basically unchanged, the history is not doing enough work.
          </p>
          <div className="history-boundary-grid">
            <article><h3>Real history</h3><p>What the available sources actually support.</p></article>
            <article><h3>Branch fiction</h3><p>What TCC adds or changes for play.</p></article>
            <article><h3>Belief</h3><p>What a witness, source, community, or character says is true. It may or may not be correct.</p></article>
          </div>
          <p className="quiet-note">
            TCC keeps those layers separate so a fictional event inside the game is never presented as a real historical claim.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">03</p>
        <div>
          <p className="eyebrow">Your character</p>
          <h2>Your Agent is the continuing character. Echo Ware is the body used for the assignment.</h2>
          <p>
            Your <strong>Agent</strong> exists in the modern day. Their memories, relationships, judgment, and long-term choices carry from one Chronicle to another.
          </p>
          <p>
            When the Agent enters a historical Branch, they use <strong>Echo Ware</strong>: a fictional body and local identity created for that place and period. Echo Ware gives the Agent a believable way to exist inside the history without replacing a documented real person.
          </p>
          <p>
            A 68-year-old librarian in the present might enter an 1897 Branch through the body of a 23-year-old lumber worker. A later assignment could place the same Agent in completely different Echo Ware.
          </p>
        </div>
      </section>
      <section className="orientation-section">
        <p className="section-number">04</p>
        <div>
          <p className="eyebrow">How a case starts</p>
          <h2>You can sit down and play without doing historical homework first.</h2>
          <p>
            The baseline way to play TCC is a <strong>Ready Case</strong>. The Inspector has the historical material, evidence, Echo Ware options, and the active problem prepared before the session begins.
          </p>
          <p>
            The group receives the briefing, chooses from the available assignment options, enters the Branch, and plays. Nobody has to spend a week researching before game night.
          </p>
          <p>
            Tables that enjoy research can choose to go deeper. TCC also supports optional historical investigation between sessions and, for groups that specifically want it, campaigns where real-world research helps build the Chronicle itself.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">05</p>
        <div>
          <p className="eyebrow">Three table choices</p>
          <h2>The group decides what kind of TCC it wants to play.</h2>
          <div className="setting-grid">
            <article>
              <h3>Campaign Mode</h3>
              <p>Decides what can be true. A case can stay historically plausible, leave the supernatural uncertain, or make supernatural forces objectively real.</p>
            </article>
            <article>
              <h3>Rules Level</h3>
              <p>Decides how much danger and consequence the table wants, from a forgiving learning game to permanent and potentially lethal stakes.</p>
            </article>
            <article>
              <h3>Research Mode</h3>
              <p>Decides where the historical material comes from: a fully prepared Ready Case, optional guided research, or a campaign built through deeper player research.</p>
            </article>
          </div>
          <p className="quiet-note">
            These settings are independent. A grounded historical case can still be dangerous. A supernatural case can still use light rules. A Ready Case can be played at any Rules Level.
          </p>
        </div>
      </section>

      <section className="orientation-section">
        <p className="section-number">06</p>
        <div>
          <p className="eyebrow">Built for different places</p>
          <h2>The rules stay the same. The history changes with the locality.</h2>
          <p>
            A Chronicle can be built around a mining town, a port city, a rural county, an industrial neighborhood, or another community entirely. Each place brings its own records, institutions, conflicts, industries, folklore, geography, and people into the game.
          </p>
          <p>
            Carbondale, Pennsylvania is the first worked TCC locality because it gives the project a real place and real source material to test against. It is an implementation of TCC, not the definition of the game.
          </p>
        </div>
      </section>

      <section className="orientation-cta">
        <p className="eyebrow">Sample case</p>
        <h2>The Missing Name</h2>
        <p>
          A fictional demonstration case begins with two copies of the same 1894 company ledger. One lists a worker named Elias Vale. The other does not. Both appear genuine.
        </p>
        <p>
          The sample shows how the Inspector presents a problem, how players choose their own approach, when the dice are used, and how historical evidence changes the investigation.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/experience">Read the sample case</Link>
          <Link className="button button-secondary" to="/discover">Take the development survey</Link>
          <Link className="button button-secondary" to="/playtest">Apply to playtest</Link>
        </div>
      </section>
    </main>
  )
}
