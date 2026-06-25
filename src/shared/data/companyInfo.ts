export const COMPANY_INFO = {
  name: 'Faladoria',
  legalName: 'Faladoria Tecnologia LTDA', // TODO: Update with real legal name
  description:
    'Canal de mediação entre usuários do SUS e gestores de saúde para resolver problemas de atendimento via WhatsApp.',
  shortDescription: 'Sua voz no SUS',

  url: 'https://faladoria-web.vercel.app', // TODO: Update with real URL
  logo: '/logo.svg',
  ogImage: '/og-image.jpg',

  contact: {
    email: 'canalfaladoria@gmail.com',
    whatsapp: '+55 35 997003315',
  },

  address: {
    street: 'Rua Example', // TODO: Update with real address
    number: '123',
    complement: '',
    neighborhood: 'Centro',
    city: 'São Lourenço',
    state: 'MG',
    zipCode: '37470-000',
    country: 'Brasil',
    countryCode: 'BR',
  },

  social: {
    instagram: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    youtube: '',
  },

  foundingDate: '2024',
  industry: 'HealthTech',

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

  legal: {
    cnpj: '00.000.000/0000-00', // TODO: Update with real CNPJ
    registrationNumber: '',
  },
} as const

export const LOGO_WIDTH = 600
export const LOGO_HEIGHT = 485

export const WHATSAPP_URL = `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\D/g, '')}`

export type CompanyInfo = typeof COMPANY_INFO
