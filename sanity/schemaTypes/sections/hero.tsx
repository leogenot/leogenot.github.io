import {BlockElementIcon} from '@sanity/icons'

export default {
  name: 'Hero',
  type: 'object',
  title: 'Hero',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'text',
      type: 'portableTextSimple',
    },
    {
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [{type: 'link'}],
    },
  ],
  icon: BlockElementIcon,
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title: string}) {
      return {
        title: 'Hero',
        subtitle: title,
        media: BlockElementIcon,
      }
    },
  },
}
