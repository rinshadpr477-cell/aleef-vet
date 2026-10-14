import { Quote, PawPrint } from "lucide-react";

const testimonials = [
  {
    id: "review-1",
    name: "Sarah & Max",
    pet: "Golden Retriever Owner",
    review:
      "The care and attention our golden retriever received was exceptional. The staff was patient, thorough, and genuinely loving.",
    avatarBg: "var(--color-primary)",
    avatarColor: "#ffffff",
  },
  {
    id: "review-2",
    name: "Ahmed & Bella",
    pet: "Persian Cat Owner",
    review:
      "From the front desk to the examination room, everyone made us feel comfortable. My cat wasn't stressed at all during the visit.",
    avatarBg: "var(--color-accent)",
    avatarColor: "#78350F",
  },
  {
    id: "review-3",
    name: "Elena & Charlie",
    pet: "French Bulldog Owner",
    review:
      "Professional, clean, and truly compassionate. Having a trusted vet in Abu Dhabi gives us complete peace of mind.",
    avatarBg: "var(--color-blue-accent)",
    avatarColor: "#ffffff",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--color-bg-testimonial)" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "var(--color-primary)" }}
          >
            What Pet Owners Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              aria-label={`Review by ${testimonial.name}`}
            >
              <div>
                {/* Top Quote Badge */}
                <div className="flex justify-end mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#E0F2FE" }}
                    aria-hidden="true"
                  >
                    <Quote
                      className="w-5 h-5"
                      style={{ color: "var(--color-blue-accent)" }}
                    />
                  </div>
                </div>

                {/* Review text */}
                <p
                  className="text-sm leading-relaxed mb-8 text-slate-700"
                >
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    backgroundColor: testimonial.avatarBg,
                    color: testimonial.avatarColor,
                  }}
                  aria-hidden="true"
                >
                  <PawPrint className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    {testimonial.pet}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
