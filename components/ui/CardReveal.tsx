"use client";

import React, { ElementType, useEffect, useRef, useState } from "react";

export interface CardRevealProps<T extends ElementType = "article"> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms stagger: e.g. 0, 80, 160, 240
  duration?: number; // ms: 450–600ms range (default 520ms)
  y?: number; // px vertical movement: default 16px
  threshold?: number; // 10–20% visibility trigger: default 0.15
  interactiveHover?: boolean; // smooth 3-5px hover effect with 200-250ms transition
  style?: React.CSSProperties;
}

export default function CardReveal<T extends ElementType = "article">({
  as,
  children,
  className = "",
  delay = 0,
  duration = 520,
  y = 16,
  threshold = 0.15,
  interactiveHover = true,
  style,
  ...restProps
}: CardRevealProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof CardRevealProps<T>>) {
  const Component = (as || "article") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId: number | null = null;

    if (prefersReducedMotion) {
      rafId = requestAnimationFrame(() => {
        setIsRevealed(true);
        setIsComplete(true);
      });
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    // 2. Fallback if IntersectionObserver is unsupported in the runtime
    if (typeof IntersectionObserver === "undefined") {
      rafId = requestAnimationFrame(() => {
        setIsRevealed(true);
        setIsComplete(true);
      });
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    // 3. Fallback safety timer: ensure cards are never permanently hidden if JS / observer stalls
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
      setIsComplete(true);
    }, 2000);

    // 4. Single-trigger IntersectionObserver at 10-20% (0.15) threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
          clearTimeout(safetyTimer);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [threshold]);

  // Clean up inline transform and transition after entrance animation completes
  // so that CSS hover states work smoothly with zero inline conflicts
  useEffect(() => {
    if (isRevealed && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, duration + delay + 40);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, isComplete, duration, delay]);

  const animationStyle: React.CSSProperties = isComplete
    ? {
        ...style,
        opacity: 1,
      }
    : {
        ...style,
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isRevealed ? "opacity, transform" : "auto",
      };

  const hoverClass = interactiveHover ? "card-interactive-hover" : "";

  return (
    <Component
      ref={ref}
      className={`card-reveal-init ${hoverClass} ${className}`.trim()}
      style={animationStyle}
      {...restProps}
    >
      {children}
    </Component>
  );
}
