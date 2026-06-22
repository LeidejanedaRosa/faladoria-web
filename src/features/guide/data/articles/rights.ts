import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'seus-direitos'
const DATE_PUBLISHED = '2026-05-01'

export const rightsArticles: GuideArticle[] = [
  {
    slug: 'direito-a-saude',
    categorySlug: CATEGORY_SLUG,
    title: 'Direito à saúde',
    summary:
      'A saúde é um direito de todos e dever do Estado, garantido pela Constituição Federal de 1988.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'callout',
        text: 'A saúde é direito de todos e dever do Estado. Isso está na Constituição Federal, no artigo 196. Não é favor — é obrigação do governo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que isso significa na prática',
      },
      {
        type: 'list',
        items: [
          'Todo brasileiro tem direito ao atendimento pelo SUS, independente de renda, raça ou onde mora',
          'Você não precisa ter plano de saúde, não precisa pagar nada e não precisa comprovar pobreza',
          'Acesso organizado e sem discriminação',
          'Tratamento adequado para sua condição',
          'Atendimento humanizado, com respeito e dignidade',
          'Informações claras sobre diagnóstico e tratamento',
          'Privacidade e sigilo médico protegidos',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que você pode exigir',
      },
      {
        type: 'list',
        items: [
          'Consultas em todas as especialidades médicas',
          'Exames laboratoriais e de imagem',
          'Cirurgias e procedimentos necessários',
          'Medicamentos da lista do SUS',
          'Internação hospitalar quando necessário',
          'Atendimento de urgência e emergência a qualquer hora',
        ],
      },
      {
        type: 'callout',
        text: 'Nenhum servidor público pode negar atendimento alegando falta de dinheiro do município ou do estado. Se isso acontecer, você tem caminhos legais para exigir o que é seu por direito.',
      },
    ],
  },
  {
    slug: 'como-exigir-seus-direitos',
    categorySlug: CATEGORY_SLUG,
    title: 'Como exigir seus direitos',
    summary:
      'Saiba quais canais acionar quando o atendimento no SUS for negado ou demorar além do prazo.',
    datePublished: DATE_PUBLISHED,
    iconName: 'fist',
    content: [
      {
        type: 'paragraph',
        text: 'Se o SUS não estiver funcionando como deveria — consulta negada, medicamento em falta, fila sem prazo — você não precisa aceitar. Há um caminho a seguir, passo a passo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que fazer, passo a passo',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Tente resolver na unidade de saúde',
        imageKey: 'ubs',
        detail:
          'Explique o problema com calma, peça o prazo para resolver e anote o nome de quem te atendeu.',
      },
      {
        type: 'action-step',
        action: 'Procure a Secretaria de Saúde do município',
        detail:
          'Leve documentos que comprovem o problema: receitas, laudos ou pedidos de exame.',
      },
      {
        type: 'action-step',
        action: 'Acione a Ouvidoria do SUS: 136',
        imageKey: 'phone',
        detail:
          'Gratuito, funciona 24h. Exija o número de protocolo em cada etapa.',
      },
      {
        type: 'action-step',
        action: 'Procure a Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'O serviço é gratuito. Em muitos casos, um juiz pode obrigar o Estado a agir em dias.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar em cada etapa',
        items: [
          'Cartão do SUS e documento com foto',
          'Receitas, laudos e pedidos de exame',
          'Número de protocolo de cada tentativa anterior',
        ],
      },
      {
        type: 'callout',
        text: 'Você não precisa de advogado particular para exigir seus direitos. A Defensoria Pública atende gratuitamente quem não pode pagar. Procure a unidade mais próxima da sua cidade.',
      },
    ],
  },
]
