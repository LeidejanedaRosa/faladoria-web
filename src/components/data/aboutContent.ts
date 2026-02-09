import simoneCelina from '@assets/simone_celina_sem_bg.webp'

export const ABOUT_HEADING_ID = 'about-heading'

export interface Partnership {
  id: string
  iconName: 'location' | 'chart' | 'activity' | 'chat'
  label: string
  description: string
}

export interface FounderInfo {
  name: string
  role: string
  image: string
  imageAlt: string
  quote: string
}

export const ABOUT_CONTENT = {
  headline: 'Quem faz acontecer',

  founder: {
    name: 'Simone Celina',
    role: 'Fundadora',
    image: simoneCelina,
    imageAlt:
      'Foto de Simone Celina, fundadora da Faladoria, sorrindo em ambiente profissional',
    quote:
      'A saúde pública melhora quando as pessoas são ouvidas e os gestores têm dados para agir.',
  } satisfies FounderInfo,

  partnerships: {
    label: 'Parcerias estratégicas',
    items: [
      {
        id: 'partnership-public',
        iconName: 'location',
        label: 'Gestão pública',
        description:
          'Colaboração direta com prefeituras e secretarias de saúde para transformar dados em ações concretas.',
      },
      {
        id: 'partnership-research',
        iconName: 'chart',
        label: 'Pesquisa acadêmica',
        description:
          'Parcerias com universidades para embasar nossas soluções em evidências científicas.',
      },
      {
        id: 'partnership-tech',
        iconName: 'activity',
        label: 'Tecnologia e saúde',
        description:
          'Integração com ferramentas digitais que ampliam o alcance e a eficiência do atendimento.',
      },
      {
        id: 'partnership-media',
        iconName: 'chat',
        label: 'Mídia e sociedade civil',
        description:
          'Conexões com veículos de comunicação e organizações que amplificam a voz dos usuários do SUS.',
      },
    ] satisfies Partnership[],
  },

  screenReaderHeading: 'Quem somos — Faladoria',

  screenReaderDescription:
    'Seção sobre Simone Celina, fundadora da Faladoria, e as parcerias estratégicas que sustentam o trabalho de mediação entre usuários do SUS e gestores de saúde.',
} as const
