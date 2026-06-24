'use client';

import { useRef, useEffect } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SiteSettings } from '@/lib/sanity/types';
import { nbHyphens } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-white/60 md:text-xl">{nbHyphens(children)}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  unknownType: () => null,
};

export default function About({ settings }: { settings: SiteSettings | null }) {
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!settings?.bio?.length) return null;

  return (
    <section ref={sectionRef} className="relative z-10 px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-24">
      <div ref={contentRef} className="max-w-3xl">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-white/50 sm:mb-10 sm:text-sm">
          About
        </h2>
        <PortableText value={settings.bio} components={bioComponents} />
      </div>
    </section>
  );
}
