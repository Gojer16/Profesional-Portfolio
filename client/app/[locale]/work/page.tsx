import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllProjects } from '@/app/lib/content';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import ProjectCard from '@/app/components/ProjectCard';
import { generatePageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Work',
  description:
    'Tools, prototypes, and systems built by Orlando Ascanio. Explore AI engineering projects, macOS applications, and open source contributions.',
  path: '/work',
});

export default async function WorkPage() {
  const t = await getTranslations('work');
  const allProjects = await getAllProjects();

  // Only display ≤6 active projects
  const activeProjects = allProjects
    .filter((project) => project.status === 'active')
    .slice(0, 6);

  return (
    <Layout>
      <div className="max-w-content mx-auto pt-4">
        {/* Title */}
        <PageTitle title={t('title')} />

        {/* Intro */}
        <p className="text-body-lg text-text-primary max-w-line leading-relaxed mt-4 mb-14">
          {t('intro')}
        </p>

        {/* Projects list */}
        {activeProjects.length > 0 ? (
          <div className="space-y-10">
            {activeProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                year={project.year}
                description={project.description}
                whyItMatters={project.why_it_matters}
                techStack={project.tech_stack}
                screenshot={project.screenshot}
                externalLink={project.external_link}
              />
            ))}
          </div>
        ) : (
          <p className="text-body text-text-secondary">
            {t('noProjects')}
          </p>
        )}
      </div>
    </Layout>
  );
}
