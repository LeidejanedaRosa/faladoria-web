import { COMPANY_INFO } from './companyInfo'

export const HERO_HEADING_ID = 'hero-heading'

export const HERO_CONTENT = {
  badge: 'Uma plataforma independente para ouvir, mediar e resolver.',
  headline: {
    lines: ['Você fala.', 'O SUS escuta.', 'Nós resolvemos.'],
  },
  description:
    'Criamos a faladoria para conectar usuários do SUS à gestão pública e melhorar o atendimento de saúde.',
  logo: {
    ariaLabel: `Logo da ${COMPANY_INFO.name} - ${COMPANY_INFO.shortDescription}`,
  },
} as const
