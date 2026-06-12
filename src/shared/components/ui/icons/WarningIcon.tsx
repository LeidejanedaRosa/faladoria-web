import type { IconProps } from '@shared/types/icon'

export const WarningIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 20 20'
    stroke='currentColor'
    strokeWidth={1.5}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M10 3L2 17h16L10 3z' />
    <path d='M10 10v3M10 14.5v.01' />
  </svg>
)
