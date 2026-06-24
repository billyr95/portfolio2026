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
  liveUrl,
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
    "heroImage": coalesce(heroImage.asset->url, thumbnail.asset->url),
    "heroImageAlt": coalesce(heroImage.alt, thumbnail.alt),
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
      lightShadow,
      // mobile gallery
      "mobileImages": [
        { "src": image1.asset->url, "alt": image1.alt },
        { "src": image2.asset->url, "alt": image2.alt },
        { "src": image3.asset->url, "alt": image3.alt },
        { "src": image4.asset->url, "alt": image4.alt },
      ],
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

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    bio,
    email,
    linkedin,
    github,
    resumeUrl,
  }
`;