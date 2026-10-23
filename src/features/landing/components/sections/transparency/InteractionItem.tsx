import { ChatIcon, LocationIcon } from '@shared/components/ui'

import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'
import type { PublicComplaint } from '../../../services/publicComplaints'
import { formatPublicDay } from '../../../utils/formatPublicDay'
import { StatusBadge } from './StatusBadge'

interface InteractionItemProps {
  complaint: PublicComplaint
}

export const InteractionItem = ({ complaint }: InteractionItemProps) => {
  const { title, occurrencePlace, city, state } = complaint.curatedData

  return (
    <li className='flex gap-3 py-4 first:pt-0 last:pb-0 sm:items-center sm:gap-4'>
      <span
        className='mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 sm:mt-0 sm:flex'
        aria-hidden='true'
      >
        <ChatIcon className='h-5 w-5 text-white/40' />
      </span>

      <div className='flex min-w-0 flex-1 flex-col gap-1 sm:gap-0.5'>
        <div className='flex items-start justify-between gap-2 sm:items-center'>
          <span className='text-sm font-medium text-white sm:truncate sm:text-base'>
            {title}
          </span>
          <StatusBadge status={complaint.status} />
        </div>
        <span className='flex flex-wrap items-center gap-x-1.5 text-xs text-white/60'>
          <LocationIcon className='h-3.5 w-3.5 shrink-0 text-white/40' />
          <span>{occurrencePlace}</span>
          <span className='sr-only'>, </span>
          <span aria-hidden='true'>·</span>
          <span>
            {city} - {state}
          </span>
          <span className='sr-only'>, </span>
          <span aria-hidden='true'>·</span>
          <span>
            {TRANSPARENCY_CONTENT.receivedOnPrefix}{' '}
            <time dateTime={complaint.receivedOn}>
              {formatPublicDay(complaint.receivedOn)}
            </time>
          </span>
        </span>
      </div>
    </li>
  )
}
