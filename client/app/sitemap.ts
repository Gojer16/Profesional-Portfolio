import { MetadataRoute } from 'next';
import { getAllNotes } from '@/app/lib/content';
import { locales } from '@/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlandoascanio.com';

/**
 * Generate sitemap for all pages
 * Includes static pages and dynamic note pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/${locale}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/${locale}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  // Dynamic note pages
  const notes = await getAllNotes();
  const notePages = locales.flatMap((locale) =>
    notes.map((note) => ({
      url: `${SITE_URL}/${locale}/notes/${note.slug}`,
      lastModified: new Date(note.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...notePages];
}
