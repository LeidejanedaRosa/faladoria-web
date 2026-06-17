import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'equipamentos'
const DATE_PUBLISHED = '2026-05-01'

export const equipmentArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-equipamentos',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar equipamentos pelo SUS',
    summary:
      'Cadeiras de rodas, muletas, órteses, próteses e respiradores podem ser solicitados gratuitamente.',
    datePublished: DATE_PUBLISHED,
    iconName: 'target',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS fornece equipamentos de saúde gratuitamente para pessoas que precisam — cadeiras de rodas, muletas, bengalas, órteses (aparelhos que apoiam o corpo), próteses (substituição de membros) e equipamentos respiratórios.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Equipamentos disponíveis pelo SUS',
      },
      {
        type: 'list',
        items: [
          'Cadeiras de rodas (manuais e motorizadas, conforme necessidade)',
          'Muletas, bengalas e andadores',
          'Órteses — talas, coletes, palmilhas ortopédicas',
          'Próteses — membros artificiais após amputação',
          'Equipamentos respiratórios — CPAP, BiPAP, concentrador de oxigênio',
          'Aparelhos auditivos (em alguns casos)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Consulte um médico especialista (ortopedista, fisiatra, neurologista) no SUS',
          'O médico emite um laudo indicando o equipamento necessário',
          'Vá à Secretaria de Saúde do município com o laudo e documentos',
          'O pedido é analisado e, se aprovado, o equipamento é disponibilizado',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Documentos necessários',
      },
      {
        type: 'list',
        items: [
          'Laudo médico descrevendo a necessidade e o equipamento indicado',
          'Cartão do SUS',
          'Documento com foto (RG ou CNH)',
          'CPF',
          'Comprovante de residência',
        ],
      },
      {
        type: 'callout',
        text: 'Se o pedido for negado ou a espera for muito longa, procure a Defensoria Pública. Equipamentos essenciais para a saúde e mobilidade são direito garantido — e a Justiça frequentemente determina o fornecimento em caráter de urgência.',
      },
    ],
  },
]
