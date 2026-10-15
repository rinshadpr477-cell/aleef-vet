"use client";

import React, { ElementType } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds, default 0
  duration?: number; // seconds, default 0.6s
  y?: number; // vertical movement in px, default 24px
  viewportMargin?: string; // default "-80px"
  as?: ElementType;
  style?: React.CSSProperties;
  id?: string;
  [key: string]: unknown;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 24,
  viewportMargin = "-80px",
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

  return (
    <MotionComponent
      id={id}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // smooth ease-out
      }}
      className={className}
      style={style}
      {...restProps}
    >
      {children}
    </MotionComponent>
  );
}
