import { Link } from '@tanstack/react-router'
import { Footer } from './Footer'
import styles from './LegalPage.module.css'

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          &larr; Back
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.body}>{children}</div>
      </div>
      <Footer />
    </>
  )
}
