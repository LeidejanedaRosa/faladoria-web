import type { IconProps } from '@shared/types/icon'

export const FistIcon = ({ className }: IconProps) => (
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
    <path d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M10 11V6.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M13 11V8a1.5 1.5 0 0 1 3 0v3" />
    <path d="M5 11h14v2.5A6.5 6.5 0 0 1 12.5 20h-1A6.5 6.5 0 0 1 5 13.5V11z" />
    <path d="M5 12.5H3.5a1.5 1.5 0 0 0 0 3H5" />
  </svg>
)
