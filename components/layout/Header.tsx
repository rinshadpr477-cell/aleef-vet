"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm py-3.5"
          : "bg-white py-4.5"
      }`}
      role="banner"
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2.5 focus-ring rounded-lg group"
          aria-label="Aleef Veterinary — go to homepage"
        >
          <PawPrint
            className="w-6 h-6 text-[#1F3D7C] fill-[#1F3D7C]"
            aria-hidden="true"
          />
          <span className="font-extrabold text-xl tracking-tight text-[#009FD9]">
            Aleef Veterinary
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors duration-200 focus-ring rounded px-1 relative ${
                link.active
                  ? "font-bold text-[#1F3D7C] after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1F3D7C] after:rounded-full"
                  : "font-medium text-[#009FD9] hover:text-[#0080b0]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center bg-[#1F3D7C] hover:bg-[#172e5c] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all focus-ring shadow-sm"
        >
          Book an Appointment
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg focus-ring text-[#1F3D7C]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="bg-white border-t px-6 py-4 flex flex-col gap-1 border-slate-100"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-base font-medium py-3 border-b border-slate-100 text-[#009FD9] hover:text-[#1F3D7C]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="bg-[#1F3D7C] text-white font-semibold py-3 rounded-full mt-4 text-center justify-center focus-ring"
          >
            Book an Appointment
          </a>
        </nav>
      </div>
    </header>
  );
}
