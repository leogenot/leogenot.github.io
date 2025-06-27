import {defineType} from 'sanity'
import React from 'react'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'media-asset',
  type: 'object',
  title: 'Media',
  description: 'Upload either a video or an image. When both are present, video takes precedence.',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'video',
      type: 'file',
      title: 'Video',
      options: {
        collapsible: false,
        collapsed: false,
      },
    },
  ],
  options: {
    collapsible: true,
  },
  preview: {
    select: {
      image: 'image',
      video: 'video',
      title: 'image.alt',
    },
    prepare({title, video, image}) {
      return {
        title: title || video ? 'Video' : 'Image',
        media: ImageIcon,
      }
    },
  },
})
