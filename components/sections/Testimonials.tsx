import CardReveal from "@/components/ui/CardReveal";

const testimonials = [
  {
    id: "testimonial-1",
    quote:
      "Professional grooming services to keep your pets looking and feeling their best.",
    quoteColor: "#FF8A65",
    author: "Jane Doe & Buster",
    initials: "JD",
    avatarBg: "#203E7D",
  },
  {
    id: "testimonial-2",
    quote:
      "Comprehensive wellness exams to ensure your furry friends stay healthy and happy.",
    quoteColor: "#0F8B8D",
    author: "Mark Smith & Luna",
    initials: "MS",
    avatarBg: "#F0C051",
  },
  {
    id: "testimonial-3",
    quote:
      "Safe and advanced surgical procedures performed by our experienced veterinary team.",
    quoteColor: "#FF8A65",
    author: "Alice Wong & Kiwi",
    initials: "AW",
    avatarBg: "#203E7D",
  },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg
      width="46"
      height="33"
      viewBox="0 0 46 33"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.2 }}
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M12.6 32.5C5.6 32.5 0 26.9 0 19.9C0 11.2 6.5 3.5 16.2 0L19.4 4.5C12.5 7.4 8.6 11.9 8.1 16.5C9.5 15.8 11.1 15.4 12.8 15.4C18.6 15.4 23.3 20.1 23.3 25.9C23.3 29.5 20.4 32.5 16.8 32.5H12.6ZM35.3 32.5C28.3 32.5 22.7 26.9 22.7 19.9C22.7 11.2 29.2 3.5 38.9 0L42.1 4.5C35.2 7.4 31.3 11.9 30.8 16.5C32.2 15.8 33.8 15.4 35.5 15.4C41.3 15.4 46 20.1 46 25.9C46 29.5 43.1 32.5 39.5 32.5H35.3Z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#C8D3EA] py-14 lg:py-20 scroll-mt-[80px]"
      style={{ backgroundColor: "#C8D3EA" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Heading */}
        <div
          className="w-full text-center mb-10 lg:mb-14"
        >
          <h2
            id="testimonials-heading"
            className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center"
            style={{ color: "#203E7D" }}
          >
            What Pet Owners Say
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch">
          {testimonials.map((item, idx) => (
            <CardReveal
              as="article"
              key={item.id}
              id={item.id}
              delay={idx * 80}
              duration={520}
              y={16}
              threshold={0.15}
              interactiveHover={true}
              className="relative bg-white rounded-[24px] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md h-full"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                isolation: "isolate",
              }}
              aria-label={`Testimonial from ${item.author}`}
            >
              {/* Quote Mark Icon in Top-Right */}
              <div
                className="absolute top-5 right-5 pointer-events-none z-0"
              >
                <QuoteIcon color={item.quoteColor} />
              </div>

              {/* Quote Text */}
              <div className="relative z-10 mb-6 pr-6">
                <p
                  className="font-liberation italic font-normal text-[15px] sm:text-[16px] leading-[25px] text-[#3D4949] text-left"
                  style={{ color: "#3D4949" }}
                >
                  {item.quote}
                </p>
              </div>

              {/* Author Row */}
              <div
                className="relative z-10 flex flex-row items-center gap-3.5"
              >
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
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
