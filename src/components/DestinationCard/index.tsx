import type { Destination } from '@/payload-types'
import Link from 'next/link'
import { ArrowUpRight, Info } from 'lucide-react'

import Card from '@/components/Card'
import { extractPlainTextFromLexical } from '@/lib/content'
import styles from './DestinationCard.module.css'

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
    <Card className={styles.destinationCard}>
      <div className={styles.media}>
        {heroImageUrl ? (
          <img alt={heroImage?.alt || destination.name} className={styles.image} src={heroImageUrl} />
        ) : (
          <div aria-hidden="true" className={`${styles.image} ${styles.imageFallback}`} />
        )}
        <button aria-label={`More info about ${destination.name}`} className={styles.info} type="button">
          <Info size={20} />
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          {location || 'Norway'}
          {lightPollutionLabel ? <span> · {lightPollutionLabel}</span> : null}
        </p>
        <h3 className={styles.title}>{destination.name}</h3>
        <p className={styles.subtitle}>Check hourly forecast</p>
        {description ? <p className={styles.description}>{description}</p> : null}
        <Link className={styles.cta} href={`/destinations/${destination.slug}`}>
          Explore
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </Card>
  )
}

export default DestinationCard
