import { buildSession, buildSessionUser } from '@/test/fixtures/session'
import { jsonResponse, routeApi, stubApi } from '@/test/mockFetch'
import { renderWithRouter } from '@/test/renderWithRouter'

import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AuthPage } from '../AuthPage'

const ROUTES = [
  { path: '/dashboard/entrar', element: <AuthPage mode='login' /> },
  {
    path: '/dashboard/trocar-senha',
    element: <AuthPage mode='changePassword' />,
  },
]

const location = () => screen.getAllByTestId('location').at(-1)?.textContent

// jsdom has no CSS: both the desktop band and the mobile copy of the switch are in the DOM.
const clickSwitch = async (name: string) =>
  userEvent.click(screen.getAllByRole('button', { name })[0])

const signIn = async () => {
  await userEvent.type(screen.getByLabelText('E-mail'), 'ana@faladoria.org')
  await userEvent.type(
    screen.getByLabelText('Senha', { exact: true }),
    'segredo'
  )
  const form = screen.getByLabelText('E-mail').closest('form') as HTMLElement
  await userEvent.click(within(form).getByRole('button', { name: 'Entrar' }))
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('AuthPage', () => {
  it('keeps the panel pages out of search engines', async () => {
    routeApi(stubApi(), { '/api/auth/get-session': () => jsonResponse(null) })

    renderWithRouter(ROUTES, '/dashboard/entrar')

    await waitFor(() =>
      expect(
        document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content
      ).toBe('noindex, nofollow')
    )
  })

  it('switches to the password change with its own address and moves focus to the new form', async () => {
    routeApi(stubApi(), { '/api/auth/get-session': () => jsonResponse(null) })
    renderWithRouter(ROUTES, '/dashboard/entrar')

    await clickSwitch('Trocar a senha')

    expect(location()).toBe('/dashboard/trocar-senha')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Trocar a senha' })
    ).toHaveFocus()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
  })

  it('switches back to the login and focuses its heading', async () => {
    routeApi(stubApi(), { '/api/auth/get-session': () => jsonResponse(null) })
    renderWithRouter(ROUTES, '/dashboard/trocar-senha')

    await clickSwitch('Entrar')

    expect(location()).toBe('/dashboard/entrar')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Entrar no painel' })
    ).toHaveFocus()
  })

  it('does not move focus when the page simply opens', () => {
    routeApi(stubApi(), { '/api/auth/get-session': () => jsonResponse(null) })

    renderWithRouter(ROUTES, '/dashboard/entrar')

    expect(document.body).toHaveFocus()
  })

  it('sends a temporary password straight to the mandatory change', async () => {
    let isSignedIn = false
    const user = buildSessionUser({ mustChangePassword: true })
    routeApi(stubApi(), {
      '/api/auth/sign-in/email': () => {
        isSignedIn = true
        return jsonResponse({ user })
      },
      '/api/auth/get-session': () =>
        jsonResponse(
          isSignedIn ? buildSession({ mustChangePassword: true }) : null
        ),
    })
    renderWithRouter(ROUTES, '/dashboard/entrar')

    await signIn()

    await waitFor(() => expect(location()).toBe('/dashboard/trocar-senha'))
    expect(
      await screen.findByRole('heading', { name: 'Crie a sua senha' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Senha temporária')).toBeInTheDocument()
    expect(screen.queryByLabelText('E-mail')).not.toBeInTheDocument()
  })

  it('takes a person with their own password to the panel', async () => {
    let isSignedIn = false
    routeApi(stubApi(), {
      '/api/auth/sign-in/email': () => {
        isSignedIn = true
        return jsonResponse({ user: buildSessionUser() })
      },
      '/api/auth/get-session': () =>
        jsonResponse(isSignedIn ? buildSession() : null),
    })
    renderWithRouter(ROUTES, '/dashboard/entrar')

    await signIn()

    await waitFor(() => expect(location()).toBe('/dashboard'))
  })

  it('in the mandatory change, offers "Sair" instead of "Entrar", and signing out returns to the login', async () => {
    let isSignedIn = true
    routeApi(stubApi(), {
      '/api/auth/get-session': () =>
        jsonResponse(
          isSignedIn ? buildSession({ mustChangePassword: true }) : null
        ),
      '/api/auth/sign-out': () => {
        isSignedIn = false
        return jsonResponse({ success: true })
      },
    })
    renderWithRouter(ROUTES, '/dashboard/trocar-senha')

    await screen.findByRole('heading', { name: 'Crie a sua senha' })
    expect(
      screen.queryByRole('button', { name: 'Entrar' })
    ).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Sair' }))

    await waitFor(() => expect(location()).toBe('/dashboard/entrar'))
  })

  it('after the mandatory change, takes the person into the panel', async () => {
    let mustChange = true
    routeApi(stubApi(), {
      '/api/auth/get-session': () =>
        jsonResponse(buildSession({ mustChangePassword: mustChange })),
      '/api/auth/change-password': () => {
        mustChange = false
        return jsonResponse({ user: buildSessionUser() })
      },
    })
    renderWithRouter(ROUTES, '/dashboard/trocar-senha')
    await screen.findByRole('heading', { name: 'Crie a sua senha' })

    await userEvent.type(
      screen.getByLabelText('Senha temporária'),
      'Xk3temporaria'
    )
    await userEvent.type(
      screen.getByLabelText('Nova senha'),
      'minha-senha-nova'
    )
    await userEvent.type(
      screen.getByLabelText('Confirme a nova senha'),
      'minha-senha-nova'
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Salvar e continuar' })
    )

    await waitFor(() => expect(location()).toBe('/dashboard'))
  })

  it('sends someone already signed in away from the login, to the panel', async () => {
    routeApi(stubApi(), {
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })

    renderWithRouter(ROUTES, '/dashboard/entrar')

    await waitFor(() => expect(location()).toBe('/dashboard'))
  })

  it('keeps a voluntary password change open for someone signed in', async () => {
    routeApi(stubApi(), {
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })

    renderWithRouter(ROUTES, '/dashboard/trocar-senha')

    expect(
      await screen.findByRole('heading', { name: 'Trocar a senha' })
    ).toBeInTheDocument()
    expect(location()).toBe('/dashboard/trocar-senha')
  })

  it('after signing in, returns to the panel page the guard had saved', async () => {
    let isSignedIn = false
    routeApi(stubApi(), {
      '/api/auth/sign-in/email': () => {
        isSignedIn = true
        return jsonResponse({ user: buildSessionUser() })
      },
      '/api/auth/get-session': () =>
        jsonResponse(isSignedIn ? buildSession() : null),
    })
    renderWithRouter(ROUTES, {
      pathname: '/dashboard/entrar',
      state: { from: '/dashboard/reclamacoes?status=open' },
    })

    await signIn()

    await waitFor(() => expect(location()).toBe('/dashboard/reclamacoes'))
  })
})
