import { forwardRef } from 'react'

import type { SkipLinkProps } from '@shared/types/accessibility'

export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ href, children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className='focus:bg-primary focus:text-secondary sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[1600] focus:rounded-br focus:px-4 focus:py-2 focus:text-base focus:font-medium focus:shadow-lg'
      {...props}
    >
      {children}
    </a>
  )
)

SkipLink.displayName = 'SkipLink'
