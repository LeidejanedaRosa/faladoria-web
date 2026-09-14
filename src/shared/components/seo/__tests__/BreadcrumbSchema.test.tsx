import { render } from '@/test/test-utils'

import { describe, expect, it } from 'vitest'

import { BreadcrumbSchema } from '../BreadcrumbSchema'

function parseSchema(container: HTMLElement): Record<string, unknown> {
  const script = container.querySelector('script')
  return JSON.parse(script?.innerHTML || '{}')
}

describe('BreadcrumbSchema', () => {
  it('renders a BreadcrumbList schema', () => {
    const { container } = render(
      <BreadcrumbSchema items={[{ name: 'Início', url: '/' }]} />
    )

    const schema = parseSchema(container)

    expect(schema['@type']).toBe('BreadcrumbList')
  })

  it('numbers items starting at 1, in order', () => {
    const { container } = render(
      <BreadcrumbSchema
        items={[
          { name: 'Início', url: '/' },
          { name: 'Guia do SUS', url: '/guia' },
        ]}
      />
    )

    const schema = parseSchema(container)
    const items = schema.itemListElement as { position: number }[]

    expect(items.map(item => item.position)).toEqual([1, 2])
  })

  it('omits the item (url) field on the last entry', () => {
    const { container } = render(
      <BreadcrumbSchema
        items={[{ name: 'Início', url: '/' }, { name: 'Artigo atual' }]}
      />
    )

    const schema = parseSchema(container)
    const items = schema.itemListElement as Record<string, unknown>[]

    expect(items[1]).not.toHaveProperty('item')
    expect(items[0]).toHaveProperty('item', '/')
  })

  it('falls back to the company base url when a non-last item has no url', () => {
    const { container } = render(
      <BreadcrumbSchema items={[{ name: 'Sem url' }, { name: 'Último' }]} />
    )

    const schema = parseSchema(container)
    const items = schema.itemListElement as Record<string, unknown>[]

    expect(typeof items[0]?.item).toBe('string')
    expect(items[0]?.item).not.toBe('')
  })
})
