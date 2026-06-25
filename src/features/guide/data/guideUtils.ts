import { CATEGORY_GROUPS } from './categoryGroups'
import { GUIDE_ARTICLES, type GuideArticle } from './guideArticles'
import { GUIDE_CATEGORIES, type GuideCategory } from './guideCategories'

export function getCategoryBySlug(slug: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find(c => c.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): GuideArticle[] {
  return GUIDE_ARTICLES.filter(a => a.categorySlug === categorySlug)
}

export function getArticleBySlug(
  slug: string,
  categorySlug?: string
): GuideArticle | undefined {
  return GUIDE_ARTICLES.find(
    a =>
      a.slug === slug &&
      (categorySlug === undefined || a.categorySlug === categorySlug)
  )
}

export function getCategoriesByGroup(groupSlug: string): GuideCategory[] {
  const group = CATEGORY_GROUPS.find(g => g.slug === groupSlug)
  if (!group) return []
  return group.categorySlugs
    .map(slug => GUIDE_CATEGORIES.find(c => c.slug === slug))
    .filter((c): c is GuideCategory => c !== undefined)
}
