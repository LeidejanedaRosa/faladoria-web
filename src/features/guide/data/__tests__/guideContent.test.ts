import { COMPANY_INFO } from '@shared/data/companyInfo'
import { describe, expect, it } from 'vitest'

import { createArticleStructuredData } from '../guideContent'

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

  it('sets datePublished', () => {
    expect(result.datePublished).toBeDefined()
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
