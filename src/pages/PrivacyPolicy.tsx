
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy" subtitle="Last updated: April 1, 2025">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p>
            CodeScribe ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website, products, and services.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-lg font-medium mb-2">2.1 Personal Information</h3>
          <p>
            We may collect personal information that you provide directly to us, such as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name, email address, and contact details</li>
            <li>Username and password</li>
            <li>Profile information</li>
            <li>Payment information</li>
            <li>Content you create, upload, or share</li>
            <li>Communications with us</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2.2 Usage Information</h3>
          <p>
            When you access or use our services, we automatically collect information about you, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Log data (IP address, browser type, pages visited, etc.)</li>
            <li>Device information</li>
            <li>Usage patterns and preferences</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent security incidents</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@codescribe.com<br />
            Address: 123 Documentation Lane, Code City, 94043
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
