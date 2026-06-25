import type { IconProps } from '@shared/types/icon'

export const InfoCircleIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} viewBox='0 0 18 18' fill='none' aria-hidden='true'>
    <circle cx='9' cy='9' r='8' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M9 8v5M9 6.5v.01'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
    />
  </svg>
)
