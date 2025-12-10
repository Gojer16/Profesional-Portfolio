import fs from 'fs';
import path from 'path';
import type { Project, Note } from './content';

// Valid note categories
const VALID_CATEGORIES = [
  'AI engineering',
  'Systems design',
  'Product thinking',
  'Psychology & self-awareness',
  'Skill acquisition',
  'Founder mindset',
  'Mindset',
  'Performance'
] as const;

/**
 * Check if a URL is valid
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a date string is valid ISO 8601 format
 */
function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

/**
 * Count sentences in text
 * Splits on periods, exclamation marks, and question marks
 */
function countSentences(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences.length;
}

/**
 * Validate project frontmatter
 * Throws an error if validation fails
 */
export function validateProjectFrontmatter(
  frontmatter: any,
  filepath: string
): void {
  // Title validation
  if (!frontmatter.title || frontmatter.title.length === 0) {
    throw new Error(`${filepath}: title is required`);
  }
  if (frontmatter.title.length > 100) {
    throw new Error(`${filepath}: title must be ≤100 chars (found ${frontmatter.title.length})`);
  }

  // Year validation
  if (typeof frontmatter.year !== 'number') {
    throw new Error(`${filepath}: year must be a number`);
  }
  if (frontmatter.year < 2000 || frontmatter.year > 2100) {
    throw new Error(`${filepath}: year must be 2000-2100 (found ${frontmatter.year})`);
  }

  // Slug validation
  if (!frontmatter.slug || frontmatter.slug.length === 0) {
    throw new Error(`${filepath}: slug is required`);
  }
  if (!/^[a-z0-9-]+$/.test(frontmatter.slug)) {
    throw new Error(`${filepath}: slug must be lowercase with hyphens only (found "${frontmatter.slug}")`);
  }

  // Description validation
  if (!frontmatter.description || frontmatter.description.length === 0) {
    throw new Error(`${filepath}: description is required`);
  }
  if (frontmatter.description.length > 300) {
    throw new Error(`${filepath}: description must be ≤300 chars (found ${frontmatter.description.length})`);
  }

  // Why it matters validation
  if (!frontmatter.why_it_matters || frontmatter.why_it_matters.length === 0) {
    throw new Error(`${filepath}: why_it_matters is required`);
  }

  // Screenshot validation
  if (!frontmatter.screenshot || frontmatter.screenshot.length === 0) {
    throw new Error(`${filepath}: screenshot is required`);
  }
  
  // Check if screenshot file exists
  const screenshotPath = path.join(process.cwd(), 'public', frontmatter.screenshot);
  if (!fs.existsSync(screenshotPath)) {
    throw new Error(`${filepath}: screenshot file not found at ${frontmatter.screenshot}`);
  }

  // Status validation
  if (!['active', 'archive'].includes(frontmatter.status)) {
    throw new Error(`${filepath}: status must be 'active' or 'archive' (found "${frontmatter.status}")`);
  }

  // Tech stack validation (optional)
  if (frontmatter.tech_stack !== undefined && !Array.isArray(frontmatter.tech_stack)) {
    throw new Error(`${filepath}: tech_stack must be an array`);
  }

  // External link validation (optional)
  if (frontmatter.external_link && !isValidUrl(frontmatter.external_link)) {
    throw new Error(`${filepath}: external_link must be a valid URL (found "${frontmatter.external_link}")`);
  }
}

/**
 * Validate note frontmatter and content
 * Throws an error if validation fails
 */
export function validateNoteFrontmatter(
  frontmatter: any,
  content: string,
  filepath: string
): void {
  // Title validation
  if (!frontmatter.title || frontmatter.title.length === 0) {
    throw new Error(`${filepath}: title is required`);
  }
  if (frontmatter.title.length > 150) {
    throw new Error(`${filepath}: title must be ≤150 chars (found ${frontmatter.title.length})`);
  }

  // Category validation
  if (!VALID_CATEGORIES.includes(frontmatter.category)) {
    throw new Error(
      `${filepath}: category must be one of ${VALID_CATEGORIES.join(', ')} (found "${frontmatter.category}")`
    );
  }

  // Insight line validation
  if (!frontmatter.insight_line || frontmatter.insight_line.length === 0) {
    throw new Error(`${filepath}: insight_line is required`);
  }
  if (frontmatter.insight_line.length > 200) {
    throw new Error(`${filepath}: insight_line must be ≤200 chars (found ${frontmatter.insight_line.length})`);
  }

  // Excerpt validation
  if (!frontmatter.excerpt || frontmatter.excerpt.length === 0) {
    throw new Error(`${filepath}: excerpt is required`);
  }
  if (frontmatter.excerpt.length > 300) {
    throw new Error(`${filepath}: excerpt must be ≤300 chars (found ${frontmatter.excerpt.length})`);
  }

  // Published date validation
  if (!frontmatter.published_at) {
    throw new Error(`${filepath}: published_at is required`);
  }
  if (!isValidISODate(frontmatter.published_at)) {
    throw new Error(`${filepath}: published_at must be valid ISO 8601 date (YYYY-MM-DD) (found "${frontmatter.published_at}")`);
  }
}

/**
 * Validate slug uniqueness across all content
 * Throws an error if duplicate slugs are found
 */
export function validateSlugUniqueness(projects: Project[], notes: Note[]): void {
  const projectSlugs = projects.map(p => p.slug);
  const noteSlugs = notes.map(n => n.slug);

  // Check for duplicate project slugs
  const duplicateProjectSlugs = projectSlugs.filter(
    (slug, index) => projectSlugs.indexOf(slug) !== index
  );
  if (duplicateProjectSlugs.length > 0) {
    throw new Error(`Duplicate project slugs found: ${duplicateProjectSlugs.join(', ')}`);
  }

  // Check for duplicate note slugs
  const duplicateNoteSlugs = noteSlugs.filter(
    (slug, index) => noteSlugs.indexOf(slug) !== index
  );
  if (duplicateNoteSlugs.length > 0) {
    throw new Error(`Duplicate note slugs found: ${duplicateNoteSlugs.join(', ')}`);
  }
}

/**
 * Validate all content at build time
 * This should be called during the build process
 */
export async function validateAllContent(): Promise<void> {
  const { getAllProjects, getAllNotes } = await import('./content');
  
  try {
    const projects = await getAllProjects();
    const notes = await getAllNotes();

    // Validate slug uniqueness
    validateSlugUniqueness(projects, notes);

    console.log('✓ Content validation passed');
    console.log(`  - ${projects.length} projects validated`);
    console.log(`  - ${notes.length} notes validated`);
  } catch (error) {
    console.error('✗ Content validation failed:');
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
