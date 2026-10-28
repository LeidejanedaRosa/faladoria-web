import { ApiError } from '@shared/lib/api'
import { describe, expect, it } from 'vitest'

import { serviceAreaErrorMessage } from '../serviceAreaErrorMessage'

const apiError = (code: string, message = 'Mensagem da API.') =>
  new ApiError({ status: 409, code, message })

describe('serviceAreaErrorMessage', () => {
  it('has nothing to say without an error', () => {
    expect(serviceAreaErrorMessage(null)).toBeUndefined()
  })

  it('explains a change made by someone else at the same time', () => {
    expect(
      serviceAreaErrorMessage(apiError('SERVICE_AREA_CONCURRENT_CHANGE'))
    ).toMatch(/Outra pessoa alterou esta cidade/)
  })

  it('says the city is already on the list', () => {
    expect(
      serviceAreaErrorMessage(apiError('SERVICE_AREA_ALREADY_EXISTS'))
    ).toBe('Esta cidade já está na lista.')
  })

  it('keeps the API text for a code it does not know', () => {
    expect(
      serviceAreaErrorMessage(apiError('SOMETHING_NEW', 'Texto novo.'))
    ).toBe('Texto novo.')
  })

  it('gives a generic message for an error that is not from the API', () => {
    expect(serviceAreaErrorMessage(new Error('boom'))).toBe(
      'Não foi possível concluir agora. Tente de novo em instantes.'
    )
  })
})
