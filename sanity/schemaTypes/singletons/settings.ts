import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',

  groups: [
    {
      name: 'errorPage',
      title: 'Error page',
    },
  ],

  fields: [
    defineField({
      name: 'errorPage',
      type: 'object',
      group: 'errorPage',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'text',
          type: 'string',
        }),
        defineField({
          name: 'media',
          type: 'media-asset',
        })
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
