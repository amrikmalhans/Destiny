import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import DestinationCard from '@/components/DestinationCard'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: destinations } = await payload.find({
    collection: 'destinations',
  })

  return (
    <section className="home">
      <Hero />
      <section className="destinations">
        <div className="destination-grid">
          {destinations.map((destination) => (
            <DestinationCard destination={destination} key={destination.id} />
          ))}
        </div>
      </section>
    </section>
  )
}
