export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2; text: string; icon?: string }
  | { type: 'heading'; level: 3; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'callout'
      variant?: 'tip' | 'warning' | 'emergency' | 'checklist'
      title?: string
      text?: string
      highlight?: string
      items?: string[]
    }
  | { type: 'image'; imageKey: string; alt: string }
  | {
      type: 'info-panel'
      title: string
      text: string
      icon?: string
      variant?: 'purple'
    }

export interface GuideArticle {
  slug: string
  title: string
  summary: string
  datePublished: string
  content: ArticleBlock[]
  categorySlug: string
}

export { GUIDE_ARTICLES } from './articles'
