import { describe, expect, it } from 'vitest'

import { joinIds } from '../joinIds'

describe('joinIds', () => {
  it('joins only the ids that exist', () => {
    expect(joinIds('hint', false, undefined, 'error')).toBe('hint error')
  })

  it('gives undefined instead of an empty aria-describedby', () => {
    expect(joinIds(false, undefined)).toBeUndefined()
  })
})
