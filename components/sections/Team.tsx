import Image from "next/image";

const team = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Lead Veterinarian",
    bio: "Specialist in small animal internal medicine with 12+ years of experience.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    alt: "Dr. Sarah Jenkins, Lead Veterinarian",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    role: "Veterinary Surgeon",
    bio: "Dedicated to advanced surgical procedures and orthopedic care.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    alt: "Dr. Michael Chen, Veterinary Surgeon",
  },
  {
    id: "dr-emily-roberts",
    name: "Dr. Emily Roberts",
    role: "Feline Specialist",
    bio: "Passionate about feline medicine and stress-free handling.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    alt: "Dr. Emily Roberts, Feline Specialist",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="team-heading"
    >
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "var(--color-primary)" }}
          >
            Meet Our Veterinary Team
          </h2>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <article
              key={member.id}
              id={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow group text-center"
              aria-label={`${member.name}, ${member.role}`}
            >
              {/* Photo */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  {member.name}
                </h3>
                <div className="mb-3">
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "#E0F2FE",
                      color: "#0369A1",
                    }}
                  >
                    {member.role}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-medium)" }}
                >
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
