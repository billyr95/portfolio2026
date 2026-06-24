'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { ProjectDetail, NextProject } from '@/lib/sanity/types';

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-white/60 sm:text-lg sm:text-white/70">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 text-xl font-medium text-white sm:text-2xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-lg font-medium text-white sm:text-xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-white/20 pl-4 italic text-white/50">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-base text-white/60 sm:text-lg sm:text-white/70">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5 text-base text-white/60 sm:text-lg sm:text-white/70">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-white/80">{children}</code>
    ),
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline text-white/80 hover:text-white transition-colors">
        {children}
      </a>
    ),
  },
  unknownType: () => null,
};

gsap.registerPlugin(ScrollTrigger);

interface ProjectContentProps {
  project: ProjectDetail;
  nextSlug: string;
  nextProject: NextProject;
}

export default function ProjectContent({ project, nextSlug, nextProject }: ProjectContentProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo(contentRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.to(heroRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => router.push('/#projects'),
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a]">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur-md transition-colors active:scale-95 sm:left-6 sm:top-6 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2 md:left-12 md:top-12 md:hover:bg-black/80 md:hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span className="hidden text-sm sm:inline">Back</span>
      </button>

      {/* Hero */}
      <div className="relative w-full overflow-hidden sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div ref={heroRef} className="sm:absolute sm:inset-0">
          {project.thumbnail && (
            <>
              <Image
                src={project.thumbnail}
                alt={project.thumbnailAlt ?? project.title}
                width={1920}
                height={1080}
                className="block w-full h-auto sm:hidden"
                priority
                sizes="100vw"
              />
              <Image
                src={project.thumbnail}
                alt={project.thumbnailAlt ?? project.title}
                fill
                className="hidden sm:block object-cover"
                priority
                sizes="100vw"
              />
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-12 lg:p-24">
          <span className="mb-2 inline-block text-[10px] font-medium uppercase tracking-widest text-white/50 sm:mb-4 sm:text-xs">
            {project.year}
          </span>
          <h1 className="mb-2 text-2xl font-medium leading-tight text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base sm:text-white/70 md:text-lg lg:text-xl">
            {project.description}
          </p>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 active:scale-95 sm:mt-6 md:hover:bg-white/20"
            >
              Visit Site
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-24 lg:px-24">
        {/* Meta */}
        <div className="mb-12 grid grid-cols-2 gap-6 border-b border-white/10 pb-12 sm:mb-16 sm:gap-8 sm:pb-16 md:grid-cols-4">
          {[
            { label: 'Role', value: project.role },
            { label: 'Client', value: project.client },
            { label: 'Duration', value: project.duration },
          ].map(({ label, value }) => (
            <div key={label}>
              <h3 className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-white/40 sm:mb-2 sm:text-xs">{label}</h3>
              <p className="text-sm text-white sm:text-base">{value}</p>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-white/40 sm:mb-2 sm:text-xs">Tech</h3>
            <p className="text-sm text-white sm:text-base">{project.tags?.join(', ')}</p>
          </div>
        </div>

        {/* Overview */}
        {project.overview?.length > 0 && (
          <div className="mb-16 max-w-3xl sm:mb-24">
            <h2 className="mb-4 text-xl font-medium text-white sm:mb-6 sm:text-2xl md:text-3xl">Overview</h2>
            <PortableText value={project.overview} components={portableTextComponents} />
          </div>
        )}

        {/* Sections */}
        {project.sections?.length > 0 && (
          <div className="space-y-16 sm:space-y-24">
            {project.sections.map((section) => {
              if (section._type === 'textSection') {
                return (
                  <div key={section._key} className="max-w-3xl">
                    <h2 className="mb-4 text-xl font-medium text-white sm:mb-6 sm:text-2xl md:text-3xl">{section.title}</h2>
                    <PortableText value={section.content} components={portableTextComponents} />
                  </div>
                );
              }
              if (section._type === 'imageSection') {
                return (
                  <figure key={section._key} className="space-y-3 sm:space-y-4">
                    <div className={`relative w-full overflow-hidden rounded-lg bg-white/5 sm:aspect-video ${section.lightShadow ? 'shadow-2xl shadow-white/15' : 'shadow-2xl shadow-black/40'}`}>
                      {section.src && (
                        <>
                          <Image
                            src={section.src}
                            alt={section.alt ?? ''}
                            width={1920}
                            height={1080}
                            className="block w-full h-auto sm:hidden"
                            sizes="100vw"
                          />
                          <Image
                            src={section.src}
                            alt={section.alt ?? ''}
                            fill
                            className="hidden sm:block object-cover"
                            sizes="90vw"
                          />
                        </>
                      )}
                    </div>
                    {section.caption && (
                      <figcaption className="text-center text-xs text-white/40 sm:text-sm">{section.caption}</figcaption>
                    )}
                  </figure>
                );
              }
              if (section._type === 'mobileGallery') {
                const images = section.mobileImages?.filter((img) => img.src) ?? [];
                return (
                  <figure key={section._key} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 md:gap-8">
                      {images.map((img, i) => (
                        <div key={i} className={`relative aspect-[9/16] overflow-hidden rounded-xl bg-white/5 ${section.lightShadow ? 'shadow-2xl shadow-white/15' : 'shadow-2xl shadow-black/40'}`}>
                          <Image
                            src={img.src!}
                            alt={img.alt ?? ''}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 20vw"
                          />
                        </div>
                      ))}
                    </div>
                    {section.caption && (
                      <figcaption className="text-center text-xs text-white/40 sm:text-sm">{section.caption}</figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Next Project */}
      {nextSlug && (
        <Link
          href={`/projects/${nextSlug}`}
          className="group block border-t border-white/10 px-5 py-16 transition-colors active:bg-white/5 sm:px-6 sm:py-20 md:px-12 md:py-24 md:hover:bg-white/5 lg:px-24"
        >
          <span className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-white/40 sm:mb-4 sm:text-xs">
            Next Project
          </span>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-medium text-white sm:text-3xl md:text-4xl lg:text-5xl">{nextProject.title}</h2>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 sm:h-12 sm:w-12 md:h-auto md:w-auto md:bg-transparent md:group-hover:translate-x-2">
              <svg className="h-5 w-5 text-white sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}