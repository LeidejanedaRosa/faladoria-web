import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'como-funciona-o-sus'
const DATE_PUBLISHED = '2026-05-01'

export const howSusWorksArticles: GuideArticle[] = [
  {
    slug: 'o-que-e-o-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'O que é o SUS',
    summary:
      'O SUS é o sistema público de saúde do Brasil, criado pela Constituição de 1988 para garantir atendimento gratuito e universal a todos os brasileiros.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'building',
    content: [
      {
        type: 'callout',
        text: 'O Sistema Único de Saúde (SUS) é o sistema público de saúde do Brasil. Foi criado pela Constituição Federal de 1988 e é considerado um dos maiores sistemas de saúde pública do mundo — atende mais de 200 milhões de pessoas.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Os três princípios do SUS',
      },
      {
        type: 'list',
        items: [
          'Gratuito: você não paga nada pelo atendimento — nem consulta, nem exame, nem cirurgia',
          'Universal: é para todos os brasileiros e estrangeiros residentes no país, sem exceção',
          'Integral: cobre desde uma consulta básica até transplante de órgão',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que o SUS oferece',
      },
      {
        type: 'list',
        items: [
          'Consultas em todas as especialidades médicas',
          'Exames laboratoriais e de imagem',
          'Cirurgias, inclusive transplantes de órgãos',
          'Internações hospitalares',
          'Medicamentos (lista básica e de alto custo)',
          'Atendimento odontológico',
          'Vacinação',
          'Urgência e emergência 24 horas',
          'Acompanhamento para gestantes, crianças e idosos',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar',
        icon: 'location',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS (postinho) mais próxima',
        imageKey: 'ubs',
        detail:
          'É a porta de entrada do SUS. O atendimento é gratuito para qualquer pessoa em território nacional.',
      },
    ],
  },
  {
    slug: 'niveis-de-atendimento',
    categorySlug: CATEGORY_SLUG,
    title: 'Níveis de atendimento',
    summary:
      'Conheça a diferença entre atenção básica, média e alta complexidade e saiba onde buscar cada tipo de cuidado.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'chart',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS funciona em três níveis — como uma escada. Você começa no primeiro degrau (postinho) e sobe conforme a necessidade.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 1 — UBS (postinho)',
      },
      {
        type: 'list',
        items: [
          'Consultas com médico de família e clínico geral',
          'Exames básicos, vacinas e prevenção',
          'Acompanhamento de doenças crônicas (diabetes, hipertensão)',
          'Pré-natal e saúde da criança',
          'Encaminhamentos para especialistas',
        ],
      },
      {
        type: 'callout',
        text: 'Sempre comece pelo postinho. Ele resolve a maioria dos casos e, quando não resolve, te encaminha para o lugar certo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 2 — UPA e ambulatórios',
      },
      {
        type: 'list',
        items: [
          'Urgências que não são emergências graves',
          'Consultas com especialistas (com encaminhamento)',
          'Exames mais complexos e procedimentos ambulatoriais',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 3 — Hospital',
      },
      {
        type: 'list',
        items: [
          'Emergências com risco de vida — SAMU: 192',
          'Cirurgias complexas, transplantes e internações',
          'Tratamento de câncer e doenças graves, UTI',
        ],
      },
    ],
  },
  {
    slug: 'quem-e-responsavel-pelo-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Quem é responsável pelo SUS',
    summary:
      'O SUS é financiado pelos seus impostos e gerido pela prefeitura. Entenda quem é responsável pelo atendimento na sua cidade.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'users',
    content: [
      {
        type: 'callout',
        text: 'O SUS é financiado com o dinheiro dos seus impostos. Nenhuma unidade de saúde pode cobrar pelo atendimento — você já pagou por isso.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'A prefeitura é responsável',
      },
      {
        type: 'list',
        items: [
          'A gestão municipal organiza e coordena o atendimento nas UBS da sua cidade',
          'A Secretaria de Saúde contrata médicos, enfermeiros e demais profissionais',
          'O município é obrigado por lei a garantir o acesso ao atendimento básico',
          'Quando não há especialista no município, a Secretaria deve encaminhar para outro serviço da rede',
          'Filas de espera, falta de médico e medicamento em falta são responsabilidade da gestão municipal',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'De onde vêm os recursos',
      },
      {
        type: 'list',
        items: [
          'O SUS é financiado por impostos federais, estaduais e municipais',
          'União, estados e municípios dividem a responsabilidade pelo financiamento',
          'Nenhuma unidade de saúde do SUS pode cobrar qualquer valor pelo atendimento',
          'Quem cobra pelo atendimento do SUS comete crime',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Quando o atendimento for negado na UBS',
        text: 'O responsável direto é a Secretaria Municipal de Saúde. É o primeiro lugar a procurar quando a UBS não resolver.',
      },
    ],
  },
]
