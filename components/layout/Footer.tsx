import Link from "next/link";
import { PawPrint, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-[#FAFDFF] pt-12 lg:pt-16 pb-8"
      style={{ backgroundColor: "#FAFDFF" }}
      role="contentinfo"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10 lg:gap-12">
        {/* Main 4 Columns with exact proportional gap spanning corner to corner */}
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 items-start"
        >
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col items-start gap-3.5">
            {/* Logo */}
            <div className="flex flex-row items-center gap-2.5">
              <PawPrint className="w-6 h-6 text-[#203E7D] flex-shrink-0" />
              <span className="font-quicksand font-bold text-lg text-[#203E7D]">
                Aleef Veterinary
              </span>
            </div>

            {/* Tagline */}
            <p className="font-quicksand font-normal text-sm sm:text-[15px] leading-[23px] text-[#404942]">
              Compassionate care for every family member. We are dedicated to providing the
              highest standard of veterinary medicine.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start gap-3.5">
            <h3 className="font-quicksand font-semibold text-lg sm:text-[20px] leading-tight text-[#203E7D]">
              Quick Links
            </h3>

            <ul className="flex flex-col gap-2.5 w-full font-quicksand text-sm sm:text-[15px] text-[#404942]">
              <li>
                <Link
                  href="#home"
                  className="hover:text-[#203E7D] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-[#203E7D] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-[#203E7D] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="hover:text-[#203E7D] transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-[#203E7D] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-start gap-3.5">
            <h3 className="font-quicksand font-semibold text-lg sm:text-[20px] leading-tight text-[#203E7D]">
              Contact
            </h3>

            <div className="flex flex-col gap-2.5 w-full">
              {/* Address */}
              <div className="flex flex-row items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#404942] flex-shrink-0" />
                <span className="font-quicksand font-normal text-sm sm:text-[15px] leading-snug text-[#404942]">
                  123 Pet Lane, Abu Dhabi
                </span>
              </div>

              {/* Phone */}
              <div className="flex flex-row items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#404942] flex-shrink-0" />
                <a
                  href="tel:026747484"
                  className="font-quicksand font-normal text-sm sm:text-[15px] leading-snug text-[#404942] hover:text-[#203E7D] transition-colors"
                >
                  02 674 7484
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-row items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#404942] flex-shrink-0" />
                <a
                  href="mailto:hello@aleefvet.com"
                  className="font-quicksand font-normal text-sm sm:text-[15px] leading-snug text-[#404942] hover:text-[#203E7D] transition-colors"
                >
                  hello@aleefvet.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours */}
          <div className="flex flex-col items-start gap-3.5 w-full">
            <h3 className="font-quicksand font-semibold text-lg sm:text-[20px] leading-tight text-[#203E7D]">
              Hours
            </h3>

            <div className="flex flex-col gap-2 w-full">
              {/* Mon - Fri */}
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                  Mon - Fri:
                </span>
                <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                  8:00 AM - 8:00 PM
                </span>
              </div>

              {/* Saturday */}
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                  Saturday:
                </span>
                <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                  9:00 AM - 5:00 PM
                </span>
              </div>

              {/* Sunday */}
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                  Sunday:
                </span>
                <span className="font-quicksand font-normal text-sm sm:text-[15px] text-[#404942]">
                  Closed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Border & Links Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 w-full"
          style={{
            borderTop: "1px solid rgba(191, 201, 191, 0.3)",
          }}
        >
          {/* Copyright */}
          <p className="font-quicksand font-normal text-xs sm:text-[13px] text-[#404942] text-center sm:text-left">
            &copy; 2026 Aleef Veterinary Clinic. Compassionate care for every family member.
          </p>

          {/* 4 Legal Links with exact proportional gap */}
          <nav
            className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/privacy-policy"
              className="font-quicksand font-normal text-xs sm:text-[13px] text-[#404942] hover:text-[#203E7D] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-quicksand font-normal text-xs sm:text-[13px] text-[#404942] hover:text-[#203E7D] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/faq"
              className="font-quicksand font-normal text-xs sm:text-[13px] text-[#404942] hover:text-[#203E7D] transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#contact"
              className="font-quicksand font-normal text-xs sm:text-[13px] text-[#404942] hover:text-[#203E7D] transition-colors"
            >
              Emergency Care
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
