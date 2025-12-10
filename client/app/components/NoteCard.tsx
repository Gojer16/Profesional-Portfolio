import Link from "next/link";

interface NoteCardProps {
  title: string;
  category: string;
  insightLine: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
}

export default function NoteCard({
  title,
  category,
  insightLine,
  excerpt,
  slug,
  publishedAt,
}: NoteCardProps) {
  const formattedDate = new Date(publishedAt + 'T00:00:00').toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group">
      <Link
        href={`/notes/${slug}`}
        aria-label={`Read note: ${title}`}
        className="block"
      >
        <div
          className="
            bg-card-bg
            rounded-xl
            p-6
            shadow-[var(--shadow-soft)]
            transition-all duration-200 ease-out
            group-hover:shadow-[var(--shadow-hover)]
            group-hover:-translate-y-[1px]
            space-y-4
          "
        >
          {/* Category */}
          <span
            className="
              inline-block
              px-3 py-1
              text-body-sm
              bg-primary-light/70
              text-primary
              rounded-md
              font-medium
            "
          >
            {category}
          </span>

          {/* Title */}
          <h3
            className="
              text-h3
              text-text-primary
              transition-colors duration-150
              group-hover:text-primary
            "
          >
            {title}
          </h3>

          {/* Insight line */}
          <p className="text-body-lg text-primary font-medium leading-relaxed">
            {insightLine}
          </p>

          {/* Excerpt */}
          <p className="text-body text-text-secondary leading-relaxed">
            {excerpt}
          </p>

          {/* Date */}
          <p className="text-body-sm text-text-secondary">{formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}
