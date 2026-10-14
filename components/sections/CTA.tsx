export default function CTA() {
  return (
    <section
      id="cta"
      className="py-16 md:py-20 text-center"
      style={{
        backgroundColor: "var(--color-primary)",
      }}
      aria-labelledby="cta-heading"
    >
      <div className="container-main">
        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl font-extrabold text-white mb-4"
        >
          Your Pet Deserves the Best Care
        </h2>
        <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Schedule your visit today and give your pet the compassionate,
          high-quality care they deserve.
        </p>

        <a
          href="#contact"
          className="btn-gold focus-ring"
        >
          Book an Appointment Now
        </a>
      </div>
    </section>
  );
}
