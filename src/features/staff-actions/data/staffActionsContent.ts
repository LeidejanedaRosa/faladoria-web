type Describe = (target?: string) => string

const named =
  (withName: (name: string) => string, withoutName: string): Describe =>
  target =>
    target ? withName(target) : withoutName

/**
 * What each logged route means, keyed by the API's `action` (method and route pattern).
 * The person in the drawer is the subject: "Alterou a conta de Ana Souza".
 */
export const ACTION_TEXTS: Record<string, Describe> = {
  'POST /api/auth/sign-in/email': () => 'Entrou no painel',
  'POST /api/auth/sign-out': () => 'Saiu do painel',
  'POST /api/auth/change-password': () => 'Trocou a senha',

  'POST /api/users': named(
    name => `Criou a conta de ${name}`,
    'Criou uma conta'
  ),
  'POST /api/users/:id/update': named(
    name => `Alterou a conta de ${name}`,
    'Alterou uma conta'
  ),
  'POST /api/users/:id/reset-password': named(
    name => `Gerou uma nova senha para ${name}`,
    'Gerou uma nova senha para uma conta'
  ),
  'POST /api/users/:id/deactivate': named(
    name => `Desativou a conta de ${name}`,
    'Desativou uma conta'
  ),
  'POST /api/users/:id/reactivate': named(
    name => `Reativou a conta de ${name}`,
    'Reativou uma conta'
  ),

  'POST /api/service-areas': named(
    name => `Adicionou ${name} às cidades atendidas`,
    'Adicionou uma cidade atendida'
  ),
  'POST /api/service-areas/update-location': named(
    name => `Corrigiu a cidade ${name}`,
    'Corrigiu uma cidade atendida'
  ),
  'POST /api/service-areas/remove': named(
    name => `Removeu ${name} das cidades atendidas`,
    'Removeu uma cidade atendida'
  ),
  'POST /api/service-areas/reactivate': named(
    name => `Voltou a atender ${name}`,
    'Reativou uma cidade atendida'
  ),

  'POST /api/complaints/approve': () => 'Publicou um caso',
  'POST /api/complaints/reject': () => 'Rejeitou um caso',
  'POST /api/complaints/claim': () => 'Assumiu um caso',
  'POST /api/complaints/reassign': () => 'Passou um caso para outra pessoa',
  'POST /api/complaints/start-progress': () => 'Pôs um caso em andamento',
  'POST /api/complaints/mark-unresolved': () =>
    'Marcou um caso como não resolvido',
  'POST /api/complaints/resolve': () => 'Marcou um caso como resolvido',
  'POST /api/complaints/notes': () => 'Escreveu uma nota interna num caso',
  'POST /api/complaints/share-identity': () =>
    'Liberou o nome da pessoa ao gestor',
  'POST /api/complaints/revoke-identity-sharing': () =>
    'Retirou o nome da pessoa do gestor',
  'POST /api/complaints/messages': () => 'Enviou uma mensagem pelo WhatsApp',
  'POST /api/complaints/read': () => 'Marcou um caso como lido',

  'POST /api/notifications/read-all': () =>
    'Marcou todas as notificações como lidas',
  'POST /api/notifications/:id/read': () => 'Marcou uma notificação como lida',
}

export const STAFF_ACTIONS_CONTENT = {
  intro:
    'O que esta pessoa fez no painel, do mais recente ao mais antigo, e as tentativas de entrar na conta dela.',
  signInRefused: 'Tentativa de entrar nesta conta',
  unknownAction: 'Fez uma ação no painel',
  deniedRead: 'Tentou abrir uma área do painel',
  rejected: 'Recusada',
  refused: 'Não concluída',
  denied: 'Sem permissão',
  today: 'Hoje',
  yesterday: 'Ontem',
  loading: 'Carregando o histórico…',
  loadError: 'Não foi possível carregar o histórico agora.',
  empty: 'Nenhuma ação registrada ainda.',
  loadMore: 'Carregar ações mais antigas',
  loadingMore: 'Carregando…',
  end: 'Não há ações mais antigas.',
} as const
