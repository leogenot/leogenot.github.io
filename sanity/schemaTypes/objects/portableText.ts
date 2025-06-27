import { defineType } from 'sanity'

export default defineType({
  name: 'portableText',
  title: 'Indhold',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {
          title: 'Normal',
          value: 'normal',
        },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            type: 'internalLink',
          },
          {
            type: 'externalLink',
          },
        ],
      },
      options: {
        spellCheck: true,
      },
    },

    { type: 'mainImage', title: 'Image' },
    { type: 'video', title: 'Video' },
  ],
})
