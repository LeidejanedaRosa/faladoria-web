import { lazy, Suspense } from 'react'

import { AUTH_ROUTES } from '@features/auth/data/authContent'
import {
  HomePage,
  NotFoundPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
} from '@features/landing/pages'
import { ErrorBoundary } from '@shared/components/error'
import { GUIDE_ROUTES, PANEL_ROUTES } from '@shared/data'
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

const GuideArticlePage = lazy(() =>
  import('./features/guide/pages/GuideArticlePage').then(m => ({
    default: m.GuideArticlePage,
  }))
)

// The panel lives in its own chunks: a visitor of the public site never downloads it.
const AuthPage = lazy(() =>
  import('./features/auth/pages/AuthPage').then(m => ({
    default: m.AuthPage,
  }))
)

const PanelRoot = lazy(() =>
  import('./features/panel/pages/PanelRoot').then(m => ({
    default: m.PanelRoot,
  }))
)

const PanelHomePage = lazy(() =>
  import('./features/panel/pages/PanelHomePage').then(m => ({
    default: m.PanelHomePage,
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
            path={`${GUIDE_ROUTES.root}/:categorySlug/:articleSlug`}
            element={<GuideArticlePage />}
          />
          <Route
            path='/politica-de-privacidade'
            element={<PrivacyPolicyPage />}
          />
          <Route path='/termos-de-uso' element={<TermsOfUsePage />} />
          {/* Same element type on both: React keeps the card mounted, and it slides. */}
          <Route path={AUTH_ROUTES.login} element={<AuthPage mode='login' />} />
          <Route
            path={AUTH_ROUTES.changePassword}
            element={<AuthPage mode='changePassword' />}
          />
          <Route path={PANEL_ROUTES.root} element={<PanelRoot />}>
            <Route index element={<PanelHomePage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
