import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import { generatePageMetadata } from '@/app/lib/metadata';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return generatePageMetadata({
    title: t('title'),
    description: t('intro'),
    path: `/${locale}/about`,
    locale,
  });
}

export default async function AboutPage() {
  const t = await getTranslations('about');
  const principles = [
    t('principlesList.0'),
    t('principlesList.1'),
    t('principlesList.2'),
    t('principlesList.3'),
    t('principlesList.4'),
    t('principlesList.5'),
    t('principlesList.6'),
    t('principlesList.7'),
  ];

  const whatImDoingList = [
    t('whatImDoingList.0'),
    t('whatImDoingList.1'),
    t('whatImDoingList.2'),
  ];

  return (
 <Layout>
  <PageTitle title={t('title')} subtitle={t('subtitle')} />

  <div className="max-w-content mx-auto mt-6">

    <p className="text-body text-text-secondary">
      {t('intro')}
    </p>

    <div className="space-y-20 mt-12">

      {/* Section: About Me */}
      <section className="space-y-4">
        <h2 className="text-h3 font-display text-text-primary">
          {t('AboutMe')}
        </h2>
        <div className="space-y-3 text-body text-text-primary leading-relaxed">
          <p>{t('AboutMeText1')}</p>
          <p>{t('AboutMeText2')}</p>
        </div>
      </section>

      <div className="h-[1px] bg-border" />

      {/* Section: Principles */}
      <section className="space-y-4">
        <h2 className="text-h3 font-display text-text-primary">
          {t('principles')}
        </h2>
        <ul className="space-y-2">
          {principles.map((p, i) => (
            <li key={i} className="text-body text-text-primary pl-5 relative">
              <span className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-primary rounded-full"></span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <div className="h-[1px] bg-border" />

      {/* Section: Vision */}
      <section className="space-y-4">
        <h2 className="text-h3 font-display text-text-primary">
          {t('vision')}
        </h2>
        <p className="text-body text-text-primary leading-relaxed">
          {t('visionText')}
        </p>
      </section>

      <div className="h-[1px] bg-border" />

      {/* Section: What I'm Doing Now */}
      <section className="space-y-4">
        <h2 className="text-h3 font-display text-text-primary">
          {t('whatImDoing')}
        </h2>
        <ul className="space-y-2">
          {whatImDoingList.map((item, i) => (
            <li key={i} className="text-body text-text-primary pl-5 relative">
              <span className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-primary rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </section>

    </div>
  </div>
</Layout>
  );
}
