import type { IconProps } from '@shared/types/icon'

export const ChevronRightIcon = ({ className = 'h-4 w-4' }: IconProps) => (
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
    <path d='M9 18l6-6-6-6' />
  </svg>
)
