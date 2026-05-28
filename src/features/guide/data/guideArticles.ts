export interface GuideArticle {
  slug: string
  title: string
  summary: string
  content: string
  categorySlug: string
}

const C = {
  seusDireitos: 'seus-direitos',
  comoFuncionaOSus: 'como-funciona-o-sus',
  comoConseguir: 'como-conseguir',
  vacinacao: 'vacinacao',
  prevencao: 'prevencao',
  denuncie: 'denuncie',
} as const

export const GUIDE_ARTICLES: GuideArticle[] = [
  // seus-direitos
  {
    slug: 'direito-a-saude',
    categorySlug: C.seusDireitos,
    title: 'Direito à saúde',
    summary:
      'A saúde é um direito de todos e dever do Estado, garantido pela Constituição Federal de 1988.',
    content: '',
  },
  {
    slug: 'como-exigir-seus-direitos',
    categorySlug: C.seusDireitos,
    title: 'Como exigir seus direitos',
    summary:
      'Saiba quais canais acionar quando o atendimento no SUS for negado ou demorar além do prazo.',
    content: '',
  },

  // como-funciona-o-sus
  {
    slug: 'o-que-e-o-sus',
    categorySlug: C.comoFuncionaOSus,
    title: 'O que é o SUS',
    summary:
      'Entenda o que é o Sistema Único de Saúde, seus princípios e como ele está organizado no Brasil.',
    content: '',
  },
  {
    slug: 'niveis-de-atendimento',
    categorySlug: C.comoFuncionaOSus,
    title: 'Níveis de atendimento',
    summary:
      'Conheça a diferença entre atenção básica, média e alta complexidade e saiba onde buscar cada tipo de cuidado.',
    content: '',
  },

  // como-conseguir
  {
    slug: 'consultas',
    categorySlug: C.comoConseguir,
    title: 'Consultas médicas',
    summary:
      'Veja como agendar consultas pelo SUS, quais especialidades estão disponíveis e quais são os prazos.',
    content: '',
  },
  {
    slug: 'exames',
    categorySlug: C.comoConseguir,
    title: 'Exames',
    summary:
      'Saiba como solicitar exames laboratoriais e de imagem pelo SUS e o que fazer se a espera for longa.',
    content: '',
  },
  {
    slug: 'cirurgias',
    categorySlug: C.comoConseguir,
    title: 'Cirurgias',
    summary:
      'Entenda como funciona a fila de cirurgias eletivas no SUS e como acompanhar sua posição.',
    content: '',
  },
  {
    slug: 'medicamentos',
    categorySlug: C.comoConseguir,
    title: 'Medicamentos',
    summary:
      'Descubra como retirar medicamentos gratuitos pelo SUS, Farmácia Popular e programas estaduais.',
    content: '',
  },

  // vacinacao
  {
    slug: 'calendario-infantil',
    categorySlug: C.vacinacao,
    title: 'Calendário infantil',
    summary:
      'Todas as vacinas obrigatórias para crianças de 0 a 9 anos disponíveis gratuitamente no SUS.',
    content: '',
  },
  {
    slug: 'calendario-adulto',
    categorySlug: C.vacinacao,
    title: 'Calendário do adulto',
    summary:
      'Vacinas recomendadas para adultos e idosos, incluindo gripe, febre amarela e hepatite.',
    content: '',
  },

  // prevencao
  {
    slug: 'saude-da-mulher',
    categorySlug: C.prevencao,
    title: 'Saúde da mulher',
    summary:
      'Exames preventivos, pré-natal e acompanhamento ginecológico disponíveis gratuitamente pelo SUS.',
    content: '',
  },
  {
    slug: 'saude-do-homem',
    categorySlug: C.prevencao,
    title: 'Saúde do homem',
    summary:
      'Exames de prevenção e programas de saúde masculina oferecidos pelo SUS.',
    content: '',
  },
  {
    slug: 'saude-da-crianca',
    categorySlug: C.prevencao,
    title: 'Saúde da criança',
    summary:
      'Acompanhamento do crescimento, desenvolvimento e vacinação das crianças pelo SUS.',
    content: '',
  },

  // denuncie
  {
    slug: 'canais-de-denuncia',
    categorySlug: C.denuncie,
    title: 'Canais de denúncia',
    summary:
      'Conheça os canais oficiais para denunciar irregularidades no atendimento do SUS.',
    content: '',
  },
  {
    slug: 'ouvidoria-do-sus',
    categorySlug: C.denuncie,
    title: 'Ouvidoria do SUS',
    summary:
      'Saiba como acionar a ouvidoria do SUS e o que esperar após registrar sua reclamação.',
    content: '',
  },
]
