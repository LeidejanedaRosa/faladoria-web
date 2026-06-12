import { CheckIcon, ChevronRightIcon } from '@shared/components/ui'
import { GUIDE_ROUTES } from '@shared/data'
import { cn } from '@shared/utils/cn'
import { Link } from 'react-router-dom'

import type { GuideArticle, GuideCategory } from '../data'
import { CATEGORY_THEME } from './guideCategoryTheme'
import { GUIDE_ICON_MAP } from './guideIconMap'
import { GUIDE_ARTICLE_IMAGES } from './guideImageMap'

interface GuideArticleCardProps {
  article: GuideArticle
  category: GuideCategory
}

const ArticleCardImage = ({ src }: { src: string }) => (
  <div className='h-40 w-full overflow-hidden bg-gray-100'>
    <img
      src={src}
      alt=''
      aria-hidden='true'
      className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
      width={600}
      height={160}
      loading='lazy'
    />
  </div>
)

const ArticleCardHighlights = ({
  highlights,
  textAccent,
}: {
  highlights: readonly string[]
  textAccent: string
}) => (
  <ul className='flex flex-col gap-2' aria-label='Tópicos abordados'>
    {highlights.map(highlight => (
      <li
        key={highlight}
        className='flex items-start gap-2 text-sm text-gray-600'
      >
        <CheckIcon
          className={cn('mt-0.5 h-4 w-4 shrink-0', textAccent)}
          aria-hidden='true'
        />
        {highlight}
      </li>
    ))}
  </ul>
)

export const GuideArticleCard = ({
  article,
  category,
}: GuideArticleCardProps) => {
  const Icon = GUIDE_ICON_MAP[category.iconName]
  const theme = CATEGORY_THEME[category.color]
  const articleImage = GUIDE_ARTICLE_IMAGES[article.slug]

  return (
    <Link
      to={GUIDE_ROUTES.article(article.categorySlug, article.slug)}
      aria-label={`Ver artigo: ${article.title}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        'focus-visible:ring-purple-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        theme.borderHover
      )}
    >
      {articleImage && <ArticleCardImage src={articleImage} />}

      <div className='flex flex-1 flex-col gap-4 p-6'>
        <div className='flex items-start gap-4'>
          <div
            className={cn('shrink-0 rounded-full p-3', theme.iconBgLight)}
            aria-hidden='true'
          >
            <Icon className={cn('h-5 w-5', theme.textAccent)} />
          </div>
          <div className='flex-1'>
            <h2
              className={cn(
                'text-base leading-snug font-semibold transition-colors',
                theme.textAccent
              )}
            >
              {article.title}
            </h2>
            <p className='mt-1.5 text-sm leading-relaxed text-gray-600'>
              {article.summary}
            </p>
          </div>
        </div>

        {article.highlights && article.highlights.length > 0 && (
          <ArticleCardHighlights
            highlights={article.highlights}
            textAccent={theme.textAccent}
          />
        )}

        <div className='mt-auto flex items-center justify-end'>
          <span
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              theme.text
            )}
          >
            Ver passo a passo
            <ChevronRightIcon className='h-4 w-4' />
          </span>
        </div>
      </div>
    </Link>
  )
}
