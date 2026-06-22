import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'saude-da-crianca'
const DATE_PUBLISHED = '2026-05-01'

export const childHealthArticles: GuideArticle[] = [
  {
    slug: 'acompanhamento-infantil',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde da criança pelo SUS',
    summary:
      'Acompanhamento do crescimento, desenvolvimento e vacinação das crianças pelo SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece acompanhamento completo para crianças desde o nascimento — consultas de rotina, vacinação, desenvolvimento e tratamento de doenças. Tudo gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Consultas de rotina (puericultura)',
      },
      {
        type: 'list',
        items: [
          'Nos primeiros 15 dias, com 1, 2, 4, 6, 9, 12, 18 e 24 meses, depois anualmente',
          'O médico avalia peso, altura, alimentação, desenvolvimento e vacinação',
          'Solicite a caderneta de saúde da criança — guarde com cuidado',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Exames obrigatórios do bebê',
      },
      {
        type: 'list',
        items: [
          'Teste do Pezinho — detecta até ~50 doenças (fazer entre o 3º e o 5º dia de vida)',
          'Teste do Olhinho — detecta problemas de visão',
          'Teste da Orelhinha — detecta perda auditiva',
          'Teste do Coraçãozinho — detecta problemas cardíacos',
        ],
      },
      {
        type: 'callout',
        text: 'Se a maternidade não realizou algum dos testes, vá à UBS nos primeiros dias após a alta hospitalar. Os testes têm prazo — especialmente o do Pezinho.',
      },
    ],
  },
]
