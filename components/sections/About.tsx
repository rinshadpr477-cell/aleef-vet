import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const features = [
  "Stress-free handling techniques",
  "State-of-the-art facility",
  "Dedicated feline-only waiting areas",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#E4EAF6] py-14 lg:py-20 scroll-mt-[80px]"
      style={{ backgroundColor: "#E4EAF6" }}
      aria-labelledby="about-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Column: Image with Floating Stat Badge */}
          <Reveal
            delay={0}
            y={24}
            duration={0.6}
            className="relative w-full lg:max-w-[520px] pb-6 lg:pb-0 flex-shrink-0"
          >
            {/* Image Container */}
            <div
              className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-[24px] overflow-hidden"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0px 16px 28px -6px rgba(0, 0, 0, 0.1), 0px 8px 12px -6px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Image
                src="/about-vet.jpg"
                alt="Compassionate veterinarian gently examining a puppy in a modern clinic"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 540px"
                priority
              />
            </div>

            {/* Floating Gold "15+ Years" Badge */}
            <div
              className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 bg-[#F5C842] rounded-[20px] p-5 sm:p-6 w-[220px] sm:w-[260px] flex flex-col items-start gap-1 z-10"
              style={{
                backgroundColor: "#F5C842",
                borderRadius: "20px",
                boxShadow:
                  "0px 10px 18px -4px rgba(0, 0, 0, 0.12), 0px 4px 8px -4px rgba(0, 0, 0, 0.08)",
              }}
              aria-label="15 plus years of compassionate care in the community"
            >
              <span
                className="font-quicksand font-bold text-2xl sm:text-[26px] leading-tight text-[#004527]"
                style={{ color: "#004527" }}
              >
                15+ Years
              </span>
              <p
                className="font-quicksand font-normal text-xs sm:text-[14px] leading-snug text-[#004527]"
                style={{ color: "#004527" }}
              >
                of compassionate care in the community.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Text Content */}
          <Reveal
            delay={0.15}
            y={24}
            duration={0.6}
            className="flex flex-col items-start gap-5 lg:gap-6 w-full lg:max-w-[620px]"
          >
            {/* Heading 2 */}
            <h2
              id="about-heading"
              className="font-quicksand font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#203E7D]"
              style={{ color: "#203E7D" }}
            >
              A Veterinary Clinic That Feels Like Home.
            </h2>

            {/* Subtitle / Paragraph */}
            <p
              className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942]"
              style={{ color: "#404942" }}
            >
              At Aleef Veterinary, we believe going to the vet shouldn&apos;t be
              stressful for you or your pet. We&apos;ve designed our practice around
              comfort, clear communication, and top-tier medical care.
            </p>

            {/* Feature Bullet List */}
            <ul className="flex flex-col gap-3.5 py-1">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex flex-row items-center gap-3"
                >
                  <PawPrint
                    className="w-5 h-5 text-[#F5C842] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span
                    className="font-quicksand font-normal text-[15px] sm:text-[16px] leading-[25px] text-[#404942]"
                    style={{ color: "#404942" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Learn More Button */}
            <Link
              href="#services"
              className="inline-flex items-center justify-center px-7 py-3 bg-[#203E7D] hover:bg-[#183063] rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 mt-2"
              style={{
                backgroundColor: "#203E7D",
                borderRadius: "9999px",
              }}
            >
              <span
                className="font-quicksand font-semibold text-sm sm:text-[15px] leading-normal text-[#F5C842] text-center"
                style={{ color: "#F5C842" }}
              >
                Learn More About Us
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
