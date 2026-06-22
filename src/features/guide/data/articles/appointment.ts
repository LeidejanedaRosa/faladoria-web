import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'consulta'
const DATE_PUBLISHED = '2026-05-01'

export const appointmentArticles: GuideArticle[] = [
  {
    slug: 'como-agendar-consulta',
    categorySlug: CATEGORY_SLUG,
    title: 'Como agendar uma consulta',
    summary:
      'Veja como agendar consultas pelo SUS, quais especialidades estão disponíveis e quais são os prazos.',
    datePublished: DATE_PUBLISHED,
    iconName: 'clipboard',
    content: [
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Se a situação for grave — dor intensa, dificuldade para respirar ou risco de vida — ligue para o SAMU (192) ou vá ao pronto-socorro mais próximo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como agendar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS mais próxima',
        imageKey: 'ubs',
        detail: 'Também chamada de postinho. Não sabe onde fica? Ligue 136.',
      },
      {
        type: 'action-step',
        action: 'Informe que quer agendar uma consulta',
        imageKey: 'doctor-patient',
        detail:
          'O atendente verifica a disponibilidade e marca o horário para você.',
      },
      {
        type: 'action-step',
        action: 'Vá no dia e horário marcados',
        imageKey: 'calendar',
        detail: 'Chegue 15 minutos antes com os documentos.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Cartão do SUS — se não tiver, o postinho emite na hora',
          'Documento com foto (RG, CNH ou Carteira de Trabalho)',
        ],
      },
    ],
  },
  {
    slug: 'consulta-especialista',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir consulta com especialista',
    summary:
      'Para consultar um especialista pelo SUS é preciso passar por uma etapa antes. Entenda como funciona.',
    datePublished: DATE_PUBLISHED,
    iconName: 'person',
    content: [
      {
        type: 'paragraph',
        text: 'No SUS, para consultar um especialista — cardiologista, ortopedista, dermatologista, entre outros — normalmente é preciso passar primeiro pelo médico da UBS.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O caminho passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e marque uma consulta',
        imageKey: 'ubs',
        detail: 'O médico de família ou clínico geral vai te atender.',
      },
      {
        type: 'action-step',
        action: 'O médico faz a avaliação',
        imageKey: 'doctor-patient',
        detail:
          'Se necessário, ele emite um encaminhamento para o especialista.',
      },
      {
        type: 'action-step',
        action: 'Agende a consulta com o especialista',
        imageKey: 'calendar',
        detail:
          'O médico da UBS informa onde agendar — pode ser na Secretaria de Saúde ou em um ambulatório.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'O SUS oferece atendimento em todas as especialidades médicas, gratuitamente. O encaminhamento existe para organizar o fluxo — não para te impedir de ser atendido.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Espera muito longa?',
        text: 'Fale com a Secretaria de Saúde do seu município, acione a Ouvidoria do SUS (136) ou, em último caso, considere a judicialização.',
      },
    ],
  },
]
