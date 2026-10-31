import { InfoCircleIcon } from '@shared/components/ui'
import { type Control, Controller } from 'react-hook-form'

import { USERS_CONTENT } from '../data/usersContent'
import type { AccountDetailsValues } from '../schemas/accountDetailsSchema'
import { CityTagsField } from './CityTagsField'

const { account: content, cities } = USERS_CONTENT

interface AccountCitiesFieldProps {
  control: Control<AccountDetailsValues>
  isAdmin: boolean
  /** The cities the account loses on saving: said before, not discovered after. */
  citiesToRemove: string[]
}

export const AccountCitiesField = ({
  control,
  isAdmin,
  citiesToRemove,
}: AccountCitiesFieldProps) => {
  if (isAdmin && citiesToRemove.length > 0) {
    return (
      <p className='flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-base text-amber-900'>
        <InfoCircleIcon className='mt-1 h-4 w-4 shrink-0' />
        {content.citiesRemoved(citiesToRemove)}
      </p>
    )
  }
  if (isAdmin) {
    return <p className='text-base text-slate-700'>{cities.adminSeesAll}</p>
  }
  return (
    <Controller
      control={control}
      name='assignedCities'
      render={({ field, fieldState }) => (
        <CityTagsField
          value={field.value}
          onChange={field.onChange}
          inputRef={field.ref}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
