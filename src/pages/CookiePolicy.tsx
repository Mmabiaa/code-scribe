
import Layout from "@/components/Layout";

const CookiePolicy = () => {
  return (
    <Layout title="Cookie Policy" subtitle="Last updated: April 1, 2025">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p>
            We use cookies for a variety of reasons, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>To authenticate users and remember their preferences</li>
            <li>To analyze how our website is used</li>
            <li>To personalize your experience</li>
            <li>To improve our website and services</li>
            <li>To provide targeted advertising</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          
          <h3 className="text-lg font-medium mb-2">3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
          </p>

          <h3 className="text-lg font-medium mb-2">3.2 Analytical/Performance Cookies</h3>
          <p>
            These cookies allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works.
          </p>

          <h3 className="text-lg font-medium mb-2">3.3 Functionality Cookies</h3>
          <p>
            These cookies enable the website to remember choices you make and provide enhanced, personalized features.
          </p>

          <h3 className="text-lg font-medium mb-2">3.4 Targeting Cookies</h3>
          <p>
            These cookies record your visit to our website, the pages you have visited, and the links you have followed to deliver advertisements more relevant to your interests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
          </p>
          <p>
            Please note that if you choose to disable cookies, some features of our website may not function properly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;
