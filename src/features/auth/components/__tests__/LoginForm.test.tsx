import { buildSessionUser } from '@/test/fixtures/session'
import {
  apiErrorResponse,
  calledPaths,
  jsonResponse,
  routeApi,
  stubApi,
} from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from '../LoginForm'

const fillAndSubmit = async (email: string, password: string) => {
  if (email) await userEvent.type(screen.getByLabelText('E-mail'), email)
  if (password)
    await userEvent.type(
      screen.getByLabelText('Senha', { exact: true }),
      password
    )
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('LoginForm', () => {
  it('checks the fields in the browser, without calling the API, and focuses the first error', async () => {
    const fetchMock = stubApi()
    renderWithQueryClient(<LoginForm />)

    await fillAndSubmit('', '')

    expect(screen.getByText('Informe o e-mail.')).toBeInTheDocument()
    expect(screen.getByText('Informe a senha.')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toHaveFocus()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('signs in with what was typed, trimmed, and refreshes the session', async () => {
    const fetchMock = stubApi()
    routeApi(fetchMock, {
      '/api/auth/sign-in/email': () =>
        jsonResponse({ user: buildSessionUser() }),
      '/api/auth/get-session': () => jsonResponse(null),
    })
    renderWithQueryClient(<LoginForm />)

    await fillAndSubmit(' ana@faladoria.org ', 'Xk3temporaria')

    await vi.waitFor(() =>
      expect(calledPaths(fetchMock)).toContain('/api/auth/sign-in/email')
    )
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      email: 'ana@faladoria.org',
      password: 'Xk3temporaria',
    })
  })

  it('announces wrong credentials in Portuguese, from the API code', async () => {
    const fetchMock = stubApi()
    routeApi(fetchMock, {
      '/api/auth/sign-in/email': () =>
        apiErrorResponse(401, 'INVALID_CREDENTIALS'),
    })
    renderWithQueryClient(<LoginForm />)

    await fillAndSubmit('ana@faladoria.org', 'errada')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'E-mail ou senha incorretos.'
    )
    expect(calledPaths(fetchMock)).toEqual(['/api/auth/sign-in/email'])
  })
})
