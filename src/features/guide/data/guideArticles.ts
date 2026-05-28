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
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Onde ir primeiro',
      },
      {
        type: 'paragraph',
        text: 'A Unidade Básica de Saúde (UBS) — também chamada de "postinho" — é o lugar certo para começar. Lá você agenda consultas, recebe encaminhamentos e tem acesso à maioria dos serviços do SUS.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que levar',
      },
      {
        type: 'list',
        items: [
          'Cartão do SUS — se não tiver, o próprio postinho emite na hora',
          'Documento com foto (RG, CNH ou Carteira de Trabalho)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como agendar',
      },
      {
        type: 'paragraph',
        text: 'Chegue na UBS e informe que quer agendar uma consulta. O atendente vai verificar a disponibilidade e marcar o horário.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Perguntas para fazer na hora do agendamento',
      },
      {
        type: 'list',
        items: [
          'Qual é o endereço e horário exato da consulta?',
          'Preciso levar exames anteriores?',
          'Quanto tempo de antecedência devo chegar?',
          'O município oferece transporte para o local?',
        ],
      },
      {
        type: 'callout',
        text: 'Não sabe qual especialidade precisa? Sem problema. Marque uma consulta com o médico da UBS. Ele vai te avaliar e, se necessário, te encaminhar para o especialista certo — tudo pelo SUS.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer em caso de urgência',
      },
      {
        type: 'paragraph',
        text: 'Se a situação for grave — dor intensa, dificuldade para respirar ou risco de vida — não espere agendamento.',
      },
      {
        type: 'list',
        items: [
          'Vá direto ao pronto-socorro ou hospital mais próximo',
          'Ligue para o SAMU: 192',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Checklist antes de ir para a consulta',
      },
      {
        type: 'list',
        items: [
          'Separe exames e resultados anteriores',
          'Confirme o endereço com antecedência',
          'Leve o cartão SUS e o documento com foto',
        ],
      },
    ],
  },
  {
    slug: 'consulta-especialista',
    categorySlug: C.consulta,
    title: 'Como conseguir consulta com especialista',
    summary:
      'Para consultar um especialista pelo SUS é preciso passar por uma etapa antes. Entenda como funciona.',
    content: [
      {
        type: 'paragraph',
        text: 'No SUS, para consultar um especialista — cardiologista, ortopedista, dermatologista, entre outros — normalmente é preciso passar primeiro pelo médico da UBS (postinho de saúde).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O caminho passo a passo',
      },
      {
        type: 'list',
        items: [
          '1. Vá à UBS e marque uma consulta com o médico de família ou clínico geral',
          '2. O médico faz a avaliação e, se necessário, emite um encaminhamento',
          '3. Com o encaminhamento em mãos, você agenda a consulta com o especialista',
        ],
      },
      {
        type: 'callout',
        text: 'O SUS oferece atendimento em todas as especialidades médicas, de forma gratuita. O encaminhamento existe para organizar o fluxo — não para te impedir de ser atendido.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde agendar a consulta com o especialista',
      },
      {
        type: 'paragraph',
        text: 'O próprio médico da UBS vai informar onde agendar. Pode ser na Secretaria de Saúde do seu município, em um ambulatório de especialidades ou em um hospital conveniado.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'E se a espera for muito longa?',
      },
      {
        type: 'paragraph',
        text: 'Filas longas para especialistas são comuns. Se o prazo estiver muito além do razoável, você tem caminhos:',
      },
      {
        type: 'list',
        items: [
          'Fale com a Secretaria de Saúde do seu município',
          'Acione a Ouvidoria do SUS',
          'Em último caso, considere a judicialização',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Especialidades disponíveis pelo SUS',
      },
      {
        type: 'list',
        items: [
          'Cardiologia, neurologia, ortopedia, dermatologia',
          'Psiquiatria, ginecologia, urologia, oftalmologia',
          'Oncologia, reumatologia e todas as demais especialidades',
        ],
      },
      {
        type: 'callout',
        text: 'Você não precisa de comprovante de residência para ser atendido. O SUS é para todos os brasileiros, em qualquer município do país.',
      },
    ],
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
