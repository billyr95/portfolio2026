import { client } from '@/lib/sanity/client';
import { projectsQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import type { ProjectListItem, SiteSettings } from '@/lib/sanity/types';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const revalidate = 60;

export default async function Home() {
  const [projects, settings] = await Promise.all([
    client.fetch<ProjectListItem[]>(projectsQuery, {}, { next: { tags: ['projects'] } }),
    client.fetch<SiteSettings | null>(siteSettingsQuery, {}, { next: { tags: ['siteSettings'] } }),
  ]);

  return (
    <main className="relative">
      <Hero />
      <Projects projects={projects} />
      <About settings={settings} />
      <Contact settings={settings} />
      <Footer />
    </main>
  );
}