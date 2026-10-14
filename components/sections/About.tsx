import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Stress-free handling techniques.",
  "State-of-the-art facility.",
  "Dedicated pet-loving team.",
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--color-bg-section)" }}
      aria-labelledby="about-heading"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Image with Yellow Experience Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <div style={{ aspectRatio: "4/3" }} className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80"
                  alt="A compassionate veterinarian gently examining a puppy in a modern clinic"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Floating yellow experience badge */}
            <div
              className="absolute -bottom-6 -right-2 sm:right-4 rounded-2xl px-6 py-4 shadow-xl max-w-xs"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-label="15 plus years of experience"
            >
              <p className="text-3xl font-extrabold text-amber-950">
                15+ Years
              </p>
              <p className="text-xs font-semibold text-amber-950/90 mt-1 leading-snug">
                of compassionate care in veterinary medicine
              </p>
            </div>
          </div>

          {/* Right — Text */}
          <div className="lg:col-span-6 pt-6 lg:pt-0">
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight"
              style={{ color: "var(--color-primary)" }}
            >
              A Veterinary Clinic That<br />Feels Like Home.
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--color-text-medium)" }}
            >
              At Aleef Veterinary, we believe going to the vet shouldn&apos;t be
              stressful. Our clinic is designed to provide a calm, welcoming
              environment for pets and their families. From routine checkups to
              advanced medical care, your pet&apos;s well-being is our top
              priority.
            </p>

            {/* Feature list */}
            <ul className="space-y-3.5 mb-8" aria-label="Clinic features">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#about"
              className="btn-navy focus-ring"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
