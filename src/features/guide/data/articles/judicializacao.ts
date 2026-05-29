import type { GuideArticle } from '../guideArticles'

export const judicializacaoArticles: GuideArticle[] = [
  {
    slug: 'quando-judicializar',
    categorySlug: 'judicializacao',
    title: 'Quando e como recorrer à Justiça',
    summary:
      'A judicialização é o último recurso. Entenda quando ela é necessária e como funciona o processo.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'Recorrer à Justiça é o último passo — mas em muitos casos é o mais eficaz. Quando o SUS nega um medicamento, cirurgia ou tratamento necessário, a Justiça pode obrigar o Estado a fornecer em dias.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quando judicializar',
      },
      {
        type: 'list',
        items: [
          'O SUS negou o atendimento e você já acionou a Secretaria de Saúde e a Ouvidoria sem resultado',
          'A espera está prejudicando gravemente sua saúde',
          'O medicamento ou tratamento foi negado sem justificativa médica',
          'Há urgência — risco de morte ou dano irreversível à saúde',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como funciona o processo',
      },
      {
        type: 'list',
        items: [
          '1. Procure a Defensoria Pública do seu estado — o atendimento é gratuito',
          '2. Leve todos os documentos: laudos, receitas, pedidos negados, exames',
          '3. O defensor analisa o caso e entra com a ação judicial',
          '4. Em casos urgentes, o juiz pode determinar o atendimento em até 72 horas (liminar)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que levar para a Defensoria Pública',
      },
      {
        type: 'list',
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
        text: 'Você não precisa pagar nada. A Defensoria Pública é gratuita para quem não tem condições de pagar advogado. Para encontrar a unidade mais próxima, ligue para o Disque Saúde: 136 ou pesquise "Defensoria Pública" + o nome do seu estado.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Casos de urgência extrema',
      },
      {
        type: 'paragraph',
        text: 'Se houver risco imediato de vida, vá diretamente ao hospital. O hospital não pode negar atendimento emergencial. Depois, com a situação estabilizada, acione a Defensoria para garantir a continuidade do tratamento.',
      },
    ],
  },
]
