import { buildUser } from '@/test/fixtures/users'

import { describe, expect, it } from 'vitest'

import {
  type AccountFilters,
  filterAccounts,
  isFiltering,
  placesOf,
  validFilters,
} from '../accountFilters'

const ADMIN = buildUser({
  id: 'usr_carla',
  name: 'Carla Dias',
  email: 'carla@faladoria.org',
  role: 'admin',
  assignedCities: [],
})
const VARGINHA = buildUser({
  id: 'usr_ana',
  name: 'Ana Souza',
  email: 'ana@faladoria.org',
  assignedCities: [{ city: 'Varginha', state: 'MG' }],
})
const ALFENAS_AND_CAMPINAS = buildUser({
  id: 'usr_jose',
  name: 'José Antônio',
  email: 'jose.antonio@saude.gov.br',
  assignedCities: [
    { city: 'Campinas', state: 'SP' },
    { city: 'Alfenas', state: 'MG' },
  ],
})
const USERS = [ADMIN, VARGINHA, ALFENAS_AND_CAMPINAS]

const NONE: AccountFilters = { state: '', city: '', search: '' }
const names = (filters: Partial<AccountFilters>) =>
  filterAccounts(USERS, { ...NONE, ...filters }).map(user => user.name)

describe('placesOf', () => {
  it('lists each state once, with its cities, both in reading order', () => {
    expect([...placesOf(USERS)]).toEqual([
      ['MG', ['Alfenas', 'Varginha']],
      ['SP', ['Campinas']],
    ])
  })

  it('orders accented names as a person reads them', () => {
    const places = placesOf([
      buildUser({
        assignedCities: [
          { city: 'Varginha', state: 'MG' },
          { city: 'Água Boa', state: 'MG' },
          { city: 'Bom Jesus', state: 'MG' },
        ],
      }),
    ])

    expect(places.get('MG')).toEqual(['Água Boa', 'Bom Jesus', 'Varginha'])
  })

  it('offers nothing for admins, who have no cities of their own', () => {
    expect(placesOf([ADMIN]).size).toBe(0)
  })
})

describe('validFilters', () => {
  const places = placesOf(USERS)

  it('keeps a state and a city that are among the options', () => {
    expect(
      validFilters({ state: 'MG', city: 'Varginha', search: 'ana' }, places)
    ).toEqual({ state: 'MG', city: 'Varginha', search: 'ana' })
  })

  it('drops a state no account has, and its city with it', () => {
    expect(
      validFilters({ state: 'RJ', city: 'Varginha', search: 'ana' }, places)
    ).toEqual({ state: '', city: '', search: 'ana' })
  })

  it('drops a city that belongs to another state, keeping the state', () => {
    expect(
      validFilters({ state: 'SP', city: 'Varginha', search: '' }, places)
    ).toEqual({ state: 'SP', city: '', search: '' })
  })
})

describe('filterAccounts', () => {
  it('shows everyone with no filter', () => {
    expect(names({})).toEqual(['Carla Dias', 'Ana Souza', 'José Antônio'])
  })

  it('by state: whoever serves any city in it, and the admins, who serve all', () => {
    expect(names({ state: 'MG' })).toEqual([
      'Carla Dias',
      'Ana Souza',
      'José Antônio',
    ])
    expect(names({ state: 'SP' })).toEqual(['Carla Dias', 'José Antônio'])
  })

  it('by city: whoever serves that city, and the admins', () => {
    expect(names({ state: 'MG', city: 'Varginha' })).toEqual([
      'Carla Dias',
      'Ana Souza',
    ])
  })

  it('does not take a city of the same name in another state', () => {
    expect(names({ state: 'SP', city: 'Alfenas' })).toEqual(['Carla Dias'])
  })

  it('finds by name or e-mail, ignoring case, accents and outer spaces', () => {
    expect(names({ search: '  JOSE ' })).toEqual(['José Antônio'])
    expect(names({ search: 'antonio@saude' })).toEqual(['José Antônio'])
    expect(names({ search: 'faladoria.org' })).toEqual([
      'Carla Dias',
      'Ana Souza',
    ])
  })

  it('needs every filter to match', () => {
    expect(names({ state: 'SP', search: 'ana' })).toEqual([])
    expect(names({ state: 'MG', city: 'Varginha', search: 'ana' })).toEqual([
      'Ana Souza',
    ])
  })
})

describe('isFiltering', () => {
  it('is off with nothing chosen, or with only spaces typed', () => {
    expect(isFiltering(NONE)).toBe(false)
    expect(isFiltering({ ...NONE, search: '   ' })).toBe(false)
  })

  it('is on with a state or some text', () => {
    expect(isFiltering({ ...NONE, state: 'MG' })).toBe(true)
    expect(isFiltering({ ...NONE, search: 'ana' })).toBe(true)
  })
})
