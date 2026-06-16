import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      description: 'Shown in the About section on the homepage',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'resumeUrl', title: 'Resume URL', type: 'url', description: 'Link to your resume PDF' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
