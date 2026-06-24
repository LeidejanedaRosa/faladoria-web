import type { GuideArticle } from '../guideArticles'
import { DOC_PHOTO_ID, DOC_SUS_CARD } from './articleConstants'

const CATEGORY_SLUG = 'saude-mental'
const DATE_PUBLISHED = '2026-05-01'
const WHAT_TO_BRING = 'O que levar'
const IMG_UBS = 'ubs' as const
const IMG_CHECKLIST = 'checklist' as const

export const mentalHealthArticles: GuideArticle[] = [
  {
    slug: 'consulta-psicologo-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Consulta com psicólogo pelo SUS',
    summary:
      'Como marcar atendimento psicológico gratuito pelo SUS, sem plano de saúde e sem precisar de diagnóstico.',
    datePublished: DATE_PUBLISHED,
    iconName: 'chat',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Como conseguir o atendimento',
      },
      {
        type: 'action-step',
        action:
          'Vá à UBS e diga que precisa de apoio emocional ou de saúde mental',
        imageKey: IMG_UBS,
        detail:
          'Não precisa de diagnóstico nem de encaminhamento prévio. Qualquer pessoa tem direito — sentir-se sobrecarregado ou triste já é motivo suficiente.',
      },
      {
        type: 'action-step',
        action: 'Fale com o médico ou enfermeiro sobre o que está sentindo',
        imageKey: 'doctor-patient',
        detail:
          'Não precisa usar termos técnicos. Diga como você está no dia a dia — o profissional faz as perguntas certas e indica o melhor caminho.',
      },
      {
        type: 'action-step',
        action: 'Receba o atendimento na UBS ou o encaminhamento ao CAPS',
        imageKey: IMG_CHECKLIST,
        detail:
          'Muitas UBS têm psicólogo do NASF (Núcleo de Apoio à Saúde da Família). Se não tiver, você será encaminhado ao CAPS do seu território.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde você pode ser atendido',
      },
      {
        type: 'list',
        items: [
          'UBS — psicólogo do NASF, para acompanhamento de casos leves e moderados',
          'CAPS — Centro de Atenção Psicossocial, para casos que precisam de mais suporte',
          'CAPS AD — especializado em dependência de álcool e outras drogas',
          'CAPS i — exclusivo para crianças e adolescentes até 17 anos',
          'Clínicas-escola — atendimento gratuito por estudantes de psicologia supervisionados',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Não precisa de diagnóstico para pedir ajuda',
        text: 'Sentir-se sobrecarregado, ansioso, sem vontade de nada ou triste por muito tempo já é motivo para buscar atendimento. Você não precisa provar que está doente.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [DOC_SUS_CARD, DOC_PHOTO_ID],
      },
    ],
  },
  {
    slug: 'caps-o-que-e-e-como-funciona',
    categorySlug: CATEGORY_SLUG,
    title: 'O que é o CAPS e como funciona',
    summary:
      'Centro de Atenção Psicossocial: quem pode ser atendido, o que oferece e como acessar — sem precisar de encaminhamento.',
    datePublished: DATE_PUBLISHED,
    iconName: 'building',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar o CAPS',
      },
      {
        type: 'action-step',
        action: 'Vá diretamente ao CAPS ou peça encaminhamento na UBS',
        imageKey: IMG_UBS,
        detail:
          'Na maioria dos municípios não é preciso encaminhamento — qualquer pessoa pode ir ao CAPS e pedir acolhimento.',
      },
      {
        type: 'action-step',
        action: 'Passe pelo acolhimento com psicólogo ou assistente social',
        imageKey: 'doctor-patient',
        detail:
          'O primeiro atendimento avalia sua situação e define quais serviços são mais adequados. Não há julgamento.',
      },
      {
        type: 'action-step',
        action: 'Siga o plano de cuidados individual',
        imageKey: IMG_CHECKLIST,
        detail:
          'O CAPS monta um plano para cada pessoa — pode incluir consultas individuais, grupos terapêuticos, medicamentos gratuitos e acompanhamento familiar.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que o CAPS oferece',
      },
      {
        type: 'list',
        items: [
          'Consultas com psiquiatra e psicólogo',
          'Grupos terapêuticos e oficinas',
          'Atendimento à família',
          'Medicamentos psiquiátricos gratuitos',
          'Acompanhamento em crises — CAPS III funciona 24 horas',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Não sabe onde fica o CAPS da sua cidade?',
        text: 'Pergunte na UBS mais próxima, ligue para o Disque Saúde (136) ou pesquise pelo CNES (Cadastro Nacional de Estabelecimentos de Saúde) no site do Ministério da Saúde.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Tipos de CAPS',
      },
      {
        type: 'list',
        items: [
          'CAPS I — municípios com mais de 20 mil habitantes',
          'CAPS II — municípios com mais de 70 mil habitantes',
          'CAPS III — funciona 24h, 7 dias por semana, com leitos de acolhimento noturno',
          'CAPSi — exclusivo para crianças e adolescentes até 17 anos',
          'CAPS AD — para dependência de álcool e outras drogas',
          'CAPS AD III — funciona 24h, com acolhimento noturno para dependência química',
        ],
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [DOC_SUS_CARD, DOC_PHOTO_ID],
      },
    ],
  },
  {
    slug: 'crise-de-saude-mental-o-que-fazer',
    categorySlug: CATEGORY_SLUG,
    title: 'Crise de saúde mental — o que fazer',
    summary:
      'Onde buscar ajuda imediata em uma crise emocional intensa, pensamentos suicidas ou crise psiquiátrica.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Em crise ou com pensamentos suicidas',
        highlight: '188',
        text: 'CVV — Centro de Valorização da Vida. Ligação gratuita, 24 horas, todos os dias. Também pelo chat em cvv.org.br.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde buscar ajuda agora',
      },
      {
        type: 'action-step',
        action: 'Ligue 188 (CVV) ou 192 (SAMU) se houver risco imediato',
        imageKey: 'phone',
        detail:
          'O 188 é para crise emocional e pensamentos suicidas. O 192 (SAMU) é para risco físico imediato, agitação intensa ou overdose.',
      },
      {
        type: 'action-step',
        action: 'Vá ao CAPS III se houver um na sua cidade',
        imageKey: IMG_UBS,
        detail:
          'O CAPS III funciona 24 horas e é o serviço indicado para crises de saúde mental. Não precisa de encaminhamento — basta chegar.',
      },
      {
        type: 'action-step',
        action: 'Vá à UPA ou ao pronto-socorro para atendimento imediato',
        imageKey: 'ambulance',
        detail:
          'A UPA estabiliza a crise e encaminha ao CAPS. É a opção quando não há CAPS III disponível ou quando há risco físico.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'CAPS III ou UPA — quando ir a cada um',
      },
      {
        type: 'list',
        items: [
          'Vá ao CAPS III: crise emocional intensa, pensamentos suicidas sem tentativa, sofrimento que não passa',
          'Vá à UPA ou pronto-socorro: tentativa de suicídio, overdose, agitação intensa, risco físico imediato',
          'Ligue 192 (SAMU): quando não houver condições de ir sozinho ou a situação for grave',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Se outra pessoa estiver em surto',
        text: 'Não tente conter fisicamente uma pessoa em crise agitada. Fique calmo, afaste objetos perigosos e ligue 192. Aguarde o SAMU.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como ajudar alguém com pensamentos suicidas',
      },
      {
        type: 'list',
        items: [
          'Pergunte diretamente — isso não aumenta o risco, pelo contrário, demonstra que você se importa',
          'Ouça sem julgamento e sem minimizar o que a pessoa sente',
          'Não deixe a pessoa sozinha',
          'Afaste medicamentos, objetos cortantes ou outros meios de se machucar',
          'Ligue 188 junto com a pessoa ou a acompanhe ao CAPS ou UPA',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Pensamentos suicidas recorrentes, mesmo sem crise aguda, têm tratamento. Procure o CAPS ou a UBS — falar sobre isso é o primeiro passo.',
      },
    ],
  },
]
