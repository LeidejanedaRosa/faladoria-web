import { fakeUsersApi } from '@/test/fakeUsersApi'
import { VARGINHA } from '@/test/fixtures/serviceAreas'
import { buildSessionUser } from '@/test/fixtures/session'
import { ANA, CARLA } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AccountPage } from '../AccountPage'

const SELF = buildSessionUser({
  id: CARLA.id,
  name: CARLA.name,
  email: CARLA.email,
  role: 'admin',
  assignedCities: [],
})

// The panel layout's part: the signed-in person reaches the page through the outlet context.
const renderPage = (userId: string) =>
  render(
    <MemoryRouter initialEntries={[`/dashboard/equipe/${userId}`]}>
      <Routes>
        <Route element={<Outlet context={{ user: SELF }} />}>
          <Route path='/dashboard/equipe/:userId' element={<AccountPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )

const openAccount = (userId: string) => {
  fakeUsersApi(stubApi(), { users: [ANA, CARLA], servedAreas: [VARGINHA] })
  renderPage(userId)
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('AccountPage', () => {
  it('says it is loading while the account is on its way', () => {
    openAccount(ANA.id)

    expect(screen.getByText('Carregando a conta…')).toBeInTheDocument()
  })

  it('names the account, its status and its login, which cannot change', async () => {
    openAccount(ANA.id)

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Ana Souza' })
    ).toBeInTheDocument()
    expect(screen.getByText('Ativa')).toBeInTheDocument()
    expect(screen.getByText('ana@faladoria.org')).toBeInTheDocument()
    expect(
      screen.getByText(/O e-mail é o login e não pode ser trocado/)
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', { name: /E-mail/ })
    ).not.toBeInTheDocument()
    expect(document.title).toContain('Ana Souza · Equipe')
  })

  it('groups the account in data, password and access, in that order', async () => {
    openAccount(ANA.id)

    await screen.findByRole('heading', { level: 1, name: 'Ana Souza' })
    expect(
      screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent)
    ).toEqual(['Dados da conta', 'Senha', 'Acesso ao painel'])
    expect(
      screen.getByRole('region', { name: 'Acesso ao painel' })
    ).toContainElement(screen.getByRole('button', { name: 'Desativar conta' }))
  })

  it('leads back to the team from the breadcrumb, marking where the person is', async () => {
    openAccount(ANA.id)

    const trail = await screen.findByRole('navigation', {
      name: 'Trilha de navegação',
    })
    expect(within(trail).getByRole('link', { name: 'Equipe' })).toHaveAttribute(
      'href',
      '/dashboard/equipe'
    )
    expect(within(trail).getByText('Ana Souza')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('marks the signed-in account and locks its role', async () => {
    openAccount(CARLA.id)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Carla Dias(você)')
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })

  it('says when the account does not exist, and leads back to the team', async () => {
    openAccount('usr_nobody')

    expect(
      await screen.findByRole('heading', { name: 'Conta não encontrada' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Voltar para a equipe' })
    ).toHaveAttribute('href', '/dashboard/equipe')
  })

  it('offers a retry when the account fails to load, and moves focus to it once it loads', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValueOnce(apiErrorResponse(500))
    fetchMock.mockImplementation(async input =>
      new URL(String(input)).pathname === '/api/users'
        ? jsonResponse([ANA, CARLA])
        : jsonResponse({ serviceAreas: [VARGINHA] })
    )
    renderPage(ANA.id)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Não foi possível carregar a conta agora.')
    const retry = within(alert).getByRole('button', { name: 'Tentar de novo' })
    retry.focus()
    await userEvent.click(retry)

    const heading = await screen.findByRole('heading', { level: 1 })
    await waitFor(() =>
      expect(heading.closest('[tabindex="-1"]')).toHaveFocus()
    )
  })
})
