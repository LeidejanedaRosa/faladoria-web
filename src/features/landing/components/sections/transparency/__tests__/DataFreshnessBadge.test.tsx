import { PUBLIC_STATS } from '@/test/fixtures/publicComplaints'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen } from '@testing-library/react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest'

import { DataFreshnessBadge } from '../DataFreshnessBadge'

const READ_AT = new Date(2026, 9, 23, 14, 32)

let fetchMock: Mock<typeof fetch>

beforeEach(() => {
  fetchMock = stubApi()
  // Only Date is faked: the query still needs real timers to settle.
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(READ_AT)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('DataFreshnessBadge', () => {
  it('says it is updating while the totals are on the way', () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    renderWithQueryClient(<DataFreshnessBadge />)

    expect(screen.getByText('Atualizando…')).toBeInTheDocument()
  })

  it('shows the time this screen got the data, with a machine-readable instant', async () => {
    fetchMock.mockResolvedValue(jsonResponse(PUBLIC_STATS))

    renderWithQueryClient(<DataFreshnessBadge />)

    const time = await screen.findByText('14:32')
    expect(time.tagName).toBe('TIME')
    expect(time).toHaveAttribute('dateTime', READ_AT.toISOString())
    expect(time.parentElement).toHaveTextContent('Atualizado às 14:32')
  })

  it('admits the data could not be updated when the API fails', async () => {
    fetchMock.mockResolvedValue(apiErrorResponse(503))

    renderWithQueryClient(<DataFreshnessBadge />)

    expect(
      await screen.findByText('Não foi possível atualizar')
    ).toBeInTheDocument()
    expect(screen.queryByText(/Atualizado às/)).not.toBeInTheDocument()
  })

  it('does not announce itself, so loading the page does not interrupt a screen reader', () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    const { container } = renderWithQueryClient(<DataFreshnessBadge />)

    expect(container.querySelector('[aria-live]')).toBeNull()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
