import type { ReactElement } from 'react'

import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'

import { createQueryWrapper } from './queryClient'

/** Shows the current address, so a test can assert where the screen navigated to. */
export const LocationProbe = () => {
  const { pathname } = useLocation()
  return <output data-testid='location'>{pathname}</output>
}

/** A path, or a path with the navigation state the session guard leaves for the login. */
type InitialEntry = string | { pathname: string; state: unknown }

export const renderWithRouter = (
  routes: { path: string; element: ReactElement }[],
  initialEntry: InitialEntry
): ReturnType<typeof render> =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path='*' element={<LocationProbe />} />
      </Routes>
      <LocationProbe />
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
