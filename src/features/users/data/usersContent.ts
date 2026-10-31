import type { UserRole } from '@features/auth/services/authApi'

import type { UserStatus } from '../services/usersApi'
import { NAME_MAX_LENGTH } from './accountRules'

export const USERS_CONTENT = {
  metaTitle: 'Equipe',
  title: 'Equipe',
  intro:
    'As contas de quem usa o painel: a equipe da Faladoria e os gestores de saúde. Cada pessoa vê só as reclamações das cidades que atende.',
  newAccount: {
    open: 'Nova conta',
    heading: 'Nova conta',
    name: 'Nome',
    email: 'E-mail',
    emailHint: 'É o login da pessoa e não pode ser trocado depois.',
    role: 'Papel',
    submit: 'Criar conta',
    submitting: 'Criando…',
    cancel: 'Cancelar',
  },
  roleDescriptions: {
    admin:
      'Tudo, inclusive contas, cidades e o registro de ações. Vê todas as cidades.',
    assistant:
      'Modera as reclamações e conversa com quem reclamou, nas cidades que atende.',
    manager:
      'Recebe as reclamações publicadas das cidades que atende e informa o andamento.',
  } satisfies Record<UserRole, string>,
  cities: {
    label: 'Cidades que atende',
    search: 'Buscar cidade atendida',
    placeholder: 'Digite para buscar',
    noMatch: 'Nenhuma cidade atendida com esse nome.',
    results: (count: number) =>
      count === 1 ? '1 cidade encontrada' : `${count} cidades encontradas`,
    moreResults: (shown: number, total: number) =>
      `Mostrando ${shown} de ${total}. Continue digitando para encontrar.`,
    alreadyChosen: 'já escolhida',
    remove: (place: string) => `Tirar ${place}`,
    none: 'Nenhuma cidade escolhida.',
    adminSeesAll:
      'A administração vê todas as cidades: não é preciso escolher.',
    noServedCities: 'Ainda não há cidades atendidas.',
    goToServedCities: 'Cadastrar cidades atendidas',
  },
  password: {
    title: 'Conta criada',
    intro: (name: string) => `Passe esta senha temporária para ${name}:`,
    label: 'Senha temporária',
    copy: 'Copiar senha',
    copied: 'Senha copiada.',
    copyFailed: 'Não foi possível copiar. Selecione a senha e copie.',
    onlyNow:
      'Ela só aparece agora: a Faladoria não guarda a senha. Vale por 24 horas, e a pessoa cria a própria senha no primeiro acesso.',
    done: 'Já anotei a senha',
    created: (name: string) => `A conta de ${name} foi criada.`,
  },
  list: {
    heading: 'Contas',
    loading: 'Carregando as contas…',
    loadError: 'Não foi possível carregar as contas agora.',
    retry: 'Tentar de novo',
    retrying: 'Tentando de novo…',
    empty: 'Nenhuma conta além da sua.',
    you: 'você',
    role: 'Papel',
    cities: 'Cidades',
    allCities: 'Todas',
    noCity: 'Nenhuma cidade',
    status: 'Situação',
    openCases: 'Casos em andamento',
  },
  account: {
    breadcrumb: 'Trilha de navegação',
    edit: 'Editar',
    editLabel: (name: string) => `Editar a conta de ${name}`,
    loading: 'Carregando a conta…',
    loadError: 'Não foi possível carregar a conta agora.',
    notFoundTitle: 'Conta não encontrada',
    notFound:
      'Esta conta não existe, ou o endereço está incompleto. Escolha a conta na lista da equipe.',
    backToTeam: 'Voltar para a equipe',
    emailLabel: 'E-mail (login)',
    emailFixed:
      'O e-mail é o login e não pode ser trocado. Para corrigir, desative esta conta e crie outra.',
    detailsHeading: 'Dados da conta',
    ownRole: 'Você não pode trocar o próprio papel.',
    submit: 'Salvar alterações',
    submitting: 'Salvando…',
    cancel: 'Cancelar',
    saved: (name: string) => `As alterações de ${name} foram salvas.`,
    nothingChanged: 'Nada foi alterado.',
    outOfReach: (count: number) =>
      count === 1
        ? '1 caso em andamento continua com esta pessoa, mas o papel e as cidades de agora não permitem tratá-lo. Ele precisa ser passado para outra pessoa.'
        : `${count} casos em andamento continuam com esta pessoa, mas o papel e as cidades de agora não permitem tratá-los. Eles precisam ser passados para outra pessoa.`,
    citiesRemoved: (places: string[]) =>
      `A administração vê todas as cidades. Ao salvar, ${places.join(', ')} ${places.length === 1 ? 'sai' : 'saem'} desta conta.`,
    notServed: 'deixou de ser atendida',
  },
  statuses: {
    active: 'Ativa',
    pendingFirstAccess: 'Aguardando primeiro acesso',
    temporaryCredentialExpired: 'Senha temporária vencida',
    deactivated: 'Desativada',
  } satisfies Record<UserStatus, string>,
  errors: {
    nameRequired: 'Escreva o nome.',
    nameTooLong: `O nome pode ter até ${NAME_MAX_LENGTH} caracteres.`,
    emailRequired: 'Escreva o e-mail.',
    emailInvalid: 'Escreva um e-mail válido, como ana@exemplo.org.',
    roleRequired: 'Escolha o papel.',
    citiesRequired:
      'Escolha pelo menos uma cidade: sem cidade, a pessoa não vê nenhuma reclamação.',
    USER_EMAIL_ALREADY_EXISTS: 'Já existe uma conta com este e-mail.',
    ASSIGNED_CITY_NOT_SERVED: (places: string) =>
      `Estas cidades deixaram de ser atendidas: ${places}. Tire da lista e tente de novo.`,
    CANNOT_CHANGE_OWN_ROLE: 'Você não pode trocar o próprio papel.',
    NO_ACTIVE_ADMIN_LEFT:
      'Outra pessoa da administração mudou contas ao mesmo tempo, e o painel ficaria sem administração ativa. Nada foi alterado: recarregue a página e tente de novo.',
    USER_NOT_FOUND: 'Esta conta não existe mais. Volte para a equipe.',
    FORBIDDEN: 'Só a administração pode gerenciar contas.',
    generic: 'Não foi possível concluir agora. Tente de novo em instantes.',
  },
} as const
