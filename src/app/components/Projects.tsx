'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const handleCardClick = (slug: string, index: number) => {
    const clickedCard = cardRefs.current[index];
    
    if (!clickedCard || !containerRef.current) {
      router.push(`/projects/${slug}`);
      return;
    }

    // Get card position for the expansion effect
    const rect = clickedCard.getBoundingClientRect();
    
    // Create a clone for the transition
    const clone = clickedCard.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = '100';
    clone.style.margin = '0';
    clone.style.borderRadius = '8px';
    clone.style.overflow = 'hidden';
    document.body.appendChild(clone);

    // Fade out other cards
    cardRefs.current.forEach((card, i) => {
      if (card && i !== index) {
        gsap.to(card, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
        });
      }
    });

    // Expand clicked card to full screen
    gsap.to(clone, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '80vh',
      borderRadius: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(`/projects/${slug}`);
        // Clean up clone after navigation
        setTimeout(() => {
          clone.remove();
        }, 100);
      },
    });
  };

  return (
    <section id="projects" ref={containerRef} className="relative bg-[#0a0a0a] py-24">
      {/* Section Header */}
      <div className="mb-12 px-6 md:px-12 lg:px-24">
        <h2 className="text-sm font-medium uppercase tracking-widest text-white/50">
          Selected Work
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div 
          className="flex gap-6 overflow-x-auto px-6 pb-12 md:gap-8 md:px-12 lg:gap-12 lg:px-24"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onClick={() => handleCardClick(project.slug, index)}
              className="group relative h-[60vh] w-[65vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-white/5 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 md:h-[70vh] md:w-[60vw]"
            >
              {/* Thumbnail Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5">
                {/* Replace this div with Image component once you have actual images */}
                {/* 
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                */}
                
                {/* Placeholder gradient - remove when adding real images */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                {/* Year */}
                <span className="mb-2 inline-block text-xs font-medium uppercase tracking-widest text-white/50">
                  {project.year}
                </span>

                {/* Title */}
                <h3 className="mb-2 text-2xl font-medium text-white md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 max-w-md text-sm text-white/70 md:text-base">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project indicator */}
              <div className="absolute right-6 top-6 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-8 md:top-8">
                <span className="text-sm font-medium text-white">View Project</span>
                <svg 
                  className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </article>
          ))}

          {/* End spacer for scroll padding */}
          <div className="w-6 flex-shrink-0 md:w-12 lg:w-24" aria-hidden="true" />
        </div>

        {/* Scroll hint gradient (left) */}
        <div className="pointer-events-none absolute bottom-12 left-0 top-0 z-10 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-24" />

        {/* Scroll hint gradient (right) */}
        <div className="pointer-events-none absolute bottom-12 right-0 top-0 z-10 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-24" />
      </div>

      {/* Optional: Scroll indicator */}
      <div className="mt-8 flex items-center justify-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}