import { COMPANY_INFO } from './companyInfo'

/**
 * Structured Data Constants
 *
 * This file contains pre-built structured data objects for SEO.
 * These are used with JsonLdScript component for Schema.org markup.
 *
 * @see https://schema.org/Organization
 * @see https://schema.org/BreadcrumbList
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

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

/**
 * Filter out empty social links
 */
const socialLinks = Object.values(social).filter(link => link !== '')

/**
 * Organization Structured Data
 *
 * Complete Schema.org graph including Organization and WebSite schemas.
 * Used on all pages to establish brand identity for search engines.
 */
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
          telephone: contact.phone,
          email: contact.email,
          contactType: 'customer service',
          availableLanguage: ['Portuguese'],
        },
      ],
      sameAs: socialLinks,
    },
  ],
} as const

/**
 * Breadcrumb Item Type
 */
export interface BreadcrumbItem {
  name: string
  url?: string
}

/**
 * Homepage Breadcrumb
 *
 * Simple breadcrumb for the homepage.
 * For other pages, create specific breadcrumb arrays.
 *
 * @example
 * // For a subpage like "Sobre"
 * const ABOUT_BREADCRUMB: BreadcrumbItem[] = [
 *   { name: 'Início', url: '/' },
 *   { name: 'Sobre' }
 * ]
 */
export const HOMEPAGE_BREADCRUMB: BreadcrumbItem[] = [
  { name: 'Início', url: url },
]

/**
 * Factory function to create breadcrumb arrays
 *
 * @param items - Array of breadcrumb items (last item should not have url)
 * @returns Formatted breadcrumb array
 *
 * @example
 * const breadcrumbs = createBreadcrumb([
 *   { name: 'Início', url: '/' },
 *   { name: 'Dashboard', url: '/dashboard' },
 *   { name: 'Configurações' }
 * ])
 */
export const createBreadcrumb = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
  return items.map((item, index) => {
    const isLast = index === items.length - 1
    return {
      name: item.name,
      ...(isLast
        ? {}
        : { url: item.url || `${url}${item.name.toLowerCase()}` }),
    }
  })
}
