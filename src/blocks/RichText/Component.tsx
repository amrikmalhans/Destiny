import { renderLexicalToReact } from '@/lib/content'
import React from 'react'

export type RichTextBlockProps = {
  blockType: 'richText'
  id: string
  content?: unknown
}

export function RichTextBlockComponent(props: RichTextBlockProps) {
  const { content } = props
  const rendered = renderLexicalToReact(content as Parameters<typeof renderLexicalToReact>[0])
  if (!rendered) return null
  return <section className="block-rich-text">{rendered}</section>
}
