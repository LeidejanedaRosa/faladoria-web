import {
  STATUS_CONFIG,
  TRANSPARENCY_CONTENT,
} from '../../../data/transparencyContent'
import { PUBLIC_COMPLAINT_STATUSES } from '../../../services/publicComplaints'
import { StatusBadge } from './StatusBadge'

export const StatusLegend = () => {
  return (
    <div className='bg-purple-deep rounded-2xl p-4 sm:p-6'>
      <h4 className='mb-3 text-sm font-semibold text-white/70'>
        {TRANSPARENCY_CONTENT.legendTitle}
      </h4>
      <dl className='flex flex-col gap-2.5'>
        {PUBLIC_COMPLAINT_STATUSES.map(status => (
          <div key={status} className='flex items-center gap-2.5'>
            <dt className='flex shrink-0 items-center gap-1.5'>
              <StatusBadge status={status} size='sm' />
            </dt>
            <dd className='text-xs text-white/60'>
              {STATUS_CONFIG[status].description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
