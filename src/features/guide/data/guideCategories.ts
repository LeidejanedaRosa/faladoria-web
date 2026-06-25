export interface GuideCategory {
  slug: string
  label: string
  description: string
  infoPoints?: readonly string[]
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
  color:
    | 'purple'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'sky'
    | 'cyan'
    | 'teal'
    | 'emerald'
    | 'green'
    | 'amber'
    | 'orange'
    | 'rose'
    | 'pink'
    | 'fuchsia'
    | 'red'
    | 'yellow'
    | 'slate'
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  // Acesso a serviços — arco-íris completo: rose→orange→amber→green→teal→sky→blue→violet
  {
    slug: 'consulta',
    label: 'Consulta',
    description: 'Como agendar, especialidades disponíveis e prazos.',
    iconName: 'clipboard',
    color: 'rose',
  },
  {
    slug: 'exame',
    label: 'Exame',
    description: 'Laboratoriais, de imagem e como solicitar.',
    iconName: 'search',
    color: 'orange',
  },
  {
    slug: 'cirurgia',
    label: 'Cirurgia',
    description: 'Fila de espera e como acompanhar.',
    iconName: 'activity',
    color: 'amber',
  },
  {
    slug: 'tratamento',
    label: 'Tratamento',
    description: 'Fisioterapia, quimioterapia e reabilitação.',
    iconName: 'heart',
    color: 'green',
  },
  {
    slug: 'medicamento',
    label: 'Medicamento',
    description: 'Farmácia básica, Popular e alto custo.',
    iconName: 'syringe',
    color: 'teal',
  },
  {
    slug: 'atendimento-domiciliar',
    label: 'Atendimento domiciliar',
    description: 'Quem tem direito e como solicitar.',
    iconName: 'person',
    color: 'sky',
  },
  {
    slug: 'transporte-sanitario',
    label: 'Transporte sanitário',
    description: 'Como solicitar e quem tem direito.',
    iconName: 'location',
    color: 'blue',
  },
  {
    slug: 'equipamentos',
    label: 'Equipamentos',
    description: 'Cadeiras de rodas, muletas e próteses.',
    iconName: 'target',
    color: 'violet',
  },

  // Saúde por público — pink, indigo, emerald (continua o espectro)
  {
    slug: 'saude-da-mulher',
    label: 'Saúde da mulher',
    description: 'Pré-natal, preventivo e mamografia.',
    iconName: 'heart',
    color: 'pink',
  },
  {
    slug: 'saude-do-homem',
    label: 'Saúde do homem',
    description: 'Exames preventivos e saúde masculina.',
    iconName: 'person',
    color: 'indigo',
  },
  {
    slug: 'saude-da-crianca',
    label: 'Saúde da criança',
    description: 'Triagem neonatal, puericultura e saúde bucal.',
    iconName: 'users',
    color: 'emerald',
  },

  // Prevenção e saúde mental — cyan, purple
  {
    slug: 'vacinacao',
    label: 'Vacinação',
    description: 'Calendário para crianças, adultos e idosos.',
    iconName: 'syringe',
    color: 'cyan',
  },
  {
    slug: 'saude-mental',
    label: 'Saúde mental',
    description: 'CAPS, CRAS e prevenção ao suicídio.',
    iconName: 'chat',
    color: 'purple',
  },

  // Direitos e ação — fuchsia, slate, yellow, red (distintos dentro do grupo)
  {
    slug: 'seus-direitos',
    label: 'Seus direitos',
    description: 'Seus direitos e como exigi-los.',
    iconName: 'shield',
    color: 'fuchsia',
  },
  {
    slug: 'como-funciona-o-sus',
    label: 'Como funciona o SUS',
    description: 'Estrutura, princípios e organização.',
    iconName: 'building',
    color: 'slate',
  },
  {
    slug: 'denuncias',
    label: 'Denúncias',
    description: 'Canais para denunciar irregularidades.',
    iconName: 'megaphone',
    color: 'yellow',
  },
  {
    slug: 'judicializacao',
    label: 'Recorrer na Justiça',
    description: 'Quando e como acionar a Justiça.',
    iconName: 'fist',
    color: 'red',
  },
]
