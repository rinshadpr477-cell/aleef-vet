"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Lock scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress animation over ~1.6 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment between 8 and 20 for natural feel
        const next = prev + Math.floor(Math.random() * 12) + 8;
        return next > 100 ? 100 : next;
      });
    }, 120);

    // Complete loading after ~1.8s
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = originalOverflow;
      }, 250);
    }, 1700);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: -16,
                  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
                }
          }
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{
            backgroundColor: "#203E7D",
          }}
          aria-label="Loading website"
          role="status"
          aria-live="polite"
        >
          {/* Subtle background glow effect */}
          <div
            className="absolute w-[240px] h-[240px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245, 200, 66, 0.18) 0%, rgba(32, 62, 125, 0) 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />

          {/* Central Logo Box */}
          <div className="relative z-10 flex flex-col items-center text-center gap-4 px-6">
            {/* Animated Paw Badge */}
            <motion.div
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.85, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: [1, 1.06, 1],
                      opacity: 1,
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.2 }
                  : {
                      scale: {
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      opacity: { duration: 0.4 },
                    }
              }
              className="w-[80px] h-[80px] rounded-[24px] flex items-center justify-center relative shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "2px solid rgba(245, 200, 66, 0.35)",
                backdropFilter: "blur(12px)",
              }}
            >
              <PawPrint
                className="w-10 h-10 text-[#F5C842]"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </motion.div>

            {/* Clinic Name & Tagline */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-col items-center gap-1.5"
            >
              <h1
                className="font-quicksand font-bold text-2xl sm:text-[28px] tracking-wide text-white"
                style={{ color: "#FFFFFF" }}
              >
                Aleef Veterinary
              </h1>
              <p
                className="font-quicksand font-medium text-xs sm:text-[13px] tracking-widest uppercase text-[#F0C051]"
                style={{ color: "#F0C051" }}
              >
                Caring for Your Pets, Every Step of the Way
              </p>
            </motion.div>

            {/* Progress Bar Track */}
            <div className="w-[180px] sm:w-[220px] h-[4px] bg-white/15 rounded-full overflow-hidden mt-2 relative">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: "#F5C842",
                  width: `${progress}%`,
                  transition: "width 0.2s ease-out",
                  boxShadow: "0 0 12px rgba(245, 200, 66, 0.6)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
