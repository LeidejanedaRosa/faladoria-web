import { Container } from '@shared/components/layout'
import { InfoCircleIcon } from '@shared/components/ui'
import type { BreadcrumbItem } from '@shared/data'
import { cn } from '@shared/utils/cn'

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
import { CATEGORY_THEME } from './guideCategoryTheme'

interface GuideCategoryLayoutProps {
  category: GuideCategory
  breadcrumbItems: BreadcrumbItem[]
}

export const GuideCategoryLayout = ({
  category,
  breadcrumbItems,
}: GuideCategoryLayoutProps) => {
  const articles = getArticlesByCategory(category.slug)
  const { comingSoon, categoryPage } = GUIDE_CONTENT
  const theme = CATEGORY_THEME[category.color]

  return (
    <Container className='py-12 sm:py-16 lg:py-20'>
      <GuideBreadcrumb items={breadcrumbItems} />

      <section aria-labelledby={GUIDE_CATEGORY_HEADING_ID} className='mt-2'>
        <GuideCategoryHeader category={category} />

        {category.infoPoints && category.infoPoints.length > 0 && (
          <section
            aria-label={categoryPage.articles.infoPoints.heading}
            className={cn(
              'mt-6 rounded-2xl border px-6 py-5',
              theme.softBg,
              theme.border
            )}
          >
            <h2 className={cn('text-sm font-semibold', theme.text)}>
              {categoryPage.articles.infoPoints.heading}
            </h2>
            <ul className='mt-3 space-y-2'>
              {category.infoPoints.map(point => (
                <li
                  key={point}
                  className={cn('flex items-start gap-2 text-sm', theme.text)}
                >
                  <InfoCircleIcon
                    className='mt-0.5 h-4 w-4 shrink-0'
                    aria-hidden='true'
                  />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

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
