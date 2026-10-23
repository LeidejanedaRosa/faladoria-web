import type { PublicComplaintStatus } from '../services/publicComplaints'

export const TRANSPARENCY_HEADING_ID = 'transparency-heading'

export const LATEST_COMPLAINTS_LIMIT = 6

export interface TransparencyStat {
  id: string
  label: string
  value: number
  detail?: string
  color: 'blue' | 'green' | 'yellow' | 'red'
  isTotal?: boolean
}

interface TransparencyStatDefinition extends Omit<
  TransparencyStat,
  'value' | 'detail' | 'isTotal'
> {
  /** Statuses summed into the card; absent on the total card. */
  statuses?: readonly PublicComplaintStatus[]
  detailSuffix?: string
}

// Keyed by the API's status and listed in the order a complaint moves through them.
export const STATUS_CONFIG = {
  inReview: {
    label: 'Em Análise',
    description: 'Publicada e aguardando o serviço de saúde',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-300',
    bgColor: 'bg-blue-400/10',
  },
  inProgress: {
    label: 'Em Andamento',
    description: 'O serviço de saúde está tratando o caso',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  unresolved: {
    label: 'Sem Solução (Ainda)',
    description: 'O serviço de saúde ainda não resolveu o caso',
    borderColor: 'border-red-400',
    textColor: 'text-red-300',
    bgColor: 'bg-red-400/10',
  },
  resolved: {
    label: 'Resolvido',
    description: 'O serviço de saúde resolveu o caso',
    borderColor: 'border-green-500',
    textColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
} as const satisfies Record<
  PublicComplaintStatus,
  {
    label: string
    description: string
    borderColor: string
    textColor: string
    bgColor: string
  }
>

export const TRANSPARENCY_CONTENT = {
  sectionHeading: 'Transparência e acompanhamento das demandas',
  headline: 'Transparência Radical',
  subtitle: [
    'Não escondemos os problemas. Mostramos a realidade para cobrar soluções.',
    'Acompanhe o andamento das reclamações publicadas.',
  ],
  // The data is cached for up to a minute and is not re-fetched while the page stays open:
  // the copy states its age instead of promising automatic updates.
  liveIndicator: 'Dados de até 1 minuto atrás',

  stats: [
    {
      id: 'stat-total',
      label: 'Total de Demandas',
      color: 'blue',
    },
    {
      id: 'stat-resolved',
      label: 'Resolvidas',
      color: 'green',
      statuses: ['resolved'],
      detailSuffix: 'de sucesso',
    },
    {
      id: 'stat-mediation',
      label: 'Em Mediação',
      color: 'yellow',
      statuses: ['inReview', 'inProgress'],
      detailSuffix: 'em mediação',
    },
    {
      id: 'stat-unsolved',
      label: 'Sem Solução (Ainda)',
      color: 'red',
      statuses: ['unresolved'],
      detailSuffix: 'sem solução',
    },
  ] satisfies TransparencyStatDefinition[],

  lgpdNotice: 'Dados anonimizados (LGPD)',

  cta: {
    title: 'Seu problema não está aqui?',
    description:
      'Ajude-nos a preencher este gráfico. Sua reclamação vira estatística e pressão por melhoria.',
    buttonText: 'Registrar Problema',
  },

  interactionsPanelTitle: 'Últimas Interações',
  legendTitle: 'Legenda de status',
  receivedOnPrefix: 'Recebida em',

  loadingStats: 'Carregando os números do quadro…',
  loadingInteractions: 'Carregando as últimas reclamações…',
  loadError: 'Não foi possível carregar os dados agora.',
  retryButton: 'Tentar de novo',
  emptyInteractions:
    'Ainda não há reclamações publicadas. A sua pode ser a primeira.',
} as const
