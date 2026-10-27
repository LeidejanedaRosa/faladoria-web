import type { UserRole } from '@features/auth/services/authApi'

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administração',
  assistant: 'Assistente',
  manager: 'Gestão de saúde',
}

export const PANEL_CONTENT = {
  header: {
    homeLink: 'Faladoria, início do painel',
    panelLabel: 'Painel',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    mobileMenu: 'Menu do painel',
    signOut: 'Sair',
    signingOut: 'Saindo…',
  },
  nav: {
    label: 'Navegação do painel',
    home: 'Início',
  },
  skipLink: 'Pular para o conteúdo principal',
  loading: 'Carregando o painel…',
  home: {
    metaTitle: 'Início do painel',
    greeting: (firstName: string) => `Olá, ${firstName}`,
    allCities: 'todas as cidades',
    noCities:
      'Você ainda não tem cidade atribuída, por isso não vê nenhuma reclamação. Peça à administradora da Faladoria para incluir a sua cidade.',
    actionHeading: 'O que precisa de você',
    statusHeading: 'Reclamações por status',
    loading: 'Carregando os números…',
    loadError: 'Não foi possível carregar os números agora.',
    retry: 'Tentar de novo',
    retrying: 'Tentando de novo…',
    actionCards: {
      open: {
        label: 'Aguardando moderação',
        hint: 'Chegaram e ainda não foram publicadas',
      },
      unread: {
        label: 'Não lidas',
        hint: 'A pessoa escreveu e ninguém da equipe leu',
      },
      assignedToMe: {
        label: 'Comigo',
        hint: 'Em andamento, sob a sua responsabilidade',
      },
      unassigned: {
        label: 'Sem responsável',
        hint: 'Em andamento, sem ninguém cuidando',
      },
    },
    statuses: {
      inReview: 'Em análise',
      inProgress: 'Em andamento',
      unresolved: 'Sem solução (ainda)',
      resolved: 'Resolvidas',
    },
  },
} as const
