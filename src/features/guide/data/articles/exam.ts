import type { GuideArticle } from '../guideArticles'
import { DOC_PHOTO_ID, DOC_SUS_CARD } from './articleConstants'

const CATEGORY_SLUG = 'exame'
const DATE_PUBLISHED = '2026-05-01'

export const examArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-exame',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar exames pelo SUS',
    summary:
      'Saiba como solicitar exames laboratoriais e de imagem pelo SUS, quais documentos levar e o que perguntar no agendamento.',
    datePublished: DATE_PUBLISHED,
    iconName: 'clipboard',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Importante',
        text: 'Você precisa do pedido médico antes de tudo. Sem ele, não é possível agendar o exame.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e consulte um médico',
        imageKey: 'ubs',
        detail: 'O médico avalia e emite o pedido de exame.',
      },
      {
        type: 'action-step',
        action: 'Vá ao local indicado com o pedido',
        imageKey: 'doctor-patient',
        detail: 'Pode ser a Secretaria de Saúde, a UBS ou local credenciado.',
      },
      {
        type: 'action-step',
        action: 'Agende informando que é pelo SUS',
        imageKey: 'phone',
        detail: 'Pergunte sobre preparo necessário, endereço exato e horário.',
      },
      {
        type: 'action-step',
        action: 'Compareça no dia marcado',
        imageKey: 'checklist',
        detail:
          'Leve todos os documentos e siga as orientações de preparo. Atrasos podem impedir o atendimento.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Pedido de exame assinado pelo médico',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
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
    iconName: 'question',
    content: [
      {
        type: 'paragraph',
        text: 'Às vezes sentimos um incômodo, mas não sabemos qual exame fazer. Isso é normal — você não precisa saber. É o profissional de saúde quem determina se há necessidade de exame e qual tipo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Agende uma consulta na UBS',
        imageKey: 'ubs',
        detail:
          'O postinho é a porta de entrada — você não precisa saber o nome do exame.',
      },
      {
        type: 'action-step',
        action: 'O médico avalia seu caso',
        imageKey: 'doctor-patient',
        detail:
          'Descreva o que sente. O profissional determina se há necessidade de exame.',
      },
      {
        type: 'action-step',
        action: 'O médico emite o pedido do exame',
        detail: 'Com o pedido em mãos, você já pode agendar o exame.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Você não precisa saber o nome do exame antes de ir à UBS. Descreva o incômodo e o profissional determina o que é necessário.',
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Peça ao médico que escreva "URGENTE" no pedido de exame. Esse registro é fundamental para garantir prioridade no agendamento.',
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
    iconName: 'chart',
    content: [
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso grave ou urgente',
        text: 'Se o exame não foi agendado e o seu caso é grave, não espere. Vá diretamente à Defensoria Pública. O atendimento é gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer, passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Volte à UBS e registre a reclamação',
        imageKey: 'ubs',
        detail: 'Pergunte a previsão e peça que a reclamação seja registrada.',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde com o pedido',
        detail: 'Explique a urgência e peça prioridade no agendamento.',
      },
      {
        type: 'action-step',
        action: 'Ligue para o Disque Saúde: 136',
        imageKey: 'phone',
        detail: 'Gratuito, 24 horas. Registre a demora e anote o protocolo.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'Se o exame for urgente, o atendimento é gratuito e pode resolver em dias.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar em cada etapa',
        items: [
          'Pedido de exame',
          'Cartão do SUS e RG',
          'Número de protocolo de cada tentativa anterior',
        ],
      },
    ],
  },
]
