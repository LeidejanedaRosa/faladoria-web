import { PageShell } from '@shared/components/layout'
import { BreadcrumbSchema, JsonLdScript } from '@shared/components/seo'
import {
  createBreadcrumb,
  GUIDE_ROUTES,
  ORGANIZATION_STRUCTURED_DATA,
} from '@shared/data'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useScrollToTop } from '@shared/hooks/useScrollToTop'
import { Navigate, useParams } from 'react-router-dom'

import { GuideCategoryLayout } from '../components'
import { GUIDE_CATEGORIES } from '../data'

export function GuideCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>()

  const category = GUIDE_CATEGORIES.find(c => c.slug === categorySlug)

  useDocumentMeta({
    title: category ? `${category.label} — Guia do SUS` : 'Guia do SUS',
    description: category?.description,
  })
  useScrollToTop()

  if (!category) {
    return <Navigate to={GUIDE_ROUTES.root} replace />
  }

  const breadcrumbItems = createBreadcrumb([
    { name: 'Início', url: '/' },
    { name: 'Guia do SUS', url: GUIDE_ROUTES.root },
    { name: category.label },
  ])

  return (
    <PageShell
      mainContentLabel={category.label}
      schemas={
        <>
          <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
          <BreadcrumbSchema items={breadcrumbItems} />
        </>
      }
    >
      <GuideCategoryLayout category={category} />
    </PageShell>
  )
}
