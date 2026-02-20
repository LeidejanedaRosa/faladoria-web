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
├── features/
│   └── guide/         # Guia do SUS — multi-page feature with its own components, data and pages
├── hooks/             # Custom hooks (useDocumentMeta, useScrollToTop, etc.)
├── lib/               # External service configurations (Sentry, etc.)
├── test/              # Test utilities and setup
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

**Rule for `features/`**: Use for any multi-page, multi-component domain that has its own routing, data and internal state — even during the landing phase. Each feature must expose a clean public API through its `index.ts`; other modules must never import from internal paths.

### Target Structure (Before Dashboard Development Begins)

Migrate to feature-based architecture **before** starting auth/dashboard implementation, so the codebase is consistent from the start:

```
src/
├── features/
│   ├── landing/
│   │   ├── components/
│   │   │   └── sections/
│   │   ├── data/
│   │   └── pages/
│   ├── guide/              # already exists
│   │   ├── components/
│   │   ├── data/
│   │   └── pages/
│   ├── auth/               # future
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   └── dashboard/          # future
│       ├── components/
│       ├── hooks/
│       └── pages/
├── shared/
│   ├── components/
│   │   ├── ui/             # Buttons, inputs, icons, etc.
│   │   ├── layout/         # Container, etc.
│   │   ├── error/          # Error boundaries
│   │   └── seo/            # JsonLd, schemas
│   ├── data/               # Global constants (COMPANY_INFO, etc.)
│   ├── hooks/              # Shared hooks
│   ├── lib/                # Sentry, etc.
│   ├── types/
│   └── utils/
└── test/
```

**Migration trigger**: Before writing the first auth or dashboard component. The migration is a dedicated task — not done alongside feature development.

**Splitting criterion**: If only one feature uses it → goes into that feature. If two or more features use it → goes into `shared/`.

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
- **Senior UX/UI Designer**: Since the developer works solo without a dedicated designer, Claude must fill this role with strong expertise in user-centered design, usability, CRO, and WCAG 2.2 accessibility

### UX/UI Design Responsibilities

When working on UI components, pages, or layout decisions:

1. **Question poorly defined requirements** before implementing
2. **Identify usability, accessibility, and conversion risks** proactively
3. **Propose solutions** grounded in Nielsen's heuristics, UX research, and industry best practices
4. **Balance user needs, business goals, and technical constraints**
5. **Challenge bad design decisions** — explain why they're wrong and how to improve
6. **Provide practical deliverables** when relevant: textual wireframes, UX/UI checklists, and actionable recommendations

#### Design Principles (always apply):

- Mobile-first approach
- Accessibility: contrast, focus indicators, keyboard navigation, screen readers (WCAG 2.2)
- SEO and semantic HTML
- Perceived performance (skeleton screens, optimistic UI)
- Clear CTAs and user journey clarity
- Visual hierarchy and whitespace usage
- Touch targets minimum 48px, font size minimum 16px on mobile

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

## Landing Page Checklist

Reference checklist for auditing and building landing page sections. Use this as a quality gate when creating or reviewing landing page components.

> Sources: [Flow Ninja (2025)](https://www.flow.ninja/blog/landing-page-checklist), [Prismic (2026)](https://prismic.io/blog/landing-page-optimization-best-practices), [Leadfeeder (2026)](https://www.leadfeeder.com/blog/landing-pages-convert/)

### Page Structure

| Section        | Required Elements                                                                            |
| -------------- | -------------------------------------------------------------------------------------------- |
| Hero           | Compelling headline (5-8 words), benefit-oriented subheading, high-quality visual, clear CTA |
| Problem        | Target audience pain points, problem description, emotional connection                       |
| Solution       | Product/service introduction, key benefits, unique selling propositions (USPs)               |
| Social Proof   | Testimonials, reviews, brand logos, data & statistics                                        |
| Pre-footer CTA | Strong visible CTA button, benefit-oriented copy, sense of urgency                           |
| FAQ            | Common questions, concise answers, organized format (accordion)                              |
| Footer         | Contact info, copyright, legal links, social media links                                     |

### Copy & Content

- Clear value proposition in headline (5-8 words max)
- Benefits over features
- Action-oriented language with strong verbs
- Concise and skimmable (use headings H1-H3, bullet points)
- Eliminate fluff and jargon
- Ad copy must match landing page copy (message match)
- AIDA framework: Attention, Interest, Desire, Action

### CTA Optimization

- Strong action verbs with benefit-oriented framing
- Visually distinct (high-contrast colors)
- Above the fold placement
- Multiple CTAs allowed (same destination)
- Mobile-friendly sizing (min 48px touch target)
- Optional: urgency tactics, scarcity, guarantees, social proof near CTA

### UX & Usability

- Cohesive visual style with clear visual hierarchy
- Effective use of whitespace
- Limited navigation options (focus on primary goal)
- Minimize form fields (labels above fields, inline validation)
- Mobile-responsive design
- Error handling with helpful messages
- F-pattern or Z-pattern layout
- Max 3 main colors in palette

### Accessibility (WCAG 2.2)

- Focus indicators on all interactive elements
- Logical tab order
- Skip links
- Semantic HTML
- Alt text for all images
- ARIA attributes where needed
- Color contrast per WCAG guidelines
- Minimum readable font size (16px mobile)
- User font adjustment support

### Technical SEO

- Page load under 3 seconds (ideal: under 2 seconds)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Images optimized (WebP, lazy loading, width/height attributes)
- Minified CSS/JS
- Clear and descriptive URLs
- Title tag under 60 characters with keywords
- Meta description ~160 characters with keywords
- Structured data (JSON-LD) for rich snippets
- Sitemap and robots.txt configured
- Internal linking with contextual anchor text

### Common Mistakes to Avoid

- Extensive navigation menus on landing pages
- Unnecessary outbound links (leaking traffic)
- Text walls without visual breaks
- Information overload
- Missing section transitions
- CTAs without clear benefit
- Ignoring mobile experience

## Goal

Maximize learning, technical quality, and professional growth through honest, challenging, and well-founded feedback.
