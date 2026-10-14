import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const teamMembers = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    nameColor: "#F0C051",
    role: "Lead Veterinarian",
    roleBg: "rgba(165, 179, 206, 0.34)",
    roleColor: "#203E7D",
    description: "Specializes in small animal surgery and internal medicine.",
    image: "/team/dr-sarah-jenkins.jpg",
    alt: "Dr. Sarah Jenkins, Lead Veterinarian",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    nameColor: "#203E7D",
    role: "Veterinary Dentist",
    roleBg: "rgba(240, 192, 81, 0.20)",
    roleColor: "#F0C051",
    description: "Passionate about preventative care and pet dental health.",
    image: "/team/dr-michael-chen.jpg",
    alt: "Dr. Michael Chen, Veterinary Dentist",
  },
  {
    id: "dr-emily-roberts",
    name: "Dr. Emily Roberts",
    nameColor: "#F0C051",
    role: "Exotics Specialist",
    roleBg: "#D9E2EE",
    roleColor: "#203E7D",
    description: "Expert care for birds, reptiles, and small mammals.",
    image: "/team/dr-emily-roberts.jpg",
    alt: "Dr. Emily Roberts, Exotics Specialist",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full bg-[#FAFDFF] py-14 lg:py-20 scroll-mt-[80px]"
      style={{ backgroundColor: "#FAFDFF" }}
      aria-labelledby="team-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Heading */}
        <ScrollReveal
          delay={0}
          y={16}
          className="w-full text-center mb-10 lg:mb-14"
        >
          <h2
            id="team-heading"
            className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center"
            style={{ color: "#203E7D" }}
          >
            Meet Our Veterinary Team
          </h2>
        </ScrollReveal>

        {/* Team Cards Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch">
          {teamMembers.map((member, idx) => (
            <ScrollReveal
              as="article"
              key={member.id}
              id={member.id}
              delay={idx * 80}
              y={16}
              className="bg-[#F4FAFF] rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
              style={{
                backgroundColor: "#F4FAFF",
                borderRadius: "24px",
              }}
              aria-label={`${member.name}, ${member.role}`}
            >
              {/* Image Container */}
              <div
                className="relative w-full h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden"
                style={{
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                  priority
                />
              </div>

              {/* Card Body */}
              <div
                className="flex flex-col items-center text-center p-6 sm:p-7 flex-grow"
              >
                {/* Doctor Name */}
                <h3
                  className="font-liberation font-semibold text-lg sm:text-[21px] leading-snug text-center"
                  style={{ color: member.nameColor }}
                >
                  {member.name}
                </h3>

                {/* Role Badge */}
                <div className="mt-2.5 flex justify-center items-center">
                  <span
                    className="inline-flex items-center justify-center font-liberation font-semibold text-[13px] leading-tight px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: member.roleBg,
                      color: member.roleColor,
                      borderRadius: "9999px",
                    }}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-3.5 flex justify-center">
                  <p
                    className="font-liberation font-normal text-[14px] sm:text-[15px] leading-[23px] text-[#3D4949] text-center max-w-[280px]"
                    style={{ color: "#3D4949" }}
                  >
                    {member.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
