import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from './App'
import { PlaytestPage, UpdatesPage } from './Build3Pages'
import './styles.css'

function PortalRoot() {
  const location = useLocation()

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
