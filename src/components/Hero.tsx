import { Logo } from './Logo'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <Logo className={styles.logo} />
      <h1 className={styles.heading}>Great Software</h1>
      <p className={styles.tagline}>Tools that solve real problems.</p>
    </section>
  )
}
