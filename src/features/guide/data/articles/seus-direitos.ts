import type { GuideArticle } from '../guideArticles'

export const seusDireitosArticles: GuideArticle[] = [
  {
    slug: 'direito-a-saude',
    categorySlug: 'seus-direitos',
    title: 'Direito à saúde',
    summary:
      'A saúde é um direito de todos e dever do Estado, garantido pela Constituição Federal de 1988.',
    datePublished: '2026-05-01',
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
        type: 'paragraph',
        text: 'Todo brasileiro tem direito ao atendimento pelo SUS, independente de renda, raça, religião ou onde mora. Você não precisa ter plano de saúde, não precisa pagar nada e não precisa comprovar pobreza.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Seus seis direitos fundamentais no SUS',
      },
      {
        type: 'list',
        items: [
          'Acesso ao atendimento de saúde de forma organizada e sem discriminação',
          'Tratamento adequado e efetivo para sua condição',
          'Atendimento humanizado, com respeito e sem preconceito',
          'Ser tratado com dignidade, tendo seus valores e crenças respeitados',
          'Receber informações claras sobre seu diagnóstico e tratamento',
          'Ter sua privacidade e sigilo médico protegidos',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'O que diz a lei',
      },
      {
        type: 'paragraph',
        text: 'Além da Constituição, a Lei nº 8.080/1990 reforça que "a saúde é direito fundamental do ser humano, devendo o Estado prover as condições indispensáveis ao seu pleno exercício". Essa lei organiza como o SUS deve funcionar em todo o país.',
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
    categorySlug: 'seus-direitos',
    title: 'Como exigir seus direitos',
    summary:
      'Saiba quais canais acionar quando o atendimento no SUS for negado ou demorar além do prazo.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'Se o SUS não estiver funcionando como deveria — consulta negada, medicamento em falta, fila sem prazo — você não precisa aceitar. Há um caminho a seguir, passo a passo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 1 — Tente resolver na unidade de saúde',
      },
      {
        type: 'paragraph',
        text: 'Comece pelo atendente e, se necessário, peça para falar com o responsável da unidade (diretor ou coordenador). Muitos problemas se resolvem aqui, sem precisar ir mais longe.',
      },
      {
        type: 'list',
        items: [
          'Explique o problema com calma e clareza',
          'Pergunte qual é o prazo para resolver',
          'Anote o nome de quem te atendeu e a data',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 2 — Procure a Secretaria de Saúde do município',
      },
      {
        type: 'paragraph',
        text: 'Se a unidade não resolver, vá à Secretaria Municipal de Saúde. Leve documentos que comprovem o problema: receitas, laudos, pedidos de exame ou qualquer papel relacionado.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 3 — Acione a Ouvidoria do SUS',
      },
      {
        type: 'paragraph',
        text: 'A Ouvidoria do SUS existe para registrar reclamações, sugestões e denúncias. Você pode acionar pelo telefone, presencialmente ou pela internet.',
      },
      {
        type: 'list',
        items: [
          'Disque Saúde: 136 (gratuito, funciona 24h)',
          'Ouvidoria estadual do SUS do seu estado',
          'Portal do governo federal: ouvidoria.saude.gov.br',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Passo 4 — Judicialização (último recurso)',
      },
      {
        type: 'paragraph',
        text: 'Se nenhuma das etapas anteriores funcionar, você pode recorrer à Justiça. Em muitos casos, um juiz pode obrigar o Estado a fornecer o medicamento ou o atendimento em dias.',
      },
      {
        type: 'list',
        items: [
          'Procure a Defensoria Pública do seu estado — o serviço é gratuito',
          'Leve todos os documentos que comprovam a necessidade',
          'Em emergências, o juiz pode determinar o atendimento em horas',
        ],
      },
      {
        type: 'callout',
        text: 'Você não precisa de advogado particular para exigir seus direitos. A Defensoria Pública atende gratuitamente quem não pode pagar. Procure a unidade mais próxima da sua cidade.',
      },
    ],
  },
]
