"use client";

import React, { ElementType, useEffect, useRef, useState } from "react";

export interface ScrollRevealProps<T extends ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms, e.g. 0, 80, 160
  duration?: number; // ms, default 550ms (in 400-650ms range)
  y?: number; // vertical movement in px, default 16px (in 12-20px range)
  threshold?: number; // viewport intersection ratio, default 0.15 (in 10-20% range)
  immediate?: boolean; // triggers immediately on mount (for Hero)
  interactiveHover?: boolean; // smooth 3-5px lift with 200-250ms transition for cards
  style?: React.CSSProperties;
  id?: string;
  "aria-label"?: string;
  [key: string]: unknown;
}

export default function ScrollReveal<T extends ElementType = "div">({
  as,
  children,
  className = "",
  delay = 0,
  duration = 550,
  y = 16,
  threshold = 0.15,
  immediate = false,
  interactiveHover = false,
  style,
  ...restProps
}: ScrollRevealProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ScrollRevealProps<T>>) {
  const Component = (as || "div") as ElementType;
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

    if (immediate) {
      // Immediate entrance on page load (Hero section)
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, delay || 16);
      return () => clearTimeout(timer);
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

    // 3. Fallback safety timer: ensure content is never permanently hidden
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
      setIsComplete(true);
    }, 2500);

    // 4. Single-trigger IntersectionObserver at 10-20% (0.15) threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(safetyTimer);
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [delay, immediate, threshold]);

  // Clean up inline transform and transition after animation completes
  // to ensure hover states (e.g. card hover -translate-y-1) work with zero conflicts
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
      className={`reveal-init ${hoverClass} ${className}`.trim()}
      style={animationStyle}
      {...restProps}
    >
      {children}
    </Component>
  );
}
