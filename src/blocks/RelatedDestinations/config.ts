import type { Block } from 'payload'

export const RelatedDestinationsBlock: Block = {
  slug: 'relatedDestinations',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
    },
  ],
}
