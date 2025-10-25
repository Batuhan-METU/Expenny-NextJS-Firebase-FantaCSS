"use client";

export default function PrivacyPage() {
  return (
    <div className="privacy-container">
      <section className="privacy-section">
        <h2>Privacy Policy</h2>
        <p>Last Updated: October 2025</p>

        <p>
          At <strong>Expenny</strong>, we respect your privacy and are committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, and safeguard your data when you use our
          subscription tracking service.
        </p>

        <h3>Information We Collect</h3>
        <ul>
          <li>Email and authentication details for account access.</li>
          <li>
            Subscription information you add (name, category, cost, billing
            frequency).
          </li>
          <li>Optional notes and preferences related to your subscriptions.</li>
        </ul>

        <h3>How We Use Your Information</h3>
        <ul>
          <li>
            To provide and maintain your account and subscriptions dashboard.
          </li>
          <li>
            To send updates or notifications regarding your subscriptions.
          </li>
          <li>To improve the features and functionality of Expenny.</li>
        </ul>

        <h3>Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your
          information. However, no method of transmission or storage is
          completely secure.
        </p>

        <h3>Third-Party Services</h3>
        <p>
          We do not sell or share your personal information with third parties
          for marketing purposes. Firebase is used as a backend service to store
          authentication and subscription data securely.
        </p>

        <h3>Cookies</h3>
        <p>
          Expenny uses minimal cookies or local storage only for authentication
          and session purposes.
        </p>

        <h3>Changes to this Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. All changes will
          be reflected on this page.
        </p>

        <p>
          If you have any questions, contact us at{" "}
          <strong>support@expenny.com</strong>.
        </p>
      </section>
    </div>
  );
}
