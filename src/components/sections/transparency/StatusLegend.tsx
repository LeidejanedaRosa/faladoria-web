import {
  TRANSPARENCY_CONTENT,
  STATUS_CONFIG,
  type InteractionStatus,
} from '@components/data/transparencyContent'
import { StatusBadge } from './StatusBadge'

export const StatusLegend = () => {
  const statuses = Object.entries(STATUS_CONFIG) as [
    InteractionStatus,
    (typeof STATUS_CONFIG)[InteractionStatus],
  ][]

  return (
    <div className="bg-purple-deep rounded-2xl p-4 sm:p-6">
      <h4 className="mb-3 text-sm font-semibold text-white/70">
        {TRANSPARENCY_CONTENT.legendTitle}
      </h4>
      <dl className="flex flex-col gap-2.5">
        {statuses.map(([key, config]) => (
          <div key={key} className="flex items-center gap-2.5">
            <dt className="flex shrink-0 items-center gap-1.5">
              <StatusBadge status={key} size="sm" />
            </dt>
            <dd className="text-xs text-white/60">{config.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
