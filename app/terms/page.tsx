import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Aleef Veterinary Clinic",
  description:
    "Read the Terms of Service for Aleef Veterinary Clinic. Understand the terms that govern use of our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20" id="main-content">
        <div className="container-main max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-sm" style={{ color: "var(--color-text-light)" }}>
              <li><Link href="/" className="hover:underline focus-ring rounded" style={{ color: "var(--color-primary)" }}>Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Terms of Service</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: "var(--color-text-dark)" }}>
            Terms of Service
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-light)" }}>
            Last updated: October 2026
          </p>

          <div
            className="p-4 rounded-xl mb-10 text-sm"
            style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082", color: "#7d5200" }}
            role="note"
          >
            <strong>Note for client review:</strong> This is a draft template requiring review and approval by the clinic and appropriate legal counsel before publication.
          </div>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--color-text-medium)" }}>
            <section aria-labelledby="tos-acceptance">
              <h2 id="tos-acceptance" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>1. Acceptance of Terms</h2>
              <p>By accessing or using the Aleef Veterinary Clinic website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
            </section>

            <section aria-labelledby="tos-services">
              <h2 id="tos-services" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>2. Use of the Website</h2>
              <p>This website is provided for informational purposes and to facilitate communication with our clinic. You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of others.</p>
            </section>

            <section aria-labelledby="tos-appointments">
              <h2 id="tos-appointments" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>3. Appointments and Services</h2>
              <p>Submitting the contact form does not guarantee an appointment. All appointments are subject to availability and confirmation by our team. Clinical advice on this website is general in nature and does not substitute for a professional veterinary consultation.</p>
            </section>

            <section aria-labelledby="tos-liability">
              <h2 id="tos-liability" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>4. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Aleef Veterinary Clinic shall not be liable for any indirect, incidental, or consequential damages arising out of your use of this website or reliance on its content.</p>
            </section>

            <section aria-labelledby="tos-changes">
              <h2 id="tos-changes" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>5. Changes to These Terms</h2>
              <p>We reserve the right to update these Terms of Service at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>
            </section>

            <section aria-labelledby="tos-contact">
              <h2 id="tos-contact" className="text-xl font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>6. Contact</h2>
              <p>Questions about these terms can be directed to{" "}
                <a href="mailto:hello@aleefvet.com" className="focus-ring rounded" style={{ color: "var(--color-primary)" }}>hello@aleefvet.com</a>.
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
