import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlandoascanio.com';
const SITE_NAME = 'Orlando Ascanio';
const SITE_DESCRIPTION = 'AI engineer and product builder focused on designing AI-powered tools that help people learn, think, and move with clarity.';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

/**
 * Generate consistent metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.jpg',
}: PageMetadataOptions): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export const DEFAULT_METADATA = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  description: SITE_DESCRIPTION,
};
