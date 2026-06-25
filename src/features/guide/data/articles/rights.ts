import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'seus-direitos'
const DATE_PUBLISHED = '2026-05-01'

export const rightsArticles: GuideArticle[] = [
  {
    slug: 'direito-a-saude',
    categorySlug: CATEGORY_SLUG,
    title: 'Direito à saúde',
    summary:
      'A saúde é direito de todos e dever do Estado, garantido pela Constituição Federal. Entenda o que isso significa para você.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'callout',
        text: 'A saúde é direito de todos e dever do Estado. Isso está no artigo 196 da Constituição Federal de 1988. Não é favor — é obrigação do governo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quem tem direito',
      },
      {
        type: 'list',
        items: [
          'Todo brasileiro tem direito ao atendimento pelo SUS',
          'Não importa renda, raça, religião ou onde você mora',
          'Você não precisa ter plano de saúde, não precisa pagar nada e não precisa comprovar pobreza',
          'Estrangeiros residentes no Brasil também têm direito ao atendimento',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que o SUS é obrigado a oferecer',
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
          'Atendimento domiciliar para quem não pode se locomover',
          'Transporte sanitário para quem precisa de tratamento em outro município',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Se negarem seu atendimento',
        text: 'Nenhum servidor público pode recusar atendimento alegando falta de dinheiro do município ou do estado. Se isso acontecer, peça o motivo por escrito e acione a Ouvidoria do SUS pelo 136.',
      },
    ],
  },
  {
    slug: 'carta-dos-direitos-dos-usuarios',
    categorySlug: CATEGORY_SLUG,
    title: 'Como você tem direito a ser tratado',
    summary:
      'Você tem direito a atendimento humanizado, sem discriminação e com respeito à sua privacidade em qualquer serviço do SUS.',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    iconName: 'person',
    content: [
      {
        type: 'callout',
        text: 'Toda unidade do SUS é obrigada por lei a te tratar com respeito. Isso não depende de quem te atende ou do dia que você chegou — é direito garantido pela Carta dos Direitos dos Usuários da Saúde.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'No atendimento',
      },
      {
        type: 'list',
        items: [
          'Ser atendido com educação, sem grosseria ou humilhação',
          'Saber o nome e o número de registro do profissional que vai te atender',
          'Receber explicações claras sobre seu diagnóstico e o tratamento indicado',
          'Não ser discriminado por raça, religião, gênero, orientação sexual ou condição social',
          'Ter privacidade garantida durante o exame ou consulta',
          'Concordar ou recusar um tratamento depois de entender todas as informações',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Sobre suas informações de saúde',
      },
      {
        type: 'list',
        items: [
          'Ter sigilo completo — ninguém pode divulgar seus dados de saúde sem sua autorização',
          'Acessar seu prontuário médico sempre que quiser',
          'Pedir uma segunda opinião médica',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Em internação e parto',
      },
      {
        type: 'list',
        items: [
          'Ter um acompanhante durante a internação hospitalar',
          'Ter um acompanhante durante o parto e o pós-parto imediato',
          'Receber visitas de familiares nos horários permitidos',
          'Ser encaminhado para outro serviço quando a unidade não conseguir te atender',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Se algum desses direitos for desrespeitado',
        text: 'Anote o nome do profissional, o horário e o que aconteceu. Você pode registrar uma reclamação na Ouvidoria do SUS ligando para o 136 — gratuito e disponível 24 horas.',
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
    dateModified: DATE_PUBLISHED,
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
        variant: 'tip',
        text: 'Você não precisa de advogado particular para exigir seus direitos. A Defensoria Pública atende gratuitamente quem não pode pagar. Procure a unidade mais próxima da sua cidade.',
      },
    ],
  },
]
