import { createRef } from 'react'

import { describe, expect, it, vi } from 'vitest'

import { mergeRefs } from '../mergeRefs'

describe('mergeRefs', () => {
  it('hands the same element to an object ref and to a callback ref', () => {
    const objectRef = createRef<HTMLInputElement>()
    const callbackRef = vi.fn()
    const input = document.createElement('input')

    mergeRefs(objectRef, callbackRef, undefined)(input)

    expect(objectRef.current).toBe(input)
    expect(callbackRef).toHaveBeenCalledWith(input)
  })
})
