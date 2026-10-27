import type { ComponentProps, MouseEvent } from 'react'

import { cn } from '@shared/utils/cn'

const VARIANT_STYLES = {
  primary:
    'bg-purple-dark text-white hover:bg-purple-medium aria-disabled:hover:bg-purple-dark',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 aria-disabled:hover:bg-white',
  danger:
    'bg-red-700 text-white hover:bg-red-800 aria-disabled:hover:bg-red-700',
} as const

interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof VARIANT_STYLES
  isLoading?: boolean
  /** Shown instead of the children while loading, e.g. "Entrando…". */
  loadingText?: string
}

export const Button = ({
  variant = 'primary',
  isLoading = false,
  loadingText,
  type = 'button',
  className,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  // aria-disabled, not disabled: a disabled button drops focus, and the person pressing it
  // with the keyboard would land on <body>. The click is ignored here instead.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      type={type}
      aria-disabled={isLoading || undefined}
      onClick={handleClick}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-semibold transition-colors aria-disabled:cursor-wait aria-disabled:opacity-70 motion-reduce:transition-none',
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  )
}
