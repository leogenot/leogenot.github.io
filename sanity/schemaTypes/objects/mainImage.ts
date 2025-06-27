import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',

  options: {
    hotspot: true,
    collapsed: true,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (Rule) => Rule.required().error('Alternative text is required'),
    }),
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'Image',
    },
  },
})
