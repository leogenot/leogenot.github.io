import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer settings',
  type: 'document',
  groups: [{ name: 'Menus', default: true }],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings',
      }
    },
  },
})
