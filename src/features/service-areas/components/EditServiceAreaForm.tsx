import { useEffect, useId, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormAlert } from '@shared/components/ui'
import { isApiError } from '@shared/lib/api'
import { useForm } from 'react-hook-form'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import { useUpdateServiceAreaLocation } from '../hooks/useServiceAreaMutations'
import {
  cityLocationSchema,
  type CityLocationValues,
} from '../schemas/cityLocationSchema'
import type { ServiceArea } from '../services/serviceAreasApi'
import { serviceAreaErrorMessage } from '../utils/serviceAreaErrorMessage'
import { CityFields } from './CityFields'

const { row, errors } = SERVICE_AREAS_CONTENT

interface EditServiceAreaFormProps {
  area: ServiceArea
  /** Called with the announcement after saving, or with nothing when cancelled. */
  onDone: (message?: string) => void
}

export const EditServiceAreaForm = ({
  area,
  onDone,
}: EditServiceAreaFormProps) => {
  const { control, handleSubmit, setError } = useForm<CityLocationValues>({
    resolver: zodResolver(cityLocationSchema),
    defaultValues: { state: area.state, city: area.city },
  })
  const updateMutation = useUpdateServiceAreaLocation()
  const cityInputRef = useRef<HTMLInputElement>(null)
  const captionId = useId()

  useEffect(() => {
    cityInputRef.current?.focus()
  }, [])

  const onSubmit = (location: CityLocationValues) =>
    updateMutation.mutate(
      { serviceAreaId: area.id, ...location },
      {
        onSuccess: () => onDone(row.updated(location.city, location.state)),
        onError: error => {
          if (
            isApiError(error) &&
            error.code === 'SERVICE_AREA_ALREADY_EXISTS'
          ) {
            setError(
              'city',
              { message: errors.SERVICE_AREA_ALREADY_EXISTS },
              { shouldFocus: true }
            )
          }
        },
      }
    )

  const isDuplicate =
    isApiError(updateMutation.error) &&
    updateMutation.error.code === 'SERVICE_AREA_ALREADY_EXISTS'

  return (
    <form
      noValidate
      aria-labelledby={captionId}
      onSubmit={event => void handleSubmit(onSubmit)(event)}
      className='flex flex-col gap-4'
    >
      <p id={captionId} className='text-base font-semibold text-slate-900'>
        {row.editing(area.city, area.state)}
      </p>
      {!isDuplicate && (
        <FormAlert message={serviceAreaErrorMessage(updateMutation.error)} />
      )}
      <CityFields
        control={control}
        cityInputRef={cityInputRef}
        editingAreaId={area.id}
      />
      <div className='flex flex-wrap gap-3'>
        <Button
          type='submit'
          isLoading={updateMutation.isPending}
          loadingText={row.saving}
        >
          {row.save}
        </Button>
        <Button variant='secondary' onClick={() => onDone()}>
          {row.cancel}
        </Button>
      </div>
    </form>
  )
}
