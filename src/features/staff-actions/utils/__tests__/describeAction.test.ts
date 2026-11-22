import { buildStaffAction } from '@/test/fixtures/staffActions'

import { describe, expect, it } from 'vitest'

import { ACTION_TEXTS } from '../../data/staffActionsContent'
import { describeAction } from '../describeAction'

const NAMES = new Map([
  ['usr_ana', 'Ana Souza'],
  ['sa_varginha', 'Varginha/MG'],
])

const describe_ = (overrides: Parameters<typeof buildStaffAction>[0]) =>
  describeAction(buildStaffAction(overrides), NAMES)

describe('describeAction', () => {
  it('names the account the action was about, when the screen knows it', () => {
    expect(
      describe_({ action: 'POST /api/users/:id/update', targetId: 'usr_ana' })
    ).toEqual({ text: 'Alterou a conta de Ana Souza', outcome: 'done' })
  })

  it('names the city the action was about', () => {
    expect(
      describe_({
        action: 'POST /api/service-areas/remove',
        targetId: 'sa_varginha',
      }).text
    ).toBe('Removeu Varginha/MG das cidades atendidas')
  })

  it('stays generic when the target is unknown (a deleted account) or missing', () => {
    expect(
      describe_({ action: 'POST /api/users/:id/update', targetId: 'usr_gone' })
        .text
    ).toBe('Alterou uma conta')
    expect(
      describe_({ action: 'POST /api/users/:id/update', targetId: undefined })
        .text
    ).toBe('Alterou uma conta')
  })

  it('does not name a case: the screen has no case names to give', () => {
    expect(
      describe_({ action: 'POST /api/complaints/claim', targetId: 'usr_ana' })
        .text
    ).toBe('Assumiu um caso')
  })

  it('tells a refused sign-in apart: it is logged under the account someone tried', () => {
    expect(
      describe_({
        action: 'POST /api/auth/sign-in/email',
        succeeded: false,
        statusCode: 401,
      })
    ).toEqual({ text: 'Tentativa de entrar nesta conta', outcome: 'rejected' })
  })

  it('marks any other refusal as not done, keeping what was tried', () => {
    expect(
      describe_({
        action: 'POST /api/complaints/reject',
        succeeded: false,
        statusCode: 409,
      })
    ).toEqual({ text: 'Rejeitou um caso', outcome: 'refused' })
  })

  it('marks a 403 as no permission, even on a sign-in', () => {
    expect(
      describe_({
        action: 'POST /api/users/:id/deactivate',
        targetId: 'usr_ana',
        succeeded: false,
        statusCode: 403,
      }).outcome
    ).toBe('denied')
    expect(
      describe_({
        action: 'POST /api/auth/sign-in/email',
        succeeded: false,
        statusCode: 403,
      }).outcome
    ).toBe('denied')
  })

  it('says a denied read was an attempt to open a part of the panel', () => {
    expect(
      describe_({
        action: 'GET /api/staff-actions',
        succeeded: false,
        statusCode: 403,
      })
    ).toEqual({ text: 'Tentou abrir uma área do painel', outcome: 'denied' })
  })

  it('never shows a raw route for an action the panel does not know yet', () => {
    expect(describe_({ action: 'POST /api/reports/export' }).text).toBe(
      'Fez uma ação no painel'
    )
  })

  it('has a text for every route the API logs today', () => {
    const logged = [
      'POST /api/auth/sign-in/email',
      'POST /api/auth/sign-out',
      'POST /api/auth/change-password',
      'POST /api/users',
      'POST /api/users/:id/update',
      'POST /api/users/:id/reset-password',
      'POST /api/users/:id/deactivate',
      'POST /api/users/:id/reactivate',
      'POST /api/service-areas',
      'POST /api/service-areas/update-location',
      'POST /api/service-areas/remove',
      'POST /api/service-areas/reactivate',
      'POST /api/complaints/approve',
      'POST /api/complaints/reject',
      'POST /api/complaints/claim',
      'POST /api/complaints/reassign',
      'POST /api/complaints/start-progress',
      'POST /api/complaints/mark-unresolved',
      'POST /api/complaints/resolve',
      'POST /api/complaints/notes',
      'POST /api/complaints/share-identity',
      'POST /api/complaints/revoke-identity-sharing',
      'POST /api/complaints/messages',
      'POST /api/complaints/read',
      'POST /api/notifications/read-all',
      'POST /api/notifications/:id/read',
    ]

    expect(Object.keys(ACTION_TEXTS).sort()).toEqual([...logged].sort())
  })
})
