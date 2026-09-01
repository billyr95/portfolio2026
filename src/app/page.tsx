import { client } from '@/lib/sanity/client';
import { selectedWorkQuery, personalProjectsQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import type { ProjectListItem, SiteSettings } from '@/lib/sanity/types';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const revalidate = 60;

export default async function Home() {
  const [selectedWork, personalProjects, settings] = await Promise.all([
    client.fetch<ProjectListItem[]>(selectedWorkQuery, {}, { next: { tags: ['projects'] } }),
    client.fetch<ProjectListItem[]>(personalProjectsQuery, {}, { next: { tags: ['projects'] } }),
    client.fetch<SiteSettings | null>(siteSettingsQuery, {}, { next: { tags: ['siteSettings'] } }),
  ]);

  return (
    <main className="relative">
      <Hero />
      <Projects projects={selectedWork} />
      <Projects projects={personalProjects} heading="Personal Projects" sectionId="personal-projects" />
      <About settings={settings} />
      <Contact settings={settings} />
      <Footer />
    </main>
  );
}