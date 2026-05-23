import type { ComponentType } from 'react'

import {
  BuildingIcon,
  ChevronRightIcon,
  QuestionIcon,
} from '@shared/components/ui'
import {
  FOOTER_CONTENT,
  type FooterNavIconName,
} from '@shared/data/footerContent'
import type { IconProps } from '@shared/types/icon'

import { FOOTER_FOCUS_RING, ICON_CIRCLE_LG } from './footerStyles'

const NAV_ICON_MAP: Record<FooterNavIconName, ComponentType<IconProps>> = {
  building: BuildingIcon,
  question: QuestionIcon,
}

export const FooterLinks = () => (
  <>
    {FOOTER_CONTENT.linkGroups.map(group => {
      const Icon = NAV_ICON_MAP[group.iconName]
      return (
        <nav
          key={group.title}
          aria-label={group.ariaLabel}
          className='lg:border-l lg:border-white/10 lg:pl-6'
        >
          <div className='flex items-center gap-3'>
            <div className={ICON_CIRCLE_LG} aria-hidden='true'>
              <Icon className='h-5 w-5' />
            </div>
            <h3 className='text-sm font-semibold tracking-wide text-white'>
              {group.title}
            </h3>
          </div>
          <ul className='mt-4 space-y-3'>
            {group.links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-lavender flex items-center justify-between text-sm transition-colors hover:text-white focus:text-white ${FOOTER_FOCUS_RING}`}
                >
                  <span>{link.label}</span>
                  <ChevronRightIcon className='h-4 w-4 shrink-0' />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )
    })}
  </>
)
