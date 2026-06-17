import { render, screen, userEvent } from '@/test/test-utils'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import ErrorBoundary from '../ErrorBoundary'

const ThrowingComponent = ({
  shouldThrow = false,
}: {
  shouldThrow?: boolean
}) => {
  if (shouldThrow) throw new Error('Test error')
  return <div>Children</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('normal rendering', () => {
    it('should render children when there is no error', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      )

      expect(screen.getByText('Children')).toBeInTheDocument()
    })
  })

  describe('default fallback', () => {
    it('should render default fallback UI when a child throws', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow />
        </ErrorBoundary>
      )

      expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
    })

    it('should show retry and reload buttons in default fallback', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow />
        </ErrorBoundary>
      )

      expect(
        screen.getByRole('button', { name: 'Tentar novamente' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Recarregar página' })
      ).toBeInTheDocument()
    })
  })

  describe('custom fallback', () => {
    it('should render a custom ReactNode fallback', () => {
      render(
        <ErrorBoundary fallback={<div>Custom fallback</div>}>
          <ThrowingComponent shouldThrow />
        </ErrorBoundary>
      )

      expect(screen.getByText('Custom fallback')).toBeInTheDocument()
    })

    it('should render a function fallback with error and resetError props', () => {
      render(
        <ErrorBoundary
          fallback={({ error, resetError }) => (
            <div>
              <p>Caught: {error?.message}</p>
              <button onClick={resetError}>Reset</button>
            </div>
          )}
        >
          <ThrowingComponent shouldThrow />
        </ErrorBoundary>
      )

      expect(screen.getByText('Caught: Test error')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    })
  })

  describe('onError callback', () => {
    it('should call onError with the thrown error', () => {
      const onError = vi.fn()

      render(
        <ErrorBoundary onError={onError}>
          <ThrowingComponent shouldThrow />
        </ErrorBoundary>
      )

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Test error' }),
        expect.any(Object)
      )
    })

    it('should not call onError when there is no error', () => {
      const onError = vi.fn()

      render(
        <ErrorBoundary onError={onError}>
          <ThrowingComponent />
        </ErrorBoundary>
      )

      expect(onError).not.toHaveBeenCalled()
    })
  })

  describe('resetError', () => {
    it('should restore children after resetError when they no longer throw', async () => {
      const user = userEvent.setup()
      let shouldThrow = true

      const DynamicBomb = () => {
        if (shouldThrow) throw new Error('Controlled error')
        return <div>Recovered</div>
      }

      render(
        <ErrorBoundary>
          <DynamicBomb />
        </ErrorBoundary>
      )

      expect(screen.getByText('Algo deu errado')).toBeInTheDocument()

      shouldThrow = false
      await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

      expect(screen.getByText('Recovered')).toBeInTheDocument()
    })

    it('should expose resetError through function fallback', async () => {
      const user = userEvent.setup()
      let shouldThrow = true

      const DynamicBomb = () => {
        if (shouldThrow) throw new Error('Controlled error')
        return <div>Safe</div>
      }

      render(
        <ErrorBoundary
          fallback={({ resetError }) => (
            <button onClick={resetError}>Try again</button>
          )}
        >
          <DynamicBomb />
        </ErrorBoundary>
      )

      shouldThrow = false
      await user.click(screen.getByRole('button', { name: 'Try again' }))

      expect(screen.getByText('Safe')).toBeInTheDocument()
    })
  })
})
