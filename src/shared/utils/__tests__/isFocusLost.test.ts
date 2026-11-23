import { afterEach, describe, expect, it } from 'vitest'

import { isFocusLost } from '../isFocusLost'

const button = (name: string) => {
  const element = document.createElement('button')
  element.textContent = name
  document.body.append(element)
  return element
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('isFocusLost', () => {
  it('is lost when nothing has focus (it fell on the page body)', () => {
    expect(isFocusLost(null)).toBe(true)
  })

  it('is lost while it is still on the control that started the work', () => {
    const trigger = button('Carregar mais')
    trigger.focus()

    expect(isFocusLost(trigger)).toBe(true)
  })

  it('is not lost when the person moved on to another control', () => {
    const trigger = button('Carregar mais')
    const other = button('Outro controle')
    trigger.focus()
    other.focus()

    expect(isFocusLost(trigger)).toBe(false)
  })
})
