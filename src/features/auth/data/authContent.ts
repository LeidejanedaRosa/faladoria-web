import { PANEL_ROUTES } from '@shared/data/routes'

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './passwordRules'

export const AUTH_ROUTES = {
  login: `${PANEL_ROUTES.root}/entrar`,
  changePassword: `${PANEL_ROUTES.root}/trocar-senha`,
  home: PANEL_ROUTES.root,
} as const

const CHANGE_PASSWORD_LABEL = 'Trocar a senha'

export const AUTH_CONTENT = {
  aside: {
    title: 'Painel Faladoria',
    description:
      'Acesso da equipe Faladoria e dos gestores de saúde para acompanhar e resolver as reclamações.',
    noAccess:
      'Ainda não tem acesso? A administradora da Faladoria cria a sua conta.',
  },
  login: {
    metaTitle: 'Entrar no painel',
    heading: 'Entrar no painel',
    emailLabel: 'E-mail',
    passwordLabel: 'Senha',
    submit: 'Entrar',
    submitting: 'Entrando…',
    forgotPassword:
      'Esqueceu a senha? Peça à administradora uma nova senha temporária.',
    switchPrompt: 'Precisa trocar a sua senha?',
    switchButton: CHANGE_PASSWORD_LABEL,
  },
  changePassword: {
    metaTitle: CHANGE_PASSWORD_LABEL,
    heading: CHANGE_PASSWORD_LABEL,
    intro: 'Informe o seu e-mail e a senha atual, e escolha uma senha nova.',
    forcedHeading: 'Crie a sua senha',
    forcedIntro:
      'Você entrou com uma senha temporária. Escolha uma senha só sua para continuar.',
    emailLabel: 'E-mail',
    currentLabel: 'Senha atual',
    forcedCurrentLabel: 'Senha temporária',
    newLabel: 'Nova senha',
    newHint: `De ${PASSWORD_MIN_LENGTH} a ${PASSWORD_MAX_LENGTH} caracteres.`,
    confirmLabel: 'Confirme a nova senha',
    submit: 'Salvar e continuar',
    submitting: 'Salvando…',
    signOut: 'Sair',
    switchPrompt: 'Já tem a sua senha?',
    switchButton: 'Entrar',
    forcedAsideNote:
      'A senha temporária serve só para o primeiro acesso. Depois de trocá-la, só você conhece a sua senha.',
    asideNote:
      'A senha nova vale na hora: se a sua conta estiver aberta em outro lugar com a senha antiga, ela é encerrada.',
  },
  validation: {
    emailRequired: 'Informe o e-mail.',
    emailInvalid: 'Digite um e-mail válido, como nome@exemplo.com.',
    passwordRequired: 'Informe a senha.',
    currentRequired: 'Informe a senha atual.',
    newTooShort: `A nova senha precisa ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`,
    newTooLong: `A nova senha pode ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`,
    newSameAsCurrent: 'A nova senha precisa ser diferente da atual.',
    confirmMismatch: 'As senhas não conferem.',
  },
  errors: {
    generic: 'Não foi possível concluir agora. Tente de novo em instantes.',
    INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
    TEMPORARY_PASSWORD_EXPIRED:
      'A sua senha temporária venceu. Peça uma nova à administradora.',
    ACCOUNT_DEACTIVATED:
      'Esta conta foi desativada. Fale com a administradora da Faladoria.',
    CURRENT_PASSWORD_INCORRECT: 'A senha atual não confere.',
    rateLimited: 'Muitas tentativas seguidas. Aguarde alguns segundos.',
    rateLimitedWithWait: (seconds: number) =>
      `Muitas tentativas seguidas. Aguarde ${seconds} segundos e tente de novo.`,
  },
} as const
