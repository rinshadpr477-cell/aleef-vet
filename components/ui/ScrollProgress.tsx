"use client";

import { useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const subscribeScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const getScrollSnapshot = () => window.scrollY > 40;
const getScrollServerSnapshot = () => false;

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const isVisible = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );

  const { scrollYProgress } = useScroll();

  const scaleXSpring = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const scaleX = shouldReduceMotion ? scrollYProgress : scaleXSpring;

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "#F7C83F",
        transformOrigin: "left",
        scaleX,
        zIndex: 60,
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
    />
  );
}
