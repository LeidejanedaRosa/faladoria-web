import { Route, Routes } from 'react-router-dom'

import { ErrorBoundary } from './components/error'
import {
  HomePage,
  NotFoundPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
} from './components/pages'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/politica-de-privacidade"
          element={<PrivacyPolicyPage />}
        />
        <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
