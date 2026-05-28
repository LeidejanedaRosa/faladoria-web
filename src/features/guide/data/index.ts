export { GUIDE_CATEGORIES } from './guideCategories'
export type { GuideCategory } from './guideCategories'

export { CATEGORY_GROUPS } from './categoryGroups'
export type { CategoryGroup } from './categoryGroups'

export { GUIDE_ARTICLES } from './guideArticles'
export type { GuideArticle, ArticleBlock } from './guideArticles'

export {
  getCategoryBySlug,
  getArticlesByCategory,
  getArticleBySlug,
  getCategoriesByGroup,
} from './guideUtils'

export {
  GUIDE_HEADING_ID,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CATEGORY_HEADING_ID,
  GUIDE_ARTICLE_HEADING_ID,
  GUIDE_CONTENT,
  GUIDE_COLLECTION_PAGE_STRUCTURED_DATA,
  createCategoryStructuredData,
  createArticleStructuredData,
} from './guideContent'
export type {
  HeroTrustCircleColor,
  HeroTrustIconName,
  HeroTrustSignal,
} from './guideContent'
