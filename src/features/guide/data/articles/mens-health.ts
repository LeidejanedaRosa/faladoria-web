import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'saude-do-homem'
const DATE_PUBLISHED = '2026-05-01'

export const mensHealthArticles: GuideArticle[] = [
  {
    slug: 'saude-preventiva-homem',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde do homem pelo SUS',
    summary:
      'Exames de prevenção e programas de saúde masculina oferecidos pelo SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'person',
    content: [
      {
        type: 'paragraph',
        text: 'Os homens costumam procurar menos o serviço de saúde — mas prevenir é sempre mais simples do que tratar. O SUS oferece atendimento completo para a saúde masculina, de graça.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e peça uma consulta de check-up',
        imageKey: 'ubs',
        detail:
          'Não precisa esperar aparecer algum sintoma. Leve Cartão do SUS e documento com foto.',
      },
      {
        type: 'callout',
        text: 'O câncer de próstata é o segundo mais comum entre os homens no Brasil — mas tem alta taxa de cura quando detectado cedo. Não espere ter sintomas para fazer o exame.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Serviços disponíveis',
      },
      {
        type: 'list',
        items: [
          'Consulta clínica geral para check-up preventivo',
          'Exame de próstata (PSA e toque retal) — recomendado a partir dos 50 anos',
          'Acompanhamento de hipertensão e diabetes',
          'Saúde sexual e reprodutiva — vasectomia e planejamento familiar',
          'Tratamento de infecções sexualmente transmissíveis (ISTs)',
          'Saúde mental — psicólogo e psiquiatra pelo SUS',
          'Tratamento de alcoolismo e dependência química (CAPS AD)',
        ],
      },
    ],
  },
]
