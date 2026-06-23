import { COMPANY_INFO } from '@shared/data/companyInfo'
import { GUIDE_ROUTES } from '@shared/data/routes'
import { SCHEMA_ORG } from '@shared/data/structuredData'

export const GUIDE_HEADING_ID = 'guide-heading'
export const GUIDE_CATEGORIES_HEADING_ID = 'guide-categories-heading'
export const GUIDE_CATEGORIES_SECTION_ID = 'guide-categories'
export const GUIDE_CATEGORY_HEADING_ID = 'category-heading'
export const GUIDE_ARTICLE_HEADING_ID = 'article-heading'
export const GUIDE_WHY_HEADING_ID = 'guide-why-heading'

export type HeroTrustIconName = 'users' | 'heart' | 'check'
export type HeroTrustCircleColor = 'purple' | 'rose' | 'teal'

export interface HeroTrustSignal {
  label: string
  iconName: HeroTrustIconName
  circleColor: HeroTrustCircleColor
}

export type WhyIconName = 'book-open' | 'check' | 'heart' | 'users'
export type WhyIconColor = 'purple' | 'green' | 'rose' | 'indigo'
export type WhyIconShape = 'circle' | 'rounded'

export interface WhyItem {
  iconName: WhyIconName
  iconColor: WhyIconColor
  iconShape: WhyIconShape
  title: string
  description: string
}

export type ArticleFooterTrustIconName = 'shield' | 'heart' | 'users' | 'check'
export type ArticleFooterTrustIconBg = 'purple' | 'rose' | 'indigo' | 'green'

export interface ArticleFooterTrustSignal {
  iconName: ArticleFooterTrustIconName
  iconBg: ArticleFooterTrustIconBg
  title: string
  description: string
}

export const GUIDE_CONTENT = {
  seo: {
    title: 'Como conseguir pelo SUS',
    description:
      'Guia completo para navegar o SUS: seus direitos, como conseguir consultas, exames, cirurgias, vacinação e muito mais.',
  },

  hero: {
    badge: 'Guia completo e gratuito',
    headline: {
      base: 'Você tem direito à',
      highlight: 'saúde pública.',
    },
    description:
      'Tudo o que você precisa saber para conseguir consultas, exames, cirurgias, medicamentos e muito mais pelo SUS.',
    trustSignals: [
      { label: 'Para todos', iconName: 'users', circleColor: 'purple' },
      { label: 'Gratuito', iconName: 'heart', circleColor: 'rose' },
      { label: 'Simples', iconName: 'check', circleColor: 'teal' },
    ] satisfies HeroTrustSignal[],
    cta: 'Explorar o guia',
    image: {
      alt: 'Três brasileiros sorridentes — uma senhora, uma jovem e um adulto — representando os usuários do SUS de todas as idades',
      width: 1536,
      height: 1024,
    },
    infoBar: {
      message:
        'Informação clara, linguagem simples e conteúdo sempre atualizado para ajudar você.',
      badge: '100% gratuito e feito para todos.',
    },
  },

  intro: {
    badge: 'Navegue por categoria',
    heading: 'Encontre o serviço que você precisa',
    description:
      'Escolha uma categoria abaixo e veja como o SUS pode te ajudar.',
  },

  why: {
    heading: 'Por que usar nosso guia?',
    items: [
      {
        iconName: 'book-open',
        iconColor: 'purple',
        iconShape: 'rounded',
        title: 'Informação confiável',
        description: 'Conteúdo verificado e sempre atualizado.',
      },
      {
        iconName: 'check',
        iconColor: 'green',
        iconShape: 'circle',
        title: '100% gratuito',
        description: 'Tudo o que você precisa, sem custo algum.',
      },
      {
        iconName: 'heart',
        iconColor: 'rose',
        iconShape: 'circle',
        title: 'Feito para todos',
        description: 'Linguagem simples e fácil de entender.',
      },
      {
        iconName: 'users',
        iconColor: 'indigo',
        iconShape: 'circle',
        title: 'Você não está só',
        description: 'Estamos aqui para te orientar.',
      },
    ] satisfies WhyItem[],
  },

  comingSoon: {
    heading: 'Conteúdo em breve',
    description:
      'Esta seção está sendo preparada com todo o cuidado que você merece.',
  },

  categoryPage: {
    infoBanner: 'O SUS garante esse serviço de forma gratuita para todos.',
    tip: {
      title: 'Dica importante',
      description:
        'Mantenha seu cadastro no posto de saúde sempre atualizado. Isso ajuda a não perder sua vez na fila.',
    },
    help: {
      title: 'Precisa de ajuda?',
      description: 'Fale com a equipe do seu posto de saúde.',
    },
    articles: {
      infoPoints: {
        heading: 'Informações importantes',
      },
    },
  },

  articlePage: {
    help: {
      title: 'Precisa de ajuda?',
      description:
        'Fale com a equipe da sua unidade de saúde ou use nossos canais de atendimento.',
      cta: 'Ver canais de atendimento',
    },
    trustSignals: [
      {
        iconName: 'shield',
        iconBg: 'purple',
        title: 'Informação confiável',
        description: 'Conteúdo verificado e atualizado',
      },
      {
        iconName: 'heart',
        iconBg: 'rose',
        title: 'Gratuito',
        description: 'Tudo o que você precisa, sem custo',
      },
      {
        iconName: 'users',
        iconBg: 'indigo',
        title: 'Para todos',
        description: 'Linguagem simples e fácil de entender',
      },
      {
        iconName: 'check',
        iconBg: 'green',
        title: '100% SUS',
        description: 'Feito para ajudar você',
      },
    ] satisfies ArticleFooterTrustSignal[],
  },
} as const

export function createCategoryStructuredData(
  label: string,
  description: string,
  categoryUrl: string
) {
  return {
    '@context': SCHEMA_ORG,
    '@type': 'CollectionPage',
    name: label,
    description,
    url: `${COMPANY_INFO.url}${categoryUrl}`,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`,
    },
  } as const
}

export function createArticleStructuredData(
  title: string,
  description: string,
  articleUrl: string,
  datePublished: string,
  dateModified?: string
) {
  return {
    '@context': SCHEMA_ORG,
    '@type': 'Article',
    headline: title,
    description,
    url: `${COMPANY_INFO.url}${articleUrl}`,
    inLanguage: 'pt-BR',
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@id': `${COMPANY_INFO.url}/#organization`,
    },
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`,
    },
    publisher: {
      '@id': `${COMPANY_INFO.url}/#organization`,
    },
  }
}

export const GUIDE_COLLECTION_PAGE_STRUCTURED_DATA = {
  '@context': SCHEMA_ORG,
  '@type': 'CollectionPage',
  name: GUIDE_CONTENT.seo.title,
  description: GUIDE_CONTENT.seo.description,
  url: `${COMPANY_INFO.url}${GUIDE_ROUTES.root}`,
  inLanguage: 'pt-BR',
  isPartOf: {
    '@id': `${COMPANY_INFO.url}/#website`,
  },
} as const
