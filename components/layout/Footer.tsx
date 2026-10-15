"use client";

import Link from "next/link";
import { PawPrint, MapPin, Phone, Mail } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useSyncExternalStore } from "react";
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

const getMobileSnapshot = () => window.innerWidth < 768;
const getMobileServerSnapshot = () => false;

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeResize,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  const getColDelay = (index: number) => {
    if (shouldReduceMotion) return 0;
    return index * motionStagger.cards;
  };

  const colDuration = isMobile ? motionDurations.base : 0.7;

  // Landing times for staggering child items
  const brandColLanding = shouldReduceMotion ? 0 : colDuration;
  const contactColLanding = shouldReduceMotion
    ? 0
    : getColDelay(2) + colDuration;
  const hoursColLanding = shouldReduceMotion ? 0 : getColDelay(3) + colDuration;
  const bottomBarDelay = shouldReduceMotion ? 0 : getColDelay(3) + colDuration + 0.1;

  const pawVariants: Variants = {
    initial: { rotate: 0 },
    wiggleOnce: {
      rotate: [0, -12, 12, -6, 0],
      transition: {
        duration: 0.7,
        delay: brandColLanding,
        ease: "easeInOut",
      },
    },
    hover: {
      rotate: [0, -12, 12, -6, 0],
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };

  const hoursRows = [
    { day: "Mon - Fri:", hours: "8:00 AM - 8:00 PM" },
    { day: "Saturday:", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday:", hours: "Closed" },
  ];

  return (
    <footer
      className="relative w-full bg-[#FAFDFF] pt-12 lg:pt-16 pb-8 overflow-x-clip"
      style={{ backgroundColor: "#FAFDFF" }}
      role="contentinfo"
    >
      {/* 1. Animated Top Line (draws from left to right) */}
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={defaultViewport}
        transition={{ duration: motionDurations.slow, ease: motionEasing.entrance }}
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          transformOrigin: "left",
          backgroundColor: "rgba(64, 73, 66, 0.2)",
        }}
        aria-hidden="true"
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10 lg:gap-12">
        {/* Main 4 Columns with exact proportional gap spanning corner to corner */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Column 1 (index 0): Brand & Tagline */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: isMobile ? motionOffsets.yMobile : 40 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: colDuration,
              delay: getColDelay(0),
              ease: motionEasing.entrance,
            }}
            className="flex flex-col items-start gap-3.5"
          >
            {/* Logo */}
            <div className="flex flex-row items-center gap-2.5">
              <motion.div
                variants={shouldReduceMotion ? undefined : pawVariants}
                initial="initial"
                whileInView={shouldReduceMotion ? undefined : "wiggleOnce"}
                viewport={defaultViewport}
                whileHover={shouldReduceMotion ? undefined : "hover"}
                className="inline-flex cursor-pointer"
              >
                <PawPrint className="w-6 h-6 text-[#203E7D] flex-shrink-0" />
              </motion.div>
              <span className="font-quicksand font-bold text-lg text-[#203E7D]">
                Aleef Veterinary
              </span>
            </div>

            {/* Tagline */}
            <p className="font-quicksand font-normal text-sm sm:text-[15px] leading-[23px] text-[#404942]">
              Compassionate care for every family member. We are dedicated to providing the
              highest standard of veterinary medicine.
            </p>
          </motion.div>

          {/* Column 2 (index 1): Quick Links */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: isMobile ? motionOffsets.yMobile : 40 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: colDuration,
              delay: getColDelay(1),
              ease: motionEasing.entrance,
            }}
            className="flex flex-col items-start gap-3.5"
          >
            <h3 className="font-quicksand font-semibold text-lg sm:text-[20px] leading-tight text-[#203E7D]">
              Quick Links
            </h3>

            <ul className="flex flex-col gap-2.5 w-full font-quicksand text-sm sm:text-[15px] text-[#404942]">
              <li>
                <Link
                  href="#home"
                  className="footer-hover-link hover:text-[#203E7D]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="footer-hover-link hover:text-[#203E7D]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="footer-hover-link hover:text-[#203E7D]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="footer-hover-link hover:text-[#203E7D]"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="footer-hover-link hover:text-[#203E7D]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3 (index 2): Contact */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: isMobile ? motionOffsets.yMobile : 40 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: colDuration,
              delay: getColDelay(2),
              ease: motionEasing.entrance,
            }}
            className="flex flex-col items-start gap-3.5"
          >
            <h3 className="font-quicksand font-semibold text-lg sm:text-[20px] leading-tight text-[#203E7D]">
              Contact
            </h3>

            <div className="flex flex-col gap-2.5 w-full">
              {/* Address */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.4,
                  delay: contactColLanding + 0 * motionStagger.small,
                  ease: motionEasing.entrance,
                }}
                className="flex flex-row items-center gap-2.5"
              >
                <MapPin className="w-4 h-4 text-[#404942] flex-shrink-0" />
                <span className="font-quicksand font-normal text-sm sm:text-[15px] leading-snug text-[#404942]">
                  123 Pet Lane, Abu Dhabi
                </span>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.4,
                  delay: contactColLanding + 1 * motionStagger.small,
                  ease: motionEasing.entrance,
                }}
                className="flex flex-row items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-[#404942] flex-shrink-0" />
                <a
                  href="tel:026747484"
                  className="footer-hover-link font-quicksand font-normal text-sm sm:text-[15px] leading-snug text-[#404942]"
                >
                  02 674 7484
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.4,
                  delay: contactColLanding + 2 * motionStagger.small,
                  ease: motionEasing.entrance,
                }}
                className="flex flex-row items-center gap-2.5"
              >
                <Mail className="w-4 h-4 text-[#404942] flex-shrink-0" />
                <a
                  href="mailto:hello@aleefvet.com"
                  className="footer-hover-link font-quicksand font-normal text-sm sm:text-[15px] leading-snug text-[#404942]"
                >
                  hello@aleefvet.com
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 4 (index 3): Hours */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: isMobile ? motionOffsets.yMobile : 40 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: colDuration,
              delay: getColDelay(3),
              ease: motionEasing.entrance,
            }}
            className="flex flex-col items-start gap-3.5 w-full"
          >
            <h3 className="font-quicksand font-semibold text-lg sm:text-[20px] leading-tight text-[#203E7D]">
              Hours
            </h3>

            <div className="flex flex-col gap-2 w-full">
              {hoursRows.map((item, idx) => (
                <motion.div
                  key={item.day}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: isMobile ? 0 : -12 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={defaultViewport}
                  transition={{
                    duration: 0.4,
                    delay: hoursColLanding + idx * motionStagger.small,
                    ease: motionEasing.entrance,
                  }}
                  className="flex flex-row justify-between items-center w-full"
                >
                  <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                    {item.day}
                  </span>
                  <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                    {item.hours}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Horizontal Border & Links Bar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{
            duration: 0.5,
            delay: bottomBarDelay,
            ease: motionEasing.entrance,
          }}
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 w-full"
          style={{
            borderTop: "1px solid rgba(191, 201, 191, 0.3)",
          }}
        >
          {/* Copyright */}
          <p className="font-quicksand font-normal text-xs sm:text-[13px] text-[#404942] text-center sm:text-left">
            &copy; 2026 Aleef Veterinary Clinic. Compassionate care for every family member.
          </p>

          {/* 4 Legal Links with exact proportional gap and sliding underline on hover */}
          <nav
            className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/privacy-policy"
              className="footer-hover-link font-quicksand font-normal text-xs sm:text-[13px] text-[#404942]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="footer-hover-link font-quicksand font-normal text-xs sm:text-[13px] text-[#404942]"
            >
              Terms of Service
            </Link>
            <Link
              href="/faq"
              className="footer-hover-link font-quicksand font-normal text-xs sm:text-[13px] text-[#404942]"
            >
              FAQ
            </Link>
            <Link
              href="#contact"
              className="footer-hover-link font-quicksand font-normal text-xs sm:text-[13px] text-[#404942]"
            >
              Emergency Care
            </Link>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
