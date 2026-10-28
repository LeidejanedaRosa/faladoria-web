const place = (city: string, state: string) => `${city}/${state}`

export const SERVICE_AREAS_CONTENT = {
  metaTitle: 'Cidades atendidas',
  title: 'Cidades atendidas',
  intro:
    'O bot do WhatsApp só aceita reclamações das cidades desta lista. Gestores e assistentes só podem receber cidades daqui.',
  add: {
    heading: 'Adicionar cidade',
    submit: 'Adicionar cidade',
    submitting: 'Adicionando…',
    added: (city: string, state: string) =>
      `${place(city, state)} foi adicionada à lista.`,
  },
  picker: {
    state: 'Estado',
    statePlaceholder: 'Escolha o estado',
    city: 'Cidade',
    cityPlaceholder: 'Digite para buscar',
    cityNeedsState: 'Escolha o estado primeiro',
    loadingCities: 'Carregando as cidades…',
    noMatch: 'Nenhuma cidade com esse nome neste estado.',
    alreadyServed: 'já atendida',
    moreResults: (shown: number, total: number) =>
      `Mostrando ${shown} de ${total}. Continue digitando para encontrar.`,
    results: (count: number) =>
      count === 1 ? '1 cidade encontrada' : `${count} cidades encontradas`,
    ibgeUnavailable:
      'A lista oficial de cidades (IBGE) não respondeu. Digite o nome como está no IBGE, com acentos.',
  },
  list: {
    heading: 'Lista de cidades',
    tabsLabel: 'Situação das cidades',
    active: 'Ativas',
    removed: 'Removidas',
    servedSince: (date: string) => `Atendida desde ${date}`,
    removedOn: (date: string) => `Removida em ${date}`,
    emptyActive: 'Nenhuma cidade atendida ainda. Adicione a primeira acima.',
    emptyRemoved: 'Nenhuma cidade removida.',
    loading: 'Carregando as cidades…',
    loadError: 'Não foi possível carregar as cidades agora.',
    retry: 'Tentar de novo',
    retrying: 'Tentando de novo…',
  },
  row: {
    edit: 'Corrigir',
    editLabel: (city: string, state: string) =>
      `Corrigir ${place(city, state)}`,
    save: 'Salvar',
    saving: 'Salvando…',
    cancel: 'Cancelar',
    remove: 'Remover',
    removeLabel: (city: string, state: string) =>
      `Remover ${place(city, state)}`,
    reactivate: 'Reativar',
    reactivating: 'Reativando…',
    reactivateLabel: (city: string, state: string) =>
      `Reativar ${place(city, state)}`,
    editing: (city: string, state: string) =>
      `Corrigindo ${place(city, state)}`,
    updated: (city: string, state: string) =>
      `A cidade foi corrigida para ${place(city, state)}.`,
    reactivated: (city: string, state: string) =>
      `${place(city, state)} voltou para a lista de cidades atendidas.`,
  },
  removeDialog: {
    title: (city: string, state: string) => `Remover ${place(city, state)}?`,
    consequence: 'O bot deixa de aceitar reclamações desta cidade.',
    countingAccounts: 'Conferindo quantas contas atendem esta cidade…',
    accounts: (count: number) =>
      count === 1
        ? '1 conta atende esta cidade e continua com ela até alguém editar a conta.'
        : `${count} contas atendem esta cidade e continuam com ela até alguém editar as contas.`,
    noAccounts: 'Nenhuma conta atende esta cidade.',
    accountsUnknown:
      'Não foi possível conferir as contas que atendem esta cidade.',
    undo: 'Você pode reativar depois, em "Removidas".',
    cancel: 'Cancelar',
    confirm: 'Remover cidade',
    confirming: 'Removendo…',
    removed: (city: string, state: string) =>
      `${place(city, state)} foi removida da lista.`,
  },
  errors: {
    stateRequired: 'Escolha o estado.',
    cityRequired: 'Escolha a cidade na lista.',
    SERVICE_AREA_ALREADY_EXISTS: 'Esta cidade já está na lista.',
    SERVICE_AREA_NOT_FOUND:
      'Esta cidade não existe mais na lista. A lista foi recarregada.',
    SERVICE_AREA_ALREADY_REMOVED:
      'Esta cidade já tinha sido removida. A lista foi recarregada.',
    SERVICE_AREA_NOT_REMOVED:
      'Esta cidade já estava ativa. A lista foi recarregada.',
    SERVICE_AREA_CONCURRENT_CHANGE:
      'Outra pessoa alterou esta cidade agora mesmo. A lista foi recarregada; confira e tente de novo.',
    FORBIDDEN: 'Só a administração pode alterar as cidades atendidas.',
    generic: 'Não foi possível concluir agora. Tente de novo em instantes.',
  },
} as const
