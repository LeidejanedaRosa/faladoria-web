import activeMediation from '@assets/active-mediation.webp'
import independentChannel from '@assets/independent-channel.webp'
import logoFaladoria from '@assets/logo_faladoria.svg'
import reports from '@assets/reports.webp'
import transparency from '@assets/transparency.webp'

export const SOLUTION_HEADING_ID = 'solution-heading'

export const SOLUTION_CONTENT = {
  sectionHeading: 'Conheça a solução da Faladoria',
  headline: {
    before: 'A',
    logo: logoFaladoria,
    after: 'transforma queixas em soluções',
  },
  subtitle: 'Dando voz a quem precisa ser ouvido',
  pillars: [
    {
      id: 'total-independence',
      icon: {
        kind: 'image',
        src: independentChannel,
        alt: 'Ícone representando independência — sem vínculo político ou institucional',
        width: 97,
        height: 92,
      },
      title: 'Independência total',
      description: 'Sem vínculo político ou institucional.',
    },
    {
      id: 'active-mediation',
      icon: {
        kind: 'image',
        src: activeMediation,
        alt: 'Ícone representando mediação ativa entre usuários e gestores de saúde',
        width: 85,
        height: 88,
      },
      title: 'Atuação ativa',
      description: 'Mediação real entre usuários e gestores de saúde.',
    },
    {
      id: 'transparency',
      icon: {
        kind: 'image',
        src: transparency,
        alt: 'Ícone representando transparência e dados abertos ao público',
        width: 84,
        height: 93,
      },
      title: 'Transparência',
      description: 'Dados e informações abertas ao público.',
    },
    {
      id: 'solution-focus',
      icon: {
        kind: 'image',
        src: reports,
        alt: 'Ícone representando foco na solução e busca por mudanças concretas',
        width: 89,
        height: 91,
      },
      title: 'Foco na solução',
      description: 'Indo além da escuta para buscar mudanças concretas.',
    },
    {
      id: 'accessibility',
      icon: {
        kind: 'svg',
        name: 'chat',
      },
      title: 'Acessibilidade',
      description: 'Sem burocracia, com comunicação simples e eficiente.',
    },
  ],
} as const
