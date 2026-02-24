import type { Destination } from '@/payload-types'

import Card from '@/components/Card'

type DestinationCardProps = {
  destination: Destination
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const location = [destination.region, destination.country].filter(Boolean).join(', ')

  return (
    <Card className="destination-card">
      <h3 className="destination-card__title">{destination.name}</h3>
      {location ? <p className="destination-card__location">{location}</p> : null}
      <p className="destination-card__meta">Slug: {destination.slug}</p>
    </Card>
  )
}

export default DestinationCard
