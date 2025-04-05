
import Layout from "@/components/Layout";

const TermsOfService = () => {
  return (
    <Layout title="Terms of Service" subtitle="Last updated: April 1, 2025">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using CodeScribe services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of our services after any such changes constitutes your acceptance of the new Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
          <p>
            When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Acceptable Use</h2>
          <p>
            You agree not to use the service:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>In any way that violates any applicable laws or regulations</li>
            <li>To transmit or upload any material that contains viruses or other harmful code</li>
            <li>To impersonate or attempt to impersonate another person or entity</li>
            <li>To interfere with or disrupt the service or servers connected to the service</li>
            <li>To collect or track personal information of other users</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property of CodeScribe and its licensors. The service is protected by copyright, trademark, and other laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including if you breach the Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: legal@codescribe.com<br />
            Address: 123 Documentation Lane, Code City, 94043
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default TermsOfService;
