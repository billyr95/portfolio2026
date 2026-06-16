'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SiteSettings } from '@/lib/sanity/types';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ settings }: { settings: SiteSettings | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const links = [
    settings?.email && { label: 'Email', href: `mailto:${settings.email}`, display: settings.email },
    settings?.linkedin && { label: 'LinkedIn', href: settings.linkedin, display: 'linkedin.com/in/billy-riley' },
    settings?.github && { label: 'GitHub', href: settings.github, display: 'github.com/audstudios' },
    settings?.resumeUrl && { label: 'Resume', href: settings.resumeUrl, display: 'Download PDF' },
  ].filter(Boolean) as { label: string; href: string; display: string }[];

  if (links.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative z-10 border-t border-white/10 px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-24">
      <div ref={contentRef}>
        <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-white/50 sm:mb-10 sm:text-sm">
          Get in Touch
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          {links.map(({ label, href, display }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-3"
            >
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/30 sm:text-xs">
                {label}
              </span>
              <span className="text-sm text-white/60 transition-colors duration-200 md:group-hover:text-white sm:text-base">
                {display}
              </span>
              <svg
                className="h-3.5 w-3.5 text-white/20 transition-all duration-200 md:group-hover:translate-x-1 md:group-hover:text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
