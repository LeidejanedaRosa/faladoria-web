import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_API_URL } from '../helpers/publicBoardApi'

const MOBILE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }

type Role = 'admin' | 'assistant' | 'manager'

const COUNTS = {
  byStatus: {
    open: 2,
    rejected: 1,
    inReview: 3,
    inProgress: 5,
    resolved: 12,
    unresolved: 1,
    outOfServiceArea: 0,
  },
  unread: 4,
  assignedToMe: 6,
  unassigned: 7,
}

const account = (id: string, name: string, role: Role, status = 'active') => ({
  id,
  name,
  email: `${id}@faladoria.org`,
  role,
  assignedCities: role === 'admin' ? [] : [{ city: 'Varginha', state: 'MG' }],
  status,
  assignedComplaintCount: 0,
})

const USERS = [
  account('usr_carla', 'Carla Dias', 'admin'),
  account('usr_ana', 'Ana Souza', 'assistant'),
  account('usr_rita', 'Rita Moraes', 'assistant', 'deactivated'),
  account('usr_bruno', 'Bruno Lima', 'manager'),
]

/** The session, the complaint counts and the accounts. Returns the API paths asked. */
const mockApis = async (page: Page, role: Role = 'admin') => {
  const asked: string[] = []
  page.on('request', request => {
    if (request.url().startsWith(E2E_API_URL))
      asked.push(new URL(request.url()).pathname)
  })
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-30T12:00:00Z' },
        user: {
          ...account('usr_carla', 'Carla Dias', role),
          mustChangePassword: false,
          credentialExpiresAt: null,
        },
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/complaints/counts`, route =>
    route.fulfill({ json: COUNTS })
  )
  await page.route(`${E2E_API_URL}/api/users`, route =>
    route.fulfill({ json: USERS })
  )
  return asked
}

const folders = (page: Page) =>
  page.getByRole('navigation', { name: 'Pastas do painel' })
const folder = (page: Page, name: string) =>
  folders(page).getByRole('link', { name: new RegExp(`^${name}`) })

const open = async (page: Page, path = '/dashboard') => {
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  await page.locator('h1').waitFor({ timeout: 15000 })
}

test.describe('Panel folders', () => {
  test.describe('Rendering & Structure', () => {
    test('should show the admin three folders with what asks for action', async ({
      page,
    }) => {
      await mockApis(page)
      await open(page)

      await expect(folder(page, 'Reclamações')).toHaveText(
        'Reclamações2em aberto'
      )
      // Rita is deactivated: she is listed, but not counted.
      await expect(folder(page, 'Equipe')).toHaveText('Equipe2contas ativas')
      await expect(folder(page, 'Gestores')).toHaveText(
        'Gestores1gestores ativos'
      )
    })

    test('should list only the managers in the managers folder', async ({
      page,
    }) => {
      await mockApis(page)
      await open(page, '/dashboard/gestores')

      await expect(page.locator('h1')).toHaveText('Gestores')
      await expect(page.getByText('Bruno Lima', { exact: true })).toBeVisible()
      await expect(page.getByText('Ana Souza', { exact: true })).toHaveCount(0)
    })

    for (const role of ['assistant', 'manager'] as const) {
      test(`should show the ${role} no folders, and never ask for the accounts`, async ({
        page,
      }) => {
        const asked = await mockApis(page, role)
        await open(page)
        await expect(
          page.getByRole('heading', { name: 'Reclamações por status' })
        ).toBeVisible()

        await expect(folders(page)).toHaveCount(0)
        expect(asked).not.toContain('/api/users')
      })
    }
  })

  test.describe('Navigation', () => {
    test('should keep the folder on reload and go back to the previous one', async ({
      page,
    }) => {
      await mockApis(page)
      await open(page)

      await folder(page, 'Gestores').click()
      await expect(page).toHaveURL(/\/dashboard\/gestores$/)
      await expect(folder(page, 'Gestores')).toHaveAttribute(
        'aria-current',
        'page'
      )

      await page.reload({ waitUntil: 'domcontentloaded' })
      await expect(page.locator('h1')).toHaveText('Gestores')

      await page.goBack()
      await expect(page).toHaveURL(/\/dashboard$/)
      await expect(folder(page, 'Reclamações')).toHaveAttribute(
        'aria-current',
        'page'
      )
    })
  })

  test.describe('Accessibility', () => {
    for (const [name, path] of [
      ['complaints', '/dashboard'],
      ['team', '/dashboard/equipe'],
      ['managers', '/dashboard/gestores'],
    ] as const) {
      test(`should have no axe violations with the ${name} folder open`, async ({
        page,
      }) => {
        await mockApis(page)
        await open(page, path)
        await expect(folder(page, 'Equipe')).toContainText('contas ativas')

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()

        expect(results.violations).toEqual([])
      })
    }
  })

  test.describe('Responsive Layout', () => {
    for (const width of [320, MOBILE.width]) {
      test(`should stack the folders one per row at ${width}px, none cut`, async ({
        page,
      }) => {
        await page.setViewportSize({ ...MOBILE, width })
        await mockApis(page)
        await open(page)
        await expect(folder(page, 'Equipe')).toContainText('contas ativas')

        let previousBottom = 0
        for (const name of ['Reclamações', 'Equipe', 'Gestores']) {
          const link = folder(page, name)
          const box = (await link.boundingBox())!
          expect(box.x).toBeGreaterThanOrEqual(0)
          expect(box.x + box.width).toBeLessThanOrEqual(width)
          expect(box.height).toBeGreaterThanOrEqual(48)
          expect(box.y).toBeGreaterThan(previousBottom)
          previousBottom = box.y + box.height
          // "Reclamações" did not fit three side by side: the text must not spill.
          expect(
            await link.evaluate(el => el.scrollWidth <= el.clientWidth)
          ).toBe(true)
        }
      })
    }

    test('should put the three folders side by side on desktop', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await mockApis(page)
      await open(page)

      const boxes = await Promise.all(
        ['Reclamações', 'Equipe', 'Gestores'].map(
          async name => (await folder(page, name).boundingBox())!
        )
      )
      expect(boxes[1].y).toBeCloseTo(boxes[0].y, 0)
      expect(boxes[2].y).toBeCloseTo(boxes[0].y, 0)
      expect(boxes[0].x).toBeLessThan(boxes[1].x)
      expect(boxes[1].x).toBeLessThan(boxes[2].x)
    })

    test('should put the folders above the page title on desktop', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await mockApis(page)
      await open(page, '/dashboard/equipe')

      const folderBox = (await folder(page, 'Equipe').boundingBox())!
      const title = (await page.locator('h1').boundingBox())!
      expect(folderBox.y + folderBox.height).toBeLessThan(title.y)
    })
  })
})
