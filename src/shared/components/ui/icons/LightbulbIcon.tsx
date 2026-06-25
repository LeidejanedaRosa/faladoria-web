import type { IconProps } from '@shared/types/icon'

export const LightbulbIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} viewBox='0 0 20 20' fill='none' aria-hidden='true'>
    <path
      d='M10 2a6 6 0 0 1 4 10.47V14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1.53A6 6 0 0 1 10 2Z'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M7.5 17h5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
)
