import { FOOTER_CONTENT } from '@components/data/footerContent'

import { FOOTER_FOCUS_RING } from './footerStyles'

export const FooterLinks = () => (
  <>
    {FOOTER_CONTENT.linkGroups.map(group => (
      <nav key={group.title} aria-label={group.ariaLabel}>
        <h3 className="text-sm font-semibold tracking-wide text-white">
          {group.title}
        </h3>
        <ul className="mt-4 space-y-3">
          {group.links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-lavender text-sm transition-colors hover:text-white focus:text-white ${FOOTER_FOCUS_RING}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    ))}
  </>
)
