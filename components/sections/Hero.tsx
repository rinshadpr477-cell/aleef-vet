import Image from "next/image";
import { Star, BadgeCheck, Heart, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Full-bleed Hero Section */}
      <section
        id="home"
        className="pt-24 lg:pt-28 pb-14 lg:pb-16 bg-[#1F3D7C] text-white relative overflow-hidden"
        aria-label="Hero section"
      >
        {/* Soft luminous radial glow in top right matching reference */}
        <div
          className="absolute -top-12 -right-12 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle at 75% 25%, rgba(186, 230, 253, 0.55) 0%, rgba(56, 189, 248, 0.25) 35%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column — Starts at the left corner */}
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-5 text-[#F4C842]">
                PROACTIVE PET WELLNESS
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] mb-6 tracking-tight">
                Caring for Your Pets,
                <br />
                <span className="text-[#F4C842]">Every Step</span> of the Way.
              </h1>

              <p className="text-white text-base sm:text-lg leading-relaxed mb-9 max-w-xl font-normal opacity-95">
                From kitten visits to senior care, we provide compassionate,
                <br className="hidden sm:inline" />
                modern veterinary services to keep your furry family
                <br className="hidden sm:inline" />
                members healthy and happy.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#F4C842] hover:bg-[#e6b933] text-[#1F3D7C] font-bold px-7 py-3.5 rounded-full text-base transition-all shadow-sm focus-ring"
                >
                  Book an Appointment
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center bg-[#1F3D7C] border-2 border-white hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full text-base transition-all focus-ring"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Right Image Column — Sits flush to the right corner */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] rounded-[32px] overflow-hidden shadow-2xl bg-[#1F3D7C]">
                <Image
                  src="/hero-consultation.png"
                  alt="Veterinarian with tablet consulting with a pet owner and a large white dog"
                  width={454}
                  height={400}
                  priority
                  className="w-full h-auto object-cover rounded-[32px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Golden Trust Strip — Full Bleed, items start from each end */}
      <div
        className="w-full bg-[#F4C842] py-4 sm:py-5 border-t border-[#e2b733]"
        aria-label="Trust highlights"
      >
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#1F3D7C]">
            {/* 500+ Five-Star Reviews — Starts from the left end */}
            <div className="flex items-center justify-start gap-2.5 py-1">
              <div className="flex gap-1 text-[#1F3D7C]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#1F3D7C] stroke-none"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm sm:text-base font-bold text-[#1F3D7C] whitespace-nowrap">
                500+ Five-Star Reviews
              </span>
            </div>

            {/* Subtle Divider 1 */}
            <div className="hidden md:block h-6 w-[1.5px] bg-[#cca229]" aria-hidden="true" />

            {/* Certified Professionals — Positioned in the middle */}
            <div className="flex items-center justify-center gap-2.5 py-1">
              <BadgeCheck className="w-5 h-5 text-[#1F3D7C] stroke-[2.2]" aria-hidden="true" />
              <span className="text-sm sm:text-base font-bold text-[#1F3D7C] whitespace-nowrap">
                Certified Professionals
              </span>
            </div>

            {/* Subtle Divider 2 */}
            <div className="hidden md:block h-6 w-[1.5px] bg-[#cca229]" aria-hidden="true" />

            {/* Fear-Free Certified — Ends at the right end */}
            <div className="flex items-center justify-end gap-2.5 py-1">
              <Heart className="w-5 h-5 text-[#1F3D7C] stroke-[2.2]" aria-hidden="true" />
              <span className="text-sm sm:text-base font-bold text-[#1F3D7C] whitespace-nowrap">
                Fear-Free Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
