import { Award, Microscope, Heart, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "experienced-care",
    icon: Award,
    title: "Experienced Care",
    description:
      "Our vets and support staff bring decades of collective expertise to every case.",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "modern-equipment",
    icon: Microscope,
    title: "Modern Equipment",
    description:
      "State-of-the-art diagnostic technology for fast, accurate assessment of your pet's health.",
    iconBg: "#E0F2FE",
    iconColor: "#2B4F91",
  },
  {
    id: "gentle-compassionate",
    icon: Heart,
    title: "Gentle & Compassionate",
    description:
      "Calming protocols and gentle handling to reduce anxiety for pets and owners alike.",
    iconBg: "#E0F2FE",
    iconColor: "#2B4F91",
  },
  {
    id: "complete-pet-care",
    icon: ShieldCheck,
    title: "Complete Pet Care",
    description:
      "Every pet is treated with the same love and attention we would give our own.",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-16 md:py-20 bg-white"
      aria-labelledby="why-heading"
    >
      <div className="container-main">
        {/* Rounded Panel */}
        <div
          className="rounded-[32px] p-8 md:p-14"
          style={{ backgroundColor: "var(--color-bg-section)" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              id="why-heading"
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--color-primary)" }}
            >
              Why Choose Aleef Veterinary?
            </h2>
          </div>

        {/* 2x2 Horizontal Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-5 hover:shadow-md transition-shadow"
                aria-label={feature.title}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: feature.iconBg }}
                  aria-hidden="true"
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: feature.iconColor }}
                  />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1.5"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-medium)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
