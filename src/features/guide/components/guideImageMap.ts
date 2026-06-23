import appointmentCategoryImg from '@assets/guide/appointment/category.webp'
import howToScheduleImg from '@assets/guide/appointment/how-to-schedule.webp'
import specialistAppointmentImg from '@assets/guide/appointment/specialist-appointment.webp'
import equipmentCategoryImg from '@assets/guide/equipment/category.webp'
import cpapBipapImg from '@assets/guide/equipment/cpap-bipap.webp'
import hearingAidImg from '@assets/guide/equipment/hearing-aid.webp'
import howToObtainEquipmentImg from '@assets/guide/equipment/how-to-obtain-equipment-through-the-sus.webp'
import examCategoryImg from '@assets/guide/exam/category.webp'
import delayedExamImg from '@assets/guide/exam/delayed-exam.webp'
import howToRequestExamImg from '@assets/guide/exam/how-to-request-exam.webp'
import whatExamDoINeedImg from '@assets/guide/exam/what-exam-do-i-need.webp'
import homeCareCategoryImg from '@assets/guide/home-care/category.webp'
import homeCareHeroImg from '@assets/guide/home-care/home-care.webp'
import medicalTransportCategoryImg from '@assets/guide/medical-transport/category.webp'
import medicalTransportHeroImg from '@assets/guide/medical-transport/medical-transport.webp'
import repaymentImg from '@assets/guide/medical-transport/repayment.webp'
import medicationCategoryImg from '@assets/guide/medication/category.webp'
import freeMedicationImg from '@assets/guide/medication/free-medication.webp'
import highCostMedicationImg from '@assets/guide/medication/high-cost-medication.webp'
import ambulanceImg from '@assets/guide/shared/ambulance.webp'
import calendarImg from '@assets/guide/shared/calendar.webp'
import susCardImg from '@assets/guide/shared/cartao-sus.webp'
import checklistImg from '@assets/guide/shared/checklist.webp'
import clockImg from '@assets/guide/shared/clock.webp'
import doctorPatientImg from '@assets/guide/shared/doctor-patient.webp'
import equipmentImg from '@assets/guide/shared/equipment.webp'
import sharedHomeCareImg from '@assets/guide/shared/home-care.webp'
import medicationsImg from '@assets/guide/shared/medications.webp'
import patientRightsImg from '@assets/guide/shared/patient-rights.webp'
import phoneImg from '@assets/guide/shared/phone.webp'
import ubsImg from '@assets/guide/shared/ubs.webp'
import surgeryCategoryImg from '@assets/guide/surgery/category.webp'
import deniedSurgeryImg from '@assets/guide/surgery/denied-surgery.webp'
import surgeryQueueImg from '@assets/guide/surgery/surgery-queue.webp'
import treatmentCategoryImg from '@assets/guide/treatment/category.webp'
import treatmentSessionImg from '@assets/guide/treatment/treatment-session.webp'
import womensCategoryImg from '@assets/guide/womens-health/category.webp'
import familyPlanningImg from '@assets/guide/womens-health/family-planning.webp'
import prenatalImg from '@assets/guide/womens-health/prenatal.webp'
import preventiveScreeningImg from '@assets/guide/womens-health/preventive-screening-and-mammogram.webp'

import type { SharedStepImageKey } from '../data/guideArticles'

export const GUIDE_CATEGORY_IMAGES: Partial<Record<string, string>> = {
  consulta: appointmentCategoryImg,
  exame: examCategoryImg,
  cirurgia: surgeryCategoryImg,
  tratamento: treatmentCategoryImg,
  medicamento: medicationCategoryImg,
  'atendimento-domiciliar': homeCareCategoryImg,
  'transporte-sanitario': medicalTransportCategoryImg,
  equipamentos: equipmentCategoryImg,
  'saude-da-mulher': womensCategoryImg,
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
  'como-solicitar-transporte-sanitario': medicalTransportHeroImg,
  'reembolso-tfd': repaymentImg,
  'como-solicitar-equipamentos': howToObtainEquipmentImg,
  'cpap-bipap-sus': cpapBipapImg,
  'aparelho-auditivo-sus': hearingAidImg,
  'pre-natal': prenatalImg,
  'preventivo-e-mamografia': preventiveScreeningImg,
  'planejamento-familiar': familyPlanningImg,
}

export const SHARED_STEP_IMAGES: Record<SharedStepImageKey, string> = {
  ambulance: ambulanceImg,
  calendar: calendarImg,
  'cartao-sus': susCardImg,
  checklist: checklistImg,
  clock: clockImg,
  'doctor-patient': doctorPatientImg,
  equipment: equipmentImg,
  'home-care': sharedHomeCareImg,
  medications: medicationsImg,
  'patient-rights': patientRightsImg,
  phone: phoneImg,
  ubs: ubsImg,
}
