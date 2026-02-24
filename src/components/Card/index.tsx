import type { ReactNode } from 'react'
import styles from './Card.module.css'

type CardProps = {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  const classes = className ? `${styles.root} ${className}` : styles.root

  return <article className={classes}>{children}</article>
}

export default Card
