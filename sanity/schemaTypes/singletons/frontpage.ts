import { defineType, defineField } from 'sanity'
import { pageBuilderSections, pageSections } from '../sections'

export default defineType({
  name: 'frontpage',
  title: 'Frontpage',
  type: 'document',
  groups: [
    {
      name: 'default',
      default: true,
    },
    {
      name: 'content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'default',
    }),
    pageBuilderSections(pageSections, 'content'),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
})
