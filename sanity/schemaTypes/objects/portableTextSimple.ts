import { defineField } from 'sanity'

export default defineField({
  name: 'portableTextSimple',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
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
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      styles: [
        { title: 'Normal', value: 'normal' }
      ],
      options: {
        spellCheck: true,
      },
    },
  ],
})
