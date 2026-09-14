import { describe, expect, it } from 'vitest'

import {
  createBreadcrumb,
  createFaqStructuredData,
  ORGANIZATION_STRUCTURED_DATA,
} from '../structuredData'

describe('createBreadcrumb', () => {
  it('omits the url field on the last item', () => {
    const result = createBreadcrumb([
      { name: 'Início', url: '/' },
      { name: 'Guia do SUS' },
    ])

    expect(result[1]).not.toHaveProperty('url')
  })

  it('keeps an explicit url on non-last items', () => {
    const result = createBreadcrumb([
      { name: 'Início', url: '/' },
      { name: 'Guia do SUS', url: '/guia' },
    ])

    expect(result[0]?.url).toBe('/')
  })

  it('derives a slug-based url when none is given for a non-last item', () => {
    const result = createBreadcrumb([
      { name: 'Como Funciona o SUS' },
      { name: 'Artigo' },
    ])

    expect(result[0]?.url).toMatch(/como-funciona-o-sus$/)
  })

  it('always preserves the item name', () => {
    const result = createBreadcrumb([{ name: 'Início', url: '/' }])

    expect(result[0]?.name).toBe('Início')
  })
})

describe('createFaqStructuredData', () => {
  it('maps each item to a Question/Answer pair', () => {
    const result = createFaqStructuredData([
      { question: 'Como funciona?', answer: 'Assim.' },
    ])

    expect(result['@type']).toBe('FAQPage')
    expect(result.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Como funciona?',
        acceptedAnswer: { '@type': 'Answer', text: 'Assim.' },
      },
    ])
  })

  it('returns an empty mainEntity for an empty list', () => {
    const result = createFaqStructuredData([])

    expect(result.mainEntity).toEqual([])
  })
})

describe('ORGANIZATION_STRUCTURED_DATA', () => {
  it('includes a WebSite and an Organization node', () => {
    const types = ORGANIZATION_STRUCTURED_DATA['@graph'].map(
      node => node['@type']
    )

    expect(types).toEqual(['WebSite', 'Organization'])
  })

  it('never includes an empty string among sameAs social links', () => {
    const organization = ORGANIZATION_STRUCTURED_DATA['@graph'].find(
      node => node['@type'] === 'Organization'
    )

    expect(organization?.sameAs).not.toContain('')
  })
})
