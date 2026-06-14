import { GUIDE_ROUTES } from '@shared/data'
import { cn } from '@shared/utils/cn'
import { Link } from 'react-router-dom'

import type { GuideCategory } from '../data'
import { CATEGORY_THEME } from './guideCategoryTheme'
import { GUIDE_ICON_MAP } from './guideIconMap'

interface GuideCategoryCardProps {
  category: GuideCategory
}

export const GuideCategoryCard = ({ category }: GuideCategoryCardProps) => {
  const Icon = GUIDE_ICON_MAP[category.iconName]
  const theme = CATEGORY_THEME[category.color]

  return (
    <Link
      to={GUIDE_ROUTES.category(category.slug)}
      className={cn(
        'group flex flex-col items-center gap-2.5 rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        'focus-visible:ring-purple-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        theme.borderHover
      )}
    >
      <div
        className={cn(
          'rounded-full p-3 transition-opacity group-hover:opacity-90',
          theme.iconBg
        )}
        aria-hidden='true'
      >
        <Icon className='h-6 w-6 text-white' />
      </div>
      <div className='flex flex-col gap-0.5'>
        <h4 className='text-sm leading-snug font-bold text-gray-900'>
          {category.label}
        </h4>
        <p className='text-xs leading-snug text-gray-500'>
          {category.description}
        </p>
      </div>
    </Link>
  )
}
