import { describe, expect, it } from 'vitest'

import { buildChangePasswordSchema, loginSchema } from '../authSchemas'

const fieldErrors = (result: {
  success: boolean
  error?: { issues: { path: PropertyKey[]; message: string }[] }
}) =>
  Object.fromEntries(
    (result.error?.issues ?? []).map(issue => [
      String(issue.path[0]),
      issue.message,
    ])
  )

const validChange = {
  currentPassword: 'Xk3temporaria',
  newPassword: 'minha-senha-nova',
  confirmPassword: 'minha-senha-nova',
}

describe('loginSchema', () => {
  it('accepts an e-mail with spaces around it, trimmed', () => {
    const result = loginSchema.safeParse({
      email: '  ana@faladoria.org ',
      password: 'x',
    })

    expect(result.success && result.data.email).toBe('ana@faladoria.org')
  })

  it('asks for the e-mail and the password when they are empty', () => {
    expect(
      fieldErrors(loginSchema.safeParse({ email: '', password: '' }))
    ).toEqual({ email: 'Informe o e-mail.', password: 'Informe a senha.' })
  })

  it('explains what a valid e-mail looks like', () => {
    expect(
      fieldErrors(loginSchema.safeParse({ email: 'ana', password: 'x' })).email
    ).toBe('Digite um e-mail válido, como nome@exemplo.com.')
  })
})

describe('buildChangePasswordSchema', () => {
  it('accepts a valid change without e-mail when there is a session', () => {
    expect(
      buildChangePasswordSchema(false).safeParse(validChange).success
    ).toBe(true)
  })

  it('requires the e-mail when there is no session yet', () => {
    expect(
      fieldErrors(buildChangePasswordSchema(true).safeParse(validChange)).email
    ).toBe('Informe o e-mail.')
  })

  it.each([
    [7, false],
    [8, true],
    [128, true],
    [129, false],
  ])('accepts a new password of %i characters: %s', (length, ok) => {
    const password = 'a'.repeat(length)

    expect(
      buildChangePasswordSchema(false).safeParse({
        ...validChange,
        newPassword: password,
        confirmPassword: password,
      }).success
    ).toBe(ok)
  })

  it('refuses keeping the same password', () => {
    expect(
      fieldErrors(
        buildChangePasswordSchema(false).safeParse({
          ...validChange,
          newPassword: validChange.currentPassword,
          confirmPassword: validChange.currentPassword,
        })
      ).newPassword
    ).toBe('A nova senha precisa ser diferente da atual.')
  })

  it('points the mismatch to the confirmation field', () => {
    expect(
      fieldErrors(
        buildChangePasswordSchema(false).safeParse({
          ...validChange,
          confirmPassword: 'outra-coisa',
        })
      )
    ).toEqual({ confirmPassword: 'As senhas não conferem.' })
  })
})
