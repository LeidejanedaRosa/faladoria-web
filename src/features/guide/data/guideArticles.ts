export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }

export interface GuideArticle {
  slug: string
  title: string
  summary: string
  datePublished: string
  content: ArticleBlock[]
  categorySlug: string
}

export { GUIDE_ARTICLES } from './articles'
