"use client";

import React, { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  motionDurations,
  motionEasing,
  motionStagger,
  motionOffsets,
  defaultViewport,
} from "@/lib/motion";

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const getIsDesktopSnapshot = () => window.innerWidth >= 768;
const getIsDesktopServerSnapshot = () => false;

function AwardIcon() {
  return (
    <svg
      width="26"
      height="34"
      viewBox="0 0 26 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[22px] h-[28px] md:w-[25.32px] md:h-[33.23px] flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="13" cy="13" r="11.5" stroke="#F0C051" strokeWidth="2.5" />
      <path
        d="M13 7.5L14.4 11.2H18.2L15.1 13.5L16.3 17.2L13 14.8L9.7 17.2L10.9 13.5L7.8 11.2H11.6L13 7.5Z"
        fill="#F0C051"
      />
      <path
        d="M8.5 22.5L7 32L13 28.5L19 32L17.5 22.5"
        stroke="#F0C051"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[24px] h-[24px] md:w-[28.57px] md:h-[28.48px] flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M11 2.5H18M14.5 2.5V11L4.5 24.5C3.8 25.5 4.5 27 5.8 27H23.2C24.5 27 25.2 25.5 24.5 24.5L14.5 11"
        stroke="#203E7D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 19H20.5"
        stroke="#203E7D"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="32"
      height="29"
      viewBox="0 0 32 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[26px] h-[24px] md:w-[31.65px] md:h-[29.04px] flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M16 26.5L14.2 24.8C6.8 18.2 2 13.8 2 8.5C2 4.2 5.4 0.8 9.7 0.8C12.1 0.8 14.4 1.9 16 3.7C17.6 1.9 19.9 0.8 22.3 0.8C26.6 0.8 30 4.2 30 8.5C30 13.8 25.2 18.2 17.8 24.8L16 26.5Z"
        stroke="#203E7D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg
      width="38"
      height="36"
      viewBox="0 0 38 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[28px] md:w-[37.97px] md:h-[36.39px] flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="19" cy="18" r="4.5" fill="#F0C051" />
      <circle cx="7" cy="9" r="3.5" stroke="#F0C051" strokeWidth="2.5" />
      <circle cx="7" cy="27" r="3.5" stroke="#F0C051" strokeWidth="2.5" />
      <circle cx="31" cy="9" r="3.5" stroke="#F0C051" strokeWidth="2.5" />
      <circle cx="31" cy="27" r="3.5" stroke="#F0C051" strokeWidth="2.5" />
      <line
        x1="15.5"
        y1="15"
        x2="10"
        y2="11"
        stroke="#F0C051"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="15.5"
        y1="21"
        x2="10"
        y2="25"
        stroke="#F0C051"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="22.5"
        y1="15"
        x2="28"
        y2="11"
        stroke="#F0C051"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="22.5"
        y1="21"
        x2="28"
        y2="25"
        stroke="#F0C051"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const features = [
  {
    id: "experienced-care",
    icon: AwardIcon,
    title: "Experienced Care",
    description:
      "Our team brings years of expertise to provide the best possible care for your pets.",
    iconBg: "rgba(240, 192, 81, 0.20)",
    glowColor: "rgba(240, 192, 81, 0.55)",
  },
  {
    id: "modern-equipment",
    icon: FlaskIcon,
    title: "Modern Equipment",
    description:
      "We use the latest veterinary technology for accurate diagnosis and effective treatments.",
    iconBg: "rgba(32, 62, 125, 0.20)",
    glowColor: "rgba(32, 62, 125, 0.45)",
  },
  {
    id: "gentle-compassionate",
    icon: HeartIcon,
    title: "Gentle & Compassionate",
    description:
      "Every pet is treated with the same love and kindness we give our own.",
    iconBg: "rgba(32, 62, 125, 0.20)",
    glowColor: "rgba(32, 62, 125, 0.45)",
  },
  {
    id: "complete-pet-care",
    icon: NodeIcon,
    title: "Complete Pet Care",
    description:
      "From routine check-ups to complex surgeries, we handle all your pet's needs under one roof.",
    iconBg: "rgba(240, 192, 81, 0.20)",
    glowColor: "rgba(240, 192, 81, 0.55)",
  },
];

function FeatureCard({
  feature,
  Icon,
  initialX,
  initialY,
  cardDelay,
  iconDelay,
  titleDelay,
  descDelay,
  shouldReduceMotion,
}: {
  feature: (typeof features)[0];
  Icon: React.ComponentType;
  initialX: number;
  initialY: number;
  cardDelay: number;
  iconDelay: number;
  titleDelay: number;
  descDelay: number;
  shouldReduceMotion: boolean;
}) {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <motion.article
      id={feature.id}
      initial={
        shouldReduceMotion ? false : { opacity: 0, x: initialX, y: initialY }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={defaultViewport}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.8,
        delay: cardDelay,
        ease: motionEasing.entrance,
      }}
      onAnimationComplete={() => setIsAnimating(false)}
      className="h-full"
      style={{
        willChange: isAnimating ? "transform, opacity" : "auto",
      }}
      aria-label={feature.title}
    >
      {/* Inner card container handles hover lift & shadow without conflicting with entrance */}
      <motion.div
        whileHover={shouldReduceMotion ? undefined : "hover"}
        initial="rest"
        animate="rest"
        variants={{
          rest: {
            y: 0,
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          },
          hover: {
            y: -6,
            boxShadow:
              "0 20px 32px -8px rgba(32, 62, 125, 0.18), 0 10px 16px -6px rgba(32, 62, 125, 0.1)",
            transition: { duration: 0.25, ease: motionEasing.entrance },
          },
        }}
        className="bg-white rounded-[24px] p-6 sm:p-7 flex flex-row items-start gap-4 sm:gap-5 h-full cursor-default"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
        }}
      >
        {/* Icon Circle with pop spring entrance & hover wiggle/glow */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { scale: 0, rotate: -20 }
          }
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={defaultViewport}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  delay: iconDelay,
                }
          }
          variants={{
            rest: {
              rotate: 0,
              boxShadow: "0 0 0px transparent",
            },
            hover: {
              rotate: [0, -8, 8, 0],
              boxShadow: `0 0 20px ${feature.glowColor}`,
              transition: {
                rotate: { duration: 0.5, ease: "easeInOut" },
                boxShadow: { duration: 0.25 },
              },
            },
          }}
          className="w-[56px] h-[56px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: feature.iconBg,
            width: "56px",
            height: "56px",
            borderRadius: "9999px",
          }}
          aria-hidden="true"
        >
          <Icon />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col items-start gap-2 flex-grow">
          <motion.h3
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: 0.4,
              delay: titleDelay,
              ease: motionEasing.entrance,
            }}
            className="font-quicksand font-bold text-lg sm:text-[20px] leading-snug text-[#203E7D]"
            style={{ color: "#203E7D" }}
          >
            {feature.title}
          </motion.h3>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: 0.4,
              delay: descDelay,
              ease: motionEasing.entrance,
            }}
            className="font-liberation font-normal text-[15px] sm:text-[16px] leading-[25px] text-[#3D4949]"
            style={{ color: "#3D4949" }}
          >
            {feature.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeResize,
    getIsDesktopSnapshot,
    getIsDesktopServerSnapshot
  );

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-10 lg:py-16 bg-white scroll-mt-[80px] overflow-x-clip"
      aria-labelledby="why-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Outer rounded panel with entrance scale and opacity */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          transition={{
            duration: shouldReduceMotion ? 0.2 : motionDurations.base,
            ease: motionEasing.entrance,
          }}
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] py-10 lg:py-14 px-5 sm:px-7 lg:px-8 flex flex-col items-center"
          style={{
            backgroundColor: "rgba(32, 62, 125, 0.2)",
            borderRadius: "40px",
          }}
        >
          {/* Section Heading with Animated Hand-drawn Underline */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: motionOffsets.y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: shouldReduceMotion ? 0.2 : motionDurations.base,
              ease: motionEasing.entrance,
            }}
            className="w-full text-center mb-8 lg:mb-12"
          >
            <h2
              id="why-heading"
              className="font-quicksand font-bold text-[#203E7D] text-2xl sm:text-3xl lg:text-[36px] leading-tight text-center"
              style={{ color: "#203E7D" }}
            >
              Why Choose{" "}
              <span className="relative inline-block whitespace-normal sm:whitespace-nowrap">
                Aleef Veterinary?
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-[10px] sm:h-[12px] overflow-visible pointer-events-none"
                  viewBox="0 0 260 12"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 3 7 C 70 2, 170 3, 257 9"
                    stroke="#F7C83F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={
                      shouldReduceMotion
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={defaultViewport}
                    transition={{
                      pathLength: {
                        duration: 0.8,
                        delay: 0.4,
                        ease: motionEasing.entrance,
                      },
                      opacity: { duration: 0.1, delay: 0.4 },
                    }}
                  />
                </svg>
              </span>
            </h2>
          </motion.div>

          {/* 2x2 Feature Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;

              // Corner converge offsets based on grid index (strictly 0 horizontal on mobile)
              const initialX = isDesktop ? (idx % 2 === 0 ? -motionOffsets.x : motionOffsets.x) : 0;
              const initialY = isDesktop ? (idx < 2 ? -50 : 50) : motionOffsets.yMobile;
              const cardDelay = idx * motionStagger.cards;
              const iconDelay = cardDelay + (isDesktop ? 0.35 : 0.25);
              const titleDelay = iconDelay + 0.12;
              const descDelay = titleDelay + 0.08;

              return (
                <FeatureCard
                  key={`${feature.id}-${isDesktop ? "desktop" : "mobile"}`}
                  feature={feature}
                  Icon={Icon}
                  initialX={initialX}
                  initialY={initialY}
                  cardDelay={cardDelay}
                  iconDelay={iconDelay}
                  titleDelay={titleDelay}
                  descDelay={descDelay}
                  shouldReduceMotion={!!shouldReduceMotion}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
