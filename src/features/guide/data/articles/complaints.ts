import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'denuncias'
const DATE_PUBLISHED = '2026-05-01'

export const complaintsArticles: GuideArticle[] = [
  {
    slug: 'o-que-denunciar',
    categorySlug: CATEGORY_SLUG,
    title: 'O que denunciar e por quê',
    summary:
      'Denunciar irregularidades no SUS é um direito — e uma forma de proteger não só você, mas todas as pessoas que dependem do mesmo serviço.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'megaphone',
    content: [
      {
        type: 'callout',
        text: 'Denunciar não é frescura — é o que faz o SUS melhorar. Quando você registra um problema, ele passa a constar oficialmente. A gestão é obrigada a responder.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que você pode denunciar',
      },
      {
        type: 'list',
        items: [
          'Mau atendimento: grosseria, falta de respeito ou recusa sem justificativa',
          'Demora excessiva para conseguir consulta, exame, cirurgia, tratamento ou medicamento',
          'Negativa de atendimento na UBS ou em qualquer unidade do SUS',
          'Falta de médico, medicamento ou estrutura mínima na unidade de saúde',
          'Cobrança por qualquer serviço do SUS — isso é crime',
          'Unidade de saúde sem telefone ou sem horário de atendimento ao público',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quando denunciar',
      },
      {
        type: 'paragraph',
        text: 'Sempre que o SUS negar um pedido relacionado à saúde ou demorar além do razoável para o que você precisa. Não precisa ser urgente para denunciar.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Por que denunciar vale a pena',
        text: 'Quando você denuncia, o problema passa a ser oficial. Isso protege você em etapas futuras — e pode ajudar outras pessoas que enfrentam o mesmo problema na mesma unidade.',
      },
    ],
  },
  {
    slug: 'canais-de-denuncia',
    categorySlug: CATEGORY_SLUG,
    title: 'Como denunciar, passo a passo',
    summary:
      'Siga a escalada certa: Secretaria Municipal, Ouvidoria, 136, Ministério Público e Defensoria — nessa ordem, guardando os protocolos.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'target',
    content: [
      {
        type: 'callout',
        variant: 'warning',
        title: 'Caso urgente?',
        text: 'Se houver risco de vida, vá direto ao Ministério Público, à Defensoria Pública ou ao Judiciário. O Judiciário pode agir em até 72 horas com uma liminar de urgência.',
      },
      {
        type: 'paragraph',
        text: 'Para casos sem risco imediato de vida, siga os passos em ordem. Em cada etapa, guarde o número de protocolo — você vai precisar dele na próxima.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer, passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria Municipal de Saúde',
        imageKey: 'ubs',
        detail:
          'Explique o problema. Se mandarem você de volta ao mesmo lugar onde já tentou, diga isso claramente e insista que é responsabilidade da Secretaria resolver.',
      },
      {
        type: 'action-step',
        action: 'Registre na Ouvidoria Municipal',
        detail:
          'Procure na prefeitura da sua cidade. Descreva tudo: o que aconteceu, onde e quando. Exija o número de protocolo — a prefeitura tem prazo legal para responder.',
      },
      {
        type: 'action-step',
        action: 'Ligue para a Ouvidoria Nacional: 136',
        imageKey: 'phone',
        detail:
          'Gratuito, funciona 24 horas. Tenha em mãos o protocolo da Ouvidoria Municipal. Anote o protocolo desta ligação também.',
      },
      {
        type: 'action-step',
        action: 'Procure o Ministério Público',
        imageKey: 'patient-rights',
        detail:
          'Leve todos os documentos e protocolos. O MP pode obrigar a prefeitura a resolver — e atua de forma independente do governo municipal.',
      },
      {
        type: 'action-step',
        action: 'Acione a Defensoria Pública ou o Judiciário',
        detail:
          'A Defensoria atende gratuitamente. Em casos urgentes, um juiz pode emitir uma liminar em até 72 horas obrigando o Estado a agir.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar em todas as etapas',
        items: [
          'Cartão do SUS e documento com foto',
          'Receitas, laudos e pedidos de exame',
          'Número de protocolo de cada tentativa anterior',
        ],
      },
    ],
  },
  {
    slug: 'ouvidoria-do-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Ouvidoria do SUS: o que é e como usar',
    summary:
      'A Ouvidoria é o canal oficial para registrar reclamações. O protocolo que ela gera é sua garantia em todas as etapas seguintes.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'phone',
    content: [
      {
        type: 'paragraph',
        text: 'A Ouvidoria do SUS recebe reclamações, denúncias, sugestões e elogios sobre qualquer serviço de saúde pública. O registro é gratuito, confidencial e gera um número de protocolo oficial.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como registrar sua denúncia',
        icon: 'phone',
      },
      {
        type: 'action-step',
        action: 'Ligue para o 136',
        imageKey: 'phone',
        detail:
          'Gratuito, 24 horas por dia. Informe o problema, o local e o que você já tentou resolver. Anote o número de protocolo que te darão ao final.',
      },
      {
        type: 'action-step',
        action: 'Ou registre pela internet',
        detail:
          'Acesse gov.br/saude e procure "Ouvidoria do SUS". Você pode registrar a qualquer hora, inclusive de forma anônima.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Por que o protocolo é fundamental',
        icon: 'clipboard',
      },
      {
        type: 'list',
        items: [
          'É a prova oficial de que você tentou resolver antes de escalar o problema',
          'Sem protocolo, o Ministério Público pode pedir que você tente pela Ouvidoria primeiro',
          'Com o protocolo em mãos, o MP e a Defensoria conseguem agir mais rápido',
          'Guarde o número: sem ele, fica difícil provar que você já reclamou',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Prazo de resposta',
        text: 'O prazo para a Ouvidoria responder é de até 30 dias úteis. Se não houver retorno no prazo, leve o protocolo diretamente ao Ministério Público.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Você pode denunciar de forma anônima. Mas se informar seus dados, fica mais fácil receber retorno sobre o que foi feito para resolver o problema.',
      },
    ],
  },
]
