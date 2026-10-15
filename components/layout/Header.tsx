"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  // Keep active nav indicator synchronized with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["contact", "clinic-info", "team", "about", "services", "home"];
      const scrollPosition = window.scrollY + 100;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(`#${id === "clinic-info" ? "contact" : id}`);
            return;
          }
        }
      }
      if (window.scrollY < 120) {
        setActiveNav("#home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    setMenuOpen(false);
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
        backgroundColor: "#F8FAF5",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* ── Logo: Cornered Left ── */}
        <Link
          href="#home"
          onClick={() => setActiveNav("#home")}
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

        {/* ── Desktop Nav: Centered ── */}
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
                style={{
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
                  borderBottom: isActive ? "2.5px solid #009AE8" : "2.5px solid transparent",
                  transition: "color 0.2s ease, border-color 0.2s ease",
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
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ── Right on Desktop: CTA Button / Right on Mobile: Hamburger ── */}
        <div className="flex items-center">
          {/* Desktop CTA Button: Cornered Right (hidden on mobile) */}
          <a
            href="#contact"
            onClick={() => setActiveNav("#contact")}
            className="hidden md:inline-flex items-center justify-center"
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
              transition: "all 0.2s ease",
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
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-[#012679] hover:bg-black/5 transition-colors"
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

      {/* ── Mobile Menu Dropdown ── */}
      <div
        id="mobile-menu"
        className="md:hidden"
        aria-hidden={!menuOpen}
        style={{
          position: "absolute",
          top: "72px",
          left: 0,
          right: 0,
          backgroundColor: "#F8FAF5",
          borderTop: "1px solid #e5e7eb",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxHeight: menuOpen ? "380px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.3s ease",
          opacity: menuOpen ? 1 : 0,
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
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  fontSize: "16px",
                  fontWeight: isActive ? 700 : 600,
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                  color: isActive ? "#01277A" : "#009AE8",
                  textDecoration: "none",
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
      </div>
    </header>
  );
}

