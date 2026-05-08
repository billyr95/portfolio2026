// ─── Section types (portable-ish, but typed manually for simplicity) ───────────

export interface TextSection {
  _key: string;
  _type: 'textSection';
  title: string;
  content: string;
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
  overview: string;
  sections: ProjectSection[];
}

export interface NextProject {
  title: string;
  slug: string;
}