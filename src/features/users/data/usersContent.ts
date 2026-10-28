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
    FORBIDDEN: 'Só a administração pode criar contas.',
    generic: 'Não foi possível concluir agora. Tente de novo em instantes.',
  },
} as const
