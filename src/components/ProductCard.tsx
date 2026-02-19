import styles from './ProductCard.module.css'

interface ProductCardProps {
  title: string
  description: string
  status?: string
  link?: string
  linkText?: string
}

export function ProductCard({
  title,
  description,
  status,
  link,
  linkText,
}: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {status && <span className={styles.badge}>{status}</span>}
      </div>
      <p className={styles.description}>{description}</p>
      {link && (
        <a
          className={styles.link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText ?? link}
        </a>
      )}
    </div>
  )
}
