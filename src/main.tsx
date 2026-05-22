import React from 'react'

import '@fontsource-variable/inter'
import { initSentry } from '@shared/lib/sentry'
import { reportWebVitals } from '@shared/utils/reportWebVitals'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

if (import.meta.env.PROD) {
  initSentry()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

if (import.meta.env.PROD) {
  reportWebVitals()
}
