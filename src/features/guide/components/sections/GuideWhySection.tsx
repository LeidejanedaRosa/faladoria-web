import { Container } from '@shared/components/layout'
import {
  BookOpenIcon,
  CheckIcon,
  HeartIcon,
  UsersIcon,
} from '@shared/components/ui'
import { cn } from '@shared/utils/cn'

import {
  GUIDE_CONTENT,
  GUIDE_WHY_HEADING_ID,
  type WhyIconColor,
  type WhyIconName,
  type WhyIconShape,
} from '../../data'
import type { IconComponent } from '../guideIconMap'

const WHY_ICON_MAP: Record<WhyIconName, IconComponent> = {
  'book-open': BookOpenIcon,
  check: CheckIcon,
  heart: HeartIcon,
  users: UsersIcon,
}

const WHY_ICON_BG: Record<WhyIconColor, string> = {
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
}

const WHY_ICON_SHAPE: Record<WhyIconShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
}

export const GuideWhySection = () => (
  <section className='py-10 sm:py-12' aria-labelledby={GUIDE_WHY_HEADING_ID}>
    <Container>
      <div className='rounded-2xl border border-purple-200 bg-purple-50 px-6 py-8 shadow-sm sm:px-10'>
        <h2
          id={GUIDE_WHY_HEADING_ID}
          className='text-purple-dark mb-7 text-center text-xl font-bold sm:text-2xl'
        >
          {GUIDE_CONTENT.why.heading}
        </h2>
        <ul className='grid grid-cols-2 gap-6 lg:grid-cols-4'>
          {GUIDE_CONTENT.why.items.map(item => {
            const Icon = WHY_ICON_MAP[item.iconName]
            return (
              <li key={item.title} className='flex items-start gap-3'>
                <div
                  className={cn(
                    'shrink-0 p-3',
                    WHY_ICON_BG[item.iconColor],
                    WHY_ICON_SHAPE[item.iconShape]
                  )}
                  aria-hidden='true'
                >
                  <Icon className='h-6 w-6 text-white' />
                </div>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-sm font-bold text-gray-900'>
                    {item.title}
                  </span>
                  <p className='text-xs leading-snug text-gray-500'>
                    {item.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Container>
  </section>
)
