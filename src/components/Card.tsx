import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  const classes = className ? `card ${className}` : 'card'

  return <article className={classes}>{children}</article>
}

export default Card
