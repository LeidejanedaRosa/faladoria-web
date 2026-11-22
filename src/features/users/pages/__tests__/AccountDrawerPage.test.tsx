import { fakeUsersApi } from '@/test/fakeUsersApi'
import { LAVRAS_REMOVED, VARGINHA } from '@/test/fixtures/serviceAreas'
import { buildSessionUser } from '@/test/fixtures/session'
import { buildStaffAction } from '@/test/fixtures/staffActions'
import { ANA, BRUNO, CARLA } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { type AccountGroup, GROUP_ROUTES } from '../../data/accountGroups'
import type { FolderOutletContext } from '../../hooks/useFolderContext'
import { AccountDrawerPage } from '../AccountDrawerPage'

const SELF = buildSessionUser({
  id: CARLA.id,
  name: CARLA.name,
  email: CARLA.email,
  role: 'admin',
  assignedCities: [],
})

const CurrentPath = () => <p data-testid='path'>{useLocation().pathname}</p>

// The folder's part: its list, and the context the drawer reads from it.
const Folder = ({ group }: { group: AccountGroup }) => {
  const context: FolderOutletContext = {
    user: SELF,
    group,
    onAccountCreated: vi.fn(),
  }
  return <Outlet context={context} />
}

const renderDrawer = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <CurrentPath />
      <Routes>
        {(['team', 'managers'] as const).map(group => (
          <Route
            key={group}
            path={GROUP_ROUTES[group]}
            element={<Folder group={group} />}
          >
            <Route path=':userId' element={<AccountDrawerPage />} />
          </Route>
        ))}
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )

const openAccount = (userId: string, folder = '/dashboard/equipe') => {
  const api = fakeUsersApi(stubApi(), {
    users: [ANA, BRUNO, CARLA],
    servedAreas: [VARGINHA],
  })
  renderDrawer(`${folder}/${userId}`)
  return api
}

const drawerOf = (name: string) => screen.findByRole('dialog', { name })
const currentPath = () => screen.getByTestId('path').textContent

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('AccountDrawerPage', () => {
  it('says it is loading while the account is on its way', () => {
    openAccount(ANA.id)

    expect(screen.getByText('Carregando a conta…')).toBeInTheDocument()
  })

  it('opens a drawer named after the account, with its status and its login, which cannot change', async () => {
    openAccount(ANA.id)

    const drawer = await drawerOf('Ana Souza')
    expect(drawer).toHaveAttribute('open')
    expect(within(drawer).getByText('Ativa')).toBeInTheDocument()
    expect(within(drawer).getByText('ana@faladoria.org')).toBeInTheDocument()
    expect(
      within(drawer).getByText(/O e-mail é o login e não pode ser trocado/)
    ).toBeInTheDocument()
    expect(
      within(drawer).queryByRole('textbox', { name: /E-mail/ })
    ).not.toBeInTheDocument()
    expect(document.title).toContain('Ana Souza · Equipe')
  })

  it('puts the focus on the title, which names the drawer', async () => {
    openAccount(ANA.id)

    const drawer = await drawerOf('Ana Souza')
    expect(
      within(drawer).getByRole('heading', { name: 'Ana Souza' })
    ).toHaveFocus()
  })

  it('splits the account in two tabs, data first and access second', async () => {
    openAccount(ANA.id)

    const drawer = await drawerOf('Ana Souza')
    const tabs = within(drawer).getAllByRole('tab')
    expect(tabs.map(tab => tab.textContent)).toEqual(['Dados', 'Acesso'])
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(within(drawer).getByRole('textbox', { name: 'Nome' })).toBeVisible()

    await userEvent.click(tabs[1])

    const access = within(drawer).getByRole('tabpanel', { name: 'Acesso' })
    expect(
      within(access)
        .getAllByRole('heading', { level: 2 })
        .map(h => h.textContent)
    ).toEqual(['Senha', 'Acesso ao painel', 'Histórico de ações'])
    expect(
      within(access).getByRole('button', { name: 'Desativar conta' })
    ).toBeInTheDocument()
  })

  it('keeps what was typed in Dados while the person looks at Acesso', async () => {
    openAccount(ANA.id)
    const drawer = await drawerOf('Ana Souza')
    const name = within(drawer).getByRole('textbox', { name: 'Nome' })
    await userEvent.clear(name)
    await userEvent.type(name, 'Ana Lima')

    await userEvent.click(within(drawer).getByRole('tab', { name: 'Acesso' }))
    await userEvent.click(within(drawer).getByRole('tab', { name: 'Dados' }))

    expect(within(drawer).getByRole('textbox', { name: 'Nome' })).toHaveValue(
      'Ana Lima'
    )
  })

  it('moves an account opened in the wrong folder to its own: a manager goes to Gestores', async () => {
    openAccount(BRUNO.id)

    await drawerOf('Bruno Lima')
    await waitFor(() =>
      expect(currentPath()).toBe(`/dashboard/gestores/${BRUNO.id}`)
    )
    expect(document.title).toContain('Bruno Lima · Gestores')
  })

  it('keeps the save message and the cases warning when a role change moves the account', async () => {
    fakeUsersApi(stubApi(), {
      users: [ANA, BRUNO, CARLA],
      servedAreas: [VARGINHA],
      complaintsOutOfReach: 2,
    })
    renderDrawer(`/dashboard/equipe/${ANA.id}`)
    const drawer = await drawerOf('Ana Souza')

    await userEvent.click(
      within(drawer).getByRole('radio', { name: /Gestão de saúde/ })
    )
    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Salvar alterações' })
    )

    await waitFor(() =>
      expect(currentPath()).toBe(`/dashboard/gestores/${ANA.id}`)
    )
    const statuses = screen.getAllByRole('status').map(s => s.textContent)
    expect(statuses).toContain('As alterações de Ana Souza foram salvas.')
    expect(statuses.join(' ')).toMatch(/2 casos em andamento continuam/)
  })

  it('stays in the folder when the account belongs to it', async () => {
    openAccount(BRUNO.id, '/dashboard/gestores')

    await drawerOf('Bruno Lima')
    expect(currentPath()).toBe(`/dashboard/gestores/${BRUNO.id}`)
  })

  it('marks the signed-in account and locks its role', async () => {
    openAccount(CARLA.id)

    const drawer = await screen.findByRole('dialog', { name: /Carla Dias/ })
    expect(within(drawer).getByRole('heading', { level: 2 })).toHaveTextContent(
      'Carla Dias(você)'
    )
    expect(within(drawer).queryByRole('radio')).not.toBeInTheDocument()
  })

  it('says when the account does not exist', async () => {
    openAccount('usr_nobody')

    const drawer = await drawerOf('Conta não encontrada')
    expect(
      within(drawer).getByText(/Esta conta não existe/)
    ).toBeInTheDocument()
  })

  describe('closing, when opened from a link', () => {
    it('goes to the folder list with the ×', async () => {
      openAccount(ANA.id)
      const drawer = await drawerOf('Ana Souza')

      await userEvent.click(
        within(drawer).getByRole('button', { name: 'Fechar' })
      )

      expect(currentPath()).toBe('/dashboard/equipe')
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('goes to the folder list with Escape', async () => {
      openAccount(ANA.id)
      const drawer = await drawerOf('Ana Souza')

      // jsdom has no real modal: Escape reaches a dialog as its `cancel` event.
      const escape = new Event('cancel', { cancelable: true })
      fireEvent(drawer, escape)

      expect(escape.defaultPrevented).toBe(true)
      await waitFor(() => expect(currentPath()).toBe('/dashboard/equipe'))
    })

    it('goes to the folder list with Cancelar, saving nothing', async () => {
      const api = openAccount(ANA.id)
      const drawer = await drawerOf('Ana Souza')

      await userEvent.click(
        within(drawer).getByRole('button', { name: 'Cancelar' })
      )

      expect(currentPath()).toBe('/dashboard/equipe')
      expect(api.changes).toEqual([])
    })
  })

  it('shows in Acesso what the person did, naming accounts and cities, the removed ones too', async () => {
    fakeUsersApi(stubApi(), {
      users: [ANA, BRUNO, CARLA],
      servedAreas: [VARGINHA, LAVRAS_REMOVED],
      staffActions: [
        buildStaffAction({
          actorId: CARLA.id,
          action: 'POST /api/users/:id/deactivate',
          targetId: BRUNO.id,
        }),
        buildStaffAction({
          actorId: CARLA.id,
          action: 'POST /api/service-areas/remove',
          targetId: LAVRAS_REMOVED.id,
        }),
        buildStaffAction({
          actorId: ANA.id,
          action: 'POST /api/auth/sign-out',
          targetId: undefined,
        }),
      ],
    })
    renderDrawer(`/dashboard/equipe/${CARLA.id}`)
    const drawer = await drawerOf('Carla Dias (você)')
    await userEvent.click(within(drawer).getByRole('tab', { name: 'Acesso' }))

    const history = within(drawer).getByRole('region', {
      name: 'Histórico de ações',
    })
    expect(
      await within(history).findByText('Desativou a conta de Bruno Lima')
    ).toBeInTheDocument()
    expect(
      within(history).getByText('Removeu Lavras/MG das cidades atendidas')
    ).toBeInTheDocument()
    expect(
      within(history).queryByText('Saiu do painel')
    ).not.toBeInTheDocument()
  })

  it('offers a retry when the account fails to load, and moves focus to it once it loads', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValueOnce(apiErrorResponse(500))
    fetchMock.mockImplementation(async input => {
      const { pathname } = new URL(String(input))
      if (pathname === '/api/users') return jsonResponse([ANA, CARLA])
      if (pathname === '/api/staff-actions')
        return jsonResponse({ actions: [] })
      return jsonResponse({ serviceAreas: [VARGINHA] })
    })
    renderDrawer(`/dashboard/equipe/${ANA.id}`)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Não foi possível carregar a conta agora.')
    const retry = within(alert).getByRole('button', { name: 'Tentar de novo' })
    retry.focus()
    await userEvent.click(retry)

    const tabs = await screen.findByRole('tablist')
    await waitFor(() => expect(tabs.closest('[tabindex="-1"]')).toHaveFocus())
  })
})
