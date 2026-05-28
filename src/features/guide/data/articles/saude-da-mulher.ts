import type { GuideArticle } from '../guideArticles'

export const saudeDaMulherArticles: GuideArticle[] = [
  {
    slug: 'pre-natal',
    categorySlug: 'saude-da-mulher',
    title: 'Saúde da mulher pelo SUS',
    summary:
      'Exames preventivos, pré-natal e acompanhamento ginecológico disponíveis gratuitamente pelo SUS.',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece uma rede completa de cuidados para a saúde da mulher — do preventivo anual ao pré-natal, passando por exames de imagem e atendimento especializado. Tudo gratuito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Serviços disponíveis para mulheres no SUS',
      },
      {
        type: 'list',
        items: [
          'Consulta ginecológica anual',
          'Papanicolau (exame preventivo do colo do útero) — a partir dos 25 anos',
          'Mamografia — a partir dos 50 anos (ou antes, com indicação médica)',
          'Pré-natal completo (consultas, exames e vacinas)',
          'Planejamento familiar e contracepção gratuita',
          'Parto normal e cesárea pelo SUS',
          'Acompanhamento pós-parto',
          'Tratamento de câncer de mama e colo do útero',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Pré-natal: como funciona',
      },
      {
        type: 'paragraph',
        text: 'Assim que descobrir a gravidez, vá à UBS para iniciar o pré-natal. O ideal é começar antes das 12 semanas. O SUS garante no mínimo 6 consultas durante a gestação, exames de rotina, vacinas e acompanhamento até o parto.',
      },
      {
        type: 'list',
        items: [
          'Leve documento com foto e Cartão do SUS',
          'Informe que está grávida — a UBS tem prioridade de atendimento para gestantes',
          'Solicite a caderneta da gestante para registrar todas as consultas',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Preventivo e mamografia',
      },
      {
        type: 'paragraph',
        text: 'O exame preventivo (Papanicolau) é realizado na própria UBS, sem agendamento prévio em muitos municípios. A mamografia é agendada pela UBS com encaminhamento médico.',
      },
      {
        type: 'callout',
        text: 'Não deixe os exames preventivos em atraso. O câncer de colo do útero e o câncer de mama têm altas chances de cura quando detectados cedo. O SUS oferece diagnóstico e tratamento completo, gratuitamente.',
      },
    ],
  },
]
