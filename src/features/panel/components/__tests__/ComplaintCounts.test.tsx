import { MANAGER_COUNTS, TEAM_COUNTS } from '@/test/fixtures/complaintCounts'
import {
  apiErrorResponse,
  deferredResponse,
  jsonResponse,
  requestedUrl,
  stubApi,
  TEST_API_URL,
} from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest'

import { ComplaintCounts } from '../ComplaintCounts'

let fetchMock: Mock<typeof fetch>

beforeEach(() => {
  fetchMock = stubApi()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const valueOf = (label: string) =>
  within(
    screen.getByText(label, { selector: 'dt' }).parentElement as HTMLElement
  ).getByText(/^[\d.]+$/).textContent

describe('ComplaintCounts', () => {
  it('reads the numbers of the signed-in person from the counts route', async () => {
    fetchMock.mockResolvedValue(jsonResponse(TEAM_COUNTS))

    renderWithQueryClient(<ComplaintCounts />)

    await screen.findByText('Não lidas')
    expect(requestedUrl(fetchMock)).toBe(
      `${TEST_API_URL}/api/complaints/counts`
    )
  })

  it('shows the team what needs them, and the totals by status', async () => {
    fetchMock.mockResolvedValue(jsonResponse(TEAM_COUNTS))

    renderWithQueryClient(<ComplaintCounts />)

    await screen.findByRole('heading', { name: 'O que precisa de você' })
    expect(valueOf('Aguardando moderação')).toBe('2')
    expect(valueOf('Não lidas')).toBe('4')
    expect(valueOf('Comigo')).toBe('6')
    expect(valueOf('Sem responsável')).toBe('7')
    expect(valueOf('Em andamento')).toBe('5')
    expect(valueOf('Resolvidas')).toBe('12')
  })

  it('shows the manager only the published statuses, without the team inbox', async () => {
    fetchMock.mockResolvedValue(jsonResponse(MANAGER_COUNTS))

    renderWithQueryClient(<ComplaintCounts />)

    await screen.findByRole('heading', { name: 'Reclamações por status' })
    expect(
      screen.queryByRole('heading', { name: 'O que precisa de você' })
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Não lidas')).not.toBeInTheDocument()
    expect(valueOf('Em análise')).toBe('3')
  })

  it('announces the loading state while the numbers arrive', () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    renderWithQueryClient(<ComplaintCounts />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'Carregando os números…'
    )
  })

  it('keeps the retry button focused while it retries, then focuses the numbers', async () => {
    const slowRetry = deferredResponse()
    fetchMock
      .mockResolvedValueOnce(apiErrorResponse(503))
      .mockReturnValueOnce(slowRetry.promise)
    renderWithQueryClient(<ComplaintCounts />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os números agora.'
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Tentar de novo' })
    )
    expect(
      screen.getByRole('button', { name: 'Tentando de novo…' })
    ).toHaveFocus()

    slowRetry.release(jsonResponse(TEAM_COUNTS))

    const label = await screen.findByText('Não lidas')
    await waitFor(() => expect(document.activeElement).not.toBe(document.body))
    expect(document.activeElement).toContainElement(label)
  })
})
