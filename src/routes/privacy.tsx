import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Privacy policy content coming soon.</p>
      <p>Last updated: February 2026</p>
    </LegalPage>
  )
}
