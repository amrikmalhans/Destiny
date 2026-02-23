import type { CollectionConfig } from 'payload'

export const SkyEvents: CollectionConfig = {
  slug: 'sky-events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'startDate', 'endDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Perseid Meteor Shower, Total Solar Eclipse',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'Start of the event or peak viewing period',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'End of the event or peak viewing period',
      },
    },
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      admin: {
        description: 'Destinations where this event is visible or best viewed',
      },
    },
  ],
}
