import type { GuideArticle } from '../guideArticles'
import { DOC_PHOTO_ID, DOC_SUS_CARD } from './articleConstants'

const CATEGORY_SLUG = 'vacinacao'
const DATE_PUBLISHED = '2026-05-01'
const WHAT_TO_BRING = 'O que levar'
const IMG_UBS = 'ubs' as const
const IMG_CHECKLIST = 'checklist' as const
const IMG_DOCTOR_PATIENT = 'doctor-patient' as const

export const vaccinationArticles: GuideArticle[] = [
  {
    slug: 'calendario-infantil',
    categorySlug: CATEGORY_SLUG,
    title: 'Calendário infantil',
    summary:
      'Todas as vacinas obrigatórias para crianças de 0 a 9 anos disponíveis gratuitamente no SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Como vacinar seu filho',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS mais próxima',
        imageKey: IMG_UBS,
        detail:
          'A maioria das vacinas do calendário infantil não exige agendamento — basta comparecer durante o horário de funcionamento.',
      },
      {
        type: 'action-step',
        action: 'Leve a caderneta de vacinação da criança',
        imageKey: IMG_CHECKLIST,
        detail:
          'O profissional verifica quais doses estão em dia e registra as novas aplicações na caderneta.',
      },
      {
        type: 'action-step',
        action: 'Avise se a caderneta estiver perdida',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Não é empecilho. Uma nova caderneta pode ser emitida e o histórico de vacinação recuperado pelo sistema nacional.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Calendário de 0 a 9 anos',
      },
      {
        type: 'list',
        items: [
          'Ao nascer: BCG e Hepatite B',
          '2 meses: Pentavalente, VIP (pólio), Pneumocócica 10, Rotavírus',
          '3 meses: Meningocócica C',
          '4 meses: Pentavalente, VIP, Pneumocócica 10, Rotavírus',
          '5 meses: Meningocócica C',
          '6 meses: Pentavalente, VIP, Influenza (anual)',
          '9 meses: Febre Amarela',
          '12 meses: Tríplice viral, Pneumocócica 10, Meningocócica C',
          '15 meses: DTP, VOP, Varicela, Hepatite A',
          '4 anos: DTP, VOP, Tríplice viral, Varicela',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Vacinas em atraso? Não é preciso recomeçar do zero. Leve a caderneta ao postinho — o profissional indica quais doses estão faltando e aplica só o necessário.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [
          'Caderneta de vacinação da criança',
          'Cartão do SUS da criança',
          'Certidão de nascimento',
        ],
      },
    ],
  },
  {
    slug: 'calendario-adulto',
    categorySlug: CATEGORY_SLUG,
    title: 'Calendário do adulto',
    summary:
      'Vacinas recomendadas para adultos e idosos, incluindo gripe, febre amarela e hepatite.',
    datePublished: DATE_PUBLISHED,
    iconName: 'person',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Como atualizar sua vacinação',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS mais próxima',
        imageKey: IMG_UBS,
        detail:
          'Não é preciso receita médica nem agendamento para a maioria das vacinas do calendário do adulto.',
      },
      {
        type: 'action-step',
        action: 'Informe quais vacinas já tomou',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Mostre a caderneta de vacinação, se tiver. Sem ela, relate o que lembrar — o profissional consegue montar um esquema a partir disso.',
      },
      {
        type: 'action-step',
        action: 'Receba as doses em atraso e registre na caderneta',
        imageKey: IMG_CHECKLIST,
        detail:
          'O profissional indicará quais vacinas estão faltando e quais precisam de reforço. Guarde a caderneta para consultas futuras.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Principais vacinas para adultos',
      },
      {
        type: 'list',
        items: [
          'Influenza (gripe) — 1 dose anual, para todos',
          'Hepatite B — 3 doses para quem não se vacinou',
          'dT (difteria e tétano) — reforço a cada 10 anos',
          'Tríplice viral (sarampo, caxumba, rubéola) — 2 doses para nascidos após 1960',
          'Febre Amarela — dose única, válida para toda a vida',
          'Covid-19 — conforme calendário vigente do Ministério da Saúde',
          'Pneumocócica 23 — para idosos a partir de 60 anos',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Para idosos a partir de 60 anos',
        text: 'Além do calendário padrão, idosos têm prioridade na campanha anual de Influenza e direito à Pneumocócica 23 — vacina contra pneumonia bacteriana grave.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: [
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          'Caderneta de vacinação (se tiver)',
        ],
      },
    ],
  },
  {
    slug: 'vacinacao-na-gestacao',
    categorySlug: CATEGORY_SLUG,
    title: 'Vacinação na gestação',
    summary:
      'Quais vacinas são obrigatórias, quais são proibidas e como se vacinar com segurança durante a gravidez.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'callout',
        variant: 'warning',
        title: 'Atenção: algumas vacinas são contraindicadas',
        text: 'Vacinas com vírus vivo (tríplice viral, varicela e febre amarela) são proibidas durante a gravidez. Sempre informe ao vacinador que está grávida antes de receber qualquer dose.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como se vacinar durante a gravidez',
      },
      {
        type: 'action-step',
        action:
          'Informe ao médico do pré-natal que deseja verificar sua situação vacinal',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'A avaliação das vacinas faz parte do acompanhamento pré-natal. O médico indicará quais doses são necessárias e em qual semana da gestação aplicá-las.',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS com a carteira do pré-natal',
        imageKey: IMG_UBS,
        detail:
          'As vacinas recomendadas na gestação são aplicadas gratuitamente. Leve a carteira do pré-natal para que o profissional registre cada dose.',
      },
      {
        type: 'action-step',
        action: 'Registre cada dose na carteira do pré-natal',
        imageKey: IMG_CHECKLIST,
        detail:
          'O registro é essencial para o acompanhamento da gestação e para o médico saber quais doses já foram aplicadas.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Vacinas recomendadas na gestação',
      },
      {
        type: 'list',
        items: [
          'dTpa (difteria, tétano, coqueluche) — 1 dose a cada gestação, entre a 20ª e a 36ª semana',
          'Influenza (gripe) — 1 dose por gestação, em qualquer trimestre',
          'Hepatite B — 3 doses para gestantes não vacinadas anteriormente',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Por que a dTpa é tão importante?',
        text: 'A vacina protege o bebê nos primeiros meses de vida — antes mesmo de ele poder ser vacinado. A imunidade é transferida da mãe pelo cordão umbilical.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Vacinas contraindicadas na gravidez',
      },
      {
        type: 'list',
        items: [
          'Tríplice viral (sarampo, caxumba, rubéola) — contém vírus vivo',
          'Varicela — contém vírus vivo',
          'Febre Amarela — evitada, salvo risco epidemiológico confirmado pelo médico',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        text: 'Tomou uma vacina contraindicada sem saber que estava grávida? Comunique imediatamente ao médico. O risco geralmente é baixo, mas o acompanhamento é necessário.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: WHAT_TO_BRING,
        items: ['Carteira do pré-natal', DOC_SUS_CARD, DOC_PHOTO_ID],
      },
    ],
  },
]
