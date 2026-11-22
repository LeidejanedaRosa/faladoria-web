import { fakeStaffActionsApi } from '@/test/fakeStaffActionsApi'
import { buildStaffAction } from '@/test/fixtures/staffActions'
import { stubApi } from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { StaffAction } from '../../services/staffActionsApi'
import { ActionHistory } from '../ActionHistory'

// 22 Nov 2026, 15:00 in Brasília. Only Date is faked: user-event still needs real timers.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-11-22T18:00:00.000Z'))
})
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const NAMES = new Map([['usr_bruno', 'Bruno Lima']])

const TODAY = [
  buildStaffAction({
    action: 'POST /api/users/:id/reset-password',
    targetId: 'usr_bruno',
    occurredAt: '2026-11-22T17:03:00.000Z',
  }),
  buildStaffAction({
    action: 'POST /api/auth/sign-in/email',
    targetId: undefined,
    succeeded: false,
    statusCode: 401,
    occurredAt: '2026-11-22T16:00:00.000Z',
  }),
]
const OLDER = [
  buildStaffAction({
    action: 'GET /api/staff-actions',
    targetId: undefined,
    succeeded: false,
    statusCode: 403,
    occurredAt: '2026-11-19T13:00:00.000Z',
  }),
]

const renderHistory = (
  pages: StaffAction[][],
  options?: { failFirst?: boolean }
) => {
  const requests = fakeStaffActionsApi(stubApi(), pages, options)
  renderWithQueryClient(<ActionHistory actorId='usr_ana' targetNames={NAMES} />)
  return requests
}

/** Each action as read: its time, its text and its badge. */
const rows = () => screen.getAllByRole('listitem').map(item => item.textContent)
const day = (label: string) => screen.getByRole('region', { name: label })
const loadMore = () =>
  screen.getByRole('button', { name: 'Carregar ações mais antigas' })

describe('ActionHistory', () => {
  it('says it is loading while the history is on its way', () => {
    renderHistory([TODAY])

    expect(screen.getByText('Carregando o histórico…')).toBeInTheDocument()
  })

  it('groups the actions by day, each with its time in Brasília and its text', async () => {
    renderHistory([[...TODAY, ...OLDER]])

    await screen.findByRole('region', { name: 'Hoje' })
    expect(within(day('Hoje')).getAllByRole('listitem')).toHaveLength(2)
    expect(rows()).toEqual([
      '14:03Gerou uma nova senha para Bruno Lima',
      '13:00Tentativa de entrar nesta contaRecusada',
      '10:00Tentou abrir uma área do painelSem permissão',
    ])
    expect(day('19 de novembro de 2026')).toBeInTheDocument()
    expect(
      within(day('Hoje'))
        .getByRole('heading', { level: 3 })
        .querySelector('time')
    ).toHaveAttribute('dateTime', '2026-11-22')
  })

  it('says when the person has no action yet', async () => {
    renderHistory([[]])

    expect(
      await screen.findByText('Nenhuma ação registrada ainda.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('loads older actions on request, then says there are no more', async () => {
    const requests = renderHistory([TODAY, OLDER])
    await screen.findByRole('region', { name: 'Hoje' })
    expect(
      screen.queryByText('Não há ações mais antigas.')
    ).not.toBeInTheDocument()

    await userEvent.click(loadMore())

    await screen.findByRole('region', { name: '19 de novembro de 2026' })
    expect(requests[1].get('cursor')).toBe('1')
    expect(rows()).toHaveLength(3)
    expect(screen.getByText('Não há ações mais antigas.')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Carregar ações mais antigas' })
    ).not.toBeInTheDocument()
  })

  it('moves focus to the first action loaded, since the button leaves with the last page', async () => {
    renderHistory([TODAY, OLDER])
    await screen.findByRole('region', { name: 'Hoje' })

    await userEvent.click(loadMore())

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')[2]).toHaveFocus()
    )
  })

  it('offers a retry when the history fails, and moves focus to it once it loads', async () => {
    renderHistory([TODAY], { failFirst: true })

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(
      'Não foi possível carregar o histórico agora.'
    )
    const retry = within(alert).getByRole('button', { name: 'Tentar de novo' })
    retry.focus()
    await userEvent.click(retry)

    await screen.findByRole('region', { name: 'Hoje' })
    await waitFor(() =>
      expect(
        screen.getByText(/O que esta pessoa fez no painel/).parentElement
      ).toHaveFocus()
    )
  })
})
