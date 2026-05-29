import { PageShell } from '@shared/components/layout'
import { BreadcrumbSchema, JsonLdScript } from '@shared/components/seo'
import {
  COMPANY_INFO,
  createBreadcrumb,
  GUIDE_ROUTES,
  ORGANIZATION_STRUCTURED_DATA,
} from '@shared/data'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useScrollToTop } from '@shared/hooks/useScrollToTop'

import {
  GuideCategoriesSection,
  GuideHeroSection,
  GuideWhySection,
} from '../components'
import { GUIDE_COLLECTION_PAGE_STRUCTURED_DATA, GUIDE_CONTENT } from '../data'

const breadcrumbItems = createBreadcrumb([
  { name: 'Início', url: '/' },
  { name: 'Guia do SUS' },
])

export function GuidePage() {
  useDocumentMeta({
    title: GUIDE_CONTENT.seo.title,
    description: GUIDE_CONTENT.seo.description,
    canonical: `${COMPANY_INFO.url}${GUIDE_ROUTES.root}`,
  })
  useScrollToTop()

  return (
    <PageShell
      mainContentLabel={GUIDE_CONTENT.seo.title}
      schemas={
        <>
          <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
          <JsonLdScript data={GUIDE_COLLECTION_PAGE_STRUCTURED_DATA} />
          <BreadcrumbSchema items={breadcrumbItems} />
        </>
      }
    >
      <GuideHeroSection />
      <GuideCategoriesSection />
      <GuideWhySection />
    </PageShell>
  )
}
