import type { InteractionStatus } from '@components/data/transparencyContent'
import type { IconProps } from '@/types/icon'

interface StatusIconConfig {
  viewBox: string
  fill?: string
  stroke?: string
  strokeWidth?: number
  paths: readonly {
    d: string
    strokeLinecap?: 'round'
    strokeLinejoin?: 'round'
  }[]
  circles?: readonly {
    cx: number
    cy: number
    r: number
  }[]
}

const STATUS_ICON_MAP: Record<InteractionStatus, StatusIconConfig> = {
  resolved: {
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    paths: [
      { d: 'M5 13l4 4L19 7', strokeLinecap: 'round', strokeLinejoin: 'round' },
    ],
  },
  in_progress: {
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2,
    circles: [{ cx: 12, cy: 12, r: 10 }],
    paths: [
      {
        d: 'M12 6v6l4 2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },
  under_review: {
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2,
    circles: [{ cx: 11, cy: 11, r: 8 }],
    paths: [
      {
        d: 'M21 21l-4.35-4.35',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },
  open: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    circles: [{ cx: 12, cy: 12, r: 6 }],
    paths: [],
  },
  unresolved: {
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    paths: [
      {
        d: 'M6 18L18 6M6 6l12 12',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    ],
  },
}

interface StatusIconProps extends IconProps {
  status: InteractionStatus
}

export const StatusIcon = ({
  status,
  className = 'h-3.5 w-3.5',
}: StatusIconProps) => {
  const config = STATUS_ICON_MAP[status]

  return (
    <svg
      className={className}
      fill={config.fill ?? 'none'}
      stroke={config.stroke}
      strokeWidth={config.strokeWidth}
      viewBox={config.viewBox}
      aria-hidden="true"
    >
      {config.circles?.map(circle => (
        <circle key={`${circle.cx}-${circle.cy}`} {...circle} />
      ))}
      {config.paths.map(({ d, strokeLinecap, strokeLinejoin }) => (
        <path
          key={d}
          d={d}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
        />
      ))}
    </svg>
  )
}
