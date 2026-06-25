import type { GuideArticle } from '../guideArticles'
import { DOC_PHOTO_ID, DOC_SUS_CARD } from './articleConstants'

const CATEGORY_SLUG = 'atendimento-domiciliar'
const DATE_PUBLISHED = '2026-05-01'

export const homeCareArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-atendimento-domiciliar',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar atendimento domiciliar',
    summary:
      'Se você ou alguém da sua família não consegue ir ao posto de saúde, o SUS pode mandar uma equipe até a sua casa. Veja quem tem direito e como pedir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Quem pode pedir',
        text: 'Pessoas com dificuldade severa de locomoção, em recuperação de cirurgia ou internação, idosos com limitação grave, pessoas com deficiência ou em cuidados paliativos.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como pedir',
        icon: 'clipboard',
      },
      {
        type: 'action-step',
        action: 'Vá ao posto de saúde (UBS)',
        imageKey: 'ubs',
        detail:
          'Explique que a pessoa não consegue se locomover até a unidade.',
      },
      {
        type: 'action-step',
        action: 'Leve laudos ou documentos médicos',
        imageKey: 'checklist',
        detail: 'Qualquer papel que comprove a dificuldade de locomoção.',
      },
      {
        type: 'action-step',
        action: 'O médico faz o encaminhamento',
        imageKey: 'doctor-patient',
        detail:
          'Ele avalia e registra por escrito a necessidade do atendimento em casa.',
      },
      {
        type: 'action-step',
        action: 'A UBS aciona a equipe domiciliar',
        imageKey: 'home-care',
        detail:
          'Ou a Secretaria de Saúde entra em contato para agendar a visita.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar à UBS',
        items: [
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          'Laudo ou receita médica com justificativa',
          'Exames recentes (se tiver)',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'A UBS disse que não tem o serviço?',
        text: 'Não desista. Vá à Secretaria de Saúde do município. Se a negativa persistir, registre no Disque Saúde: 136.',
      },
    ],
  },
]
