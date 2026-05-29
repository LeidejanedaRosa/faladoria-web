import { GUIDE_ROUTES } from '@shared/data'
import { cn } from '@shared/utils/cn'
import { Link } from 'react-router-dom'

import type { GuideCategory } from '../data'
import { GUIDE_ICON_MAP } from './guideIconMap'

interface GuideCategoryCardProps {
  category: GuideCategory
}

const COLOR_CLASSES: Record<
  GuideCategory['color'],
  { iconBg: string; hoverBorder: string }
> = {
  purple: { iconBg: 'bg-purple-500', hoverBorder: 'hover:border-purple-300' },
  violet: { iconBg: 'bg-violet-500', hoverBorder: 'hover:border-violet-300' },
  indigo: { iconBg: 'bg-indigo-500', hoverBorder: 'hover:border-indigo-300' },
  blue: { iconBg: 'bg-blue-500', hoverBorder: 'hover:border-blue-300' },
  sky: { iconBg: 'bg-sky-500', hoverBorder: 'hover:border-sky-300' },
  cyan: { iconBg: 'bg-cyan-500', hoverBorder: 'hover:border-cyan-300' },
  teal: { iconBg: 'bg-teal-500', hoverBorder: 'hover:border-teal-300' },
  emerald: {
    iconBg: 'bg-emerald-500',
    hoverBorder: 'hover:border-emerald-300',
  },
  green: { iconBg: 'bg-green-500', hoverBorder: 'hover:border-green-300' },
  amber: { iconBg: 'bg-amber-500', hoverBorder: 'hover:border-amber-300' },
  orange: { iconBg: 'bg-orange-500', hoverBorder: 'hover:border-orange-300' },
  rose: { iconBg: 'bg-rose-500', hoverBorder: 'hover:border-rose-300' },
  pink: { iconBg: 'bg-pink-500', hoverBorder: 'hover:border-pink-300' },
  fuchsia: {
    iconBg: 'bg-fuchsia-500',
    hoverBorder: 'hover:border-fuchsia-300',
  },
}

export const GuideCategoryCard = ({ category }: GuideCategoryCardProps) => {
  const Icon = GUIDE_ICON_MAP[category.iconName]
  const { iconBg, hoverBorder } = COLOR_CLASSES[category.color]

  return (
    <Link
      to={GUIDE_ROUTES.category(category.slug)}
      className={cn(
        'group flex flex-col items-center gap-2.5 rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        'focus-visible:ring-purple-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        hoverBorder
      )}
    >
      <div
        className={cn(
          'rounded-full p-3 transition-opacity group-hover:opacity-90',
          iconBg
        )}
        aria-hidden='true'
      >
        <Icon className='h-6 w-6 text-white' />
      </div>
      <div className='flex flex-col gap-0.5'>
        <span className='text-sm leading-snug font-bold text-gray-900'>
          {category.label}
        </span>
        <p className='text-xs leading-snug text-gray-500'>
          {category.description}
        </p>
      </div>
    </Link>
  )
}
