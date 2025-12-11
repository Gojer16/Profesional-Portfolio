'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { DEFAULT_METADATA } from '@/app/lib/metadata';
import { Note } from '@/app/lib/content';

type Organization = {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
};

type WebSite = {
  '@type': 'WebSite';
  name: string;
  url:string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
};

type Article = {
  '@type': 'Article';
  headline: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: Organization;
  datePublished: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
};

const organization: Organization = {
  '@type': 'Organization',
  name: DEFAULT_METADATA.siteName,
  url: DEFAULT_METADATA.siteUrl,
  logo: `${DEFAULT_METADATA.siteUrl}/Logo.jpg`,
  sameAs: [
    'https://twitter.com/orlandoscanio',
    'https://github.com/orlando-ascanio',
    'https://www.linkedin.com/in/orlandoascanio/',
  ],
};

const website: WebSite = {
  '@type': 'WebSite',
  name: DEFAULT_METADATA.siteName,
  url: DEFAULT_METADATA.siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${DEFAULT_METADATA.siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

type SchemaMarkupProps = {
  note?: Note;
};

export function SchemaMarkup({ note }: SchemaMarkupProps) {
  const pathname = usePathname();
  const canonicalUrl = `${DEFAULT_METADATA.siteUrl}${pathname}`;

  const graph: (Organization | WebSite | Article)[] = [
    organization,
    website,
  ];

  if (note) {
    const articleSchema: Article = {
      '@type': 'Article',
      headline: note.title,
      author: {
        '@type': 'Person',
        name: 'Orlando Ascanio', // Assuming author is always Orlando Ascanio
      },
      publisher: organization,
      datePublished: note.published_at,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    };
    graph.push(articleSchema);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
