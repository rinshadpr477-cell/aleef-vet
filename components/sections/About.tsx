"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const features = [
  "Stress-free handling techniques",
  "State-of-the-art facility",
  "Dedicated feline-only waiting areas",
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Setting once: true makes it play only the first time; once: false allows fading out and in on each scroll.
  const viewportConfig = { once: false, amount: 0.3 } as const;

  const textMotionProps = (stepIndex: number) => ({
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : isMobile
      ? { opacity: 0, y: 24, x: 0 }
      : { opacity: 0, x: 40, y: 0 },
    whileInView: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, x: 0, y: 0 },
    viewport: viewportConfig,
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.6,
      delay: shouldReduceMotion ? 0 : 0.3 + stepIndex * 0.12,
      ease: "easeOut" as const,
    },
    style: { willChange: "transform, opacity" },
  });

  return (
    <section
      id="about"
      className="relative w-full bg-[#E4EAF6] py-14 lg:py-20 scroll-mt-[80px] overflow-x-clip"
      style={{ backgroundColor: "#E4EAF6", overflowX: "clip" }}
      aria-labelledby="about-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Column: Image with Floating Stat Badge */}
          <div className="relative w-full lg:max-w-[520px] pb-6 lg:pb-0 flex-shrink-0">
            {/* 1. Main Image (blur-in from above) */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: isMobile ? -30 : -60,
                      filter: isMobile ? "blur(8px)" : "blur(14px)",
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }
              }
              viewport={viewportConfig}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 1,
                ease: "easeOut",
              }}
              className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-[24px] overflow-hidden"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0px 16px 28px -6px rgba(0, 0, 0, 0.1), 0px 8px 12px -6px rgba(0, 0, 0, 0.08)",
                willChange: "transform, opacity, filter",
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
            </motion.div>

            {/* 2. Floating Gold "15+ Years" Badge (delay 0.6s) */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.85, y: 20 }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              viewport={viewportConfig}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.6,
                ease: "easeOut",
              }}
              className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 bg-[#F5C842] rounded-[20px] p-5 sm:p-6 w-[220px] sm:w-[260px] flex flex-col items-start gap-1 z-10"
              style={{
                backgroundColor: "#F5C842",
                borderRadius: "20px",
                boxShadow:
                  "0px 10px 18px -4px rgba(0, 0, 0, 0.12), 0px 4px 8px -4px rgba(0, 0, 0, 0.08)",
                willChange: "transform, opacity",
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
            </motion.div>
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col items-start gap-5 lg:gap-6 w-full lg:max-w-[620px]">
            {/* Heading 2 */}
            <motion.h2
              id="about-heading"
              {...textMotionProps(0)}
              className="font-quicksand font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#203E7D]"
              style={{ color: "#203E7D", willChange: "transform, opacity" }}
            >
              A Veterinary Clinic That Feels Like Home.
            </motion.h2>

            {/* Subtitle / Paragraph */}
            <motion.p
              {...textMotionProps(1)}
              className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942]"
              style={{ color: "#404942", willChange: "transform, opacity" }}
            >
              At Aleef Veterinary, we believe going to the vet shouldn&apos;t be
              stressful for you or your pet. We&apos;ve designed our practice around
              comfort, clear communication, and top-tier medical care.
            </motion.p>

            {/* Feature Bullet List */}
            <ul className="flex flex-col gap-3.5 py-1">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  {...textMotionProps(2 + idx)}
                  className="flex flex-row items-center gap-3"
                  style={{ willChange: "transform, opacity" }}
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
                </motion.li>
              ))}
            </ul>

            {/* Learn More Button */}
            <motion.div {...textMotionProps(5)}>
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
