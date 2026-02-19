import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p><strong>Last updated:</strong> February 18, 2026</p>

      <p>
        These Terms of Service ("Terms") govern your use of products and services
        provided by Great Software LLC ("we," "us," or "our"), including our
        mobile applications, browser extensions, and websites. By using our
        products, you agree to these Terms.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using any of our products or services, you agree to be
        bound by these Terms. If you do not agree, do not use our products.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        Great Software LLC develops and operates software products including but
        not limited to mobile applications and development tools. Specific
        features and availability may vary by product and may change over time.
      </p>

      <h2>3. Accounts</h2>
      <p>
        Some of our products require you to create an account. You are
        responsible for:
      </p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activity that occurs under your account</li>
        <li>Notifying us immediately of any unauthorized use of your account</li>
      </ul>
      <p>
        We reserve the right to suspend or terminate accounts that violate these
        Terms.
      </p>

      <h2>4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use our products for any unlawful purpose</li>
        <li>Attempt to interfere with or disrupt our services or infrastructure</li>
        <li>Reverse engineer, decompile, or disassemble our products except where permitted by law</li>
        <li>Use automated systems to access our services in a manner that exceeds reasonable use</li>
        <li>Harass, abuse, or harm other users through our products</li>
        <li>Impersonate another person or entity</li>
      </ul>

      <h2>5. Purchases and Payments</h2>
      <p>
        Some of our products or features may require payment. All purchases are
        processed through the applicable platform (Apple App Store, Google Play
        Store, or other distribution platforms). Pricing, refund policies, and
        billing are subject to the terms of those platforms.
      </p>
      <p>
        We reserve the right to change pricing for our products at any time.
        Price changes will not affect existing purchases.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content, code, designs, trademarks, and other intellectual property
        in our products are owned by Great Software LLC or our licensors. You may
        not copy, modify, distribute, or create derivative works from our
        products except as expressly permitted.
      </p>

      <h2>7. User Content</h2>
      <p>
        Where our products allow you to submit or store content (such as display
        names or other user-generated data), you retain ownership of that
        content. By submitting content, you grant us a limited license to store
        and process it as necessary to provide the service.
      </p>

      <h2>8. Privacy</h2>
      <p>
        Your use of our products is also governed by our{' '}
        <a href="/privacy">Privacy Policy</a>, which describes how we collect,
        use, and protect your information.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        Our products are provided "as is" and "as available" without warranties
        of any kind, either express or implied, including but not limited to
        implied warranties of merchantability, fitness for a particular purpose,
        and non-infringement.
      </p>
      <p>
        We do not guarantee that our products will be uninterrupted, error-free,
        or secure.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Great Software LLC shall not be
        liable for any indirect, incidental, special, consequential, or punitive
        damages, or any loss of profits or revenue, whether incurred directly or
        indirectly, or any loss of data, use, goodwill, or other intangible
        losses resulting from your use of our products.
      </p>
      <p>
        Our total liability for any claims arising from or related to these Terms
        or our products shall not exceed the amount you paid us in the 12 months
        preceding the claim.
      </p>

      <h2>11. Termination</h2>
      <p>
        You may stop using our products at any time. We may suspend or terminate
        your access to our products at any time for any reason, including
        violation of these Terms. Upon termination, your right to use our
        products ceases immediately.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of
        the State of Utah, without regard to conflict of law principles. Any
        disputes arising from these Terms shall be resolved in the courts located
        in Utah.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of
        material changes by updating the "Last updated" date at the top of this
        page. Your continued use of our products after changes are posted
        constitutes acceptance of the updated Terms.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        If you have questions about these Terms, contact us at:
      </p>
      <p>
        Great Software LLC<br />
        Email: <a href="mailto:info@greatsoftware.dev">info@greatsoftware.dev</a><br />
        Website: <a href="https://greatsoftware.dev">greatsoftware.dev</a>
      </p>
    </LegalPage>
  )
}
