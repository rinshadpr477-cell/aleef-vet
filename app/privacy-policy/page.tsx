import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Aleef Veterinary Clinic",
  description:
    "Read the Privacy Policy for Aleef Veterinary Clinic. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20" id="main-content">
        <div className="container-main max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-sm" style={{ color: "var(--color-text-light)" }}>
              <li><Link href="/" className="hover:underline focus-ring rounded" style={{ color: "var(--color-primary)" }}>Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Privacy Policy</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: "var(--color-text-dark)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-light)" }}>
            Last updated: October 2026
          </p>

          {/* Client approval notice */}
          <div
            className="p-4 rounded-xl mb-10 text-sm"
            style={{
              backgroundColor: "#fff8e1",
              border: "1px solid #ffe082",
              color: "#7d5200",
            }}
            role="note"
          >
            <strong>Note for client review:</strong> The legal content below is a draft template. It must be reviewed and approved by the clinic and, where appropriate, legal counsel before publication. Highlighted sections require clinic-specific information.
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-base leading-relaxed" style={{ color: "var(--color-text-medium)" }}>
            <section aria-labelledby="pp-intro">
              <h2 id="pp-intro" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>1. Introduction</h2>
              <p>Aleef Veterinary Clinic (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy of our clients and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            </section>

            <section aria-labelledby="pp-collect">
              <h2 id="pp-collect" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Contact information</strong>: Name, email address, phone number, and postal address when provided through our contact form or during clinic visits.</li>
                <li><strong>Pet information</strong>: Information about your pets provided for the purposes of veterinary care.</li>
                <li><strong>Communication records</strong>: Records of correspondence between you and the clinic.</li>
                <li><strong>Website usage data</strong>: Standard server logs and, where applicable, anonymised analytics data.</li>
              </ul>
            </section>

            <section aria-labelledby="pp-use">
              <h2 id="pp-use" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Respond to your enquiries and appointment requests.</li>
                <li>Provide veterinary services and maintain clinical records.</li>
                <li>Send service-related communications where required.</li>
                <li>Improve our website and services.</li>
              </ul>
            </section>

            <section aria-labelledby="pp-share">
              <h2 id="pp-share" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>4. Sharing Your Information</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website or providing services, subject to confidentiality obligations.</p>
            </section>

            <section aria-labelledby="pp-rights">
              <h2 id="pp-rights" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>5. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have rights to access, correct, or request deletion of your personal data. To exercise these rights, please contact us at{" "}
                <a href="mailto:hello@aleefvet.com" className="focus-ring rounded" style={{ color: "var(--color-primary)" }}>hello@aleefvet.com</a>.
              </p>
            </section>

            <section aria-labelledby="pp-contact">
              <h2 id="pp-contact" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>6. Contact Us</h2>
              <p>For privacy-related questions, contact us at:<br />
                <strong>Aleef Veterinary Clinic</strong><br />
                123 Pet Lane, Abu Dhabi<br />
                <a href="mailto:hello@aleefvet.com" className="focus-ring rounded" style={{ color: "var(--color-primary)" }}>hello@aleefvet.com</a><br />
                <a href="tel:026747484" className="focus-ring rounded" style={{ color: "var(--color-primary)" }}>02 674 7484</a>
              </p>
            </section>
          </div>

          <div className="mt-10">
            <Link href="/" className="btn-outline-primary focus-ring inline-flex">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
