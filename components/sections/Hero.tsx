"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  motionDurations,
  motionEasing,
  motionStagger,
  motionOffsets,
  buttonTapTransition,
} from "@/lib/motion";

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const getMobileSnapshot = () => window.innerWidth < 768;
const getMobileServerSnapshot = () => false;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeResize,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  // Setting once: true makes it play only the first time; once: false allows fading out and in on each scroll.
  const viewportConfig = { once: false, amount: 0.3 } as const;

  const textMotionProps = (stepIndex: number) => ({
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : isMobile
      ? { opacity: 0, y: motionOffsets.yMobile, x: 0 }
      : { opacity: 0, x: -motionOffsets.x, y: 0 },
    whileInView: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, x: 0, y: 0 },
    viewport: viewportConfig,
    transition: {
      duration: shouldReduceMotion ? 0.2 : motionDurations.base,
      delay: shouldReduceMotion ? 0 : 0.3 + stepIndex * motionStagger.cards,
      ease: motionEasing.entrance,
    },
    style: { willChange: "transform, opacity" },
  });

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section
        id="home"
        aria-label="Hero section"
        className="relative overflow-hidden font-quicksand text-white overflow-x-clip"
        style={{
          backgroundColor: "#203E7D",
          paddingTop: "clamp(96px, 10vw, 124px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
          isolation: "isolate",
          overflowX: "clip",
        }}
      >
        {/* Subtle decorative background vector from Figma */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "20%",
            right: "20%",
            top: "30%",
            bottom: "20%",
            background: "rgba(0, 69, 39, 0.05)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Main 2-column Container: Full width edge-to-edge */}
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
          {/* ── Left Column (Content) ── */}
          <div
            style={{
              flex: "1 1 0%",
              minWidth: 0,
              maxWidth: "580px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {/* 1. PROACTIVE PET WELLNESS Eyebrow (delay: 0.30s) */}
            <motion.p
              {...textMotionProps(0)}
              style={{
                fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#F0C051",
                margin: 0,
                willChange: "transform, opacity",
              }}
            >
              PROACTIVE PET WELLNESS
            </motion.p>

            {/* 2. Heading (delay: 0.42s, with 'Every Step' fading in 0.2s after) */}
            <motion.h1
              {...textMotionProps(1)}
              style={{
                fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 3.8vw, 48px)",
                lineHeight: "clamp(40px, 4.6vw, 58px)",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                margin: 0,
                willChange: "transform, opacity",
              }}
            >
              Caring for Your Pets,
              <br />
              <span className="sm:whitespace-nowrap">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportConfig}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.62,
                    ease: motionEasing.entrance,
                  }}
                  style={{ color: "#F0C051" }}
                >
                  Every Step
                </motion.span>{" "}
                of the Way.
              </span>
            </motion.h1>

            {/* 3. Paragraph (delay: 0.54s) */}
            <motion.p
              {...textMotionProps(2)}
              style={{
                fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: "26px",
                color: "rgba(255, 255, 255, 0.9)",
                margin: 0,
                maxWidth: "480px",
                willChange: "transform, opacity",
              }}
            >
              From kitten visits to senior care, we provide compassionate, modern
              veterinary services to keep your furry family members healthy and happy.
            </motion.p>

            {/* 4. CTA Buttons Container (delay: 0.66s) */}
            <motion.div
              {...textMotionProps(3)}
              style={{
                paddingTop: "12px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                width: "100%",
                willChange: "transform, opacity",
              }}
            >
              {/* Primary Gold CTA */}
              <motion.a
                href="#contact"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        backgroundColor: "#eabf34",
                        boxShadow: "0 6px 20px rgba(245, 200, 66, 0.4)",
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={buttonTapTransition}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  minHeight: "48px",
                  backgroundColor: "#F5C842",
                  color: "#012779",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "20px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 3px 12px rgba(245, 200, 66, 0.3)",
                }}
              >
                <span>Book an Appointment</span>
                <ArrowRight
                  style={{
                    width: "15px",
                    height: "15px",
                    strokeWidth: 2.6,
                    color: "#012779",
                  }}
                  aria-hidden="true"
                />
              </motion.a>

              {/* Secondary Outline CTA */}
              <motion.a
                href="#services"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        backgroundColor: "rgba(255, 255, 255, 0.14)",
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={buttonTapTransition}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 28px",
                  minHeight: "48px",
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "20px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Explore Services
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right Column (Hero Image with Blur-in from Above) ── */}
          <div
            className="w-full lg:max-w-[500px] flex justify-center lg:justify-end relative"
            style={{
              flex: "1 1 0%",
              minWidth: 0,
              isolation: "isolate",
            }}
          >
            {/* Background Mint Glow Blur: #D1F2E5, 120px, blur 20px */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                right: "-12px",
                top: "-12px",
                background: "#D1F2E5",
                opacity: 0.55,
                filter: "blur(20px)",
                borderRadius: "9999px",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* 1. Main Image Blur-in from Above */}
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
                duration: shouldReduceMotion ? 0.2 : 1.0,
                ease: motionEasing.entrance,
              }}
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "500px",
                borderRadius: "24px",
                border: "3.5px solid rgba(209, 242, 229, 0.25)",
                boxShadow: "0px 20px 40px -10px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                backgroundColor: "#203E7D",
                willChange: "transform, opacity, filter",
              }}
            >
              <Image
                src="/hero-consultation.png"
                alt="Veterinarian with tablet consulting with a pet owner and a large white dog"
                width={520}
                height={460}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Golden Trust Strip (delay: 0.6s, y: 40, items stagger by 0.1s, y: 12) ─── */}
      <motion.div
        initial={
          shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{
          duration: shouldReduceMotion ? 0.2 : motionDurations.base,
          delay: shouldReduceMotion ? 0 : 0.6,
          ease: motionEasing.entrance,
        }}
        style={{
          width: "100%",
          backgroundColor: "#F5C842",
          borderTop: "1px solid rgba(0, 69, 39, 0.12)",
          willChange: "transform, opacity",
        }}
        aria-label="Trust highlights"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(20px, 4vw, 48px)",
              flexWrap: "wrap",
            }}
          >
            {/* 1. 500+ Five-Star Reviews (stagger item 1: y: 12) */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : 1.1,
                ease: motionEasing.entrance,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                willChange: "transform, opacity",
              }}
            >
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    style={{
                      width: "15px",
                      height: "15px",
                      fill: "#004527",
                      stroke: "none",
                      color: "#004527",
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#004527",
                  whiteSpace: "nowrap",
                }}
              >
                500+ Five-Star Reviews
              </span>
            </motion.div>

            {/* Divider */}
            <div
              className="hidden sm:block"
              style={{
                height: "20px",
                width: "1.5px",
                backgroundColor: "rgba(0, 69, 39, 0.25)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />

            {/* 2. Certified Professionals (stagger item 2: y: 12) */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : 1.2,
                ease: motionEasing.entrance,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                willChange: "transform, opacity",
              }}
            >
              <ShieldCheck
                style={{
                  width: "18px",
                  height: "18px",
                  color: "#004527",
                  strokeWidth: 2.4,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#004527",
                  whiteSpace: "nowrap",
                }}
              >
                Certified Professionals
              </span>
            </motion.div>

            {/* Divider */}
            <div
              className="hidden sm:block"
              style={{
                height: "20px",
                width: "1.5px",
                backgroundColor: "rgba(0, 69, 39, 0.25)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />

            {/* 3. Fear-Free Certified (stagger item 3: y: 12) */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : 1.3,
                ease: motionEasing.entrance,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                willChange: "transform, opacity",
              }}
            >
              <Heart
                style={{
                  width: "18px",
                  height: "18px",
                  color: "#004527",
                  strokeWidth: 2.4,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#004527",
                  whiteSpace: "nowrap",
                }}
              >
                Fear-Free Certified
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}


