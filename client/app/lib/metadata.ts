import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlandoascanio.com';
const SITE_NAME = 'Orlando Ascanio';
const SITE_DESCRIPTION = 'AI engineer and product builder focused on designing AI-powered tools that help people learn, think, and move with clarity.';
const OG_IMAGE_URL = `${SITE_URL}/Banner.jpg`;
const TWITTER_HANDLE = '@orlandoscanio';


interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  locale?: string;
}

/**
 * Generate consistent metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = OG_IMAGE_URL,
  locale = 'en',
}: PageMetadataOptions): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  const localeMap: { [key: string]: string } = {
    en: 'en_US',
    es: 'es_ES',
    de: 'de_DE',
    fr: 'fr_FR',
    it: 'it_IT',
    pt: 'pt_PT',
    ru: 'ru_RU',
    pl: 'pl_PL',
  };

  const ogLocale = localeMap[locale] || 'en_US';

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
      locale: ogLocale,
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
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
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
