import type { IconProps } from '@shared/types/icon'

export const CheckIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2.5}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>
)
