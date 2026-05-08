// sanity/schemaTypes/project.ts
// Drop this file into your Sanity Studio's schemaTypes folder.
// Run `npx sanity@latest init` (or add to an existing studio) to create the studio.

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      description: 'Controls sort order in the carousel (lower = first)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'One-liner shown on the card',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Meta
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    // Body
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Section Title' }),
            defineField({ name: 'content', type: 'text', title: 'Content', rows: 6 }),
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: title ?? 'Text Section' }) },
        },
        {
          type: 'object',
          name: 'imageSection',
          title: 'Image Section',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
          preview: { select: { media: 'image', title: 'caption' }, prepare: (s) => ({ ...s, title: s.title ?? 'Image Section' }) },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'thumbnail' },
  },
  orderings: [
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Year, newest', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
});