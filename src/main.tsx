import React from 'react'

import '@fontsource-variable/inter'
import { createQueryClient } from '@shared/lib/queryClient'
import { initSentry } from '@shared/lib/sentry'
import { reportWebVitals } from '@shared/utils/reportWebVitals'
import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

if (import.meta.env.PROD) {
  initSentry()
}

const queryClient = createQueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

if (import.meta.env.PROD) {
  reportWebVitals()
}
