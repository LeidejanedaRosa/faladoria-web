import { describe, expect, it } from 'vitest'

import {
  accountDetailsSchema,
  type AccountDetailsValues,
} from '../accountDetailsSchema'

const valid: AccountDetailsValues = {
  name: 'Ana Souza',
  role: 'assistant',
  assignedCities: [{ city: 'Varginha', state: 'MG' }],
}

const errorsOf = (values: Partial<AccountDetailsValues>) => {
  const result = accountDetailsSchema.safeParse({ ...valid, ...values })
  return result.success
    ? []
    : result.error.issues.map(
        issue => `${issue.path.join('.')}: ${issue.message}`
      )
}

describe('accountDetailsSchema', () => {
  it('accepts an account as it is', () => {
    expect(errorsOf({})).toEqual([])
  })

  it('asks for the name, also when only spaces are left', () => {
    expect(errorsOf({ name: '  ' })).toEqual(['name: Escreva o nome.'])
  })

  // The same rule as creating: the last city taken away would leave the person seeing nothing.
  it('keeps at least one city for an assistant or a manager', () => {
    expect(errorsOf({ assignedCities: [] })).toEqual([
      'assignedCities: Escolha pelo menos uma cidade: sem cidade, a pessoa não vê nenhuma reclamação.',
    ])
    expect(errorsOf({ role: 'manager', assignedCities: [] })).toHaveLength(1)
  })

  it('needs no city for the administration', () => {
    expect(errorsOf({ role: 'admin', assignedCities: [] })).toEqual([])
  })

  it('has no e-mail: the login cannot change', () => {
    const parsed = accountDetailsSchema.parse({
      ...valid,
      email: 'outro@exemplo.org',
    })

    expect(parsed).not.toHaveProperty('email')
  })
})
