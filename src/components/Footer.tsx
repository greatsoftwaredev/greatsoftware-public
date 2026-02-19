import { Link } from '@tanstack/react-router'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        <a href="mailto:hello@greatsoftware.dev">hello@greatsoftware.dev</a>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </nav>
      <p className={styles.copyright}>&copy; 2026 Great Software LLC</p>
    </footer>
  )
}
