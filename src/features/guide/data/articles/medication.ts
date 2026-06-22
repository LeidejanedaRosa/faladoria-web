import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'medicamento'
const DATE_PUBLISHED = '2026-05-01'

export const medicationArticles: GuideArticle[] = [
  {
    slug: 'farmacia-basica',
    categorySlug: CATEGORY_SLUG,
    title: 'Como retirar medicamento gratuitamente pelo SUS',
    summary:
      'Saiba como retirar medicamentos gratuitos nas farmácias do SUS — o que levar, quais estão disponíveis e o que fazer se estiver em falta.',
    datePublished: DATE_PUBLISHED,
    iconName: 'syringe',
    content: [
      {
        type: 'paragraph',
        text: 'O SUS oferece medicamentos gratuitos para a maioria das doenças comuns — diabetes, hipertensão, tireoide e muitas outras. Você retira na Farmácia do SUS ou na Farmácia Popular mais próxima.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como retirar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Consulte um médico na UBS',
        imageKey: 'doctor-patient',
        detail: 'Só o profissional de saúde pode prescrever o medicamento.',
      },
      {
        type: 'action-step',
        action: 'Vá à farmácia do SUS com a receita',
        imageKey: 'medications',
        detail: 'Ou à unidade indicada na sua cidade.',
      },
      {
        type: 'action-step',
        action: 'Apresente os documentos e retire',
        imageKey: 'checklist',
        detail: 'Cartão do SUS, documento com foto e receita médica.',
      },
      {
        type: 'callout',
        text: 'Já usa o medicamento há algum tempo? Se ele estiver cadastrado no sistema, basta levar o Cartão do SUS. A receita só é obrigatória na primeira retirada ou na renovação.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Receita médica atualizada',
          'Cartão do SUS',
          'Documento com foto (RG, CNH ou Carteira de Trabalho)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'E se estiver em falta ou for negado?',
        icon: 'activity',
      },
      {
        type: 'action-step',
        action: 'Peça uma alternativa à farmácia',
        imageKey: 'medications',
        detail:
          'Solicite medicamento com a mesma finalidade ou volte ao médico para trocar a receita.',
      },
      {
        type: 'action-step',
        action: 'Registre na Secretaria de Saúde',
        imageKey: 'phone',
        detail:
          'Pergunte sobre outras farmácias com estoque e registre a ocorrência.',
      },
      {
        type: 'action-step',
        action: 'Registre na Ouvidoria Municipal',
        detail:
          'Exija o número de protocolo — você vai precisar nas próximas etapas.',
      },
      {
        type: 'action-step',
        action: 'Ligue para a Ouvidoria do SUS: 136',
        detail: 'Gratuito, 24h. Tenha o protocolo da etapa anterior em mãos.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'Em casos graves, a Justiça pode garantir o medicamento em menos de 24 horas.',
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso grave',
        text: 'Se a falta do medicamento oferecer risco à vida, não aguarde os passos administrativos. Procure a Defensoria Pública imediatamente — a Justiça pode determinar o fornecimento em menos de 24 horas.',
      },
    ],
  },
  {
    slug: 'medicamentos-alto-custo',
    categorySlug: CATEGORY_SLUG,
    title: 'Como conseguir medicamento de alto custo pelo SUS',
    summary:
      'Saiba como solicitar medicamentos caros pelo Componente Especializado, quais doenças são cobertas e o que fazer se o pedido for negado.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'paragraph',
        text: 'Alguns medicamentos são muito caros e tratam doenças graves de longa duração. O SUS oferece esses medicamentos de forma gratuita pelo Componente Especializado da Assistência Farmacêutica (CEAF).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Consulte um especialista no SUS',
        imageKey: 'doctor-patient',
        detail: 'Obtenha a receita e o laudo médico com o especialista.',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde do estado',
        detail:
          'Leve toda a documentação de uma vez — pedidos incompletos atrasam a análise.',
      },
      {
        type: 'action-step',
        action: 'Preencha o formulário de solicitação',
        imageKey: 'checklist',
        detail: 'O atendente vai te ajudar a preencher.',
      },
      {
        type: 'action-step',
        action: 'Aguarde a aprovação do pedido',
        imageKey: 'calendar',
        detail:
          'O prazo costuma ser de 15 a 60 dias. Medicamentos urgentes podem ser autorizados mais rápido.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [
          'Receita médica com CRM do médico',
          'Laudo ou relatório médico detalhado',
          'Exames que comprovam o diagnóstico',
          'Cartão do SUS e documento com foto',
          'CPF',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'E se for negado?',
        icon: 'activity',
      },
      {
        type: 'action-step',
        action: 'Peça a justificativa da negativa por escrito',
        detail: 'Você tem direito a saber o motivo oficial da recusa.',
      },
      {
        type: 'action-step',
        action: 'Acione a Ouvidoria do Estado',
        imageKey: 'phone',
        detail: 'Registre o caso e exija o número de protocolo.',
      },
      {
        type: 'action-step',
        action: 'Ligue para o Disque Saúde: 136',
        detail: 'Gratuito, 24h. Tenha o protocolo da etapa anterior em mãos.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'Em casos urgentes, a Justiça pode garantir o medicamento por liminar em menos de 24 horas.',
      },
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Caso urgente',
        text: 'Se a demora ou negativa oferecer risco à vida, procure a Defensoria Pública imediatamente. O atendimento é gratuito.',
      },
    ],
  },
]
