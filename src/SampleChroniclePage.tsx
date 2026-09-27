import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { track } from './analytics'
import './experience.css'

export default function SampleChroniclePage() {
  useEffect(() => {
    track('experience_started', { sample_version: 'missing-name-copy-1' })
  }, [])

  return (
    <main className="experience-page sample-chronicle-page">
      <header className="experience-header">
        <div>
          <p className="eyebrow">Sample Chronicle</p>
          <h1>The Missing Name</h1>
        </div>
      </header>

      <section className="scene-panel">
        <p className="eyebrow">The case</p>
        <h2>Two records. One missing worker.</h2>
        <p className="scene-copy">An archive holds two copies of the same 1894 company ledger.</p>
        <p className="scene-copy">One lists a worker named Elias Vale. The other does not.</p>
        <p className="scene-copy">Both appear genuine.</p>
        <p className="scene-copy">
          Three days after the discrepancy is discovered, a sealed section of the old works begins appearing in historical photographs even though no such building exists today.
        </p>
        <p className="scene-copy">
          The Agents are sent into the Branch to find out who Elias Vale was, why the records disagree, and what is happening inside the works.
        </p>
      </section>

      <section className="scene-panel">
        <p className="eyebrow">At the table</p>
        <h2>The first contradiction.</h2>
        <div className="inspector-line">
          <span>Inspector</span>
          <div>
            <p>“The office ledger and the shift roster disagree. Elias appears in one and not the other.”</p>
            <p>“As you compare them, another worker's name begins fading from the page in front of you.”</p>
          </div>
        </div>
        <div className="sample-dialogue">
          <p><strong>Player:</strong> “I want to find that worker before the name disappears completely.”</p>
          <p><strong>Inspector:</strong> “You know which department he works in. You can get there without a roll, but the shift is changing now.”</p>
          <p><strong>Player:</strong> “Then I go. I want to ask his name before anyone else forgets it.”</p>
        </div>
      </section>
      <section className="scene-panel">
        <p className="eyebrow">When the rules step in</p>
        <h2>Roll only when the outcome matters.</h2>
        <div className="inspector-line">
          <span>Inspector</span>
          <div>
            <p>“You reach the department before the worker leaves, but a foreman blocks the doorway and wants to know why you are there.”</p>
          </div>
        </div>
        <div className="sample-dialogue">
          <p><strong>Player:</strong> “I tell him I was sent to check a payroll discrepancy and try to get past him before the worker disappears into the crowd.”</p>
        </div>
        <p className="scene-copy">
          Now the result is uncertain and failure would change the situation. The Inspector calls for the appropriate roll.
        </p>
        <div className="dice-pool" aria-label="Five six-sided dice showing six, six, four, two, one">
          {[6, 6, 4, 2, 1].map((value, index) => <span className={value === 6 ? 'success' : ''} key={`${value}-${index}`}>{value}</span>)}
        </div>
        <div className="roll-result">
          <strong>One 6 succeeds. Extra 6s improve the result.</strong>
          <p>The player gets through and has one extra success to turn into an additional advantage.</p>
        </div>
      </section>
      <section className="scene-panel">
        <p className="eyebrow">Why the history matters</p>
        <h2>The evidence changes what the group can do.</h2>
        <div className="artifact-card" aria-label="Transcribed employee ledger">
          <div className="artifact-heading">Lackawanna Works · Shift Ledger · October 1894</div>
          <div className="artifact-row"><span>Vale, Elias</span><span>Freight · Bay 3</span></div>
          <div className="artifact-row faded"><span>Vale, Elias</span><span>—</span></div>
          <div className="artifact-note">A second copy contains the same page number but no Elias Vale.</div>
        </div>
        <p className="scene-copy">
          The records do not solve the case for the players. They show that the contradiction is real, point toward Bay 3, and give the group something concrete to act on.
        </p>
        <p className="scene-copy">
          At the table, a player is not choosing from four approved buttons. They state an approach. The Inspector responds. If the result becomes uncertain and important, the rules decide what happens next.
        </p>
      </section>

      <section className="scene-panel completion-panel">
        <p className="eyebrow">TCC in development</p>
        <h2>Want to help test it?</h2>
        <p className="scene-copy">TCC is still being built. We are looking for people who can tell us what is confusing, slow, difficult to run, or genuinely fun at the table.</p>
        <div className="completion-actions">
          <Link className="button button-primary" to="/playtest">Apply to playtest</Link>
          <Link className="button button-secondary" to="/discover">Help shape TCC</Link>
          <Link className="text-link" to="/">Return home</Link>
        </div>
      </section>
    </main>
  )
}
