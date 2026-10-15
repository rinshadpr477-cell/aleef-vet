"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  motionDurations,
  motionEasing,
  motionStagger,
  motionOffsets,
  defaultViewport,
} from "@/lib/motion";

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const getMobileSnapshot = () => window.innerWidth < 768;
const getMobileServerSnapshot = () => false;

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
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeResize,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  return (
    <section
      id="team"
      className="relative w-full bg-[#FAFDFF] py-14 lg:py-20 scroll-mt-[80px] overflow-x-clip"
      style={{ backgroundColor: "#FAFDFF", overflowX: "clip" }}
      aria-labelledby="team-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* 1. Heading (fade and slide up: y: 30 to 0, 0.6s) */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: motionOffsets.y }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{
            duration: shouldReduceMotion ? 0.2 : motionDurations.base,
            ease: motionEasing.entrance,
          }}
          className="w-full text-center mb-10 lg:mb-14"
        >
          <h2
            id="team-heading"
            className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight text-center"
            style={{ color: "#203E7D" }}
          >
            Meet Our Veterinary Team
          </h2>
        </motion.div>

        {/* Team Cards Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch">
          {teamMembers.map((member, idx) => {
            const cardLandingTime = shouldReduceMotion ? 0 : idx * motionStagger.cards + 0.5;

            return (
              <motion.article
                key={member.id}
                id={member.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: isMobile ? motionOffsets.yMobile : motionOffsets.x }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                  delay: shouldReduceMotion ? 0 : idx * motionStagger.cards,
                  ease: motionEasing.entrance,
                }}
                className="h-full flex flex-col"
                aria-label={`${member.name}, ${member.role}`}
              >
                {/* 5. Inner Card Wrapper with 6px lift and stronger shadow on hover */}
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -6,
                          boxShadow:
                            "0 20px 35px -8px rgba(32, 62, 125, 0.16), 0 8px 16px -4px rgba(32, 62, 125, 0.08)",
                        }
                  }
                  transition={{ duration: 0.25, ease: motionEasing.entrance }}
                  className="group bg-[#F4FAFF] rounded-[24px] overflow-hidden flex flex-col h-full w-full shadow-sm"
                  style={{
                    backgroundColor: "#F4FAFF",
                    borderRadius: "24px",
                    boxShadow: "0px 4px 20px rgba(27, 94, 59, 0.04)",
                  }}
                >
                  {/* 3. Photo Reveal Container (Image wrapper with overflow-hidden and top border radius) */}
                  <div
                    className="relative w-full h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden"
                    style={{
                      borderTopLeftRadius: "24px",
                      borderTopRightRadius: "24px",
                    }}
                  >
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.4, scale: 1.2 }
                      }
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={defaultViewport}
                      transition={{
                        duration: shouldReduceMotion ? 0.2 : 1.0,
                        delay: shouldReduceMotion ? 0 : idx * motionStagger.cards,
                        ease: motionEasing.entrance,
                      }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={member.image}
                        alt={member.alt}
                        fill
                        className="object-cover object-center group-hover:scale-105"
                        style={{
                          transition: "transform 0.4s ease-out",
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* 4. Card Content: Doctor Name, Role Badge, Description (0.08s stagger, y: 16) */}
                  <div className="flex flex-col items-center text-center p-6 sm:p-7 flex-grow">
                    {/* Doctor Name */}
                    <motion.h3
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={defaultViewport}
                      transition={{
                        duration: shouldReduceMotion ? 0.2 : 0.4,
                        delay: cardLandingTime,
                        ease: motionEasing.entrance,
                      }}
                      className="font-liberation font-semibold text-lg sm:text-[21px] leading-snug text-center"
                      style={{
                        color: member.nameColor,
                        willChange: "transform, opacity",
                      }}
                    >
                      {member.name}
                    </motion.h3>

                    {/* Role Badge */}
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={defaultViewport}
                      transition={{
                        duration: shouldReduceMotion ? 0.2 : 0.4,
                        delay: cardLandingTime + motionStagger.small,
                        ease: motionEasing.entrance,
                      }}
                      className="mt-2.5 flex justify-center items-center"
                      style={{ willChange: "transform, opacity" }}
                    >
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
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={defaultViewport}
                      transition={{
                        duration: shouldReduceMotion ? 0.2 : 0.4,
                        delay: cardLandingTime + motionStagger.small * 2,
                        ease: motionEasing.entrance,
                      }}
                      className="mt-3.5 flex justify-center"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <p
                        className="font-liberation font-normal text-[14px] sm:text-[15px] leading-[23px] text-[#3D4949] text-center max-w-[280px]"
                        style={{ color: "#3D4949" }}
                      >
                        {member.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
