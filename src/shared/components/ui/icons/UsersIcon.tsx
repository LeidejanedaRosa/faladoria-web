import type { IconProps } from '@shared/types/icon'

export const UsersIcon = ({ className }: IconProps) => (
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
    <circle cx="8" cy="7" r="3" />
    <path d="M2 20v-2a6 6 0 0 1 12 0v2" />
    <circle cx="17" cy="7" r="2.5" />
    <path d="M14 13.5a5.5 5.5 0 0 1 9 0" />
  </svg>
)
