import filaAvif from '@assets/fila.avif'
import filaJpg from '@assets/fila.jpg'
import filaWebp from '@assets/fila.webp'
import medicamentosAvif from '@assets/medicamentos.avif'
import medicamentosJpg from '@assets/medicamentos.jpg'
import medicamentosWebp from '@assets/medicamentos.webp'
import pacienteAvif from '@assets/paciente.avif'
import pacienteJpeg from '@assets/paciente.jpeg'
import pacienteWebp from '@assets/paciente.webp'

export interface NewsArticleImage {
  avif: string
  webp: string
  fallback: string
  alt: string
  width: number
  height: number
}

export interface NewsArticle {
  id: string
  title: string
  source: string
  url: string
  image: NewsArticleImage
}

export const PROBLEM_HEADING_ID = 'problem-heading'

export const PROBLEM_CONTENT = {
  sectionHeading:
    '93% da população está insatisfeita com a saúde pública no Brasil',
  sourceLabel: 'Fonte:',
  intro: {
    description:
      'Milhões de brasileiros enfrentam filas, falta de médicos e burocracia. Problemas se repetem, mas soluções não chegam a quem decide.',
    source: {
      label: 'Pesquisa Datafolha',
      text: '93% da população está insatisfeita com a saúde no Brasil',
      url: 'https://www.sbcm.org.br/v2/index.php/not%C3%ADcias/3089-datafolha-revela-93-da-populacao-esta-insatisfeita-com-a-saude-no-brasil',
    },
  },
  statistic: {
    value: '93%',
    caption:
      'da população está insatisfeita com o atendimento na saúde pública no Brasil.*',
    screenReaderText:
      '93 de 100 pessoas estão insatisfeitas com a saúde pública',
    total: 100,
    highlighted: 93,
  },
  newsHeadline: 'Os desafios enfrentados diariamente na saúde pública:',
  newsArticles: [
    {
      id: 'fila-sus',
      title: 'Fila de espera no SUS para cirurgias segue crescendo',
      source: 'Terra',
      url: 'https://www.terra.com.br/noticias/fila-de-espera-no-sus-para-cirurgias-segue-crescendo,9ade9643697629d9f48ae5199b354f008dsm26fq.html',
      image: {
        avif: filaAvif,
        webp: filaWebp,
        fallback: filaJpg,
        alt: 'Pessoas aguardando em fila de espera no SUS',
        width: 1200,
        height: 630,
      },
    },
    {
      id: 'consulta-pos-obito',
      title: 'Paciente é chamada para consulta 11 anos após falecer',
      source: 'JusBrasil',
      url: 'https://www.jusbrasil.com.br/noticias/paciente-e-chamada-para-consulta-pelo-sus-onze-anos-apos-ter-morrido/703486596',
      image: {
        avif: pacienteAvif,
        webp: pacienteWebp,
        fallback: pacienteJpeg,
        alt: 'Paciente em situação de espera no sistema de saúde público',
        width: 932,
        height: 537,
      },
    },
    {
      id: 'falta-remedios',
      title: 'Falta de remédios nas farmácias públicas prejudica pacientes',
      source: 'G1',
      url: 'https://g1.globo.com/jornal-nacional/noticia/2022/07/22/prefeituras-farmacias-e-hospitais-enfrentam-crescente-falta-de-remedios-basicos.ghtml',
      image: {
        avif: medicamentosAvif,
        webp: medicamentosWebp,
        fallback: medicamentosJpg,
        alt: 'Prateleiras vazias em farmácia pública por falta de medicamentos',
        width: 984,
        height: 656,
      },
    },
  ] satisfies NewsArticle[],
  cta: {
    headline: 'Você já viveu algum desses problemas?',
    description:
      'Sua história importa. Compartilhe sua experiência e ajude a transformar a saúde pública.',
    buttonText: 'Compartilhar Experiência',
    buttonAriaLabel:
      'Compartilhar sua experiência no WhatsApp (abre em nova aba)',
  },
} as const
