import simoneCelina from '@assets/simone-about.png'

export const ABOUT_HEADING_ID = 'about-heading'

export interface FounderInfo {
  name: string
  role: string
  image: string
  imageAlt: string
}

export interface TextSegment {
  text: string
  bold?: boolean
}

export interface FounderTrait {
  id: string
  iconName: 'person' | 'fist' | 'users' | 'heart'
  segments: TextSegment[]
}

export const ABOUT_CONTENT = {
  headline: 'Quem faz acontecer',

  founder: {
    name: 'Simone Celina',
    role: 'Fundadora do Faladoria',
    image: simoneCelina,
    imageAlt:
      'Simone Celina, fundadora da Faladoria, sorrindo com os braços cruzados',
  } satisfies FounderInfo,

  traits: [
    {
      id: 'trait-citizen',
      iconName: 'person',
      segments: [
        {
          text: 'É cidadã, usuária do SUS, preocupada e indignada com as dificuldades de acesso ao sistema, ',
        },
        { text: 'criou o Faladoria, na marra!', bold: true },
      ],
    },
    {
      id: 'trait-power',
      iconName: 'fist',
      segments: [
        { text: 'Lembra que ' },
        { text: 'o poder maior, está nas mãos da população', bold: true },
        { text: ', embora não pareça.' },
      ],
    },
    {
      id: 'trait-community',
      iconName: 'users',
      segments: [
        { text: 'Trabalha para que efetivamente, ' },
        {
          text: 'a população faça parte da construção das soluções e direitos respeitados.',
          bold: true,
        },
      ],
    },
    {
      id: 'trait-together',
      iconName: 'heart',
      segments: [{ text: 'E ' }, { text: 'conta com você.', bold: true }],
    },
  ] satisfies FounderTrait[],

  screenReaderDescription:
    'Simone Celina, fundadora da Faladoria: cidadã usuária do SUS que criou a plataforma para ampliar o poder da população na construção de soluções em saúde.',
} as const
