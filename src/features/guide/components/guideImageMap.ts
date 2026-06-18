import appointmentCategoryImg from '@assets/guide/appointment/category.webp'
import howToScheduleImg from '@assets/guide/appointment/how-to-schedule.webp'
import specialistAppointmentImg from '@assets/guide/appointment/specialist-appointment.webp'
import examCategoryImg from '@assets/guide/exam/category.webp'
import delayedExamImg from '@assets/guide/exam/delayed-exam.webp'
import howToRequestExamImg from '@assets/guide/exam/how-to-request-exam.webp'
import whatExamDoINeedImg from '@assets/guide/exam/what-exam-do-i-need.webp'
import homeCareCategoryImg from '@assets/guide/home-care/category.webp'
import homeCareHeroImg from '@assets/guide/home-care/home-care.webp'
import medicationCategoryImg from '@assets/guide/medication/category.webp'
import freeMedicationImg from '@assets/guide/medication/free-medication.webp'
import highCostMedicationImg from '@assets/guide/medication/high-cost-medication.webp'
import susCardImg from '@assets/guide/shared/cartao-sus.webp'
import checklistImg from '@assets/guide/shared/checklist.webp'
import surgeryCategoryImg from '@assets/guide/surgery/category.webp'
import deniedSurgeryImg from '@assets/guide/surgery/denied-surgery.webp'
import surgeryQueueImg from '@assets/guide/surgery/surgery-queue.webp'
import treatmentCategoryImg from '@assets/guide/treatment/category.webp'
import treatmentSessionImg from '@assets/guide/treatment/treatment-session.webp'

export const GUIDE_CATEGORY_IMAGES: Partial<Record<string, string>> = {
  consulta: appointmentCategoryImg,
  exame: examCategoryImg,
  cirurgia: surgeryCategoryImg,
  tratamento: treatmentCategoryImg,
  medicamento: medicationCategoryImg,
  'atendimento-domiciliar': homeCareCategoryImg,
}

export const GUIDE_ARTICLE_IMAGES: Partial<Record<string, string>> = {
  'como-agendar-consulta': howToScheduleImg,
  'consulta-especialista': specialistAppointmentImg,
  'como-solicitar-exame': howToRequestExamImg,
  'nao-sei-que-exame-preciso': whatExamDoINeedImg,
  'exame-demorou-muito': delayedExamImg,
  'fila-de-cirurgia': surgeryQueueImg,
  'cirurgia-negada': deniedSurgeryImg,
  'como-conseguir-tratamento': treatmentSessionImg,
  'farmacia-basica': freeMedicationImg,
  'medicamentos-alto-custo': highCostMedicationImg,
  'como-solicitar-atendimento-domiciliar': homeCareHeroImg,
}

export const GUIDE_STEP_IMAGES: Partial<Record<string, string>> = {
  'cartao-sus': susCardImg,
  checklist: checklistImg,
  'home-care-illustration': homeCareCategoryImg,
}
