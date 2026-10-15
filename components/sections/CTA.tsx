import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-14 lg:py-20 text-center relative overflow-hidden"
      style={{
        backgroundColor: "#203E7D",
      }}
      aria-labelledby="cta-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Reveal
          delay={0}
          y={24}
          duration={0.6}
          className="flex flex-col items-center max-w-[640px] mx-auto text-center"
        >
          <h2
            id="cta-heading"
            className="font-quicksand font-bold text-2xl sm:text-3xl lg:text-[36px] text-white leading-tight mb-3"
          >
            Your Pet Deserves the Best Care
          </h2>
          <p className="font-quicksand font-medium text-slate-200 text-base sm:text-[17px] leading-relaxed max-w-[580px] mx-auto mb-8">
            Schedule your visit today and give your pet the compassionate,
            high-quality care they deserve.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-center font-quicksand font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: "#F5C842",
              color: "#012779",
              borderRadius: "9999px",
            }}
          >
            Book an Appointment Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
