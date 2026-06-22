import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'como-funciona-o-sus'
const DATE_PUBLISHED = '2026-05-01'

export const howSusWorksArticles: GuideArticle[] = [
  {
    slug: 'o-que-e-o-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'O que é o SUS',
    summary:
      'Entenda o que é o Sistema Único de Saúde, seus princípios e como ele está organizado no Brasil.',
    datePublished: DATE_PUBLISHED,
    iconName: 'building',
    content: [
      {
        type: 'callout',
        text: 'O SUS é gratuito, universal e integral. Gratuito: você não paga nada. Universal: é para todos os brasileiros. Integral: cobre desde uma consulta simples até um transplante de órgão.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que o SUS oferece',
      },
      {
        type: 'list',
        items: [
          'Consultas em todas as especialidades médicas',
          'Exames laboratoriais e de imagem',
          'Cirurgias, inclusive transplantes de órgãos',
          'Internações hospitalares',
          'Medicamentos (lista básica e de alto custo)',
          'Atendimento odontológico',
          'Vacinação',
          'Urgência e emergência 24 horas',
          'Acompanhamento para gestantes, crianças e idosos',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar',
        icon: 'location',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS (postinho) mais próxima',
        imageKey: 'ubs',
        detail:
          'É a porta de entrada do SUS. O atendimento é gratuito para qualquer pessoa em território nacional.',
      },
    ],
  },
  {
    slug: 'niveis-de-atendimento',
    categorySlug: CATEGORY_SLUG,
    title: 'Níveis de atendimento',
    summary:
      'Conheça a diferença entre atenção básica, média e alta complexidade e saiba onde buscar cada tipo de cuidado.',
    datePublished: DATE_PUBLISHED,
    iconName: 'chart',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS funciona em três níveis — como uma escada. Você começa no primeiro degrau (postinho) e sobe conforme a necessidade.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 1 — UBS (Postinho)',
      },
      {
        type: 'list',
        items: [
          'Consultas com médico de família e clínico geral',
          'Exames básicos, vacinas e prevenção',
          'Acompanhamento de doenças crônicas (diabetes, hipertensão)',
          'Pré-natal e saúde da criança',
          'Encaminhamentos para especialistas',
        ],
      },
      {
        type: 'callout',
        text: 'Sempre comece pelo postinho. Ele resolve a maioria dos casos e, quando não resolve, te encaminha para o lugar certo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 2 — UPA e ambulatórios',
      },
      {
        type: 'list',
        items: [
          'Urgências que não são emergências graves',
          'Consultas com especialistas (com encaminhamento)',
          'Exames mais complexos e procedimentos ambulatoriais',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 3 — Hospital',
      },
      {
        type: 'list',
        items: [
          'Emergências com risco de vida — SAMU: 192',
          'Cirurgias complexas, transplantes e internações',
          'Tratamento de câncer e doenças graves, UTI',
        ],
      },
    ],
  },
]
