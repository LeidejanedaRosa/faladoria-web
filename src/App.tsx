import {
  HOMEPAGE_BREADCRUMB,
  ORGANIZATION_STRUCTURED_DATA,
} from './components/data'
import { ErrorBoundary } from './components/error'
import { AboutSection, HeroSection } from './components/sections'
import { BreadcrumbSchema, JsonLdScript } from './components/seo'

function App() {
  return (
    <ErrorBoundary>
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <BreadcrumbSchema items={HOMEPAGE_BREADCRUMB} />
      <div>
        <main role="main" aria-label="Conteúdo principal">
          <HeroSection />
          <AboutSection />
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App
