import { COMPANY_INFO } from '@shared/data/companyInfo'
import { GUIDE_ROUTES } from '@shared/data/routes'

export const GUIDE_HEADING_ID = 'guide-heading'
export const GUIDE_CATEGORIES_HEADING_ID = 'guide-categories-heading'
export const GUIDE_CATEGORIES_SECTION_ID = 'guide-categories'

export type HeroTrustIconName = 'users' | 'heart' | 'check'
export type HeroTrustCircleColor = 'purple' | 'rose' | 'teal'

export interface HeroTrustSignal {
  label: string
  iconName: HeroTrustIconName
  circleColor: HeroTrustCircleColor
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
    heading: 'Encontre o serviço que você precisa',
    description:
      'Escolha uma categoria abaixo e veja como o SUS pode te ajudar.',
  },

  comingSoon: {
    heading: 'Conteúdo em breve',
    description:
      'Esta seção está sendo preparada com todo o cuidado que você merece.',
  },
} as const

export function createArticleStructuredData(
  title: string,
  description: string,
  articleUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${COMPANY_INFO.url}${articleUrl}`,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@id': `${COMPANY_INFO.url}/#website`,
    },
    publisher: {
      '@id': `${COMPANY_INFO.url}/#organization`,
    },
  } as const
}

export const GUIDE_COLLECTION_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: GUIDE_CONTENT.seo.title,
  description: GUIDE_CONTENT.seo.description,
  url: `${COMPANY_INFO.url}${GUIDE_ROUTES.root}`,
  isPartOf: {
    '@id': `${COMPANY_INFO.url}/#website`,
  },
} as const
