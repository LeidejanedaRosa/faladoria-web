import { useEffect, useState } from 'react'

import {
  COMPANY_INFO,
  createFaqStructuredData,
  FAQ_CONTENT,
  HOMEPAGE_BREADCRUMB,
  ORGANIZATION_STRUCTURED_DATA,
} from '@components/data'
import { FooterSection, Header } from '@components/layout'
import {
  AboutSection,
  FaqSection,
  GuideHighlightSection,
  HeroSection,
  HowItWorksSection,
  ProblemSection,
  SolutionSection,
  TransparencySection,
} from '@components/sections'
import { BreadcrumbSchema, JsonLdScript } from '@components/seo'
import { MainContent, SkipLink } from '@components/ui'
import { useDocumentMeta } from '@hooks/useDocumentMeta'

export function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useDocumentMeta({
    title: COMPANY_INFO.shortDescription,
    description: COMPANY_INFO.description,
  })

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      requestAnimationFrame(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'instant' })
        }
      })
    }
  }, [])

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
            <GuideHighlightSection />
            <FaqSection />
          </MainContent>
          <FooterSection />
        </div>
      </div>
    </>
  )
}
