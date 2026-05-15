import React, { forwardRef } from 'react'

import { cn } from '@shared/utils/cn'
import type {
  AccessibilityProps,
  SkipLinkProps,
} from '@shared/types/accessibility'

export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ href, children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className="focus:bg-primary focus:text-secondary sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[1600] focus:rounded-br focus:px-4 focus:py-2 focus:text-base focus:font-medium focus:shadow-lg"
      {...props}
    >
      {children}
    </a>
  )
)

SkipLink.displayName = 'SkipLink'

interface MainContentProps extends AccessibilityProps {
  children: React.ReactNode
  className?: string
}

export const MainContent = forwardRef<HTMLElement, MainContentProps>(
  ({ children, className = '', id = 'main-content', ...props }, ref) => (
    <main
      ref={ref}
      id={id}
      className={cn('focus:outline-none', className)}
      tabIndex={-1}
      {...props}
    >
      {children}
    </main>
  )
)

MainContent.displayName = 'MainContent'

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  asChild?: boolean
}

export const ScreenReaderOnly = ({
  children,
  asChild = false,
}: ScreenReaderOnlyProps) => {
  if (asChild) {
    if (!React.isValidElement<{ className?: string }>(children)) {
      return <span className="sr-only">{children}</span>
    }

    return React.cloneElement(children, {
      className: cn(children.props.className, 'sr-only'),
    })
  }

  return <span className="sr-only">{children}</span>
}

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

const filterSecurityProps = (props: Record<string, unknown>) => {
  const propsToRemove = ['rel', 'target']
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !propsToRemove.includes(key))
  )
}

const computeAriaLabel = (
  external: boolean,
  ariaLabel: string | undefined,
  children: React.ReactNode
) => {
  return external ? ariaLabel || `${children} (abre em nova aba)` : ariaLabel
}

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
      ...props
    },
    ref
  ) => {
    const currentValue =
      ariaCurrent !== undefined ? ariaCurrent : isCurrent ? 'page' : undefined

    const isCurrentPage = Boolean(currentValue)

    const baseClasses = [
      'inline-flex items-center font-medium rounded',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
    ]

    const variantClass = getVariantClasses(variant, isCurrentPage)

    const safeProps = filterSecurityProps(props)
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
          <span className="ml-1" aria-hidden="true">
            <ExternalLinkIcon />
          </span>
        )}
      </a>
    )
  }
)

AccessibleLink.displayName = 'AccessibleLink'

const ExternalLinkIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
)
