import { useEffect } from 'react'

import { PageShell } from '@shared/components/layout'
import { BreadcrumbSchema, JsonLdScript } from '@shared/components/seo'
import { COMPANY_INFO } from '@shared/data/companyInfo'
import {
  createFaqStructuredData,
  HOMEPAGE_BREADCRUMB,
  ORGANIZATION_STRUCTURED_DATA,
} from '@shared/data/structuredData'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'

import {
  AboutSection,
  FaqSection,
  GuideHighlightSection,
  HeroSection,
  HowItWorksSection,
  ProblemSection,
  SolutionSection,
  TransparencySection,
} from '../components/sections'
import { FAQ_CONTENT } from '../data/faqContent'

export function HomePage() {
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
    <PageShell
      mainContentLabel='Conteúdo principal'
      schemas={
        <>
          <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
          <JsonLdScript data={createFaqStructuredData(FAQ_CONTENT.items)} />
          <BreadcrumbSchema items={HOMEPAGE_BREADCRUMB} />
        </>
      }
    >
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TransparencySection />
      <AboutSection />
      <GuideHighlightSection />
      <FaqSection />
    </PageShell>
  )
}
