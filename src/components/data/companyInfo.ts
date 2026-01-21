/**
 * Company/Project Information
 *
 * This file centralizes all company/project data used throughout the application.
 * Update these values before deploying to production.
 *
 * Used by:
 * - SEO meta tags (index.html)
 * - Schema.org structured data
 * - Footer and contact sections
 * - Legal pages
 */

export const COMPANY_INFO = {
  // Basic Info
  name: 'Faladoria',
  legalName: 'Faladoria Tecnologia LTDA', // TODO: Update with real legal name
  description:
    'Canal de mediação entre usuários do SUS e gestores de saúde para resolver problemas de atendimento via WhatsApp.',
  shortDescription: 'Sua voz no SUS',

  // URLs
  url: 'https://www.faladoria.com.br', // TODO: Update with real URL
  logo: '/logo.svg',
  ogImage: '/og-image.jpg', // 1200x630px recommended

  // Contact
  contact: {
    email: 'contato@faladoria.com.br', // TODO: Update with real email
    phone: '+55 11 99999-9999', // TODO: Update with real phone
    whatsapp: '+5511999999999', // TODO: Update with real WhatsApp
  },

  // Address
  address: {
    street: 'Rua Example', // TODO: Update with real address
    number: '123',
    complement: '',
    neighborhood: 'Centro',
    city: 'São Paulo', // TODO: Update with real city
    state: 'SP',
    zipCode: '00000-000', // TODO: Update with real ZIP
    country: 'Brasil',
    countryCode: 'BR',
  },

  // Social Media
  social: {
    instagram: '', // TODO: Add when available
    linkedin: '', // TODO: Add when available
    facebook: '', // TODO: Add when available
    twitter: '', // TODO: Add when available
    youtube: '', // TODO: Add when available
  },

  // Business Info
  foundingDate: '2024',
  industry: 'HealthTech',

  // SEO
  seo: {
    title: 'Faladoria - Sua voz no SUS',
    titleTemplate: '%s | Faladoria',
    keywords: [
      'SUS',
      'saúde pública',
      'ouvidoria',
      'atendimento saúde',
      'WhatsApp saúde',
      'gestão saúde',
      'mediação saúde',
      'reclamação SUS',
      'faladoria',
    ],
    locale: 'pt_BR',
    language: 'pt-BR',
    themeColor: '#3b82f6', // TODO: Update with brand color
  },

  // Legal (Brazilian specific)
  legal: {
    cnpj: '00.000.000/0000-00', // TODO: Update with real CNPJ
    registrationNumber: '',
  },
} as const

/**
 * Type for company info
 */
export type CompanyInfo = typeof COMPANY_INFO

/**
 * Checks if company info has placeholder values
 * Use this to warn during build if data hasn't been updated
 */
export const hasPlaceholderData = (): boolean => {
  // Check for common placeholder patterns in critical fields
  const hasPlaceholderPhone = COMPANY_INFO.contact.phone.includes('99999')
  const hasPlaceholderEmail = COMPANY_INFO.contact.email.includes('example')
  const hasPlaceholderCNPJ = COMPANY_INFO.legal.cnpj.includes('00.000.000')

  return hasPlaceholderPhone || hasPlaceholderEmail || hasPlaceholderCNPJ
}

/**
 * Get full address as string
 */
export const getFullAddress = (): string => {
  const { street, number, complement, neighborhood, city, state, zipCode } =
    COMPANY_INFO.address

  const parts = [
    `${street}, ${number}`,
    complement,
    neighborhood,
    `${city} - ${state}`,
    zipCode,
  ].filter(Boolean)

  return parts.join(', ')
}

/**
 * Get social media links as array (filters out empty values)
 */
export const getSocialLinks = () => {
  return Object.entries(COMPANY_INFO.social)
    .filter(([, url]) => url !== '')
    .map(([platform, url]) => ({ platform, url }))
}

/**
 * Formats CNPJ for display
 * @param cnpj - CNPJ string with or without formatting
 * @returns Formatted CNPJ string
 */
export const formatCNPJ = (cnpj: string): string => {
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return cnpj

  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}
