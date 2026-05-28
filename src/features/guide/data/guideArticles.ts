export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }

export interface GuideArticle {
  slug: string
  title: string
  summary: string
  content: ArticleBlock[]
  categorySlug: string
}

const C = {
  consulta: 'consulta',
  exame: 'exame',
  cirurgia: 'cirurgia',
  tratamento: 'tratamento',
  medicamento: 'medicamento',
  atendimentoDomiciliar: 'atendimento-domiciliar',
  transporteSanitario: 'transporte-sanitario',
  equipamentos: 'equipamentos',
  saudeDaMulher: 'saude-da-mulher',
  saudeDoHomem: 'saude-do-homem',
  saudeDaCrianca: 'saude-da-crianca',
  vacinacao: 'vacinacao',
  saudeMental: 'saude-mental',
  seusDireitos: 'seus-direitos',
  comoFuncionaOSus: 'como-funciona-o-sus',
  denuncias: 'denuncias',
  judicializacao: 'judicializacao',
} as const

export const GUIDE_ARTICLES: GuideArticle[] = [
  // consulta
  {
    slug: 'como-agendar-consulta',
    categorySlug: C.consulta,
    title: 'Como agendar uma consulta',
    summary:
      'Veja como agendar consultas pelo SUS, quais especialidades estão disponíveis e quais são os prazos.',
    content: [],
  },
  {
    slug: 'consulta-especialista',
    categorySlug: C.consulta,
    title: 'Como conseguir consulta com especialista',
    summary:
      'Para consultar um especialista pelo SUS é preciso passar por uma etapa antes. Entenda como funciona.',
    content: [],
  },

  // exame
  {
    slug: 'como-solicitar-exame',
    categorySlug: C.exame,
    title: 'Como solicitar exames pelo SUS',
    summary:
      'Saiba como solicitar exames laboratoriais e de imagem pelo SUS e o que fazer se a espera for longa.',
    content: [],
  },
  {
    slug: 'exame-demorou-muito',
    categorySlug: C.exame,
    title: 'O que fazer quando o exame demora muito',
    summary:
      'Conheça seus direitos e os caminhos para acelerar a realização de exames com prazo vencido.',
    content: [],
  },

  // cirurgia
  {
    slug: 'fila-de-cirurgia',
    categorySlug: C.cirurgia,
    title: 'Como funciona a fila de cirurgia',
    summary:
      'Entenda como funciona a lista de espera para cirurgias eletivas no SUS e como acompanhar sua posição.',
    content: [],
  },
  {
    slug: 'cirurgia-negada',
    categorySlug: C.cirurgia,
    title: 'O que fazer quando a cirurgia é negada',
    summary:
      'Se o SUS negar sua cirurgia, você tem direitos. Saiba quais são e como agir.',
    content: [],
  },

  // tratamento
  {
    slug: 'como-conseguir-tratamento',
    categorySlug: C.tratamento,
    title: 'Como conseguir tratamento pelo SUS',
    summary:
      'Fisioterapia, quimioterapia, reabilitação e outros tratamentos disponíveis gratuitamente.',
    content: [],
  },

  // medicamento
  {
    slug: 'farmacia-basica',
    categorySlug: C.medicamento,
    title: 'Medicamentos da farmácia básica',
    summary:
      'Como retirar medicamentos gratuitos nas unidades de saúde e o que está disponível na lista básica.',
    content: [],
  },
  {
    slug: 'medicamentos-alto-custo',
    categorySlug: C.medicamento,
    title: 'Medicamentos de alto custo',
    summary:
      'Descubra como solicitar medicamentos de alto custo pelo componente especializado da assistência farmacêutica.',
    content: [],
  },

  // atendimento-domiciliar
  {
    slug: 'como-solicitar-atendimento-domiciliar',
    categorySlug: C.atendimentoDomiciliar,
    title: 'Como solicitar atendimento domiciliar',
    summary:
      'Saiba quem tem direito ao atendimento em casa pelo SUS e como fazer a solicitação.',
    content: [],
  },

  // transporte-sanitario
  {
    slug: 'como-solicitar-transporte-sanitario',
    categorySlug: C.transporteSanitario,
    title: 'Como solicitar transporte sanitário',
    summary:
      'Se você não consegue se deslocar para consultas ou tratamentos, o SUS pode garantir transporte.',
    content: [],
  },

  // equipamentos
  {
    slug: 'como-solicitar-equipamentos',
    categorySlug: C.equipamentos,
    title: 'Como solicitar equipamentos pelo SUS',
    summary:
      'Cadeiras de rodas, muletas, órteses, próteses e respiradores podem ser solicitados gratuitamente.',
    content: [],
  },

  // saude-da-mulher
  {
    slug: 'pre-natal',
    categorySlug: C.saudeDaMulher,
    title: 'Pré-natal pelo SUS',
    summary:
      'Exames preventivos, pré-natal e acompanhamento ginecológico disponíveis gratuitamente pelo SUS.',
    content: [],
  },

  // saude-do-homem
  {
    slug: 'saude-preventiva-homem',
    categorySlug: C.saudeDoHomem,
    title: 'Saúde preventiva masculina',
    summary:
      'Exames de prevenção e programas de saúde masculina oferecidos pelo SUS.',
    content: [],
  },

  // saude-da-crianca
  {
    slug: 'acompanhamento-infantil',
    categorySlug: C.saudeDaCrianca,
    title: 'Acompanhamento infantil pelo SUS',
    summary:
      'Acompanhamento do crescimento, desenvolvimento e vacinação das crianças pelo SUS.',
    content: [],
  },

  // vacinacao
  {
    slug: 'calendario-infantil',
    categorySlug: C.vacinacao,
    title: 'Calendário infantil',
    summary:
      'Todas as vacinas obrigatórias para crianças de 0 a 9 anos disponíveis gratuitamente no SUS.',
    content: [],
  },
  {
    slug: 'calendario-adulto',
    categorySlug: C.vacinacao,
    title: 'Calendário do adulto',
    summary:
      'Vacinas recomendadas para adultos e idosos, incluindo gripe, febre amarela e hepatite.',
    content: [],
  },

  // saude-mental
  {
    slug: 'caps-e-servicos-de-saude-mental',
    categorySlug: C.saudeMental,
    title: 'CAPS e serviços de saúde mental',
    summary:
      'Conheça os Centros de Atenção Psicossocial e outros serviços de saúde mental disponíveis pelo SUS.',
    content: [],
  },

  // seus-direitos
  {
    slug: 'direito-a-saude',
    categorySlug: C.seusDireitos,
    title: 'Direito à saúde',
    summary:
      'A saúde é um direito de todos e dever do Estado, garantido pela Constituição Federal de 1988.',
    content: [],
  },
  {
    slug: 'como-exigir-seus-direitos',
    categorySlug: C.seusDireitos,
    title: 'Como exigir seus direitos',
    summary:
      'Saiba quais canais acionar quando o atendimento no SUS for negado ou demorar além do prazo.',
    content: [],
  },

  // como-funciona-o-sus
  {
    slug: 'o-que-e-o-sus',
    categorySlug: C.comoFuncionaOSus,
    title: 'O que é o SUS',
    summary:
      'Entenda o que é o Sistema Único de Saúde, seus princípios e como ele está organizado no Brasil.',
    content: [],
  },
  {
    slug: 'niveis-de-atendimento',
    categorySlug: C.comoFuncionaOSus,
    title: 'Níveis de atendimento',
    summary:
      'Conheça a diferença entre atenção básica, média e alta complexidade e saiba onde buscar cada tipo de cuidado.',
    content: [],
  },

  // denuncias
  {
    slug: 'canais-de-denuncia',
    categorySlug: C.denuncias,
    title: 'Canais de denúncia',
    summary:
      'Conheça os canais oficiais para denunciar irregularidades no atendimento do SUS.',
    content: [],
  },
  {
    slug: 'ouvidoria-do-sus',
    categorySlug: C.denuncias,
    title: 'Ouvidoria do SUS',
    summary:
      'Saiba como acionar a ouvidoria do SUS e o que esperar após registrar sua reclamação.',
    content: [],
  },

  // judicializacao
  {
    slug: 'quando-judicializar',
    categorySlug: C.judicializacao,
    title: 'Quando recorrer à Justiça',
    summary:
      'A judicialização é o último recurso. Entenda quando ela é necessária e como funciona o processo.',
    content: [],
  },
]
