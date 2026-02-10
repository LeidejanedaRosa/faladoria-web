import type { ComponentType } from 'react'

import type { FooterContactItem } from '@components/data/footerContent'
import { FOOTER_CONTENT } from '@components/data/footerContent'
import type { IconProps } from '@/types/icon'
import { EmailIcon, LocationIcon, PhoneIcon } from '@components/ui/icons'

import { FOOTER_FOCUS_RING } from './footerStyles'

const ICON_MAP: Record<
  FooterContactItem['iconName'],
  ComponentType<IconProps>
> = {
  email: EmailIcon,
  phone: PhoneIcon,
  location: LocationIcon,
}

const ContactItem = ({ item }: { item: FooterContactItem }) => {
  const Icon = ICON_MAP[item.iconName]

  const content = (
    <>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </>
  )

  if (item.href) {
    return (
      <li>
        <a
          href={item.href}
          className={`text-lavender inline-flex items-start gap-3 text-sm transition-colors hover:text-white focus:text-white ${FOOTER_FOCUS_RING}`}
          aria-label={item.ariaLabel}
        >
          {content}
        </a>
      </li>
    )
  }

  return (
    <li className="text-lavender inline-flex items-start gap-3 text-sm">
      {content}
    </li>
  )
}

export const FooterContact = () => (
  <div>
    <h3 className="text-sm font-semibold tracking-wide text-white">
      {FOOTER_CONTENT.contact.title}
    </h3>
    <address className="mt-4 not-italic">
      <ul className="space-y-3">
        {FOOTER_CONTENT.contact.items.map(item => (
          <ContactItem key={item.id} item={item} />
        ))}
      </ul>
    </address>
  </div>
)
