import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { Footer } from '../components/Footer'
import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <section className={styles.products}>
        <ProductCard
          title="Meld"
          description="A couples intimacy app. Two people. One toggle. Zero rejection."
          status="Coming Soon"
        />
        <ProductCard
          title="Changesets for VS Code"
          description="Manage changesets directly from VS Code and Cursor. Manual, AI-powered, or empty changesets — one command."
          link="https://open-vsx.org/extension/GreatSoftwareLLC/vscode-changesets"
          linkText="View on Open VSX →"
        />
      </section>
      <Footer />
    </>
  )
}
