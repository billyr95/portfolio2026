import { groq } from 'next-sanity';

// Fields shared between list and detail views
const PROJECT_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  year,
  tags,
  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt,
  role,
  client,
  duration,
  _updatedAt
`;

// All projects — lightweight, for the list / carousel
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) {
    ${PROJECT_FIELDS}
  }
`;

// Slugs only — used by generateStaticParams
export const projectSlugsQuery = groq`
  *[_type == "project"] | order(order asc) { "slug": slug.current }
`;

// Single project — full detail, used on the [slug] page
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_FIELDS},
    overview,
    sections[] {
      _key,
      _type,
      // text block
      title,
      content,
      // image block
      "src": image.asset->url,
      "alt": image.alt,
      caption,
    },
  }
`;

// Next project — used for the "next project" link at the bottom of a detail page
export const nextProjectQuery = groq`
  *[_type == "project" && order > $currentOrder] | order(order asc)[0] {
    title,
    "slug": slug.current,
  }
`;

// Fallback: wrap around to the first project if there's no "next"
export const firstProjectQuery = groq`
  *[_type == "project"] | order(order asc)[0] {
    title,
    "slug": slug.current,
  }
`;