"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import FloatingPaws from "@/components/ui/FloatingPaws";
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

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const isMobile = useSyncExternalStore(
    subscribeResize,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  const words = ["Your", "Pet", "Deserves", "the", "Best", "Care"];

  const wordContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionStagger.small,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: motionOffsets.yMobile },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: motionEasing.entrance,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="py-14 lg:py-20 text-center relative overflow-hidden overflow-x-clip"
      style={{
        backgroundColor: "#203E7D",
        overflowX: "clip",
      }}
      aria-labelledby="cta-heading"
    >
      {/* Background drifting light (white radial gradient at 8% opacity, drifting -15% to 15%) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[350px] sm:w-[850px] sm:h-[450px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 70%)",
        }}
        initial={false}
        animate={
          isInView && !shouldReduceMotion
            ? {
                x: isMobile ? ["-8%", "8%"] : ["-15%", "15%"],
              }
            : { x: "0%" }
        }
        transition={
          isInView && !shouldReduceMotion
            ? {
                duration: isMobile ? 16 : 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : { duration: 0 }
        }
        aria-hidden="true"
      />

      {/* Floating Paws: 5 small paw prints floating near left/right edges */}
      <FloatingPaws
        isActive={isInView}
        shouldReduceMotion={!!shouldReduceMotion}
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-[640px] mx-auto text-center">
          {/* Heading: revealed word by word on scroll */}
          <motion.h2
            id="cta-heading"
            variants={shouldReduceMotion ? undefined : wordContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={defaultViewport}
            className="font-quicksand font-bold text-2xl sm:text-3xl lg:text-[36px] text-white leading-tight mb-3 flex flex-wrap justify-center gap-x-2 sm:gap-x-2.5"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={shouldReduceMotion ? undefined : wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Paragraph: fades up 0.2s after the heading */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: motionOffsets.yMobile }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: shouldReduceMotion ? 0.2 : motionDurations.base,
              delay: shouldReduceMotion ? 0 : 0.55,
              ease: motionEasing.entrance,
            }}
            className="font-quicksand font-medium text-slate-200 text-base sm:text-[17px] leading-relaxed max-w-[580px] mx-auto mb-8"
          >
            Schedule your visit today and give your pet the compassionate,
            high-quality care they deserve.
          </motion.p>

          {/* Button Outer Container for Entrance */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 18,
              delay: shouldReduceMotion ? 0 : 0.8,
            }}
          >
            {/* Button Inner Link with hover lift & tap feedback */}
            <motion.a
              href="#contact"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -2,
                      boxShadow:
                        "0 14px 28px -6px rgba(1, 39, 121, 0.4), 0 8px 16px -4px rgba(245, 200, 66, 0.45)",
                    }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={buttonTapTransition}
              className="relative group inline-flex items-center justify-center font-quicksand font-semibold text-[15px] px-7 py-3 rounded-full shadow-md overflow-hidden select-none"
              style={{
                backgroundColor: "#F5C842",
                color: "#012779",
                borderRadius: "9999px",
              }}
            >
              {/* Soft pulsing ring behind the yellow button */}
              <span
                className="absolute inset-0 rounded-full pointer-events-none cta-pulse-ring group-hover:opacity-0 transition-opacity"
                aria-hidden="true"
              />

              {/* Diagonal shine sweep moving across the button once every 4s */}
              {!shouldReduceMotion && isInView && (
                <motion.span
                  className="absolute top-0 bottom-0 w-12 pointer-events-none -skew-x-25 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  initial={{ left: "-60%" }}
                  animate={{ left: ["-60%", "160%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    repeatDelay: 2.8,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
              )}

              <span className="relative z-10">Book an Appointment Now</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
