import type { GuideArticle } from '../guideArticles'

export const vacinacaoArticles: GuideArticle[] = [
  {
    slug: 'calendario-infantil',
    categorySlug: 'vacinacao',
    title: 'Calendário infantil',
    summary:
      'Todas as vacinas obrigatórias para crianças de 0 a 9 anos disponíveis gratuitamente no SUS.',
    content: [
      {
        type: 'paragraph',
        text: 'O Brasil tem um dos melhores calendários de vacinação infantil do mundo — e todas as vacinas são gratuitas nas UBSs. Manter a caderneta em dia protege seu filho e toda a comunidade.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde vacinar',
      },
      {
        type: 'paragraph',
        text: 'Leve seu filho à UBS (postinho) mais próxima com a caderneta de vacinação. Não é necessário agendamento para a maioria das vacinas — basta comparecer durante o horário de funcionamento.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Principais vacinas do calendário infantil',
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
          '12 meses: Tríplice viral (sarampo, caxumba, rubéola), Meningocócica C, Pneumocócica',
          '15 meses: DTP, VOP, Varicela, Hepatite A',
          '4 anos: DTP, VOP, Tríplice viral, Varicela',
        ],
      },
      {
        type: 'callout',
        text: 'Perdeu alguma vacina? Não precisa começar do zero. Leve a caderneta ao postinho e o profissional vai indicar quais vacinas estão em atraso. O esquema pode ser completado a qualquer momento.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que levar',
      },
      {
        type: 'list',
        items: [
          'Caderneta de vacinação da criança',
          'Cartão do SUS da criança',
          'Documento da criança (certidão de nascimento)',
        ],
      },
    ],
  },
  {
    slug: 'calendario-adulto',
    categorySlug: 'vacinacao',
    title: 'Calendário do adulto',
    summary:
      'Vacinas recomendadas para adultos e idosos, incluindo gripe, febre amarela e hepatite.',
    content: [
      {
        type: 'paragraph',
        text: 'Adultos e idosos também têm vacinas gratuitas disponíveis pelo SUS. A vacinação na fase adulta protege contra doenças graves e reforça a imunidade de quem ficou sem vacinar na infância.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Principais vacinas para adultos',
      },
      {
        type: 'list',
        items: [
          'Influenza (gripe) — anual, para todos os adultos com prioridade para grupos de risco',
          'Hepatite B — 3 doses para quem não foi vacinado',
          'Febre Amarela — dose única válida para toda a vida (residentes ou viajantes de áreas de risco)',
          'Tríplice Viral — para quem não tomou na infância',
          'dT (difteria e tétano) — reforço a cada 10 anos',
          'HPV — de rotina para meninas de 9 a 14 anos e meninos de 11 a 14 anos; pergunte na UBS sobre sua situação específica',
          'Pneumocócica — para idosos a partir de 60 anos',
          'Covid-19 — conforme calendário vigente',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Grupos com prioridade no SUS',
      },
      {
        type: 'list',
        items: [
          'Idosos (60 anos ou mais)',
          'Gestantes e puérperas',
          'Crianças e adolescentes',
          'Professores e profissionais de saúde',
          'Pessoas com doenças crônicas',
          'Povos indígenas e quilombolas',
        ],
      },
      {
        type: 'callout',
        text: 'Adultos que não têm caderneta de vacinação podem começar a qualquer momento. Procure a UBS, informe o que já tomou que se lembra, e o profissional vai montar um esquema de atualização.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que levar',
      },
      {
        type: 'list',
        items: [
          'Caderneta de vacinação (se tiver)',
          'Cartão do SUS',
          'Documento com foto',
        ],
      },
    ],
  },
]
