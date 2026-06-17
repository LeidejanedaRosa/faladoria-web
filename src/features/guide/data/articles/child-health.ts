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
        text: 'O SUS oferece acompanhamento completo para a saúde das crianças desde o nascimento — consultas de rotina, vacinação, desenvolvimento e tratamento de doenças. Tudo gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Puericultura: o acompanhamento do bebê',
      },
      {
        type: 'paragraph',
        text: 'A puericultura são as consultas regulares para acompanhar o crescimento e desenvolvimento do bebê e da criança. São realizadas na UBS e seguem um calendário recomendado pelo Ministério da Saúde.',
      },
      {
        type: 'list',
        items: [
          'Consultas recomendadas: nos primeiros 15 dias, com 1, 2, 4, 6, 9, 12, 18 e 24 meses, depois anualmente',
          'O médico avalia peso, altura, alimentação, desenvolvimento e vacinação',
          'Receba a caderneta de saúde da criança — guarde com cuidado',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Serviços disponíveis para crianças no SUS',
      },
      {
        type: 'list',
        items: [
          'Consultas pediátricas de rotina e para doenças',
          'Vacinas do calendário infantil (gratuitas)',
          'Exames neonatais — Teste do Pezinho, Olhinho, Orelhinha e Coraçãozinho',
          'Acompanhamento nutricional e orientação para aleitamento materno',
          'Atendimento odontológico preventivo',
          'Encaminhamento para especialistas (neurologista, cardiologista, etc.)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Triagem neonatal — os testes do bebê',
      },
      {
        type: 'paragraph',
        text: 'Todo bebê tem direito aos quatro testes gratuitos logo após o nascimento:',
      },
      {
        type: 'list',
        items: [
          'Teste do Pezinho — a versão ampliada (Lei nº 14.154) visa detectar até ~50 doenças, implementada de forma gradual pelo Ministério da Saúde',
          'Teste do Olhinho — detecta problemas de visão',
          'Teste da Orelhinha — detecta perda auditiva',
          'Teste do Coraçãozinho — detecta problemas cardíacos',
        ],
      },
      {
        type: 'callout',
        text: 'Se a maternidade não realizou algum dos testes, vá à UBS nos primeiros dias após a alta hospitalar. Os testes têm prazo — especialmente o do Pezinho, que deve ser feito entre o 3º e o 5º dia de vida.',
      },
    ],
  },
]
