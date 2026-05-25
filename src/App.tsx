import { lazy, Suspense } from 'react'

import {
  HomePage,
  NotFoundPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
} from '@features/landing/pages'
import { ErrorBoundary } from '@shared/components/error'
import { GUIDE_ROUTES } from '@shared/data'
import { Route, Routes } from 'react-router-dom'

// Intentional: imports from internal feature paths to enable per-page code splitting.
// Importing from the feature barrel (features/guide) would bundle both pages into
// the same chunk, defeating the purpose of lazy loading.
const GuidePage = lazy(() =>
  import('./features/guide/pages/GuidePage').then(m => ({
    default: m.GuidePage,
  }))
)

const GuideCategoryPage = lazy(() =>
  import('./features/guide/pages/GuideCategoryPage').then(m => ({
    default: m.GuideCategoryPage,
  }))
)

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className='min-h-screen' />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path={GUIDE_ROUTES.root} element={<GuidePage />} />
          <Route
            path={`${GUIDE_ROUTES.root}/:categorySlug`}
            element={<GuideCategoryPage />}
          />
          <Route
            path='/politica-de-privacidade'
            element={<PrivacyPolicyPage />}
          />
          <Route path='/termos-de-uso' element={<TermsOfUsePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
