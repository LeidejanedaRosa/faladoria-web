import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'cirurgia'
const DATE_PUBLISHED = '2026-05-01'

export const cirurgiaArticles: GuideArticle[] = [
  {
    slug: 'fila-de-cirurgia',
    categorySlug: CATEGORY_SLUG,
    title: 'Como funciona a fila de cirurgia',
    summary:
      'Entenda como funciona a lista de espera para cirurgias eletivas no SUS e como acompanhar sua posição.',
    datePublished: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS realiza cirurgias de todos os tipos — das mais simples às mais complexas, incluindo transplantes. O caminho começa sempre com uma consulta médica.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar uma cirurgia',
        icon: 'clipboard',
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
        icon: 'clipboard',
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
        type: 'callout',
        variant: 'tip',
        title: 'Sem o pedido médico',
        text: 'Não é possível agendar a cirurgia. Se ainda não tem o pedido, vá à UBS mais próxima com seu Cartão do SUS e documento com foto.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Agendar a cirurgia',
        icon: 'phone',
      },
      {
        type: 'paragraph',
        text: 'Contate a Secretaria de Saúde ou o local indicado. Tenha em mãos o pedido autorizado, o documento de identificação e o Cartão do SUS. Ao marcar, informe que o atendimento será pelo SUS.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Perguntas para fazer no agendamento',
        items: [
          'Quais exames preciso apresentar antes da cirurgia?',
          'Quando e onde será realizada a cirurgia?',
          'Com quanto tempo de antecedência devo chegar?',
          'O município oferece transporte se for em outra cidade?',
          'Se o transporte não for fornecido, em qual departamento devo resolver antes de denunciar?',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'Comparecer à cirurgia',
        icon: 'person',
      },
      {
        type: 'paragraph',
        text: 'Vá ao local no dia e horário marcados, sem atraso. Leve todos os documentos e siga as orientações de preparo pré-cirúrgico à risca — quem não cumpre o preparo pode ser impedido de realizar a cirurgia.',
      },
      {
        type: 'list',
        items: [
          'Separe com antecedência todos os exames que o médico pediu para levar',
          'Confirme o endereço com antecedência e planeje o trajeto',
          'Verifique se está com o Cartão do SUS, o RG ou CNH e o pedido de cirurgia',
          'Leve máscara — alguns locais ainda exigem ao entrar',
          'Chegue com antecedência — atrasos podem impedir o atendimento',
          'Siga as orientações médicas no pós-operatório para garantir uma boa recuperação',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'A fila de espera',
        icon: 'chart',
      },
      {
        type: 'paragraph',
        text: 'A maioria das cirurgias eletivas (não urgentes) entra em uma fila de espera. O tempo varia conforme o tipo de cirurgia e a disponibilidade no seu município. Cirurgias urgentes têm prioridade e devem constar no pedido médico como "urgente".',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'O SUS é obrigado a fornecer transporte gratuito para o paciente e um acompanhante quando a cirurgia só pode ser realizada em outro município. Converse na UBS sobre como solicitar.',
      },
      {
        type: 'info-panel',
        title: 'Cirurgias estéticas são cobertas pelo SUS?',
        text: 'Cirurgias estéticas normalmente não são cobertas. A exceção são os casos em que há necessidade médica comprovada — por exemplo, cirurgia reconstrutiva após acidente ou doença. Um médico do SUS precisa indicar e justificar a necessidade.',
      },
    ],
  },

  {
    slug: 'cirurgia-negada',
    categorySlug: CATEGORY_SLUG,
    title: 'O que fazer quando a cirurgia é negada',
    summary:
      'Se o SUS negar sua cirurgia, você tem direitos. Saiba quais são e como agir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'paragraph',
        text: 'Ter uma cirurgia negada ou com prazo indefinido é frustrante — mas não significa o fim. Você tem direitos garantidos por lei e há caminhos concretos para exigir o atendimento.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Se a cirurgia for negada ou a espera muito longa',
        icon: 'target',
      },
      {
        type: 'paragraph',
        text: 'Siga os canais administrativos em ordem. Em cada etapa, exija o número de protocolo do atendimento — as ouvidorias têm obrigação legal de fornecê-lo. Esse número é a prova de que você tentou resolver e será necessário nas etapas seguintes.',
      },
      {
        type: 'list',
        items: [
          '1. Secretaria de Saúde Municipal — explique que seu direito à saúde está sendo desrespeitado e que o município tem obrigação legal de fornecer acesso',
          '2. Ouvidoria Municipal da prefeitura — registre a reclamação e exija o número de protocolo',
          '3. Ouvidoria Nacional do SUS — ligue 136 (gratuito, 24h) com o protocolo da etapa anterior em mãos',
          '4. Ministério Público — leve todos os documentos e os protocolos das tentativas anteriores',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Você pode',
        text: 'Pedir que a cirurgia seja marcada de modo a não esperar meses, já que você precisa dela para eliminar um sofrimento ou risco.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Você não pode',
        text: 'Ameaçar médicos, atendentes ou qualquer outro funcionário público.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Se for urgente',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Em casos urgentes — risco de vida iminente — não siga os passos acima na ordem. Vá diretamente ao hospital com o pedido médico ou procure o Ministério Público para solicitar uma liminar judicial. O pedido médico deve constar em destaque a urgência.',
      },
      {
        type: 'list',
        items: [
          'Vá ao hospital com o pedido médico — o hospital não pode recusar atendimento de emergência',
          'Procure o Ministério Público com toda a documentação',
          'A Justiça pode determinar a realização da cirurgia por liminar de urgência',
        ],
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Pule as etapas administrativas e vá direto à judicialização. Procure a Defensoria Pública — o atendimento é gratuito.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Documentos que você precisa ter',
        icon: 'clipboard',
      },
      {
        type: 'paragraph',
        text: 'Para acionar o Ministério Público ou a Justiça, você precisará comprovar que tentou obter a cirurgia pelos canais administrativos. Leve esses documentos em cada tentativa de solução.',
      },
      {
        type: 'list',
        items: [
          'Identidade (RG ou CNH)',
          'Receituários médicos e laudos relacionados à cirurgia',
          'Pedidos de procedimentos assinados pelo médico',
          'Números de protocolo de cada tentativa de solução',
        ],
      },
      {
        type: 'info-panel',
        title: 'O que é a Defensoria Pública?',
        text: 'É um serviço gratuito do governo que oferece assistência jurídica para quem não pode pagar um advogado. Para casos judiciais, procure a Defensoria Pública do seu estado — você pode acessá-la pessoalmente ou por telefone.',
      },
    ],
  },
]
