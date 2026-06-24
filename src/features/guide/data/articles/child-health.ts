import type { GuideArticle } from '../guideArticles'
import {
  DOC_CPF,
  DOC_PHOTO_ID,
  DOC_PROOF_OF_ADDRESS,
  DOC_SUS_CARD,
} from './articleConstants'

const CATEGORY_SLUG = 'saude-da-crianca'
const DATE_PUBLISHED = '2026-05-01'
const IMG_UBS = 'ubs' as const
const IMG_CHECKLIST = 'checklist' as const
const IMG_DOCTOR_PATIENT = 'doctor-patient' as const
const WHAT_TO_BRING = 'O que levar'

export const childHealthArticles: GuideArticle[] = [
  {
    slug: 'triagem-neonatal',
    categorySlug: CATEGORY_SLUG,
    title: 'Testes obrigatórios do recém-nascido pelo SUS',
    summary:
      'O SUS garante gratuitamente cinco triagens para todo bebê. Saiba quais são, quando fazer e o que fazer se a maternidade não realizou todos.',
    datePublished: DATE_PUBLISHED,
    iconName: 'syringe',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cinco testes gratuitos e obrigatórios',
        text: 'Todo bebê tem direito a: Teste do Pezinho, Teste do Olhinho, Teste da Orelhinha, Teste do Coraçãozinho e Teste da Linguinha. São gratuitos pelo SUS — a maioria é feita ainda na maternidade.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'O Pezinho tem prazo crítico',
        text: 'O prazo ideal é entre o 3º e o 5º dia de vida. Após o 30º dia, alguns resultados podem ser inconclusivos. Se o prazo passou, vá à UBS mesmo assim — o médico orientará o que fazer.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como garantir os testes',
        icon: 'clipboard',
      },
      {
        type: 'action-step',
        action: 'Antes da alta, pergunte quais testes foram realizados',
        imageKey: IMG_CHECKLIST,
        detail:
          'O Coraçãozinho (oximetria) e o Olhinho (reflexo vermelho) costumam ser feitos ainda na maternidade. Anote quais foram concluídos.',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS entre o 3º e o 5º dia de vida para o Pezinho',
        imageKey: IMG_UBS,
        detail:
          'Não espere o retorno da maternidade. O prazo ideal é entre o 3º e o 5º dia de vida — pode ser feito até o 30º dia, mas quanto antes, melhor.',
      },
      {
        type: 'action-step',
        action: 'Pergunte na UBS sobre a Orelhinha e a Linguinha',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'A Orelhinha pode ser feita na UBS ou em serviços credenciados. A Linguinha é avaliada por dentista ou fonoaudiólogo — a UBS indica onde ir.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que cada teste detecta',
        icon: 'search',
      },
      {
        type: 'list',
        items: [
          'Pezinho (Triagem Neonatal): até 50 doenças — hipotireoidismo, fenilcetonúria, anemia falciforme e outras',
          'Olhinho (Reflexo Vermelho): catarata congênita, glaucoma e tumores oculares',
          'Orelhinha (PEATE): perda auditiva congênita',
          'Coraçãozinho (Oximetria de Pulso): cardiopatias congênitas',
          'Linguinha (Frênulo Lingual): frênulo curto que dificulta amamentação e fala',
        ],
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [DOC_SUS_CARD, DOC_PHOTO_ID, 'Cartão de alta da maternidade'],
      },
    ],
  },

  {
    slug: 'puericultura',
    categorySlug: CATEGORY_SLUG,
    title: 'Puericultura: acompanhamento da criança pelo SUS',
    summary:
      'Consultas gratuitas de crescimento e desenvolvimento do nascimento até os 10 anos. Saiba o cronograma, o que é avaliado e como agendar na UBS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que o SUS garante',
        text: 'Consultas de puericultura gratuitas na UBS desde os primeiros dias de vida: avaliação de peso, altura, desenvolvimento neuromotor, alimentação, visão, audição, saúde bucal e situação vacinal.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como agendar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS na primeira semana de vida do bebê',
        imageKey: IMG_UBS,
        detail:
          'A primeira consulta deve acontecer nos primeiros 15 dias de vida. Leve a carteira de vacinação da maternidade e o cartão de alta.',
      },
      {
        type: 'action-step',
        action: 'Solicite a Caderneta de Saúde da Criança',
        imageKey: IMG_CHECKLIST,
        detail:
          'A caderneta é o documento de saúde do seu filho. Guarde-a com cuidado e leve-a em todas as consultas, vacinações e atendimentos de saúde.',
      },
      {
        type: 'action-step',
        action: 'Agende as próximas consultas antes de sair da UBS',
        imageKey: 'calendar',
        detail:
          'A UBS pode deixar as próximas consultas agendadas ao final de cada visita. Aproveite para perguntar sobre as próximas vacinas também.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cronograma de consultas',
        icon: 'clipboard',
      },
      {
        type: 'list',
        items: [
          'Primeiros 15 dias de vida',
          '1 mês',
          '2 meses',
          '4 meses',
          '6 meses',
          '9 meses',
          '12 meses',
          '18 meses',
          '24 meses',
          'Anualmente a partir dos 2 anos',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que é avaliado nas consultas',
        icon: 'activity',
      },
      {
        type: 'list',
        items: [
          'Peso, altura e circunferência da cabeça (curva de crescimento)',
          'Desenvolvimento neuromotor: sentar, engatinhar, andar, falar',
          'Alimentação: amamentação, introdução alimentar, qualidade da dieta',
          'Audição e visão',
          'Saúde bucal',
          'Situação vacinal — doses em dia ou atrasadas',
          'Comportamento e saúde emocional',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Bolsa Família e puericultura',
        text: 'Crianças de 0 a 7 anos beneficiárias do Bolsa Família precisam cumprir o acompanhamento de saúde como condição do benefício. Se alguma consulta ficou para trás, regularize na UBS — não deixe o benefício ser suspenso.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          'Caderneta de Saúde da Criança',
          'Carteira de vacinação',
        ],
      },
    ],
  },

  {
    slug: 'saude-bucal-da-crianca',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde bucal da criança pelo SUS',
    summary:
      'O SUS oferece dentista para crianças desde o primeiro dente. Saiba quando começar, o que está incluído e como agendar.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Dentes de leite também precisam de cuidado',
        text: 'Cárie na infância não é normal — é uma doença que pode comprometer o dente permanente. O SUS oferece prevenção, tratamento e orientação desde o primeiro dente, gratuitamente.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como agendar a primeira consulta',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Leve a criança ao dentista assim que o primeiro dente nascer',
        imageKey: IMG_UBS,
        detail:
          'O ideal é ir com 1 ano de idade, no máximo. A UBS tem dentista disponível — pergunte na recepção sobre o agendamento.',
      },
      {
        type: 'action-step',
        action: 'Na consulta, peça o acompanhamento preventivo regular',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'O dentista avalia os dentes, aplica flúor e orienta sobre higiene bucal. Consultas semestrais são o ideal para crianças — aproveite para já agendar a próxima.',
      },
      {
        type: 'action-step',
        action: 'Leve os documentos da criança e do responsável',
        imageKey: IMG_CHECKLIST,
        detail:
          'Menores de 18 anos precisam de um responsável legal presente na consulta com documento de identidade.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que o SUS oferece para crianças',
        icon: 'heart',
      },
      {
        type: 'list',
        items: [
          'Consultas preventivas e de rotina',
          'Aplicação de flúor gel — gratuita e disponível na UBS',
          'Selante de fóssulas e fissuras (proteção contra cárie nos molares)',
          'Tratamento de cárie (restaurações)',
          'Extração quando necessário',
          'Orientação de higiene bucal para criança e responsável',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Flúor na UBS — sem precisar de consulta',
        text: 'Muitas UBSs oferecem bochecho fluoretado e flúor gel para crianças sem necessidade de agendamento odontológico. Pergunte na sua UBS se o serviço está disponível.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Para casos mais complexos: CEO',
        text: 'O Centro de Especialidades Odontológicas (CEO) oferece canal, periodontia, cirurgia oral menor e atendimento a crianças com necessidades especiais — tudo gratuito. O encaminhamento é feito pelo dentista ou médico da UBS.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [DOC_SUS_CARD, DOC_CPF, DOC_PROOF_OF_ADDRESS, DOC_PHOTO_ID],
      },
    ],
  },
]
