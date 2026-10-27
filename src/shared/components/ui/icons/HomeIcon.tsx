import type { IconProps } from '@shared/types/icon'

export const HomeIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M3 10.5 12 3l9 7.5' />
    <path d='M5 9.5V21h14V9.5' />
    <path d='M10 21v-6h4v6' />
  </svg>
)
