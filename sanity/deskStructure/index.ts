import { HomeIcon, CogIcon, ThLargeIcon } from '@sanity/icons'
import { type StructureBuilder } from 'sanity/structure'

// Define the actions that should be available for singleton documents
export const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
export const singletonTypes = new Set(['frontpage', 'settings', 'footer'])


const singletonListItem = (
    S: StructureBuilder,
    typeName: string,
    title?: string,
    icon?: React.ComponentType,
) =>
    S.listItem()
        .title(title || typeName)
        .id(typeName)
        .child(S.document().schemaType(typeName).documentId(typeName))
        .icon(icon || '')

export const deskStructure = (S: StructureBuilder) =>
    S.list()
        .title('All')
        .items([
            singletonListItem(S, 'frontpage', 'Frontpage', HomeIcon),
            S.documentTypeListItem('page').title('Projects'),
            S.divider(),
            singletonListItem(S, 'footer', 'Footer', ThLargeIcon),
            singletonListItem(S, 'settings', 'Settings', CogIcon),
            S.divider(),
        ])
