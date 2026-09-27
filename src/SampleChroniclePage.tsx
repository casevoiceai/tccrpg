import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { track } from './analytics'
import './experience.css'

export default function SampleChroniclePage() {
  useEffect(() => {
    track('experience_started', { sample_version: 'missing-name-copy-2' })
  }, [])

  return (
    <main className="experience-page sample-chronicle-page">
      <header className="experience-header">
        <div>
          <p className="eyebrow">Sample TCC case</p>
          <h1>The Missing Name</h1>
          <p className="sample-intro">
            This is a fictional demonstration written to show how a TCC table works. Elias Vale and the archive problem below are not presented as real historical claims.
          </p>
        </div>
      </header>

      <section className="scene-panel">
        <p className="eyebrow">The briefing</p>
        <h2>The archive has two copies of the same 1894 employee ledger.</h2>
        <p className="scene-copy">
          One copy lists a freight worker named Elias Vale. The other does not. The page numbers, paper, ink, and supervisor marks all appear consistent. Neither copy looks like an obvious forgery.
        </p>
        <p className="scene-copy">
          Three days after the discrepancy is discovered, historical photographs begin showing a sealed section of the works that does not appear on the surviving plans.
        </p>
        <p className="scene-copy">
          The team enters the Branch with a simple assignment: identify Elias Vale, determine why the records disagree, and find out whether the new structure is connected to the disappearance.
        </p>
      </section>

      <section className="scene-panel">
        <p className="eyebrow">The table starts asking questions</p>
        <h2>The players choose where the investigation goes.</h2>
        <div className="inspector-line">
          <span>Inspector</span>
          <div>
            <p>“You are inside the records office. The employee ledger is open on the desk. Outside, the evening shift is changing.”</p>
            <p>“What do you do?”</p>
          </div>
        </div>
        <div className="sample-dialogue">
          <p><strong>Player 1:</strong> “I compare the two ledgers line by line. I want to know whether Elias is the only difference.”</p>
          <p><strong>Player 2:</strong> “I look for another source. A shift roster, payroll sheet, anything that should have his name.”</p>
          <p><strong>Player 3:</strong> “I want to find somebody on the floor who would have worked with him.”</p>
        </div>
        <p className="scene-copy">
          None of those choices comes from a menu. The Inspector follows the players' decisions and tells them what their Agents can see, learn, or attempt.
        </p>
      </section>
      <section className="scene-panel">
        <p className="eyebrow">The evidence matters</p>
        <h2>A second source changes the case.</h2>
        <div className="artifact-card" aria-label="Fictional sample shift roster">
          <div className="artifact-heading">Fictional sample record · Shift Roster · October 1894</div>
          <div className="artifact-row"><span>Vale, Elias</span><span>Freight · Bay 3</span></div>
          <div className="artifact-row"><span>Shift supervisor</span><span>Initials match the ledger</span></div>
          <div className="artifact-note">In a published Ready Case, this role would be filled by sourced historical material from the locality.</div>
        </div>
        <p className="scene-copy">
          Now the group knows the contradiction is not limited to one document. The roster gives them a department, a work location, and another trail to follow.
        </p>
        <p className="scene-copy">
          The source has not solved the mystery. It has changed the players' options.
        </p>
      </section>

      <section className="scene-panel">
        <p className="eyebrow">When dice are needed</p>
        <h2>The rules enter only when the outcome is uncertain and important.</h2>
        <div className="inspector-line">
          <span>Inspector</span>
          <div>
            <p>“You reach Bay 3 before the shift empties, but a foreman blocks the doorway. Elias may be leaving through the far side of the building.”</p>
          </div>
        </div>
        <div className="sample-dialogue">
          <p><strong>Player:</strong> “I tell him I was sent to check a payroll discrepancy. I need him to let me through before the worker leaves.”</p>
        </div>
        <p className="scene-copy">
          The Inspector decides this is uncertain, time-sensitive, and important enough to change the scene. The player rolls an appropriate dice pool.
        </p>
        <div className="dice-pool" aria-label="Five six-sided dice showing six, six, four, two, one">
          {[6, 6, 4, 2, 1].map((value, index) => <span className={value === 6 ? 'success' : ''} key={`${value}-${index}`}>{value}</span>)}
        </div>
        <div className="roll-result">
          <strong>Two 6s: success, plus one extra success.</strong>
          <p>The Agent gets through the doorway. The extra success can improve the result rather than simply repeating the same success.</p>
        </div>
      </section>

      <section className="scene-panel">
        <p className="eyebrow">The Branch reveals itself</p>
        <h2>The mystery moves beyond an ordinary records error.</h2>
        <p className="scene-copy">
          The team finds Elias. While they are speaking with him, his name begins fading from the roster they just recovered. A nearby worker remembers Elias clearly. Another insists nobody by that name has ever worked there.
        </p>
        <p className="scene-copy">
          That is the point where the case stops being only a historical investigation and becomes a Branch problem. The players still use the evidence they gathered, but now they have to decide what the contradiction means and what they are willing to risk to stop it.
        </p>
      </section>
      <section className="scene-panel completion-panel">
        <p className="eyebrow">What this example is showing</p>
        <h2>A TCC case is not a quiz about history and it is not a scripted path.</h2>
        <p className="scene-copy">
          The Inspector prepares a historical foundation and a playable problem. The players decide how their Agents investigate it. Evidence changes what they know and what they can attempt. Dice resolve uncertain actions when the result matters. The Branch reacts to what the group does.
        </p>
        <p className="scene-copy">
          A full Chronicle adds the rest of the system: Echo Ware, consequences, Campaign Mode, Rules Level, Research Mode, threats, recovery, and the return to the modern day.
        </p>
        <div className="completion-actions">
          <Link className="button button-primary" to="/playtest">Apply to playtest TCC</Link>
          <Link className="button button-secondary" to="/discover">Take the development survey</Link>
          <Link className="text-link" to="/">Return to the overview</Link>
        </div>
      </section>
    </main>
  )
}
