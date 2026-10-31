import type { AccountDetailsValues } from '../schemas/accountDetailsSchema'
import type { AccountChanges, AssignedCity } from '../services/usersApi'

const placeOf = ({ city, state }: AssignedCity) => `${city}/${state}`

const samePlaces = (a: AssignedCity[], b: AssignedCity[]) => {
  const places = new Set(a.map(placeOf))
  return a.length === b.length && b.every(city => places.has(placeOf(city)))
}

/**
 * Only what the person changed since `base` (the account as the form started), the way the API
 * asks. Comparing with a fresher copy instead would send back, as a "change", the old value of a
 * field another admin edited meanwhile, undoing their edit.
 *
 * The administration sees every city, so an account that becomes admin loses its cities
 * (decided in docs/DECISIONS.md, 2026-10-30).
 */
export const accountChanges = (
  base: AccountDetailsValues,
  values: AccountDetailsValues
): AccountChanges => {
  const name = values.name.trim()
  const cities = values.role === 'admin' ? [] : values.assignedCities
  return {
    ...(name !== base.name && { name }),
    ...(values.role !== base.role && { role: values.role }),
    ...(!samePlaces(cities, base.assignedCities) && {
      assignedCities: cities,
    }),
  }
}
