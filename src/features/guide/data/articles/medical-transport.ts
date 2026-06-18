import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'transporte-sanitario'
const DATE_PUBLISHED = '2026-05-01'

export const medicalTransportArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-transporte-sanitario',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar transporte sanitário',
    summary:
      'Se você não consegue se deslocar para consultas ou tratamentos, o SUS tem obrigação de garantir transporte gratuito. Saiba quem tem direito e como pedir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'location',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Quem tem direito',
        icon: 'users',
      },
      {
        type: 'list',
        items: [
          'Pacientes que precisam de atendimento médico em outro município',
          'Pessoas sem condição financeira de arcar com o deslocamento',
          'Pacientes que precisam de acompanhante — o transporte cobre os dois',
          'Usuários em tratamento contínuo (quimioterapia, hemodiálise, fisioterapia)',
        ],
      },
      {
        type: 'info-panel',
        title: 'O que é o TFD?',
        text: 'TFD significa Tratamento Fora do Domicílio. É o programa do SUS que garante transporte e diária para pacientes que precisam ir a outro município para receber atendimento de saúde não disponível na cidade onde moram.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'clipboard',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Vá à sua UBS (posto de saúde) com o encaminhamento médico para o serviço em outro município',
          'Peça para falar sobre o TFD — Tratamento Fora do Domicílio',
          'A Secretaria de Saúde do seu município avalia e organiza o transporte',
          'Aguarde o agendamento e confirmação do dia e horário do transporte',
        ],
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos para levar à UBS',
        items: [
          'Encaminhamento médico com a indicação do serviço em outro município',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'Comprovante de residência',
          'Exames recentes relacionados ao tratamento (se tiver)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se o transporte for negado',
        icon: 'megaphone',
      },
      {
        type: 'paragraph',
        text: 'A negativa do transporte sanitário é ilegal quando o paciente preenche os requisitos do TFD. Não aceite a recusa sem contestar.',
      },
      {
        type: 'list',
        items: [
          'Peça a negativa por escrito com justificativa assinada',
          'Registre reclamação no Disque Saúde: 136',
          'Procure a Ouvidoria da Secretaria de Saúde do seu município',
          'Acione a Defensoria Pública — o atendimento é gratuito',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Falta de verba não é justificativa',
        text: 'Nenhum município pode alegar falta de recursos para negar transporte sanitário. O TFD é uma obrigação legal do Estado — não uma concessão.',
      },
    ],
  },
  {
    slug: 'reembolso-tfd',
    categorySlug: CATEGORY_SLUG,
    title: 'Como pedir reembolso pelo TFD',
    summary:
      'Quando o município não tem veículo disponível, você pode ir por conta própria e receber reembolso das despesas. Saiba quando esse direito vale e como pedir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'clipboard',
    content: [
      {
        type: 'info-panel',
        title: 'Transporte próprio também tem cobertura',
        text: 'Se o município não disponibilizar veículo para o seu deslocamento, ele é obrigado a reembolsar as despesas com passagem ou combustível. Esse direito está previsto na Portaria GM/MS nº 55/1999, que regulamenta o TFD.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quando você tem direito ao reembolso',
        icon: 'check',
      },
      {
        type: 'list',
        items: [
          'O município não disponibilizou transporte próprio na data do atendimento',
          'Você precisou viajar para outro município para consulta, exame, cirurgia ou tratamento encaminhado pelo SUS',
          'O deslocamento foi autorizado previamente pela Secretaria de Saúde',
          'Você conservou os comprovantes de passagem ou combustível',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Guarde todos os comprovantes',
        text: 'Bilhetes de ônibus, recibos de combustível e qualquer comprovante de despesa de transporte são essenciais para o reembolso. Sem comprovação, o município pode negar o pagamento.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar o reembolso',
        icon: 'clipboard',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Após o atendimento, vá à Secretaria de Saúde do seu município',
          'Apresente a documentação do atendimento realizado (relatório, receita ou comprovante)',
          'Entregue os comprovantes de despesa com transporte',
          'Preencha o formulário de solicitação de reembolso do TFD',
          'Anote o número do protocolo e acompanhe o prazo de pagamento',
        ],
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos para solicitar o reembolso',
        items: [
          'Autorização prévia do TFD emitida pela Secretaria de Saúde',
          'Comprovante do atendimento realizado (relatório médico, receita ou guia)',
          'Bilhetes de passagem ou recibo de combustível',
          'Cartão do SUS',
          'Documento com foto',
          'Dados bancários para depósito',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se negar ou atrasar o reembolso',
        icon: 'megaphone',
      },
      {
        type: 'paragraph',
        text: 'Cada município define seu próprio prazo de pagamento, mas a demora injustificada ou a negativa sem razão válida podem ser contestadas.',
      },
      {
        type: 'list',
        items: [
          'Registre reclamação na Ouvidoria da Secretaria de Saúde',
          'Acione o Disque Saúde: 136',
          'Procure o Ministério Público se o valor não for pago',
          'A Defensoria Pública pode ingressar com ação judicial — o serviço é gratuito',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Faça tudo com autorização prévia',
        text: 'O reembolso exige que o deslocamento tenha sido autorizado antes de acontecer. Se você viajou sem autorização da Secretaria de Saúde, o reembolso pode ser negado legalmente. Sempre solicite a autorização TFD antes da viagem.',
      },
    ],
  },
]
