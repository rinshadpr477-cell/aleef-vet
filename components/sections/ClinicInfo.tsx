import { MapPin, PhoneCall, Clock } from "lucide-react";

export default function ClinicInfo() {
  return (
    <section
      id="clinic-info"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="clinic-heading"
    >
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="clinic-heading"
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Find Us
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-medium)" }}
          >
            Visit us at our convenient Abu Dhabi location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Left: Map */}
          <div className="lg:col-span-7">
            <div
              className="rounded-3xl overflow-hidden shadow-sm border border-slate-200"
              style={{ minHeight: "360px", height: "100%" }}
            >
              <iframe
                title="Aleef Veterinary Clinic location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=54.3400%2C24.4400%2C54.4000%2C24.4800&layer=mapnik&marker=24.4539%2C54.3773"
                width="100%"
                height="360"
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer"
                aria-label="Map showing location of Aleef Veterinary Clinic in Abu Dhabi"
              />
            </div>
          </div>

          {/* Right: Info Items & Directions Button */}
          <div className="lg:col-span-5 flex flex-col gap-6 pl-0 lg:pl-4">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#E0F2FE" }}
                aria-hidden="true"
              >
                <MapPin className="w-6 h-6" style={{ color: "var(--color-blue-accent)" }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="font-bold text-base" style={{ color: "var(--color-primary)" }}>
                  123 Pet Lane, Abu Dhabi
                </p>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#E0F2FE" }}
                aria-hidden="true"
              >
                <PhoneCall className="w-6 h-6" style={{ color: "var(--color-blue-accent)" }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Phone &amp; Email
                </p>
                <a
                  href="tel:026747484"
                  className="block font-bold text-base hover:text-sky-600 transition-colors"
                  style={{ color: "var(--color-primary)" }}
                >
                  02 674 7484
                </a>
                <a
                  href="mailto:hello@aleefvet.com"
                  className="block text-sm text-slate-600 hover:text-sky-600 transition-colors mt-0.5"
                >
                  hello@aleefvet.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#E0F2FE" }}
                aria-hidden="true"
              >
                <Clock className="w-6 h-6" style={{ color: "var(--color-blue-accent)" }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Opening Hours
                </p>
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-slate-800">
                    Mon &ndash; Thu: <span className="font-normal text-slate-600">8:00 AM &ndash; 8:00 PM</span>
                  </p>
                  <p className="font-semibold text-slate-800">
                    Saturday: <span className="font-normal text-slate-600">9:00 AM &ndash; 6:00 PM</span>
                  </p>
                  <p className="font-semibold text-slate-800">
                    Friday: <span className="font-medium text-amber-700">Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=123+Pet+Lane+Abu+Dhabi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navy focus-ring"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
