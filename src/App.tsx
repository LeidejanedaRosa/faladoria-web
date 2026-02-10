import { useState } from 'react'

import {
  HOMEPAGE_BREADCRUMB,
  ORGANIZATION_STRUCTURED_DATA,
} from './components/data'
import { ErrorBoundary } from './components/error'
import { FooterSection, Header } from './components/layout'
import {
  AboutSection,
  HeroSection,
  HowItWorksSection,
  ProblemSection,
  SolutionSection,
  TransparencySection,
} from './components/sections'
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
        <div inert={isSidebarOpen || undefined}>
          <MainContent aria-label="Conteúdo principal">
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <TransparencySection />
            <AboutSection />
          </MainContent>
          <FooterSection />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
