import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'judicializacao'
const DATE_PUBLISHED = '2026-05-01'

export const judicialActionArticles: GuideArticle[] = [
  {
    slug: 'quando-judicializar',
    categorySlug: CATEGORY_SLUG,
    title: 'Quando recorrer à Justiça',
    summary:
      'A Justiça é o último recurso — mas não precisa ser caso grave. Saiba quando ir direto e quando esgotar os canais antes.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'fist',
    content: [
      {
        type: 'callout',
        text: 'Qualquer pessoa pode judicializar após esgotar os canais administrativos. Não precisa ser caso grave nem urgente para ter esse direito.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Caso urgente — vá direto à Justiça',
        icon: 'activity',
      },
      {
        type: 'list',
        items: [
          'Há risco de morte ou dano irreversível à saúde sem atendimento imediato',
          'Não há tempo para aguardar a resposta da Secretaria ou da Ouvidoria',
          'Nesse caso: procure a Defensoria Pública, o Ministério Público ou o Judiciário diretamente — sem passar pelas etapas anteriores',
          'O juiz tem até 72 horas para decidir uma liminar em casos de saúde urgentes',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Necessário, mas sem urgência imediata',
        icon: 'shield',
      },
      {
        type: 'paragraph',
        text: 'Se não há risco imediato de vida, tente primeiro a Secretaria Municipal, a Ouvidoria e o Ministério Público. Se nenhum deles resolver, a Justiça é o próximo passo.',
      },
      {
        type: 'list',
        items: [
          'Consulta com especialista negada ou com espera superior a meses',
          'Medicamento não disponível nas farmácias do SUS',
          'Cirurgia necessária sem previsão de data',
          'Tratamento indicado pelo médico não autorizado',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Casos não urgentes também são aceitos pela Justiça — desde que você comprove a necessidade médica e as tentativas anteriores pelos canais administrativos.',
      },
    ],
  },
  {
    slug: 'como-entrar-na-justica',
    categorySlug: CATEGORY_SLUG,
    title: 'Como entrar na Justiça pelo SUS',
    summary:
      'Reúna os documentos certos, procure a Defensoria Pública e peça uma liminar se o caso for urgente. O atendimento é gratuito.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'target',
    content: [
      {
        type: 'paragraph',
        text: 'Você não precisa entender de lei para judicializar. Precisa reunir os documentos certos e encontrar um profissional que te represente — o que pode ser feito de graça pela Defensoria Pública.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer, passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Reúna todos os documentos médicos',
        imageKey: 'checklist',
        detail:
          'Receitas, laudos, pedidos de exame ou cirurgia, comprovantes de negativa e os protocolos das tentativas anteriores.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública ou o Ministério Público',
        imageKey: 'patient-rights',
        detail:
          'Ambos são gratuitos. O defensor ou promotor analisa o caso e entra com a ação. Você não precisa de advogado particular.',
      },
      {
        type: 'action-step',
        action: 'Em casos urgentes, peça uma liminar',
        imageKey: 'clock',
        detail:
          'A liminar (ou tutela de urgência) é uma decisão judicial que obriga o Estado a agir imediatamente. O juiz tem até 72 horas para decidir.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar para a Defensoria',
        items: [
          'Laudo ou receita médica com o que você precisa',
          'Cartão do SUS e documento com foto',
          'CPF e comprovante de residência',
          'Protocolos das tentativas anteriores (Ouvidoria, Secretaria)',
          'Qualquer documento que comprove a negativa do SUS',
        ],
      },
    ],
  },
  {
    slug: 'preciso-pagar-advogado',
    categorySlug: CATEGORY_SLUG,
    title: 'Preciso pagar advogado para ir à Justiça?',
    summary:
      'Não. A Defensoria Pública atende gratuitamente quem não pode pagar. Você não precisa desistir da Justiça por falta de dinheiro.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'question',
    content: [
      {
        type: 'callout',
        text: 'A lei garante assistência jurídica gratuita a quem não pode pagar advogado. Isso está na Constituição Federal, artigo 5º, inciso LXXIV.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Defensoria Pública — atendimento gratuito',
        icon: 'users',
      },
      {
        type: 'list',
        items: [
          'Atende gratuitamente quem não tem condições de pagar advogado particular',
          'O defensor público analisa o caso, orienta e entra com a ação',
          'Presente na maioria das comarcas do Brasil',
          'Para encontrar a unidade mais próxima, ligue para o 136 ou procure no site da Defensoria do seu estado',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Outras opções de assistência jurídica gratuita',
        icon: 'shield',
      },
      {
        type: 'list',
        items: [
          'OAB (Ordem dos Advogados): pode indicar advogados e projetos de assistência jurídica gratuita',
          'Judiciário: se não houver Defensoria na cidade, o juiz pode nomear um advogado',
          'Advogado particular: pode pedir "justiça gratuita" e dispensar o pagamento das custas processuais se você comprovar hipossuficiência financeira',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Se não tiver Defensoria na sua cidade',
        text: 'Vá ao fórum (Judiciário) da sua cidade e informe que precisa de assistência jurídica gratuita para um caso de saúde. O cartório indica o caminho certo.',
      },
    ],
  },
]
