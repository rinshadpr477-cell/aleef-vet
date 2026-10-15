import Reveal from "@/components/ui/Reveal";
import ReviewMarquee, { ReviewItem } from "@/components/ui/ReviewMarquee";

// Placeholders to replace with real client reviews
const reviews: ReviewItem[] = [
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
  // The following 5 reviews are placeholders to be replaced with real reviews:
  {
    id: "testimonial-4",
    quote:
      "The emergency care team was incredible when Milo got injured. So calm, fast, and caring.",
    quoteColor: "#0F8B8D",
    author: "Carlos Mendez & Milo",
    initials: "CM",
    avatarBg: "#F0C051",
  },
  {
    id: "testimonial-5",
    quote:
      "Gentle handling and serene clinic vibes. My timid rescue cat felt relaxed for the first time.",
    quoteColor: "#FF8A65",
    author: "Sarah Jenkins & Bella",
    initials: "SJ",
    avatarBg: "#203E7D",
  },
  {
    id: "testimonial-6",
    quote:
      "Thorough diagnostics and honest recommendations. We wouldn't trust our pup with anyone else.",
    quoteColor: "#0F8B8D",
    author: "David Patel & Oliver",
    initials: "DP",
    avatarBg: "#F0C051",
  },
  {
    id: "testimonial-7",
    quote:
      "Dental surgery was seamless and recovery was quick. Their follow-up checkups were exceptional.",
    quoteColor: "#FF8A65",
    author: "Emily Clark & Cooper",
    initials: "EC",
    avatarBg: "#203E7D",
  },
  {
    id: "testimonial-8",
    quote:
      "Warm greetings at the front desk and expert medical care every visit. Outstanding clinic all around.",
    quoteColor: "#0F8B8D",
    author: "Tariq Al-Mansoor & SimSim",
    initials: "TA",
    avatarBg: "#F0C051",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#C8D3EA] py-14 lg:py-20 scroll-mt-[80px] overflow-hidden"
      style={{ backgroundColor: "#C8D3EA" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full flex flex-col items-center">
        {/* Section Heading */}
        <Reveal
          delay={0}
          y={24}
          duration={0.6}
          className="w-full text-center mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-6 lg:px-8"
        >
          <h2
            id="testimonials-heading"
            className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center"
            style={{ color: "#203E7D" }}
          >
            What Pet Owners Say
          </h2>
        </Reveal>

        {/* Continuous sliding news-ticker marquee */}
        <ReviewMarquee reviews={reviews} reverse={false} />
      </div>
    </section>
  );
}
