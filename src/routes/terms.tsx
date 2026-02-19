import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>Terms of service content coming soon.</p>
      <p>Last updated: February 2026</p>
    </LegalPage>
  )
}
