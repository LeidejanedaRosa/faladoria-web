import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { mockComplaintCounts } from '../helpers/complaintCountsApi'
import { E2E_API_URL } from '../helpers/publicBoardApi'

const MOBILE = { width: 390, height: 844 }
// 22 Nov 2026, 15:00 in Brasília: fixes what "Hoje" and "Ontem" mean.
const NOW = new Date('2026-11-22T18:00:00.000Z')

const account = (
  id: string,
  name: string,
  role: 'admin' | 'assistant' | 'manager'
) => ({
  id,
  name,
  email: `${id.slice(4)}@faladoria.org`,
  role,
  assignedCities: role === 'admin' ? [] : [{ city: 'Varginha', state: 'MG' }],
  status: 'active',
  assignedComplaintCount: 0,
})

const USERS = [
  account('usr_carla', 'Carla Dias', 'admin'),
  account('usr_ana', 'Ana Souza', 'assistant'),
  account('usr_leo', 'Léo Prado', 'admin'),
]

const area = (id: string, city: string, removedAt: string | null) => ({
  id,
  city,
  state: 'MG',
  addedAt: '2026-10-01T13:00:00.000Z',
  removedAt,
})

const done = (
  actorId: string,
  action: string,
  occurredAt: string,
  targetId?: string
) => ({
  actorId,
  action,
  targetId,
  occurredAt,
  succeeded: true,
  statusCode: 204,
})

/** Ana's history comes in two pages; Léo's names an account, a city and a removed city. */
const HISTORY: Record<string, object[][]> = {
  usr_ana: [
    [
      done(
        'usr_ana',
        'POST /api/complaints/claim',
        '2026-11-22T17:03:00.000Z',
        'cmp_1'
      ),
      {
        ...done(
          'usr_ana',
          'POST /api/auth/sign-in/email',
          '2026-11-22T16:00:00.000Z'
        ),
        succeeded: false,
        statusCode: 401,
      },
      {
        ...done(
          'usr_ana',
          'GET /api/staff-actions',
          '2026-11-21T13:00:00.000Z'
        ),
        succeeded: false,
        statusCode: 403,
      },
    ],
    [
      done(
        'usr_ana',
        'POST /api/auth/change-password',
        '2026-11-19T13:00:00.000Z'
      ),
    ],
  ],
  usr_leo: [
    [
      done(
        'usr_leo',
        'POST /api/users/:id/update',
        '2026-11-22T17:00:00.000Z',
        'usr_ana'
      ),
      done(
        'usr_leo',
        'POST /api/service-areas/update-location',
        '2026-11-22T16:00:00.000Z',
        'sa_varginha'
      ),
      done(
        'usr_leo',
        'POST /api/service-areas/remove',
        '2026-11-22T15:00:00.000Z',
        'sa_lavras'
      ),
    ],
  ],
}

const openAccess = async (page: Page, userId: string, name: string) => {
  await page.clock.setFixedTime(NOW)
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-12-01T12:00:00Z' },
        user: {
          id: 'usr_carla',
          name: 'Carla Dias',
          email: 'carla@faladoria.org',
          role: 'admin',
          assignedCities: [],
          mustChangePassword: false,
          credentialExpiresAt: null,
        },
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/users`, route =>
    route.fulfill({ json: USERS })
  )
  await page.route(`${E2E_API_URL}/api/service-areas**`, route => {
    const removed =
      new URL(route.request().url()).searchParams.get('status') === 'removed'
    route.fulfill({
      json: {
        serviceAreas: removed
          ? [area('sa_lavras', 'Lavras', '2026-11-01T12:00:00.000Z')]
          : [area('sa_varginha', 'Varginha', null)],
      },
    })
  })
  await page.route(`${E2E_API_URL}/api/staff-actions**`, route => {
    const params = new URL(route.request().url()).searchParams
    const pages = HISTORY[params.get('actorId') ?? ''] ?? [[]]
    const index = Number(params.get('cursor') ?? 0)
    route.fulfill({
      json: {
        actions: pages[index],
        ...(index + 1 < pages.length ? { nextCursor: String(index + 1) } : {}),
      },
    })
  })
  await mockComplaintCounts(page)
  await page.goto(`/dashboard/equipe/${userId}`, {
    waitUntil: 'domcontentloaded',
  })
  // waitFor, not expect: the drawer's chunk loads on the first open, past expect's 5s.
  await page.getByRole('dialog', { name }).waitFor({ timeout: 15000 })
  await page.getByRole('tab', { name: 'Acesso' }).click()
  await history(page).getByRole('listitem').first().waitFor()
}

const history = (page: Page) =>
  page.getByRole('region', { name: 'Histórico de ações' })
const loadMore = (page: Page) =>
  history(page).getByRole('button', { name: 'Carregar ações mais antigas' })

test.describe('Account history', () => {
  test.describe('Rendering & Structure', () => {
    test('should list what the person did by day, in Brasília time, with refusals in words', async ({
      page,
    }) => {
      await openAccess(page, 'usr_ana', 'Ana Souza')

      await expect(history(page).getByRole('heading', { level: 3 })).toHaveText(
        ['Hoje', 'Ontem']
      )
      await expect(history(page).getByRole('listitem')).toHaveText([
        '14:03Assumiu um caso',
        '13:00Tentativa de entrar nesta contaRecusada',
        '10:00Tentou abrir uma área do painelSem permissão',
      ])
    })

    test('should load older actions on request and say when there are no more', async ({
      page,
    }) => {
      await openAccess(page, 'usr_ana', 'Ana Souza')

      await loadMore(page).click()

      await expect(
        history(page).getByRole('heading', { name: '19 de novembro de 2026' })
      ).toBeVisible()
      await expect(
        history(page).getByText('Não há ações mais antigas.')
      ).toBeVisible()
      await expect(loadMore(page)).toHaveCount(0)
    })

    test('should name the accounts and cities acted on, a removed city too', async ({
      page,
    }) => {
      await openAccess(page, 'usr_leo', 'Léo Prado')

      await expect(history(page).getByRole('listitem')).toHaveText([
        /Alterou a conta de Ana Souza$/,
        /Corrigiu a cidade Varginha\/MG$/,
        /Removeu Lavras\/MG das cidades atendidas$/,
      ])
    })
  })

  test.describe('Accessibility', () => {
    test('should have no axe violations on the Acesso tab with the history', async ({
      page,
    }) => {
      await openAccess(page, 'usr_ana', 'Ana Souza')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(results.violations).toEqual([])
    })

    test('should move focus to the first action loaded, with a visible ring, when the button leaves', async ({
      page,
    }) => {
      await openAccess(page, 'usr_ana', 'Ana Souza')

      // Reached with Tab, as a person would: browsers show a ring on code-moved focus only when
      // the last focus change came from the keyboard.
      await loadMore(page).focus()
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Tab')
      await expect(loadMore(page)).toBeFocused()
      await page.keyboard.press('Enter')

      const first = history(page).getByRole('listitem').nth(3)
      await expect(first).toBeFocused()
      // Mid-list, the ring is where the next Tab starts from (WCAG 2.4.7).
      await expect(first).toHaveCSS('outline-style', 'solid')
      await expect(first).toHaveCSS('outline-width', '2px')
    })
  })

  test.describe('Responsive Layout', () => {
    test('should keep the time beside the text on the phone, without sideways scroll', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openAccess(page, 'usr_ana', 'Ana Souza')

      const row = history(page).getByRole('listitem').nth(1)
      const time = (await row.locator('time').boundingBox())!
      const text = (await row.locator('p').boundingBox())!
      expect(text.x).toBeGreaterThan(time.x + time.width)
      expect(Math.abs(text.y - time.y)).toBeLessThan(8)

      const overflow = await page
        .getByRole('dialog')
        .evaluate(dialog => dialog.scrollWidth - dialog.clientWidth)
      expect(overflow).toBe(0)
    })
  })
})
