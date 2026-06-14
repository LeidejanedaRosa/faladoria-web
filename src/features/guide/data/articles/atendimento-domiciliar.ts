import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'atendimento-domiciliar'
const DATE_PUBLISHED = '2026-05-01'

export const atendimentoDomiciliarArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-atendimento-domiciliar',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar atendimento domiciliar',
    summary:
      'Saiba quem tem direito ao atendimento em casa pelo SUS e como fazer a solicitação.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece atendimento em casa para pessoas que não conseguem se locomover até a unidade de saúde por conta de doenças, deficiências ou pós-operatório. O serviço é chamado de Atenção Domiciliar.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quem tem direito',
      },
      {
        type: 'list',
        items: [
          'Pessoas com dificuldade de locomoção por doença grave ou crônica',
          'Pacientes em recuperação de cirurgia ou internação hospitalar',
          'Idosos com limitação severa de mobilidade',
          'Pessoas com deficiência que impeça o deslocamento',
          'Pacientes em cuidados paliativos (doenças sem cura)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
      },
      {
        type: 'list',
        items: [
          '1. Vá à UBS e explique a situação — leve laudos ou documentos que comprovem a necessidade',
          '2. O médico avalia e indica o tipo de atenção domiciliar necessária',
          '3. O serviço é acionado pela própria UBS ou pela Secretaria de Saúde',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que a equipe domiciliar faz',
      },
      {
        type: 'list',
        items: [
          'Consultas médicas e de enfermagem em casa',
          'Curativos e procedimentos de baixa complexidade',
          'Acompanhamento de medicamentos e tratamentos',
          'Orientações para o cuidador familiar',
          'Fisioterapia domiciliar (em alguns casos)',
        ],
      },
      {
        type: 'callout',
        text: 'Se a UBS disser que não tem o serviço, procure a Secretaria de Saúde do município. O SUS tem obrigação de garantir atenção domiciliar para quem precisa — mesmo que precise acionar outro município.',
      },
    ],
  },
]
