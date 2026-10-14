"use client";

import React, { ElementType, useEffect, useRef, useState } from "react";

export interface ScrollRevealProps<T extends ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms, e.g. 0, 80, 160
  duration?: number; // ms, default 550ms
  y?: number; // vertical movement in px, default 16px
  threshold?: number; // viewport intersection ratio, default 0.15
  immediate?: boolean; // triggers immediately on mount (for Hero)
  style?: React.CSSProperties;
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
  style,
  ...restProps
}: ScrollRevealProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ScrollRevealProps<T>>) {
  const Component = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
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

    // Scroll-triggered reveal via IntersectionObserver
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [delay, immediate, threshold]);

  // Clean up inline transform and transition after animation completes
  // to ensure hover states (e.g. hover:-translate-y-1) work with zero conflicts
  useEffect(() => {
    if (isRevealed && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, duration + delay + 50);
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

  return (
    <Component
      ref={ref}
      className={`reveal-init ${className}`}
      style={animationStyle}
      {...restProps}
    >
      {children}
    </Component>
  );
}
