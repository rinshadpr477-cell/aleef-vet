"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingPawsProps {
  isActive?: boolean;
  shouldReduceMotion?: boolean;
}

function PawIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main metacarpal pad */}
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      {/* 4 toe pads */}
      <circle cx="6" cy="10" r="2.2" />
      <circle cx="10" cy="6.5" r="2.2" />
      <circle cx="14" cy="6.5" r="2.2" />
      <circle cx="18" cy="10" r="2.2" />
    </svg>
  );
}

const pawsConfig = [
  {
    id: "paw-1",
    size: 32,
    style: { left: "6%", top: "18%" },
    duration: 7.2,
    delay: 0,
    rotateRange: [-6, 6, -6],
    mobileHide: false, // Visible on mobile
  },
  {
    id: "paw-2",
    size: 38,
    style: { left: "14%", top: "64%" },
    duration: 8.5,
    delay: 1.4,
    rotateRange: [4, -8, 4],
    mobileHide: true, // Hidden on mobile
  },
  {
    id: "paw-3",
    size: 34,
    style: { right: "7%", top: "22%" },
    duration: 6.8,
    delay: 0.6,
    rotateRange: [8, -4, 8],
    mobileHide: false, // Visible on mobile
  },
  {
    id: "paw-4",
    size: 26,
    style: { right: "13%", top: "66%" },
    duration: 9.0,
    delay: 2.0,
    rotateRange: [-8, 6, -8],
    mobileHide: true, // Hidden on mobile
  },
  {
    id: "paw-5",
    size: 30,
    style: { left: "3%", top: "44%" },
    duration: 7.8,
    delay: 2.8,
    rotateRange: [6, -6, 6],
    mobileHide: true, // Hidden on mobile
  },
];

export default function FloatingPaws({
  isActive = true,
  shouldReduceMotion = false,
}: FloatingPawsProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {pawsConfig.map((paw) => {
        const isAnimated = isActive && !shouldReduceMotion;

        return (
          <motion.div
            key={paw.id}
            className={`absolute text-white ${
              paw.mobileHide ? "hidden md:block" : "block"
            }`}
            style={{
              ...paw.style,
              color: "rgba(255, 255, 255, 0.07)",
            }}
            initial={false}
            animate={
              isAnimated
                ? {
                    y: [0, -30, 0],
                    rotate: paw.rotateRange,
                  }
                : { y: 0, rotate: 0 }
            }
            transition={
              isAnimated
                ? {
                    duration: paw.duration,
                    delay: paw.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0 }
            }
          >
            <PawIcon size={paw.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
