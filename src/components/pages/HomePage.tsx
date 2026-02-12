import { useState } from 'react'

import {
  createFaqStructuredData,
  FAQ_CONTENT,
  HOMEPAGE_BREADCRUMB,
  ORGANIZATION_STRUCTURED_DATA,
} from '@components/data'
import { FooterSection, Header } from '@components/layout'
import {
  AboutSection,
  FaqSection,
  HeroSection,
  HowItWorksSection,
  ProblemSection,
  SolutionSection,
  TransparencySection,
} from '@components/sections'
import { BreadcrumbSchema, JsonLdScript } from '@components/seo'
import { MainContent, SkipLink } from '@components/ui'

export function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <JsonLdScript data={createFaqStructuredData(FAQ_CONTENT.items)} />
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
            <FaqSection />
          </MainContent>
          <FooterSection />
        </div>
      </div>
    </>
  )
}
