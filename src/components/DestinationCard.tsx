import type { Destination } from '@/payload-types'
import Link from 'next/link'
import { ArrowUpRight, Info } from 'lucide-react'

import Card from '@/components/Card'
import { extractPlainTextFromLexical } from '@/lib/extractPlainTextFromLexical'

type DestinationCardProps = {
  destination: Destination
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const location = [destination.region, destination.country].filter(Boolean).join(', ')
  const heroImage = typeof destination.heroImage === 'object' ? destination.heroImage : null
  const heroImageUrl = heroImage?.url ?? null
  const description = extractPlainTextFromLexical(destination.description)
  const lightPollutionLabel = destination.lightPollutionRating
    ? `Light pollution ${destination.lightPollutionRating}/5`
    : null

  return (
    <Card className="destination-card">
      <div className="destination-card__media">
        {heroImageUrl ? (
          <img alt={heroImage?.alt || destination.name} className="destination-card__image" src={heroImageUrl} />
        ) : (
          <div aria-hidden="true" className="destination-card__image destination-card__image--fallback" />
        )}
        <button aria-label={`More info about ${destination.name}`} className="destination-card__info" type="button">
          <Info size={20} />
        </button>
      </div>

      <div className="destination-card__body">
        <p className="destination-card__meta">
          {location || 'Norway'}
          {lightPollutionLabel ? <span> · {lightPollutionLabel}</span> : null}
        </p>
        <h3 className="destination-card__title">{destination.name}</h3>
        <p className="destination-card__subtitle">Check hourly forecast</p>
        {description ? <p className="destination-card__description">{description}</p> : null}
        <Link className="destination-card__cta" href={`/destinations/${destination.slug}`}>
          Explore
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </Card>
  )
}

export default DestinationCard
