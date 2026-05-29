import type { GuideArticle } from '../guideArticles'

export const comoFuncionaOSusArticles: GuideArticle[] = [
  {
    slug: 'o-que-e-o-sus',
    categorySlug: 'como-funciona-o-sus',
    title: 'O que é o SUS',
    summary:
      'Entenda o que é o Sistema Único de Saúde, seus princípios e como ele está organizado no Brasil.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS — Sistema Único de Saúde — é o sistema de saúde pública do Brasil. É um dos maiores do mundo e oferece atendimento gratuito a qualquer pessoa em território nacional, sem exceção.',
      },
      {
        type: 'callout',
        text: 'O SUS é gratuito, universal e integral. Gratuito: você não paga nada. Universal: é para todos os brasileiros. Integral: cobre desde uma consulta simples até um transplante de órgão.',
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
        text: 'Onde funciona',
      },
      {
        type: 'paragraph',
        text: 'O atendimento acontece em unidades públicas e privadas credenciadas pelo governo — todas de forma gratuita para o paciente. São UBSs, UPAs, hospitais, clínicas, laboratórios e consultórios.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quem paga pelo SUS',
      },
      {
        type: 'paragraph',
        text: 'O SUS é financiado pelos impostos pagos por todos os brasileiros. Por isso, é um direito de quem contribui — e de quem não contribui também, pois a Constituição garante saúde a todos.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quem é responsável pelo SUS',
      },
      {
        type: 'paragraph',
        text: 'A responsabilidade é compartilhada entre União, estados e municípios. No dia a dia, quem cuida do atendimento na sua cidade é a Secretaria Municipal de Saúde.',
      },
    ],
  },
  {
    slug: 'niveis-de-atendimento',
    categorySlug: 'como-funciona-o-sus',
    title: 'Níveis de atendimento',
    summary:
      'Conheça a diferença entre atenção básica, média e alta complexidade e saiba onde buscar cada tipo de cuidado.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS funciona em três níveis — como uma escada. Você começa no primeiro degrau (postinho) e sobe conforme a necessidade. Entender isso evita filas desnecessárias e agiliza seu atendimento.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 1 — Atenção primária (UBS / Postinho)',
      },
      {
        type: 'paragraph',
        text: 'É a porta de entrada do SUS. A Unidade Básica de Saúde (UBS) resolve a maioria dos problemas de saúde do dia a dia.',
      },
      {
        type: 'list',
        items: [
          'Consultas com médico de família e clínico geral',
          'Exames básicos (sangue, urina, pressão)',
          'Vacinas e prevenção',
          'Acompanhamento de doenças crônicas (diabetes, hipertensão)',
          'Pré-natal e saúde da criança',
          'Encaminhamentos para especialistas',
        ],
      },
      {
        type: 'callout',
        text: 'Sempre comece pelo postinho. Ele resolve a maioria dos casos e, quando não resolve, te encaminha para o lugar certo — sem você precisar ir de hospital em hospital.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 2 — Atenção secundária (UPA e ambulatórios)',
      },
      {
        type: 'paragraph',
        text: 'A Unidade de Pronto Atendimento (UPA) e os ambulatórios de especialidades atendem casos que o postinho não consegue resolver sozinho.',
      },
      {
        type: 'list',
        items: [
          'Urgências que não são emergências graves',
          'Consultas com especialistas (com encaminhamento)',
          'Exames mais complexos',
          'Procedimentos ambulatoriais',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Nível 3 — Atenção terciária (hospital)',
      },
      {
        type: 'paragraph',
        text: 'Os hospitais atendem os casos mais graves e complexos.',
      },
      {
        type: 'list',
        items: [
          'Emergências com risco de vida',
          'Cirurgias complexas e transplantes',
          'Internações',
          'Tratamento de câncer e doenças graves',
          'UTI e terapia intensiva',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde ir em cada situação',
      },
      {
        type: 'list',
        items: [
          'Sintoma comum, dúvida ou prevenção → UBS (postinho)',
          'Urgência moderada, sem risco de vida → UPA',
          'Emergência grave, risco de vida → Hospital ou SAMU (192)',
        ],
      },
    ],
  },
]
