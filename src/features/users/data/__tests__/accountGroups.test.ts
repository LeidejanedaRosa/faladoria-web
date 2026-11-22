import type { UserRole } from '@features/auth'
import { describe, expect, it } from 'vitest'

import {
  accountRoute,
  GROUP_ROLES,
  GROUP_ROUTES,
  groupOf,
  newAccountRoute,
} from '../accountGroups'

const ROLES: UserRole[] = ['admin', 'assistant', 'manager']

describe('accountGroups', () => {
  it('puts the administration and the assistants in the team', () => {
    expect(groupOf('admin')).toBe('team')
    expect(groupOf('assistant')).toBe('team')
  })

  it('puts the health managers in their own folder', () => {
    expect(groupOf('manager')).toBe('managers')
  })

  it.each(ROLES)('places the %s role in exactly one folder', role => {
    const folders = Object.values(GROUP_ROLES).filter(roles =>
      roles.includes(role)
    )
    expect(folders).toHaveLength(1)
  })

  it('agrees with groupOf: each role is listed in the folder it is placed in', () => {
    for (const role of ROLES) {
      expect(GROUP_ROLES[groupOf(role)]).toContain(role)
    }
  })

  it('leads each folder to its own page', () => {
    expect(GROUP_ROUTES).toEqual({
      team: '/dashboard/equipe',
      managers: '/dashboard/gestores',
    })
  })

  it('opens an account inside its own folder', () => {
    expect(accountRoute('team', 'usr_ana')).toBe('/dashboard/equipe/usr_ana')
    expect(accountRoute('managers', 'usr_dora')).toBe(
      '/dashboard/gestores/usr_dora'
    )
  })

  it('keeps an id with a slash in one path segment', () => {
    expect(accountRoute('team', 'a/b')).toBe('/dashboard/equipe/a%2Fb')
  })

  it('opens a new account inside each folder', () => {
    expect(newAccountRoute('team')).toBe('/dashboard/equipe/nova')
    expect(newAccountRoute('managers')).toBe('/dashboard/gestores/nova')
  })
})
