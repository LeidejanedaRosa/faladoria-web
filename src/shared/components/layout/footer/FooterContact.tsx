import type { ComponentType } from 'react'

import type { FooterContactItem } from '@shared/data/footerContent'
import { FOOTER_CONTENT } from '@shared/data/footerContent'
import type { IconProps } from '@shared/types/icon'
import { EmailIcon, LocationIcon, WhatsAppIcon } from '@shared/components/ui'

import { FOOTER_FOCUS_RING } from './footerStyles'

const ICON_MAP: Record<
  FooterContactItem['iconName'],
  ComponentType<IconProps>
> = {
  email: EmailIcon,
  whatsapp: WhatsAppIcon,
  location: LocationIcon,
}

const ICON_CIRCLE =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-medium/20 text-white'

const ContactItem = ({ item }: { item: FooterContactItem }) => {
  const Icon = ICON_MAP[item.iconName]

  const content = (
    <>
      <div className={ICON_CIRCLE}>
        <Icon className="h-4 w-4" />
      </div>
      <span>{item.label}</span>
    </>
  )

  if (item.href) {
    const isExternal = item.href.startsWith('http')

    return (
      <li>
        <a
          href={item.href}
          className={`text-lavender inline-flex items-center gap-3 text-sm transition-colors hover:text-white focus:text-white ${FOOTER_FOCUS_RING}`}
          aria-label={item.ariaLabel}
          {...(isExternal && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
        >
          {content}
        </a>
      </li>
    )
  }

  return (
    <li className="text-lavender inline-flex items-center gap-3 text-sm">
      {content}
    </li>
  )
}

export const FooterContact = () => (
  <div className="lg:border-l lg:border-white/10 lg:pl-6">
    <div className="flex items-center gap-3">
      <div className="bg-purple-medium/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
        <EmailIcon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold tracking-wide text-white">
        {FOOTER_CONTENT.contact.title}
      </h3>
    </div>
    <address className="mt-4 not-italic">
      <ul className="space-y-3">
        {FOOTER_CONTENT.contact.items.map(item => (
          <ContactItem key={item.id} item={item} />
        ))}
      </ul>
    </address>
  </div>
)
