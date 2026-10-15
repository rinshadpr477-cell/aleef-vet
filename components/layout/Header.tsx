"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Menu, X, PawPrint } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

// Mapping each section on the page to its corresponding navigation item
const sectionToNavMap: Record<string, string> = {
  home: "#home",
  services: "#services",
  about: "#about",
  "why-choose-us": "#about",
  team: "#team",
  testimonials: "#contact",
  cta: "#contact",
  "clinic-info": "#contact",
  contact: "#contact",
};

const subscribeScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};
const getScrolledSnapshot = () => window.scrollY > 20;
const getScrolledServerSnapshot = () => false;

export default function Header() {
  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot
  );

  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active section tracking using IntersectionObserver (rootMargin "-40% 0px -50% 0px")
  useEffect(() => {
    const sectionIds = Object.keys(sectionToNavMap);
    const intersectingMap = new Map<string, IntersectionObserverEntry>();

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingMap.set(entry.target.id, entry);
        } else {
          intersectingMap.delete(entry.target.id);
        }
      });

      if (isClickingRef.current) return;

      // Handle top of page edge case
      if (window.scrollY < 60) {
        setActiveNav("#home");
        return;
      }

      // Handle bottom of page edge case
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveNav("#contact");
        return;
      }

      const activeEntries = Array.from(intersectingMap.values());
      if (activeEntries.length > 0) {
        // Pick the intersecting section closest to the center of the detection band (45% viewport line)
        const targetY = window.innerHeight * 0.45;
        activeEntries.sort((a, b) => {
          const rectA = a.target.getBoundingClientRect();
          const rectB = b.target.getBoundingClientRect();
          const distA = Math.abs((rectA.top + rectA.bottom) / 2 - targetY);
          const distB = Math.abs((rectB.top + rectB.bottom) / 2 - targetY);
          return distA - distB;
        });

        const bestEntry = activeEntries[0];
        const mappedNav = sectionToNavMap[bestEntry.target.id];
        if (mappedNav) {
          setActiveNav(mappedNav);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollEdge = () => {
      if (isClickingRef.current) return;
      if (window.scrollY < 60) {
        setActiveNav("#home");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveNav("#contact");
      }
    };

    window.addEventListener("scroll", handleScrollEdge, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollEdge);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    setMenuOpen(false);

    // Lock observer temporarily during smooth scroll to prevent jitter
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 750);
  };

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "72px",
        backgroundColor: isScrolled ? "rgba(248, 250, 245, 0.95)" : "#F8FAF5",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled
          ? "0 4px 20px -2px rgba(0, 38, 121, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)"
          : "0px 1px 3px rgba(0, 0, 0, 0.05)",
        transition:
          "background-color 250ms ease, box-shadow 250ms ease, backdrop-filter 250ms ease, -webkit-backdrop-filter 250ms ease",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* ── Logo: Cornered Left ── */}
        <Link
          href="#home"
          onClick={() => handleNavClick("#home")}
          aria-label="Aleef Veterinary — go to homepage"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
          }}
        >
          <PawPrint
            aria-hidden="true"
            style={{
              width: "26px",
              height: "25px",
              color: "#012679",
              fill: "#012679",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "26px",
              color: "#019AE7",
              whiteSpace: "nowrap",
            }}
          >
            Aleef Veterinary
          </span>
        </Link>

        {/* ── Desktop Nav: Centered with Framer Motion layoutId Moving Underline ── */}
        <nav
          className="hidden md:flex"
          aria-label="Main navigation"
          style={{
            alignItems: "center",
            gap: "28px",
            height: "32px",
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeNav === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                aria-current={isActive ? "page" : undefined}
                className="outline-none focus-visible:ring-2 focus-visible:ring-[#009AE8] focus-visible:ring-offset-2 rounded-sm"
                style={{
                  position: "relative",
                  boxSizing: "border-box",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0px 0px 3px",
                  height: "32px",
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  lineHeight: "22px",
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? "#01277A" : "#009AE8",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#01277A";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#009AE8";
                  }
                }}
              >
                <span>{link.label}</span>
                {/* Smooth sliding underline via layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2.5px",
                      backgroundColor: "#009AE8",
                      borderRadius: "9999px",
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }
                    }
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Right on Desktop: CTA Button / Right on Mobile: Hamburger ── */}
        <div className="flex items-center">
          {/* Desktop CTA Button: Cornered Right (hidden on mobile) */}
          <a
            href="#contact"
            onClick={() => handleNavClick("#contact")}
            className="hidden md:inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#203E7D] focus-visible:ring-offset-2"
            style={{
              backgroundColor: "#203E7D",
              color: "#FFFFFF",
              fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
              fontSize: "15px",
              lineHeight: "20px",
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: "9999px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(32, 62, 125, 0.15)",
              transition: "background-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#162c5b";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#203E7D";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            Book an Appointment
          </a>

          {/* Mobile Hamburger on Right */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-[#012679] hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#009AE8]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {menuOpen ? <X style={{ width: 26, height: 26 }} /> : <Menu style={{ width: 26, height: 26 }} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown with Smooth 0.3s Height & Fade-Slide Transition ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, height: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, height: "auto" }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, height: 0 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "72px",
              left: 0,
              right: 0,
              backgroundColor: "#F8FAF5",
              borderTop: "1px solid #e5e7eb",
              boxShadow: "0 8px 24px rgba(0, 38, 121, 0.08)",
              overflow: "hidden",
            }}
          >
            <nav
              aria-label="Mobile navigation"
              className="w-full px-5 sm:px-6 py-4 flex flex-col gap-1"
            >
              {navLinks.map((link) => {
                const isActive = activeNav === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-[#009AE8] rounded-sm"
                    style={{
                      fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                      fontSize: "16px",
                      fontWeight: isActive ? 700 : 600,
                      padding: "10px 0",
                      borderBottom: "1px solid #e5e7eb",
                      color: isActive ? "#01277A" : "#009AE8",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => handleNavClick("#contact")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#203E7D",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  marginTop: "12px",
                  textAlign: "center",
                }}
              >
                Book an Appointment
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


