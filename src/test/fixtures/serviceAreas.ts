import type { ServiceArea } from '@features/service-areas/services/serviceAreasApi'

export const buildServiceArea = (
  overrides: Partial<ServiceArea> = {}
): ServiceArea => ({
  id: 'sa_varginha',
  city: 'Varginha',
  state: 'MG',
  addedAt: '2026-10-01T13:00:00.000Z',
  removedAt: null,
  ...overrides,
})

export const ALFENAS = buildServiceArea({
  id: 'sa_alfenas',
  city: 'Alfenas',
  addedAt: '2026-10-03T13:00:00.000Z',
})
export const VARGINHA = buildServiceArea()
export const LAVRAS_REMOVED = buildServiceArea({
  id: 'sa_lavras',
  city: 'Lavras',
  addedAt: '2026-09-20T13:00:00.000Z',
  removedAt: '2026-10-12T15:00:00.000Z',
})

/** What the IBGE answers for a state: each city with many more fields, of which only `nome` is read. */
export const ibgeCities = (...names: string[]) =>
  names.map(nome => ({ id: 1, nome, microrregiao: {} }))

export const MG_CITIES = [
  'Alfenas',
  'Lavras',
  'São José da Varginha',
  'Vargem Alegre',
  'Varginha',
]
