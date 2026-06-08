import { Container } from '@shared/components/layout'
import type { BreadcrumbItem } from '@shared/data'

import {
  getArticlesByCategory,
  GUIDE_CATEGORY_HEADING_ID,
  GUIDE_CONTENT,
  type GuideCategory,
} from '../data'
import { GuideArticleCard } from './GuideArticleCard'
import { GuideBreadcrumb } from './GuideBreadcrumb'
import { GuideCategoryFooter } from './GuideCategoryFooter'
import { GuideCategoryHeader } from './GuideCategoryHeader'

interface GuideCategoryLayoutProps {
  category: GuideCategory
  breadcrumbItems: BreadcrumbItem[]
}

export const GuideCategoryLayout = ({
  category,
  breadcrumbItems,
}: GuideCategoryLayoutProps) => {
  const articles = getArticlesByCategory(category.slug)
  const { comingSoon } = GUIDE_CONTENT

  return (
    <Container className='py-12 sm:py-16 lg:py-20'>
      <GuideBreadcrumb items={breadcrumbItems} />

      <section aria-labelledby={GUIDE_CATEGORY_HEADING_ID} className='mt-2'>
        <GuideCategoryHeader category={category} />

        {articles.length > 0 ? (
          <ul
            className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'
            aria-label={`Artigos de ${category.label}`}
          >
            {articles.map(article => (
              <li key={article.slug}>
                <GuideArticleCard article={article} category={category} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center'>
            <p className='text-lg font-medium text-gray-500'>
              {comingSoon.heading}
            </p>
            <p className='mt-2 text-sm text-gray-400'>
              {comingSoon.description}
            </p>
          </div>
        )}

        <GuideCategoryFooter />
      </section>
    </Container>
  )
}
