import { MetadataRoute } from 'next';
import { getAllNotes } from '@/app/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlandoascanio.com';

/**
 * Generate sitemap for all pages
 * Includes static pages and dynamic note pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic note pages
  const notes = await getAllNotes();
  const notePages = notes.map((note) => ({
    url: `${SITE_URL}/notes/${note.slug}`,
    lastModified: new Date(note.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...notePages];
}
