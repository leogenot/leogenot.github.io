// linkSchema.ts
import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  options: {
    collapsed: true,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          { title: 'Page', value: 'page' },
          { title: 'External URL', value: 'url' },
          { title: 'File', value: 'file' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto'],
        }),
      hidden: ({ parent }) => parent?.linkType !== 'url',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [
        { type: 'project' },
        { type: 'frontpage' },
      ],
      description: 'Select an internal page for the link (optional).',
      hidden: ({ parent }) => parent?.linkType !== 'page',
    }),
    defineField({
      name: 'file',
      type: 'file',
      hidden: ({ parent }) => parent?.linkType !== 'file',
    }),
    defineField({
      name: 'label',
      title: 'Custom link label',
      type: 'string',
      description:
        'If this field is not set either the page title or the URL is used as link label',
    }),
    defineField({
      name: 'target',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === 'file',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      pageTitle: 'page.title',
      pageSlug: 'page.slug.current',
    },
    prepare({
      label,
      pageTitle,
      pageSlug,
    }: {
      label: string
      pageTitle: string
      pageSlug: string
    }) {
      return {
        title: label || pageTitle,
        subtitle: pageSlug,
      }
    },
  },
})
