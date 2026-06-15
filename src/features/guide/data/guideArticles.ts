export type ArticleStepIconName =
  | 'activity'
  | 'building'
  | 'chart'
  | 'chat'
  | 'check'
  | 'clipboard'
  | 'fist'
  | 'heart'
  | 'location'
  | 'megaphone'
  | 'person'
  | 'phone'
  | 'question'
  | 'search'
  | 'shield'
  | 'syringe'
  | 'target'
  | 'users'

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2; text: string; icon?: ArticleStepIconName }
  | { type: 'heading'; level: 3; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
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
    }

export interface GuideArticle {
  slug: string
  title: string
  summary: string
  datePublished: string
  content: ArticleBlock[]
  categorySlug: string
  iconName?: ArticleStepIconName
}

export { GUIDE_ARTICLES } from './articles'
