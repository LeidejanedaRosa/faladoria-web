import type { GuideArticle } from '../guideArticles'
import { DOC_PHOTO_ID, DOC_SUS_CARD } from './articleConstants'

const CATEGORY_SLUG = 'vacinacao'
const DATE_PUBLISHED = '2026-05-01'

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
        type: 'paragraph',
        text: 'O Brasil tem um dos melhores calendários de vacinação infantil do mundo — e todas as vacinas são gratuitas na UBS. Leve a caderneta de vacinação e compareça sem precisar de agendamento.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Vacinas por idade',
      },
      {
        type: 'list',
        items: [
          'Ao nascer: BCG (tuberculose) e Hepatite B',
          '2 meses: Pentavalente, VIP (pólio), Pneumocócica, Rotavírus',
          '3 meses: Meningocócica C',
          '4 meses: Pentavalente, VIP, Pneumocócica, Rotavírus',
          '5 meses: Meningocócica C',
          '6 meses: Pentavalente, VIP, Influenza (anual)',
          '9 meses: Febre Amarela',
          '12 meses: Tríplice viral, Meningocócica C, Pneumocócica',
          '15 meses: DTP, VOP, Varicela, Hepatite A',
          '4 anos: DTP, VOP, Tríplice viral, Varicela',
        ],
      },
      {
        type: 'callout',
        text: 'Perdeu alguma vacina? Não precisa começar do zero. Leve a caderneta ao postinho e o profissional indica quais estão em atraso.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
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
        type: 'paragraph',
        text: 'Adultos e idosos também têm vacinas gratuitas disponíveis pelo SUS. A vacinação protege contra doenças graves e reforça a imunidade de quem ficou sem vacinar na infância.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Principais vacinas para adultos',
      },
      {
        type: 'list',
        items: [
          'Influenza (gripe) — anual, para todos os adultos',
          'Hepatite B — 3 doses para quem não foi vacinado',
          'Febre Amarela — dose única válida para toda a vida',
          'Tríplice Viral — para quem não tomou na infância',
          'dT (difteria e tétano) — reforço a cada 10 anos',
          'HPV — meninas de 9 a 14 anos e meninos de 11 a 14 anos',
          'Pneumocócica — para idosos a partir de 60 anos',
          'Covid-19 — conforme calendário vigente',
        ],
      },
      {
        type: 'callout',
        text: 'Adultos sem caderneta de vacinação podem começar a qualquer momento. Procure a UBS, informe o que já tomou e o profissional monta um esquema de atualização.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Caderneta de vacinação (se tiver)',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
        ],
      },
    ],
  },
]
