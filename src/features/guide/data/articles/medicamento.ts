import type { GuideArticle } from '../guideArticles'

export const medicamentoArticles: GuideArticle[] = [
  {
    slug: 'farmacia-basica',
    categorySlug: 'medicamento',
    title: 'Medicamentos da farmácia básica',
    summary:
      'Como retirar medicamentos gratuitos nas unidades de saúde e o que está disponível na lista básica.',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece medicamentos gratuitos para a maioria das doenças comuns — diabetes, hipertensão, tireoide e muitas outras. Você retira na Farmácia do SUS ou na Farmácia Popular mais próxima.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que levar para retirar o medicamento',
      },
      {
        type: 'list',
        items: [
          'Receita médica atualizada',
          'Cartão do SUS',
          'Documento com foto (RG, CNH ou Carteira de Trabalho)',
        ],
      },
      {
        type: 'callout',
        text: 'Já usa o medicamento há algum tempo? Se ele estiver cadastrado no sistema, basta levar o Cartão do SUS. A receita só é obrigatória na primeira vez ou quando houver renovação.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Tipos de medicamentos disponíveis na farmácia básica',
      },
      {
        type: 'list',
        items: [
          'Medicamentos básicos — para prevenção e tratamento de doenças comuns (diabetes, hipertensão, infecções)',
          'Medicamentos estratégicos — para doenças de controle especial, como dengue, tuberculose e malária',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O SUS aceita receita de médico particular?',
      },
      {
        type: 'paragraph',
        text: 'Sim. O SUS aceita receitas de atendimento particular. Se alguma farmácia se recusar a entregar o medicamento com receita particular, informe na Ouvidoria do SUS — essa prática não é permitida.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'E se o medicamento estiver em falta?',
      },
      {
        type: 'paragraph',
        text: 'Peça à farmácia uma alternativa com a mesma finalidade. Se não houver substituto disponível, volte ao médico e peça uma nova receita com outra opção.',
      },
      {
        type: 'list',
        items: [
          'Pergunte na Secretaria de Saúde do município sobre outras farmácias com estoque',
          'Acione a Ouvidoria do SUS se a falta for recorrente',
        ],
      },
    ],
  },
  {
    slug: 'medicamentos-alto-custo',
    categorySlug: 'medicamento',
    title: 'Medicamentos de alto custo',
    summary:
      'Descubra como solicitar medicamentos de alto custo pelo componente especializado da assistência farmacêutica.',
    content: [
      {
        type: 'paragraph',
        text: 'Alguns medicamentos são muito caros e tratam doenças graves de longa duração. O SUS oferece esses medicamentos de forma gratuita pelo Componente Especializado da Assistência Farmacêutica (CEAF).',
      },
      { type: 'heading', level: 2, text: 'Quais doenças estão cobertas' },
      {
        type: 'list',
        items: [
          'Câncer e quimioterapia oral',
          'Transplante de órgãos (imunossupressores)',
          'Hemodiálise e doenças renais crônicas',
          'Alzheimer e doenças neurológicas',
          'Esclerose múltipla',
          'Artrite reumatoide e doenças autoimunes graves',
        ],
      },
      { type: 'heading', level: 2, text: 'Como solicitar' },
      {
        type: 'list',
        items: [
          '1. Consulte um médico especialista no SUS e obtenha a receita e o laudo médico',
          '2. Vá à Secretaria de Saúde do seu estado com os documentos',
          '3. Preencha o formulário de solicitação (o atendente vai te ajudar)',
          '4. Aguarde a análise e aprovação do pedido',
        ],
      },
      { type: 'heading', level: 2, text: 'Documentos geralmente exigidos' },
      {
        type: 'list',
        items: [
          'Receita médica com CRM do médico',
          'Laudo ou relatório médico detalhado',
          'Exames que comprovam o diagnóstico',
          'Cartão do SUS e documento com foto',
          'CPF',
        ],
      },
      {
        type: 'callout',
        text: 'Não desista se o pedido for negado na primeira tentativa. Você pode recorrer pela Ouvidoria do SUS ou, em casos urgentes, acionar a Justiça para garantir o medicamento. O acesso à saúde é um direito seu.',
      },
    ],
  },
]
