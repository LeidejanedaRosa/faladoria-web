import type { GuideCategory } from './guideCategories'

export type CategoryGroupColor = 'amber' | 'green' | 'teal' | 'purple'

export interface CategoryGroup {
  slug: string
  label: string
  description: string
  iconName: GuideCategory['iconName']
  color: CategoryGroupColor
  categorySlugs: readonly string[]
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    slug: 'acesso-servicos',
    label: 'Acesso a serviços',
    description: 'Tudo o que você precisa para cuidar da sua saúde.',
    iconName: 'clipboard',
    color: 'amber',
    categorySlugs: [
      'consulta',
      'exame',
      'cirurgia',
      'tratamento',
      'medicamento',
      'atendimento-domiciliar',
      'transporte-sanitario',
      'equipamentos',
    ],
  },
  {
    slug: 'saude-por-publico',
    label: 'Saúde por público',
    description: 'Informações específicas para cada fase da vida.',
    iconName: 'users',
    color: 'green',
    categorySlugs: ['saude-da-mulher', 'saude-do-homem', 'saude-da-crianca'],
  },
  {
    slug: 'prevencao-saude-mental',
    label: 'Prevenção e saúde mental',
    description: 'Cuidar da mente também é saúde.',
    iconName: 'heart',
    color: 'teal',
    categorySlugs: ['vacinacao', 'saude-mental'],
  },
  {
    slug: 'direitos-acao',
    label: 'Direitos e ação',
    description: 'Conheça seus direitos e saiba como agir.',
    iconName: 'shield',
    color: 'purple',
    categorySlugs: [
      'seus-direitos',
      'como-funciona-o-sus',
      'denuncias',
      'judicializacao',
    ],
  },
]
