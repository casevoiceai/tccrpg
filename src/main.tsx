/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from './App'
import { PlaytestPage, UpdatesPage } from './Build3Pages'
import Build3Privacy from './Build3Privacy'
import ReviewerPage from './ReviewerPage'
import './styles.css'
import './build3.css'

function PortalRoot() {
  const location = useLocation()

  if (location.pathname === '/playtest') return <PlaytestPage />
  if (location.pathname === '/updates') return <UpdatesPage />
  if (location.pathname === '/privacy') return <Build3Privacy />
  if (location.pathname === '/review') return <ReviewerPage />

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PortalRoot />
    </BrowserRouter>
  </StrictMode>,
)
