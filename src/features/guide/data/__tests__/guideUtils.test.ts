import { describe, expect, it } from 'vitest'

import { GUIDE_ARTICLES } from '../guideArticles'
import { GUIDE_CATEGORIES } from '../guideCategories'
import {
  getArticleBySlug,
  getArticlesByCategory,
  getCategoryBySlug,
} from '../guideUtils'

describe('getCategoryBySlug', () => {
  it('returns the correct category for a valid slug', () => {
    const result = getCategoryBySlug('seus-direitos')
    expect(result).toBeDefined()
    expect(result?.slug).toBe('seus-direitos')
  })

  it('returns undefined for an invalid slug', () => {
    expect(getCategoryBySlug('nao-existe')).toBeUndefined()
  })

  it('returns undefined for an empty string', () => {
    expect(getCategoryBySlug('')).toBeUndefined()
  })
})

describe('getArticlesByCategory', () => {
  it('returns articles for a valid category slug', () => {
    const result = getArticlesByCategory('consulta')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(a => expect(a.categorySlug).toBe('consulta'))
  })

  it('returns an empty array for a category with no articles', () => {
    expect(getArticlesByCategory('categoria-inexistente')).toEqual([])
  })

  it('all articles belong only to the requested category', () => {
    GUIDE_CATEGORIES.forEach(category => {
      const articles = getArticlesByCategory(category.slug)
      articles.forEach(a => expect(a.categorySlug).toBe(category.slug))
    })
  })
})

describe('getArticleBySlug', () => {
  it('returns the correct article for a valid slug', () => {
    const article = GUIDE_ARTICLES[0]
    const result = getArticleBySlug(article.slug)
    expect(result).toBeDefined()
    expect(result?.slug).toBe(article.slug)
  })

  it('returns undefined for an invalid slug', () => {
    expect(getArticleBySlug('nao-existe')).toBeUndefined()
  })

  it('returns undefined for an empty string', () => {
    expect(getArticleBySlug('')).toBeUndefined()
  })
})
