import type { Page, Route } from '@playwright/test'

// The E2E build points at this address (playwright.config.ts); nothing answers on it,
// so every API call in a test is either intercepted here or fails like a down API.
export const E2E_API_URL = 'https://api.e2e.test'

const STATS_URL = `${E2E_API_URL}/api/public/complaints/stats`
const LIST_URL = `${E2E_API_URL}/api/public/complaints?*`

const complaint = (
  id: string,
  status: string,
  receivedOn: string,
  title: string,
  occurrencePlace: string,
  city: string
) => ({
  id,
  status,
  receivedOn,
  curatedData: {
    title,
    description: '',
    city,
    state: 'MG',
    category: '',
    occurrencePlace,
  },
  timeline: [],
})

export const PUBLIC_BOARD_STATS = {
  total: 48,
  byStatus: { inReview: 9, inProgress: 14, unresolved: 6, resolved: 19 },
}

export const PUBLIC_BOARD_COMPLAINTS = [
  complaint(
    '1',
    'inReview',
    '2026-10-22',
    'Falta de insulina na farmácia municipal',
    'Farmácia Municipal',
    'Varginha'
  ),
  complaint(
    '2',
    'inProgress',
    '2026-10-21',
    'Demora para marcar cirurgia de catarata',
    'Hospital Regional',
    'Alfenas'
  ),
  complaint(
    '3',
    'resolved',
    '2026-10-18',
    'Exame de ressonância sem data há 5 meses',
    'Policlínica Central',
    'Três Corações'
  ),
  complaint(
    '4',
    'unresolved',
    '2026-10-15',
    'Ausência de pediatra no plantão noturno',
    'UPA 24h',
    'Poços de Caldas'
  ),
  complaint(
    '5',
    'inProgress',
    '2026-10-12',
    'Transporte para hemodiálise cancelado',
    'Secretaria de Saúde',
    'Lavras'
  ),
  complaint(
    '6',
    'resolved',
    '2026-10-09',
    'Falta de fraldas geriátricas',
    'UBS Jardim Andere',
    'Varginha'
  ),
]

const serverError = (route: Route) =>
  route.fulfill({
    status: 503,
    json: { statusCode: 503, code: 'INTERNAL_ERROR', message: 'Erro.' },
  })

export const mockPublicBoard = async (
  page: Page,
  { stats = PUBLIC_BOARD_STATS, complaints = PUBLIC_BOARD_COMPLAINTS } = {}
) => {
  await page.route(STATS_URL, route => route.fulfill({ json: stats }))
  await page.route(LIST_URL, route => route.fulfill({ json: { complaints } }))
}

export const mockPublicBoardDown = async (page: Page) => {
  await page.route(STATS_URL, serverError)
  await page.route(LIST_URL, serverError)
}

export const mockPublicBoardPending = async (page: Page) => {
  const neverAnswer = () => new Promise<void>(() => {})
  await page.route(STATS_URL, neverAnswer)
  await page.route(LIST_URL, neverAnswer)
}
