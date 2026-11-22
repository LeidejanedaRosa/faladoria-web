import type { Ref } from 'react'

import { SelectField, TextField } from '@shared/components/ui'

import { USERS_CONTENT } from '../data/usersContent'
import type { AccountFilters as Filters, Places } from '../utils/accountFilters'

const { filters: content } = USERS_CONTENT

interface AccountFiltersProps {
  filters: Filters
  places: Places
  /** The first field: where focus goes when the filters are cleared. */
  stateRef: Ref<HTMLSelectElement>
  onStateChange: (state: string) => void
  onCityChange: (city: string) => void
  onSearchChange: (text: string) => void
}

/** Estado → Cidade → Busca. The list follows each change: there is nothing to submit. */
export const AccountFilters = ({
  filters,
  places,
  stateRef,
  onStateChange,
  onCityChange,
  onSearchChange,
}: AccountFiltersProps) => {
  const cities = places.get(filters.state) ?? []

  return (
    <form
      role='search'
      aria-label={content.label}
      onSubmit={event => event.preventDefault()}
      className='grid gap-4 sm:grid-cols-2 lg:grid-cols-[12rem_16rem_minmax(0,1fr)] lg:items-start'
    >
      <SelectField
        ref={stateRef}
        label={content.state}
        value={filters.state}
        onChange={event => onStateChange(event.target.value)}
      >
        <option value=''>{content.allStates}</option>
        {[...places.keys()].map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </SelectField>
      <SelectField
        label={content.city}
        value={filters.city}
        disabled={!filters.state}
        hint={filters.state ? undefined : content.cityHint}
        onChange={event => onCityChange(event.target.value)}
      >
        <option value=''>{content.allCities}</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </SelectField>
      <TextField
        type='search'
        label={content.search}
        value={filters.search}
        autoComplete='off'
        onChange={event => onSearchChange(event.target.value)}
        className='sm:col-span-2 lg:col-span-1'
      />
    </form>
  )
}
