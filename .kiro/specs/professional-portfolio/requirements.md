# Requirements Document

## Introduction

This document defines the requirements for a professional portfolio website for Orlando Ascanio, an AI Engineer and emerging founder. The portfolio emphasizes authority, clarity, and trust through minimal design, focusing on substance over style. It serves as a business card, writing hub, product index, and credibility engine.

## Glossary

- **Portfolio System**: The complete web application that presents Orlando Ascanio's professional identity, work, and thought leadership
- **Visitor**: Any person accessing the portfolio website
- **Project Entry**: A single work item displayed in the portfolio (macOS app, AI tool, experiment, etc.)
- **Note Entry**: A short-form written piece sharing knowledge or insights
- **Navigation System**: The mechanism allowing visitors to move between different sections of the portfolio
- **Content Management**: The system for organizing and displaying projects and notes

## Information Architecture

The Portfolio System consists of the following top-level pages:

1. **Home (/)**: Landing page establishing identity, positioning, and core message with navigation to other sections
2. **Work (/work)**: Comprehensive display of all projects, products, and contributions organized by type
3. **Notes (/notes)**: Collection of short-form insights and learnings organized by category
4. **About (/about)**: Personal story, principles, and long-term vision
5. **Contact (/contact)**: Essential contact information and professional links

## Content Models

### Project Model

Each project entry contains:

- **title** (string, required): Name of the project
- **year** (number, required): Year of creation or launch
- **slug** (string, required): URL-friendly identifier
- **description** (string, required, max 3 lines): What it is, how it was built, design philosophy
- **why_it_matters** (string, required): Significance and what it demonstrates
- **tech_stack** (array of strings, optional): Technologies used
- **screenshot** (string, required): Path to visual representation
- **external_link** (string, optional): URL to project or repository
- **status** (enum: active/archive, required): Current project status

### Note Model

Each note entry contains:

- **title** (string, required): Short, direct statement
- **category** (enum, required): AI engineering, Systems design, Product thinking, Psychology & self-awareness, Skill acquisition, Founder mindset
- **insight_line** (string, required): Core takeaway summary
- **excerpt** (string, required): Brief preview
- **content** (MDX, required, 3-7 sentences): Full note content
- **published_at** (date, required): Publication date

## Technical Stack

- **Next.js**: For routing, SEO optimization, and simplicity in building the application
- **Tailwind CSS**: For fast, consistent styling with utility-first approach
- **MDX**: For writing and rendering notes with markdown support
- **File-based storage**: For content management using markdown and YAML frontmatter
- **Vercel**: For deployment and hosting
- **No backend server**: Static generation approach for maximum performance

## Constraints

The Portfolio System is explicitly constrained by the following rules:

1. No JavaScript-heavy animations or transitions
2. No marketing-style hero sections with large graphics
3. No gradient-heavy UI design
4. No clickbait or hyperbolic language
5. No unnecessary routes or pages beyond Work, Notes, About, and Contact
6. Pure text-first design philosophy
7. No dark mode toggle (single, consistent theme)
8. No social media widgets or embedded feeds
9. No analytics tracking beyond basic privacy-respecting metrics

## Success Metrics

The Portfolio System will be considered successful when:

1. Initial HTML loads in under 200 milliseconds
2. Time to meaningful content is under 2 seconds
3. Lighthouse performance score exceeds 95
4. Average reading time on Work page exceeds 45 seconds
5. Content width does not exceed 720-780 pixels for optimal readability
6. All pages maintain consistent vertical rhythm using 8/12/16/24/32px spacing scale

## Component Requirements

### Requirement 0.1

**User Story:** As a developer implementing the portfolio, I want reusable components defined, so that I can build consistently without redesigning each element.

#### Acceptance Criteria

1. WHEN the Portfolio System is implemented THEN it SHALL include a Layout component that wraps all pages with consistent structure
2. WHEN the Portfolio System is implemented THEN it SHALL include a Header component containing the Navigation System
3. WHEN the Portfolio System is implemented THEN it SHALL include a PageTitle component for consistent page heading display
4. WHEN the Portfolio System is implemented THEN it SHALL include a TextLink component for consistent link styling with hover states
5. WHEN the Portfolio System is implemented THEN it SHALL include a ProjectCard component for displaying project entries
6. WHEN the Portfolio System is implemented THEN it SHALL include a NoteCard component for displaying note entries
7. WHEN the Portfolio System is implemented THEN it SHALL include an MDXRenderer component for rendering markdown content
8. WHEN the Portfolio System is implemented THEN it SHALL include a Footer component with minimal content or copyright information
9. WHEN components are created THEN they SHALL be composable and reusable across different pages
10. WHEN components are styled THEN they SHALL use Tailwind utility classes following the design system tokens

## Design System Requirements

### Requirement 0

**User Story:** As a visitor viewing any page, I want the design to feel unified, intentional, and professional, so that I perceive Orlando as a mature builder with attention to craft.

#### Typography Scale

1. WHEN the Portfolio System renders H1 headings THEN it SHALL use font size 40-48px with font weight 600-700 and line height 1.2
2. WHEN the Portfolio System renders H2 headings THEN it SHALL use font size 28-32px with font weight 600 and line height 1.3
3. WHEN the Portfolio System renders H3 headings THEN it SHALL use font size 20-24px with font weight 600 and line height 1.4
4. WHEN the Portfolio System renders large body text THEN it SHALL use font size 18-20px with font weight 400 and line height 1.6
5. WHEN the Portfolio System renders standard body text THEN it SHALL use font size 16px with font weight 400 and line height 1.5
6. WHEN the Portfolio System renders small body text THEN it SHALL use font size 14px with font weight 400 and line height 1.5
7. WHEN the Portfolio System renders text THEN it SHALL use Inter Tight or SF Pro Display for headers
8. WHEN the Portfolio System renders text THEN it SHALL use Inter or SF Pro Text for body content
9. WHEN the Portfolio System renders code or technical blocks THEN it SHALL use JetBrains Mono font
10. WHEN the Portfolio System renders text THEN it SHALL limit line length to maximum 12-14 words per line for optimal readability

#### Color System

1. WHEN the Portfolio System applies colors THEN it SHALL use the primary purple accent color #6A4CFF for links, active states, and key accents
2. WHEN the Portfolio System applies colors THEN it SHALL use background color #F7F7F9 for page backgrounds
3. WHEN the Portfolio System applies colors THEN it SHALL use primary text color #1A1A1A for main content
4. WHEN the Portfolio System applies colors THEN it SHALL use secondary text color #595959 for supporting text
5. WHEN the Portfolio System applies colors THEN it SHALL use border color #E5E5E5 for dividers and borders
6. WHEN the Portfolio System applies accent colors THEN it SHALL use #A18CFF for soft purple tints sparingly
7. WHEN the Portfolio System applies accent colors THEN it SHALL use #ECE8FF for ultra-light purple sections sparingly

#### Spacing System

1. WHEN the Portfolio System renders layouts THEN it SHALL use a vertical spacing scale with values 8px, 12px, 16px, 24px, 32px, 48px, 64px
2. WHEN the Portfolio System renders layouts THEN it SHALL apply generous white space between major sections using 48-64px spacing
3. WHEN the Portfolio System renders layouts THEN it SHALL apply 24-32px spacing between related elements
4. WHEN the Portfolio System renders layouts THEN it SHALL apply 16px spacing for tight groupings
5. WHEN the Portfolio System renders layouts THEN it SHALL constrain content width to maximum 720-780px
6. WHEN the Portfolio System renders layouts THEN it SHALL center content horizontally with equal margins

#### Visual Style

1. WHEN the Portfolio System renders layouts THEN it SHALL avoid gradients except for one subtle background highlight if needed
2. WHEN the Portfolio System renders layouts THEN it SHALL maintain clear visual hierarchy through spacing and typography
3. WHEN the Portfolio System renders any page THEN it SHALL follow text-first design principles without decorative elements
4. WHEN the Portfolio System renders components THEN it SHALL apply soft shadows following macOS design principles
5. WHEN the Portfolio System renders components THEN it SHALL use rounded corners with 8-12px border radius

### Requirement 1

**User Story:** As a visitor, I want to immediately understand who Orlando is and what he does, so that I can quickly assess his expertise and credibility.

#### Acceptance Criteria

1. WHEN a visitor loads the home page THEN the Portfolio System SHALL display the header text "Orlando Ascanio" followed by "AI Engineer • Product Builder • Founder in Training"
2. WHEN the home page renders THEN the Portfolio System SHALL display an identity block of exactly four lines
3. WHEN the home page renders THEN the Portfolio System SHALL include the text "I build intelligent systems and tools that help people learn, grow, and operate at their best. My work focuses on AI engineering, product development, and designing practical software with clarity and discipline. I care about depth, precision, and building things that actually serve people — not noise, not hype. This site documents the work, the lessons, and the mission."
4. WHEN the home page renders THEN the Portfolio System SHALL display subtle call-to-action links "Explore my work" and "Read my notes" as text links without buttons
5. WHEN the home page renders THEN the Portfolio System SHALL use text-first design with typography and presence, without gradients or animations
6. WHEN the home page renders THEN the Portfolio System SHALL display navigation links for Work, Notes, About, and Contact only
7. WHEN the home page renders THEN the Portfolio System SHALL center or left-align the header in Apple style

### Requirement 2

**User Story:** As a visitor, I want to see everything Orlando has built, so that I can evaluate his technical capabilities and product experience.

#### Acceptance Criteria

1. WHEN a visitor navigates to the work page THEN the Portfolio System SHALL display the intro text "I make tools, prototypes, and systems. These are the things I've built or am building."
2. WHEN displaying a project entry THEN the Portfolio System SHALL include exactly one screenshot or visual representation with 3:2 or square aspect ratio
3. WHEN displaying a project entry THEN the Portfolio System SHALL include a title with year in parentheses
4. WHEN displaying a project entry THEN the Portfolio System SHALL include a three-line focused description explaining what it is, how it was built, and its design philosophy
5. WHEN displaying a project entry THEN the Portfolio System SHALL include a "Why it matters" statement explaining the significance and what it demonstrates
6. WHEN displaying a project entry THEN the Portfolio System SHALL provide a clickable link to the project or repository when available
7. WHEN organizing projects THEN the Portfolio System SHALL display a maximum of six active projects
8. WHEN organizing projects THEN the Portfolio System SHALL present entries including Self-Awareness Engine, macOS Agent App, AI Agents Toolkit, Systems & Infrastructure Experiments, and Open Source Contributions
9. WHEN displaying open source contributions THEN the Portfolio System SHALL list three to four contributions with direct links

### Requirement 3

**User Story:** As a visitor, I want to read Orlando's thoughts and learnings, so that I can understand his expertise and thinking process.

#### Acceptance Criteria

1. WHEN a visitor navigates to the notes page THEN the Portfolio System SHALL display all note entries organized by category
2. WHEN organizing notes THEN the Portfolio System SHALL group entries into categories including AI engineering, Systems design, Product thinking, Psychology & self-awareness, Skill acquisition, and Founder mindset
3. WHEN displaying a note entry THEN the Portfolio System SHALL show the title as a short, direct statement
4. WHEN displaying a note entry THEN the Portfolio System SHALL include a core insight line summarizing the key takeaway
5. WHEN displaying a note entry THEN the Portfolio System SHALL provide a brief preview or excerpt
6. WHEN a visitor clicks on a note entry THEN the Portfolio System SHALL display the full note content limited to three to seven sentences
7. WHEN rendering note content THEN the Portfolio System SHALL support markdown formatting for readability
8. WHEN rendering notes THEN the Portfolio System SHALL maintain a tone of thoughtful, sharp, minimal insights without fluff or self-marketing
9. WHEN rendering notes THEN the Portfolio System SHALL present surgical insights rather than long essays

### Requirement 4

**User Story:** As a visitor, I want to learn about Orlando's background and mission, so that I can connect with his story and understand his motivations.

#### Acceptance Criteria

1. WHEN a visitor navigates to the about page THEN the Portfolio System SHALL display a bio section with the text "I'm an AI engineer and entrepreneur focused on building meaningful systems and products. I'm driven by curiosity, clarity, and the belief that tools can help people understand themselves and grow. I combine engineering, psychology, and intentional design to create software that improves people's lives. My long-term goal is to build a company that merges AI, learning, and human development."
2. WHEN the about page renders THEN the Portfolio System SHALL display a principles section listing "Substance over aesthetics", "Depth over noise", "Work > talk", "Systems, not hacks", "Consistency over intensity", "Become the man you admire", "Serve before you seek praise", "Be disciplined enough to be free"
3. WHEN the about page renders THEN the Portfolio System SHALL include a vision section with the text "I want to live globally, build meaningfully, grow deliberately, and create tools that make people better. My mission is to develop mastery as a builder and eventually build products that help millions learn, grow, and understand themselves."
4. WHEN the about page renders THEN the Portfolio System SHALL avoid showcasing achievements or certifications unless directly relevant to the mission
5. WHEN the about page renders THEN the Portfolio System SHALL maintain a mature, grounded, and human tone that conveys depth
6. WHEN the about page renders THEN the Portfolio System SHALL communicate becoming someone without excessive self-promotion

### Requirement 5

**User Story:** As a visitor, I want to easily contact Orlando or connect with him professionally, so that I can reach out for opportunities or collaboration.

#### Acceptance Criteria

1. WHEN a visitor navigates to the contact page THEN the Portfolio System SHALL display Orlando's email address
2. WHEN the contact page renders THEN the Portfolio System SHALL provide a link to Orlando's GitHub profile
3. WHEN the contact page renders THEN the Portfolio System SHALL optionally provide a link to Orlando's LinkedIn profile
4. WHEN the contact page renders THEN the Portfolio System SHALL display only these essential contact methods without forms, gimmicks, or additional social media links
5. WHEN displaying contact information THEN the Portfolio System SHALL present it in a simple, clean format with zero noise and no additional content

### Requirement 6

**User Story:** As a visitor, I want to navigate between different sections of the portfolio seamlessly, so that I can explore Orlando's work and thoughts efficiently.

#### Acceptance Criteria

1. WHEN the Portfolio System renders any page THEN the Navigation System SHALL display links to all main sections
2. WHEN a visitor clicks a navigation link THEN the Navigation System SHALL load the requested page without full page reload
3. WHEN the Navigation System displays THEN it SHALL use clear, simple labels for each section
4. WHEN the Navigation System displays THEN it SHALL indicate the current active section with the primary purple accent color
5. WHEN the Navigation System renders THEN it SHALL maintain consistent positioning across all pages
6. WHEN the Navigation System renders THEN it SHALL have a fixed height of 56-64px
7. WHEN the Navigation System renders THEN it SHALL use sticky positioning to remain visible during scroll
8. WHEN the Navigation System displays navigation items THEN it SHALL apply 24-32px spacing between items
9. WHEN the Navigation System renders on mobile devices THEN it SHALL maintain persistent visibility without collapse or hamburger menu
10. WHEN the Navigation System displays interactive elements THEN it SHALL provide subtle opacity change on hover
11. WHEN the Navigation System displays interactive elements THEN it SHALL ensure minimum touch target size of 44px for accessibility

### Requirement 7

**User Story:** As a visitor using any device, I want the portfolio to display correctly and remain readable, so that I can access Orlando's work from desktop, tablet, or mobile.

#### Acceptance Criteria

1. WHEN the Portfolio System renders on any screen size THEN it SHALL maintain readability and proper spacing
2. WHEN the Portfolio System renders on mobile devices THEN it SHALL adapt the layout to single-column format
3. WHEN the Portfolio System renders on screens under 640px THEN all typography SHALL scale down by one step in the hierarchy
4. WHEN the Portfolio System renders on screens under 640px THEN page margins SHALL expand to 20-24px for breathing room
5. WHEN the Portfolio System renders on screens under 640px THEN the Navigation System SHALL remain visible using the same inline layout without hamburger menu
6. WHEN project cards render on mobile THEN screenshots SHALL stack vertically with text underneath
7. WHEN note cards render on mobile THEN layout SHALL collapse into a single-column feed
8. WHEN rendering MDX content THEN line length SHALL remain under 65 characters for optimal readability
9. WHEN the Portfolio System renders on desktop THEN it SHALL utilize appropriate margins and white space
10. WHEN images are displayed THEN the Portfolio System SHALL scale them appropriately for the viewport
11. WHEN the Portfolio System renders on high-density displays THEN images SHALL load in 2x resolution automatically

### Requirement 8

**User Story:** As a visitor, I want the portfolio to load quickly and perform smoothly, so that I can access information without delays or frustration.

#### Acceptance Criteria

1. WHEN a visitor requests any page THEN the Portfolio System SHALL render initial content within two seconds
2. WHEN images are loaded THEN the Portfolio System SHALL optimize them for web delivery
3. WHEN the Portfolio System loads assets THEN it SHALL minimize the number of network requests
4. WHEN a visitor navigates between pages THEN the Portfolio System SHALL provide immediate visual feedback
5. WHEN the Portfolio System renders THEN it SHALL avoid layout shifts during content loading

### Requirement 9

**User Story:** As Orlando, I want to easily add new projects and notes to my portfolio, so that I can keep my work current without technical friction.

#### Acceptance Criteria

1. WHEN Orlando adds a new project THEN the Content Management system SHALL require only essential information fields
2. WHEN Orlando adds a new project THEN the Content Management system SHALL store project data as markdown files with YAML frontmatter
3. WHEN Orlando adds a new note THEN the Content Management system SHALL support MDX format for writing
4. WHEN Orlando adds a new note THEN the Content Management system SHALL store notes as MDX files
5. WHEN Orlando updates content THEN the Content Management system SHALL reflect changes immediately on the live site
6. WHEN Orlando organizes projects THEN the Content Management system SHALL allow categorization by type
7. WHEN Orlando manages content THEN the Content Management system SHALL maintain a simple, file-based structure

### Requirement 10

**User Story:** As a visitor, I want the portfolio design to feel professional and mature, so that I perceive Orlando as a credible founder and engineer.

#### Acceptance Criteria

1. WHEN the Portfolio System renders any page THEN it SHALL use a consistent, minimal color palette
2. WHEN the Portfolio System displays typography THEN it SHALL use clear hierarchy with appropriate font sizes and weights
3. WHEN the Portfolio System renders components THEN it SHALL apply generous white space and comfortable padding
4. WHEN the Portfolio System displays interactive elements THEN it SHALL provide subtle hover states without dramatic effects
5. WHEN the Portfolio System renders THEN it SHALL avoid gradients, animations, and decorative visual elements
6. WHEN the Portfolio System displays content THEN it SHALL prioritize readability over visual complexity
7. WHEN the Portfolio System renders THEN it SHALL follow macOS design principles including soft shadows and rounded corners

## Non-Functional Requirements

### Requirement 11

**User Story:** As a visitor on any device or network condition, I want the portfolio to load quickly and perform smoothly, so that I can access information without frustration.

#### Acceptance Criteria

1. WHEN a visitor requests the home page THEN the Portfolio System SHALL deliver initial HTML in under 200 milliseconds
2. WHEN any page loads THEN the Portfolio System SHALL render meaningful content within 2 seconds
3. WHEN the Portfolio System loads assets THEN it SHALL optimize all images for web delivery with appropriate compression
4. WHEN the Portfolio System loads THEN it SHALL achieve a Lighthouse performance score above 95
5. WHEN the Portfolio System renders THEN it SHALL avoid cumulative layout shift during content loading
6. WHEN the Portfolio System serves pages THEN it SHALL minimize the number of network requests through bundling and optimization

### Requirement 12

**User Story:** As a visitor using assistive technology, I want the portfolio to be accessible, so that I can navigate and consume content regardless of my abilities.

#### Acceptance Criteria

1. WHEN the Portfolio System renders any page THEN it SHALL use semantic HTML elements for proper structure
2. WHEN the Portfolio System renders any page THEN it SHALL include a skip-to-content link as the first focusable element
3. WHEN the Portfolio System displays interactive elements THEN it SHALL provide appropriate ARIA labels and roles
4. WHEN the Portfolio System displays interactive elements THEN it SHALL ensure minimum touch target size of 44px
5. WHEN the Portfolio System renders text THEN it SHALL maintain color contrast ratios meeting WCAG AA standards
6. WHEN a visitor navigates using keyboard THEN the Portfolio System SHALL provide visible focus indicators
7. WHEN the Portfolio System displays images THEN it SHALL include descriptive alt text for all meaningful images
8. WHEN the Portfolio System renders THEN it SHALL support screen readers with proper heading hierarchy
9. WHEN the Portfolio System renders headings THEN it SHALL not skip heading levels in the hierarchy

### Requirement 13

**User Story:** As a visitor discovering Orlando through search engines, I want the portfolio to be easily discoverable, so that I can find his work and expertise.

#### Acceptance Criteria

1. WHEN search engines crawl the Portfolio System THEN it SHALL provide semantic HTML with proper meta tags
2. WHEN the Portfolio System renders pages THEN it SHALL include descriptive title tags for each page
3. WHEN the Portfolio System renders pages THEN it SHALL include meta descriptions summarizing page content
4. WHEN the Portfolio System serves content THEN it SHALL use proper heading hierarchy for SEO
5. WHEN the Portfolio System generates URLs THEN it SHALL use clean, descriptive paths without unnecessary parameters

### Requirement 14

**User Story:** As Orlando maintaining the portfolio over time, I want the codebase to remain simple and maintainable, so that I can easily update and extend it.

#### Acceptance Criteria

1. WHEN the Portfolio System is structured THEN it SHALL use a clear, logical file organization
2. WHEN components are created THEN the Portfolio System SHALL favor composition over complexity
3. WHEN styling is applied THEN the Portfolio System SHALL use consistent utility classes from Tailwind
4. WHEN content is added THEN the Portfolio System SHALL require only editing markdown files without touching code
5. WHEN the Portfolio System is deployed THEN it SHALL use automated deployment through Vercel with no manual steps

## Appendices

### Appendix A: Directory Structure

The Portfolio System SHALL follow this file organization:

```
/content
  /projects
    project-slug-1.mdx
    project-slug-2.mdx
  /notes
    note-slug-1.mdx
    note-slug-2.mdx

/client
  /app
    page.tsx
    layout.tsx
    /work
      page.tsx
    /notes
      page.tsx
      /[slug]
        page.tsx
    /about
      page.tsx
    /contact
      page.tsx
  /components
    Layout.tsx
    Header.tsx
    PageTitle.tsx
    TextLink.tsx
    ProjectCard.tsx
    NoteCard.tsx
    MDXRenderer.tsx
    Footer.tsx
  /lib
    content.ts
    utils.ts
  /styles
    globals.css

/public
  /images
    /projects
    /profile
```

### Appendix B: MDX Frontmatter Specifications

#### Project Frontmatter

```yaml
---
title: "macOS Agent App"
year: 2025
slug: "macos-agent-app"
description: "A native macOS tool for orchestrating local agents with offline-first design. Built with SwiftUI focusing on performance and minimal UI."
why_it_matters: "Demonstrates ability to build real native products, not just web apps."
tech_stack:
  - Swift
  - SwiftUI
  - SQLite
screenshot: "/images/projects/macos-agent.jpg"
external_link: "https://github.com/orlando/macos-agent"
status: "active"
---
```

#### Note Frontmatter

```yaml
---
title: "AI engineers should chase systems, not syntax"
category: "AI engineering"
insight_line: "Most developers stall because they learn tools, not systems."
excerpt: "Stop memorizing APIs. Learn the underlying constraints that make systems work."
published_at: "2025-12-01"
---
```
