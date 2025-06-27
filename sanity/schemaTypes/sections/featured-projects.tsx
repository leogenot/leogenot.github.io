import {AsteriskIcon} from '@sanity/icons'

export default {
  name: 'FeaturedProjects',
  type: 'object',
  title: 'Featured projects',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    },
  ],
  icon: AsteriskIcon,
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title: string}) {
      return {
        title: 'Featured projects',
        subtitle: title,
        media: AsteriskIcon,
      }
    },
  },
}
