import { Link } from 'react-router-dom'

export default function Build3Privacy() {
  return (
    <main className="form-page privacy-detail-page">
      <section className="form-intro">
        <p className="eyebrow">Portal data + privacy</p>
        <h1>What the TCC portal collects.</h1>
        <p className="lede">
          You can complete Orientation, Discovery, and the guided Chronicle without creating an account.
        </p>
      </section>

      <section className="privacy-detail-grid">
        <article>
          <h2>Discovery + guided demo</h2>
          <p>
            Your answers are saved in your browser so you can leave and resume. When you finish the guided Chronicle, the portal sends an anonymous testing snapshot to TCC so we can compare what visitors said they wanted, what they chose during the demo, and how they felt afterward.
          </p>
          <p>
            That snapshot includes a random portal session ID, Discovery selections, guided-demo choices, whether you opened optional source detail, and post-demo answers. It does not include your name or email.
          </p>
        </article>

        <article>
          <h2>Playtest application</h2>
          <p>
            If you separately apply to playtest, the application asks for contact and scheduling information. The optional accessibility field is only for information you want the playtest organizer to know in order to make a session workable for you.
          </p>
          <p>
            Applying to playtest does not subscribe you to release or marketing email.
          </p>
        </article>

        <article>
          <h2>Release updates</h2>
          <p>
            The release-update form collects an email address only after you actively check the consent box. That list is separate from playtest applications.
          </p>
        </article>

        <article>
          <h2>Infrastructure</h2>
          <p>
            The portal runs on Cloudflare Workers and Cloudflare D1. It is not configured to send portal data to Vercel or Supabase.
          </p>
        </article>

        <article>
          <h2>Privacy + deletion requests</h2>
          <p>
            Contact <a href="mailto:privacy@tccrpg.com">privacy@tccrpg.com</a> for privacy questions or deletion requests.
          </p>
        </article>
      </section>

      <section className="privacy-open-item">
        <h2>Before public recruitment</h2>
        <p>
          The project still needs a final published retention period. That policy will be locked before the Build 3 forms are opened for public recruitment.
        </p>
      </section>

      <Link className="button button-secondary" to="/">Return home</Link>
    </main>
  )
}
