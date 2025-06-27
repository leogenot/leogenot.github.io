import { defineType, defineField } from 'sanity'
import { MetaDescription } from '../../components/MetaDescription'
import { MetaTitle } from '../../components/MetaTitle'

export default defineType({
  title: 'SEO',
  name: 'seo',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Overwrites the default page title',
      components: {
        input: MetaTitle,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      components: {
        input: MetaDescription,
      },

      description:
        'Optional but highly recommended. More than 70 characters and ideally between 110-160 characters.',
    }),

    // Robots
    defineField({
      name: 'noindex',
      title: 'Block search engines from indexing this page',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, search engines will not index this page.',
    }),

    // Canonical URL
    defineField({
      name: 'canonical',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred URL for this page. Defaults to the page URL if left blank.',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})
