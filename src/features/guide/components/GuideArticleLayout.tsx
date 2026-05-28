import { Container } from '@shared/components/layout'
import { GUIDE_ROUTES } from '@shared/data'

import type { ArticleBlock, GuideArticle, GuideCategory } from '../data'
import { GuideBreadcrumb } from './GuideBreadcrumb'

interface GuideArticleLayoutProps {
  article: GuideArticle
  category: GuideCategory
}

const ArticleBlockRenderer = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className='leading-relaxed text-gray-700'>{block.text}</p>

    case 'heading':
      return block.level === 2 ? (
        <h2 className='text-purple-deepest text-xl font-bold sm:text-2xl'>
          {block.text}
        </h2>
      ) : (
        <h3 className='text-purple-deepest text-lg font-semibold'>
          {block.text}
        </h3>
      )

    case 'list':
      return (
        <ul className='space-y-2 pl-5'>
          {block.items.map((item, index) => (
            <li key={index} className='list-disc leading-relaxed text-gray-700'>
              {item}
            </li>
          ))}
        </ul>
      )

    case 'callout':
      return (
        <div className='rounded-xl border border-purple-200 bg-purple-50 px-5 py-4'>
          <p className='text-sm leading-relaxed text-purple-900'>
            {block.text}
          </p>
        </div>
      )
  }
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

        {article.content.length > 0 ? (
          <div className='space-y-6'>
            {article.content.map((block, index) => (
              <ArticleBlockRenderer key={index} block={block} />
            ))}
          </div>
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
      </article>
    </Container>
  )
}
