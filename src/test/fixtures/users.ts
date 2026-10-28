import type { User } from '@features/users/services/usersApi'

export const buildUser = (overrides: Partial<User> = {}): User => ({
  id: 'usr_ana',
  name: 'Ana Souza',
  email: 'ana@faladoria.org',
  role: 'assistant',
  assignedCities: [{ city: 'Varginha', state: 'MG' }],
  status: 'active',
  assignedComplaintCount: 4,
  ...overrides,
})

export const ANA = buildUser()
export const BRUNO = buildUser({
  id: 'usr_bruno',
  name: 'Bruno Lima',
  email: 'bruno@saude.varginha.mg.gov.br',
  role: 'manager',
  status: 'pendingFirstAccess',
  assignedComplaintCount: 0,
})
/** The administration signed in during the tests. */
export const CARLA = buildUser({
  id: 'usr_carla',
  name: 'Carla Dias',
  email: 'carla@faladoria.org',
  role: 'admin',
  assignedCities: [],
  assignedComplaintCount: 1,
})
export const DORA = buildUser({
  id: 'usr_dora',
  name: 'Dora Matos',
  email: 'dora@saude.alfenas.mg.gov.br',
  role: 'manager',
  assignedCities: [],
  status: 'temporaryCredentialExpired',
  assignedComplaintCount: 0,
})

/** A made-up value: the tests only check that it is shown, never what it looks like. */
export const TEMPORARY_PASSWORD = 'senha-de-teste'
