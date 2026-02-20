import { Navigate, useParams } from 'react-router-dom'

import {
  createBreadcrumb,
  ORGANIZATION_STRUCTURED_DATA,
} from '@components/data'
import { PageShell } from '@components/layout'
import { BreadcrumbSchema, JsonLdScript } from '@components/seo'
import { useDocumentMeta } from '@hooks/useDocumentMeta'
import { useScrollToTop } from '@hooks/useScrollToTop'

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
    return <Navigate to="/guia-do-sus" replace />
  }

  const breadcrumbItems = createBreadcrumb([
    { name: 'Início', url: '/' },
    { name: 'Guia do SUS', url: '/guia-do-sus' },
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
