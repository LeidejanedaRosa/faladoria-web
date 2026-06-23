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

export type SharedStepImageKey =
  | 'ambulance'
  | 'calendar'
  | 'cartao-sus'
  | 'checklist'
  | 'clock'
  | 'doctor-patient'
  | 'equipment'
  | 'home-care'
  | 'medications'
  | 'patient-rights'
  | 'phone'
  | 'ubs'

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2; text: string; icon?: ArticleStepIconName }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | {
      type: 'callout'
      variant?: 'tip' | 'warning' | 'emergency' | 'checklist'
      title?: string
      text?: string
      highlight?: string
      items?: string[]
    }
  | {
      type: 'action-step'
      action: string
      imageKey?: SharedStepImageKey
      detail?: string
    }

export type ActionStepBlock = Extract<ArticleBlock, { type: 'action-step' }>

export interface GuideArticle {
  slug: string
  title: string
  summary: string
  datePublished: string
  dateModified?: string
  content: ArticleBlock[]
  categorySlug: string
  iconName?: ArticleStepIconName
}

export { GUIDE_ARTICLES } from './articles'
