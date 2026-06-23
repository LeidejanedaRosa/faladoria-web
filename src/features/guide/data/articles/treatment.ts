import type { GuideArticle } from '../guideArticles'
import { DOC_PHOTO_ID, DOC_SUS_CARD } from './articleConstants'

const CATEGORY_SLUG = 'tratamento'
const DATE_PUBLISHED = '2026-05-01'

export const treatmentArticles: GuideArticle[] = [
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
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Peça ao médico que indique "urgência" na prescrição. Se mesmo assim for negado, vá direto ao hospital ou à Defensoria Pública.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar o tratamento',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e consulte um médico',
        imageKey: 'ubs',
        detail: 'Só um profissional de saúde pode prescrever o tratamento.',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde ou local indicado',
        detail: 'Tenha a prescrição, documento com foto e Cartão do SUS.',
      },
      {
        type: 'action-step',
        action: 'Agende informando que é pelo SUS',
        imageKey: 'phone',
        detail:
          'Pergunte sobre preparo necessário, endereço exato e transporte.',
      },
      {
        type: 'action-step',
        action: 'Compareça no dia e horário marcados',
        imageKey: 'checklist',
        detail:
          'Leve todos os documentos. Atrasos podem impedir o atendimento.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Pedido ou prescrição assinado pelo médico',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          'Exames ou laudos solicitados pelo médico',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Se o tratamento for em outra cidade, o município tem obrigação de fornecer transporte gratuito. Pergunte sobre o TFD no momento do agendamento.',
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
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente — risco de vida',
        text: 'Não siga os passos abaixo. Vá direto ao hospital ou à Defensoria Pública. O atendimento é gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer, passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde Municipal',
        imageKey: 'ubs',
        detail:
          'Explique que o tratamento está sendo negado. Exija o número de protocolo.',
      },
      {
        type: 'action-step',
        action: 'Ligue para a Ouvidoria Municipal',
        imageKey: 'phone',
        detail:
          'Registre a reclamação. Guarde o número de protocolo — você vai precisar dele.',
      },
      {
        type: 'action-step',
        action: 'Ligue para a Ouvidoria do SUS: 136',
        detail: 'Gratuito, 24 horas. Informe o protocolo da etapa anterior.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'Leve todos os documentos e os protocolos das tentativas anteriores. O atendimento é gratuito.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar em cada etapa',
        items: [
          'RG ou CNH',
          'Prescrição e laudos médicos',
          'Número de protocolo de cada tentativa anterior',
        ],
      },
    ],
  },
]
