import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'

// Desk structure
import { deskStructure } from './deskStructure'

// Studio plugins
import { media } from 'sanity-plugin-media'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set([
  'frontpage',
  'settings',
  'footer',
])

export default defineConfig({
  name: 'default',
  title: 'Leo Genot',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    inlineSvgInput(),
  ],
  //
  schema: {
    types: schemaTypes,
    // Filter out singleton types and specific templates from the global "New document" menu options
    templates: (templates) =>
      templates
        .filter(({ schemaType }) => !singletonTypes.has(schemaType))
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
