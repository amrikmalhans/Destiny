import type { Media } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

export type HeroBlockProps = {
  blockType: 'hero'
  id: string
  heading: string
  subheading?: string | null
  backgroundImage?: number | Media | null
  ctaLabel?: string | null
  ctaLink?: string | null
}

export function HeroBlockComponent(props: HeroBlockProps) {
  const { heading, subheading, backgroundImage, ctaLabel, ctaLink } = props
  const image = typeof backgroundImage === 'object' && backgroundImage !== null ? backgroundImage : null
  const imageUrl = image?.url ?? null

  return (
    <section className="block-hero">
      {imageUrl ? (
        <div className="block-hero__bg">
          <img alt={image?.alt ?? ''} className="block-hero__img" src={imageUrl} />
        </div>
      ) : null}
      <div className="block-hero__content">
        <h1 className="block-hero__title">{heading}</h1>
        {subheading ? <p className="block-hero__subtitle">{subheading}</p> : null}
        {ctaLabel && ctaLink ? (
          <Link className="block-hero__cta" href={ctaLink}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
