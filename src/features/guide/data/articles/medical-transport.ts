import type { GuideArticle } from '../guideArticles'
import {
  DOC_PHOTO_ID,
  DOC_PROOF_OF_ADDRESS,
  DOC_SUS_CARD,
} from './articleConstants'

const CATEGORY_SLUG = 'transporte-sanitario'
const DATE_PUBLISHED = '2026-05-01'

export const medicalTransportArticles: GuideArticle[] = [
  {
    slug: 'como-solicitar-transporte-sanitario',
    categorySlug: CATEGORY_SLUG,
    title: 'Como solicitar transporte sanitário',
    summary:
      'Se você não consegue se deslocar para consultas ou tratamentos, o SUS tem obrigação de garantir transporte gratuito. Saiba quem tem direito e como pedir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'location',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Quem tem direito',
        text: 'Pacientes que precisam de atendimento em outro município, sem condição de arcar com o deslocamento, em tratamento contínuo (quimioterapia, hemodiálise, fisioterapia) ou que precisam de acompanhante.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'clipboard',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS com o encaminhamento médico',
        imageKey: 'ubs',
        detail: 'O encaminhamento deve indicar o serviço em outro município.',
      },
      {
        type: 'action-step',
        action: 'Peça para falar sobre o TFD',
        imageKey: 'doctor-patient',
        detail:
          'Tratamento Fora do Domicílio — o profissional vai te orientar.',
      },
      {
        type: 'action-step',
        action: 'A Secretaria organiza o transporte',
        imageKey: 'ambulance',
        detail: 'A Secretaria de Saúde do seu município avalia o pedido.',
      },
      {
        type: 'action-step',
        action: 'Aguarde a confirmação',
        imageKey: 'calendar',
        detail: 'Anote o dia, horário e ponto de embarque confirmados.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos para levar à UBS',
        items: [
          'Encaminhamento médico com a indicação do serviço em outro município',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          DOC_PROOF_OF_ADDRESS,
          'Exames recentes relacionados ao tratamento (se tiver)',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Transporte negado?',
        text: 'Peça a negativa por escrito, registre no Disque Saúde (136) e procure a Ouvidoria da Secretaria. Falta de verba não é justificativa — o TFD é uma obrigação legal.',
      },
    ],
  },
  {
    slug: 'reembolso-tfd',
    categorySlug: CATEGORY_SLUG,
    title: 'Como pedir reembolso pelo TFD',
    summary:
      'Quando o município não tem veículo disponível, você pode ir por conta própria e receber reembolso das despesas. Saiba quando esse direito vale e como pedir.',
    datePublished: DATE_PUBLISHED,
    iconName: 'clipboard',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Transporte próprio também tem cobertura',
        text: 'Se o município não disponibilizar veículo, ele é obrigado a reembolsar as despesas com passagem ou combustível — desde que o deslocamento tenha sido autorizado previamente pela Secretaria de Saúde.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar o reembolso',
        icon: 'clipboard',
      },
      {
        type: 'action-step',
        action: 'Vá à Secretaria de Saúde após o atendimento',
        detail:
          'Leve a documentação do atendimento realizado — relatório, receita ou comprovante.',
      },
      {
        type: 'action-step',
        action: 'Entregue os comprovantes de transporte',
        imageKey: 'checklist',
        detail:
          'Bilhetes de ônibus, recibos de combustível ou qualquer comprovante de despesa.',
      },
      {
        type: 'action-step',
        action: 'Preencha o formulário de reembolso do TFD',
        detail: 'O atendente vai te ajudar a preencher.',
      },
      {
        type: 'action-step',
        action: 'Anote o número do protocolo',
        imageKey: 'phone',
        detail: 'Acompanhe o prazo de pagamento com o protocolo em mãos.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'Documentos para solicitar o reembolso',
        items: [
          'Autorização prévia do TFD emitida pela Secretaria de Saúde',
          'Comprovante do atendimento realizado (relatório médico, receita ou guia)',
          'Bilhetes de passagem ou recibo de combustível',
          DOC_SUS_CARD,
          DOC_PHOTO_ID,
          'Dados bancários para depósito',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Faça tudo com autorização prévia',
        text: 'O reembolso exige que o deslocamento tenha sido autorizado antes de acontecer. Se você viajou sem autorização da Secretaria, o reembolso pode ser negado legalmente.',
      },
    ],
  },
]
