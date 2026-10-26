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
    renderWithQueryClient(<LoginForm onSignedIn={vi.fn()} />)

    await fillAndSubmit('', '')

    expect(screen.getByText('Informe o e-mail.')).toBeInTheDocument()
    expect(screen.getByText('Informe a senha.')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toHaveFocus()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('hands the signed-in person to the page', async () => {
    const user = buildSessionUser({ mustChangePassword: true })
    routeApi(stubApi(), {
      '/api/auth/sign-in/email': () => jsonResponse({ user }),
      '/api/auth/get-session': () => jsonResponse(null),
    })
    const onSignedIn = vi.fn()
    renderWithQueryClient(<LoginForm onSignedIn={onSignedIn} />)

    await fillAndSubmit('ana@faladoria.org', 'Xk3temporaria')

    await vi.waitFor(() => expect(onSignedIn).toHaveBeenCalledWith(user))
  })

  it('announces wrong credentials in Portuguese, from the API code', async () => {
    const fetchMock = stubApi()
    routeApi(fetchMock, {
      '/api/auth/sign-in/email': () =>
        apiErrorResponse(401, 'INVALID_CREDENTIALS'),
    })
    const onSignedIn = vi.fn()
    renderWithQueryClient(<LoginForm onSignedIn={onSignedIn} />)

    await fillAndSubmit('ana@faladoria.org', 'errada')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'E-mail ou senha incorretos.'
    )
    expect(onSignedIn).not.toHaveBeenCalled()
    expect(calledPaths(fetchMock)).toEqual(['/api/auth/sign-in/email'])
  })
})
