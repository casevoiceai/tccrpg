import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from './App'
import { retryPendingPortalSubmission } from './analytics'
import { PlaytestPage, UpdatesPage } from './Build3Pages'
import './styles.css'

function PortalRoot() {
  const location = useLocation()

  useEffect(() => {
    retryPendingPortalSubmission()
  }, [])

  if (location.pathname === '/playtest') return <PlaytestPage />
  if (location.pathname === '/updates') return <UpdatesPage />

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PortalRoot />
    </BrowserRouter>
  </StrictMode>,
)
