import { ANA, CARLA } from '@/test/fixtures/users'

import { describe, expect, it } from 'vitest'

import { accountChanges } from '../accountChanges'

const VARGINHA = { city: 'Varginha', state: 'MG' }
const LAVRAS = { city: 'Lavras', state: 'MG' }
const ANA_IN_TWO = { ...ANA, assignedCities: [VARGINHA, LAVRAS] }

const unchanged = (account = ANA_IN_TWO) => ({
  name: account.name,
  role: account.role,
  assignedCities: account.assignedCities,
})

describe('accountChanges', () => {
  it('sends nothing when nothing changed', () => {
    expect(accountChanges(ANA_IN_TWO, unchanged())).toEqual({})
  })

  it('sends only the field that changed, the way the API asks', () => {
    expect(
      accountChanges(ANA_IN_TWO, { ...unchanged(), name: 'Ana Souza Lima' })
    ).toEqual({ name: 'Ana Souza Lima' })
    expect(
      accountChanges(ANA_IN_TWO, { ...unchanged(), role: 'manager' })
    ).toEqual({ role: 'manager' })
  })

  it('does not count spaces around the name as a change', () => {
    expect(
      accountChanges(ANA_IN_TWO, { ...unchanged(), name: '  Ana Souza ' })
    ).toEqual({})
  })

  it('sends the whole city list, since the API replaces it', () => {
    expect(
      accountChanges(ANA_IN_TWO, {
        ...unchanged(),
        assignedCities: [VARGINHA],
      })
    ).toEqual({ assignedCities: [VARGINHA] })
  })

  it('does not count the same cities in another order as a change', () => {
    expect(
      accountChanges(ANA_IN_TWO, {
        ...unchanged(),
        assignedCities: [LAVRAS, VARGINHA],
      })
    ).toEqual({})
  })

  // Decided 2026-10-30: the administration sees every city, so cities kept there would mean
  // nothing, and could come back stale if the role changed again.
  it('takes every city away from an account that becomes admin', () => {
    expect(
      accountChanges(ANA_IN_TWO, { ...unchanged(), role: 'admin' })
    ).toEqual({ role: 'admin', assignedCities: [] })
  })

  it('leaves the cities of an admin alone when only the name changes', () => {
    expect(
      accountChanges(CARLA, { ...unchanged(CARLA), name: 'Carla Dias Reis' })
    ).toEqual({ name: 'Carla Dias Reis' })
  })
})
