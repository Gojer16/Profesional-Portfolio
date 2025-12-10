# Design Document

## Overview

This design document outlines the architecture and implementation approach for Orlando Ascanio's professional portfolio website. The portfolio is a Next.js-based static site that emphasizes clarity, authority, and substance through minimal design. It serves as a business card, writing hub, product index, and credibility engine.

The design follows a text-first philosophy inspired by macOS design principles: generous white space, clear typography hierarchy, soft shadows, and subtle interactions. The system prioritizes performance, accessibility, and maintainability while avoiding unnecessary complexity.

## Architecture

### High-Level Architecture

The portfolio follows a static site generation (SSG) architecture using Next.js App Router:

```
┌─────────────┐
│   Visitor   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│   Next.js App (Static Pages)    │
│  ┌───────────────────────────┐  │
│  │  App Router Pages         │  │
│  │  - Home                   │  │
│  │  - Work                   │  │
│  │  - Notes                  │  │
│  │  - About                  │  │
│  │  - Contact                │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  React Components         │  │
│  │  - Layout                 │  │
│  │  - Header/Navigation      │  │
│  │  - ProjectCard            │  │
│  │  - NoteCard               │  │
│  │  - MDXRenderer            │  │
│  └───────────────────────────┘  │
└─────────────┬───────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│   Content Layer (File System)   │
│  ┌───────────────────────────┐  │
│  │  /content/projects/*.mdx  │  │
│  │  /content/notes/*.mdx     │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Technology Stack

- **Next.js 14+**: App Router for routing, SSG for performance, built-in optimization
- **React 18+**: Component-based UI with server components where possible
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **MDX**: Markdown with JSX for content authoring
- **TypeScript**: Type safety throughout the codebase
- **Vercel**: Deployment platform with automatic builds

### Design Principles

1. **Text-First**: Content and typography drive the design, not visual effects
2. **Static Generation**: All pages pre-rendered at build time for maximum performance
3. **File-Based Content**: Projects and notes stored as MDX files with frontmatter
4. **Component Composition**: Small, reusable components following single responsibility
5. **Progressive Enhancement**: Core content accessible without JavaScript
6. **Mobile-First Responsive**: Design scales from mobile to desktop gracefully

## Components and Interfaces

### Core Components

#### Layout Component

Wraps all pages with consistent structure:

```typescript
interface LayoutProps {
  children: React.ReactNode;
}

// Responsibilities:
// - Render Header with Navigation
// - Wrap children in max-width container
// - Apply consistent vertical spacing
// - Render Footer
// - Apply global styles
```

#### Header Component

Contains navigation and branding:

```typescript
interface HeaderProps {
  currentPath?: string;
}

// Responsibilities:
// - Render navigation links (Work, Notes, About, Contact)
// - Highlight active page
// - Sticky positioning
// - Responsive spacing
```

#### PageTitle Component

Consistent page heading display:

```typescript
interface PageTitleProps {
  title: string;
  subtitle?: string;
}

// Responsibilities:
// - Render H1 with design system typography
// - Optional subtitle with secondary text color
// - Consistent spacing below
```

#### TextLink Component

Styled link with hover states:

```typescript
interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

// Responsibilities:
// - Apply purple accent color
// - Subtle hover opacity change
// - External link indicator if needed
// - Proper accessibility attributes
```

#### ProjectCard Component

Displays individual project entries:

```typescript
interface ProjectCardProps {
  title: string;
  year: number;
  description: string;
  whyItMatters: string;
  techStack?: string[];
  screenshot: string;
  externalLink?: string;
}

// Responsibilities:
// - Render screenshot with proper aspect ratio
// - Display title with year
// - Show description (3 lines max)
// - Display "Why it matters" section
// - Show tech stack as tags
// - Link to external resource if available
// - Responsive layout (vertical on mobile)
```

#### NoteCard Component

Displays note entries in list view:

```typescript
interface NoteCardProps {
  title: string;
  category: string;
  insightLine: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
}

// Responsibilities:
// - Render title as link to full note
// - Display category badge
// - Show insight line prominently
// - Display excerpt
// - Show publication date
// - Hover state for entire card
```

#### MDXRenderer Component

Renders MDX content with styling:

```typescript
interface MDXRendererProps {
  content: string;
}

// Responsibilities:
// - Parse and render MDX
// - Apply typography styles to markdown elements
// - Handle code blocks with syntax highlighting
// - Ensure proper spacing between elements
// - Limit line length for readability
```

#### Footer Component

Minimal footer with copyright:

```typescript
interface FooterProps {
  year?: number;
}

// Responsibilities:
// - Display copyright notice
// - Minimal styling
// - Consistent spacing from content
```

### Content Management Interface

```typescript
// Content loading utilities
interface Project {
  title: string;
  year: number;
  slug: string;
  description: string;
  why_it_matters: string;
  tech_stack?: string[];
  screenshot: string;
  external_link?: string;
  status: 'active' | 'archive';
}

interface Note {
  title: string;
  category: string;
  insight_line: string;
  excerpt: string;
  content: string;
  published_at: string;
  slug: string;
}

// Functions:
// - getAllProjects(): Promise<Project[]>
// - getProjectBySlug(slug: string): Promise<Project | null>
// - getAllNotes(): Promise<Note[]>
// - getNoteBySlug(slug: string): Promise<Note | null>
// - getNotesByCategory(category: string): Promise<Note[]>
```

### Content Validation

Build-time validation ensures content quality and prevents broken deployments:

```typescript
// Validation functions
function validateProjectFrontmatter(frontmatter: any, filepath: string): void {
  // Required fields
  assert(frontmatter.title?.length > 0, `${filepath}: title is required`);
  assert(frontmatter.title?.length <= 100, `${filepath}: title must be ≤100 chars`);
  
  // Year validation
  assert(typeof frontmatter.year === 'number', `${filepath}: year must be a number`);
  assert(frontmatter.year >= 2000 && frontmatter.year <= 2100, `${filepath}: year must be 2000-2100`);
  
  // Slug validation
  assert(frontmatter.slug?.length > 0, `${filepath}: slug is required`);
  assert(/^[a-z0-9-]+$/.test(frontmatter.slug), `${filepath}: slug must be lowercase with hyphens only`);
  
  // Description validation
  assert(frontmatter.description?.length > 0, `${filepath}: description is required`);
  assert(frontmatter.description?.length <= 300, `${filepath}: description must be ≤300 chars`);
  
  // Why it matters validation
  assert(frontmatter.why_it_matters?.length > 0, `${filepath}: why_it_matters is required`);
  
  // Screenshot validation
  assert(frontmatter.screenshot?.length > 0, `${filepath}: screenshot is required`);
  const screenshotPath = path.join(process.cwd(), 'public', frontmatter.screenshot);
  assert(fs.existsSync(screenshotPath), `${filepath}: screenshot file not found at ${frontmatter.screenshot}`);
  
  // Status validation
  assert(['active', 'archive'].includes(frontmatter.status), `${filepath}: status must be 'active' or 'archive'`);
  
  // Tech stack validation (optional)
  if (frontmatter.tech_stack) {
    assert(Array.isArray(frontmatter.tech_stack), `${filepath}: tech_stack must be an array`);
  }
  
  // External link validation (optional)
  if (frontmatter.external_link) {
    assert(isValidUrl(frontmatter.external_link), `${filepath}: external_link must be a valid URL`);
  }
}

function validateNoteFrontmatter(frontmatter: any, content: string, filepath: string): void {
  // Required fields
  assert(frontmatter.title?.length > 0, `${filepath}: title is required`);
  assert(frontmatter.title?.length <= 150, `${filepath}: title must be ≤150 chars`);
  
  // Category validation
  const validCategories = [
    'AI engineering',
    'Systems design',
    'Product thinking',
    'Psychology & self-awareness',
    'Skill acquisition',
    'Founder mindset'
  ];
  assert(validCategories.includes(frontmatter.category), `${filepath}: category must be one of ${validCategories.join(', ')}`);
  
  // Insight line validation
  assert(frontmatter.insight_line?.length > 0, `${filepath}: insight_line is required`);
  assert(frontmatter.insight_line?.length <= 200, `${filepath}: insight_line must be ≤200 chars`);
  
  // Excerpt validation
  assert(frontmatter.excerpt?.length > 0, `${filepath}: excerpt is required`);
  assert(frontmatter.excerpt?.length <= 300, `${filepath}: excerpt must be ≤300 chars`);
  
  // Published date validation
  assert(frontmatter.published_at, `${filepath}: published_at is required`);
  assert(isValidISODate(frontmatter.published_at), `${filepath}: published_at must be valid ISO 8601 date`);
  
  // Content length validation (3-7 sentences)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  assert(sentences.length >= 3 && sentences.length <= 7, `${filepath}: content must be 3-7 sentences (found ${sentences.length})`);
}

function validateSlugUniqueness(projects: Project[], notes: Note[]): void {
  const projectSlugs = projects.map(p => p.slug);
  const noteSlugs = notes.map(n => n.slug);
  
  // Check for duplicate project slugs
  const duplicateProjectSlugs = projectSlugs.filter((slug, index) => projectSlugs.indexOf(slug) !== index);
  assert(duplicateProjectSlugs.length === 0, `Duplicate project slugs found: ${duplicateProjectSlugs.join(', ')}`);
  
  // Check for duplicate note slugs
  const duplicateNoteSlugs = noteSlugs.filter((slug, index) => noteSlugs.indexOf(slug) !== index);
  assert(duplicateNoteSlugs.length === 0, `Duplicate note slugs found: ${duplicateNoteSlugs.join(', ')}`);
}
```

## Data Models

### Project Model

Stored as MDX files in `/content/projects/`:

```yaml
---
title: string (required)
year: number (required)
slug: string (required)
description: string (required, max 3 lines)
why_it_matters: string (required)
tech_stack: string[] (optional)
screenshot: string (required, path to image)
external_link: string (optional, URL)
status: 'active' | 'archive' (required)
---
```

**Validation Rules:**
- Title: 1-100 characters
- Year: 2000-2100
- Slug: lowercase, hyphens only, unique
- Description: Maximum 300 characters
- Screenshot: Must exist in /public/images/projects/
- Status: Only active projects shown on main work page

### Note Model

Stored as MDX files in `/content/notes/`:

```yaml
---
title: string (required)
category: string (required, enum)
insight_line: string (required)
excerpt: string (required)
published_at: string (required, ISO date)
---

[MDX content: 3-7 sentences]
```

**Validation Rules:**
- Title: 1-150 characters
- Category: Must be one of: "AI engineering", "Systems design", "Product thinking", "Psychology & self-awareness", "Skill acquisition", "Founder mindset"
- Insight line: 1-200 characters
- Excerpt: 1-300 characters
- Content: 3-7 sentences (enforced by linting)
- Published date: Valid ISO 8601 date

### Design System Tokens

#### CSS Variables Foundation

First, define CSS variables in `/client/styles/tokens.css`:

```css
:root {
  /* Brand Colors */
  --primary: #6A4CFF;
  --primary-soft: #A18CFF;
  --primary-light: #ECE8FF;
  
  /* Semantic Colors */
  --color-text: #1A1A1A;
  --color-text-secondary: #595959;
  --color-bg: #F7F7F9;
  --color-card-bg: #FFFFFF;
  --color-accent: var(--primary);
  --color-border: #E5E5E5;
  
  /* Spacing Scale */
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  
  /* Border Radius */
  --radius-base: 8px;
  --radius-lg: 12px;
  
  /* Typography */
  --max-line-length: 65ch;
  --content-max-width: 780px;
}
```

#### Tailwind Configuration

Consume CSS variables in Tailwind:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-soft': 'var(--primary-soft)',
        'primary-light': 'var(--primary-light)',
        background: 'var(--color-bg)',
        'text-primary': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        'card-bg': 'var(--color-card-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif'],
        display: ['Inter Tight', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
      },
      maxWidth: {
        'content': 'var(--content-max-width)',
        'line': 'var(--max-line-length)',
      },
      borderRadius: {
        'DEFAULT': 'var(--radius-base)',
        'lg': 'var(--radius-lg)',
      },
      transitionDuration: {
        'DEFAULT': '150ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'ease-out',
      },
    },
  },
}
```

### Global Layout and Rhythm

#### Vertical Spacing Rules

**Section Spacing:**
- Desktop: `py-16` (64px top/bottom)
- Mobile: `py-12` (48px top/bottom)

**Component Spacing:**
- Between major components: `space-y-8` (32px)
- Between related elements: `space-y-6` (24px)
- Between tight groupings: `space-y-4` (16px)

**Paragraph Spacing:**
- Standard: `mb-6` (24px)
- Tight: `mb-4` (16px)

**Heading-to-Body Spacing:**
- H1 → body: `mt-6` (24px)
- H2 → body: `mt-4` (16px)
- H3 → body: `mt-3` (12px)

#### Typography Constraints

**Line Length:**
- Running text: `max-w-[65ch]`
- Headings: No constraint (naturally shorter)

**Text Rendering:**
```css
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  hyphens: auto;
}
```

**Heading Rules:**
- H1 appears exactly once per page (page title)
- H2+ used within MDX content only
- Use sentence case for all headings (not title case)

### Interaction Model

#### Hover States

**Soft Hover (Links, Cards):**
```css
.interactive-element {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.interactive-element:hover {
  opacity: 0.9;
}
```

**Link Hover:**
```css
.text-link {
  transition: opacity 0.15s ease-out;
}

.text-link:hover {
  opacity: 0.8;
}
```

#### Focus States

**WCAG Compliant Focus Ring:**
```css
.focusable:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-base);
}
```

Tailwind classes: `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-md`

#### Active States

**Navigation Active:**
- Color: `text-primary` (purple accent)
- Font weight: Same as inactive (no bold)
- Underline: Optional subtle underline

**Button/Link Pressed:**
```css
.interactive:active {
  transform: scale(0.98);
}
```

#### Motion System

**Standard Transitions:**
- Duration: `150ms`
- Easing: `ease-out`

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Site Map

```
/                          → Home page
/work                      → Work page (all projects)
/notes                     → Notes page (all notes by category)
/notes/[slug]              → Individual note page
/about                     → About page
/contact                   → Contact page
/404                       → Custom 404 page
```

**Note**: Individual project pages (`/work/[slug]`) are not included in V1. Projects link directly to external repositories or live demos.

## Error Handling

### Content Loading Errors

**Strategy**: Fail gracefully with helpful messages

- **Missing content files**: Return empty arrays, log warning
- **Invalid frontmatter**: Skip file, log error with filename
- **Malformed MDX**: Display error message in development, skip in production
- **Missing images**: Use placeholder, log warning

### Navigation Errors

**Strategy**: Always provide fallback

- **404 pages**: Custom 404 with navigation back to home
- **Invalid slugs**: Redirect to parent page (e.g., /notes)
- **Broken links**: Validate all internal links at build time

### Performance Errors

**Strategy**: Optimize and monitor

- **Large images**: Automatic optimization via Next.js Image component
- **Slow builds**: Incremental static regeneration for notes if needed
- **Bundle size**: Code splitting by route, lazy load non-critical components

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Coverage**:
- Component rendering with various props
- Content parsing utilities
- Link generation and validation
- Responsive behavior (viewport testing)
- Accessibility attributes

**Example Tests**:
```typescript
describe('ProjectCard', () => {
  it('renders project title and year', () => {});
  it('displays description with proper truncation', () => {});
  it('shows tech stack tags when provided', () => {});
  it('renders external link when available', () => {});
  it('applies correct aspect ratio to screenshot', () => {});
});

describe('Content utilities', () => {
  it('loads all projects from content directory', () => {});
  it('filters active projects correctly', () => {});
  it('sorts notes by publication date', () => {});
  it('groups notes by category', () => {});
});
```

### Integration Testing

**Framework**: Playwright

**Coverage**:
- Full page navigation flow
- Mobile responsive behavior
- Link functionality across pages
- Image loading and optimization
- Form submission (if contact form added)

**Example Tests**:
```typescript
test('visitor can navigate from home to work page', async ({ page }) => {});
test('visitor can read a note and return to notes list', async ({ page }) => {});
test('navigation highlights active page', async ({ page }) => {});
test('mobile menu remains accessible on small screens', async ({ page }) => {});
```

### Accessibility Testing

**Tools**: axe-core, Lighthouse CI

**Coverage**:
- WCAG AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus indicators

### Performance Testing

**Tools**: Lighthouse CI, WebPageTest

**Metrics**:
- First Contentful Paint < 1s
- Largest Contentful Paint < 2s
- Time to Interactive < 2s
- Cumulative Layout Shift < 0.1
- Lighthouse Performance Score > 95

### Visual Regression Testing

**Tool**: Percy or Chromatic

**Coverage**:
- All page layouts
- Component variations
- Responsive breakpoints
- Hover states
- Dark mode (if added later)

## Deployment Strategy

### Build Process

1. **Content Validation**: Lint all MDX files for frontmatter compliance
2. **Type Checking**: Run TypeScript compiler
3. **Linting**: ESLint for code quality
4. **Testing**: Run unit and integration tests
5. **Build**: Next.js static export
6. **Optimization**: Image optimization, bundle analysis

### Deployment Pipeline

**Platform**: Vercel

**Workflow**:
1. Push to main branch triggers build
2. Vercel runs build process
3. Preview deployment for review
4. Automatic production deployment on success
5. Rollback capability if issues detected

### Environment Configuration

```
# Production
NEXT_PUBLIC_SITE_URL=https://orlandoascanio.com
NEXT_PUBLIC_ANALYTICS_ID=<optional>

# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Monitoring

- **Error Tracking**: Vercel Analytics
- **Performance**: Lighthouse CI on every deploy
- **Uptime**: Vercel built-in monitoring
- **Analytics**: Privacy-respecting analytics (optional)

## Future Extensibility

### Potential Enhancements

1. **RSS Feed**: Generate Atom/RSS feed for notes
2. **Search**: Client-side search for notes and projects
3. **Tags**: Cross-cutting tags across projects and notes
4. **Archive Page**: Separate page for archived projects
5. **Long-Form Essays**: Support for longer content beyond notes
6. **Labs Section**: Experimental projects and prototypes
7. **CMS Integration**: Headless CMS for non-technical content updates
8. **Newsletter**: Email subscription for new notes

### Architectural Considerations

- Keep file-based content as primary source of truth
- Any CMS should sync to Git repository
- Maintain static generation for performance
- Add features incrementally without breaking existing structure
- Preserve text-first, minimal design philosophy

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After reviewing the acceptance criteria, many requirements focus on specific content, design principles, or CSS configuration rather than universal behavioral properties. However, several key properties emerge that should hold across all instances:

### Property 1: Project Entry Completeness

*For any* project entry displayed on the work page, it must include a screenshot with 3:2 or square aspect ratio, a title with year, a three-line description, and a "Why it matters" statement.

**Validates: Requirements 2.2, 2.3, 2.4, 2.5**

**Rationale**: This ensures every project is presented with complete information, maintaining consistency and professionalism across the portfolio.

### Property 2: Project Link Availability

*For any* project entry that has an `external_link` field in its frontmatter, the rendered card must include a clickable link element pointing to that URL.

**Validates: Requirements 2.6**

**Rationale**: This ensures that when external links are provided, they are always accessible to visitors.

### Property 3: Active Project Limit

*For any* collection of projects in the content directory, the work page must display at most 6 projects with status "active", regardless of how many active projects exist.

**Validates: Requirements 2.7**

**Rationale**: This maintains a curated, focused presentation even as the project collection grows.

### Property 4: Note Categorization

*For any* note entry, its category must be one of the valid categories: "AI engineering", "Systems design", "Product thinking", "Psychology & self-awareness", "Skill acquisition", or "Founder mindset".

**Validates: Requirements 3.2**

**Rationale**: This ensures all notes are properly categorized and can be organized correctly on the notes page.

### Property 5: Note Entry Completeness

*For any* note entry displayed on the notes page, it must include a title, core insight line, excerpt, and category.

**Validates: Requirements 3.3, 3.4, 3.5**

**Rationale**: This ensures every note provides sufficient context for visitors to decide whether to read the full content.

### Property 6: Note Content Length Constraint

*For any* note's full content, it must contain between 3 and 7 sentences.

**Validates: Requirements 3.6**

**Rationale**: This enforces the "surgical insights" philosophy, preventing notes from becoming long essays.

### Property 7: Markdown Rendering

*For any* note content containing valid markdown syntax, the rendered output must correctly display the formatted elements (bold, italic, links, code blocks, etc.).

**Validates: Requirements 3.7**

**Rationale**: This ensures the content authoring experience supports rich formatting while maintaining readability.

### Property 8: Navigation Completeness

*For any* page in the portfolio, the navigation must contain links to all four main sections: Work, Notes, About, and Contact.

**Validates: Requirements 6.1**

**Rationale**: This ensures visitors can always navigate to any section from any page.

### Property 9: Client-Side Routing

*For any* navigation link click within the portfolio, the page transition must occur without a full page reload (using Next.js client-side routing).

**Validates: Requirements 6.2**

**Rationale**: This ensures smooth, fast navigation that feels like a modern web application.

### Property 10: Navigation Active State

*For any* page being viewed, the corresponding navigation item must be visually indicated as active using the primary purple accent color.

**Validates: Requirements 6.4**

**Rationale**: This provides clear wayfinding so visitors always know where they are in the site.

### Property 11: Navigation Accessibility

*For any* navigation element, it must have a minimum touch target size of 44px to meet accessibility standards.

**Validates: Requirements 6.11**

**Rationale**: This ensures the navigation is usable for people with motor impairments and on touch devices.

### Property 12: Mobile Layout Adaptation

*For any* page rendered on a viewport under 640px wide, the layout must adapt to single-column format.

**Validates: Requirements 7.2**

**Rationale**: This ensures content remains readable and accessible on mobile devices.

### Property 13: Mobile Typography Scaling

*For any* text element rendered on a viewport under 640px wide, the font size must scale down by one step in the typography hierarchy.

**Validates: Requirements 7.3**

**Rationale**: This maintains readability on smaller screens while fitting more content in the viewport.

### Property 14: Mobile Card Stacking

*For any* project card rendered on a viewport under 640px wide, the screenshot and text must stack vertically rather than horizontally.

**Validates: Requirements 7.6**

**Rationale**: This ensures project cards remain readable and visually balanced on mobile devices.

### Property 15: Content Line Length

*For any* MDX content being rendered, the line length must not exceed 65 characters.

**Validates: Requirements 7.8**

**Rationale**: This maintains optimal readability based on typography research showing 50-75 characters per line is ideal.

### Property 16: Responsive Image Scaling

*For any* image displayed in the portfolio, it must scale appropriately to fit within the viewport without overflow or distortion.

**Validates: Requirements 7.10**

**Rationale**: This ensures images enhance rather than break the layout across different screen sizes.

### Property 17: High-DPI Image Loading

*For any* image displayed on a high-density display (2x pixel ratio or higher), the system must load the 2x resolution version.

**Validates: Requirements 7.11**

**Rationale**: This ensures images appear crisp on retina displays without appearing blurry.

### Property 18: Content Field Validation

*For any* project or note being added to the content directory, all required fields in the frontmatter must be present and non-empty, or the build must fail with a clear error message.

**Validates: Requirements 9.1**

**Rationale**: This prevents incomplete content from being published and maintains quality standards.

### Property 19: MDX Feature Support

*For any* note containing MDX features (JSX components, imports), those features must render correctly in the final output.

**Validates: Requirements 9.3**

**Rationale**: This ensures the content authoring system supports advanced formatting when needed.

### Property 20: Project Categorization

*For any* project, it must be assignable to a category (macOS apps, AI tools, experiments, dev tools, open source) through its frontmatter.

**Validates: Requirements 9.6**

**Rationale**: This enables proper organization and filtering of projects on the work page.

### Property Reflection

After reviewing all identified properties, several can be consolidated:

- **Properties 1 and 2** both deal with project entry completeness and can be combined into a single comprehensive property about project card rendering
- **Properties 5 and 6** both deal with note completeness and constraints, and can be combined
- **Properties 12, 13, and 14** all deal with mobile responsiveness and can be combined into a single property about mobile layout adaptation

**Consolidated Properties:**

**Property 1 (Consolidated)**: Project Card Completeness
*For any* project entry, the rendered card must include all required elements (screenshot with correct aspect ratio, title with year, description, "Why it matters" statement) and if an external_link exists, a clickable link.

**Property 5 (Consolidated)**: Note Completeness and Length
*For any* note entry, it must include title, category (from valid set), insight line, excerpt, and content between 3-7 sentences.

**Property 12 (Consolidated)**: Mobile Responsive Adaptation
*For any* page rendered on viewport under 640px, the layout must adapt to single-column, typography must scale down one step, and cards must stack vertically.

The remaining properties (3, 4, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20) provide unique validation value and should be retained as-is.

### Additional Properties

### Property 21: Notes Sorted by Publication Date

*For any* collection of notes displayed on the notes page, they must be sorted in descending chronological order by publication date (newest first).

**Validates: Content organization requirements**

**Rationale**: This ensures visitors see the most recent insights first, maintaining relevance and freshness.

### Property 22: No Orphan Routes

*For any* route `/notes/[slug]`, there must exist a corresponding MDX file at `/content/notes/[slug].mdx`, or the system must return a 404 page.

**Validates: Routing integrity**

**Rationale**: This prevents broken links and ensures all routes resolve to actual content.

### Property 23: MDX Rendering Consistency

*For any* markdown element (heading, paragraph, list, code block) within MDX content, it must be rendered with the design system's typography rules without arbitrary styling.

**Validates: Requirements 3.7, Design system consistency**

**Rationale**: This ensures all content maintains visual consistency regardless of author or content type.

### Property 24: Responsive Content Width

*For any* page and at any breakpoint, the main content width must never exceed 780px and must maintain consistent horizontal padding.

**Validates: Requirements 7.1, 7.9, Design system spacing**

**Rationale**: This maintains optimal readability and visual consistency across all screen sizes.

### Property 25: Accessibility Guarantee

*For any* interactive element (link, button, navigation item), it must have:
- A visible focus-visible state with 2px outline
- Appropriate ARIA labels where text content is insufficient
- Semantic HTML tags (not generic divs)

**Validates: Requirements 12.2, 12.3, 12.6**

**Rationale**: This ensures the portfolio is usable by people with disabilities and meets WCAG AA standards.

### Property 26: Typography Hierarchy Enforcement

*For any* page, there must be exactly one H1 element (the page title), and heading levels must not skip (e.g., H1 → H3 without H2).

**Validates: Requirements 12.9, Typography constraints**

**Rationale**: This ensures proper document structure for screen readers and SEO.

### Property 27: Image Optimization

*For any* image displayed in the portfolio, it must be processed through Next.js Image component with appropriate width, height, and quality settings.

**Validates: Requirements 8.2, 11.3**

**Rationale**: This ensures optimal performance through automatic image optimization and lazy loading.

### Property 28: Build-Time Content Validation

*For any* build process, if content files contain invalid frontmatter or missing required fields, the build must fail with a clear error message indicating the file and field.

**Validates: Requirements 9.1, Content validation**

**Rationale**: This prevents incomplete or malformed content from being deployed to production.
