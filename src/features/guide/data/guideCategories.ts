export interface GuideCategory {
  slug: string
  label: string
  description: string
  iconName:
    | 'shield'
    | 'heart'
    | 'clipboard'
    | 'syringe'
    | 'search'
    | 'megaphone'
  color: 'purple' | 'blue' | 'amber' | 'teal' | 'green' | 'rose'
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    slug: 'seus-direitos',
    label: 'Seus Direitos',
    description:
      'Conheça seus direitos como usuário do SUS e saiba como exigi-los.',
    iconName: 'shield',
    color: 'purple',
  },
  {
    slug: 'como-funciona-o-sus',
    label: 'Como funciona o SUS',
    description:
      'Entenda a estrutura do sistema público de saúde e como ele funciona na prática.',
    iconName: 'heart',
    color: 'blue',
  },
  {
    slug: 'como-conseguir',
    label: 'Como Conseguir',
    description:
      'Consultas, exames, cirurgias, tratamentos e medicamentos pelo SUS.',
    iconName: 'clipboard',
    color: 'amber',
  },
  {
    slug: 'vacinacao',
    label: 'Vacinação',
    description: 'Calendário vacinal completo e orientações por faixa etária.',
    iconName: 'syringe',
    color: 'teal',
  },
  {
    slug: 'prevencao',
    label: 'Prevenção',
    description:
      'Saúde preventiva para mulheres, homens e crianças por faixa etária.',
    iconName: 'search',
    color: 'green',
  },
  {
    slug: 'denuncie',
    label: 'Denuncie',
    description:
      'Canais de denúncia e como utilizá-los quando seus direitos forem violados.',
    iconName: 'megaphone',
    color: 'rose',
  },
]
