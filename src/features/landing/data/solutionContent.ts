import canalIndependente from '@assets/canal_independente.webp'
import logoFaladoria from '@assets/logo_faladoria.svg'
import medicacao from '@assets/medicacao.webp'
import relatorios from '@assets/relatorios.webp'
import transparencia from '@assets/transparencia.webp'

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
      iconWidth: 97,
      iconHeight: 92,
      title: 'Canal independente',
      description:
        'Canal independente para denunciar problemas na saúde pública.',
    },
    {
      id: 'medication',
      icon: medicacao,
      iconAlt: 'Ícone de medicação entre cidadãos e gestão pública',
      iconWidth: 85,
      iconHeight: 88,
      title: 'Medicação ativa',
      description: 'Medicação ativa entre cidadãos e gestão pública.',
    },
    {
      id: 'transparency',
      icon: transparencia,
      iconAlt: 'Ícone de transparência e acompanhamento de demandas',
      iconWidth: 84,
      iconHeight: 93,
      title: 'Transparência',
      description: 'Transparência e acompanhamento das demandas.',
    },
    {
      id: 'reports',
      icon: relatorios,
      iconAlt: 'Ícone de relatórios estratégicos',
      iconWidth: 89,
      iconHeight: 91,
      title: 'Relatórios estratégicos',
      description: 'Relatórios estratégicos para melhoria dos serviços.',
    },
  ],
} as const
