import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import App from './App'
import { retryPendingPortalSubmission } from './analytics'
import { PlaytestPage, UpdatesPage } from './Build3Pages'
import Build3Privacy from './Build3Privacy'
import './styles.css'
import './build3.css'

function PortalRoot() {
  const location = useLocation()

  useEffect(() => {
    retryPendingPortalSubmission()
  }, [])

  if (location.pathname === '/playtest') return <PlaytestPage />
  if (location.pathname === '/updates') return <UpdatesPage />
  if (location.pathname === '/privacy') return <Build3Privacy />

  return (
    <>
      {location.pathname === '/experience' && (
        <div className="data-notice">
          Finishing the guided demo sends an anonymous testing snapshot to TCC. No name or email is attached. <Link to="/privacy">What is collected?</Link>
        </div>
      )}
      <App />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PortalRoot />
    </BrowserRouter>
  </StrictMode>,
)
