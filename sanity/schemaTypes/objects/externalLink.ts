import { defineType, defineField } from 'sanity'

import { LaunchIcon } from '@sanity/icons'

export default defineType({
  name: 'externalLink',
  title: 'External link',
  type: 'object',
  icon: LaunchIcon,

  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'mailto', 'tel'],
        }).error('Please enter a valid URL (https://, mailto:, or tel:)'),
      description: 'Enter a valid URL (https://, mailto:, or tel:)',
    }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: 'External link',
      }
    },
  },
})
