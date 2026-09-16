import { formatPercentage } from '@shared/utils/formatPercentage'

export const TRANSPARENCY_HEADING_ID = 'transparency-heading'

export type InteractionStatus =
  'open' | 'under_review' | 'in_progress' | 'resolved' | 'unresolved'

export interface TransparencyStat {
  id: string
  label: string
  value: number
  detail?: string
  color: 'blue' | 'green' | 'yellow' | 'red'
  isTotal?: boolean
}

export interface Interaction {
  id: string
  title: string
  facility: string
  city: string
  state: string
  timeAgo: string
  status: InteractionStatus
}

export const STATUS_CONFIG = {
  open: {
    label: 'Aberto',
    description: 'Acabou de entrar e ainda não foi lido',
    borderColor: 'border-orange-400',
    textColor: 'text-orange-300',
    bgColor: 'bg-orange-400/10',
  },
  under_review: {
    label: 'Em Análise',
    description: 'O administrador já leu a demanda',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-300',
    bgColor: 'bg-blue-400/10',
  },
  in_progress: {
    label: 'Em Andamento',
    description: 'O administrador está trabalhando na demanda',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  resolved: {
    label: 'Resolvido',
    description: 'A demanda foi solucionada',
    borderColor: 'border-green-500',
    textColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  unresolved: {
    label: 'Sem Solução (Ainda)',
    description: 'A demanda ainda não foi solucionada',
    borderColor: 'border-red-400',
    textColor: 'text-red-300',
    bgColor: 'bg-red-400/10',
  },
} as const

const RESOLVED_COUNT = 890
const MEDIATION_COUNT = 210
const UNRESOLVED_COUNT = 140
export const TOTAL_DEMANDS = RESOLVED_COUNT + MEDIATION_COUNT + UNRESOLVED_COUNT

export const TRANSPARENCY_CONTENT = {
  sectionHeading: 'Transparência e acompanhamento das demandas',
  headline: 'Transparência Radical',
  subtitle: [
    'Não escondemos os problemas. Mostramos a realidade para cobrar soluções.',
    'Veja o status das reclamações em tempo real.',
  ],
  liveIndicator: 'Atualizado em tempo real',

  stats: [
    {
      id: 'stat-total',
      label: 'Total de Demandas',
      value: TOTAL_DEMANDS,
      color: 'blue',
      isTotal: true,
    },
    {
      id: 'stat-resolved',
      label: 'Resolvidas',
      value: RESOLVED_COUNT,
      detail: `${formatPercentage(RESOLVED_COUNT, TOTAL_DEMANDS)} de sucesso`,
      color: 'green',
    },
    {
      id: 'stat-mediation',
      label: 'Em Mediação',
      value: MEDIATION_COUNT,
      detail: `${formatPercentage(MEDIATION_COUNT, TOTAL_DEMANDS)} em mediação`,
      color: 'yellow',
    },
    {
      id: 'stat-unsolved',
      label: 'Sem Solução (Ainda)',
      value: UNRESOLVED_COUNT,
      detail: `${formatPercentage(UNRESOLVED_COUNT, TOTAL_DEMANDS)} sem solução`,
      color: 'red',
    },
  ] satisfies TransparencyStat[],

  lgpdNotice: 'Dados anonimizados (LGPD)',

  interactions: [
    {
      id: 'interaction-1',
      title: 'Falta de Medicamento',
      facility: 'UBS Centro',
      city: 'São Paulo',
      state: 'SP',
      timeAgo: '15 min atrás',
      status: 'under_review',
    },
    {
      id: 'interaction-2',
      title: 'Demora no Atendimento',
      facility: 'Hospital Regional',
      city: 'Belo Horizonte',
      state: 'MG',
      timeAgo: '42 min atrás',
      status: 'open',
    },
    {
      id: 'interaction-3',
      title: 'Fila de espera para cirurgia ortopédica',
      facility: 'Hospital Municipal',
      city: 'Rio de Janeiro',
      state: 'RJ',
      timeAgo: '2 dias atrás',
      status: 'resolved',
    },
    {
      id: 'interaction-4',
      title: 'Infraestrutura Danificada',
      facility: 'Posto Vila Nova',
      city: 'Curitiba',
      state: 'PR',
      timeAgo: '2h atrás',
      status: 'resolved',
    },
    {
      id: 'interaction-5',
      title: 'Ausência de Médico',
      facility: 'UPA 24h',
      city: 'Salvador',
      state: 'BA',
      timeAgo: '3h atrás',
      status: 'unresolved',
    },
    {
      id: 'interaction-6',
      title: 'Falta de medicamentos na UBS',
      facility: 'UBS Jardim América',
      city: 'Recife',
      state: 'PE',
      timeAgo: '5 dias atrás',
      status: 'in_progress',
    },
  ] satisfies Interaction[],

  cta: {
    title: 'Seu problema não está aqui?',
    description:
      'Ajude-nos a preencher este gráfico. Sua reclamação vira estatística e pressão por melhoria.',
    buttonText: 'Registrar Problema',
  },

  interactionsPanelTitle: 'Últimas Interações',
  legendTitle: 'Legenda de status',
} as const
