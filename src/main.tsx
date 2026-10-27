import React from 'react'

import { SESSION_QUERY_KEY } from '@features/auth/hooks/useSession'
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

// A request that finds the session gone re-reads it, and the panel guard sends the person to
// the login from there.
const queryClient = createQueryClient({
  onSessionLost: () =>
    void queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY }),
})

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
