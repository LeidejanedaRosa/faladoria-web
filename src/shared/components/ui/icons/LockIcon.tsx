import type { IconProps } from '@shared/types/icon'

export const LockIcon = ({ className = 'h-4 w-4' }: IconProps) => (
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
    <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
    <path d='M7 11V7a5 5 0 0 1 10 0v4' />
  </svg>
)
