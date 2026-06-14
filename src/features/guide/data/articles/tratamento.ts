import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'tratamento'
const DATE_PUBLISHED = '2026-05-01'

export const tratamentoArticles: GuideArticle[] = [
  {
    slug: 'como-conseguir-tratamento',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir tratamento pelo SUS',
    summary:
      'Fisioterapia, quimioterapia, reabilitação e outros tratamentos disponíveis gratuitamente.',
    datePublished: DATE_PUBLISHED,
    iconName: 'activity',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece todos os tipos de tratamento de saúde — fisioterapia, quimioterapia, radioterapia, reabilitação física e muitos outros — de forma gratuita. O caminho começa pela consulta médica.',
      },
      {
        type: 'callout',
        text: 'O SUS cobre todos os tratamentos necessários, exceto os estéticos e experimentais. Se o médico indicou, o SUS tem obrigação de fornecer.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo a passo para conseguir tratamento',
      },
      {
        type: 'list',
        items: [
          '1. Vá à UBS e consulte um médico — só um profissional de saúde pode prescrever o tratamento',
          '2. Com a prescrição em mãos, vá à Secretaria de Saúde ou ao local indicado',
          '3. Agende informando que será pelo SUS',
          '4. Compareça no dia e horário marcados com todos os documentos',
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
          'Pedido ou prescrição assinado pelo médico',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'Exames ou laudos solicitados',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Tratamento em outra cidade',
      },
      {
        type: 'paragraph',
        text: 'Se o tratamento só puder ser realizado em outro município, o SUS é obrigado a fornecer transporte gratuito para o paciente e, quando necessário, para um acompanhante. Pergunte na UBS como solicitar o Tratamento Fora do Domicílio (TFD).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se demorar muito ou for negado',
      },
      {
        type: 'list',
        items: [
          'Registre reclamação na Ouvidoria do SUS — Disque Saúde: 136',
          'Procure a Defensoria Pública — atendimento gratuito',
          'Em casos urgentes, um juiz pode determinar o início do tratamento em dias',
        ],
      },
    ],
  },
]
