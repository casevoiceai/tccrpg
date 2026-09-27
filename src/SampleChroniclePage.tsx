import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { track } from './analytics'
import './experience.css'

export default function SampleChroniclePage() {
  useEffect(() => {
    track('experience_started', { sample_version: 'missing-name-copy-3' })
  }, [])

  return (
    <main className="experience-page sample-chronicle-page">
      <header className="experience-header story-sample-header">
        <div>
          <p className="eyebrow">A sample TCC case</p>
          <h1>The Missing Name</h1>
          <p className="sample-intro">Two copies of the same ledger. One missing worker. A part of the building that appears only after the records disagree.</p>
          <p className="quiet-note">Elias Vale and the archive mystery in this demonstration are fictional. The sample documents below stand in for verified local historical sources that would be brought to the table in a published TCC case.</p>
        </div>
      </header>

      <section className="scene-panel story-panel">
        <p className="eyebrow">October, 1894</p>
        <h2>The two ledgers should match.</h2>
        <p className="scene-copy">They came from the same company records. Same page numbers. Same paper. Same supervisor marks. Line after line, the entries agree.</p>
        <p className="scene-copy">Until they do not.</p>
        <p className="scene-copy">One copy lists a freight worker named <strong>Elias Vale</strong>.</p>
        <p className="scene-copy">The other does not.</p>
        <p className="scene-copy">Neither looks forged.</p>
        <p className="scene-copy">Three days later, historical photographs of the works begin showing a sealed section of the building that does not appear on the surviving plans.</p>
        <p className="scene-copy">The team receives the assignment: identify Elias Vale, determine why the records disagree, and find out whether the new structure is connected to the disappearance.</p>
        <p className="scene-copy">Then they enter the fictional historical reality built around the case. In TCC, that place is called a <strong>Branch</strong>.</p>
      </section>

      <section className="scene-panel story-panel">
        <p className="eyebrow">The records office</p>
        <h2>The evening shift is changing outside.</h2>
        <p className="scene-copy">Boots pass the windows. Voices carry through the building. Somewhere deeper in the works, machinery is still running.</p>
        <p className="scene-copy">The two ledgers lie open on the desk.</p>
        <p className="scene-copy">The person running the game is called the <strong>Inspector</strong>. The Inspector describes the situation, portrays the people and threats inside it, answers questions about the world, and calls for dice when an uncertain outcome matters.</p>
        <div className="inspector-line">
          <span>Inspector</span>
          <div>
            <p>“You have both copies in front of you. Outside, the evening shift is changing.”</p>
            <p>“What do you do?”</p>
          </div>
        </div>
        <div className="sample-dialogue">
          <p><strong>Player 1:</strong> “I compare the ledgers line by line. I want to know whether Elias is the only difference.”</p>
          <p><strong>Player 2:</strong> “I look for another source. A shift roster, payroll sheet, anything that should have his name.”</p>
          <p><strong>Player 3:</strong> “I want to find somebody on the floor who would have worked with him.”</p>
        </div>
        <p className="scene-copy">There is no list of approved actions. The players decide where the investigation goes. The Inspector follows those decisions and tells them what their characters can see, learn, or attempt.</p>
        <p className="scene-copy">The modern-day characters they are playing are called <strong>Agents</strong>. Those Agents will continue from one Chronicle to the next even when the historical assignment changes around them.</p>
      </section>

      <section className="scene-panel story-panel">
        <p className="eyebrow">Bay 3</p>
        <h2>A second record makes the contradiction worse.</h2>
        <div className="artifact-card" aria-label="Fictional sample shift roster">
          <div className="artifact-heading">Fictional sample record · Shift Roster · October 1894</div>
          <div className="artifact-row"><span>Vale, Elias</span><span>Freight · Bay 3</span></div>
          <div className="artifact-row"><span>Shift supervisor</span><span>Initials match the ledger</span></div>
          <div className="artifact-note">This prop is fictional for the demonstration. In a published TCC case, verified local historical sources fill this role at the table.</div>
        </div>
        <p className="scene-copy">Now the group knows the discrepancy is not limited to one ledger. The roster gives them a department, a work location, and another trail to follow.</p>
        <p className="scene-copy">The record has not solved the mystery. It has changed what the players can do.</p>
        <p className="scene-copy">That is how source material works in TCC. A real map, photograph, newspaper page, directory entry, ledger, minute book, or other verified source can become something the players actually use. Depending on how the table chooses to handle research, the Inspector may bring it to the session, or players may find additional sources between sessions and bring those discoveries back to the table.</p>
        <p className="scene-copy">The source establishes what the evidence supports. The fictional Branch is built around it.</p>
      </section>

      <section className="scene-panel story-panel">
        <p className="eyebrow">The foreman</p>
        <h2>The shift is almost gone.</h2>
        <p className="scene-copy">Workers are moving out through the building. If Elias is here, he could disappear into the crowd in seconds.</p>
        <div className="inspector-line">
          <span>Inspector</span>
          <div><p>“A foreman steps into the doorway at Bay 3. ‘Where do you think you’re going?’”</p></div>
        </div>
        <div className="sample-dialogue">
          <p><strong>Player:</strong> “I tell him I was sent to check a payroll discrepancy. I need him to let me through before the worker leaves.”</p>
        </div>
        <p className="scene-copy">If the foreman simply believed the story, nothing would need to be rolled.</p>
        <p className="scene-copy">He does not.</p>
        <p className="scene-copy">The outcome is uncertain. Time matters. Failure would change the scene. The Inspector calls for the appropriate dice pool.</p>
        <div className="dice-pool" aria-label="Five six-sided dice showing six, six, four, two, one">
          {[6, 6, 4, 2, 1].map((value, index) => <span className={value === 6 ? 'success' : ''} key={`${value}-${index}`}>{value}</span>)}
        </div>
        <div className="roll-result">
          <strong>Two 6s: success, plus one extra success.</strong>
          <p>One 6 succeeds. Extra 6s improve the result. The Agent gets through the doorway, and the extra success can improve what that success gives them.</p>
        </div>
        <p className="scene-copy">The player finds Elias before the shift carries him away.</p>
        <p className="scene-copy">For a moment, the case appears to have become easier.</p>
        <p className="scene-copy">Then the roster changes.</p>
      </section>

      <section className="scene-panel story-panel">
        <p className="eyebrow">Elias Vale</p>
        <h2>He is standing in front of them when his name disappears.</h2>
        <p className="scene-copy">Elias is alive. He is talking. A nearby worker knows exactly who he is.</p>
        <p className="scene-copy">Then the letters of his name begin fading from the roster the group just recovered.</p>
        <p className="scene-copy">Another worker looks over and insists nobody by that name has ever worked there.</p>
        <p className="scene-copy">The man standing a few feet away says otherwise.</p>
        <p className="scene-copy">So does one ledger. So did the roster a moment ago. The other ledger has disagreed from the beginning.</p>
        <p className="scene-copy">The historical investigation has become something else.</p>
        <p className="scene-copy">The evidence still matters. Nothing the players learned has been discarded. But the question has changed.</p>
        <p className="scene-copy"><strong>Who was Elias Vale?</strong> is no longer enough.</p>
        <p className="scene-copy">Now the group has to decide what the contradiction means, what is causing it, and what they are willing to risk before the Branch decides the answer for them.</p>
      </section>

      <section className="scene-panel story-panel">
        <p className="eyebrow">One more thing</p>
        <h2>The person who entered this case does not belong to 1894.</h2>
        <p className="scene-copy">The Agent came from the modern day. Their memories, judgment, relationships, Skills, and choices are still their own.</p>
        <p className="scene-copy">Inside this Branch, however, they are acting through a fictional historical body and local identity that fits the assignment.</p>
        <p className="scene-copy">TCC calls that body <strong>Echo Ware</strong>.</p>
        <p className="scene-copy">Echo Ware is created for the Branch, period, and assignment. It gives the Agent a believable physical place in history without replacing, possessing, or secretly inhabiting a documented historical person.</p>
        <p className="scene-copy">When the assignment ends, the modern Agent is the continuing character who returns. Another case may give them completely different Echo Ware.</p>
      </section>

      <section className="scene-panel completion-panel">
        <p className="eyebrow">What continues from here</p>
        <h2>The case keeps moving because the players moved it.</h2>
        <p className="scene-copy">The Inspector began with a historical foundation and a playable problem. The players chose how to investigate. Evidence changed what they knew and what they could attempt. Dice resolved an uncertain action when the result mattered. The Branch reacted to what they discovered.</p>
        <p className="scene-copy">A full Chronicle carries those choices further: the historical body used for the assignment, consequences, how much supernatural material can be true, how dangerous play can become, how research enters the campaign, threats, recovery, and eventually the character's return to the modern day.</p>
        <div className="completion-actions">
          <Link className="button button-primary" to="/playtest">Apply to playtest TCC</Link>
          <Link className="button button-secondary" to="/discover">Take the development survey</Link>
          <Link className="text-link" to="/">Return to the overview</Link>
        </div>
      </section>
    </main>
  )
}
