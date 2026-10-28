import { describe, expect, it } from 'vitest'

import { cityLocationSchema } from '../cityLocationSchema'

const messages = (input: unknown) => {
  const result = cityLocationSchema.safeParse(input)
  return result.success ? [] : result.error.issues.map(issue => issue.message)
}

describe('cityLocationSchema', () => {
  it('accepts a state and a city', () => {
    expect(messages({ state: 'MG', city: 'Varginha' })).toEqual([])
  })

  it('asks for the state and for a city chosen from the list', () => {
    expect(messages({ state: '', city: '   ' })).toEqual([
      'Escolha o estado.',
      'Escolha a cidade na lista.',
    ])
  })
})
