import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import TextLink from '@/app/components/TextLink';
import { generatePageMetadata } from '@/app/lib/metadata';
import { Mail, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

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

      <div className="max-w-content mx-auto mt-6 space-y-12">
        {/* Intro */}
        <p className="text-body text-text-secondary leading-relaxed">
          {t('callToActionTitle')}
        </p>
        <p className="text-body-sm text-text-secondary mt-1">
        {t('callToActionSubtitle')}
        </p>

        {/* Call to Action */}
        <div className="rounded-xl border border-border bg-bg-elevated p-6">
          <p className="text-body font-medium text-text-primary">
            {t('intro')}
            </p>

<p className="text-body-sm text-text-secondary mt-1">
  {t('callToActionSubtitle')}
</p>
        </div>

        {/* Main Contact Card */}
        <div className="rounded-xl border border-border bg-bg-elevated p-6 space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-primary mt-0.5" />
            <div>
              <p className="text-body-sm text-text-secondary mb-0.5">
                {t('email')}
              </p>
              <TextLink href="mailto:operation927@gmail.com" external>
                operation927@gmail.com
              </TextLink>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Github className="size-5 text-primary mt-0.5" />
            <div>
              <p className="text-body-sm text-text-secondary mb-0.5">
                {t('github')}
              </p>
              <TextLink href="https://github.com/gojer16" external>
                github.com/gojer16
              </TextLink>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Linkedin className="size-5 text-primary mt-0.5" />
            <div>
              <p className="text-body-sm text-text-secondary mb-0.5">
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

        {/* Follow Me Card */}
        <div className="rounded-xl border border-border bg-bg-elevated p-6 space-y-6">
          <p className="text-body font-medium text-text-primary">
            {t('followTitle')}
          </p>

          <div className="flex items-start gap-3">
            <Instagram className="size-5 text-primary mt-0.5" />
            <div>
              <p className="text-body-sm text-text-secondary mb-0.5">
                Instagram
              </p>
              <TextLink href="https://Instagram.com/lilgojer" external>
                Instagram.com/lilgojer
              </TextLink>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Twitter className="size-5 text-primary mt-0.5" />
            <div>
              <p className="text-body-sm text-text-secondary mb-0.5">X</p>
              <TextLink href="https://x.com/Gojer27" external>
                x.com/Gojer27
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
