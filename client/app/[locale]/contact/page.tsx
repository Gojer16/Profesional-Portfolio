import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import TextLink from '@/app/components/TextLink';
import { generatePageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Orlando Ascanio. Connect via email, GitHub, or LinkedIn for opportunities and collaboration.',
  path: '/contact',
});

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <Layout>
      <PageTitle title={t('title')} />

      <div className="max-w-content mx-auto mt-6">
        <p className="text-body text-text-secondary leading-relaxed">
          {t('intro')}
        </p>

        <div className="mt-12 p-6 rounded-xl border border-border bg-bg-elevated space-y-6">
          <div>
            <p className="text-body-sm text-text-secondary mb-1">
              {t('email')}
            </p>
            <TextLink href="mailto:orlando@example.com" external>
              orlando@example.com
            </TextLink>
          </div>

          <div>
            <p className="text-body-sm text-text-secondary mb-1">
              {t('github')}
            </p>
            <TextLink href="https://github.com/gojer16" external>
              github.com/gojer16
            </TextLink>
          </div>

          <div>
            <p className="text-body-sm text-text-secondary mb-1">
              {t('linkedin')}
            </p>
            <TextLink
              href="https://www.linkedin.com/in/orlando-ascanio-dev"
              external
            >
              linkedin.com/in/orlando-ascanio-dev
            </TextLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}
