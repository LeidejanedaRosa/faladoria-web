import { PUBLIC_STATS } from '@/test/fixtures/publicComplaints'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen, within } from '@testing-library/react'
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

import { TransparencyStats } from '../TransparencyStats'

let fetchMock: Mock<typeof fetch>

beforeEach(() => {
  fetchMock = stubApi()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const cardValue = (label: string) => {
  const term = screen.getByText(label, { selector: 'dt' })
  return within(term.parentElement as HTMLElement).getByText(/^[\d.]+$/)
}

describe('TransparencyStats', () => {
  it('announces the loading state to screen readers while the totals arrive', () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    renderWithQueryClient(<TransparencyStats />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'Carregando os números do quadro…'
    )
  })

  it('shows the API totals on the four cards', async () => {
    fetchMock.mockResolvedValue(jsonResponse(PUBLIC_STATS))

    renderWithQueryClient(<TransparencyStats />)

    expect(await screen.findByText('Total de Demandas')).toBeInTheDocument()
    expect(cardValue('Total de Demandas')).toHaveTextContent('48')
    expect(cardValue('Resolvidas')).toHaveTextContent('19')
    expect(cardValue('Em Mediação')).toHaveTextContent('23')
    expect(cardValue('Sem Solução (Ainda)')).toHaveTextContent('6')
    expect(screen.getByText('48% em mediação')).toBeInTheDocument()
  })

  it('replaces the cards with an error and a retry button when the API fails', async () => {
    fetchMock.mockResolvedValue(apiErrorResponse(503))

    renderWithQueryClient(<TransparencyStats />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os dados agora.'
    )
    expect(screen.queryByText('Total de Demandas')).not.toBeInTheDocument()
  })

  it('loads the totals again when the person asks to retry', async () => {
    fetchMock
      .mockResolvedValueOnce(apiErrorResponse(503))
      .mockResolvedValueOnce(jsonResponse(PUBLIC_STATS))

    renderWithQueryClient(<TransparencyStats />)
    await userEvent.click(
      await screen.findByRole('button', { name: 'Tentar de novo' })
    )

    expect(await screen.findByText('Total de Demandas')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
