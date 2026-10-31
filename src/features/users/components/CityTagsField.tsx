import { type Ref, useMemo, useRef } from 'react'

import { useServiceAreas } from '@features/service-areas'
import { CloseIcon, Combobox } from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import { cn } from '@shared/utils/cn'
import { mergeRefs } from '@shared/utils/mergeRefs'
import { Link } from 'react-router-dom'

import { USERS_CONTENT } from '../data/usersContent'
import type { AssignedCity } from '../services/usersApi'

const { cities: content, account: accountContent } = USERS_CONTENT

const placeOf = ({ city, state }: AssignedCity) => `${city}/${state}`

interface CityTagListProps {
  cities: AssignedCity[]
  isServed: (place: string) => boolean
  onRemove: (place: string) => void
}

const CityTagList = ({ cities, isServed, onRemove }: CityTagListProps) => {
  if (cities.length === 0)
    return <p className='text-sm text-slate-600'>{content.none}</p>

  return (
    <ul className='flex flex-wrap gap-2'>
      {cities.map(city => {
        const place = placeOf(city)
        const served = isServed(place)
        return (
          <li
            key={place}
            className={cn(
              'flex items-center gap-1 rounded-full py-1 pr-1 pl-3 text-base',
              served
                ? 'bg-lavender-light text-purple-dark'
                : 'border border-amber-300 bg-amber-50 text-amber-900'
            )}
          >
            {place}
            {/* Kept as a tag so it can be removed: the API refuses to save a city no longer served. */}
            {!served && (
              <span className='text-sm'>({accountContent.notServed})</span>
            )}
            {/* Drawn at 36px to fit the tag; the ::after reaches the 48px touch target. */}
            <button
              type='button'
              aria-label={content.remove(place)}
              onClick={() => onRemove(place)}
              className='relative flex h-9 w-9 items-center justify-center rounded-full after:absolute after:-inset-1.5 hover:bg-white/70'
            >
              <CloseIcon className='h-4 w-4' />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

const NoServedCitiesNotice = () => (
  <div className='flex flex-col gap-1.5'>
    <p className='text-sm font-medium text-slate-800'>{content.label}</p>
    <p className='rounded-lg border border-amber-300 bg-amber-50 p-3 text-base text-amber-900'>
      {content.noServedCities}{' '}
      <Link
        to={PANEL_ROUTES.serviceAreas}
        className='font-semibold underline underline-offset-4'
      >
        {content.goToServedCities}
      </Link>
    </p>
  </div>
)

interface CityTagsFieldProps {
  value: AssignedCity[]
  onChange: (cities: AssignedCity[]) => void
  error?: string
  inputRef?: Ref<HTMLInputElement>
}

/**
 * The cities of an account, chosen among the served ones (the API refuses any other): a search
 * that adds each choice as a tag, removable with its ×.
 */
export const CityTagsField = ({
  value,
  onChange,
  error,
  inputRef,
}: CityTagsFieldProps) => {
  const { data: servedAreas, isPending } = useServiceAreas('active')
  const searchRef = useRef<HTMLInputElement>(null)
  const byPlace = useMemo(
    () => new Map((servedAreas ?? []).map(area => [placeOf(area), area])),
    [servedAreas]
  )
  const chosen = new Set(value.map(placeOf))

  const add = (place: string) => {
    const area = byPlace.get(place)
    if (area) onChange([...value, { city: area.city, state: area.state }])
  }

  // The tag and its button disappear: focus goes back to the search, not to <body>.
  const remove = (place: string) => {
    onChange(value.filter(city => placeOf(city) !== place))
    searchRef.current?.focus()
  }

  const isServed = (place: string) => isPending || byPlace.has(place)

  if (!isPending && byPlace.size === 0 && value.length === 0)
    return <NoServedCitiesNotice />

  return (
    <fieldset className='flex flex-col gap-2'>
      <legend className='mb-1.5 text-sm font-medium text-slate-800'>
        {content.label}
      </legend>
      <CityTagList cities={value} isServed={isServed} onRemove={remove} />
      <div className='max-w-md'>
        <Combobox
          inputRef={mergeRefs(searchRef, inputRef)}
          label={content.search}
          options={[...byPlace.keys()]}
          value=''
          onChange={add}
          clearOnChoose
          isOptionDisabled={place => chosen.has(place)}
          disabledOptionLabel={content.alreadyChosen}
          placeholder={content.placeholder}
          noMatchText={content.noMatch}
          resultsText={content.results}
          moreResultsText={content.moreResults}
          disabled={isPending}
          error={error}
        />
      </div>
    </fieldset>
  )
}
