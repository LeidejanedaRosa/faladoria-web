import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'atendimento-domiciliar'
const DATE_PUBLISHED = '2026-05-01'

export const homeCareArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-atendimento-domiciliar',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar atendimento domiciliar',
    summary:
      'Se você ou alguém da sua família não consegue ir ao posto de saúde, o SUS pode mandar uma equipe até a sua casa. Veja quem tem direito e como pedir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Quem tem direito',
        icon: 'users',
      },
      {
        type: 'list',
        items: [
          'Pessoas com dificuldade de se locomover por doença grave ou crônica',
          'Pacientes se recuperando de cirurgia ou internação hospitalar',
          'Idosos com limitação severa de mobilidade',
          'Pessoas com deficiência que impeça o deslocamento',
          'Pacientes em cuidados paliativos (doenças sem perspectiva de cura)',
        ],
      },
      {
        type: 'image',
        imageKey: 'home-care-illustration',
        alt: 'Profissional de saúde atendendo idosa em casa',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que a equipe faz na sua casa',
        icon: 'heart',
      },
      {
        type: 'list',
        items: [
          'Consultas médicas e de enfermagem',
          'Curativos e procedimentos simples',
          'Acompanhamento de medicamentos e tratamentos',
          'Orientações para quem cuida do paciente em casa',
          'Fisioterapia domiciliar (em alguns municípios)',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Nem todo município oferece tudo',
        text: 'Os serviços variam conforme a estrutura do seu município. A UBS informa o que está disponível na sua cidade.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como pedir o atendimento',
        icon: 'clipboard',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Vá ao posto de saúde (UBS) e explique a situação',
          'Leve laudos ou documentos que comprovem a dificuldade de locomoção',
          'O médico avalia e faz o encaminhamento para o serviço domiciliar',
          'A própria UBS ou a Secretaria de Saúde aciona a equipe',
        ],
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos para levar',
        items: [
          'Cartão do SUS',
          'Documento com foto (RG ou CPF)',
          'Laudo ou receita médica com a justificativa do médico',
          'Exames recentes (se tiver)',
        ],
      },
      {
        type: 'info-panel',
        title: 'Precisa de encaminhamento médico?',
        text: 'Sim. Um médico precisa avaliar e registrar por escrito que o paciente não consegue se deslocar até a unidade de saúde. Se você ainda não tem esse documento, comece indo à UBS — o próprio médico de lá pode fazer essa avaliação.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se a UBS disser que não tem o serviço',
        icon: 'megaphone',
      },
      {
        type: 'paragraph',
        text: 'Não desista. Vá à Secretaria de Saúde do seu município e solicite formalmente o atendimento domiciliar. O SUS tem obrigação de garantir esse serviço — mesmo que precise acionar outra equipe ou outro município.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Negaram mesmo assim?',
        text: 'Registre uma reclamação na Ouvidoria do SUS pelo número 136 ou na ouvidoria da prefeitura. Se não resolver, você pode buscar orientação jurídica para garantir seu direito.',
      },
    ],
  },
]
