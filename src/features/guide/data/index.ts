export { GUIDE_CATEGORIES } from './guideCategories'
export type { GuideCategory } from './guideCategories'

export { GUIDE_ARTICLES } from './guideArticles'
export type { GuideArticle, ArticleBlock } from './guideArticles'

export {
  getCategoryBySlug,
  getArticlesByCategory,
  getArticleBySlug,
} from './guideUtils'

export {
  GUIDE_HEADING_ID,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CONTENT,
  GUIDE_COLLECTION_PAGE_STRUCTURED_DATA,
  createArticleStructuredData,
} from './guideContent'
export type {
  HeroTrustCircleColor,
  HeroTrustIconName,
  HeroTrustSignal,
} from './guideContent'
