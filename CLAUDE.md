# Claude - Assistance Guidelines

## Project Overview

**Faladoria** is a product with a public landing page and administrative backoffice (dashboard), using WhatsApp as the operation channel. It serves as a mediation channel between SUS (Brazilian public health system) users and health managers to solve problems.

### Application Modules

- **Landing**: Public-facing marketing page
- **Auth**: Admin authentication (login)
- **Dashboard (Backoffice)**: Administrative area for health managers (requires authentication)

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Path Aliases
- Husky (git hooks)
- ESLint
- Prettier
- Sentry (error tracking)
- Playwright (E2E testing)
- Vitest (unit testing)

## Project Structure

### Current Structure (Landing Phase)

```
src/
├── components/
│   ├── data/          # Static data and constants
│   ├── error/         # Error boundaries and fallbacks
│   ├── layout/        # Layout components (Container, etc.)
│   ├── seo/           # SEO components (JsonLd, schemas)
│   └── ui/            # Reusable UI components
│       ├── icons/     # Icon components
│       └── __tests__/ # Component tests
├── lib/               # External service configurations (Sentry, etc.)
├── test/              # Test utilities and setup
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### Target Structure (When Dashboard Development Begins)

Refactor to module-based architecture when starting dashboard/auth implementation:

```
src/
├── modules/
│   ├── landing/
│   │   ├── components/
│   │   └── pages/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── pages/
├── shared/
│   ├── components/
│   │   ├── ui/        # Buttons, inputs, etc.
│   │   ├── layout/    # Container, etc.
│   │   └── error/     # Error boundaries
│   ├── hooks/
│   ├── lib/           # Sentry, etc.
│   ├── types/
│   └── utils/
└── test/
```

**Migration trigger**: When creating the first auth or dashboard component.

## Naming Conventions

### Language

- **Portuguese**: Only for user-facing text (UI labels, messages, content)
- **English**: Everything else (code, variables, functions, comments, commits, documentation)

### Code Conventions

- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`cn.ts`)
- **Components**: PascalCase (`ErrorBoundary`, `JsonLdScript`)
- **Functions/Variables**: camelCase (`reportWebVitals`, `companyInfo`)
- **Types/Interfaces**: PascalCase (`AccessibilityProps`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants, camelCase for config objects
- **Test files**: `__tests__/ComponentName.test.tsx` pattern

## Code Development Principles

### Always follow:

- **Clean Code**: Readable, maintainable code
- **Semantic HTML**: Appropriate use of HTML elements for meaning and structure
- **SOLID**: Object-oriented design principles
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion Principle
- **Code Smells**: Identify and avoid anti-patterns and design problems
- **SEO**: Search engine optimization
- **Accessibility**: WCAG compliance and a11y best practices

## Testing Strategy

### Unit Tests (Vitest)

- **Required**: All custom hooks
- **Required**: Critical business logic and utilities
- **Required**: Complex component logic
- Location: `__tests__/` folder alongside components
- File naming: `ComponentName.test.tsx` or `utilityName.test.ts`
- Use `@testing-library/react` for component rendering
- Test behavior, not implementation details
- Mock external dependencies (APIs, services), never internal logic

#### When to write unit tests

| Scenario                                                                  | Unit test?      |
| ------------------------------------------------------------------------- | --------------- |
| Custom hooks with state/effects                                           | Yes             |
| Utility functions with logic                                              | Yes             |
| Components with conditional rendering, user interaction, or derived state | Yes             |
| Pure presentational components (no logic, no hooks, no interactions)      | No — prefer E2E |
| Data constants / static config objects                                    | No              |

### E2E Tests (Playwright)

- Location: `tests/` directory, organized by domain (`tests/seo/`, `tests/sections/`, etc.)
- File naming: `kebab-case.spec.ts` (e.g., `hero-section.spec.ts`)
- Each test file uses `test.describe` for grouping related tests
- Use `test.beforeEach` with `page.goto('/')` and appropriate `waitFor` calls
- Full application flow testing
- Critical user journeys

#### When to write E2E tests

| Scenario                                                                          | E2E test?        |
| --------------------------------------------------------------------------------- | ---------------- |
| Section/page rendering in real browser (visual structure, layout, responsiveness) | Yes              |
| Accessibility validation (aria attributes, screen reader content, keyboard nav)   | Yes              |
| SEO validation (meta tags, structured data, headings)                             | Yes              |
| Performance attributes (image loading strategy, CLS prevention)                   | Yes              |
| User flows spanning multiple pages/interactions                                   | Yes              |
| Isolated unit logic (pure functions, hooks)                                       | No — prefer unit |

#### E2E test structure pattern

```typescript
import { expect, test } from '@playwright/test'

test.describe('ComponentName', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('target-element').waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    /* ... */
  })
  test.describe('Accessibility', () => {
    /* ... */
  })
  test.describe('Responsive Layout', () => {
    /* ... */
  })
})
```

#### Test coverage categories for E2E

1. **Rendering & Structure**: Elements exist, correct hierarchy, expected content
2. **Accessibility**: ARIA attributes, alt text, screen-reader content, semantic HTML
3. **Image Performance**: `width`/`height`, `loading`, `fetchPriority`
4. **Responsive Layout**: Viewport-specific layout assertions using `boundingBox()`

## Commit Guidelines

1. **Separate files by responsibility**: Each commit should contain related and cohesive changes
2. **Use semantic commits**: Follow Conventional Commits pattern
   - `feat:` New feature
   - `fix:` Bug fix
   - `refactor:` Code refactoring
   - `style:` Formatting, spacing (no logic changes)
   - `test:` Adding or modifying tests
   - `docs:` Documentation
   - `chore:` Maintenance tasks
   - `perf:` Performance improvements
3. **Short messages in English**: Concise, clear messages in imperative mood

## Assistance Approach

### Claude should act as:

- **Mature debater**: Question ideas and challenge viewpoints
- **Constructive critic**: Show errors and identify blind spots
- **Opportunity revealer**: Highlight missed opportunities
- **Truth-focused coach**: Prioritize growth and truth over comfort
- **Excellence partner**: Drive continuous improvement, not superficial validation

### In all responses, provide:

1. **Clear and direct answer** to the request
2. **Step-by-step explanation** of how the solution was reached
3. **Alternative perspectives or solutions** not previously considered
4. **Practical summary or action plan** for immediate application
5. **Reliable sources** only when:
   - Introducing new architectural concepts or patterns
   - Making claims about performance, security, or best practices
   - Presenting specific technologies, libraries, or APIs
   - External validation adds real value to the context

## Goal

Maximize learning, technical quality, and professional growth through honest, challenging, and well-founded feedback.
