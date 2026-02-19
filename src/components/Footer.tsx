import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        <a href="mailto:hello@greatsoftware.dev">hello@greatsoftware.dev</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
      <p className={styles.copyright}>&copy; 2026 Great Software LLC</p>
    </footer>
  )
}
