import { useState } from 'react'

import {
  HOMEPAGE_BREADCRUMB,
  ORGANIZATION_STRUCTURED_DATA,
} from './components/data'
import { ErrorBoundary } from './components/error'
import { Header } from './components/layout'
import { AboutSection, HeroSection } from './components/sections'
import { BreadcrumbSchema, JsonLdScript } from './components/seo'
import { MainContent, SkipLink } from './components/ui'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ErrorBoundary>
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <BreadcrumbSchema items={HOMEPAGE_BREADCRUMB} />
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      <div>
        <Header onSidebarToggle={setIsSidebarOpen} />
        <MainContent
          aria-label="Conteúdo principal"
          inert={isSidebarOpen || undefined}
        >
          <HeroSection />
          <AboutSection />
        </MainContent>
      </div>
    </ErrorBoundary>
  )
}

export default App
