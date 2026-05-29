import type { GuideArticle } from '../guideArticles'

export const exameArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-exame',
    categorySlug: 'exame',
    title: 'Como solicitar exames pelo SUS',
    summary:
      'Saiba como solicitar exames laboratoriais e de imagem pelo SUS e o que fazer se a espera for longa.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS realiza exames laboratoriais, de imagem e outros procedimentos diagnósticos de forma gratuita. O caminho começa sempre pela consulta médica.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 1 — Consiga o pedido médico',
      },
      {
        type: 'paragraph',
        text: 'Você precisa de um pedido assinado por um profissional de saúde — médico, enfermeiro ou outro autorizado. Vá à UBS (postinho) para uma consulta e peça o pedido de exame.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 2 — Reúna os documentos',
      },
      {
        type: 'list',
        items: [
          'Pedido de exame assinado pelo profissional de saúde',
          'Cartão do SUS — se não tiver, solicite na UBS com documento com foto',
          'Documento com foto (RG ou CNH)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 3 — Agende o exame',
      },
      {
        type: 'paragraph',
        text: 'Com o pedido em mãos, vá à UBS, à Secretaria de Saúde ou ao local indicado pelo médico para agendar. Informe que o atendimento será pelo SUS.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Perguntas para fazer no agendamento',
      },
      {
        type: 'list',
        items: [
          'Qual é o endereço exato e o horário da realização?',
          'Preciso fazer jejum ou algum preparo especial?',
          'Devo levar resultados de exames anteriores?',
          'Com quanto tempo de antecedência devo chegar?',
          'O município oferece transporte se o local for em outra cidade?',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 4 — Compareça no horário marcado',
      },
      {
        type: 'paragraph',
        text: 'Leve o pedido, o Cartão do SUS e o documento com foto. Chegue com antecedência e, se houver preparo especial (como jejum), siga as orientações à risca.',
      },
      {
        type: 'callout',
        text: 'Precisa de um exame com urgência? Peça ao médico que indique "URGENTE" no pedido. Isso garante prioridade no agendamento.',
      },
    ],
  },
  {
    slug: 'exame-demorou-muito',
    categorySlug: 'exame',
    title: 'O que fazer quando o exame demora muito',
    summary:
      'Conheça seus direitos e os caminhos para acelerar a realização de exames com prazo vencido.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'Esperar meses por um exame é comum no SUS — mas não significa que você precisa aceitar sem fazer nada. Você tem direitos e há formas de agir.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quanto tempo é razoável esperar?',
      },
      {
        type: 'paragraph',
        text: 'Não existe um prazo único definido em lei para todos os exames. O tempo varia por município, tipo de exame e demanda local. Se a espera estiver prejudicando sua saúde ou o médico indicou urgência, você tem caminhos para agir.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer quando a espera está longa',
      },
      {
        type: 'list',
        items: [
          '1. Volte à UBS e pergunte a previsão — peça para registrar sua reclamação',
          '2. Vá à Secretaria de Saúde do município com o pedido e explique a urgência',
          '3. Acione o Disque Saúde: 136 (gratuito, 24h) para registrar a demora',
          '4. Procure a Defensoria Pública se o exame for urgente — é gratuito',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se o exame for urgente',
      },
      {
        type: 'paragraph',
        text: 'Em casos urgentes — suspeita de doença grave, piora do estado de saúde — o médico pode indicar urgência no pedido. Com isso, o prazo de espera deve ser reduzido. Se ainda assim não for marcado em tempo hábil, acione a Defensoria Pública.',
      },
      {
        type: 'callout',
        text: 'Guarde todos os documentos: o pedido de exame, comprovantes de agendamento e qualquer papel que mostre que você tentou marcar. Esses documentos são fundamentais se precisar acionar a Justiça.',
      },
    ],
  },
]
