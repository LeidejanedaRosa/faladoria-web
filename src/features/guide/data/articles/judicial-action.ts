import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'judicializacao'
const DATE_PUBLISHED = '2026-05-01'

export const judicialActionArticles: GuideArticle[] = [
  {
    slug: 'quando-judicializar',
    categorySlug: CATEGORY_SLUG,
    title: 'Quando e como recorrer à Justiça',
    summary:
      'A judicialização é o último recurso. Entenda quando ela é necessária e como funciona o processo.',
    datePublished: DATE_PUBLISHED,
    iconName: 'fist',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Quando judicializar',
        text: 'Quando o SUS negou o atendimento, você já acionou a Secretaria e a Ouvidoria sem resultado, a demora está prejudicando sua saúde ou há urgência — risco de morte ou dano irreversível.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como funciona o processo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública do seu estado',
        imageKey: 'patient-rights',
        detail: 'O atendimento é gratuito para quem não pode pagar advogado.',
      },
      {
        type: 'action-step',
        action: 'Leve todos os documentos',
        imageKey: 'checklist',
        detail:
          'Laudos, receitas, pedidos negados, exames e qualquer papel relacionado.',
      },
      {
        type: 'action-step',
        action: 'O defensor analisa e entra com a ação',
        detail:
          'Você não precisa de advogado particular — o defensor cuida de tudo.',
      },
      {
        type: 'action-step',
        action: 'Em casos urgentes, o juiz decide em até 72h',
        imageKey: 'clock',
        detail:
          'A liminar é uma decisão judicial de urgência que obriga o Estado a agir.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar para a Defensoria',
        items: [
          'Laudo ou receita médica indicando o medicamento, tratamento ou cirurgia',
          'Documentos que comprovem a negativa do SUS (por escrito, se possível)',
          'Cartão do SUS e documento com foto',
          'CPF e comprovante de residência',
          'Exames que comprovem o diagnóstico',
        ],
      },
      {
        type: 'callout',
        text: 'Você não precisa pagar nada. A Defensoria Pública é gratuita para quem não tem condições de pagar advogado. Para encontrar a unidade mais próxima, ligue para o Disque Saúde: 136.',
      },
    ],
  },
]
