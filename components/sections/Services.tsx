import { Scissors, Stethoscope, Syringe, Scan, ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "grooming",
    icon: Scissors,
    title: "Grooming",
    description:
      "Professional grooming services to keep your pets looking and feeling their best, from baths to full styling.",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    id: "checkup",
    icon: Stethoscope,
    title: "Check-up",
    description:
      "Comprehensive wellness exams to ensure early detection of health issues and promote long-term vitality.",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "surgery",
    icon: Syringe,
    title: "Surgery",
    description:
      "State-of-the-art surgical facilities and experienced specialists for routine and complex procedures.",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    id: "ultrasound",
    icon: Scan,
    title: "Ultrasound",
    description:
      "Advanced diagnostic ultrasound for non-invasive, detailed imaging of internal organs and tissues.",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-16 md:py-20"
      style={{ backgroundColor: "var(--color-bg-light)" }}
      aria-labelledby="services-heading"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Comprehensive Care
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-medium)" }}
          >
            We offer a full spectrum of veterinary services designed to address
            every aspect of your pet&apos;s health.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                id={`service-${service.id}`}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                aria-label={`${service.title} service`}
              >
                <div>
                  {/* Top: Icon & Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: service.iconBg }}
                      aria-hidden="true"
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: service.iconColor }}
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-sky-600 transition-colors">
                      <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3
                    className="font-bold text-xl mb-3"
                    style={{ color: "var(--color-blue-accent)" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-medium)" }}
                  >
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
