import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

export default function ClinicInfo() {
  return (
    <section
      id="clinic-info"
      className="relative w-full bg-[#FAFDFF] py-14 lg:py-20 scroll-mt-[80px]"
      style={{ backgroundColor: "#FAFDFF" }}
      aria-labelledby="clinic-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Container */}
        <div
          className="w-full text-center mb-10 lg:mb-14 flex flex-col items-center gap-3"
        >
          <h2
            id="clinic-heading"
            className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center"
            style={{ color: "#203E7D" }}
          >
            Find Us
          </h2>
          <p
            className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942] text-center max-w-[620px]"
            style={{ color: "#404942" }}
          >
            Visit our modern clinic in the heart of Abu Dhabi.
          </p>
        </div>

        {/* Content Columns: Left Map + Right Contact Info */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          {/* Left Column: Map */}
          <div
            className="relative w-full lg:max-w-[540px] h-[300px] sm:h-[380px] lg:h-[440px] rounded-[24px] overflow-hidden group shadow-sm flex-shrink-0"
            style={{
              borderRadius: "24px",
              border: "2px solid rgba(209, 242, 229, 0.2)",
            }}
          >
            <a
              href="https://maps.google.com/?q=Abu+Dhabi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Aleef Veterinary Clinic location on Google Maps"
              className="block w-full h-full relative"
            >
              <Image
                src="/clinic-map.png"
                alt="Map showing 123 Pet Lane, Abu Dhabi"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 540px"
                priority
              />
            </a>
          </div>

          {/* Right Column: Contact Info */}
          <div
            className="flex flex-col items-start gap-7 w-full lg:max-w-[580px]"
          >
            {/* Info Items List */}
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Item 1: Address */}
              <div className="flex flex-row items-start gap-4 w-full">
                <div
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(32, 62, 125, 0.2)",
                    borderRadius: "9999px",
                  }}
                  aria-hidden="true"
                >
                  <MapPin className="w-5 h-5 text-[#203E7D]" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[17px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Address
                  </h3>
                  <p
                    className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]"
                    style={{ color: "#404942" }}
                  >
                    123 Pet Lane, Abu Dhabi
                  </p>
                </div>
              </div>

              {/* Item 2: Phone & Email */}
              <div className="flex flex-row items-start gap-4 w-full">
                <div
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(32, 62, 125, 0.2)",
                    borderRadius: "9999px",
                  }}
                  aria-hidden="true"
                >
                  <Phone className="w-5 h-5 text-[#203E7D]" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[17px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Phone &amp; Email
                  </h3>
                  <a
                    href="tel:026747484"
                    className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942] hover:text-[#203E7D] transition-colors"
                    style={{ color: "#404942" }}
                  >
                    02 674 7484
                  </a>
                  <a
                    href="mailto:hello@aleefvet.com"
                    className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942] hover:text-[#203E7D] transition-colors"
                    style={{ color: "#404942" }}
                  >
                    hello@aleefvet.com
                  </a>
                </div>
              </div>

              {/* Item 3: Opening Hours */}
              <div className="flex flex-row items-start gap-4 w-full">
                <div
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(32, 62, 125, 0.2)",
                    borderRadius: "9999px",
                  }}
                  aria-hidden="true"
                >
                  <Clock className="w-5 h-5 text-[#203E7D]" />
                </div>
                <div className="flex flex-col items-start gap-1 w-full max-w-[340px]">
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[17px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Opening Hours
                  </h3>
                  <div className="flex flex-col gap-1 w-full pt-1">
                    {/* Mon - Fri */}
                    <div className="flex flex-row justify-between items-center w-full">
                      <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                        Mon - Fri:
                      </span>
                      <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                        8:00 AM - 8:00 PM
                      </span>
                    </div>

                    {/* Saturday */}
                    <div className="flex flex-row justify-between items-center w-full">
                      <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                        Saturday:
                      </span>
                      <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                        9:00 AM - 5:00 PM
                      </span>
                    </div>

                    {/* Sunday */}
                    <div className="flex flex-row justify-between items-center w-full">
                      <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                        Sunday:
                      </span>
                      <span className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[24px] text-[#404942]">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://maps.google.com/?q=123+Pet+Lane+Abu+Dhabi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#203E7D] hover:bg-[#183063] text-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 mt-2"
              style={{
                backgroundColor: "#203E7D",
                borderRadius: "9999px",
              }}
            >
              <span className="font-quicksand font-semibold text-[15px] leading-normal text-white text-center">
                Get Directions
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-white flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M8 0L9.414 6.586L16 8L9.414 9.414L8 16L6.586 9.414L0 8L6.586 6.586L8 0Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
