import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero/config'
import { RelatedDestinationsBlock } from '../blocks/RelatedDestinations/config'
import { RichTextBlock } from '../blocks/RichText/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, RichTextBlock, RelatedDestinationsBlock],
    },
  ],
}
