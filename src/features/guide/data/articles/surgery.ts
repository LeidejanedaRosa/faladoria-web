import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'cirurgia'
const DATE_PUBLISHED = '2026-05-01'

export const surgeryArticles: GuideArticle[] = [
  {
    slug: 'fila-de-cirurgia',
    categorySlug: CATEGORY_SLUG,
    title: 'Como funciona a fila de cirurgia',
    summary:
      'Entenda como funciona a lista de espera para cirurgias eletivas no SUS e como acompanhar sua posição.',
    datePublished: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS realiza cirurgias de todos os tipos — das mais simples às mais complexas, incluindo transplantes. O caminho começa sempre com uma consulta médica.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'clipboard',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e consulte um médico',
        imageKey: 'ubs',
        detail: 'Só um profissional de saúde pode solicitar a cirurgia.',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde com o pedido',
        imageKey: 'calendar',
        detail:
          'Informe que o atendimento será pelo SUS e esclareça todas as dúvidas.',
      },
      {
        type: 'action-step',
        action: 'Aguarde o agendamento',
        detail:
          'Cirurgias eletivas entram em fila. Cirurgias urgentes têm prioridade — peça ao médico que indique no pedido.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Pedido de cirurgia assinado pelo médico',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'Exames solicitados pelo cirurgião',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'O SUS é obrigado a fornecer transporte gratuito quando a cirurgia só pode ser realizada em outro município. Converse na UBS sobre como solicitar o TFD.',
      },
    ],
  },

  {
    slug: 'cirurgia-negada',
    categorySlug: CATEGORY_SLUG,
    title: 'O que fazer quando a cirurgia é negada',
    summary:
      'Se o SUS negar sua cirurgia, você tem direitos. Saiba quais são e como agir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente — risco de vida',
        text: 'Não siga os passos abaixo. Vá direto ao hospital ou à Defensoria Pública. O atendimento é gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer, passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde Municipal',
        imageKey: 'ubs',
        detail:
          'Explique que seu direito está sendo desrespeitado. Exija o número de protocolo.',
      },
      {
        type: 'action-step',
        action: 'Ligue para a Ouvidoria Municipal',
        imageKey: 'phone',
        detail:
          'Registre a reclamação. Guarde o número de protocolo — você vai precisar dele.',
      },
      {
        type: 'action-step',
        action: 'Ligue para a Ouvidoria do SUS: 136',
        detail: 'Gratuito, 24 horas. Informe o protocolo da etapa anterior.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'Leve todos os documentos e protocolos. O atendimento é gratuito.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar em cada etapa',
        items: [
          'RG ou CNH',
          'Receituários e laudos médicos',
          'Número de protocolo de cada tentativa anterior',
        ],
      },
    ],
  },
]
