import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import TextLink from '@/app/components/TextLink';
import { generatePageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Orlando Ascanio',
  description:
    'AI Engineer and Product Builder creating intelligent systems that help people learn, think, and operate with clarity.',
  path: '/',
});

export default async function Home() {
  const t = await getTranslations('home');
  const instagramUrl = 'https://www.instagram.com/lilgojer'; 

  return (
    <Layout>
      <PageTitle
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <div className="max-w-content mx-auto"> 
        <div className="mb-8 md:mb-4 md:ml-10 md:float-right w-full md:w-[240px] flex justify-center md:justify-end">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="/selfie.jpeg"
              alt="Photo of Orlando Ascanio"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
              priority
            />
          </a>
        </div>
        {/* TEXT CONTENT */}
        <div className="text-body-lg text-text-primary leading-relaxed">
          <p>
            <strong>{t('intro')}</strong>
            <br /><br />
            {t('paragraph1')}
            <br /><br />
            {t('paragraph2')}
            <br /><br />
            {t('paragraph3')}
            <br /><br />
            {t('paragraph4')}
            <br /><br />
            {t('findMe')}{' '}
            <TextLink href="https://github.com/gojer16">{t('github')}</TextLink> ({t('githubDesc')}), 
            <TextLink href="https://www.linkedin.com/in/orlando-ascanio-dev"> {t('linkedin')}</TextLink> ({t('linkedinDesc')}),
            <TextLink href={instagramUrl}> {t('instagram')}</TextLink> ({t('instagramDesc')}).
          </p>

          <div className="flex gap-6 pt-8">
            <TextLink href="/work">{t('viewWork')}</TextLink>
            <TextLink href="/notes">{t('readNotes')}</TextLink>
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
    </Layout>
  );
}
