import { type Ref, useMemo } from 'react'

import { Combobox, SelectField, TextField } from '@shared/components/ui'
import { mergeRefs } from '@shared/utils/mergeRefs'
import { normalizeForSearch } from '@shared/utils/normalizeForSearch'
import { type Control, useController } from 'react-hook-form'

import { BRAZILIAN_STATES } from '../data/brazilianStates'
import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import { useIbgeCities } from '../hooks/useIbgeCities'
import { useServiceAreas } from '../hooks/useServiceAreas'
import type { CityLocationValues } from '../schemas/cityLocationSchema'

const { picker } = SERVICE_AREAS_CONTENT

interface CityFieldsProps {
  control: Control<CityLocationValues>
  cityInputRef?: Ref<HTMLInputElement>
  /** The area being corrected: its own city is not a repeat of itself. */
  editingAreaId?: string
}

// The API compares cities ignoring case and accents, so the screen does the same.
const useServedCitiesOf = (state: string, editingAreaId?: string) => {
  const { data: activeAreas } = useServiceAreas('active')
  return useMemo(
    () =>
      new Set(
        (activeAreas ?? [])
          .filter(area => area.state === state && area.id !== editingAreaId)
          .map(area => normalizeForSearch(area.city))
      ),
    [activeAreas, state, editingAreaId]
  )
}

/** State, then the city from the IBGE list of that state, so the spelling is the official one. */
export const CityFields = ({
  control,
  cityInputRef,
  editingAreaId,
}: CityFieldsProps) => {
  const { field: stateField, fieldState: stateState } = useController({
    control,
    name: 'state',
  })
  const { field: cityField, fieldState: cityState } = useController({
    control,
    name: 'city',
  })
  const cities = useIbgeCities(stateField.value)
  // React Hook Form focuses the field with an error; the form focuses it after adding.
  const cityRef = mergeRefs(cityField.ref, cityInputRef)
  const hasState = stateField.value !== ''
  // Already on the list: shown, marked and not choosable, so the duplicate never gets sent.
  const servedCities = useServedCitiesOf(stateField.value, editingAreaId)

  return (
    <div className='grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-[14rem_1fr]'>
      <SelectField
        label={picker.state}
        name={stateField.name}
        value={stateField.value}
        onBlur={stateField.onBlur}
        onChange={event => {
          stateField.onChange(event.target.value)
          // A city of the previous state would be wrong in the new one.
          cityField.onChange('')
        }}
        error={stateState.error?.message}
      >
        <option value=''>{picker.statePlaceholder}</option>
        {BRAZILIAN_STATES.map(({ code, name }) => (
          <option key={code} value={code}>
            {`${name} (${code})`}
          </option>
        ))}
      </SelectField>
      {/* IBGE down: free text instead of a blocked form, with the spelling rule spelled out. */}
      {cities.isError ? (
        <TextField
          {...cityField}
          ref={cityRef}
          label={picker.city}
          hint={picker.ibgeUnavailable}
          error={cityState.error?.message}
        />
      ) : (
        <Combobox
          inputRef={cityRef}
          label={picker.city}
          options={cities.data ?? []}
          value={cityField.value}
          onChange={cityField.onChange}
          disabled={!hasState || cities.isPending}
          placeholder={
            !hasState
              ? picker.cityNeedsState
              : cities.isPending
                ? picker.loadingCities
                : picker.cityPlaceholder
          }
          isOptionDisabled={city => servedCities.has(normalizeForSearch(city))}
          disabledOptionLabel={picker.alreadyServed}
          noMatchText={picker.noMatch}
          resultsText={picker.results}
          moreResultsText={picker.moreResults}
          error={cityState.error?.message}
        />
      )}
    </div>
  )
}
