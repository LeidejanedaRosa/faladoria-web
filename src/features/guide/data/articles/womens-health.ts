import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'saude-da-mulher'
const DATE_PUBLISHED = '2026-05-01'

export const womensHealthArticles: GuideArticle[] = [
  {
    slug: 'pre-natal',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde da mulher pelo SUS',
    summary:
      'Exames preventivos, pré-natal e acompanhamento ginecológico disponíveis gratuitamente pelo SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece uma rede completa de cuidados para a saúde da mulher — do preventivo anual ao pré-natal, passando por exames de imagem e atendimento especializado. Tudo gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Pré-natal: como começar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS assim que descobrir a gravidez',
        imageKey: 'ubs',
        detail:
          'O ideal é começar antes das 12 semanas. Informe que está grávida — gestantes têm prioridade.',
      },
      {
        type: 'action-step',
        action: 'Solicite a caderneta da gestante',
        imageKey: 'checklist',
        detail:
          'Registre todas as consultas. O SUS garante no mínimo 6 consultas durante a gestação.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: ['Documento com foto', 'Cartão do SUS'],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Outros serviços disponíveis',
      },
      {
        type: 'list',
        items: [
          'Consulta ginecológica anual',
          'Papanicolau (preventivo do colo do útero) — a partir dos 25 anos',
          'Mamografia — a partir dos 50 anos (ou antes, com indicação médica)',
          'Planejamento familiar e contracepção gratuita',
          'Parto normal e cesárea pelo SUS',
          'Tratamento de câncer de mama e colo do útero',
        ],
      },
      {
        type: 'callout',
        text: 'Não deixe os exames preventivos em atraso. O câncer de colo do útero e o câncer de mama têm altas chances de cura quando detectados cedo.',
      },
    ],
  },
]
