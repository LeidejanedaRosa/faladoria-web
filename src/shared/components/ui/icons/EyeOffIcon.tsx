import type { IconProps } from '@shared/types/icon'

export const EyeOffIcon = ({ className = 'h-5 w-5' }: IconProps) => (
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
    <path d='M9.9 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.9 3.9' />
    <path d='M6.6 6.6A17.4 17.4 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6' />
    <path d='M9.9 9.9a3 3 0 0 0 4.2 4.2' />
    <path d='M2 2l20 20' />
  </svg>
)
