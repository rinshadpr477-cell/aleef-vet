import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FAQ | Aleef Veterinary Clinic",
  description:
    "Frequently asked questions about Aleef Veterinary Clinic — appointments, services, emergency care, and more.",
};

const faqs = [
  {
    id: "booking",
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment through our online contact form, by calling us on 02 674 7484, or by emailing hello@aleefvet.com. Our team will confirm availability and schedule a time that suits you.",
  },
  {
    id: "first-visit",
    question: "What should I bring to my pet's first visit?",
    answer:
      "Please bring any previous medical records, vaccination history, and a list of any medications your pet is currently taking. For dogs, please ensure they are on a lead; for cats, please use an appropriate carrier.",
  },
  {
    id: "services-offered",
    question: "What services does Aleef Veterinary offer?",
    answer:
      "We offer a comprehensive range of services including routine wellness check-ups, professional grooming, diagnostic ultrasound, general and specialist surgery, dental care, and exotic animal specialist consultations.",
  },
  {
    id: "feline-waiting",
    question: "Do you have separate waiting areas for cats?",
    answer:
      "Yes — we have dedicated feline-only waiting areas to reduce stress for your cat and other feline patients. Please let us know when booking if you are bringing a cat so we can prepare accordingly.",
  },
  {
    id: "exotic-animals",
    question: "Do you treat exotic animals?",
    answer:
      "Yes. Dr. Emily Roberts is our Exotics Specialist and sees birds, reptiles, small mammals, and other exotic pets. Please contact us in advance to confirm we can accommodate your specific pet.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, major credit and debit cards, and other payment methods. Please contact the clinic for detailed payment options. [Client: please confirm accepted payment methods before publication.]",
  },
  {
    id: "emergency",
    question: "What should I do in a pet emergency?",
    answer:
      "⚠️ Emergency Care — Pending Client Confirmation: Emergency contact details and procedures have not yet been confirmed by the client. This section will be updated before publication. In the meantime, if your pet is in distress, please call our main number (02 674 7484) during clinic hours. Outside of opening hours, please contact a 24-hour emergency animal hospital in your area.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20" id="main-content">
        <div className="container-main max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-sm" style={{ color: "var(--color-text-light)" }}>
              <li><Link href="/" className="hover:underline focus-ring rounded" style={{ color: "var(--color-primary)" }}>Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">FAQ</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "var(--color-text-dark)" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg mb-10" style={{ color: "var(--color-text-medium)" }}>
            Got a question? We have answered the most common ones below. Don&apos;t see what you&apos;re looking for? <a href="mailto:hello@aleefvet.com" className="font-semibold hover:underline focus-ring rounded" style={{ color: "var(--color-primary)" }}>Get in touch</a>.
          </p>

          {/* FAQ Accordion */}
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                id={faq.id}
                className="rounded-2xl overflow-hidden shadow-sm"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <dt>
                  <h2 className="m-0">
                    <span
                      className="flex items-start gap-3 p-5 w-full text-left font-bold text-base"
                      style={{
                        color: "var(--color-text-dark)",
                        backgroundColor: "var(--color-bg-light)",
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5"
                        style={{ backgroundColor: "var(--color-primary)" }}
                        aria-hidden="true"
                      >
                        Q
                      </span>
                      {faq.question}
                    </span>
                  </h2>
                </dt>
                <dd
                  className="p-5 text-sm leading-relaxed"
                  style={{
                    color: "var(--color-text-medium)",
                    backgroundColor: "white",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-12 p-6 rounded-2xl text-center"
            style={{ backgroundColor: "var(--color-bg-section)" }}
          >
            <h2 className="text-lg font-bold mb-2" style={{ color: "var(--color-text-dark)" }}>
              Still have questions?
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--color-text-medium)" }}>
              Our friendly team is here to help.
            </p>
            <Link href="/#contact" className="btn-primary focus-ring" style={{ color: "var(--color-text-dark)" }}>
              Contact Us
            </Link>
          </div>

          <div className="mt-8">
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
