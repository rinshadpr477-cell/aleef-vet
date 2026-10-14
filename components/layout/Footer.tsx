import Link from "next/link";
import { PawPrint, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer
      className="bg-white border-t border-slate-200 text-slate-600"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="container-main py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden="true"
              >
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="font-extrabold text-lg tracking-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  Aleef
                </span>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--color-text-light)" }}
                >
                  Veterinary
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Comprehensive and compassionate veterinary care for your beloved pets
              in Abu Dhabi.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="md:col-span-4">
            <h3
              className="font-bold text-base mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-slate-600" aria-label="Contact information">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <span>123 Pet Lane, Abu Dhabi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:026747484"
                  className="hover:text-sky-600 transition-colors"
                >
                  02 674 7484
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@aleefvet.com"
                  className="hover:text-sky-600 transition-colors"
                >
                  hello@aleefvet.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div className="md:col-span-3">
            <h3
              className="font-bold text-base mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              Hours
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-600" aria-label="Opening hours">
              <li className="flex justify-between sm:justify-start sm:gap-4">
                <span className="font-medium text-slate-700">Mon &ndash; Thu:</span>
                <span>8:00 AM &ndash; 8:00 PM</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:gap-4">
                <span className="font-medium text-slate-700">Saturday:</span>
                <span>9:00 AM &ndash; 6:00 PM</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:gap-4">
                <span className="font-medium text-slate-700">Friday:</span>
                <span className="text-amber-700 font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 py-6 bg-slate-50/50">
        <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} Aleef Veterinary Clinic. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label="Legal navigation">
            <Link
              href="/privacy-policy"
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">&bull;</span>
            <Link
              href="/terms"
              className="hover:text-slate-900 transition-colors"
            >
              Terms of Service
            </Link>
            <span aria-hidden="true">&bull;</span>
            <Link
              href="/faq"
              className="hover:text-slate-900 transition-colors"
            >
              FAQ
            </Link>
            <span aria-hidden="true">&bull;</span>
            <Link
              href="/faq#emergency"
              className="hover:text-slate-900 transition-colors"
            >
              Emergency Care
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
