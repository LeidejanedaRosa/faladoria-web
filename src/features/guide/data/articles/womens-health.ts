import type { GuideArticle } from '../guideArticles'
import {
  DOC_CPF,
  DOC_PHOTO_ID,
  DOC_PROOF_OF_ADDRESS,
  DOC_SUS_CARD,
} from './articleConstants'

const CATEGORY_SLUG = 'saude-da-mulher'
const DATE_PUBLISHED = '2026-05-01'
const IMG_DOCTOR_PATIENT = 'doctor-patient' as const
const IMG_UBS = 'ubs' as const

export const womensHealthArticles: GuideArticle[] = [
  {
    slug: 'pre-natal',
    categorySlug: CATEGORY_SLUG,
    title: 'Como fazer pré-natal pelo SUS',
    summary:
      'O SUS garante consultas, exames e acompanhamento completo durante toda a gestação. Veja como começar.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que o SUS garante',
        text: 'Consultas de pré-natal, ultrassom obstétrico, testes rápidos de HIV e sífilis, hemograma, tipagem sanguínea, glicemia e caderneta da gestante — tudo gratuito pela Rede Cegonha.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como iniciar o pré-natal',
        icon: 'heart',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS assim que descobrir a gravidez',
        imageKey: IMG_UBS,
        detail:
          'O ideal é começar antes das 12 semanas. Gestantes têm prioridade de atendimento — informe na recepção.',
      },
      {
        type: 'action-step',
        action: 'Solicite a caderneta da gestante',
        imageKey: 'checklist',
        detail:
          'Leve a caderneta em todas as consultas. Ela registra exames, medicamentos e a evolução da gestação.',
      },
      {
        type: 'action-step',
        action: 'Realize todos os exames solicitados',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Ultrassom obstétrico, testes rápidos de HIV e sífilis, hemograma e glicemia estão garantidos. Outros exames podem ser pedidos conforme sua necessidade.',
      },
      {
        type: 'action-step',
        action: 'Compareça a todas as consultas',
        imageKey: 'calendar',
        detail:
          'O SUS garante no mínimo 6 consultas. A meta é 7 ou mais. Não falte — cada consulta monitora você e o bebê.',
      },
      {
        type: 'action-step',
        action: 'Conheça a maternidade de referência antes do parto',
        imageKey: IMG_UBS,
        detail:
          'Peça à equipe da UBS o nome e endereço da maternidade onde você será atendida. Você tem direito a um acompanhante de sua escolha durante o trabalho de parto e o parto (Lei 11.108/2005).',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar à primeira consulta',
        items: [
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          DOC_CPF,
          DOC_PROOF_OF_ADDRESS,
          'Resultado de teste de gravidez (se tiver)',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Direito a acompanhante no parto',
        text: 'A Lei 11.108/2005 garante o direito a um acompanhante de sua escolha durante o trabalho de parto, o parto e o pós-parto imediato em todos os serviços do SUS.',
      },
    ],
  },
  {
    slug: 'preventivo-e-mamografia',
    categorySlug: CATEGORY_SLUG,
    title: 'Preventivo e mamografia pelo SUS',
    summary:
      'O SUS oferece rastreamento gratuito do câncer de colo do útero e de mama. Saiba quem deve fazer e com que frequência.',
    datePublished: DATE_PUBLISHED,
    iconName: 'search',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Novidade 2025',
        text: 'O rastreamento do câncer de colo do útero tem um novo exame primário desde 2025: o teste DNA-HPV, mais sensível que o Papanicolau. Onde disponível, ele substitui o preventivo convencional. O Papanicolau segue sendo utilizado onde o DNA-HPV ainda não estiver disponível.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Colo do útero: quem deve fazer e quando',
      },
      {
        type: 'action-step',
        action:
          'Vá à UBS se você tem entre 25 e 64 anos e já teve relação sexual',
        imageKey: IMG_UBS,
        detail:
          'O rastreamento é indicado para qualquer pessoa com colo do útero nessa faixa etária — incluindo mulheres trans e pessoas não-binárias.',
      },
      {
        type: 'action-step',
        action: 'Repita conforme o resultado do exame',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'DNA-HPV negativo: repita em 5 anos. Papanicolau: após 2 resultados normais consecutivos, repita em 3 anos. Após os 64 anos com resultados negativos, o rastreamento pode ser encerrado.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Mama: quem deve fazer e quando',
      },
      {
        type: 'action-step',
        action: 'Solicite mamografia se você tem entre 50 e 74 anos',
        imageKey: IMG_UBS,
        detail:
          'A mamografia de rotina é recomendada a cada 2 anos nessa faixa etária (diretriz atualizada em setembro de 2025, alinhada com evidências IARC/OMS).',
      },
      {
        type: 'action-step',
        action:
          'Procure o serviço de saúde se tiver sintomas, em qualquer idade',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Nódulo endurecido, descarga sanguinolenta, retração mamilar ou alterações na pele da mama são sinais de alerta. Não espere a faixa etária — busque atendimento imediatamente.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [DOC_SUS_CARD, DOC_PHOTO_ID, 'Exames anteriores (se tiver)'],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Detecção precoce salva vidas',
        text: 'O câncer de colo do útero e o câncer de mama têm altas chances de cura quando detectados cedo. Não adie os exames de rastreamento.',
      },
    ],
  },
  {
    slug: 'planejamento-familiar',
    categorySlug: CATEGORY_SLUG,
    title: 'Planejamento familiar pelo SUS',
    summary:
      'O SUS oferece métodos contraceptivos gratuitos, incluindo DIU, pílula e injeção. Laqueadura e vasectomia também são cobertas em condições específicas.',
    datePublished: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que o SUS oferece gratuitamente',
        text: 'Pílula anticoncepcional combinada, pílula de progesterona, injeção mensal, injeção trimestral, DIU de cobre, preservativo masculino e feminino — disponíveis nas UBS. Laqueadura e vasectomia também são cobertas pelo SUS (Lei 9.263/1996).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar os métodos contraceptivos',
        icon: 'users',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e solicite consulta de planejamento familiar',
        imageKey: IMG_UBS,
        detail:
          'O médico ou enfermeiro avaliará sua saúde e indicará o método mais adequado. Não é necessário encaminhamento prévio.',
      },
      {
        type: 'action-step',
        action: 'Retire o método na UBS ou farmácia do SUS',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Pílulas e injeções são distribuídas gratuitamente. O DIU de cobre é inserido por profissional de saúde na própria unidade, sem custo.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Laqueadura e vasectomia: critérios (Lei 9.263/1996)',
        items: [
          'Ter 25 anos ou mais, OU ter pelo menos 2 filhos vivos',
          'Aguardar 60 dias entre a solicitação e a realização do procedimento',
          'Assinar termo de consentimento informado por escrito',
          'Risco de vida comprovado ou gestação decorrente de violência sexual: sem restrição de idade ou número de filhos',
        ],
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos necessários',
        items: [DOC_SUS_CARD, DOC_PHOTO_ID, DOC_CPF, DOC_PROOF_OF_ADDRESS],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Após violência sexual',
        text: 'O SUS oferece contracepção de emergência, profilaxias de HIV e ISTs e acompanhamento psicológico. Procure imediatamente qualquer UPA, pronto-socorro ou serviço especializado — quanto antes, mais eficaz o atendimento.',
      },
    ],
  },
]
