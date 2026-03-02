'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

// Placeholder project data - replace with your actual projects
const projects = [
  {
    id: 1,
    slug: 'project-one',
    title: 'Project One',
    description: 'Brief description of the project and your role.',
    year: '2024',
    tags: ['Next.js', 'Design System'],
    thumbnail: '/projects/placeholder-1.jpg',
  },
  {
    id: 2,
    slug: 'project-two',
    title: 'Project Two',
    description: 'Brief description of the project and your role.',
    year: '2024',
    tags: ['React', 'GSAP'],
    thumbnail: '/projects/placeholder-2.jpg',
  },
  {
    id: 3,
    slug: 'project-three',
    title: 'Project Three',
    description: 'Brief description of the project and your role.',
    year: '2023',
    tags: ['Sanity', 'Tailwind'],
    thumbnail: '/projects/placeholder-3.jpg',
  },
  {
    id: 4,
    slug: 'project-four',
    title: 'Project Four',
    description: 'Brief description of the project and your role.',
    year: '2022',
    tags: ['TypeScript', 'Figma'],
    thumbnail: '/projects/placeholder-4.jpg',
  },
  {
    id: 5,
    slug: 'project-five',
    title: 'Project Five',
    description: 'Brief description of the project and your role.',
    year: '2021',
    tags: ['UI/UX', 'Prototyping'],
    thumbnail: '/projects/placeholder-5.jpg',
  },
];

export default function Projects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const handleCardClick = (slug: string) => {
    // Simple fade out the whole section, then navigate
    gsap.to(sectionRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        router.push(`/projects/${slug}`);
      },
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 py-16 sm:py-20 md:py-24">
      {/* Section Header */}
      <div className="mb-8 px-4 sm:mb-10 sm:px-6 md:mb-12 md:px-12 lg:px-24">
        <h2 className="text-xs font-medium uppercase tracking-widest text-white/50 sm:text-sm">
          Selected Work
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div 
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-8 sm:gap-6 sm:pb-12 md:gap-8 lg:gap-12"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc((100vw - 90vw) / 2)',
            paddingRight: 'calc((100vw - 90vw) / 2)',
          }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => handleCardClick(project.slug)}
              className="group relative aspect-[16/10] w-[90vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-white/5 transition-all duration-500 ease-out active:scale-[0.98] sm:w-[80vw] sm:rounded-lg md:w-[65vw] md:hover:scale-[1.02] md:hover:shadow-2xl md:hover:shadow-black/50 lg:w-[55vw] xl:w-[50vw]"
            >
              {/* Thumbnail Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5">
                {/* Placeholder gradient - remove when adding real images */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent sm:from-black/80 sm:via-black/20" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 lg:p-10">
                {/* Year & Index */}
                <div className="mb-2 flex items-center gap-3 sm:mb-3">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40 sm:text-xs">
                    {project.year}
                  </span>
                  <span className="text-[10px] text-white/30 sm:text-xs">
                    {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-medium leading-tight text-white sm:mb-3 sm:text-2xl md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>

                {/* Description - hidden on very small screens */}
                <p className="mb-4 line-clamp-2 max-w-md text-sm leading-relaxed text-white/60 sm:line-clamp-none sm:text-base sm:text-white/70">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/60 sm:px-3 sm:py-1 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project indicator - visible on hover (desktop) or always subtle on mobile */}
              <div className="absolute right-4 top-4 flex items-center gap-2 opacity-60 transition-opacity duration-300 sm:right-6 sm:top-6 sm:opacity-0 sm:group-hover:opacity-100 md:right-8 md:top-8">
                <span className="hidden text-sm font-medium text-white sm:inline">View Project</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm sm:h-auto sm:w-auto sm:bg-transparent">
                  <svg 
                    className="h-4 w-4 text-white transition-transform duration-300 md:group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Touch indicator for mobile */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-white/0 transition-all duration-200 active:ring-white/20 sm:hidden" />
            </article>
          ))}
        </div>
      </div>

      {/* Scroll indicator - adjusted for mobile */}
      <div className="mt-6 flex items-center justify-center gap-2 text-white/30 sm:mt-8">
        <span className="text-[10px] uppercase tracking-widest sm:text-xs">Swipe</span>
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Dot indicators for mobile */}
      <div className="mt-4 flex items-center justify-center gap-1.5 sm:hidden">
        {projects.map((_, index) => (
          <div
            key={index}
            className="h-1 w-1 rounded-full bg-white/30"
          />
        ))}
      </div>
    </section>
  );
}