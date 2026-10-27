import { useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormAlert } from '@shared/components/ui'
import { isApiError } from '@shared/lib/api'
import { useForm } from 'react-hook-form'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import { useCreateServiceArea } from '../hooks/useServiceAreaMutations'
import {
  cityLocationSchema,
  type CityLocationValues,
} from '../schemas/cityLocationSchema'
import { serviceAreaErrorMessage } from '../utils/serviceAreaErrorMessage'
import { CityFields } from './CityFields'

const { add, errors } = SERVICE_AREAS_CONTENT

interface AddServiceAreaFormProps {
  onAdded: (message: string) => void
}

export const AddServiceAreaForm = ({ onAdded }: AddServiceAreaFormProps) => {
  const { control, handleSubmit, reset, setError } =
    useForm<CityLocationValues>({
      resolver: zodResolver(cityLocationSchema),
      defaultValues: { state: '', city: '' },
    })
  const createMutation = useCreateServiceArea()
  const cityInputRef = useRef<HTMLInputElement>(null)

  const onSubmit = (location: CityLocationValues) =>
    createMutation.mutate(location, {
      onSuccess: () => {
        onAdded(add.added(location.city, location.state))
        // Keeps the state: cities are usually added a few at a time from the same region.
        reset({ state: location.state, city: '' })
        cityInputRef.current?.focus()
      },
      onError: error => {
        if (isApiError(error) && error.code === 'SERVICE_AREA_ALREADY_EXISTS') {
          setError(
            'city',
            { message: errors.SERVICE_AREA_ALREADY_EXISTS },
            { shouldFocus: true }
          )
        }
      },
    })

  const isDuplicate =
    isApiError(createMutation.error) &&
    createMutation.error.code === 'SERVICE_AREA_ALREADY_EXISTS'

  return (
    <form
      noValidate
      onSubmit={event => void handleSubmit(onSubmit)(event)}
      className='flex flex-col gap-4'
    >
      {!isDuplicate && (
        <FormAlert message={serviceAreaErrorMessage(createMutation.error)} />
      )}
      <CityFields control={control} cityInputRef={cityInputRef} />
      <Button
        type='submit'
        isLoading={createMutation.isPending}
        loadingText={add.submitting}
        className='self-start'
      >
        {add.submit}
      </Button>
    </form>
  )
}
