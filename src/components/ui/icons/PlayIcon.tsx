import type { IconProps } from '@/types/icon'

export const PlayIcon = ({ className = 'w-4 h-4' }: IconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      role="presentation"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
