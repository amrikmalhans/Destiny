import type { Page } from '@/payload-types'
import { HeroBlockComponent } from '@/blocks/Hero/Component'
import { RelatedDestinationsBlockComponent } from '@/blocks/RelatedDestinations/Component'
import { RichTextBlockComponent } from '@/blocks/RichText/Component'
import React from 'react'

type Block = NonNullable<Page['layout']>[number]

const blockComponents: Partial<Record<Block['blockType'], React.ComponentType<Block>>> = {
  hero: HeroBlockComponent as React.ComponentType<Block>,
  richText: RichTextBlockComponent as React.ComponentType<Block>,
  relatedDestinations: RelatedDestinationsBlockComponent as React.ComponentType<Block>,
}

type RenderBlocksProps = {
  blocks: Page['layout']
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType]
        if (!BlockComponent) return null
        const key = block.id ?? `block-${index}`
        return <BlockComponent key={key} {...block} />
      })}
    </>
  )
}
