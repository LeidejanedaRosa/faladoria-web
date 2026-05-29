import type { GuideArticle } from '../guideArticles'

export const cirurgiaArticles: GuideArticle[] = [
  {
    slug: 'fila-de-cirurgia',
    categorySlug: 'cirurgia',
    title: 'Como funciona a fila de cirurgia',
    summary:
      'Entenda como funciona a lista de espera para cirurgias eletivas no SUS e como acompanhar sua posição.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS realiza cirurgias de todos os tipos — das mais simples às mais complexas, incluindo transplantes. O caminho começa sempre com uma consulta médica.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar uma cirurgia',
      },
      {
        type: 'list',
        items: [
          '1. Vá à UBS e consulte um médico — apenas um profissional de saúde pode solicitar a cirurgia',
          '2. Com o pedido em mãos, vá à Secretaria de Saúde ou ao local indicado para agendar',
          '3. Informe que o atendimento será pelo SUS e esclareça todas as dúvidas',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Documentos necessários',
      },
      {
        type: 'list',
        items: [
          'Pedido de cirurgia assinado pelo médico',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'Exames solicitados pelo cirurgião',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'A fila de espera',
      },
      {
        type: 'paragraph',
        text: 'A maioria das cirurgias eletivas (não urgentes) entra em uma fila de espera. O tempo varia conforme o tipo de cirurgia e a disponibilidade no seu município. Cirurgias urgentes têm prioridade e devem constar no pedido médico como "urgente".',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Perguntas para fazer ao agendar',
      },
      {
        type: 'list',
        items: [
          'Quando e onde será realizada a cirurgia?',
          'Quais exames preciso fazer antes?',
          'O município oferece transporte se for em outra cidade?',
          'Qual é o prazo estimado de espera?',
        ],
      },
      {
        type: 'callout',
        text: 'O SUS é obrigado a fornecer transporte gratuito para o paciente e um acompanhante quando a cirurgia só pode ser realizada em outro município. Converse na UBS sobre como solicitar.',
      },
    ],
  },
  {
    slug: 'cirurgia-negada',
    categorySlug: 'cirurgia',
    title: 'O que fazer quando a cirurgia é negada',
    summary:
      'Se o SUS negar sua cirurgia, você tem direitos. Saiba quais são e como agir.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'Ter uma cirurgia negada ou com prazo indefinido é frustrante — mas não significa o fim. Você tem direitos garantidos por lei e há caminhos concretos para exigir o atendimento.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se a espera estiver muito longa',
      },
      {
        type: 'list',
        items: [
          '1. Peça por escrito o prazo previsto na Secretaria de Saúde',
          '2. Registre uma reclamação na Ouvidoria do SUS — Disque Saúde: 136',
          '3. Procure o Ministério Público com o pedido médico e os exames realizados',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se for urgente',
      },
      {
        type: 'paragraph',
        text: 'Em casos urgentes, vá diretamente ao hospital com o pedido médico e solicite internação. O hospital não pode negar atendimento de emergência.',
      },
      {
        type: 'list',
        items: [
          'Vá ao hospital com o pedido médico e exames',
          'Procure a Defensoria Pública — o serviço é gratuito',
          'Um juiz pode determinar a realização da cirurgia em até 72 horas por liminar de urgência',
        ],
      },
      {
        type: 'callout',
        text: 'Guarde tudo: pedido de cirurgia, laudos, exames e qualquer comprovante de que você tentou agendar. Esses documentos são essenciais para acionar a Defensoria Pública ou o Ministério Público.',
      },
    ],
  },
]
