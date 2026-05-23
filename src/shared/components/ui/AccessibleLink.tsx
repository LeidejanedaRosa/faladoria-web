import React, { forwardRef } from 'react'

import type { AccessibilityProps } from '@shared/types/accessibility'

const getVariantClasses = (
  variant: 'primary' | 'secondary' | 'ghost',
  isCurrentPage: boolean
) => {
  const variantClasses = {
    primary: isCurrentPage
      ? 'text-primary-700 font-semibold'
      : 'text-primary hover:text-gray-200',
    secondary: isCurrentPage
      ? 'text-gray-800 font-semibold'
      : 'text-gray-600 hover:text-gray-800',
    ghost: isCurrentPage
      ? 'text-white font-semibold'
      : 'text-white hover:text-gray-200 hover:underline',
  }
  return variantClasses[variant]
}

const computeAriaLabel = (
  external: boolean,
  ariaLabel: string | undefined,
  children: React.ReactNode
) => {
  return external ? ariaLabel || `${children} (abre em nova aba)` : ariaLabel
}

const resolveAriaCurrent = (
  ariaCurrent: AccessibleLinkProps['ariaCurrent'],
  isCurrent: boolean | undefined
) => (ariaCurrent !== undefined ? ariaCurrent : isCurrent ? 'page' : undefined)

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
  variant?: 'primary' | 'secondary' | 'ghost'
  isCurrent?: boolean
  ariaCurrent?:
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
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
      variant = 'primary',
      'aria-label': ariaLabel,
      className = '',
      href,
      onKeyDown,
      isCurrent,
      ariaCurrent,
      rel: _rel,
      target: _target,
      ...safeProps
    },
    ref
  ) => {
    const currentValue = resolveAriaCurrent(ariaCurrent, isCurrent)

    const isCurrentPage = Boolean(currentValue)

    const baseClasses = [
      'inline-flex items-center font-medium rounded',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
    ]

    const variantClass = getVariantClasses(variant, isCurrentPage)

    const computedAriaLabel = computeAriaLabel(external, ariaLabel, children)

    return (
      <a
        ref={ref}
        href={href}
        className={[...baseClasses, variantClass, className].join(' ')}
        onKeyDown={onKeyDown}
        aria-current={currentValue || undefined}
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

export type { AccessibilityProps }
