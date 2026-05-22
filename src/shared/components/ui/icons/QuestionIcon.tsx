import type { IconProps } from '@shared/types/icon'

export const QuestionIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={1.5}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
    <circle cx='12' cy='17' r='0.5' fill='currentColor' />
  </svg>
)
