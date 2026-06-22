import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'equipamentos'
const DATE_PUBLISHED = '2026-05-01'
const HOW_TO_SECTION = 'Como solicitar'
const IMG_DOCTOR_PATIENT = 'doctor-patient' as const
const REQUIRED_DOCS_TITLE = 'Documentos necessários'
const DOC_SUS_CARD = 'Cartão do SUS'
const DOC_PHOTO_ID = 'Documento com foto (RG ou CNH)'
const DOC_CPF = 'CPF'
const DOC_PROOF_OF_ADDRESS = 'Comprovante de residência'

export const equipmentArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-equipamentos',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar equipamentos pelo SUS',
    summary:
      'Cadeiras de rodas, muletas, órteses e próteses são fornecidos gratuitamente pela Rede de Cuidados à Pessoa com Deficiência.',
    datePublished: DATE_PUBLISHED,
    iconName: 'target',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que o SUS fornece',
        text: 'Cadeiras de rodas, muletas, bengalas, andadores, órteses e próteses — fornecidos gratuitamente pela Rede de Cuidados à Pessoa com Deficiência (RCPD), por meio dos Centros Especializados em Reabilitação (CER) e serviços de reabilitação física.',
      },
      {
        type: 'heading',
        level: 2,
        text: HOW_TO_SECTION,
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Consulte um médico no SUS',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Pode ser o médico de família na UBS ou um especialista — ortopedista, fisiatra ou neurologista, conforme sua necessidade.',
      },
      {
        type: 'action-step',
        action: 'O médico emite laudo e encaminhamento',
        detail:
          'O laudo descreve a condição e indica o equipamento necessário. O encaminhamento direciona ao serviço de reabilitação responsável — ambos são obrigatórios.',
      },
      {
        type: 'action-step',
        action: 'Vá ao CER ou serviço de reabilitação indicado',
        imageKey: 'equipment',
        detail:
          'O Centro Especializado em Reabilitação (CER) faz a avaliação, e quando necessário, a confecção ou adaptação do equipamento. Leve Cartão do SUS, RG, CPF, comprovante de residência, laudo e encaminhamento.',
      },
      {
        type: 'action-step',
        action: 'Aguarde a avaliação e dispensação',
        imageKey: 'calendar',
        detail:
          'O prazo varia conforme o equipamento e o município. Se negado ou com espera muito longa, a Defensoria Pública pode ajudar gratuitamente.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: REQUIRED_DOCS_TITLE,
        items: [
          'Laudo médico descrevendo a condição e o equipamento indicado',
          'Encaminhamento para o serviço de reabilitação',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          DOC_CPF,
          DOC_PROOF_OF_ADDRESS,
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'CPAP, BiPAP e aparelhos auditivos',
        text: 'Esses equipamentos seguem fluxos diferentes e têm redes especializadas próprias. Se você precisar de um deles, consulte os artigos específicos desta categoria.',
      },
      {
        type: 'callout',
        text: 'Se o pedido for negado ou a espera for muito longa, procure a Defensoria Pública. Equipamentos essenciais são direito garantido — e a Justiça frequentemente determina o fornecimento em caráter de urgência.',
      },
    ],
  },
  {
    slug: 'cpap-bipap-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir CPAP ou BiPAP pelo SUS',
    summary:
      'Para apneia do sono moderada a grave, o SUS pode fornecer o equipamento — mas exige diagnóstico confirmado por polissonografia.',
    datePublished: DATE_PUBLISHED,
    iconName: 'activity',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Quando o SUS fornece',
        text: 'CPAP para apneia do sono (SAOS) moderada a grave, confirmada por polissonografia com IAH ≥ 15 eventos por hora. BiPAP é indicado para casos mais complexos: apneia grave sem tolerância ao CPAP, doenças neuromusculares ou insuficiência respiratória crônica.',
      },
      {
        type: 'heading',
        level: 2,
        text: HOW_TO_SECTION,
        icon: 'activity',
      },
      {
        type: 'action-step',
        action: 'Consulte um médico na UBS ou pneumologista',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Relate os sintomas: ronco alto, pausas na respiração durante o sono, sonolência excessiva durante o dia.',
      },
      {
        type: 'action-step',
        action: 'Faça a polissonografia',
        imageKey: 'clock',
        detail:
          'Exame feito durante o sono que confirma o diagnóstico e mede a gravidade. Solicite encaminhamento pelo SUS — pode haver fila de espera.',
      },
      {
        type: 'action-step',
        action: 'O especialista emite laudo com prescrição',
        imageKey: 'checklist',
        detail:
          'O laudo deve confirmar o diagnóstico (SAOS moderada ou grave) e indicar o equipamento necessário — CPAP ou BiPAP.',
      },
      {
        type: 'action-step',
        action: 'Leve o laudo à Secretaria de Saúde',
        imageKey: 'equipment',
        detail:
          'Procure a Central de Regulação ou a Secretaria Municipal de Saúde para solicitar a dispensação do equipamento.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: REQUIRED_DOCS_TITLE,
        items: [
          'Laudo da polissonografia com IAH confirmado',
          'Prescrição médica indicando CPAP ou BiPAP',
          'Encaminhamento do especialista',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          DOC_CPF,
          DOC_PROOF_OF_ADDRESS,
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Acesso pode ser limitado',
        text: 'Muitos municípios têm fila longa ou não dispõem do equipamento em estoque. Se o pedido for negado ou a espera for muito longa, a Defensoria Pública pode ajudar. A Justiça costuma determinar o fornecimento em caráter de urgência nesses casos.',
      },
    ],
  },
  {
    slug: 'aparelho-auditivo-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir aparelho auditivo pelo SUS',
    summary:
      'O SUS fornece aparelhos auditivos gratuitamente, incluindo pilhas e manutenção, por meio dos serviços especializados em saúde auditiva.',
    datePublished: DATE_PUBLISHED,
    iconName: 'chat',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que o SUS oferece',
        text: 'Aparelho de Amplificação Sonora Individual (AASI) para perda auditiva confirmada, bilateral ou unilateral — incluindo adaptação, pilhas e acompanhamento fonoaudiológico continuado, tudo gratuitamente.',
      },
      {
        type: 'heading',
        level: 2,
        text: HOW_TO_SECTION,
        icon: 'chat',
      },
      {
        type: 'action-step',
        action: 'Consulte um médico na UBS ou otorrinolaringologista',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Relate a dificuldade auditiva. O médico solicitará a audiometria e fará o encaminhamento para a rede especializada.',
      },
      {
        type: 'action-step',
        action: 'Faça a audiometria',
        imageKey: 'checklist',
        detail:
          'Exame que confirma o tipo e o grau da perda auditiva. É obrigatório para a indicação do aparelho.',
      },
      {
        type: 'action-step',
        action: 'Vá ao SASA ou CEA com o encaminhamento',
        imageKey: 'ubs',
        detail:
          'O Serviço de Atenção à Saúde Auditiva (SASA) ou o Centro Especializado em Audiologia (CEA), dentro do CER, faz a avaliação fonoaudiológica e seleciona o aparelho adequado.',
      },
      {
        type: 'action-step',
        action: 'Adaptação e acompanhamento',
        imageKey: 'calendar',
        detail:
          'O aparelho é entregue e adaptado no próprio serviço. As consultas de acompanhamento e as pilhas também são fornecidas gratuitamente.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: REQUIRED_DOCS_TITLE,
        items: [
          'Resultado da audiometria',
          'Encaminhamento médico para o SASA ou CEA',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          DOC_CPF,
          DOC_PROOF_OF_ADDRESS,
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Crianças e casos complexos',
        text: 'Crianças com até 3 anos, perdas auditivas unilaterais e casos com condições associadas (neurológicas, síndromes genéticas) são atendidos em centros de alta complexidade, com fluxo diferenciado. Pergunte na UBS sobre o serviço de referência na sua região.',
      },
    ],
  },
]
