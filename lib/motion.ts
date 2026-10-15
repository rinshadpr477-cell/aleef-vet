import type { Variants, Transition } from "framer-motion";

/**
 * Shared Motion System Tokens
 * Standardized across Aleef Veterinary Clinic web application
 */

export const motionDurations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

export const motionEasing = {
  // Premium cubic-bezier for snappy, natural entrances with soft settling
  entrance: [0.22, 1, 0.36, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  easeOut: "easeOut" as const,
  easeInOut: "easeInOut" as const,
} as const;

export const motionStagger = {
  cards: 0.12,
  items: 0.08,
  list: 0.12,
  words: 0.08,
  small: 0.08,
} as const;

export const motionOffsets = {
  y: 30,
  yMobile: 20,
  x: 60,
  xMobile: 30,
} as const;

export const defaultViewport = {
  once: true,
  amount: 0.25,
} as const;

export const standardEntranceTransition = (
  delay = 0,
  duration = motionDurations.base
): Transition => ({
  duration,
  delay,
  ease: motionEasing.entrance,
});

/**
 * Standard Reusable Motion Variants
 */

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: motionOffsets.y },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.base,
      delay: typeof custom === "number" ? custom : 0,
      ease: motionEasing.entrance,
    },
  }),
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: motionOffsets.x },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDurations.base,
      delay: typeof custom === "number" ? custom : 0,
      ease: motionEasing.entrance,
    },
  }),
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -motionOffsets.x },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDurations.base,
      delay: typeof custom === "number" ? custom : 0,
      ease: motionEasing.entrance,
    },
  }),
};

export const staggerContainerVariants = (
  staggerChildren = motionStagger.cards,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const blurInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -motionOffsets.x,
    filter: "blur(14px)",
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.0,
      delay: typeof custom === "number" ? custom : 0,
      ease: motionEasing.entrance,
    },
  }),
};

/**
 * Unified Card & Button Interaction Physics
 */

export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 20px rgba(32, 62, 125, 0.04)",
  },
  hover: {
    y: -6,
    boxShadow:
      "0 20px 32px -8px rgba(32, 62, 125, 0.16), 0 8px 16px -4px rgba(32, 62, 125, 0.08)",
    transition: { duration: 0.25, ease: motionEasing.entrance },
  },
};

export const buttonHoverVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: motionEasing.entrance },
  },
};

export const buttonTap = { scale: 0.97 };
export const buttonTapTransition: Transition = { duration: 0.15, ease: motionEasing.entrance };
