import { COMPANY_INFO } from '@shared/data/companyInfo'
import { describe, expect, it } from 'vitest'

import {
  createArticleStructuredData,
  createCategoryStructuredData,
  GUIDE_COLLECTION_PAGE_STRUCTURED_DATA,
} from '../guideContent'

describe('createCategoryStructuredData', () => {
  const result = createCategoryStructuredData(
    'Consulta',
    'Como agendar uma consulta pelo SUS.',
    '/como-conseguir-pelo-sus/consulta'
  )

  it('returns @type CollectionPage', () => {
    expect(result['@type']).toBe('CollectionPage')
  })

  it('sets name from label parameter', () => {
    expect(result.name).toBe('Consulta')
  })

  it('sets description from description parameter', () => {
    expect(result.description).toBe('Como agendar uma consulta pelo SUS.')
  })

  it('builds url from COMPANY_INFO.url and categoryUrl', () => {
    expect(result.url).toBe(
      `${COMPANY_INFO.url}/como-conseguir-pelo-sus/consulta`
    )
  })

  it('sets inLanguage to pt-BR', () => {
    expect(result.inLanguage).toBe('pt-BR')
  })

  it('links isPartOf to the website node', () => {
    expect(result.isPartOf['@id']).toBe(`${COMPANY_INFO.url}/#website`)
  })
})

describe('GUIDE_COLLECTION_PAGE_STRUCTURED_DATA', () => {
  it('has @type CollectionPage', () => {
    expect(GUIDE_COLLECTION_PAGE_STRUCTURED_DATA['@type']).toBe(
      'CollectionPage'
    )
  })

  it('sets inLanguage to pt-BR', () => {
    expect(GUIDE_COLLECTION_PAGE_STRUCTURED_DATA.inLanguage).toBe('pt-BR')
  })

  it('links isPartOf to the website node', () => {
    expect(GUIDE_COLLECTION_PAGE_STRUCTURED_DATA.isPartOf['@id']).toBe(
      `${COMPANY_INFO.url}/#website`
    )
  })
})

describe('createArticleStructuredData', () => {
  const result = createArticleStructuredData(
    'Direito à saúde',
    'A saúde é um direito de todos.',
    '/como-conseguir-pelo-sus/seus-direitos/direito-a-saude'
  )

  it('returns @type Article', () => {
    expect(result['@type']).toBe('Article')
  })

  it('sets headline from title parameter', () => {
    expect(result.headline).toBe('Direito à saúde')
  })

  it('sets description from description parameter', () => {
    expect(result.description).toBe('A saúde é um direito de todos.')
  })

  it('builds url from COMPANY_INFO.url and articleUrl', () => {
    expect(result.url).toBe(
      `${COMPANY_INFO.url}/como-conseguir-pelo-sus/seus-direitos/direito-a-saude`
    )
  })

  it('sets inLanguage to pt-BR', () => {
    expect(result.inLanguage).toBe('pt-BR')
  })

  it('sets datePublished as an ISO date string (YYYY-MM-DD)', () => {
    expect(result.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('links author to the organization node', () => {
    expect(result.author['@id']).toBe(`${COMPANY_INFO.url}/#organization`)
  })

  it('links isPartOf to the website node', () => {
    expect(result.isPartOf['@id']).toBe(`${COMPANY_INFO.url}/#website`)
  })

  it('links publisher to the organization node', () => {
    expect(result.publisher['@id']).toBe(`${COMPANY_INFO.url}/#organization`)
  })
})
