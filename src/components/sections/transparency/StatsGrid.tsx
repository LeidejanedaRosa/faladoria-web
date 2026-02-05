import type { TransparencyStat } from '@components/data/transparencyContent'
import { calculatePercentage } from '@utils/formatPercentage'

const STAT_COLOR_MAP: Record<TransparencyStat['color'], string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
}

interface StatsGridProps {
  stats: readonly TransparencyStat[]
  totalValue: number
}

export const StatsGrid = ({ stats, totalValue }: StatsGridProps) => (
  <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {stats.map(stat => {
      const percentage = calculatePercentage(stat.value, totalValue)

      return (
        <div
          key={stat.id}
          className="bg-purple-deep flex flex-col gap-3 rounded-xl p-5"
        >
          <dt className="text-xs font-medium tracking-wide text-white/60 sm:text-sm">
            {stat.label}
          </dt>
          <dd className="flex flex-col gap-3">
            <span className="text-3xl font-bold text-white sm:text-4xl">
              {stat.value.toLocaleString('pt-BR')}
            </span>
            {stat.detail && (
              <span className="text-xs text-white/60">{stat.detail}</span>
            )}
            <div
              role="progressbar"
              aria-valuenow={stat.value}
              aria-valuemin={0}
              aria-valuemax={totalValue}
              aria-label={`${stat.label}: ${stat.value.toLocaleString('pt-BR')} de ${totalValue.toLocaleString('pt-BR')} (${percentage}%)`}
              className="h-1 w-full rounded-full bg-white/10"
            >
              <div
                className={`h-1 rounded-full ${STAT_COLOR_MAP[stat.color]}`}
                style={{ width: stat.isTotal ? '100%' : `${percentage}%` }}
              />
            </div>
          </dd>
        </div>
      )
    })}
  </dl>
)
