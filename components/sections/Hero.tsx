"use client";

import Image from "next/image";
import { Star, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section
        id="home"
        aria-label="Hero section"
        className="relative overflow-hidden font-quicksand text-white"
        style={{
          backgroundColor: "#203E7D",
          paddingTop: "clamp(96px, 10vw, 124px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
          isolation: "isolate",
        }}
      >
        {/* Subtle decorative background vector from Figma */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "20%",
            right: "20%",
            top: "30%",
            bottom: "20%",
            background: "rgba(0, 69, 39, 0.05)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Main 2-column Container: Full width edge-to-edge */}
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
          {/* ── Left Column (Content) ── */}
          <div
            style={{
              flex: "1 1 0%",
              minWidth: 0,
              maxWidth: "580px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {/* Header Text Group */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                width: "100%",
              }}
            >
              {/* PROACTIVE PET WELLNESS Eyebrow */}
              <p
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#F0C051",
                  margin: 0,
                }}
              >
                PROACTIVE PET WELLNESS
              </p>

              {/* Caring for Your Pets, Every Step of the Way. */}
              <h1
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3.8vw, 48px)",
                  lineHeight: "clamp(40px, 4.6vw, 58px)",
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Caring for Your Pets,
                <br />
                <span className="sm:whitespace-nowrap">
                  <span style={{ color: "#F0C051" }}>Every Step</span> of the Way.
                </span>
              </h1>

              {/* From kitten visits to senior care... */}
              <p
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  lineHeight: "26px",
                  color: "rgba(255, 255, 255, 0.9)",
                  margin: 0,
                  maxWidth: "480px",
                }}
              >
                From kitten visits to senior care, we provide compassionate, modern
                veterinary services to keep your furry family members healthy and happy.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                paddingTop: "12px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                width: "100%",
              }}
            >
              {/* Primary Gold CTA */}
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  minHeight: "48px",
                  backgroundColor: "#F5C842",
                  color: "#012779",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "20px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  boxShadow: "0 3px 12px rgba(245, 200, 66, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#eabf34";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5C842";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                <span>Book an Appointment</span>
                <ArrowRight
                  style={{ width: "15px", height: "15px", strokeWidth: 2.6, color: "#012779" }}
                  aria-hidden="true"
                />
              </a>

              {/* Secondary Outline CTA */}
              <a
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 28px",
                  minHeight: "48px",
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "20px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* ── Right Column (Image with Mint Glow Blur & Border) ── */}
          <div
            className="w-full lg:max-w-[500px] flex justify-center lg:justify-end relative"
            style={{
              flex: "1 1 0%",
              minWidth: 0,
              isolation: "isolate",
            }}
          >
            {/* Background Mint Glow Blur: #D1F2E5, 120px, blur 20px */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                right: "-12px",
                top: "-12px",
                background: "#D1F2E5",
                opacity: 0.55,
                filter: "blur(20px)",
                borderRadius: "9999px",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* Rounded Border Box with Image */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "500px",
                borderRadius: "24px",
                border: "3.5px solid rgba(209, 242, 229, 0.25)",
                boxShadow: "0px 20px 40px -10px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                backgroundColor: "#203E7D",
              }}
            >
              <Image
                src="/hero-consultation.png"
                alt="Veterinarian with tablet consulting with a pet owner and a large white dog"
                width={520}
                height={460}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Golden Trust Strip ─── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#F5C842",
          borderTop: "1px solid rgba(0, 69, 39, 0.12)",
        }}
        aria-label="Trust highlights"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(20px, 4vw, 48px)",
              flexWrap: "wrap",
            }}
          >
            {/* 500+ Five-Star Reviews */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    style={{
                      width: "15px",
                      height: "15px",
                      fill: "#004527",
                      stroke: "none",
                      color: "#004527",
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#004527",
                  whiteSpace: "nowrap",
                }}
              >
                500+ Five-Star Reviews
              </span>
            </div>

            {/* Divider */}
            <div
              className="hidden sm:block"
              style={{
                height: "20px",
                width: "1.5px",
                backgroundColor: "rgba(0, 69, 39, 0.25)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />

            {/* Certified Professionals */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck
                style={{
                  width: "18px",
                  height: "18px",
                  color: "#004527",
                  strokeWidth: 2.4,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#004527",
                  whiteSpace: "nowrap",
                }}
              >
                Certified Professionals
              </span>
            </div>

            {/* Divider */}
            <div
              className="hidden sm:block"
              style={{
                height: "20px",
                width: "1.5px",
                backgroundColor: "rgba(0, 69, 39, 0.25)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />

            {/* Fear-Free Certified */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Heart
                style={{
                  width: "18px",
                  height: "18px",
                  color: "#004527",
                  strokeWidth: 2.4,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#004527",
                  whiteSpace: "nowrap",
                }}
              >
                Fear-Free Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
