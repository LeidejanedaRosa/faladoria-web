import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ANA, BRUNO, CARLA, DORA } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AccountList } from '../AccountList'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const renderList = (users = [ANA, BRUNO, CARLA, DORA]) => {
  fakeUsersApi(stubApi(), { users })
  renderWithQueryClient(<AccountList selfId={CARLA.id} />)
}

/** The account's values as a screen reader gets them: "label: value". */
const valuesOf = (name: string) => {
  const item = screen.getByText(name).closest('li')!
  const terms = within(item).getAllByRole('term')
  const details = within(item).getAllByRole('definition')
  return terms.map(
    (term, index) => `${term.textContent} ${details[index].textContent}`
  )
}

describe('AccountList', () => {
  it('says it is loading while the accounts are on their way', () => {
    renderList()

    expect(screen.getByText('Carregando as contas…')).toBeInTheDocument()
  })

  it('shows each account with its role, cities, status and open cases', async () => {
    renderList()

    await screen.findByText('Ana Souza')
    expect(screen.getByText('ana@faladoria.org')).toBeInTheDocument()
    expect(valuesOf('Ana Souza')).toEqual([
      'Papel: Assistente',
      'Cidades: Varginha/MG',
      'Situação: Ativa',
      'Casos em andamento: 4',
    ])
  })

  it('names every status in words, not only by color', async () => {
    renderList()

    await screen.findByText('Ana Souza')
    expect(valuesOf('Bruno Lima')).toContain(
      'Situação: Aguardando primeiro acesso'
    )
    expect(valuesOf('Dora Matos')).toContain(
      'Situação: Senha temporária vencida'
    )
  })

  it('says the administration sees every city, and flags an account without one', async () => {
    renderList()

    await screen.findByText('Ana Souza')
    expect(valuesOf('Carla Dias')).toContain('Cidades: Todas')
    expect(valuesOf('Dora Matos')).toContain('Cidades: Nenhuma cidade')
  })

  it('marks the signed-in account', async () => {
    renderList()

    await screen.findByText('Ana Souza')
    expect(
      within(screen.getByText('Carla Dias').closest('li')!).getByText('(você)')
    ).toBeInTheDocument()
    expect(screen.getAllByText('(você)')).toHaveLength(1)
  })

  it('says when the signed-in account is the only one', async () => {
    renderList([CARLA])

    expect(
      await screen.findByText('Nenhuma conta além da sua.')
    ).toBeInTheDocument()
  })

  it('offers a retry when the list fails, and moves focus to the list once it loads', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValueOnce(apiErrorResponse(500))
    fetchMock.mockResolvedValueOnce(jsonResponse([ANA, CARLA]))
    renderWithQueryClient(<AccountList selfId={CARLA.id} />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(
      'Não foi possível carregar as contas agora.'
    )
    const retry = within(alert).getByRole('button', { name: 'Tentar de novo' })
    retry.focus()
    await userEvent.click(retry)

    await screen.findByText('Ana Souza')
    await waitFor(() =>
      expect(screen.getByRole('list').parentElement).toHaveFocus()
    )
  })
})
