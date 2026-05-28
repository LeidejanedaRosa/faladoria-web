import { Container } from '@shared/components/layout'
import { GUIDE_ROUTES } from '@shared/data'

import {
  getArticlesByCategory,
  GUIDE_CONTENT,
  type GuideCategory,
} from '../data'
import { GuideArticleCard } from './GuideArticleCard'
import { GuideBreadcrumb } from './GuideBreadcrumb'

interface GuideCategoryLayoutProps {
  category: GuideCategory
}

export const GuideCategoryLayout = ({ category }: GuideCategoryLayoutProps) => {
  const articles = getArticlesByCategory(category.slug)

  const breadcrumbItems = [
    { name: 'Início', url: '/' },
    { name: 'Guia do SUS', url: GUIDE_ROUTES.root },
    { name: category.label },
  ]

  return (
    <Container className='py-12 sm:py-16 lg:py-20'>
      <GuideBreadcrumb items={breadcrumbItems} />

      <section aria-labelledby='category-heading' className='mx-auto max-w-3xl'>
        <header className='mb-10'>
          <h1
            id='category-heading'
            className='text-purple-deepest text-3xl font-bold sm:text-4xl'
          >
            {category.label}
          </h1>
          <p className='mt-3 text-lg leading-relaxed text-gray-600'>
            {category.description}
          </p>
        </header>

        {articles.length > 0 ? (
          <ul
            className='flex flex-col gap-4'
            aria-label={`Artigos de ${category.label}`}
          >
            {articles.map(article => (
              <li key={article.slug}>
                <GuideArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center'>
            <p className='text-lg font-medium text-gray-500'>
              {GUIDE_CONTENT.comingSoon.heading}
            </p>
            <p className='mt-2 text-sm text-gray-400'>
              {GUIDE_CONTENT.comingSoon.description}
            </p>
          </div>
        )}
      </section>
    </Container>
  )
}
