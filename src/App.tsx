import { Link, Route, Routes } from 'react-router-dom'

const fullLogo = '/time-crawl-chronicles-logo.jpg'
const lanternMark = '/time-crawl-chronicles-lantern.jpg'

const features = [
  'Free forever. Every book, every form, no account needed.',
  'Built for your town. Lantern Archive writes custom history for any place.',
  'Classroom safe. Built-in consent tools and facilitator support.',
]

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Time-Crawl Chronicles home">
        <span className="program-label">A LanternStoryWorks Program</span>
        <img
          className="header-logo"
          src={fullLogo}
          alt="Time-Crawl Chronicles logo, a lit brass lantern"
        />
      </Link>
    </header>
  )
}

function HomePage() {
  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">Local history becomes a living decision.</p>
          <h1 id="hero-heading">Play history. Change the ending.</h1>
          <p className="hero-subtext">
            A classroom roleplaying game where students live their own town&apos;s
            history, and win by reforming it, not fighting it.
          </p>

          <div className="hero-actions" aria-label="Primary actions">
            <Link className="button button-primary" to="/books">
              Get the free books
            </Link>
            <Link className="button button-secondary" to="/schools">
              For schools and districts
            </Link>
          </div>
        </div>

        <div className="hero-art" aria-label="Time-Crawl Chronicles artwork">
          <img
            src={fullLogo}
            alt="Time-Crawl Chronicles logo, a lit brass lantern"
          />
        </div>
      </section>

      <section className="feature-section" aria-label="Program features">
        <div className="feature-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature}>
              <span className="feature-number" aria-hidden="true">
                0{index + 1}
              </span>
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-heading">
        <div className="closing-mark" aria-hidden="true">
          <img src={lanternMark} alt="" />
        </div>
        <div className="closing-copy">
          <h2 id="closing-heading">
            Students step into a real moment from their own town&apos;s past, and
            get to choose how it turns out.
          </h2>
          <Link className="text-link" to="/how-it-works">
            See how it works <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

type PlaceholderPageProps = {
  title: string
  body: string
}

function PlaceholderPage({ title, body }: PlaceholderPageProps) {
  return (
    <main className="placeholder-page">
      <img
        className="placeholder-mark"
        src={lanternMark}
        alt="Time-Crawl Chronicles lantern mark"
      />
      <p className="eyebrow">Time-Crawl Chronicles</p>
      <h1>{title}</h1>
      <p>{body}</p>
      <Link className="text-link" to="/">
        Return to the home page <span aria-hidden="true">→</span>
      </Link>
    </main>
  )
}

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/how-it-works"
            element={
              <PlaceholderPage
                title="How It Works"
                body="The complete classroom journey, facilitator structure, and local-history process will live here."
              />
            }
          />
          <Route
            path="/books"
            element={
              <PlaceholderPage
                title="Free Books"
                body="The downloadable student books, facilitator materials, and forms will be available here."
              />
            }
          />
          <Route
            path="/schools"
            element={
              <PlaceholderPage
                title="For Schools and Districts"
                body="Implementation support, district information, and partnership details will be available here."
              />
            }
          />
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Page Not Found"
                body="That page has not been added to the archive."
              />
            }
          />
        </Routes>
      </div>
      <footer>
        <p>© {new Date().getFullYear()} Vogtcom LLC. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
