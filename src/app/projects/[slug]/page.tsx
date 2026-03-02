'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// This would come from Sanity or a data file in production
const projectsData: Record<string, Project> = {
  'project-one': {
    title: 'Project One',
    description: 'Brief description of the project and your role.',
    year: '2024',
    tags: ['Next.js', 'Design System'],
    thumbnail: '/projects/placeholder-1.jpg',
    role: 'Design Engineer',
    client: 'Client Name',
    duration: '3 months',
    overview: 'A longer description of the project, the problem it solved, and the impact it had. This is where you tell the story of the work.',
    sections: [
      {
        type: 'text',
        title: 'The Challenge',
        content: 'Describe the problem or opportunity that led to this project. What were the constraints? What was the goal?',
      },
      {
        type: 'image',
        src: '/projects/placeholder-1.jpg',
        alt: 'Project screenshot',
        caption: 'Main interface design',
      },
      {
        type: 'text',
        title: 'The Approach',
        content: 'Walk through your process. How did you tackle the problem? What decisions did you make and why?',
      },
      {
        type: 'image',
        src: '/projects/placeholder-1.jpg',
        alt: 'Detail shot',
        caption: 'Component details',
      },
      {
        type: 'text',
        title: 'The Outcome',
        content: 'What was the result? Include metrics if you have them. What did you learn?',
      },
    ],
  },
  'project-two': {
    title: 'Project Two',
    description: 'Brief description of the project and your role.',
    year: '2024',
    tags: ['React', 'GSAP'],
    thumbnail: '/projects/placeholder-2.jpg',
    role: 'Frontend Developer',
    client: 'Client Name',
    duration: '2 months',
    overview: 'Project overview goes here.',
    sections: [],
  },
  'project-three': {
    title: 'Project Three',
    description: 'Brief description of the project and your role.',
    year: '2023',
    tags: ['Sanity', 'Tailwind'],
    thumbnail: '/projects/placeholder-3.jpg',
    role: 'Design Engineer',
    client: 'Client Name',
    duration: '4 months',
    overview: 'Project overview goes here.',
    sections: [],
  },
  'project-four': {
    title: 'Project Four',
    description: 'Brief description of the project and your role.',
    year: '2022',
    tags: ['TypeScript', 'Figma'],
    thumbnail: '/projects/placeholder-4.jpg',
    role: 'UI Designer',
    client: 'Client Name',
    duration: '6 weeks',
    overview: 'Project overview goes here.',
    sections: [],
  },
  'project-five': {
    title: 'Project Five',
    description: 'Brief description of the project and your role.',
    year: '2021',
    tags: ['UI/UX', 'Prototyping'],
    thumbnail: '/projects/placeholder-5.jpg',
    role: 'Product Designer',
    client: 'Client Name',
    duration: '3 months',
    overview: 'Project overview goes here.',
    sections: [],
  },
};

interface Section {
  type: 'text' | 'image';
  title?: string;
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface Project {
  title: string;
  description: string;
  year: string;
  tags: string[];
  thumbnail: string;
  role: string;
  client: string;
  duration: string;
  overview: string;
  sections: Section[];
}

// Get all slugs for static generation
export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = projectsData[params.slug];

  // Entrance animation
  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero image scales down from full screen
      gsap.fromTo(
        heroRef.current,
        {
          scale: 1.1,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Content fades up
      gsap.fromTo(
        contentRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        }
      );

      // Parallax on hero image
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  // Handle back navigation with exit animation
  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => router.push('/#projects'),
    });
  };

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <p className="text-white/50">Project not found</p>
      </div>
    );
  }

  // Find next project for navigation
  const slugs = Object.keys(projectsData);
  const currentIndex = slugs.indexOf(params.slug);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const nextProject = projectsData[nextSlug];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a]">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white md:left-12 md:top-12"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back
      </button>

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden md:h-[80vh]">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"
        >
          {/* Replace with actual image */}
          {/* 
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          */}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-24">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-white/50">
            {project.year}
          </span>
          <h1 className="mb-4 text-4xl font-medium text-white md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-white/70 md:text-xl">
            {project.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        {/* Meta info */}
        <div className="mb-16 grid gap-8 border-b border-white/10 pb-16 md:grid-cols-4">
          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
              Role
            </h3>
            <p className="text-white">{project.role}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
              Client
            </h3>
            <p className="text-white">{project.client}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
              Duration
            </h3>
            <p className="text-white">{project.duration}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
              Tech
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-24 max-w-3xl">
          <h2 className="mb-6 text-2xl font-medium text-white md:text-3xl">Overview</h2>
          <p className="text-lg leading-relaxed text-white/70">{project.overview}</p>
        </div>

        {/* Dynamic sections */}
        <div className="space-y-24">
          {project.sections.map((section, index) => (
            <div key={index}>
              {section.type === 'text' && (
                <div className="max-w-3xl">
                  <h2 className="mb-6 text-2xl font-medium text-white md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-white/70">{section.content}</p>
                </div>
              )}
              {section.type === 'image' && (
                <figure className="space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5">
                    {/* Replace with actual image */}
                    {/*
                    <Image
                      src={section.src!}
                      alt={section.alt!}
                      fill
                      className="object-cover"
                    />
                    */}
                  </div>
                  {section.caption && (
                    <figcaption className="text-center text-sm text-white/40">
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Project */}
      <Link
        href={`/projects/${nextSlug}`}
        className="group block border-t border-white/10 px-6 py-24 transition-colors hover:bg-white/5 md:px-12 lg:px-24"
      >
        <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-white/40">
          Next Project
        </span>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium text-white md:text-5xl">
            {nextProject.title}
          </h2>
          <svg
            className="h-8 w-8 text-white transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Link>
    </div>
  );
}