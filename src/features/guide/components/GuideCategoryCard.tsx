import { GUIDE_ROUTES } from '@shared/data'
import { cn } from '@shared/utils/cn'
import { Link } from 'react-router-dom'

import type { GuideCategory } from '../data'
import { GUIDE_ICON_MAP } from './guideIconMap'

interface GuideCategoryCardProps {
  category: GuideCategory
}

const CATEGORY_COLORS = {
  purple: {
    card: 'bg-purple-50 border border-purple-200 hover:border-purple-400 hover:shadow-purple-100',
    iconWrapper: 'bg-purple-100 group-hover:bg-purple-600',
    icon: 'text-purple-700 group-hover:text-white',
    label: 'text-purple-900',
  },
  blue: {
    card: 'bg-blue-50 border border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
    iconWrapper: 'bg-blue-100 group-hover:bg-blue-600',
    icon: 'text-blue-700 group-hover:text-white',
    label: 'text-blue-900',
  },
  amber: {
    card: 'bg-amber-50 border border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
    iconWrapper: 'bg-amber-100 group-hover:bg-amber-600',
    icon: 'text-amber-700 group-hover:text-white',
    label: 'text-amber-900',
  },
  teal: {
    card: 'bg-teal-50 border border-teal-200 hover:border-teal-400 hover:shadow-teal-100',
    iconWrapper: 'bg-teal-100 group-hover:bg-teal-600',
    icon: 'text-teal-700 group-hover:text-white',
    label: 'text-teal-900',
  },
  green: {
    card: 'bg-green-50 border border-green-200 hover:border-green-400 hover:shadow-green-100',
    iconWrapper: 'bg-green-100 group-hover:bg-green-600',
    icon: 'text-green-700 group-hover:text-white',
    label: 'text-green-900',
  },
  rose: {
    card: 'bg-rose-50 border border-rose-200 hover:border-rose-400 hover:shadow-rose-100',
    iconWrapper: 'bg-rose-100 group-hover:bg-rose-600',
    icon: 'text-rose-700 group-hover:text-white',
    label: 'text-rose-900',
  },
} as const

export const GuideCategoryCard = ({ category }: GuideCategoryCardProps) => {
  const Icon = GUIDE_ICON_MAP[category.iconName]
  const colors = CATEGORY_COLORS[category.color]

  return (
    <Link
      to={GUIDE_ROUTES.category(category.slug)}
      className={cn(
        'group flex flex-col items-center gap-4 rounded-2xl p-6 text-center',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
        'focus-visible:ring-purple-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        colors.card
      )}
    >
      <div
        className={cn('rounded-2xl p-4 transition-colors', colors.iconWrapper)}
      >
        <Icon className={cn('h-12 w-12 transition-colors', colors.icon)} />
      </div>
      <span className={cn('text-base leading-snug font-bold', colors.label)}>
        {category.label}
      </span>
    </Link>
  )
}
