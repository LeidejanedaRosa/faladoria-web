import type { IconProps } from '@shared/types/icon'

export const PersonIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg
    className={className}
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <circle cx='12' cy='7' r='4' />
    <path d='M12 13c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z' />
  </svg>
)
