import { Container } from '@shared/components/layout'
import { cn } from '@shared/utils/cn'

import {
  CATEGORY_GROUPS,
  getCategoriesByGroup,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CONTENT,
} from '../../data'
import { GuideCategoryCard } from '../GuideCategoryCard'
import { GUIDE_ICON_MAP } from '../guideIconMap'

const GROUP_COLORS = {
  purple: {
    iconWrapper: 'bg-purple-100',
    icon: 'text-purple-600',
    label: 'text-purple-900',
  },
  blue: {
    iconWrapper: 'bg-blue-100',
    icon: 'text-blue-600',
    label: 'text-blue-900',
  },
  amber: {
    iconWrapper: 'bg-amber-100',
    icon: 'text-amber-600',
    label: 'text-amber-900',
  },
  teal: {
    iconWrapper: 'bg-teal-100',
    icon: 'text-teal-600',
    label: 'text-teal-900',
  },
  green: {
    iconWrapper: 'bg-green-100',
    icon: 'text-green-600',
    label: 'text-green-900',
  },
  rose: {
    iconWrapper: 'bg-rose-100',
    icon: 'text-rose-600',
    label: 'text-rose-900',
  },
} as const

export const GuideCategoriesSection = () => (
  <section
    id={GUIDE_CATEGORIES_SECTION_ID}
    className='py-12 sm:py-16 lg:py-20'
    aria-labelledby={GUIDE_CATEGORIES_HEADING_ID}
  >
    <Container>
      <header className='mb-10 text-center'>
        <h2
          id={GUIDE_CATEGORIES_HEADING_ID}
          className='text-purple-deepest text-2xl font-bold sm:text-3xl'
        >
          {GUIDE_CONTENT.intro.heading}
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-gray-600'>
          {GUIDE_CONTENT.intro.description}
        </p>
      </header>

      <div className='space-y-4 sm:space-y-6'>
        {CATEGORY_GROUPS.map(group => {
          const categories = getCategoriesByGroup(group.slug)
          const Icon = GUIDE_ICON_MAP[group.iconName]
          const colors = GROUP_COLORS[group.color]

          return (
            <div
              key={group.slug}
              className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6'
            >
              <div className='mb-5 flex items-center gap-3 border-b border-gray-100 pb-4'>
                <div
                  className={cn(
                    'shrink-0 rounded-xl p-2.5',
                    colors.iconWrapper
                  )}
                  aria-hidden='true'
                >
                  <Icon className={cn('h-6 w-6', colors.icon)} />
                </div>
                <div>
                  <h3
                    className={cn(
                      'text-base leading-snug font-bold',
                      colors.label
                    )}
                  >
                    {group.label}
                  </h3>
                  <p className='mt-0.5 text-sm text-gray-500'>
                    {group.description}
                  </p>
                </div>
              </div>

              <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4'>
                {categories.map(category => (
                  <li key={category.slug}>
                    <GuideCategoryCard category={category} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Container>
  </section>
)
