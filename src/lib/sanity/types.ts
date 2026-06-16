import type { PortableTextBlock } from '@portabletext/react';

// ─── Section types ────────────────────────────────────────────────────────────

export interface TextSection {
  _key: string;
  _type: 'textSection';
  title: string;
  content: PortableTextBlock[];
}

export interface ImageSection {
  _key: string;
  _type: 'imageSection';
  src: string;
  alt: string;
  caption?: string;
}

export type ProjectSection = TextSection | ImageSection;

// ─── Project ──────────────────────────────────────────────────────────────────

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  year: string;
  tags: string[];
  thumbnail: string;
  thumbnailAlt?: string;
  role: string;
  client: string;
  duration: string;
  _updatedAt: string;
}

export interface ProjectDetail extends ProjectListItem {
  overview: PortableTextBlock[];
  sections: ProjectSection[];
}

export interface NextProject {
  title: string;
  slug: string;
}

export interface SiteSettings {
  bio: PortableTextBlock[] | null;
  email: string | null;
  linkedin: string | null;
  github: string | null;
  resumeUrl: string | null;
}