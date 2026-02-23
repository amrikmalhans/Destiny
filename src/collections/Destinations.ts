import type { CollectionConfig } from 'payload'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((label, i) => ({ label, value: String(i + 1) }))

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'region', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g. mauna-kea)',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'lightPollutionRating',
      type: 'select',
      options: [
        { label: '1 - Darkest', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5 - Brightest', value: '5' },
      ],
      admin: {
        description: '1 = best for stargazing, 5 = most light pollution',
      },
    },
    {
      name: 'bestMonths',
      type: 'select',
      hasMany: true,
      options: MONTHS,
      admin: {
        description: 'Months when conditions are best for dark sky viewing',
      },
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        description: 'Latitude for map display',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        description: 'Longitude for map display',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage',
      },
    },
  ],
}
