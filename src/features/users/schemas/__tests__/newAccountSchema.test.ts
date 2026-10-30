import { describe, expect, it } from 'vitest'

import { NAME_MAX_LENGTH } from '../../data/accountRules'
import { newAccountSchema, type NewAccountValues } from '../newAccountSchema'

const VARGINHA = { city: 'Varginha', state: 'MG' }

const valid: NewAccountValues = {
  name: 'Fernanda Alves',
  email: 'fernanda@saude.lavras.mg.gov.br',
  role: 'manager',
  assignedCities: [VARGINHA],
}

/** Each error as "field: message", the way the form shows them. */
const errorsOf = (values: Partial<Record<keyof NewAccountValues, unknown>>) => {
  const result = newAccountSchema.safeParse({ ...valid, ...values })
  return result.success
    ? []
    : result.error.issues.map(
        issue => `${issue.path.join('.')}: ${issue.message}`
      )
}

describe('newAccountSchema', () => {
  it('accepts a complete account and trims the name and the e-mail', () => {
    const result = newAccountSchema.parse({
      ...valid,
      name: '  Fernanda Alves ',
      email: ' fernanda@saude.lavras.mg.gov.br ',
    })

    expect(result.name).toBe('Fernanda Alves')
    expect(result.email).toBe('fernanda@saude.lavras.mg.gov.br')
  })

  it('asks for the name, also when only spaces were typed', () => {
    expect(errorsOf({ name: '   ' })).toEqual(['name: Escreva o nome.'])
  })

  it('accepts a name at the API limit and refuses one character more', () => {
    expect(errorsOf({ name: 'a'.repeat(NAME_MAX_LENGTH) })).toEqual([])
    expect(errorsOf({ name: 'a'.repeat(NAME_MAX_LENGTH + 1) })).toEqual([
      'name: O nome pode ter até 150 caracteres.',
    ])
  })

  it('tells an empty e-mail apart from a malformed one', () => {
    expect(errorsOf({ email: '' })).toEqual(['email: Escreva o e-mail.'])
    expect(errorsOf({ email: 'fernanda@' })).toEqual([
      'email: Escreva um e-mail válido, como ana@exemplo.org.',
    ])
  })

  it('asks for the role', () => {
    expect(errorsOf({ role: undefined })).toEqual(['role: Escolha o papel.'])
  })

  it.each(['assistant', 'manager'] as const)(
    'asks %s for at least one city: without one the person sees nothing',
    role => {
      expect(errorsOf({ role, assignedCities: [] })).toEqual([
        'assignedCities: Escolha pelo menos uma cidade: sem cidade, a pessoa não vê nenhuma reclamação.',
      ])
    }
  )

  it('does not ask the administration for a city: it sees them all', () => {
    expect(errorsOf({ role: 'admin', assignedCities: [] })).toEqual([])
  })

  // Zod 4 runs the refine after failed checks (min, e-mail format); only a wrong type, such as
  // a missing role, skips it. Kept as a guard: if an upgrade changed that, the person would only
  // learn about the city after fixing the name and sending again.
  it('shows the missing city together with the other errors', () => {
    expect(
      errorsOf({ name: '', email: '', role: 'manager', assignedCities: [] })
    ).toEqual([
      'name: Escreva o nome.',
      'email: Escreva o e-mail.',
      'assignedCities: Escolha pelo menos uma cidade: sem cidade, a pessoa não vê nenhuma reclamação.',
    ])
  })

  // Without the role there is no telling whether a city is needed.
  it('does not guess the cities rule while the role is still missing', () => {
    expect(errorsOf({ role: undefined, assignedCities: [] })).toEqual([
      'role: Escolha o papel.',
    ])
  })
})
