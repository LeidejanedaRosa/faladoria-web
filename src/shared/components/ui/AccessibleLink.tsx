import React, { forwardRef } from 'react'

import { cn } from '@shared/utils/cn'

const computeAriaLabel = (
  external: boolean,
  ariaLabel: string | undefined,
  children: React.ReactNode
) => {
  return external ? ariaLabel || `${children} (abre em nova aba)` : ariaLabel
}

const ExternalLinkIcon = () => (
  <svg
    className='h-4 w-4'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
    aria-hidden='true'
  >
    <path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z' />
    <path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z' />
  </svg>
)

interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  external?: boolean
  showExternalIcon?: boolean
  ariaCurrent?:
    boolean | 'page' | 'step' | 'location' | 'date' | 'time' | 'true'
}

export const AccessibleLink = forwardRef<
  HTMLAnchorElement,
  AccessibleLinkProps
>(
  (
    {
      children,
      external = false,
      showExternalIcon = true,
      'aria-label': ariaLabel,
      className,
      href,
      onKeyDown,
      ariaCurrent,
      rel: _rel,
      target: _target,
      ...safeProps
    },
    ref
  ) => {
    const computedAriaLabel = computeAriaLabel(external, ariaLabel, children)

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'inline-flex items-center rounded transition-colors duration-200',
          className
        )}
        onKeyDown={onKeyDown}
        aria-current={ariaCurrent || undefined}
        {...safeProps}
        {...(external && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        aria-label={computedAriaLabel}
      >
        {children}
        {external && showExternalIcon && (
          <span className='ml-1' aria-hidden='true'>
            <ExternalLinkIcon />
          </span>
        )}
      </a>
    )
  }
)

AccessibleLink.displayName = 'AccessibleLink'
