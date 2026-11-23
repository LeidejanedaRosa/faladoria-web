import { fakeUsersApi } from '@/test/fakeUsersApi'
import { VARGINHA } from '@/test/fixtures/serviceAreas'
import { buildSessionUser } from '@/test/fixtures/session'
import { ANA, CARLA, TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  MemoryRouter,
  type NavigateFunction,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { type AccountGroup, GROUP_ROUTES } from '../../data/accountGroups'
import { AccountDrawerPage } from '../AccountDrawerPage'
import { NewAccountDrawerPage } from '../NewAccountDrawerPage'
import { TeamPage } from '../TeamPage'

const SELF = buildSessionUser({
  id: CARLA.id,
  name: CARLA.name,
  email: CARLA.email,
  role: 'admin',
  assignedCities: [],
})

let navigate: NavigateFunction

const CurrentPath = () => {
  navigate = useNavigate()
  const { pathname, search } = useLocation()
  return <p data-testid='path'>{pathname + search}</p>
}

type FakeOptions = Parameters<typeof fakeUsersApi>[1]

// As in App: the panel hands the signed-in person down; each folder has its drawers as children.
const renderFolder = (
  group: AccountGroup = 'team',
  options: FakeOptions = {},
  address = GROUP_ROUTES[group]
) => {
  const api = fakeUsersApi(stubApi(), {
    users: [ANA, CARLA],
    servedAreas: [VARGINHA],
    ...options,
  })
  render(
    // The panel home before the folder: stepping back twice would show it.
    <MemoryRouter initialEntries={['/dashboard', address]}>
      <CurrentPath />
      <Routes>
        <Route element={<Outlet context={{ user: SELF }} />}>
          {(['team', 'managers'] as const).map(folder => (
            <Route
              key={folder}
              path={GROUP_ROUTES[folder]}
              element={<TeamPage group={folder} />}
            >
              <Route path='nova' element={<NewAccountDrawerPage />} />
              <Route path=':userId' element={<AccountDrawerPage />} />
            </Route>
          ))}
        </Route>
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
  return api
}

const newAccountLink = () => screen.getByRole('link', { name: 'Nova conta' })
const currentPath = () => screen.getByTestId('path').textContent
const announcement = () =>
  screen
    .getAllByRole('status')
    .find(element => element.tagName === 'P' && !element.closest('dialog'))!

// In the managers folder: the role comes with the folder.
const createBruno = async () => {
  await userEvent.click(newAccountLink())
  const drawer = await screen.findByRole('dialog', { name: 'Nova conta' })
  await userEvent.type(
    within(drawer).getByRole('textbox', { name: 'Nome' }),
    'Bruno Lima'
  )
  await userEvent.type(
    within(drawer).getByRole('textbox', { name: /^E-mail/ }),
    'bruno@saude.varginha.mg.gov.br'
  )
  const search = within(drawer).getByRole('combobox', {
    name: 'Buscar cidade atendida',
  })
  await waitFor(() => expect(search).toBeEnabled())
  await userEvent.type(search, 'varg')
  await userEvent.click(screen.getByRole('option', { name: 'Varginha/MG' }))
  await userEvent.click(
    within(drawer).getByRole('button', { name: 'Criar conta' })
  )
}

/** In the team folder: fills a new account and sends it, holding the answer until `answer()`. */
const startHeldTeamCreation = async () => {
  let answer = () => {}
  const api = renderFolder('team', {
    holdCreate: new Promise<void>(resolve => {
      answer = resolve
    }),
  })
  await userEvent.click(newAccountLink())
  const drawer = await screen.findByRole('dialog', { name: 'Nova conta' })
  await userEvent.type(
    within(drawer).getByRole('textbox', { name: 'Nome' }),
    'Bia Rocha'
  )
  await userEvent.type(
    within(drawer).getByRole('textbox', { name: /^E-mail/ }),
    'bia@faladoria.org'
  )
  await userEvent.click(
    within(drawer).getByRole('radio', { name: /Assistente/ })
  )
  const search = within(drawer).getByRole('combobox', {
    name: 'Buscar cidade atendida',
  })
  await waitFor(() => expect(search).toBeEnabled())
  await userEvent.type(search, 'varg')
  await userEvent.click(screen.getByRole('option', { name: 'Varginha/MG' }))
  await userEvent.click(
    within(drawer).getByRole('button', { name: 'Criar conta' })
  )

  // The request is on its way before the address moves: that is the case in question.
  await waitFor(() => expect(api.sent).toHaveLength(1))
  return answer
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('TeamPage', () => {
  it('lists the accounts under a single h1, with no drawer open', async () => {
    renderFolder()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Equipe'
    )
    expect(await screen.findByText('Ana Souza')).toBeInTheDocument()
    expect(document.title).toContain('Equipe')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('titles the managers folder and explains who is in it', async () => {
    renderFolder('managers')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Gestores'
    )
    expect(
      screen.getByText(/As contas dos gestores de saúde/)
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Nenhum gestor cadastrado ainda.')
    ).toBeInTheDocument()
    expect(document.title).toContain('Gestores')
  })

  it('leads "Nova conta" to its own address in the folder', () => {
    renderFolder('managers')

    expect(newAccountLink()).toHaveAttribute('href', '/dashboard/gestores/nova')
  })

  it('opens the new account in a drawer over the list, starting on the name', async () => {
    renderFolder()

    await userEvent.click(newAccountLink())

    const drawer = await screen.findByRole('dialog', { name: 'Nova conta' })
    expect(currentPath()).toBe('/dashboard/equipe/nova')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Equipe'
    )
    expect(within(drawer).getByRole('textbox', { name: 'Nome' })).toHaveFocus()
  })

  it('titles the tab and keeps it out of search when the new account drawer opens straight from its address', async () => {
    document.title = ''
    document.querySelector('meta[name="robots"]')?.remove()

    renderFolder('managers', {}, '/dashboard/gestores/nova')

    await screen.findByRole('dialog', { name: 'Nova conta' })
    expect(document.title).toContain('Nova conta · Gestores')
    expect(
      document.querySelector('meta[name="robots"]')?.getAttribute('content')
    ).toBe('noindex, nofollow')
  })

  it('goes back to the list on "Cancelar" and gives focus back to "Nova conta"', async () => {
    const api = renderFolder()
    await userEvent.click(newAccountLink())
    const drawer = await screen.findByRole('dialog', { name: 'Nova conta' })

    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Cancelar' })
    )

    await waitFor(() => expect(currentPath()).toBe('/dashboard/equipe'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(newAccountLink()).toHaveFocus()
    expect(api.sent).toEqual([])
  })

  // Bruno is a manager: he is listed in the managers folder, where the test runs.
  it('creates an account, closes the drawer, shows the password once, then lists the account', async () => {
    const api = renderFolder('managers')
    await screen.findByText('Nenhum gestor cadastrado ainda.')

    await createBruno()

    const dialog = await screen.findByRole('dialog', { name: 'Conta criada' })
    expect(within(dialog).getByText(TEMPORARY_PASSWORD)).toBeInTheDocument()
    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Nova conta' })
      ).not.toBeInTheDocument()
    )
    expect(currentPath()).toBe('/dashboard/gestores')
    expect(api.sent[0]).toMatchObject({ role: 'manager' })

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Já anotei a senha' })
    )

    expect(announcement()).toHaveTextContent(
      'A conta de Bruno Lima foi criada.'
    )
    expect(screen.queryByText(TEMPORARY_PASSWORD)).not.toBeInTheDocument()
    expect(newAccountLink()).toHaveFocus()
    const bruno = (await screen.findByText('Bruno Lima')).closest('li')!
    expect(
      within(bruno).getByText('Aguardando primeiro acesso')
    ).toBeInTheDocument()
  })

  it('puts the folder title back on the tab once an account drawer closes', async () => {
    renderFolder()
    await userEvent.click(
      await screen.findByRole('link', { name: 'Editar a conta de Ana Souza' })
    )
    const drawer = await screen.findByRole('dialog', { name: 'Ana Souza' })
    expect(document.title).toContain('Ana Souza · Equipe')

    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Fechar' })
    )

    await waitFor(() => expect(document.title).not.toContain('Ana Souza'))
    expect(document.title).toContain('Equipe')
  })

  it('still shows the password when the drawer is closed while the account is being created, and stays on the list', async () => {
    let answer = () => {}
    renderFolder('managers', {
      holdCreate: new Promise<void>(resolve => {
        answer = resolve
      }),
    })
    await screen.findByText('Nenhum gestor cadastrado ainda.')
    await createBruno()
    const drawer = screen.getByRole('dialog', { name: 'Nova conta' })

    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Fechar' })
    )
    await waitFor(() => expect(currentPath()).toBe('/dashboard/gestores'))
    act(() => answer())

    const dialog = await screen.findByRole('dialog', { name: 'Conta criada' })
    expect(within(dialog).getByText(TEMPORARY_PASSWORD)).toBeInTheDocument()
    expect(currentPath()).toBe('/dashboard/gestores')
  })

  it('starts a fresh form with the new folder’s role when the address moves to another folder', async () => {
    const api = renderFolder()
    await userEvent.click(newAccountLink())
    await screen.findByRole('dialog', { name: 'Nova conta' })

    act(() => void navigate('/dashboard/gestores/nova'))

    const drawer = await screen.findByRole('dialog', { name: 'Nova conta' })
    await waitFor(() =>
      expect(within(drawer).queryByRole('radio')).not.toBeInTheDocument()
    )
    await userEvent.type(
      within(drawer).getByRole('textbox', { name: 'Nome' }),
      'Bia Rocha'
    )
    await userEvent.type(
      within(drawer).getByRole('textbox', { name: /^E-mail/ }),
      'bia@saude.varginha.mg.gov.br'
    )
    const search = within(drawer).getByRole('combobox', {
      name: 'Buscar cidade atendida',
    })
    await waitFor(() => expect(search).toBeEnabled())
    await userEvent.type(search, 'varg')
    await userEvent.click(screen.getByRole('option', { name: 'Varginha/MG' }))
    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Criar conta' })
    )

    await waitFor(() => expect(api.sent[0]).toMatchObject({ role: 'manager' }))
  })

  it('brings back the same filtered list when an account drawer closes', async () => {
    renderFolder('team', {}, '/dashboard/equipe?busca=ana')
    await userEvent.click(
      await screen.findByRole('link', { name: 'Editar a conta de Ana Souza' })
    )
    const drawer = await screen.findByRole('dialog', { name: 'Ana Souza' })
    expect(currentPath()).toBe('/dashboard/equipe/usr_ana?busca=ana')

    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Fechar' })
    )

    await waitFor(() =>
      expect(currentPath()).toBe('/dashboard/equipe?busca=ana')
    )
    expect(
      screen.getByRole('searchbox', { name: 'Buscar por nome ou e-mail' })
    ).toHaveValue('ana')
    expect(screen.queryByText('Carla Dias')).not.toBeInTheDocument()
  })

  it('keeps the filters on the way to a new account', () => {
    renderFolder('managers', {}, '/dashboard/gestores?estado=MG')

    expect(newAccountLink()).toHaveAttribute(
      'href',
      '/dashboard/gestores/nova?estado=MG'
    )
  })

  it('follows the address when it changes with the list on screen', async () => {
    renderFolder('team', {}, '/dashboard/equipe?busca=ana')
    const search = await screen.findByRole('searchbox', {
      name: 'Buscar por nome ou e-mail',
    })
    expect(screen.queryByText('Carla Dias')).not.toBeInTheDocument()

    act(() => void navigate('/dashboard/equipe?busca=carla'))

    await waitFor(() => expect(search).toHaveValue('carla'))
    expect(screen.getByText('Carla Dias')).toBeInTheDocument()
    expect(screen.queryByText('Ana Souza')).not.toBeInTheDocument()

    act(() => void navigate('/dashboard/equipe'))

    await waitFor(() => expect(search).toHaveValue(''))
    expect(screen.getByText('Ana Souza')).toBeInTheDocument()
    expect(screen.getByText('Carla Dias')).toBeInTheDocument()
  })

  // The folder routes share one TeamRoute instance, so the drawer stays mounted: the creation that
  // ends must not close the drawer the admin opened in the other folder.
  it('leaves the other folder’s drawer open when a creation started in the first one ends', async () => {
    const answer = await startHeldTeamCreation()

    act(() => void navigate('/dashboard/gestores/nova'))
    await screen.findByRole('heading', { level: 1, name: 'Gestores' })
    act(() => answer())

    // Wait for the creation to end (its password shows up), then for any navigation it queued.
    await screen.findByRole('dialog', { name: 'Conta criada' })
    await act(async () => {})
    expect(currentPath()).toBe('/dashboard/gestores/nova')
    expect(
      screen.getByRole('dialog', { name: 'Nova conta' })
    ).toBeInTheDocument()
  })

  it('leaves a drawer reopened in the same folder after a round trip open', async () => {
    const answer = await startHeldTeamCreation()

    act(() => void navigate('/dashboard/gestores/nova'))
    await screen.findByRole('heading', { level: 1, name: 'Gestores' })
    act(() => void navigate('/dashboard/equipe/nova'))
    await screen.findByRole('heading', { level: 1, name: 'Equipe' })
    act(() => answer())

    await screen.findByRole('dialog', { name: 'Conta criada' })
    await act(async () => {})
    expect(currentPath()).toBe('/dashboard/equipe/nova')
    expect(
      screen.getByRole('dialog', { name: 'Nova conta' })
    ).toBeInTheDocument()
  })
})
