import { defineField } from 'sanity'
import Hero from './hero'
const sections = [
  Hero,
]

// Function to sort sections alphabetically
const sortAlphabetically = (arr: Array<{ name: string; type: string }>) =>
  arr.sort((a, b) => a.name.localeCompare(b.name))

// Sort sections and overlay_sections
const sortedSections = sortAlphabetically(sections)

export default sortedSections

// Prepped section-maps ready to use in docs
export const pageSections = mapSections(sortedSections)

// Helper function to map out doc-specific sections
function mapSections(sectionArray: Array<{ name: string; type: string }>) {
  return sectionArray.map((section) => ({
    name: section.name,
    type: section.name,
  }))
}

export const pageBuilderSections = (
  sections: Array<{ name: string; type: string }>,
  groupName: string | undefined,
) =>
  defineField({
    name: 'pageSections',
    type: 'array',
    title: 'Sections',
    group: groupName,

    options: {
      insertMenu: {
        filter: true,
        views: [
          // { name: 'list' },
          {
            name: 'grid',
            // Preview thumbnails should saved in 15:10 aspect ratio - 1500x1000px
            previewImageUrl: (schemaTypeName) => `/static/preview-${schemaTypeName}.png`,
          },
        ],
      },
    },
    of: [...sortedSections],
  })
