import type { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'relatedDestination'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g. how-to-photograph-milky-way)',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'relatedDestination',
      type: 'relationship',
      relationTo: 'destinations',
      admin: {
        description: 'Destination this guide is about (e.g. gear for Mauna Kea)',
      },
    },
  ],
}
