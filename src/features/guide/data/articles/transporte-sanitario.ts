import type { GuideArticle } from '../guideArticles'

export const transporteSanitarioArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-transporte-sanitario',
    categorySlug: 'transporte-sanitario',
    title: 'Como solicitar transporte sanitário',
    summary:
      'Se você não consegue se deslocar para consultas ou tratamentos, o SUS pode garantir transporte.',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS tem a obrigação de garantir transporte gratuito quando o paciente precisa se deslocar para consultas, exames, cirurgias ou tratamentos em outro município e não tem condições de ir por conta própria. Esse serviço se chama TFD — Tratamento Fora do Domicílio.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quem tem direito',
      },
      {
        type: 'list',
        items: [
          'Pacientes que precisam de atendimento em outro município',
          'Pessoas sem condição financeira de arcar com o transporte',
          'Pacientes que necessitam de acompanhante — o transporte cobre os dois',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
      },
      {
        type: 'list',
        items: [
          '1. Vá à UBS com o pedido médico da consulta, exame ou cirurgia em outro município',
          '2. Peça informações sobre o TFD (Tratamento Fora do Domicílio)',
          '3. A Secretaria de Saúde do município analisa e organiza o transporte',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Documentos geralmente exigidos',
      },
      {
        type: 'list',
        items: [
          'Pedido médico com a indicação do serviço em outro município',
          'Cartão do SUS',
          'Documento com foto',
          'Comprovante de residência',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se o transporte for negado',
      },
      {
        type: 'list',
        items: [
          'Registre a negativa por escrito e peça justificativa',
          'Acione o Disque Saúde: 136',
          'Procure a Defensoria Pública — o serviço é gratuito',
        ],
      },
      {
        type: 'callout',
        text: 'Nenhum município pode alegar falta de verba para negar transporte a quem precisa de atendimento de saúde. Isso é uma obrigação legal do Estado.',
      },
    ],
  },
]
