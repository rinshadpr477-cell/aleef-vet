"use client";

import React, { ElementType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  motionDurations,
  motionEasing,
  motionOffsets,
  defaultViewport,
} from "@/lib/motion";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds, default 0
  duration?: number; // seconds, default 0.6s
  y?: number; // vertical movement in px, default 30px
  viewportMargin?: string;
  viewportAmount?: number;
  once?: boolean;
  as?: ElementType;
  style?: React.CSSProperties;
  id?: string;
  [key: string]: unknown;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = motionDurations.base,
  y = motionOffsets.y,
  viewportMargin,
  viewportAmount = defaultViewport.amount,
  once = defaultViewport.once,
  as: Component = "div",
  style,
  id,
  ...restProps
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionComponent = (
    Component === "article"
      ? motion.article
      : Component === "section"
      ? motion.section
      : Component === "span"
      ? motion.span
      : motion.div
  ) as typeof motion.div;

  const viewportConfig = viewportMargin
    ? { once, margin: viewportMargin }
    : { once, amount: viewportAmount };

  return (
    <MotionComponent
      id={id}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: motionEasing.entrance,
      }}
      className={className}
      style={style}
      {...restProps}
    >
      {children}
    </MotionComponent>
  );
}
