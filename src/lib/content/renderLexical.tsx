import React from 'react'

type LexicalNode = {
  type?: string
  tag?: string
  children?: LexicalNode[]
  text?: string
  format?: string
  version?: number
  [k: string]: unknown
}

type LexicalValue = {
  root?: {
    children?: LexicalNode[]
    [k: string]: unknown
  }
  [k: string]: unknown
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (node.text !== undefined) {
    return <React.Fragment key={index}>{node.text}</React.Fragment>
  }

  const children = Array.isArray(node.children)
    ? node.children.map((child, i) => renderNode(child, i))
    : null

  switch (node.type) {
    case 'heading': {
      const tag = node.tag as string
      const headingTag =
        typeof tag === 'string' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h2'
      return React.createElement(headingTag, { key: index }, children)
    }
    case 'paragraph':
      return <p key={index}>{children}</p>
    case 'list':
      return node.listType === 'number' ? (
        <ol key={index}>{children}</ol>
      ) : (
        <ul key={index}>{children}</ul>
      )
    case 'listitem':
      return <li key={index}>{children}</li>
    case 'link':
      return (
        <a key={index} href={node.url as string} rel={node.rel as string}>
          {children}
        </a>
      )
    case 'linebreak':
      return <br key={index} />
    default:
      return <span key={index}>{children}</span>
  }
}

export function renderLexicalToReact(value: LexicalValue | null | undefined): React.ReactNode {
  if (!value?.root?.children?.length) return null
  return (
    <div className="rich-text">
      {value.root.children.map((node, i) => renderNode(node, i))}
    </div>
  )
}
