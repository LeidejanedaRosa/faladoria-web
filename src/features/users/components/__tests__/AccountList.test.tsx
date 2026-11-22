import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ANA, BRUNO, buildUser, CARLA, DORA } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { AccountGroup } from '../../data/accountGroups'
import { AccountList } from '../AccountList'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const renderList = (
  group: AccountGroup = 'team',
  users = [ANA, BRUNO, CARLA, DORA],
  address = '/dashboard/equipe'
) => {
  fakeUsersApi(stubApi(), { users })
  renderWithQueryClient(
    <MemoryRouter initialEntries={[address]}>
      <AccountList group={group} selfId={CARLA.id} />
    </MemoryRouter>
  )
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

  it('lists only the Faladoria team in the team folder', async () => {
    renderList('team')

    await screen.findByText('Ana Souza')
    expect(screen.getByText('Carla Dias')).toBeInTheDocument()
    expect(screen.queryByText('Bruno Lima')).not.toBeInTheDocument()
    expect(screen.queryByText('Dora Matos')).not.toBeInTheDocument()
  })

  it('lists only the health managers in the managers folder', async () => {
    renderList('managers')

    await screen.findByText('Bruno Lima')
    expect(screen.getByText('Dora Matos')).toBeInTheDocument()
    expect(screen.queryByText('Ana Souza')).not.toBeInTheDocument()
    expect(screen.queryByText('Carla Dias')).not.toBeInTheDocument()
  })

  it('names every status in words, not only by color', async () => {
    renderList('managers')

    await screen.findByText('Bruno Lima')
    expect(valuesOf('Bruno Lima')).toContain(
      'Situação: Aguardando primeiro acesso'
    )
    expect(valuesOf('Dora Matos')).toContain(
      'Situação: Senha temporária vencida'
    )
  })

  it('says the administration sees every city', async () => {
    renderList('team')

    await screen.findByText('Ana Souza')
    expect(valuesOf('Carla Dias')).toContain('Cidades: Todas')
  })

  it('flags an account without a city', async () => {
    renderList('managers')

    await screen.findByText('Bruno Lima')
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

  it('says when the signed-in account is the only one in the team', async () => {
    renderList('team', [CARLA, BRUNO])

    expect(
      await screen.findByText('Nenhuma conta além da sua.')
    ).toBeInTheDocument()
  })

  it('says when there is no manager yet, though the team has people', async () => {
    renderList('managers', [ANA, CARLA])

    expect(
      await screen.findByText('Nenhum gestor cadastrado ainda.')
    ).toBeInTheDocument()
    expect(screen.queryByText('Ana Souza')).not.toBeInTheDocument()
  })

  it('says nothing about an empty folder when it has someone', async () => {
    renderList('managers', [CARLA, BRUNO])

    await screen.findByText('Bruno Lima')
    expect(
      screen.queryByText('Nenhum gestor cadastrado ainda.')
    ).not.toBeInTheDocument()
  })

  it('offers a retry when the list fails, and moves focus to the list once it loads', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValueOnce(apiErrorResponse(500))
    fetchMock.mockResolvedValueOnce(jsonResponse([ANA, CARLA]))
    renderWithQueryClient(
      <MemoryRouter>
        <AccountList group='team' selfId={CARLA.id} />
      </MemoryRouter>
    )

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(
      'Não foi possível carregar as contas agora.'
    )
    const retry = within(alert).getByRole('button', { name: 'Tentar de novo' })
    retry.focus()
    await userEvent.click(retry)

    await screen.findByText('Ana Souza')
    await waitFor(() =>
      expect(screen.getByRole('list').closest('[tabindex="-1"]')).toHaveFocus()
    )
  })

  it('links each account to its own page, named after the person', async () => {
    renderList('team', [ANA, CARLA])

    const edit = await screen.findByRole('link', {
      name: 'Editar a conta de Ana Souza',
    })
    expect(edit).toHaveAttribute('href', '/dashboard/equipe/usr_ana')
    expect(edit).toHaveTextContent('Editar')
  })
})

const JOSE = buildUser({
  id: 'usr_jose',
  name: 'José Antônio',
  email: 'jose@saude.campinas.sp.gov.br',
  assignedCities: [{ city: 'Campinas', state: 'SP' }],
})
const TEAM = [CARLA, ANA, JOSE]

const stateField = () => screen.getByRole('combobox', { name: 'Estado' })
const cityField = () => screen.getByRole('combobox', { name: 'Cidade' })
const searchField = () =>
  screen.getByRole('searchbox', { name: 'Buscar por nome ou e-mail' })
const listedNames = () =>
  screen
    .queryAllByRole('listitem')
    .map(item => item.querySelector('p')!.firstChild!.textContent)
const count = () =>
  screen.getAllByRole('status').find(element => element.tagName === 'P')!

describe('AccountList filters', () => {
  it('offers the states and cities of the folder’s accounts, the city only after a state', async () => {
    renderList('team', TEAM)
    await screen.findByText('Ana Souza')

    expect(
      within(stateField())
        .getAllByRole('option')
        .map(option => option.textContent)
    ).toEqual(['Todos os estados', 'MG', 'SP'])
    expect(cityField()).toBeDisabled()
    expect(cityField()).toHaveAccessibleDescription(
      'Escolha o estado primeiro.'
    )

    await userEvent.selectOptions(stateField(), 'SP')

    expect(cityField()).toBeEnabled()
    expect(
      within(cityField())
        .getAllByRole('option')
        .map(option => option.textContent)
    ).toEqual(['Todas as cidades', 'Campinas'])
  })

  it('keeps the admins in any city, since they serve all', async () => {
    renderList('team', TEAM)
    await screen.findByText('Ana Souza')

    await userEvent.selectOptions(stateField(), 'MG')
    await userEvent.selectOptions(cityField(), 'Varginha')

    expect(listedNames()).toEqual(['Carla Dias', 'Ana Souza'])
    expect(count()).toHaveTextContent('Mostrando 2 de 3 contas')
  })

  it('finds an account by e-mail or name, ignoring accents and case', async () => {
    renderList('team', TEAM)
    await screen.findByText('Ana Souza')

    await userEvent.type(searchField(), 'CAMPINAS')
    expect(listedNames()).toEqual(['José Antônio'])

    await userEvent.clear(searchField())
    await userEvent.type(searchField(), 'jose antonio')
    expect(listedNames()).toEqual(['José Antônio'])
  })

  it('says when no account matches', async () => {
    renderList('team', TEAM)
    await screen.findByText('Ana Souza')

    await userEvent.type(searchField(), 'zzz')

    expect(listedNames()).toEqual([])
    expect(screen.getByText('Nenhuma conta com esses filtros.')).toBeVisible()
    expect(count()).toHaveTextContent('Mostrando 0 de 3 contas')
  })

  it('opens with the filters of the address', async () => {
    renderList('team', TEAM, '/dashboard/equipe?estado=SP&busca=jose')

    await screen.findByText('José Antônio')
    expect(stateField()).toHaveValue('SP')
    expect(searchField()).toHaveValue('jose')
    expect(listedNames()).toEqual(['José Antônio'])
  })

  it('carries the filters into the account it opens', async () => {
    renderList('team', TEAM, '/dashboard/equipe?estado=SP')

    expect(
      await screen.findByRole('link', {
        name: 'Editar a conta de José Antônio',
      })
    ).toHaveAttribute('href', '/dashboard/equipe/usr_jose?estado=SP')
  })

  it('clears every filter and gives focus to the first one', async () => {
    renderList('team', TEAM, '/dashboard/equipe?estado=SP&busca=jose')
    await screen.findByText('José Antônio')

    await userEvent.click(
      screen.getByRole('button', { name: 'Limpar filtros' })
    )

    expect(listedNames()).toEqual(['Carla Dias', 'Ana Souza', 'José Antônio'])
    expect(searchField()).toHaveValue('')
    expect(stateField()).toHaveFocus()
    expect(count()).toBeEmptyDOMElement()
    expect(
      screen.queryByRole('button', { name: 'Limpar filtros' })
    ).not.toBeInTheDocument()
  })

  it('keeps the count region in place while unfiltered, so the first count is announced', async () => {
    renderList('team', TEAM)
    await screen.findByText('Ana Souza')
    const region = count()

    await userEvent.selectOptions(stateField(), 'SP')

    expect(count()).toBe(region)
    expect(region).toHaveTextContent('Mostrando 2 de 3 contas')
  })

  it('has nothing to filter when the signed-in admin is alone in the folder', async () => {
    renderList('team', [CARLA], '/dashboard/equipe?busca=zzz')

    expect(
      await screen.findByText('Nenhuma conta além da sua.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('search')).not.toBeInTheDocument()
    expect(listedNames()).toEqual(['Carla Dias'])
  })
})
