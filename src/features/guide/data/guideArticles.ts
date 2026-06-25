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

export type CalloutBlock =
  | { type: 'callout'; variant: 'tip'; title?: string; text?: string }
  | { type: 'callout'; variant: 'warning'; title?: string; text?: string }
  | {
      type: 'callout'
      variant: 'emergency'
      title?: string
      highlight?: string
      text?: string
    }
  | { type: 'callout'; variant: 'checklist'; title?: string; items?: string[] }
  | { type: 'callout'; variant?: never; title?: string; text?: string }

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2; text: string; icon?: ArticleStepIconName }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | CalloutBlock
  | {
      type: 'action-step'
      action: string
      imageKey?: SharedStepImageKey
      detail?: string
      link?: { label: string; href: string }
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
