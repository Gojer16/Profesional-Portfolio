import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { validateProjectFrontmatter, validateNoteFrontmatter } from './validation';

// TypeScript interfaces for content models
export interface Project {
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

export interface Note {
  title: string;
  category: string;
  insight_line: string;
  excerpt: string;
  content: string;
  published_at: string;
  slug: string;
}



// Helper to get the content directory path
const getContentPath = () => {
  return path.join(process.cwd(), '..', 'content');
};

/**
 * Get all projects from the content directory
 * Reads and parses all MDX files in /content/projects/
 */
export async function getAllProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(getContentPath(), 'projects');
  
  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects: Project[] = [];

  for (const fileName of fileNames) {
    // Only process .mdx and .md files
    if (!fileName.endsWith('.mdx') && !fileName.endsWith('.md')) {
      continue;
    }

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Validate frontmatter
    try {
      validateProjectFrontmatter(data, fileName);
    } catch (error) {
      console.error(`Validation error in ${fileName}:`, error);
      // Skip invalid projects in development, fail in production
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
      continue;
    }

    projects.push({
      title: data.title,
      year: data.year,
      slug: data.slug,
      description: data.description,
      why_it_matters: data.why_it_matters,
      tech_stack: data.tech_stack,
      screenshot: data.screenshot,
      external_link: data.external_link,
      status: data.status,
    });
  }

  return projects;
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(p => p.slug === slug) || null;
}

/**
 * Get all active projects (status === 'active')
 */
export async function getActiveProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(p => p.status === 'active');
}

/**
 * Get all notes from the content directory
 * Reads and parses all MDX files in /content/notes/
 * Sorts by publication date (descending - newest first)
 */
export async function getAllNotes(): Promise<Note[]> {
  const notesDirectory = path.join(getContentPath(), 'notes');
  
  // Check if directory exists
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const notes: Note[] = [];

  for (const fileName of fileNames) {
    // Only process .mdx and .md files
    if (!fileName.endsWith('.mdx') && !fileName.endsWith('.md')) {
      continue;
    }

    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate frontmatter and content
    try {
      validateNoteFrontmatter(data, content.trim(), fileName);
    } catch (error) {
      console.error(`Validation error in ${fileName}:`, error);
      // Skip invalid notes in development, fail in production
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
      continue;
    }

    notes.push({
      title: data.title,
      category: data.category,
      insight_line: data.insight_line,
      excerpt: data.excerpt,
      content: content.trim(),
      published_at: data.published_at,
      slug: data.slug || fileName.replace(/\.mdx?$/, ''),
    });
  }

  // Sort by publication date (descending - newest first)
  notes.sort((a, b) => {
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    return dateB - dateA;
  });

  return notes;
}

/**
 * Get a single note by slug
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
  const notes = await getAllNotes();
  return notes.find(n => n.slug === slug) || null;
}

/**
 * Get notes by category
 */
export async function getNotesByCategory(category: string): Promise<Note[]> {
  const notes = await getAllNotes();
  return notes.filter(n => n.category === category);
}


