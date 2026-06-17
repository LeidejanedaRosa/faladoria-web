import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'medicamento'
const DATE_PUBLISHED = '2026-05-01'
const INFO_PANEL = 'info-panel' as const

export const medicationArticles: GuideArticle[] = [
  {
    slug: 'farmacia-basica',
    categorySlug: CATEGORY_SLUG,
    title: 'Como retirar medicamento gratuitamente pelo SUS',
    summary:
      'Saiba como retirar medicamentos gratuitos nas farmácias do SUS — o que levar, quais estão disponíveis e o que fazer se estiver em falta.',
    datePublished: DATE_PUBLISHED,
    iconName: 'syringe',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece medicamentos gratuitos para a maioria das doenças comuns — diabetes, hipertensão, tireoide e muitas outras. Você retira na Farmácia do SUS ou na Farmácia Popular mais próxima.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Como retirar o medicamento',
        icon: 'target',
      },
      {
        type: 'paragraph',
        text: 'O caminho começa sempre na UBS. Com a receita médica em mãos, a retirada na farmácia é direta e gratuita.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Consulte um médico na UBS — só o profissional de saúde pode prescrever o medicamento',
          'Com a receita em mãos, vá à farmácia do SUS ou à unidade indicada',
          'Apresente os documentos no balcão e retire o medicamento gratuitamente',
        ],
      },
      {
        type: 'callout',
        text: 'Já usa o medicamento há algum tempo? Se ele estiver cadastrado no sistema, basta levar o Cartão do SUS. A receita só é obrigatória na primeira retirada ou na renovação.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'O que levar',
        icon: 'clipboard',
      },
      {
        type: 'paragraph',
        text: 'Tenha esses três documentos em mãos antes de ir à farmácia.',
      },
      {
        type: 'list',
        items: [
          'Receita médica atualizada',
          'Cartão do SUS',
          'Documento com foto (RG, CNH ou Carteira de Trabalho)',
        ],
      },
      {
        type: 'image',
        imageKey: 'cartao-sus',
        alt: 'Cartão do SUS — documento necessário para retirar medicamento na farmácia',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Tipos de medicamentos disponíveis pelo SUS',
        icon: 'heart',
      },
      {
        type: 'paragraph',
        text: 'O SUS distribui dois grupos de medicamentos — básicos e estratégicos. Qual você precisa depende do diagnóstico do médico.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Medicamentos básicos',
      },
      {
        type: 'paragraph',
        text: 'Destinados à atenção primária — doenças comuns do dia a dia. Retirados nas farmácias do SUS e nas unidades de saúde.',
      },
      {
        type: 'list',
        items: [
          'Diabetes e resistência à insulina',
          'Hipertensão arterial',
          'Hipotireoidismo e hipertireoidismo',
          'Infecções bacterianas e virais comuns',
          'Problemas circulatórios',
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Medicamentos estratégicos',
      },
      {
        type: 'paragraph',
        text: 'Para doenças de notificação compulsória — condições com protocolos especiais de controle pelo Ministério da Saúde. A retirada pode ser feita em pontos específicos indicados pela Secretaria de Saúde.',
      },
      {
        type: 'list',
        items: [
          'Tuberculose',
          'Hanseníase',
          'Malária',
          'Leishmaniose',
          'Dengue grave',
          'DSTs e HIV/AIDS',
        ],
      },
      {
        type: INFO_PANEL,
        title: 'Como saber qual tipo de medicamento preciso?',
        text: 'O médico define isso na consulta. Você não precisa saber antes de ir à UBS. Leve a receita para a farmácia e o atendente orienta onde retirar.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'O que você pode e não pode fazer',
        icon: 'shield',
      },
      {
        type: 'paragraph',
        text: 'Conhecer seus direitos evita abusos — e conhecer os limites evita problemas.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Você pode',
        text: 'Exigir o medicamento mesmo que a farmácia diga que está em falta — o SUS tem obrigação de fornecer ou indicar onde retirar. Falta de estoque não cancela o seu direito.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Você não pode',
        text: 'Usar o Cartão do SUS de outra pessoa para retirar medicamento. O cartão é pessoal e intransferível — o uso indevido configura fraude.',
      },

      {
        type: 'heading',
        level: 2,
        text: 'E se o medicamento estiver em falta ou for negado?',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Falta de estoque não cancela o seu direito. Siga os canais em ordem e guarde o número de protocolo de cada etapa — ele é indispensável nas etapas seguintes.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Peça à farmácia uma alternativa com a mesma finalidade — ou volte ao médico para trocar a receita',
          'Secretaria de Saúde Municipal — pergunte sobre outras farmácias com estoque e registre a ocorrência',
          'Ouvidoria Municipal da prefeitura — registre a reclamação e exija o número de protocolo',
          'Ouvidoria Nacional do SUS — ligue 136 (gratuito, 24h) com o protocolo em mãos',
          'Defensoria Pública — se o estado de saúde estiver piorando, o atendimento é gratuito e pode garantir o medicamento por via judicial',
        ],
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso grave',
        text: 'Se a falta do medicamento oferecer risco à vida, não aguarde todos os passos administrativos. Procure a Defensoria Pública imediatamente — a Justiça pode determinar o fornecimento em menos de 24 horas.',
      },

      {
        type: INFO_PANEL,
        title: 'O SUS aceita receita de médico particular?',
        text: 'Sim. O SUS aceita receitas de atendimento particular. Se alguma farmácia se recusar a entregar o medicamento com receita particular, registre a ocorrência na Ouvidoria do SUS — essa prática não é permitida.',
      },
    ],
  },
  {
    slug: 'medicamentos-alto-custo',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir medicamento de alto custo pelo SUS',
    summary:
      'Saiba como solicitar medicamentos caros pelo Componente Especializado, quais doenças são cobertas e o que fazer se o pedido for negado.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'paragraph',
        text: 'Alguns medicamentos são muito caros e tratam doenças graves de longa duração. O SUS oferece esses medicamentos de forma gratuita pelo Componente Especializado da Assistência Farmacêutica (CEAF).',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'target',
      },
      {
        type: 'paragraph',
        text: 'A solicitação passa pela Secretaria de Saúde do seu estado — não pela UBS. O processo exige receita e laudo do especialista.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Consulte um médico especialista no SUS e obtenha a receita e o laudo médico',
          'Vá à Secretaria de Saúde do seu estado com todos os documentos',
          'Preencha o formulário de solicitação — o atendente vai te ajudar',
          'Aguarde a análise e aprovação do pedido',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'O que levar',
        icon: 'clipboard',
      },
      {
        type: 'paragraph',
        text: 'Leve toda a documentação de uma vez — pedidos incompletos atrasam a análise.',
      },
      {
        type: 'list',
        items: [
          'Receita médica com CRM do médico',
          'Laudo ou relatório médico detalhado',
          'Exames que comprovam o diagnóstico',
          'Cartão do SUS e documento com foto',
          'CPF',
        ],
      },
      {
        type: 'image',
        imageKey: 'cartao-sus',
        alt: 'Cartão do SUS — necessário para solicitar medicamento de alto custo pelo CEAF',
      },

      {
        type: 'heading',
        level: 2,
        text: 'Doenças e condições cobertas pelo CEAF',
        icon: 'heart',
      },
      {
        type: 'paragraph',
        text: 'O CEAF cobre doenças graves e crônicas que exigem tratamento contínuo e de alto custo. A lista é definida pelo Ministério da Saúde.',
      },
      {
        type: 'list',
        items: [
          'Câncer e quimioterapia oral',
          'Transplante de órgãos (imunossupressores)',
          'Hemodiálise e doenças renais crônicas',
          'Alzheimer e doenças neurológicas',
          'Esclerose múltipla',
          'Artrite reumatoide e doenças autoimunes graves',
        ],
      },

      {
        type: 'heading',
        level: 2,
        text: 'E se o medicamento for negado?',
        icon: 'activity',
      },
      {
        type: 'paragraph',
        text: 'Não desista na primeira negativa. Você tem direito ao recurso administrativo e, se necessário, à via judicial. Guarde todos os documentos e protocolos.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Peça por escrito a justificativa da negativa',
          'Acione a Ouvidoria do Estado — registre o caso e exija o número de protocolo',
          'Ligue para o Disque Saúde: 136 com o protocolo em mãos',
          'Procure a Defensoria Pública — em casos urgentes, a Justiça pode garantir o medicamento em menos de 24 horas',
        ],
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Se a demora ou negativa oferecer risco à vida, procure a Defensoria Pública imediatamente. O atendimento é gratuito e a Justiça pode determinar o fornecimento do medicamento por liminar de urgência.',
      },

      {
        type: INFO_PANEL,
        title: 'Quanto tempo demora a aprovação?',
        text: 'O prazo varia por estado e tipo de medicamento, mas o processo costuma levar de 15 a 60 dias. Medicamentos urgentes podem ser autorizados mais rápido — peça ao médico que indique "urgência" no laudo.',
      },
      {
        type: INFO_PANEL,
        title: 'E se eu já usar o medicamento do médico particular?',
        text: 'Você pode solicitar o mesmo medicamento pelo SUS. Apresente a receita e os exames — o SUS avalia pelo diagnóstico, não por quem prescreveu.',
      },
    ],
  },
]
