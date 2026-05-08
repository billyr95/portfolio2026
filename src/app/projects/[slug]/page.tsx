import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import {
  projectBySlugQuery,
  projectSlugsQuery,
  nextProjectQuery,
  firstProjectQuery,
} from '@/lib/sanity/queries';
import type { ProjectDetail, NextProject } from '@/lib/sanity/types';
import ProjectContent from './ProjectContent';

export const revalidate = 60;

// ── Static params ──────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

// ── Meta ───────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await client.fetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:${slug}`] } }
  );
  if (!project) return {};
  return {
    title: `${project.title} — Billy Riley`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:${slug}`] } }
  );

  if (!project) notFound();

  // Find the next project (by order field), wrap to first if none
  const allSlugs = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
  const currentIndex = allSlugs.findIndex((s) => s.slug === slug);
  const nextSlugObj = allSlugs[(currentIndex + 1) % allSlugs.length];

  let nextProject: NextProject | null = null;
  if (nextSlugObj) {
    nextProject = await client.fetch<NextProject | null>(
      projectBySlugQuery,
      { slug: nextSlugObj.slug },
      { next: { tags: [`project:${nextSlugObj.slug}`] } }
    );
  }

  // Absolute fallback — first project
  if (!nextProject) {
    nextProject = await client.fetch<NextProject | null>(firstProjectQuery);
  }

  return (
    <ProjectContent
      project={project}
      nextSlug={nextProject?.slug ?? ''}
      nextProject={nextProject ?? { title: 'Home', slug: '' }}
    />
  );
}