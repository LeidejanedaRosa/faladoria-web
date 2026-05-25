import { GUIDE_ROUTES } from '@shared/data'

export const GUIDE_HIGHLIGHT_HEADING_ID = 'guide-highlight-heading'

export const GUIDE_HIGHLIGHT_CONTENT = {
  badge: 'Conteúdo gratuito',
  headline: 'Como conseguir pelo SUS',
  description:
    'Saúde pública é um direito. Saiba como conseguir consultas, exames, cirurgias, vacinas e medicamentos pelo SUS.',

  cta: {
    label: 'Explorar o Guia',
    ariaLabel:
      'Explorar o Guia do SUS — página com conteúdo completo sobre o Sistema Único de Saúde',
    href: GUIDE_ROUTES.root,
  },

  urlIndicator: {
    label: 'Acesse em:',
    url: 'faladoria.com.br/como-conseguir-pelo-sus',
  },

  bannerAlt:
    'Mulher com megafone representando o poder da informação no acesso ao SUS',

  screenReaderDescription:
    'Seção de destaque do guia do SUS com as principais categorias de conteúdo sobre saúde pública.',
} as const
