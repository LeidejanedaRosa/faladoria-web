import { buildPublicComplaint } from '@/test/fixtures/publicComplaints'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
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

import { InteractionsPanel } from '../InteractionsPanel'

let fetchMock: Mock<typeof fetch>

beforeEach(() => {
  fetchMock = stubApi()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('InteractionsPanel', () => {
  it('keeps the panel title and the LGPD notice in every state', () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    renderWithQueryClient(<InteractionsPanel />)

    expect(
      screen.getByRole('heading', { name: 'Últimas Interações' })
    ).toBeInTheDocument()
    expect(screen.getByText('Dados anonimizados (LGPD)')).toBeInTheDocument()
  })

  it('announces the loading state and hides the placeholder rows from screen readers', () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    renderWithQueryClient(<InteractionsPanel />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'Carregando as últimas reclamações…'
    )
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('lists each complaint with title, place, city, status and the day it arrived', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        complaints: [
          buildPublicComplaint({ id: 'c1', status: 'resolved' }),
          buildPublicComplaint({ id: 'c2', receivedOn: '2026-10-09' }),
        ],
      })
    )

    renderWithQueryClient(<InteractionsPanel />)

    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(2)
    const first = within(items[0])
    expect(
      first.getByText('Demora para marcar cirurgia de catarata')
    ).toBeInTheDocument()
    expect(first.getByText('Hospital Regional')).toBeInTheDocument()
    expect(first.getByText('Alfenas - MG')).toBeInTheDocument()
    expect(first.getByLabelText('Status: Resolvido')).toBeInTheDocument()
    expect(within(items[1]).getByText('09/10/2026')).toHaveAttribute(
      'dateTime',
      '2026-10-09'
    )
  })

  it('invites the first complaint when nothing is published yet', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ complaints: [] }))

    renderWithQueryClient(<InteractionsPanel />)

    expect(
      await screen.findByText(
        'Ainda não há reclamações publicadas. A sua pode ser a primeira.'
      )
    ).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('shows an error with a retry that brings the list back', async () => {
    fetchMock
      .mockResolvedValueOnce(apiErrorResponse(500))
      .mockResolvedValueOnce(
        jsonResponse({ complaints: [buildPublicComplaint()] })
      )

    renderWithQueryClient(<InteractionsPanel />)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os dados agora.'
    )

    await userEvent.click(
      screen.getByRole('button', { name: 'Tentar de novo' })
    )

    expect(await screen.findAllByRole('listitem')).toHaveLength(1)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('moves focus to the list after a retry that works', async () => {
    fetchMock
      .mockResolvedValueOnce(apiErrorResponse(500))
      .mockResolvedValueOnce(
        jsonResponse({ complaints: [buildPublicComplaint()] })
      )

    renderWithQueryClient(<InteractionsPanel />)
    await userEvent.click(
      await screen.findByRole('button', { name: 'Tentar de novo' })
    )

    const list = await screen.findByRole('list')
    // <body> also contains the content: rule it out, or a lost focus would pass too.
    await waitFor(() => expect(document.activeElement).not.toBe(document.body))
    expect(document.activeElement).toContainElement(list)
  })
})
