import { useState } from 'react'

import { Button } from '@shared/components/ui'
import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import { useServiceAreas } from '../hooks/useServiceAreas'
import type {
  ServiceArea,
  ServiceAreaStatus,
} from '../services/serviceAreasApi'
import { ServiceAreaRow } from './ServiceAreaRow'

const { list } = SERVICE_AREAS_CONTENT

interface ServiceAreaListProps {
  status: ServiceAreaStatus
  onAnnounce: (message: string) => void
  onRemove: (area: ServiceArea) => void
  onReactivate: (area: ServiceArea) => void
  reactivatingId?: string
}

const ListSkeleton = () => (
  <output className='block rounded-xl border border-slate-200 bg-white'>
    <span className='sr-only'>{list.loading}</span>
    {[0, 1, 2].map(item => (
      <span
        key={item}
        aria-hidden='true'
        className='flex flex-col gap-2 border-b border-slate-100 p-4 last:border-b-0 sm:px-5'
      >
        <span className='h-5 w-40 animate-pulse rounded bg-slate-200 motion-reduce:animate-none' />
        <span className='h-4 w-32 animate-pulse rounded bg-slate-100 motion-reduce:animate-none' />
      </span>
    ))}
  </output>
)

export const ServiceAreaList = ({
  status,
  onAnnounce,
  onRemove,
  onReactivate,
  reactivatingId,
}: ServiceAreaListProps) => {
  // The list owns its query (the page reads the same cache for the counts). Received as a prop,
  // the data would arrive one render after the retry ends, and the focus rescue would miss it.
  const { data: areas, isPending, isError, refetch } = useServiceAreas(status)
  const { targetRef, isRetrying, retry } =
    useRecoveryFocus<HTMLUListElement>(refetch)
  // One row in edit at a time: opening another closes the first.
  const [editingId, setEditingId] = useState<string | null>(null)

  if (isRetrying || isError) {
    return (
      <div
        role='alert'
        className='flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between'
      >
        <p className='text-base text-red-800'>{list.loadError}</p>
        <Button
          variant='secondary'
          onClick={() => void retry()}
          isLoading={isRetrying}
          loadingText={list.retrying}
        >
          {list.retry}
        </Button>
      </div>
    )
  }
  if (isPending) return <ListSkeleton />

  if (areas.length === 0) {
    return (
      <p className='rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-base text-slate-600'>
        {status === 'active' ? list.emptyActive : list.emptyRemoved}
      </p>
    )
  }

  return (
    <ul
      ref={targetRef}
      tabIndex={-1}
      className='rounded-xl border border-slate-200 bg-white'
    >
      {areas.map(area => (
        <ServiceAreaRow
          key={area.id}
          area={area}
          isEditing={editingId === area.id}
          onEdit={() => setEditingId(area.id)}
          onEditDone={message => {
            setEditingId(null)
            if (message) onAnnounce(message)
          }}
          onRemove={() => onRemove(area)}
          onReactivate={() => onReactivate(area)}
          isReactivating={reactivatingId === area.id}
        />
      ))}
    </ul>
  )
}
