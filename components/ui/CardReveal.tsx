"use client";

import React from "react";
import ScrollReveal, { ScrollRevealProps } from "./ScrollReveal";

export default function CardReveal({
  as = "article",
  interactiveHover = true,
  duration = 520,
  y = 16,
  threshold = 0.15,
  ...restProps
}: ScrollRevealProps<"article">) {
  return (
    <ScrollReveal
      as={as}
      interactiveHover={interactiveHover}
      duration={duration}
      y={y}
      threshold={threshold}
      {...restProps}
    />
  );
}
