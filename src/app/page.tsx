import { client } from '@/lib/sanity/client';
import { projectsQuery } from '@/lib/sanity/queries';
import type { ProjectListItem } from '@/lib/sanity/types';
import Hero from './components/Hero';
import Projects from './components/Projects';

// Revalidate every 60 seconds (ISR) — change to 0 for fully static
export const revalidate = 60;

export default async function Home() {
  const projects = await client.fetch<ProjectListItem[]>(
    projectsQuery,
    {},
    // Cache tag so on-demand revalidation works via the Sanity webhook
    { next: { tags: ['projects'] } }
  );

  return (
    <main className="relative">
      <Hero />
      <Projects projects={projects} />
    </main>
  );
}