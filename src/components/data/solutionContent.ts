import canalIndependente from '@assets/canal_independente.png'
import logoFaladoria from '@assets/logo_faladoria.svg'
import mediacao from '@assets/mediacao.png'
import transparencia from '@assets/transparencia.png'
import relatorios from '@assets/relatorios.png'

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
      id: 'independent-channel',
      icon: canalIndependente,
      iconAlt: 'Ícone de canal independente para denúncias',
      title: 'Canal independente',
      description:
        'Canal independente para denunciar problemas na saúde pública.',
    },
    {
      id: 'mediation',
      icon: mediacao,
      iconAlt: 'Ícone de mediação entre cidadãos e gestão pública',
      title: 'Mediação ativa',
      description: 'Mediação ativa entre cidadãos e gestão pública.',
    },
    {
      id: 'transparency',
      icon: transparencia,
      iconAlt: 'Ícone de transparência e acompanhamento de demandas',
      title: 'Transparência',
      description: 'Transparência e acompanhamento das demandas.',
    },
    {
      id: 'reports',
      icon: relatorios,
      iconAlt: 'Ícone de relatórios estratégicos',
      title: 'Relatórios estratégicos',
      description: 'Relatórios estratégicos para melhoria dos serviços.',
    },
  ],
} as const
