import { defineField } from 'sanity'
export default defineField({
    name: 'portableTextTitle',
    title: 'Content',
    type: 'array',
    of: [
        {
            type: 'block',
            marks: {
                decorators: [
                ],
                annotations: [
                ],
            },
            lists: [],
            styles: [
                { title: 'Normal', value: 'normal' }
            ],
            options: {
                spellCheck: true,
            },
        },
    ],
})
