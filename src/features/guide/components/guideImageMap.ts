import cirurgiaCategoryImg from '@assets/guide/cirurgia/category.webp'
import filaDeCirurgiaImg from '@assets/guide/cirurgia/como_funciona_a_fila_da_cirurgia.webp'
import cirurgiaNegadaImg from '@assets/guide/cirurgia/o_que_fazer_quando_a_cirurgia_e_negada.webp'
import cartaoSusImg from '@assets/guide/consulta/cartao-sus.webp'
import consultaCategoryImg from '@assets/guide/consulta/category.webp'
import checklistImg from '@assets/guide/consulta/checklist.webp'
import consultaAgendarImg from '@assets/guide/consulta/como-agendar-consulta.webp'
import consultaEspecialistaImg from '@assets/guide/consulta/consulta-especialista.webp'
import exameCategoryImg from '@assets/guide/exame/category.webp'
import comoSolicitarExameImg from '@assets/guide/exame/como-solicitar-exame-pelo-sus.webp'
import naoSeiQueExameImg from '@assets/guide/exame/nao-sei-que-exame-preciso.webp'
import exameDemorouImg from '@assets/guide/exame/o-que-fazer-quando-o-exame-demora-muito.webp'
import tratamentoCategoryImg from '@assets/guide/tratamento/category.webp'
import tratamentoImg from '@assets/guide/tratamento/tratamento.webp'

export const GUIDE_CATEGORY_IMAGES: Partial<Record<string, string>> = {
  consulta: consultaCategoryImg,
  exame: exameCategoryImg,
  cirurgia: cirurgiaCategoryImg,
  tratamento: tratamentoCategoryImg,
}

export const GUIDE_ARTICLE_IMAGES: Partial<Record<string, string>> = {
  'como-agendar-consulta': consultaAgendarImg,
  'consulta-especialista': consultaEspecialistaImg,
  'como-solicitar-exame': comoSolicitarExameImg,
  'nao-sei-que-exame-preciso': naoSeiQueExameImg,
  'exame-demorou-muito': exameDemorouImg,
  'fila-de-cirurgia': filaDeCirurgiaImg,
  'cirurgia-negada': cirurgiaNegadaImg,
  'como-conseguir-tratamento': tratamentoImg,
}

export const GUIDE_STEP_IMAGES: Partial<Record<string, string>> = {
  'cartao-sus': cartaoSusImg,
  checklist: checklistImg,
}
