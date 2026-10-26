import { ApiError, NETWORK_ERROR_CODE } from '@shared/lib/api'
import { describe, expect, it } from 'vitest'

import { authErrorMessage } from '../authErrorMessage'

const apiError = (
  code: string,
  extra: Partial<ConstructorParameters<typeof ApiError>[0]> = {}
) => new ApiError({ status: 400, code, message: 'Texto da API.', ...extra })

describe('authErrorMessage', () => {
  it('returns nothing when there is no error', () => {
    expect(authErrorMessage(null)).toBeUndefined()
  })

  it.each([
    ['INVALID_CREDENTIALS', 'E-mail ou senha incorretos.'],
    [
      'TEMPORARY_PASSWORD_EXPIRED',
      'A sua senha temporária venceu. Peça uma nova à administradora.',
    ],
    [
      'ACCOUNT_DEACTIVATED',
      'Esta conta foi desativada. Fale com a administradora da Faladoria.',
    ],
    ['CURRENT_PASSWORD_INCORRECT', 'A senha atual não confere.'],
  ])('decides %s by the stable code, not by the API text', (code, text) => {
    expect(authErrorMessage(apiError(code))).toBe(text)
  })

  it('tells how long to wait when the API sends Retry-After', () => {
    expect(
      authErrorMessage(apiError('RATE_LIMITED', { retryAfterSeconds: 8 }))
    ).toBe('Muitas tentativas seguidas. Aguarde 8 segundos e tente de novo.')
  })

  it('still asks to wait when the browser cannot read Retry-After', () => {
    expect(authErrorMessage(apiError('RATE_LIMITED'))).toBe(
      'Muitas tentativas seguidas. Aguarde alguns segundos.'
    )
  })

  it('keeps the API message for a code it does not know', () => {
    expect(
      authErrorMessage(
        apiError(NETWORK_ERROR_CODE, { message: 'Verifique sua conexão.' })
      )
    ).toBe('Verifique sua conexão.')
  })

  it('gives a generic message for an error that is not from the API', () => {
    expect(authErrorMessage(new Error('VITE_API_URL is not set'))).toBe(
      'Não foi possível concluir agora. Tente de novo em instantes.'
    )
  })
})
