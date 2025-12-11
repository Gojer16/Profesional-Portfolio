import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllNotes } from '@/app/lib/content';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import NoteCard from '@/app/components/NoteCard';
import { generatePageMetadata } from '@/app/lib/metadata';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'notes' });
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: `/${locale}/notes`,
    locale,
  });
}

export default async function NotesPage() {
  const t = await getTranslations('notes');
  const allNotes = await getAllNotes();

  // Group by category
  const notesByCategory = allNotes.reduce((acc, note) => {
    acc[note.category] ||= [];
    acc[note.category].push(note);
    return acc;
  }, {} as Record<string, typeof allNotes>);

  const categories = Object.keys(notesByCategory);

  return (
    <Layout>
      <div className="max-w-content mx-auto">
        <PageTitle title={t('title')} />

        {/* Subtitle */}
        <p className="text-body-lg text-text-secondary mt-2 mb-12 max-w-line">
          {t('subtitle')}
        </p>

        {/* No notes fallback */}
        {allNotes.length === 0 ? (
          <p className="text-body text-text-secondary">{t('noNotes')}</p>
        ) : (
          <div className="space-y-20">
            {categories.map((category) => (
              <section key={category}>
                {/* Category Header (Craft / Linear style) */}
                <div className="mb-8">
                  <h2 className="text-h2 text-text-primary font-semibold tracking-tight">
                    {category}
                  </h2>
                  <div className="h-[1px] w-full bg-border-light mt-4" />
                </div>

                {/* Note List (Apple Newsroom style) */}
                <div className="space-y-8">
                  {notesByCategory[category].map((note) => (
                    <NoteCard
                      key={note.slug}
                      title={note.title}
                      category={note.category}
                      insightLine={note.insight_line}
                      excerpt={note.excerpt}
                      slug={note.slug}
                      publishedAt={note.published_at}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
