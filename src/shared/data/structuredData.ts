import { COMPANY_INFO } from './companyInfo'

const {
  name,
  legalName,
  url,
  logo,
  description,
  foundingDate,
  address,
  contact,
  social,
  seo,
} = COMPANY_INFO

const socialLinks = Object.values(social).filter(link => link !== '')

export const ORGANIZATION_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      name,
      url,
      description,
      publisher: {
        '@id': `${url}/#organization`,
      },
      inLanguage: seo.language,
    },
    {
      '@type': 'Organization',
      '@id': `${url}/#organization`,
      name,
      legalName,
      url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}${logo}`,
        width: 200,
        height: 60,
      },
      image: `${url}${logo}`,
      description,
      foundingDate,
      address: {
        '@type': 'PostalAddress',
        addressCountry: address.countryCode,
        addressRegion: address.state,
        addressLocality: address.city,
        streetAddress: `${address.street}, ${address.number}`,
        postalCode: address.zipCode,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: contact.whatsapp,
          email: contact.email,
          contactType: 'customer service',
          availableLanguage: ['Portuguese'],
        },
      ],
      sameAs: socialLinks,
    },
  ],
} as const

export interface BreadcrumbItem {
  name: string
  url?: string
}

export const HOMEPAGE_BREADCRUMB: BreadcrumbItem[] = [
  { name: 'Início', url: url },
]

function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-')
}

export const createBreadcrumb = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
  return items.map((item, index) => {
    const isLast = index === items.length - 1
    return {
      name: item.name,
      ...(isLast
        ? {}
        : {
            url: item.url || `${url.replace(/\/$/, '')}/${slugify(item.name)}`,
          }),
    }
  })
}

export function createFaqStructuredData(
  items: readonly { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
