import Image from "next/image";
import TextLink from "./TextLink";

interface ProjectCardProps {
  title: string;
  year: number;
  description: string;
  whyItMatters: string;
  techStack?: string[];
  screenshot: string;
  externalLink?: string;
}

export default function ProjectCard({
  title,
  year,
  description,
  whyItMatters,
  techStack,
  screenshot,
  externalLink,
}: ProjectCardProps) {
  return (
    <article className="group">
      <div
        className="
          bg-card-bg
          rounded-xl
          overflow-hidden
          shadow-[var(--shadow-soft)]
          transition-all duration-200 ease-out
          group-hover:shadow-[var(--shadow-hover)]
          group-hover:-translate-y-[1px]
          flex flex-col md:flex-row
          gap-6 md:gap-8
          p-6
        "
      >
        {/* Screenshot */}
        <div className="shrink-0 w-full md:w-64">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md">
            <Image
              src={screenshot}
              alt={`Screenshot of ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Title + Year */}
          <h3 className="text-h3 text-text-primary">
            {title}{" "}
            <span className="text-text-secondary font-normal">({year})</span>
          </h3>

          {/* Description */}
          <p className="text-body text-text-primary leading-relaxed">
            {description}
          </p>

          {/* Why it matters */}
          <div className="space-y-2">
            <h4 className="text-body font-semibold text-text-primary/90">
              Why it matters
            </h4>
            <p className="text-body text-text-secondary leading-relaxed">
              {whyItMatters}
            </p>
          </div>

          {/* Tech Stack */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1
                    text-body-sm
                    bg-primary-light/70
                    text-primary
                    rounded-md
                    font-medium
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* External Link */}
          {externalLink && (
            <div className="mt-2">
              <TextLink href={externalLink} external>
                View project
              </TextLink>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
