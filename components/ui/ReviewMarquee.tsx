"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { motionEasing, defaultViewport } from "@/lib/motion";

export interface ReviewItem {
  id: string;
  quote: string;
  quoteColor: string;
  author: string;
  initials: string;
  avatarBg: string;
}

export interface ReviewMarqueeProps {
  reviews: ReviewItem[];
  reverse?: boolean;
  className?: string;
  speed?: number; // duration in seconds (default 40s)
}

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg
      width="46"
      height="33"
      viewBox="0 0 46 33"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.2 }}
      className="flex-shrink-0 animate-quote-pulse"
      aria-hidden="true"
    >
      <path d="M12.6 32.5C5.6 32.5 0 26.9 0 19.9C0 11.2 6.5 3.5 16.2 0L19.4 4.5C12.5 7.4 8.6 11.9 8.1 16.5C9.5 15.8 11.1 15.4 12.8 15.4C18.6 15.4 23.3 20.1 23.3 25.9C23.3 29.5 20.4 32.5 16.8 32.5H12.6ZM35.3 32.5C28.3 32.5 22.7 26.9 22.7 19.9C22.7 11.2 29.2 3.5 38.9 0L42.1 4.5C35.2 7.4 31.3 11.9 30.8 16.5C32.2 15.8 33.8 15.4 35.5 15.4C41.3 15.4 46 20.1 46 25.9C46 29.5 43.1 32.5 39.5 32.5H35.3Z" />
    </svg>
  );
}

function ReviewCard({
  item,
  isDuplicate = false,
}: {
  item: ReviewItem;
  isDuplicate?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      id={isDuplicate ? undefined : item.id}
      tabIndex={isDuplicate ? -1 : 0}
      className="relative bg-white rounded-[24px] p-6 sm:p-7 flex flex-col justify-between shadow-sm card-interactive-hover marquee-item w-[280px] sm:w-[320px] md:w-[360px] min-h-[260px] sm:min-h-[270px] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#203E7D]"
      style={{
        flex: "0 0 auto",
        flexShrink: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        isolation: "isolate",
      }}
      aria-hidden={isDuplicate ? "true" : undefined}
      aria-label={isDuplicate ? undefined : `Testimonial from ${item.author}`}
    >
      {/* Quote Mark Icon in Top-Right with gentle slow pulse */}
      <div className="absolute top-5 right-5 pointer-events-none z-0">
        <QuoteIcon color={item.quoteColor} />
      </div>

      {/* 5-Star Rating Row with sequential reveal */}
      <div
        className="relative z-10 flex items-center gap-1 mb-3.5"
        aria-label="5 out of 5 stars"
      >
        {[0, 1, 2, 3, 4].map((starIdx) => (
          <motion.span
            key={starIdx}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{
              duration: 0.35,
              delay: 0.15 + starIdx * 0.08,
              ease: motionEasing.entrance,
            }}
            className="inline-flex"
          >
            <Star className="w-4 h-4 fill-[#F0C051] text-[#F0C051]" />
          </motion.span>
        ))}
      </div>

      {/* Quote Text */}
      <div className="relative z-10 mb-6 pr-6 flex-grow">
        <p
          className="font-liberation italic font-normal text-[15px] sm:text-[16px] leading-[25px] text-[#3D4949] text-left"
          style={{ color: "#3D4949" }}
        >
          {item.quote}
        </p>
      </div>

      {/* Author Row */}
      <div className="relative z-10 flex flex-row items-center gap-3.5 mt-auto pt-2">
        {/* Initials Avatar */}
        <div
          className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: item.avatarBg,
            width: "48px",
            height: "48px",
            borderRadius: "9999px",
          }}
          aria-hidden="true"
        >
          <span
            className="font-liberation font-bold text-[17px] leading-none text-white text-center select-none"
            style={{ color: "#FFFFFF" }}
          >
            {item.initials}
          </span>
        </div>

        {/* Author Name */}
        <div className="flex flex-col items-start">
          <span
            className="font-liberation font-semibold text-[15px] leading-tight text-[#111D23]"
            style={{ color: "#111D23" }}
          >
            {item.author}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ReviewMarquee({
  reviews,
  reverse = false,
  className = "",
  speed = 40,
}: ReviewMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Customer reviews marquee"
      className={`relative w-full overflow-hidden marquee-container py-5 ${className}`}
    >
      {/* Soft gradient edge fade masks (left & right) using section bg color #C8D3EA */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-r from-[#C8D3EA] via-[#C8D3EA]/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-l from-[#C8D3EA] via-[#C8D3EA]/80 to-transparent"
        aria-hidden="true"
      />

      {/* Single Horizontal Sliding Marquee Track */}
      <div
        className={`marquee-track gap-6 lg:gap-8 pr-6 lg:pr-8 ${
          reverse ? "marquee-track-reverse" : ""
        }`}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "max-content",
          maxWidth: "none",
          animationPlayState: isInView ? "running" : "paused",
          ...(speed !== 40 ? { animationDuration: `${speed}s` } : {}),
        }}
      >
        {/* First set of reviews (accessible to screen readers) */}
        {reviews.map((item) => (
          <ReviewCard key={item.id} item={item} />
        ))}

        {/* Second set of reviews rendered in the SAME single track for seamless infinite loop (hidden from screen readers) */}
        {reviews.map((item) => (
          <ReviewCard key={`dup-${item.id}`} item={item} isDuplicate />
        ))}
      </div>
    </div>
  );
}
