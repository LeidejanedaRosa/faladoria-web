import { ApiError } from '@shared/lib/api'
import { describe, expect, it } from 'vitest'

import { userErrorMessage } from '../userErrorMessage'

const apiError = (
  code: string,
  details?: unknown,
  message = 'Mensagem da API.'
) => new ApiError({ status: 409, code, message, details })

describe('userErrorMessage', () => {
  it('has nothing to say without an error', () => {
    expect(userErrorMessage(null)).toBeUndefined()
  })

  it('says the e-mail already has an account', () => {
    expect(userErrorMessage(apiError('USER_EMAIL_ALREADY_EXISTS'))).toBe(
      'Já existe uma conta com este e-mail.'
    )
  })

  it('names the cities that stopped being served meanwhile', () => {
    const error = apiError('ASSIGNED_CITY_NOT_SERVED', {
      cities: [
        { city: 'Lavras', state: 'MG' },
        { city: 'Três Corações', state: 'MG' },
      ],
    })

    expect(userErrorMessage(error)).toBe(
      'Estas cidades deixaram de ser atendidas: Lavras/MG, Três Corações/MG. Tire da lista e tente de novo.'
    )
  })

  it('still explains the city error when the API sends no list', () => {
    expect(userErrorMessage(apiError('ASSIGNED_CITY_NOT_SERVED'))).toMatch(
      /^Estas cidades deixaram de ser atendidas/
    )
  })

  it('says only the administration manages accounts', () => {
    expect(userErrorMessage(apiError('FORBIDDEN'))).toBe(
      'Só a administração pode gerenciar contas.'
    )
  })

  it.each([
    ['CANNOT_CHANGE_OWN_ROLE', 'Você não pode trocar o próprio papel.'],
    ['USER_NOT_FOUND', 'Esta conta não existe mais. Volte para a equipe.'],
    [
      'NO_ACTIVE_ADMIN_LEFT',
      'Outra pessoa da administração mudou contas ao mesmo tempo, e o painel ficaria sem administração ativa. Nada foi alterado: recarregue a página e tente de novo.',
    ],
  ])('explains %s from editing an account in Portuguese', (code, text) => {
    expect(userErrorMessage(apiError(code))).toBe(text)
  })

  it('keeps the API text for a code it does not know', () => {
    expect(
      userErrorMessage(apiError('SOMETHING_NEW', undefined, 'Texto novo.'))
    ).toBe('Texto novo.')
  })

  it('gives a generic message for an error that is not from the API', () => {
    expect(userErrorMessage(new TypeError('Failed to fetch'))).toBe(
      'Não foi possível concluir agora. Tente de novo em instantes.'
    )
  })
})
