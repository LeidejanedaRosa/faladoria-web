import {
  type InteractionStatus,
  STATUS_CONFIG,
} from '../../../data/transparencyContent'
import { StatusIcon } from './StatusIcon'

const SIZE_STYLES = {
  sm: 'px-2.5 py-0.5',
  md: 'shrink-0 px-3 py-1',
} as const

interface StatusBadgeProps {
  status: InteractionStatus
  size?: keyof typeof SIZE_STYLES
}

export const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border text-xs font-medium ${SIZE_STYLES[size]} ${config.borderColor} ${config.textColor} ${config.bgColor}`}
      aria-label={`Status: ${config.label}`}
    >
      <StatusIcon status={status} />
      {config.label}
    </span>
  )
}
