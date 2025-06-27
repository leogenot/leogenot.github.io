import { BlockElementIcon } from '@sanity/icons'
import React from 'react'
import { defineField } from 'sanity'

export default {
  name: 'Hero',
  type: 'object',
  title: 'Hero',
  fields: [
    defineField({
      name: 'theme',
      type: 'string',
      description: 'Changes the background color of the section',
      options: {
        list: [{ title: 'Light grey', value: 'light-grey' }],
      },
      hidden: ({ document }) => ['overlayPage', 'page'].includes(document?._type || ''),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    {
      name: 'text',
      type: 'portableTextSimple',
    },
    {
      name: 'media',
      type: 'media-asset',
    },
  ],
  icon: BlockElementIcon,
  preview: {
    select: {
      title: 'title',
      text: 'text',
      image: 'media.image',
      video: 'media.video',
      playbackId: 'media.video.asset.playbackId',
    },
    prepare({ title, image, playbackId, text }) {
      const muxThumbnail = playbackId
        ? `https://image.mux.com/${playbackId}/thumbnail.jpg?time=1`
        : null

      return {
        title: 'Hero',
        subtitle: title,
        media: muxThumbnail
          ? () => <img src={muxThumbnail} alt="Video thumbnail" />
          : image || BlockElementIcon,
      }
    },
  },
}
