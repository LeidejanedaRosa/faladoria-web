export const GUIDE_HIGHLIGHT_HEADING_ID = 'guide-highlight-heading'

export const GUIDE_HIGHLIGHT_CONTENT = {
  badge: 'Conteúdo gratuito',
  headline: 'Como conseguir pelo SUS',
  description:
    'Um guia prático e completo para você acessar seus direitos na saúde pública. Saiba como conseguir consultas, exames, vacinas e muito mais.',

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
