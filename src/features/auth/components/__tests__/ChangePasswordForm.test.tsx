import { buildSession, buildSessionUser } from '@/test/fixtures/session'
import {
  apiErrorResponse,
  jsonResponse,
  routeApi,
  stubApi,
} from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ChangePasswordForm } from '../ChangePasswordForm'

const user = buildSessionUser()

const fill = async (fields: Record<string, string>) => {
  for (const [label, value] of Object.entries(fields)) {
    await userEvent.type(screen.getByLabelText(label, { exact: true }), value)
  }
  await userEvent.click(
    screen.getByRole('button', { name: 'Salvar e continuar' })
  )
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('ChangePasswordForm', () => {
  it('asks for the e-mail only when there is no session', () => {
    stubApi()
    const { rerender } = renderWithQueryClient(
      <ChangePasswordForm requireEmail isForced={false} onChanged={vi.fn()} />
    )
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()

    rerender(
      <ChangePasswordForm requireEmail={false} isForced onChanged={vi.fn()} />
    )
    expect(screen.queryByLabelText('E-mail')).not.toBeInTheDocument()
  })

  it('calls the current password "temporária" in the mandatory first change', () => {
    stubApi()
    renderWithQueryClient(
      <ChangePasswordForm requireEmail={false} isForced onChanged={vi.fn()} />
    )

    expect(screen.getByLabelText('Senha temporária')).toBeInTheDocument()
  })

  it('shows the size rule as a hint before anything goes wrong', () => {
    stubApi()
    renderWithQueryClient(
      <ChangePasswordForm
        requireEmail={false}
        isForced={false}
        onChanged={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Nova senha')).toHaveAccessibleDescription(
      'De 8 a 128 caracteres.'
    )
  })

  it('changes the password and tells the page', async () => {
    routeApi(stubApi(), {
      '/api/auth/change-password': () => jsonResponse({ user }),
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })
    const onChanged = vi.fn()
    renderWithQueryClient(
      <ChangePasswordForm requireEmail={false} isForced onChanged={onChanged} />
    )

    await fill({
      'Senha temporária': 'Xk3temporaria',
      'Nova senha': 'minha-senha-nova',
      'Confirme a nova senha': 'minha-senha-nova',
    })

    await vi.waitFor(() => expect(onChanged).toHaveBeenCalled())
  })

  it('puts a wrong current password on its own field, focused, and not in the alert', async () => {
    routeApi(stubApi(), {
      '/api/auth/change-password': () =>
        apiErrorResponse(400, 'CURRENT_PASSWORD_INCORRECT'),
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })
    renderWithQueryClient(
      <ChangePasswordForm
        requireEmail={false}
        isForced={false}
        onChanged={vi.fn()}
      />
    )

    await fill({
      'Senha atual': 'errada',
      'Nova senha': 'minha-senha-nova',
      'Confirme a nova senha': 'minha-senha-nova',
    })

    const current = screen.getByLabelText('Senha atual')
    await vi.waitFor(() =>
      expect(current).toHaveAccessibleDescription('A senha atual não confere.')
    )
    expect(current).toHaveFocus()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows other API errors in the form alert', async () => {
    routeApi(stubApi(), {
      '/api/auth/sign-in/email': () =>
        apiErrorResponse(403, 'TEMPORARY_PASSWORD_EXPIRED'),
      '/api/auth/get-session': () => jsonResponse(null),
    })
    renderWithQueryClient(
      <ChangePasswordForm requireEmail isForced={false} onChanged={vi.fn()} />
    )

    await fill({
      'E-mail': 'ana@faladoria.org',
      'Senha atual': 'Xk3temporaria',
      'Nova senha': 'minha-senha-nova',
      'Confirme a nova senha': 'minha-senha-nova',
    })

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'A sua senha temporária venceu. Peça uma nova à administradora.'
    )
  })
})
