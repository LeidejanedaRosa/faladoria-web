import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'saude-mental'
const DATE_PUBLISHED = '2026-05-01'

export const mentalHealthArticles: GuideArticle[] = [
  {
    slug: 'caps-e-servicos-de-saude-mental',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde mental pelo SUS',
    summary:
      'Conheça os Centros de Atenção Psicossocial e outros serviços de saúde mental disponíveis pelo SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'chat',
    content: [
      {
        type: 'callout',
        text: 'Se você ou alguém próximo estiver em crise ou com pensamentos suicidas, ligue agora para o CVV: 188. O atendimento é gratuito e funciona 24 horas por dia.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar o atendimento',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS ou diretamente ao CAPS',
        imageKey: 'ubs',
        detail:
          'Não é necessário encaminhamento em muitos municípios. Leve Cartão do SUS e documento com foto.',
      },
      {
        type: 'action-step',
        action: 'Explique sua situação ao profissional',
        imageKey: 'doctor-patient',
        detail:
          'O acolhimento é feito por psicólogo ou assistente social. Não há julgamento.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Não sabe onde fica o CAPS? Pergunte na UBS ou ligue para o Disque Saúde: 136.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que o CAPS oferece',
      },
      {
        type: 'list',
        items: [
          'Consultas com psiquiatra e psicólogo',
          'Grupos terapêuticos e oficinas',
          'Atendimento individual e familiar',
          'Acompanhamento de medicamentos psiquiátricos (gratuitos)',
          'Suporte para crises — alguns CAPS funcionam 24 horas',
          'CAPS AD: para dependência de álcool e outras drogas',
          'CAPS i: específico para crianças e adolescentes',
        ],
      },
    ],
  },
]
