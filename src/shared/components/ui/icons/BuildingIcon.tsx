import type { IconProps } from '@shared/types/icon'

export const BuildingIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10v2M8 15v2M12 10v2M12 15v2M16 10v2M16 15v2" />
  </svg>
)
