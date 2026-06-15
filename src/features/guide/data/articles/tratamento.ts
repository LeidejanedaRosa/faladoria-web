import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'tratamento'
const DATE_PUBLISHED = '2026-05-01'

export const tratamentoArticles: GuideArticle[] = [
  {
    slug: 'como-conseguir-tratamento',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir tratamento pelo SUS',
    summary:
      'Fisioterapia, quimioterapia, reabilitação e outros tratamentos disponíveis gratuitamente — veja como solicitar.',
    datePublished: DATE_PUBLISHED,
    iconName: 'activity',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece todos os tipos de tratamento — fisioterapia, quimioterapia, radioterapia, reabilitação física e muitos outros — de forma gratuita. O caminho começa sempre pela consulta médica.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar o tratamento',
        icon: 'target',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Vá à UBS e consulte um médico — só um profissional de saúde pode prescrever o tratamento',
          'Com a prescrição em mãos, vá à Secretaria de Saúde ou ao local indicado',
          'Agende informando que o atendimento será pelo SUS',
          'Compareça no dia e horário marcados com todos os documentos',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Sem a prescrição médica',
        text: 'Não é possível agendar o tratamento. Se ainda não tem a prescrição, vá à UBS mais próxima com seu Cartão do SUS e documento com foto.',
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
          'Pedido ou prescrição assinado pelo médico',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'Exames ou laudos solicitados pelo médico',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'Agendar o tratamento',
        icon: 'phone',
      },
      {
        type: 'paragraph',
        text: 'Contate a Secretaria de Saúde ou o local indicado pelo médico. Tenha em mãos a prescrição, o documento de identificação e o Cartão do SUS. Ao marcar, informe que o atendimento será pelo SUS.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Perguntas para fazer no agendamento',
        items: [
          'Preciso fazer algum exame antes de iniciar o tratamento?',
          'Quando e onde exatamente será realizado?',
          'Com quanto tempo de antecedência devo chegar?',
          'Se for em outra cidade, como solicito o transporte pelo SUS?',
          'Qual departamento devo acionar se houver algum problema?',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'Comparecer ao tratamento',
        icon: 'person',
      },
      {
        type: 'paragraph',
        text: 'Vá ao local no dia e horário marcados, sem atraso. Leve todos os documentos e siga as orientações do profissional de saúde — quem não cumpre as orientações de preparo pode ser impedido de iniciar o tratamento.',
      },
      {
        type: 'list',
        items: [
          'Separe todos os exames e laudos anteriores relacionados ao tratamento',
          'Confirme o endereço com antecedência e planeje o trajeto',
          'Verifique se está com o Cartão do SUS, RG ou CNH e a prescrição médica',
          'Chegue com antecedência — atrasos podem impedir o atendimento',
          'Siga as orientações do profissional para garantir o resultado do tratamento',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'Tratamento em outra cidade',
        icon: 'location',
      },
      {
        type: 'paragraph',
        text: 'Se o tratamento só estiver disponível em outro município, o SUS é obrigado a fornecer transporte gratuito para o paciente e, quando necessário, para um acompanhante. Solicite o Tratamento Fora do Domicílio (TFD) na UBS ou na Secretaria de Saúde.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'O município tem obrigação de fornecer transporte gratuito de ida e volta quando o tratamento é realizado em outra cidade. Pergunte sobre o TFD no momento do agendamento.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Em caso de urgência',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Se o seu caso é urgente, peça ao médico que indique explicitamente "urgência" na prescrição. Isso acelera o processo e dá base legal para exigir atendimento prioritário.',
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Com a indicação de urgência na prescrição, o agendamento deve ser imediato. Se mesmo assim for negado, procure a Defensoria Pública ou vá direto ao hospital — ninguém pode ser recusado em emergência.',
      },

      {
        type: 'info-panel',
        title: 'Quais tratamentos o SUS cobre?',
        text: 'O SUS cobre todos os tratamentos clinicamente indicados, exceto os estéticos e experimentais. Se o médico indicou, o SUS tem obrigação de fornecer — de fisioterapia e quimioterapia a transplantes e reabilitação.',
      },
    ],
  },

  {
    slug: 'tratamento-negado-ou-demorado',
    categorySlug: CATEGORY_SLUG,
    title: 'O que fazer quando o tratamento é negado ou demora muito',
    summary:
      'Se o SUS negar ou atrasar o seu tratamento, você tem direitos. Conheça os caminhos para exigir o atendimento.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'paragraph',
        text: 'Ter um tratamento negado ou esperar meses sem previsão é frustrante — mas não significa o fim. Você tem direitos garantidos por lei e há caminhos concretos para exigir o atendimento.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Se o tratamento for negado ou a espera muito longa',
        icon: 'target',
      },
      {
        type: 'paragraph',
        text: 'Siga os canais administrativos em ordem. Em cada etapa, exija o número de protocolo do atendimento — as ouvidorias têm obrigação legal de fornecê-lo. Esse número é a prova de que você tentou resolver e será necessário nas etapas seguintes.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Secretaria de Saúde Municipal — explique que seu direito à saúde está sendo desrespeitado e que o município tem obrigação legal de fornecer o tratamento',
          'Ouvidoria Municipal da prefeitura — registre a reclamação e exija o número de protocolo',
          'Ouvidoria Nacional do SUS — ligue 136 (gratuito, 24h) com o protocolo da etapa anterior em mãos',
          'Ministério Público — leve todos os documentos e os protocolos das tentativas anteriores',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Você pode',
        text: 'Pedir que o tratamento seja iniciado o quanto antes, explicando que a demora está prejudicando sua saúde.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Você não pode',
        text: 'Ameaçar médicos, atendentes ou qualquer outro funcionário público, mesmo que ele esteja errado.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Se for urgente',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Em casos urgentes — risco à saúde ou à vida — não siga os passos acima na ordem. Vá diretamente ao hospital com a prescrição médica ou procure o Ministério Público para solicitar uma liminar judicial. A indicação de urgência na prescrição é fundamental.',
      },
      {
        type: 'list',
        items: [
          'Vá ao hospital com a prescrição — o hospital não pode recusar atendimento de emergência',
          'Procure o Ministério Público com toda a documentação',
          'A Justiça pode determinar o início do tratamento por liminar de urgência em menos de 24 horas',
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
        text: 'Para acionar o Ministério Público ou a Justiça, você precisará comprovar que tentou obter o tratamento pelos canais administrativos. Leve esses documentos em cada tentativa de solução.',
      },
      {
        type: 'list',
        items: [
          'Identidade (RG ou CNH)',
          'Prescrição e laudos médicos relacionados ao tratamento',
          'Pedidos de procedimentos assinados pelo médico',
          'Números de protocolo de cada tentativa de solução',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'A judicialização',
        icon: 'fist',
      },
      {
        type: 'paragraph',
        text: 'A judicialização deve ser a última tentativa — exceto em urgências, onde é fundamental buscar a Justiça o quanto antes. Se você tentou todos os canais administrativos sem sucesso, contate a Defensoria Pública ou um advogado.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Guarde todos os documentos',
        text: 'Guarde a prescrição médica, comprovantes de tentativas de agendamento e protocolos de atendimento. Esses documentos são fundamentais se precisar acionar a Justiça.',
      },
      {
        type: 'info-panel',
        title: 'O que é a Defensoria Pública?',
        text: 'É um serviço gratuito do governo que oferece assistência jurídica para quem não pode pagar um advogado. Para casos judiciais, procure a Defensoria Pública do seu estado — você pode acessá-la pessoalmente ou por telefone.',
      },
    ],
  },
]
