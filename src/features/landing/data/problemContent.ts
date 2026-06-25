import medicationsAvif from '@assets/medications.avif'
import medicationsJpg from '@assets/medications.jpg'
import medicationsWebp from '@assets/medications.webp'
import patientAvif from '@assets/patient.avif'
import patientJpeg from '@assets/patient.jpeg'
import patientWebp from '@assets/patient.webp'
import queueAvif from '@assets/queue.avif'
import queueJpg from '@assets/queue.jpg'
import queueWebp from '@assets/queue.webp'

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
    'A maioria da população encontra muitas dificuldades ao utilizar a saúde pública no Brasil',
  sourceLabel: 'Fonte:',
  intro: {
    ministerQuote: {
      text: 'A principal reclamação da população hoje é sobre o tempo que ela espera para uma consulta especializada, para um exame, para uma cirurgia.',
      author: 'Alexandre Padilha',
      role: 'Ministro da Saúde',
    },
  },
  statistic: {
    total: 100,
    highlighted: 93,
    source: {
      label: 'BBC News Brasil',
      text: 'Ministro da Saúde reconhece as dificuldades no SUS',
      url: 'https://www.bbc.com/portuguese/articles/crmxwvdjgl0o',
    },
  },
  newsHeadline: 'Os desafios enfrentados diariamente na saúde pública:',
  newsDescription:
    'Problemas que impactam milhões de brasileiros todos os dias.',
  newsArticles: [
    {
      id: 'fila-sus',
      title: 'Fila de espera no SUS para cirurgias segue crescendo',
      source: 'Terra',
      url: 'https://www.terra.com.br/noticias/fila-de-espera-no-sus-para-cirurgias-segue-crescendo,9ade9643697629d9f48ae5199b354f008dsm26fq.html',
      image: {
        avif: queueAvif,
        webp: queueWebp,
        fallback: queueJpg,
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
        avif: patientAvif,
        webp: patientWebp,
        fallback: patientJpeg,
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
        avif: medicationsAvif,
        webp: medicationsWebp,
        fallback: medicationsJpg,
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
