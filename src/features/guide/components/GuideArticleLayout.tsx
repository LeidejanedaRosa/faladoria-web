import { Container } from '@shared/components/layout'
import { GUIDE_ROUTES } from '@shared/data'

import type { GuideArticle, GuideCategory } from '../data'
import { GuideBreadcrumb } from './GuideBreadcrumb'

interface GuideArticleLayoutProps {
  article: GuideArticle
  category: GuideCategory
}

export const GuideArticleLayout = ({
  article,
  category,
}: GuideArticleLayoutProps) => {
  const breadcrumbItems = [
    { name: 'Início', url: '/' },
    { name: 'Guia do SUS', url: GUIDE_ROUTES.root },
    { name: category.label, url: GUIDE_ROUTES.category(category.slug) },
    { name: article.title },
  ]

  return (
    <Container className='py-12 sm:py-16 lg:py-20'>
      <GuideBreadcrumb items={breadcrumbItems} />

      <article aria-labelledby='article-heading' className='mx-auto max-w-3xl'>
        <header className='mb-10'>
          <h1
            id='article-heading'
            className='text-purple-deepest text-3xl font-bold sm:text-4xl'
          >
            {article.title}
          </h1>
          <p className='mt-3 text-lg leading-relaxed text-gray-600'>
            {article.summary}
          </p>
        </header>

        <div className='space-y-4 text-gray-700'>
          {article.content ? (
            <p className='leading-relaxed'>{article.content}</p>
          ) : (
            <div className='rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center'>
              <p className='text-lg font-medium text-gray-500'>
                Conteúdo em breve
              </p>
              <p className='mt-2 text-sm text-gray-400'>
                Este artigo está sendo preparado com todo o cuidado que você
                merece.
              </p>
            </div>
          )}
        </div>
      </article>
    </Container>
  )
}
