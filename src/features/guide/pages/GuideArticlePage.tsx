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
import { Navigate, useParams } from 'react-router-dom'

import { GuideArticleLayout } from '../components'
import {
  createArticleStructuredData,
  getArticleBySlug,
  getCategoryBySlug,
} from '../data'

export function GuideArticlePage() {
  const { categorySlug, articleSlug } = useParams<{
    categorySlug: string
    articleSlug: string
  }>()

  const article = getArticleBySlug(articleSlug ?? '', categorySlug)
  const category = getCategoryBySlug(categorySlug ?? '')

  useDocumentMeta({
    title: article ? `${article.title} — Guia do SUS` : 'Guia do SUS',
    description: article?.summary,
    canonical:
      article && category
        ? `${COMPANY_INFO.url}${GUIDE_ROUTES.article(category.slug, article.slug)}`
        : undefined,
    ogType: 'article',
  })
  useScrollToTop()

  if (!article || !category || article.categorySlug !== category.slug) {
    return <Navigate to={GUIDE_ROUTES.root} replace />
  }

  const breadcrumbItems = createBreadcrumb([
    { name: 'Início', url: '/' },
    { name: 'Guia do SUS', url: GUIDE_ROUTES.root },
    { name: category.label, url: GUIDE_ROUTES.category(category.slug) },
    { name: article.title },
  ])

  return (
    <PageShell
      mainContentLabel={article.title}
      schemas={
        <>
          <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
          <JsonLdScript
            data={createArticleStructuredData(
              article.title,
              article.summary,
              GUIDE_ROUTES.article(category.slug, article.slug),
              article.datePublished,
              article.dateModified
            )}
          />
          <BreadcrumbSchema items={breadcrumbItems} />
        </>
      }
    >
      <GuideArticleLayout
        article={article}
        category={category}
        breadcrumbItems={breadcrumbItems}
      />
    </PageShell>
  )
}
