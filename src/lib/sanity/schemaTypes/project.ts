// sanity/schemaTypes/project.ts
// Drop this file into your Sanity Studio's schemaTypes folder.
// Run `npx sanity@latest init` (or add to an existing studio) to create the studio.

import { defineField, defineType } from 'sanity';

function richTextBlock() {
  return {
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Number', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
        { title: 'Underline', value: 'underline' },
        { title: 'Code', value: 'code' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [defineField({ name: 'href', type: 'url', title: 'URL' })],
        },
      ],
    },
  };
}

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
      title: 'Card Image',
      description: 'Shown on the project card on the homepage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Shown at the top of the project detail page (falls back to Card Image if empty)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    // Meta
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'liveUrl', title: 'Live Site URL', type: 'url', description: 'Link to the live website' }),
    // Body
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [richTextBlock()],
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
            defineField({ name: 'content', title: 'Content', type: 'array', of: [richTextBlock()] }),
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
            defineField({ name: 'lightShadow', type: 'boolean', title: 'Light shadow', description: 'Use a white glow instead of a dark shadow (better for dark images)', initialValue: false }),
          ],
          preview: { select: { media: 'image', title: 'caption' }, prepare: (s) => ({ ...s, title: s.title ?? 'Image Section' }) },
        },
        {
          type: 'object',
          name: 'mobileGallery',
          title: 'Mobile Screenshots (1×4)',
          fields: [
            defineField({
              name: 'image1',
              type: 'image',
              title: 'Screenshot 1',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image2',
              type: 'image',
              title: 'Screenshot 2',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
            defineField({
              name: 'image3',
              type: 'image',
              title: 'Screenshot 3',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
            defineField({
              name: 'image4',
              type: 'image',
              title: 'Screenshot 4',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            defineField({ name: 'lightShadow', type: 'boolean', title: 'Light shadow', description: 'Use a white glow instead of a dark shadow (better for dark images)', initialValue: false }),
          ],
          preview: { prepare: () => ({ title: 'Mobile Screenshots' }) },
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