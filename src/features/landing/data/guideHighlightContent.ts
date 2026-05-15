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
    href: '/guia-do-sus',
  },

  highlightedCategories: [
    'seus-direitos',
    'como-conseguir',
    'vacinacao',
  ] as const,

  screenReaderDescription:
    'Seção de destaque do guia do SUS com as principais categorias de conteúdo sobre saúde pública.',
} as const
