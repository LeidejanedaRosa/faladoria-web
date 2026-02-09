import type { IconProps } from '@/types/icon'

export const ChartIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v18h18M7 16v-4m4 4V8m4 8v-6m4 6v-2"
    />
  </svg>
)
