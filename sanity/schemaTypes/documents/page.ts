import { defineField, defineType } from 'sanity'
import { pageBuilderSections, pageSections } from '../sections'
import { AddDocumentIcon } from '@sanity/icons'
import type { FieldGroupDefinition } from 'sanity'

// Define groups separately for better organization
const groups: FieldGroupDefinition[] = [
  {
    name: 'default',
    default: true,
  },
  {
    name: 'content',
  },
  {
    name: 'settings',
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

// Organize fields by their group for better maintainability
const defaultFields = [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    group: 'default',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'title',
    },
    group: 'default',
    validation: (Rule) => Rule.required(),
  }),
] as const

const contentFields = [
  pageBuilderSections(pageSections, 'content'),
] as const

const seoFields = [
  defineField({
    name: 'seo',
    type: 'seo',
    title: 'SEO',
    group: 'seo',
  }),
] as const

// Main schema definition
export default defineType({
  name: 'page',
  title: 'Project',
  type: 'document',
  icon: AddDocumentIcon,
  groups,
  fields: [...defaultFields, ...contentFields, ...seoFields],
})
