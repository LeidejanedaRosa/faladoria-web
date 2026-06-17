import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'denuncias'
const DATE_PUBLISHED = '2026-05-01'

export const complaintsArticles: GuideArticle[] = [
  {
    slug: 'canais-de-denuncia',
    categorySlug: CATEGORY_SLUG,
    title: 'Canais de denúncia',
    summary:
      'Conheça os canais oficiais para denunciar irregularidades no atendimento do SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'megaphone',
    content: [
      {
        type: 'paragraph',
        text: 'Quando o SUS não funciona como deveria — mau atendimento, demora excessiva, negativa de serviço — você tem o direito e o dever de denunciar. Sua denúncia ajuda a melhorar o sistema para todos.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que pode ser denunciado',
      },
      {
        type: 'list',
        items: [
          'Negativa de atendimento sem justificativa',
          'Demora excessiva em consultas, exames, cirurgias ou medicamentos',
          'Mau atendimento, desrespeito ou discriminação',
          'Falta de profissionais ou estrutura nas unidades de saúde',
          'Ausência de informação sobre serviços disponíveis',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Canais para denunciar',
      },
      {
        type: 'list',
        items: [
          'Disque Saúde 136 — gratuito, funciona 24 horas, 7 dias por semana',
          'Ouvidoria Municipal de Saúde — procure na prefeitura da sua cidade',
          'Ouvidoria do SUS — disponível presencialmente ou pelo portal do governo',
          'Conselho Municipal de Saúde — órgão de controle social com representação da população',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Para casos urgentes',
      },
      {
        type: 'list',
        items: [
          'Ministério Público — pode exigir providências imediatas do poder público',
          'Defensoria Pública — atendimento gratuito para quem não pode pagar advogado',
          'Judiciário — em emergências, um juiz pode determinar o atendimento em até 72 horas',
        ],
      },
      {
        type: 'callout',
        text: 'Anote sempre: data, horário, nome do atendente e o que aconteceu. Esses registros são fundamentais para que sua denúncia seja efetiva.',
      },
    ],
  },
  {
    slug: 'ouvidoria-do-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Ouvidoria do SUS',
    summary:
      'Saiba como acionar a ouvidoria do SUS e o que esperar após registrar sua reclamação.',
    datePublished: DATE_PUBLISHED,
    iconName: 'phone',
    content: [
      {
        type: 'paragraph',
        text: 'A Ouvidoria do SUS é o canal oficial para registrar reclamações, denúncias, sugestões e elogios sobre os serviços de saúde pública. É gratuita e confidencial.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acionar a Ouvidoria',
      },
      {
        type: 'list',
        items: [
          'Disque Saúde: 136 — gratuito, 24 horas por dia, 7 dias por semana',
          'Presencialmente — na Secretaria Municipal ou Estadual de Saúde',
          'Online — pelo portal da Ouvidoria do Ministério da Saúde',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que acontece depois da denúncia',
      },
      {
        type: 'list',
        items: [
          'Você recebe um número de protocolo — guarde para acompanhar',
          'A denúncia é encaminhada ao órgão responsável',
          'O prazo para resposta é de até 30 dias úteis',
          'Se não houver resposta, acione os canais de urgência',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que informar ao registrar',
      },
      {
        type: 'list',
        items: [
          'Nome da unidade de saúde (UBS, hospital, etc.)',
          'Data e horário do ocorrido',
          'Nome do profissional envolvido (se souber)',
          'Descrição clara do que aconteceu',
          'O que você está solicitando (solução, explicação, providência)',
        ],
      },
      {
        type: 'callout',
        text: 'Você pode fazer a denúncia de forma anônima. Mas se informar seus dados, será mais fácil receber um retorno sobre o que foi feito para resolver o problema.',
      },
    ],
  },
]
