export interface GuideCategory {
  slug: string
  label: string
  description: string
  iconName:
    | 'activity'
    | 'building'
    | 'chat'
    | 'clipboard'
    | 'fist'
    | 'heart'
    | 'location'
    | 'megaphone'
    | 'person'
    | 'search'
    | 'shield'
    | 'syringe'
    | 'target'
    | 'users'
  color: 'purple' | 'blue' | 'amber' | 'teal' | 'green' | 'rose'
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  // Acesso a serviços
  {
    slug: 'consulta',
    label: 'Consulta',
    description:
      'Como agendar consultas médicas pelo SUS, quais especialidades estão disponíveis e os prazos de atendimento.',
    iconName: 'clipboard',
    color: 'amber',
  },
  {
    slug: 'exame',
    label: 'Exame',
    description:
      'Como solicitar exames laboratoriais e de imagem pelo SUS e o que fazer quando a espera for longa.',
    iconName: 'search',
    color: 'blue',
  },
  {
    slug: 'cirurgia',
    label: 'Cirurgia',
    description:
      'Como funciona a fila de cirurgias eletivas no SUS e como acompanhar sua posição na lista de espera.',
    iconName: 'activity',
    color: 'rose',
  },
  {
    slug: 'tratamento',
    label: 'Tratamento',
    description:
      'Fisioterapia, quimioterapia, reabilitação e outros tratamentos disponíveis pelo SUS.',
    iconName: 'heart',
    color: 'teal',
  },
  {
    slug: 'medicamento',
    label: 'Medicamento',
    description:
      'Como retirar medicamentos gratuitos pelo SUS, Farmácia Popular e programas de medicamentos de alto custo.',
    iconName: 'syringe',
    color: 'teal',
  },
  {
    slug: 'atendimento-domiciliar',
    label: 'Atendimento domiciliar',
    description:
      'Saiba quem tem direito ao atendimento em casa e como solicitar esse serviço pelo SUS.',
    iconName: 'person',
    color: 'green',
  },
  {
    slug: 'transporte-sanitario',
    label: 'Transporte sanitário',
    description:
      'Como solicitar transporte para consultas e tratamentos quando não é possível se deslocar por conta própria.',
    iconName: 'location',
    color: 'amber',
  },
  {
    slug: 'equipamentos',
    label: 'Equipamentos',
    description:
      'Como solicitar cadeiras de rodas, muletas, órteses, próteses e respiradores pelo SUS.',
    iconName: 'target',
    color: 'amber',
  },

  // Saúde por público
  {
    slug: 'saude-da-mulher',
    label: 'Saúde da mulher',
    description:
      'Pré-natal, preventivo, mamografia e outros serviços de saúde feminina disponíveis gratuitamente pelo SUS.',
    iconName: 'heart',
    color: 'rose',
  },
  {
    slug: 'saude-do-homem',
    label: 'Saúde do homem',
    description:
      'Exames preventivos e programas de saúde masculina oferecidos gratuitamente pelo SUS.',
    iconName: 'person',
    color: 'blue',
  },
  {
    slug: 'saude-da-crianca',
    label: 'Saúde da criança',
    description:
      'Acompanhamento do crescimento, desenvolvimento e vacinação das crianças pelo SUS.',
    iconName: 'users',
    color: 'green',
  },

  // Prevenção e saúde mental
  {
    slug: 'vacinacao',
    label: 'Vacinação',
    description:
      'Calendário vacinal completo por faixa etária para crianças, adultos e idosos.',
    iconName: 'syringe',
    color: 'teal',
  },
  {
    slug: 'saude-mental',
    label: 'Saúde mental',
    description:
      'CAPS, CRAS, prevenção ao suicídio e outros serviços de saúde mental disponíveis pelo SUS.',
    iconName: 'chat',
    color: 'purple',
  },

  // Direitos e ação
  {
    slug: 'seus-direitos',
    label: 'Seus direitos',
    description:
      'Conheça seus direitos como usuário do SUS e saiba como exigi-los quando o atendimento for negado.',
    iconName: 'shield',
    color: 'purple',
  },
  {
    slug: 'como-funciona-o-sus',
    label: 'Como funciona o SUS',
    description:
      'Entenda a estrutura do Sistema Único de Saúde, seus princípios e como ele está organizado no Brasil.',
    iconName: 'building',
    color: 'blue',
  },
  {
    slug: 'denuncias',
    label: 'Denúncias',
    description:
      'Canais oficiais para denunciar irregularidades no atendimento do SUS e como utilizá-los.',
    iconName: 'megaphone',
    color: 'rose',
  },
  {
    slug: 'judicializacao',
    label: 'Judicialização',
    description:
      'Quando e como recorrer à Justiça para garantir seu direito ao atendimento pelo SUS.',
    iconName: 'fist',
    color: 'purple',
  },
]
