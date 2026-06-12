import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'exame'
const DATE_PUBLISHED = '2026-05-01'

export const exameArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-exame',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar exames pelo SUS',
    summary:
      'Saiba como solicitar exames laboratoriais e de imagem pelo SUS, quais documentos levar e o que perguntar no agendamento.',
    datePublished: DATE_PUBLISHED,
    highlights: [
      'Quem pode pedir o exame',
      'Documentos necessários para o agendamento',
      'Onde e como agendar',
      'O que fazer antes de comparecer',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'O SUS realiza exames laboratoriais, de imagem e outros procedimentos diagnósticos gratuitamente. O caminho começa sempre pela consulta médica e pelo pedido de um profissional de saúde.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Onde realizar o exame',
        icon: 'location',
      },
      {
        type: 'paragraph',
        text: 'Os exames podem ser realizados na UBS, na Secretaria de Saúde ou em local credenciado pelo SUS. Normalmente o médico orienta, durante a consulta, onde o exame pode ser feito. Se você já tem o pedido e não sabe onde ir, pergunte na UBS.',
      },
      {
        type: 'paragraph',
        text: 'Há exames agendados pela Secretaria de Saúde e outros marcados diretamente no local de realização.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Importante',
        text: 'Antes de qualquer coisa, você precisa do pedido médico autorizado. Sem o pedido, não é possível agendar o exame.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'O que levar',
        icon: 'clipboard',
      },
      {
        type: 'list',
        items: [
          'Pedido de exame assinado por médico ou profissional de saúde autorizado',
          'Cartão do SUS — se não tiver, solicite na UBS com documento com foto',
          'Documento com foto (RG e CPF ou CNH)',
        ],
      },
      {
        type: 'image',
        imageKey: 'cartao-sus',
        alt: 'Cartão do SUS e documento com foto',
      },
      {
        type: 'info-panel',
        title: 'Não tem o pedido de exame?',
        text: 'Vá à UBS mais próxima com seu Cartão do SUS e documento com foto e solicite uma consulta. O profissional de saúde avalia e, se necessário, emite o pedido de exame na hora.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Pedido de médico particular',
        text: 'Alguns municípios aceitam pedidos de médico particular; outros não. Informe-se sempre na UBS sobre como proceder no seu município.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Agendar o exame',
        icon: 'phone',
      },
      {
        type: 'paragraph',
        text: 'Contate a Secretaria de Saúde ou o local indicado para realização do exame. Tenha em mãos o pedido autorizado, o documento de identificação e o Cartão do SUS. Ao marcar, informe que o atendimento será pelo SUS.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Perguntas para fazer no agendamento',
        items: [
          'Preciso levar resultados de exames anteriores?',
          'Precisa de jejum ou algum preparo especial?',
          'Qual é o endereço exato e quando será realizado?',
          'Com quanto tempo de antecedência devo chegar?',
          'Se o exame for em outra cidade, como consigo o transporte?',
          'Se o transporte não for fornecido, em qual departamento devo resolver antes de denunciar?',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'Comparecer ao exame',
        icon: 'person',
      },
      {
        type: 'paragraph',
        text: 'Vá ao local no dia e horário marcados, sem atraso. Leve o pedido, o Cartão do SUS e o documento com foto. Se houver preparo especial — como jejum —, siga as orientações à risca. Quem não faz o preparo pode ser impedido de realizar o exame.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Checklist antes de sair',
        icon: 'check',
      },
      {
        type: 'list',
        items: [
          'Separe todos os resultados de exames anteriores que o médico pediu para levar',
          'Confirme o endereço com antecedência e planeje o trajeto',
          'Verifique se está com o Cartão do SUS, o RG ou CNH e o pedido de exame',
          'Leve máscara — alguns locais ainda exigem ao entrar',
          'Chegue com antecedência — atrasos podem impedir o atendimento',
        ],
      },
    ],
  },

  {
    slug: 'nao-sei-que-exame-preciso',
    categorySlug: CATEGORY_SLUG,
    title: 'Não sei qual exame preciso',
    summary:
      'Se você sente um incômodo mas não sabe qual exame fazer, entenda como o SUS pode te ajudar a descobrir.',
    datePublished: DATE_PUBLISHED,
    highlights: [
      'Como descobrir qual exame fazer',
      'Quais exames o SUS realiza',
      'O que fazer em casos urgentes',
      'Exame realizado em outra cidade',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Às vezes sentimos um incômodo, mas não sabemos qual exame fazer — ou sequer qual profissional de saúde procurar. Isso é normal. Você não precisa saber: é o profissional de saúde quem determina se há necessidade de exame e qual tipo.',
      },

      { type: 'heading', level: 2, text: 'O que fazer', icon: 'target' },
      {
        type: 'list',
        items: [
          '1. Agende e realize uma consulta na UBS (postinho de saúde)',
          '2. O médico ou profissional de saúde avalia seu caso',
          '3. Se necessário, ele emite o pedido do exame adequado',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Você não precisa saber o nome do exame antes de ir à UBS. Descreva o incômodo para o profissional e ele determina o que é necessário.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Quais exames o SUS realiza',
        icon: 'shield',
      },
      {
        type: 'paragraph',
        text: 'O SUS cobre praticamente todos os exames diagnósticos, sem custo para você. Não é preciso se preocupar se o exame será pago ou não — basta ter o pedido médico.',
      },
      {
        type: 'info-panel',
        title: 'O SUS realiza todos os exames necessários',
        text: 'Exames laboratoriais, de imagem e procedimentos diagnósticos são oferecidos gratuitamente. A única exceção são exames de fins estéticos ou experimentais — salvo se houver necessidade médica comprovada.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Quando o exame é urgente',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Em casos urgentes — suspeita de doença grave ou piora do estado de saúde — o profissional de saúde precisa indicar expressamente a urgência no pedido de exame. Isso garante prioridade no agendamento.',
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Peça ao médico que escreva "URGENTE" no pedido de exame. Esse registro é fundamental para garantir prioridade no agendamento.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Exame em outra cidade',
        icon: 'location',
      },
      {
        type: 'paragraph',
        text: 'Alguns exames não estão disponíveis em todos os municípios. Se o seu exame precisar ser feito em outra cidade, procure a Secretaria Municipal de Saúde para agendar o exame e o transporte de ida e volta.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Transporte sanitário',
        text: 'O município é obrigado a fornecer transporte quando o exame é realizado em outra cidade. Pergunte sobre isso no momento do agendamento.',
      },
    ],
  },

  {
    slug: 'exame-demorou-muito',
    categorySlug: CATEGORY_SLUG,
    title: 'O que fazer quando o exame demora muito',
    summary:
      'Conheça seus direitos e os caminhos para agir quando o exame está demorando mais do que o aceitável.',
    datePublished: DATE_PUBLISHED,
    highlights: [
      'Quanto tempo é considerado uma longa espera',
      'Como acionar o Disque Saúde (136)',
      'Quando buscar a Defensoria Pública',
      'Como usar a Justiça como último recurso',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Esperar meses por um exame é comum no SUS — mas não significa que você precisa aceitar sem fazer nada. Você tem direitos e há formas de agir.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Quanto tempo é razoável esperar',
        icon: 'chart',
      },
      {
        type: 'paragraph',
        text: 'Não existe prazo único definido em lei para todos os exames. O tempo varia por município, tipo de exame e demanda local. Qualquer demora que prejudique sua saúde não pode acontecer — especialmente em casos urgentes, que devem ser marcados imediatamente.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'O que fazer quando a espera está longa',
        icon: 'target',
      },
      {
        type: 'list',
        items: [
          '1. Volte à UBS e pergunte a previsão — peça para registrar sua reclamação por escrito',
          '2. Vá à Secretaria de Saúde do município com o pedido e explique a urgência',
          '3. Acione o Disque Saúde: 136 (gratuito, 24h) para registrar a demora',
          '4. Procure a Defensoria Pública se o exame for urgente — o atendimento é gratuito',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'Se o exame for urgente',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Em casos urgentes — suspeita de doença grave ou piora do estado de saúde — o médico pode indicar urgência no pedido. Com isso, o agendamento deve ser imediato. Se mesmo assim não for marcado em tempo hábil, acione a Defensoria Pública.',
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso grave',
        text: 'Se o exame não foi agendado em menos de 30 dias e seu caso é grave, não espere — acesse os canais de solução: Secretaria de Saúde, ouvidoria municipal e Disque Saúde (136).',
      },

      {
        type: 'heading',
        level: 2,
        text: 'O que você pode e não pode fazer',
        icon: 'shield',
      },
      {
        type: 'paragraph',
        text: 'Ser assertivo e educado é o que garante que seu pedido seja levado a sério. Há formas certas e erradas de agir — entender a diferença protege o seu caso.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Você pode',
        text: 'Pedir que o exame seja marcado o quanto antes, explicando que a demora está prejudicando sua saúde. Seja comunicativo e direto: "Meu caso é urgente, preciso que este exame seja marcado o quanto antes."',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Você não pode',
        text: 'Ameaçar médicos, atendentes ou qualquer funcionário público, mesmo que ele esteja errado. Mantenha a compostura para não prejudicar o seu caso.',
      },

      { type: 'heading', level: 2, text: 'A judicialização', icon: 'fist' },
      {
        type: 'paragraph',
        text: 'A judicialização deve ser a última tentativa — exceto em casos de urgência ou emergência, onde é fundamental buscar ajuda do Ministério Público ou da Justiça o quanto antes. Se você tentou todas as alternativas (Secretaria de Saúde, ouvidoria municipal, ouvidoria do SUS) sem sucesso, contate um advogado ou a Defensoria Pública.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Guarde todos os documentos',
        text: 'Guarde o pedido de exame, comprovantes de agendamento e qualquer papel que mostre que você tentou marcar. Esses documentos são fundamentais se precisar acionar a Justiça.',
      },
    ],
  },
]
