import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import DevelopmentSurveyPage, { SurveyCompletePage } from './DevelopmentSurveyPage'
import PublicHome from './PublicHome'
import SampleChroniclePage from './SampleChroniclePage'

type AccessibilitySettings = {
  largeText: boolean
  highContrast: boolean
  reduceMotion: boolean
}

const ACCESSIBILITY_KEY = 'tcc_portal_accessibility_v1'
const fullLogo = '/time-crawl-chronicles-logo.svg'

function loadAccessibility(): AccessibilitySettings {
  const defaults = { largeText: false, highContrast: false, reduceMotion: false }
  if (typeof window === 'undefined') return defaults

  try {
    return { ...defaults, ...JSON.parse(window.localStorage.getItem(ACCESSIBILITY_KEY) ?? '{}') }
  } catch {
    return defaults
  }
}
function SiteHeader({
  settings,
  onSettingsChange,
}: {
  settings: AccessibilitySettings
  onSettingsChange: (next: AccessibilitySettings) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Time-Crawl Chronicles home">
        <img className="brand-logo" src={fullLogo} alt="" />
        <span className="brand-copy">
          <strong>Time-Crawl Chronicles</strong>
          <span>Tabletop roleplaying game</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link to="/">Home</Link>
        <a href="/#how-tcc-works">How TCC Works</a>
        <Link to="/experience">The Missing Name</Link>
        <Link to="/discover">Help Shape TCC</Link>
        <Link to="/playtest">Playtest</Link>
        <Link to="/updates">Updates</Link>
      </nav>
      <div className="accessibility-wrap">
        <button
          className="utility-button"
          type="button"
          aria-expanded={open}
          aria-controls="accessibility-panel"
          onClick={() => setOpen((value) => !value)}
        >
          Accessibility
        </button>

        {open && (
          <div className="accessibility-panel" id="accessibility-panel">
            <label>
              <input
                type="checkbox"
                checked={settings.largeText}
                onChange={(event) => onSettingsChange({ ...settings, largeText: event.target.checked })}
              />
              Larger text
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(event) => onSettingsChange({ ...settings, highContrast: event.target.checked })}
              />
              Higher contrast
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.reduceMotion}
                onChange={(event) => onSettingsChange({ ...settings, reduceMotion: event.target.checked })}
              />
              Reduce motion
            </label>
          </div>
        )}
      </div>
    </header>
  )
}

export default function App() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => loadAccessibility())

  useEffect(() => {
    window.localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(settings))
    document.documentElement.dataset.largeText = settings.largeText ? 'true' : 'false'
    document.documentElement.dataset.highContrast = settings.highContrast ? 'true' : 'false'
    document.documentElement.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false'
  }, [settings])
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader settings={settings} onSettingsChange={setSettings} />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/discover" element={<DevelopmentSurveyPage />} />
          <Route path="/discovery" element={<DevelopmentSurveyPage />} />
          <Route path="/survey-complete" element={<SurveyCompletePage />} />
          <Route path="/profile" element={<SurveyCompletePage />} />
          <Route path="/experience" element={<SampleChroniclePage />} />
          <Route path="/demo" element={<SampleChroniclePage />} />
          <Route path="*" element={<PublicHome />} />
        </Routes>
      </div>
      <footer>
        <nav aria-label="Footer navigation">
          <Link to="/playtest">Playtest</Link>
          <Link to="/review">Private Review</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/updates">Updates</Link>
        </nav>
        <p>Time-Crawl Chronicles is a tabletop roleplaying game in development by Vogtcom LLC.</p>
      </footer>
    </div>
  )
}
