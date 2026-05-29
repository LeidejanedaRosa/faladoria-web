import type { GuideArticle } from '../guideArticles'

export const saudeMentalArticles: GuideArticle[] = [
  {
    slug: 'caps-e-servicos-de-saude-mental',
    categorySlug: 'saude-mental',
    title: 'Saúde mental pelo SUS',
    summary:
      'Conheça os Centros de Atenção Psicossocial e outros serviços de saúde mental disponíveis pelo SUS.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece atendimento completo para a saúde mental — psicólogo, psiquiatra, grupos de apoio e tratamento para dependência química. Tudo de forma gratuita.',
      },
      {
        type: 'callout',
        text: 'Se você ou alguém próximo estiver em crise ou com pensamentos suicidas, ligue agora para o CVV: 188. O atendimento é gratuito e funciona 24 horas por dia.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde buscar atendimento de saúde mental',
      },
      {
        type: 'list',
        items: [
          'UBS (postinho) — primeira porta de entrada; o médico faz a avaliação e encaminha',
          'CAPS (Centro de Atenção Psicossocial) — atendimento especializado em saúde mental',
          'CAPS AD — para dependência de álcool e outras drogas',
          'CAPS i — específico para crianças e adolescentes',
          'UPA e hospital — para crises agudas e emergências psiquiátricas',
        ],
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
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar',
      },
      {
        type: 'paragraph',
        text: 'Você pode ir diretamente ao CAPS ou começar pela UBS. Não é necessário encaminhamento em muitos municípios — basta comparecer e solicitar atendimento.',
      },
      {
        type: 'list',
        items: [
          'Leve o Cartão do SUS e documento com foto',
          'Explique sua situação ao profissional de acolhimento',
          'Se não souber onde fica o CAPS, pergunte na UBS ou ligue para o Disque Saúde: 136',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Outros serviços de apoio gratuitos',
      },
      {
        type: 'list',
        items: [
          'CVV (Centro de Valorização da Vida): 188 — apoio emocional 24h',
          'CRAS (Centro de Referência de Assistência Social) — apoio social e psicológico',
          'Alcoólicos Anônimos (AA) e Narcóticos Anônimos (NA) — grupos de apoio gratuitos',
        ],
      },
    ],
  },
]
