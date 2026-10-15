"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

function ScissorsIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px] md:w-[33.75px] md:h-[33.75px] flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="9" cy="25" r="5" stroke="#02236B" strokeWidth="2.4" />
      <circle cx="25" cy="25" r="5" stroke="#02236B" strokeWidth="2.4" />
      <path
        d="M12.5 21.5L25 6M21.5 21.5L9 6"
        stroke="#02236B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[24px] h-[30px] md:w-[27px] md:h-[33.75px] flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M14 2L2 6.5V16C2 24.5 7.5 30.5 14 32C20.5 30.5 26 24.5 26 16V6.5L14 2Z"
        stroke="#C3A333"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10V18M10 14H18"
        stroke="#C3A333"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BandageIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px] md:w-[33.67px] md:h-[33.67px] flex-shrink-0"
      aria-hidden="true"
    >
      <rect
        x="5.5"
        y="12"
        width="23"
        height="10"
        rx="5"
        transform="rotate(-45 17 17)"
        stroke="#02236B"
        strokeWidth="2.4"
      />
      <circle cx="17" cy="17" r="1.5" fill="#02236B" />
      <circle cx="14" cy="14" r="1.5" fill="#02236B" />
      <circle cx="20" cy="20" r="1.5" fill="#02236B" />
    </svg>
  );
}

function UltrasoundIcon() {
  return (
    <svg
      width="34"
      height="28"
      viewBox="0 0 34 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[24px] md:w-[33.75px] md:h-[27px] flex-shrink-0"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="30"
        height="24"
        rx="4"
        stroke="#B08900"
        strokeWidth="2.4"
      />
      <path
        d="M5 14H10L13 7L17 21L21 11L24 14H29"
        stroke="#B08900"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const services = [
  {
    id: "grooming",
    icon: ScissorsIcon,
    iconBg: "rgba(2, 35, 107, 0.20)",
    title: "Grooming",
    description:
      "Professional grooming services to keep your pet looking and feeling their absolute best.",
  },
  {
    id: "checkup",
    icon: ShieldIcon,
    iconBg: "#FFF2CC",
    title: "Check-up",
    description:
      "Routine wellness exams to catch issues early and ensure long-term health and vitality.",
  },
  {
    id: "surgery",
    icon: BandageIcon,
    iconBg: "#E5F1FF",
    title: "Surgery",
    description:
      "State-of-the-art surgical suites equipped for both routine and complex procedures.",
  },
  {
    id: "ultrasound",
    icon: UltrasoundIcon,
    iconBg: "#FFF2CC",
    title: "Ultrasound",
    description:
      "Advanced diagnostic imaging allowing for non- invasive internal examinations.",
  },
];

export default function Services() {
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

  const half = services.length / 2;

  return (
    <section
      id="services"
      className="relative w-full bg-[#F0F5FD] py-14 lg:py-20 scroll-mt-[80px] overflow-x-clip"
      style={{ backgroundColor: "#F0F5FD", overflowX: "clip" }}
      aria-labelledby="services-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Section Header */}
        <Reveal
          delay={0}
          y={24}
          duration={0.6}
          className="w-full text-center mb-10 lg:mb-14 flex flex-col items-center gap-3"
        >
          <h2
            id="services-heading"
            className="font-quicksand font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#203E7D]"
            style={{ color: "#203E7D" }}
          >
            Comprehensive Care
          </h2>
          <p
            className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942] max-w-[640px] text-center"
            style={{ color: "#404942" }}
          >
            We offer a full spectrum of veterinary services designed to address every aspect of your pet&apos;s health.
          </p>
        </Reveal>

        {/* 4 Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isLeft = idx < half;
            const initialX = isLeft ? -80 : 80;

            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : isMobile
                    ? { opacity: 0, y: 30 }
                    : { opacity: 0, x: initialX }
                }
                whileInView={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : isMobile
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.7,
                  delay: idx * 0.12,
                  ease: "easeOut",
                }}
                className="h-full flex"
              >
                <div
                  className="w-full bg-white rounded-[24px] p-6 sm:p-7 flex flex-col items-start gap-4 shadow-sm h-full card-interactive-hover"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(2, 35, 107, 0.12)",
                    boxShadow: "0px 4px 20px rgba(27, 94, 59, 0.04)",
                    borderRadius: "24px",
                  }}
                  aria-label={service.title}
                >
                  {/* Icon Circle */}
                  <div
                    className="w-[64px] h-[64px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: service.iconBg,
                      width: "64px",
                      height: "64px",
                      borderRadius: "9999px",
                    }}
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>

                  {/* Heading 3 */}
                  <div className="pt-1 w-full">
                    <h3
                      className="font-quicksand font-semibold text-lg sm:text-[20px] leading-snug text-[#009AE8]"
                      style={{ color: "#009AE8" }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="w-full flex-grow">
                    <p
                      className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[23px] text-[#404942]"
                      style={{ color: "#404942" }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
