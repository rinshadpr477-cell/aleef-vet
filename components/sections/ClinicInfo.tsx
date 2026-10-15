"use client";

import React, { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  motionDurations,
  motionEasing,
  motionStagger,
  motionOffsets,
  defaultViewport,
  buttonTapTransition,
} from "@/lib/motion";

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getMobileSnapshot = () => window.innerWidth < 768;
const getMobileServerSnapshot = () => false;

const subscribeMounted = () => () => {};
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

export default function ClinicInfo() {
  const shouldReduceMotion = useReducedMotion();
  const isMounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot
  );
  const isMobile = useSyncExternalStore(
    subscribeResize,
    getMobileSnapshot,
    getMobileServerSnapshot
  );
  const mapCardRef = useRef<HTMLDivElement>(null);
  const isMapInView = useInView(mapCardRef, { once: true, amount: 0.25 });

  const openingHours = [
    { day: "Mon - Fri:", hours: "8:00 AM - 8:00 PM" },
    { day: "Saturday:", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday:", hours: "Closed" },
  ];

  return (
    <section
      id="clinic-info"
      className="relative w-full bg-[#FAFDFF] py-14 lg:py-20 scroll-mt-[80px] overflow-x-clip"
      style={{ backgroundColor: "#FAFDFF" }}
      aria-labelledby="clinic-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Container */}
        <div className="w-full text-center mb-10 lg:mb-14 flex flex-col items-center gap-3">
          {/* Heading: fade up */}
          <motion.h2
            id="clinic-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: motionOffsets.y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: shouldReduceMotion ? 0.2 : motionDurations.base,
              ease: motionEasing.entrance,
            }}
            className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center"
            style={{ color: "#203E7D" }}
          >
            Find Us
          </motion.h2>

          {/* Subtitle: fade up 0.15s after */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: motionOffsets.y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: shouldReduceMotion ? 0.2 : motionDurations.base,
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: motionEasing.entrance,
            }}
            className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942] text-center max-w-[620px]"
            style={{ color: "#404942" }}
          >
            Visit our modern clinic in the heart of Abu Dhabi.
          </motion.p>
        </div>

        {/* Content Columns: Left Map + Right Contact Info */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          {/* Left Column: Map Card with intact border radius, border and shadow */}
          <div
            ref={mapCardRef}
            className="relative w-full lg:max-w-[540px] h-[300px] sm:h-[380px] lg:h-[440px] rounded-[24px] overflow-hidden group shadow-sm flex-shrink-0"
            style={{
              borderRadius: "24px",
              border: "2px solid rgba(209, 242, 229, 0.2)",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Map Reveal: clipPath circular uncover + scale from pin position on desktop; simple fade-up on mobile */}
            <motion.div
              initial={
                isMobile
                  ? shouldReduceMotion
                    ? false
                    : { opacity: 0, y: motionOffsets.yMobile }
                  : undefined
              }
              animate={
                isMobile
                  ? isMapInView
                    ? { opacity: 1, y: 0 }
                    : isMounted
                    ? { opacity: 0, y: motionOffsets.yMobile }
                    : { opacity: 1, y: 0 }
                  : undefined
              }
              transition={
                isMobile ? { duration: motionDurations.base, ease: motionEasing.entrance } : undefined
              }
              className={`w-full h-full relative ${
                !isMobile && !shouldReduceMotion
                  ? isMapInView
                    ? "map-clip-reveal"
                    : isMounted
                    ? "map-clip-pending"
                    : ""
                  : ""
              }`}
            >
              <a
                href="https://maps.google.com/?q=Abu+Dhabi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Aleef Veterinary Clinic location on Google Maps"
                className="block w-full h-full relative"
              >
                <Image
                  src="/clinic-map.png"
                  alt="Map showing 123 Pet Lane, Abu Dhabi"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                />
              </a>

              {/* Pulsing Ripple Ring overlay under/around the map pin at 40% 35% */}
              {isMapInView && !shouldReduceMotion && (
                <div
                  className="absolute pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "40%", top: "35%" }}
                  aria-hidden="true"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0.5, 0],
                      scale: [0.5, 2.5],
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="w-12 h-12 rounded-full border-2 border-[#203E7D]"
                    style={{
                      backgroundColor: "rgba(32, 62, 125, 0.15)",
                    }}
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Contact Info Rows */}
          <div className="flex flex-col items-start gap-7 w-full lg:max-w-[580px]">
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Row 1: Address */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: isMobile ? 0 : motionOffsets.x, y: isMobile ? motionOffsets.yMobile : 0 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                  delay: 0,
                  ease: motionEasing.entrance,
                }}
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                className="group flex flex-row items-start gap-4 w-full cursor-default transition-transform duration-200"
              >
                {/* Icon Circle */}
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={defaultViewport}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.45,
                        }
                  }
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(32,62,125,0.3)]"
                  style={{
                    backgroundColor: "rgba(32, 62, 125, 0.2)",
                    borderRadius: "9999px",
                  }}
                  aria-hidden="true"
                >
                  <MapPin className="w-5 h-5 text-[#203E7D]" />
                </motion.div>
                <div className="flex flex-col items-start gap-1">
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[17px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Address
                  </h3>
                  <p
                    className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]"
                    style={{ color: "#404942" }}
                  >
                    123 Pet Lane, Abu Dhabi
                  </p>
                </div>
              </motion.div>

              {/* Row 2: Phone & Email */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: isMobile ? 0 : motionOffsets.x, y: isMobile ? motionOffsets.yMobile : 0 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                  delay: shouldReduceMotion ? 0 : motionStagger.cards,
                  ease: motionEasing.entrance,
                }}
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                className="group flex flex-row items-start gap-4 w-full cursor-default transition-transform duration-200"
              >
                {/* Icon Circle */}
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={defaultViewport}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.45 + motionStagger.cards,
                        }
                  }
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(32,62,125,0.3)]"
                  style={{
                    backgroundColor: "rgba(32, 62, 125, 0.2)",
                    borderRadius: "9999px",
                  }}
                  aria-hidden="true"
                >
                  <Phone className="w-5 h-5 text-[#203E7D]" />
                </motion.div>
                <div className="flex flex-col items-start gap-1">
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[17px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Phone &amp; Email
                  </h3>
                  <a
                    href="tel:026747484"
                    className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942] hover:text-[#203E7D] transition-colors"
                    style={{ color: "#404942" }}
                  >
                    02 674 7484
                  </a>
                  <a
                    href="mailto:hello@aleefvet.com"
                    className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942] hover:text-[#203E7D] transition-colors"
                    style={{ color: "#404942" }}
                  >
                    hello@aleefvet.com
                  </a>
                </div>
              </motion.div>

              {/* Row 3: Opening Hours */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: isMobile ? 0 : motionOffsets.x, y: isMobile ? motionOffsets.yMobile : 0 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                  delay: shouldReduceMotion ? 0 : motionStagger.cards * 2,
                  ease: motionEasing.entrance,
                }}
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                className="group flex flex-row items-start gap-4 w-full cursor-default transition-transform duration-200"
              >
                {/* Icon Circle */}
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={defaultViewport}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.45 + motionStagger.cards * 2,
                        }
                  }
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(32,62,125,0.3)]"
                  style={{
                    backgroundColor: "rgba(32, 62, 125, 0.2)",
                    borderRadius: "9999px",
                  }}
                  aria-hidden="true"
                >
                  <Clock className="w-5 h-5 text-[#203E7D]" />
                </motion.div>
                <div className="flex flex-col items-start gap-1 w-full max-w-[340px]">
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[17px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Opening Hours
                  </h3>
                  <div className="flex flex-col gap-1 w-full pt-1">
                    {openingHours.map((item, idx) => (
                      <motion.div
                        key={item.day}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, y: 6 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={defaultViewport}
                        transition={{
                          duration: 0.3,
                          delay: shouldReduceMotion ? 0 : 0.6 + idx * motionStagger.small,
                          ease: motionEasing.entrance,
                        }}
                        className="flex flex-row justify-between items-center w-full"
                      >
                        <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                          {item.day}
                        </span>
                        <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                          {item.hours}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Get Directions Button */}
            <motion.a
              href="https://maps.google.com/?q=123+Pet+Lane+Abu+Dhabi"
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduceMotion ? false : { opacity: 0, y: motionOffsets.yMobile }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                delay: shouldReduceMotion ? 0 : 0.65,
                ease: motionEasing.entrance,
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -2,
                    }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#203E7D] hover:bg-[#183063] text-white rounded-full transition-colors duration-250 shadow-sm hover:shadow-md mt-2 select-none group"
              style={{
                backgroundColor: "#203E7D",
                borderRadius: "9999px",
              }}
            >
              <span className="font-quicksand font-semibold text-[15px] leading-normal text-white text-center">
                Get Directions
              </span>
              <motion.span
                whileHover={{ rotate: 90 }}
                transition={buttonTapTransition}
                className="inline-flex flex-shrink-0"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-white flex-shrink-0 transition-transform duration-250 group-hover:rotate-90"
                  aria-hidden="true"
                >
                  <path
                    d="M8 0L9.414 6.586L16 8L9.414 9.414L8 16L6.586 9.414L0 8L6.586 6.586L8 0Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
