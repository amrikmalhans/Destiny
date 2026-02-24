type LexicalNode = {
  children?: LexicalNode[]
  text?: string
}

const walkNodes = (nodes: LexicalNode[]): string => {
  return nodes
    .map((node) => {
      if (typeof node.text === 'string') return node.text
      if (Array.isArray(node.children)) return walkNodes(node.children)
      return ''
    })
    .join(' ')
}

export const extractPlainTextFromLexical = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''

  const root = (value as { root?: { children?: LexicalNode[] } }).root
  const children = root?.children

  if (!Array.isArray(children)) return ''

  return walkNodes(children).replace(/\s+/g, ' ').trim()
}
