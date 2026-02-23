import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: destinations } = await payload.find({
    collection: 'destinations',
  })

  return (
    <section className="home">
      <div className="content">
        <h1>Home</h1>
      </div>
      <section className="destinations">
        <ul>
          {destinations.map((destination) => (
            <li key={destination.id}>
              <h2>{destination.name}</h2>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
