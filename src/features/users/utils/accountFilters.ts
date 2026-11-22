import { normalizeForSearch } from '@shared/utils/normalizeForSearch'

import type { User } from '../services/usersApi'

export interface AccountFilters {
  state: string
  city: string
  search: string
}

/** State → its cities, both sorted as a person reads them. */
export type Places = Map<string, string[]>

const byName = (a: string, b: string) => a.localeCompare(b, 'pt-BR')

/** The places of the folder's accounts: every choice finds at least one account. Admins add
 * none, since they have no cities of their own. */
export const placesOf = (users: readonly User[]): Places => {
  const cities = new Map<string, Set<string>>()
  for (const { assignedCities } of users) {
    for (const { state, city } of assignedCities) {
      cities.set(state, (cities.get(state) ?? new Set()).add(city))
    }
  }
  return new Map(
    [...cities.keys()]
      .sort(byName)
      .map(state => [state, [...cities.get(state)!].sort(byName)])
  )
}

/** A value from the address that is not among the options (an old link, a typo) is ignored. */
export const validFilters = (
  { state, city, search }: AccountFilters,
  places: Places
): AccountFilters => {
  const cities = places.get(state)
  if (!cities) return { state: '', city: '', search }
  return { state, city: cities.includes(city) ? city : '', search }
}

// An admin serves every city: "who serves Varginha?" includes them.
const serves = (user: User, state: string, city: string) =>
  user.role === 'admin' ||
  user.assignedCities.some(
    place => place.state === state && (!city || place.city === city)
  )

const matchesText = (user: User, needle: string) =>
  normalizeForSearch(user.name).includes(needle) ||
  normalizeForSearch(user.email).includes(needle)

export const filterAccounts = (
  users: readonly User[],
  { state, city, search }: AccountFilters
) => {
  const needle = normalizeForSearch(search)
  return users.filter(
    user =>
      (!state || serves(user, state, city)) &&
      (!needle || matchesText(user, needle))
  )
}

export const isFiltering = ({ state, search }: AccountFilters) =>
  Boolean(state || normalizeForSearch(search))
