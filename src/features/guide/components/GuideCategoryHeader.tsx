import { InfoCircleIcon } from '@shared/components/ui'
import { cn } from '@shared/utils/cn'

import {
  GUIDE_CATEGORY_HEADING_ID,
  GUIDE_CONTENT,
  type GuideCategory,
} from '../data'
import { CATEGORY_THEME } from './guideCategoryTheme'
import { GUIDE_ICON_MAP } from './guideIconMap'
import { GUIDE_CATEGORY_IMAGES } from './guideImageMap'

interface GuideCategoryHeaderProps {
  category: GuideCategory
}

export const GuideCategoryHeader = ({ category }: GuideCategoryHeaderProps) => {
  const theme = CATEGORY_THEME[category.color]
  const Icon = GUIDE_ICON_MAP[category.iconName]
  const categoryImage = GUIDE_CATEGORY_IMAGES[category.slug]
  const { infoBanner } = GUIDE_CONTENT.categoryPage

  return (
    <header className='relative overflow-hidden rounded-3xl bg-gray-50 px-6 py-10 sm:px-10 lg:px-12'>
      <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
        <div className='max-w-xl'>
          <div
            className={cn('mb-5 inline-flex rounded-2xl p-4', theme.iconBg)}
            aria-hidden='true'
          >
            <Icon className='h-10 w-10 text-white' />
          </div>
          <h1
            id={GUIDE_CATEGORY_HEADING_ID}
            className='text-purple-deepest text-4xl font-bold sm:text-5xl'
          >
            {category.label}
          </h1>
          <p className='mt-3 text-lg leading-relaxed text-gray-600'>
            {category.description}
          </p>

          <div
            className={cn(
              'mt-8 flex items-center gap-3 rounded-xl border px-5 py-3',
              theme.softBg,
              theme.border,
              theme.text
            )}
          >
            <InfoCircleIcon className='h-4.5 w-4.5 shrink-0' />
            <p className='text-sm'>{infoBanner}</p>
          </div>
        </div>
        {categoryImage && (
          <img
            src={categoryImage}
            alt=''
            aria-hidden='true'
            className='w-full max-w-xs self-end object-contain lg:max-w-xl'
            width={400}
            height={320}
            loading='eager'
          />
        )}
      </div>
    </header>
  )
}
