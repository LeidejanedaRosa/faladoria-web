import { Container } from '@shared/components/layout'
import { cn } from '@shared/utils/cn'

import {
  CATEGORY_GROUPS,
  type CategoryGroup,
  type CategoryGroupColor,
  getCategoriesByGroup,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CONTENT,
} from '../../data'
import { GuideCategoryCard } from '../GuideCategoryCard'
import { GUIDE_ICON_MAP } from '../guideIconMap'

const GROUP_COLORS: Record<
  CategoryGroupColor,
  { topBorder: string; iconBg: string; label: string }
> = {
  amber: {
    topBorder: 'border-t-4 border-amber-400',
    iconBg: 'bg-amber-500',
    label: 'text-amber-700',
  },
  green: {
    topBorder: 'border-t-4 border-green-400',
    iconBg: 'bg-green-500',
    label: 'text-green-700',
  },
  teal: {
    topBorder: 'border-t-4 border-teal-400',
    iconBg: 'bg-teal-500',
    label: 'text-teal-700',
  },
  purple: {
    topBorder: 'border-t-4 border-purple-400',
    iconBg: 'bg-purple-500',
    label: 'text-purple-700',
  },
}

const GuideCategoryGroup = ({ group }: { group: CategoryGroup }) => {
  const categories = getCategoriesByGroup(group.slug)
  const Icon = GUIDE_ICON_MAP[group.iconName]
  const colors = GROUP_COLORS[group.color]

  return (
    <div className={cn('rounded-2xl bg-gray-50 p-5 sm:p-6', colors.topBorder)}>
      <div className='mb-5 flex items-center gap-2.5'>
        <div
          className={cn('shrink-0 rounded-lg p-2', colors.iconBg)}
          aria-hidden='true'
        >
          <Icon className='h-5 w-5 text-white' />
        </div>
        <div>
          <h3 className={cn('text-sm leading-snug font-bold', colors.label)}>
            {group.label}
          </h3>
          <p className='text-xs text-gray-500'>{group.description}</p>
        </div>
      </div>

      <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {categories.map(category => (
          <li key={category.slug}>
            <GuideCategoryCard category={category} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const GuideCategoriesSection = () => (
  <section
    id={GUIDE_CATEGORIES_SECTION_ID}
    className='pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20'
    aria-labelledby={GUIDE_CATEGORIES_HEADING_ID}
  >
    <Container>
      <header className='mb-10 text-center'>
        <div className='mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1'>
          <svg
            width='12'
            height='10'
            viewBox='0 0 12 10'
            fill='currentColor'
            className='text-purple-500'
            aria-hidden='true'
          >
            <circle cx='1.5' cy='1.5' r='1.5' />
            <circle cx='6' cy='1.5' r='1.5' />
            <circle cx='10.5' cy='1.5' r='1.5' />
            <circle cx='1.5' cy='8.5' r='1.5' />
            <circle cx='6' cy='8.5' r='1.5' />
            <circle cx='10.5' cy='8.5' r='1.5' />
          </svg>
          <span className='text-xs font-semibold tracking-widest text-purple-700 uppercase'>
            {GUIDE_CONTENT.intro.badge}
          </span>
        </div>
        <h2
          id={GUIDE_CATEGORIES_HEADING_ID}
          className='text-purple-deepest text-3xl font-bold sm:text-4xl lg:text-5xl'
        >
          {GUIDE_CONTENT.intro.heading}
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-gray-600'>
          {GUIDE_CONTENT.intro.description}
        </p>
      </header>

      <div className='space-y-8 sm:space-y-10'>
        {CATEGORY_GROUPS.map(group => (
          <GuideCategoryGroup key={group.slug} group={group} />
        ))}
      </div>
    </Container>
  </section>
)
