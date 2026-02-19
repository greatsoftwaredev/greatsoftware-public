import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p><strong>Last updated:</strong> February 18, 2026</p>

      <p>
        Great Software LLC ("we," "us," or "our") operates software products and
        services including mobile applications, browser extensions, and websites.
        This Privacy Policy describes how we collect, use, and protect your
        information across all of our products and services.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Account Information</h3>
      <p>
        When you create an account in one of our applications, we may collect:
      </p>
      <ul>
        <li>Name or display name</li>
        <li>Email address</li>
        <li>Authentication tokens from third-party sign-in providers (Google, Apple)</li>
      </ul>

      <h3>Usage Data</h3>
      <p>
        We collect minimal data necessary to operate our services. This may include:
      </p>
      <ul>
        <li>Feature usage within our applications</li>
        <li>Device type and operating system version</li>
        <li>Crash reports (if you opt in)</li>
      </ul>

      <h3>Information We Do NOT Collect</h3>
      <ul>
        <li>We do not sell your personal information to third parties</li>
        <li>We do not collect location data</li>
        <li>We do not use third-party advertising or tracking SDKs</li>
        <li>We do not access your contacts, photos, or other device data beyond what is necessary for the specific product's functionality</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Provide and operate our products and services</li>
        <li>Authenticate your identity and maintain your account</li>
        <li>Send you notifications related to your use of our services (e.g., match notifications, pairing confirmations)</li>
        <li>Improve and maintain the quality of our services</li>
        <li>Respond to support requests</li>
      </ul>

      <h2>3. Data Sharing</h2>
      <p>
        We do not sell, rent, or share your personal information with third
        parties for marketing purposes. We may share information only in the
        following circumstances:
      </p>
      <ul>
        <li><strong>Service providers:</strong> We use third-party infrastructure providers (such as cloud hosting and authentication services) to operate our products. These providers process data on our behalf and are bound by their own privacy policies.</li>
        <li><strong>Legal requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
        <li><strong>Safety:</strong> We may disclose information to protect the rights, safety, or property of our users or the public.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data,
        including encrypted data transmission (TLS), row-level security policies
        on our databases, and secure authentication flows. However, no method of
        electronic storage or transmission is 100% secure.
      </p>

      <h2>5. Data Retention and Deletion</h2>
      <p>
        We retain your data only as long as your account is active or as needed
        to provide our services. You may request deletion of your account and
        associated data at any time by contacting us. When you delete your
        account, we will remove your personal data from our systems within 30
        days, except where retention is required by law.
      </p>

      <h2>6. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to or restrict certain processing</li>
        <li>Data portability</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:info@greatsoftware.dev">info@greatsoftware.dev</a>.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        Our products are not directed at children under the age of 13. We do not
        knowingly collect personal information from children under 13. If we
        become aware that we have collected such information, we will take steps
        to delete it promptly.
      </p>

      <h2>8. Third-Party Services</h2>
      <p>
        Our products may integrate with third-party services (such as Google
        Sign-In, Apple Sign-In, or API providers). These services have their own
        privacy policies, and we encourage you to review them. We are not
        responsible for the privacy practices of third-party services.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of material changes by updating the "Last updated" date at the top of
        this page. Your continued use of our products after changes are posted
        constitutes acceptance of the updated policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices,
        contact us at:
      </p>
      <p>
        Great Software LLC<br />
        Email: <a href="mailto:info@greatsoftware.dev">info@greatsoftware.dev</a><br />
        Website: <a href="https://greatsoftware.dev">greatsoftware.dev</a>
      </p>
    </LegalPage>
  )
}
