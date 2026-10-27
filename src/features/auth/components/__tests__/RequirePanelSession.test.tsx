import { buildSession } from '@/test/fixtures/session'
import {
  apiErrorResponse,
  deferredResponse,
  jsonResponse,
  routeApi,
  stubApi,
} from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { RequirePanelSession } from '../RequirePanelSession'

const LoginProbe = () => {
  const { state } = useLocation()
  return <p>login, voltar para {(state as { from?: string } | null)?.from}</p>
}

const renderGuard = (initialPath = '/dashboard/reclamacoes?status=open') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path='/dashboard/*'
          element={
            <RequirePanelSession
              render={user => <p>painel de {user.name}</p>}
            />
          }
        />
        <Route path='/dashboard/entrar' element={<LoginProbe />} />
        <Route path='/dashboard/trocar-senha' element={<p>troca de senha</p>} />
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('RequirePanelSession', () => {
  it('announces that it is checking the access while the session is read', () => {
    routeApi(stubApi(), {
      '/api/auth/get-session': () => new Promise(() => {}),
    })

    renderGuard()

    expect(screen.getByRole('status')).toHaveTextContent('Carregando o painel…')
  })

  it('sends a visitor without session to the login, remembering the page and its filters', async () => {
    routeApi(stubApi(), { '/api/auth/get-session': () => jsonResponse(null) })

    renderGuard()

    expect(
      await screen.findByText(
        'login, voltar para /dashboard/reclamacoes?status=open'
      )
    ).toBeInTheDocument()
  })

  it('sends a temporary password to the mandatory change', async () => {
    routeApi(stubApi(), {
      '/api/auth/get-session': () =>
        jsonResponse(buildSession({ mustChangePassword: true })),
    })

    renderGuard()

    expect(await screen.findByText('troca de senha')).toBeInTheDocument()
  })

  it('renders the panel for the signed-in person', async () => {
    routeApi(stubApi(), {
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })

    renderGuard()

    expect(await screen.findByText('painel de Ana Souza')).toBeInTheDocument()
  })

  it('keeps the retry button focused while it checks again, and lets the person in when it works', async () => {
    const slowRetry = deferredResponse()
    const fetchMock = stubApi()
    fetchMock
      .mockResolvedValueOnce(apiErrorResponse(503))
      .mockReturnValueOnce(slowRetry.promise)
    renderGuard()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível verificar o seu acesso agora.'
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Tentar de novo' })
    )

    expect(
      screen.getByRole('button', { name: 'Tentando de novo…' })
    ).toHaveFocus()

    slowRetry.release(jsonResponse(buildSession()))
    await waitFor(() =>
      expect(screen.getByText('painel de Ana Souza')).toBeInTheDocument()
    )
  })
})
