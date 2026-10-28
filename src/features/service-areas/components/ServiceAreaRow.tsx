import { useEffect, useRef } from 'react'

import { Button } from '@shared/components/ui'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import type { ServiceArea } from '../services/serviceAreasApi'
import { formatDay } from '../utils/formatDay'
import { EditServiceAreaForm } from './EditServiceAreaForm'

const { list, row } = SERVICE_AREAS_CONTENT

interface ServiceAreaRowProps {
  area: ServiceArea
  isEditing: boolean
  onEdit: () => void
  onEditDone: (message?: string) => void
  onRemove: () => void
  onReactivate: () => void
  isReactivating: boolean
}

export const ServiceAreaRow = ({
  area,
  isEditing,
  onEdit,
  onEditDone,
  onRemove,
  onReactivate,
  isReactivating,
}: ServiceAreaRowProps) => {
  const { city, state } = area
  const isRemoved = area.removedAt !== null
  const editButtonRef = useRef<HTMLButtonElement>(null)
  const wasEditingRef = useRef(isEditing)

  // Leaving the edit (saved or cancelled) puts focus back on "Corrigir", where it started.
  useEffect(() => {
    if (wasEditingRef.current && !isEditing) editButtonRef.current?.focus()
    wasEditingRef.current = isEditing
  }, [isEditing])

  if (isEditing) {
    return (
      <li className='border-b border-slate-100 p-4 last:border-b-0 sm:px-5'>
        <EditServiceAreaForm area={area} onDone={onEditDone} />
      </li>
    )
  }

  return (
    <li className='flex flex-col gap-3 border-b border-slate-100 p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
      <div className='flex flex-col gap-0.5'>
        <p className='text-base font-semibold text-slate-900'>
          {city}/{state}
        </p>
        <p className='text-sm text-slate-600'>
          {isRemoved
            ? list.removedOn(formatDay(area.removedAt!))
            : list.servedSince(formatDay(area.addedAt))}
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        {isRemoved ? (
          <Button
            variant='secondary'
            aria-label={row.reactivateLabel(city, state)}
            isLoading={isReactivating}
            loadingText={row.reactivating}
            onClick={onReactivate}
          >
            {row.reactivate}
          </Button>
        ) : (
          <>
            <Button
              ref={editButtonRef}
              variant='secondary'
              aria-label={row.editLabel(city, state)}
              onClick={onEdit}
            >
              {row.edit}
            </Button>
            <Button
              variant='secondary'
              aria-label={row.removeLabel(city, state)}
              onClick={onRemove}
              className='text-red-700'
            >
              {row.remove}
            </Button>
          </>
        )}
      </div>
    </li>
  )
}
