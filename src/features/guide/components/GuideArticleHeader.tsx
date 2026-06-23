import { cn } from '@shared/utils/cn'

import {
  GUIDE_ARTICLE_HEADING_ID,
  type GuideArticle,
  type GuideCategory,
} from '../data'
import { CATEGORY_THEME } from './guideCategoryTheme'
import { GUIDE_ICON_MAP } from './guideIconMap'
import { GUIDE_ARTICLE_IMAGES, GUIDE_CATEGORY_IMAGES } from './guideImageMap'

interface GuideArticleHeaderProps {
  article: GuideArticle
  category: GuideCategory | undefined
}

export const GuideArticleHeader = ({
  article,
  category,
}: GuideArticleHeaderProps) => {
  const theme = CATEGORY_THEME[category?.color ?? 'purple']
  const Icon = category ? GUIDE_ICON_MAP[category.iconName] : null
  const articleImage = GUIDE_ARTICLE_IMAGES[article.slug]
  const categoryImage = category
    ? GUIDE_CATEGORY_IMAGES[category.slug]
    : undefined
  const headerImage = articleImage ?? categoryImage

  return (
    <header className='mb-10'>
      <div className='relative overflow-hidden rounded-3xl bg-gray-50 px-6 py-10 sm:px-10 lg:px-12'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
          <div className='max-w-xl'>
            {Icon && (
              <div
                className={cn('mb-5 inline-flex rounded-2xl p-4', theme.iconBg)}
                aria-hidden='true'
              >
                <Icon className='h-10 w-10 text-white' />
              </div>
            )}
            <h1
              id={GUIDE_ARTICLE_HEADING_ID}
              className='text-purple-deepest text-4xl font-bold sm:text-5xl'
            >
              {article.title}
            </h1>
            <p className='mt-3 text-lg leading-relaxed text-gray-600'>
              {article.summary}
            </p>
          </div>

          {headerImage && (
            <img
              src={headerImage}
              alt=''
              aria-hidden='true'
              className='w-full max-w-xs self-end object-contain lg:max-w-xl'
              width={576}
              height={384}
              loading='eager'
              fetchPriority='high'
            />
          )}
        </div>
      </div>
    </header>
  )
}
