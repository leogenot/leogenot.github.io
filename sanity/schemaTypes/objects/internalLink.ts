import { defineType, defineField } from 'sanity'

import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [
        { type: 'page' as const },
        { type: 'frontpage' as const },
        // Add other document types that can be linked internally
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: 'Internal link',
      }
    },
  },
})
