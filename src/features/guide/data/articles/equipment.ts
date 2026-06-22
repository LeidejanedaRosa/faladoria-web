import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'equipamentos'
const DATE_PUBLISHED = '2026-05-01'

export const equipmentArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-equipamentos',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar equipamentos pelo SUS',
    summary:
      'Cadeiras de rodas, muletas, órteses, próteses e respiradores podem ser solicitados gratuitamente.',
    datePublished: DATE_PUBLISHED,
    iconName: 'target',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que o SUS fornece',
        text: 'Cadeiras de rodas, muletas, bengalas, andadores, órteses, próteses, equipamentos respiratórios (CPAP, BiPAP) e aparelhos auditivos (em alguns casos).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Consulte um médico especialista no SUS',
        imageKey: 'doctor-patient',
        detail:
          'Ortopedista, fisiatra ou neurologista — conforme sua necessidade.',
      },
      {
        type: 'action-step',
        action: 'O médico emite o laudo',
        detail:
          'O laudo deve indicar o equipamento necessário — é obrigatório para a solicitação.',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde com o laudo',
        imageKey: 'equipment',
        detail: 'Leve Cartão do SUS, RG, CPF e comprovante de residência.',
      },
      {
        type: 'action-step',
        action: 'Aguarde a aprovação',
        imageKey: 'calendar',
        detail:
          'Se negado ou com longa espera, a Defensoria Pública pode ajudar gratuitamente.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos necessários',
        items: [
          'Laudo médico descrevendo a necessidade e o equipamento indicado',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'CPF',
          'Comprovante de residência',
        ],
      },
      {
        type: 'callout',
        text: 'Se o pedido for negado ou a espera for muito longa, procure a Defensoria Pública. Equipamentos essenciais são direito garantido — e a Justiça frequentemente determina o fornecimento em caráter de urgência.',
      },
    ],
  },
]
