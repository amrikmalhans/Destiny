import type { Destination } from '@/payload-types'
import React from 'react'
import DestinationCard from '@/components/DestinationCard'

export type RelatedDestinationsBlockProps = {
  blockType: 'relatedDestinations'
  id: string
  title?: string | null
  destinations?: (number | Destination)[] | null
}

export function RelatedDestinationsBlockComponent(props: RelatedDestinationsBlockProps) {
  const { title, destinations } = props
  const list = Array.isArray(destinations) ? destinations : []
  const items = list.filter((d): d is Destination => typeof d === 'object' && d !== null && 'name' in d)

  if (items.length === 0) return null

  return (
    <section className="block-related-destinations">
      {title ? <h2 className="block-related-destinations__title">{title}</h2> : null}
      <div className="block-related-destinations__grid destination-grid">
        {items.map((destination) => (
          <DestinationCard destination={destination} key={destination.id} />
        ))}
      </div>
    </section>
  )
}
