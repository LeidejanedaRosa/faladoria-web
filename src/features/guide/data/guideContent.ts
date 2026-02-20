import { COMPANY_INFO } from '@components/data'

export const GUIDE_HEADING_ID = 'guide-heading'
export const GUIDE_CATEGORIES_HEADING_ID = 'guide-categories-heading'

export const GUIDE_CONTENT = {
  seo: {
    title: 'Guia do SUS',
    description:
      'Guia completo para navegar o SUS: seus direitos, como conseguir consultas, exames, cirurgias, vacinação e muito mais.',
  },

  hero: {
    badge: 'Guia completo e gratuito',
    headline: 'Como conseguir pelo SUS',
    description:
      'Tudo o que você precisa saber para acessar seus direitos na saúde pública. Um guia prático, claro e atualizado.',
  },

  intro: {
    heading: 'Escolha um tema para começar',
    description:
      'Navegue pelas categorias abaixo e descubra como acessar os serviços do SUS de forma correta e mais fácil.',
  },

  comingSoon: {
    heading: 'Conteúdo em breve',
    description:
      'Esta seção está sendo preparada com todo o cuidado que você merece.',
  },
} as const

export const GUIDE_COLLECTION_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: GUIDE_CONTENT.seo.title,
  description: GUIDE_CONTENT.seo.description,
  url: `${COMPANY_INFO.url}/guia-do-sus`,
  isPartOf: {
    '@id': `${COMPANY_INFO.url}/#website`,
  },
} as const
