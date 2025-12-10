import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNoteBySlug, getAllNotes } from '@/app/lib/content';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import MDXRenderer from '@/app/components/MDXRenderer';
import { generatePageMetadata } from '@/app/lib/metadata';

interface NotePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return generatePageMetadata({
      title: 'Note Not Found',
      description: 'The requested note could not be found.',
      path: `/notes/${slug}`,
    });
  }

  return generatePageMetadata({
    title: note.title,
    description: note.insight_line,
    path: `/notes/${slug}`,
  });
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const formattedDate = new Date(note.published_at + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <article className="max-w-content mx-auto pt-4">
        {/* Title */}
        <PageTitle title={note.title} />

      {/* Meta info */}
      <div className="flex items-center gap-4 mt-4 mb-10">
        <span
          className="
            inline-flex items-center
            px-3 py-1
            text-body-sm font-medium
            bg-primary-light text-primary
            rounded-lg
          "
        >
          {note.category}
        </span>

        <span className="text-body-sm text-text-secondary">
          {formattedDate}
        </span>
      </div>

      {/* Insight line */}
      <p
        className="
          text-body-lg
          text-text-primary
          font-medium
          leading-relaxed
          mb-12
          max-w-line
        "
      >
        {note.insight_line}
      </p>

      {/* Divider (Craft style) */}
      <div className="h-px w-full bg-border-light mb-10" />

      {/* MDX content */}
      <div className="prose prose-lg max-w-line text-text-primary">
        <MDXRenderer content={note.content} />
      </div>
      </article>
    </Layout>
  );
}

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({ slug: note.slug }));
}
