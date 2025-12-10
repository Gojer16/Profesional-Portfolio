# Implementation Plan

- [x] 1. Set up project foundation and design system
  - Initialize Next.js 14+ project with TypeScript and App Router in `/client` directory
  - Configure Tailwind CSS with custom design tokens from design document
  - Create `/client/styles/tokens.css` with CSS variables for colors, spacing, and typography
  - Set up font loading for Inter, Inter Tight, and JetBrains Mono
  - Configure global styles with text rendering optimizations and reduced motion support
  - _Requirements: 0, Technical Stack_

- [x] 2. Create core layout components
- [x] 2.1 Implement Layout component
  - Create Layout component that wraps all pages with consistent structure
  - Apply max-width content constraint (780px) and horizontal centering
  - Include Header and Footer components
  - Apply vertical spacing system
  - _Requirements: 0.1.1, Design System_

- [x] 2.2 Implement Header and Navigation
  - Create Header component with sticky positioning (56-64px height)
  - Implement Navigation with links to Work, Notes, About, Contact
  - Add active state indication using primary purple color
  - Apply 24-32px spacing between navigation items
  - Ensure 44px minimum touch targets for accessibility
  - Add subtle opacity hover states
  - Maintain persistent visibility on mobile (no hamburger menu)
  - _Requirements: 6.1, 6.3, 6.4, 6.8, 6.9, 6.10, 6.11_

- [x] 2.3 Implement Footer component
  - Create minimal Footer with copyright information
  - Apply consistent spacing from content
  - _Requirements: 0.1.8_

- [x] 2.4 Implement PageTitle component
  - Create PageTitle component for H1 headings
  - Apply typography scale (40-48px, weight 600-700, line-height 1.2)
  - Add optional subtitle support with secondary text color
  - Apply consistent spacing below (mt-6)
  - _Requirements: 0.1.3, Typography Scale_

- [x] 2.5 Implement TextLink component
  - Create TextLink component with purple accent color
  - Add subtle opacity hover transition (0.15s ease-out)
  - Support external link indicator
  - Include proper accessibility attributes (aria-label, target, rel)
  - Apply focus-visible outline styles
  - _Requirements: 0.1.4, Interaction Model_

- [ ]* 2.6 Write unit tests for layout components
  - Test Layout renders children with proper structure
  - Test Header highlights active navigation item
  - Test Navigation maintains all required links
  - Test TextLink applies correct styles and attributes
  - Test responsive behavior at mobile breakpoint
  - _Requirements: All Requirement 2 items_

- [x] 3. Implement content management system
- [x] 3.1 Create content loading utilities
  - Create `/client/lib/content.ts` with TypeScript interfaces for Project and Note
  - Implement `getAllProjects()` to read and parse project MDX files
  - Implement `getAllNotes()` to read and parse note MDX files
  - Implement `getNoteBySlug()` for individual note retrieval
  - Sort notes by publication date (descending)
  - Filter projects by status (active/archive)
  - _Requirements: 9.2, 9.4, 9.7, Property 21_

- [x] 3.2 Implement content validation
  - Create validation functions for project frontmatter
  - Create validation functions for note frontmatter
  - Validate required fields, character limits, and data types
  - Check screenshot file existence
  - Validate category against whitelist
  - Validate note content length (3-7 sentences)
  - Check slug uniqueness across all content
  - Fail build with clear error messages on validation failure
  - _Requirements: 9.1, Property 18, Property 28_

- [x] 3.3 Set up MDX processing
  - Configure MDX support in Next.js
  - Create MDXRenderer component with typography styling
  - Apply design system styles to markdown elements (h2, h3, p, ul, ol, code)
  - Ensure line length constraint (65ch max-width)
  - Support syntax highlighting for code blocks
  - _Requirements: 3.7, 9.3, Property 7, Property 23_

- [ ]* 3.4 Write unit tests for content utilities
  - Test getAllProjects returns valid project data
  - Test getAllNotes returns notes sorted by date
  - Test content validation catches missing required fields
  - Test content validation catches invalid data types
  - Test slug uniqueness validation
  - Test note sentence count validation
  - _Requirements: All Requirement 3 items_

- [x] 4. Build home page
- [x] 4.1 Create home page component
  - Create `/client/app/page.tsx` for home page
  - Display header "Orlando Ascanio" with subtitle "AI Engineer • Product Builder • Founder in Training"
  - Render identity block with exact four-line text from requirements
  - Add call-to-action text links "Explore my work" and "Read my notes"
  - Apply text-first design with no gradients or animations
  - Center or left-align header in Apple style
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7_

- [ ]* 4.2 Write unit tests for home page
  - Test home page renders required header text
  - Test identity block contains correct content
  - Test call-to-action links are present and functional
  - Test navigation links are displayed
  - _Requirements: All Requirement 1 items_

- [x] 5. Build work page and project display
- [x] 5.1 Create ProjectCard component
  - Create ProjectCard component with all required fields
  - Display screenshot with 3:2 or square aspect ratio using Next.js Image
  - Show title with year in parentheses
  - Render three-line description
  - Display "Why it matters" section
  - Show tech stack as styled tags (if provided)
  - Add clickable link to external resource (if available)
  - Apply vertical stacking layout on mobile (<640px)
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 7.6, Property 1_

- [x] 5.2 Create work page
  - Create `/client/app/work/page.tsx`
  - Display intro text "I make tools, prototypes, and systems. These are the things I've built or am building."
  - Load all projects using content utilities
  - Filter to show maximum 6 active projects
  - Render ProjectCard for each project
  - Apply proper spacing between cards (space-y-8)
  - _Requirements: 2.1, 2.7, 2.8, Property 3_

- [ ]* 5.3 Write property test for project card completeness
  - **Property 1: Project Card Completeness**
  - Generate random project data with all required fields
  - Render ProjectCard and verify all elements are present
  - Test with and without optional fields (tech_stack, external_link)
  - Verify screenshot has correct aspect ratio
  - **Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6**

- [ ]* 5.4 Write property test for active project limit
  - **Property 3: Active Project Limit**
  - Generate random number of projects (including >6 active)
  - Verify work page displays at most 6 active projects
  - Verify archived projects are not displayed
  - **Validates: Requirements 2.7**

- [ ]* 5.5 Write unit tests for work page
  - Test work page renders intro text
  - Test ProjectCard displays all required elements
  - Test external link appears when provided
  - Test tech stack tags render correctly
  - Test mobile responsive layout
  - _Requirements: All Requirement 2 items_

- [x] 6. Build notes page and note display
- [x] 6.1 Create NoteCard component
  - Create NoteCard component for list view
  - Display title as link to full note
  - Show category badge with styling
  - Display insight line prominently
  - Show excerpt text
  - Display publication date
  - Add hover state for entire card
  - Apply single-column layout on mobile
  - _Requirements: 3.3, 3.4, 3.5, 7.7, Property 5_

- [x] 6.2 Create notes list page
  - Create `/client/app/notes/page.tsx`
  - Load all notes using content utilities
  - Group notes by category
  - Display category headings
  - Render NoteCard for each note
  - Apply proper spacing between cards and sections
  - _Requirements: 3.1, 3.2, Property 4, Property 21_

- [x] 6.3 Create individual note page
  - Create `/client/app/notes/[slug]/page.tsx`
  - Load note by slug using content utilities
  - Display note title, category, and publication date
  - Render MDX content with MDXRenderer
  - Apply line length constraint (65ch)
  - Return 404 for invalid slugs
  - _Requirements: 3.6, 3.7, 7.8, Property 22_

- [ ]* 6.4 Write property test for note completeness
  - **Property 5 (Consolidated): Note Completeness and Length**
  - Generate random note data with all required fields
  - Verify note has valid category from whitelist
  - Verify content is between 3-7 sentences
  - Render NoteCard and verify all elements present
  - **Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.6**

- [ ]* 6.5 Write property test for note categorization
  - **Property 4: Note Categorization**
  - Generate random notes with various categories
  - Verify each note's category is in valid set
  - Verify invalid categories are rejected during validation
  - **Validates: Requirements 3.2**

- [ ]* 6.6 Write property test for markdown rendering
  - **Property 7: Markdown Rendering**
  - Generate note content with various markdown elements (bold, italic, links, code)
  - Render with MDXRenderer
  - Verify all markdown elements are correctly formatted in output
  - **Validates: Requirements 3.7**

- [ ]* 6.7 Write property test for notes sorting
  - **Property 21: Notes Sorted by Publication Date**
  - Generate random notes with various publication dates
  - Load notes using getAllNotes()
  - Verify notes are in descending chronological order
  - **Validates: Content organization**

- [ ]* 6.8 Write unit tests for notes pages
  - Test notes list page groups by category
  - Test NoteCard displays all required elements
  - Test individual note page renders content
  - Test 404 handling for invalid slugs
  - Test mobile responsive layout
  - _Requirements: All Requirement 3 items_

- [x] 7. Build about page
- [x] 7.1 Create about page
  - Create `/client/app/about/page.tsx`
  - Display bio section with exact text from requirements
  - Render principles section as formatted list
  - Display vision section with exact text from requirements
  - Apply proper typography hierarchy and spacing
  - Avoid showcasing achievements unless relevant
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ]* 7.2 Write unit tests for about page
  - Test about page renders bio section
  - Test principles list displays all items
  - Test vision section is present
  - Test proper typography hierarchy
  - _Requirements: All Requirement 4 items_

- [x] 8. Build contact page
- [x] 8.1 Create contact page
  - Create `/client/app/contact/page.tsx`
  - Display email address as mailto link
  - Provide link to GitHub profile
  - Optionally provide link to LinkedIn profile
  - Display only essential contact methods (no forms or widgets)
  - Apply simple, clean formatting with zero noise
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
- [ ] 11. Implement accessibility features3 without H2

- [x] 11.3 Add skip-to-content link
  - Add skip-to-content link as first focusable element
  - Style to be visible only on focus
  - Link to main content area
  - _Requirements: 12.2_

- [x] 11.4 Ensure color contrast compliance
  - Verify all text meets WCAG AA contrast ratios
  - Test primary text (#1A1A1A) on background (#F7F7F9)
  - Test secondary text (#595959) on background
  - Test purple accent (#6A4CFF) on background
  - _Requirements: 12.5_

- [x] 13. Add SEO and metadata
- [x] 13.1 Implement page metadata
  - Add descriptive title tags for each page
  - Add meta descriptions for each page
  - Configure Open Graph tags for social sharing
  - Add canonical URLs
  - _Requirements: 13.2, 13.3_

- [x] 13.2 Create sitemap and robots.txt
  - Generate sitemap.xml with all pages
  - Create robots.txt allowing all crawlers
  - _Requirements: 13.1_

- [-] 14. Create sample content
- [x] 14.1 Create sample project entries
  - Create 3-4 sample project MDX files in `/content/projects/`
  - Include all required frontmatter fields
  - Add placeholder screenshots
  - Ensure content passes validation
  - _Requirements: 9.2, Property 18_

- [x] 14.2 Create sample note entries
  - Create 5-6 sample note MDX files in `/content/notes/`
  - Cover different categories
  - Include all required frontmatter fields
  - Ensure content is 3-7 sentences
  - Ensure content passes validation
  - _Requirements: 9.4, Property 5_

- [ ] 17. Final polish and launch
- [ ] 17.1 Add custom 404 page
  - Create `/client/app/not-found.tsx`
  - Display friendly 404 message
  - Include navigation back to home
  - _Requirements: Navigation Errors_

- [ ] 17.2 Final content review
  - Replace sample content with real projects
  - Write initial set of real notes
  - Add professional photo for home page (if applicable)
  - Verify all links work
  - _Requirements: 1.2, 2.8_

