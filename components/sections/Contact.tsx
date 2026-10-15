"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Headset, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import {
  motionDurations,
  motionEasing,
  motionStagger,
  motionOffsets,
  defaultViewport,
  buttonTapTransition,
} from "@/lib/motion";

const serviceOptions = [
  { value: "grooming", label: "Grooming" },
  { value: "check-up", label: "Check-up / Wellness Exam" },
  { value: "surgery", label: "Surgery" },
  { value: "ultrasound", label: "Ultrasound / Diagnostic Imaging" },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getIsDesktopSnapshot = () => window.innerWidth >= 1024;
const getIsDesktopServerSnapshot = () => false;

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeResize,
    getIsDesktopSnapshot,
    getIsDesktopServerSnapshot
  );
  const isMobile = !isDesktop;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "grooming",
    },
    mode: "onBlur",
  });

  // Revert success button back to normal after 3 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok && json.success) {
        setSubmitStatus("success");
        setServerMessage(
          json.message ??
            "Message sent successfully! We will get back to you shortly."
        );
        reset();
      } else {
        setSubmitStatus("error");
        setServerMessage(
          json.message ??
            "Something went wrong. Please try again or contact us directly at 02 674 7484."
        );
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        "A network error occurred. Please check your connection and try again."
      );
    }
  };

  const baseFieldDelay = shouldReduceMotion ? 0 : isMobile ? 0.5 : 0.7;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#ECF3FF] py-14 lg:py-20 scroll-mt-[80px] overflow-x-clip"
      style={{ backgroundColor: "#ECF3FF" }}
      aria-labelledby="contact-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Column: Heading, Subtitle & Expert Support Card */}
          <div className="flex flex-col items-start gap-5 lg:gap-6 w-full lg:max-w-[560px]">
            {/* Heading: slide in */}
            <motion.h2
              id="contact-heading"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: isDesktop ? -motionOffsets.x : 0, y: isDesktop ? 0 : motionOffsets.yMobile }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                delay: 0,
                ease: motionEasing.entrance,
              }}
              className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight"
              style={{ color: "#203E7D" }}
            >
              Have a Question? Get in Touch
            </motion.h2>

            {/* Subtitle: slide in 0.12s stagger */}
            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: isDesktop ? -motionOffsets.x : 0, y: isDesktop ? 0 : motionOffsets.yMobile }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                delay: shouldReduceMotion ? 0 : motionStagger.cards,
                ease: motionEasing.entrance,
              }}
              className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942]"
              style={{ color: "#404942" }}
            >
              We&apos;re here to help you and your furry friends. Fill out the form,
              and our team will get back to you as soon as possible.
            </motion.p>

            {/* Expert Support Card: slide in 0.24s, then gentle float loop + headset wiggle */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: isDesktop ? -motionOffsets.x : 0, y: isDesktop ? 0 : motionOffsets.yMobile }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: shouldReduceMotion ? 0.2 : motionDurations.base,
                delay: shouldReduceMotion ? 0 : motionStagger.cards * 2,
                ease: motionEasing.entrance,
              }}
              className="w-full mt-2"
            >
              <motion.div
                animate={
                  !isMobile && !shouldReduceMotion && isSectionInView
                    ? { y: [0, -6, 0] }
                    : { y: 0 }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
                className="w-full flex flex-col items-start p-6 sm:p-7 gap-3.5 rounded-[24px]"
                style={{
                  backgroundColor: "rgba(200, 211, 234, 0.21)",
                  border: "1px solid rgba(209, 242, 229, 0.2)",
                  borderRadius: "24px",
                }}
              >
                <div className="flex flex-row items-center gap-3">
                  <motion.div
                    animate={
                      !shouldReduceMotion && isSectionInView
                        ? { rotate: [0, -10, 10, 0, 0] }
                        : { rotate: 0 }
                    }
                    transition={{
                      duration: 6,
                      times: [0, 0.03, 0.07, 0.1, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2,
                    }}
                    className="inline-flex flex-shrink-0"
                  >
                    <Headset className="w-6 h-6 text-[#203E7D] flex-shrink-0" />
                  </motion.div>
                  <h3
                    className="font-quicksand font-semibold text-base sm:text-[18px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Expert Support
                  </h3>
                </div>
                <p
                  className="font-quicksand font-normal text-[14px] sm:text-[15px] leading-[23px] text-[#404942]"
                  style={{ color: "#404942" }}
                >
                  Our dedicated team of veterinary professionals is ready to answer
                  your questions about our services and pet care.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form Card */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : isMobile
                ? { opacity: 0, y: motionOffsets.yMobile, scale: 1 }
                : {
                    opacity: 0,
                    y: 80,
                    scale: 0.97,
                    boxShadow:
                      "0px 4px 6px -2px rgba(0, 0, 0, 0.03), 0px 2px 4px -2px rgba(0, 0, 0, 0.02)",
                  }
            }
            whileInView={
              isMobile
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    boxShadow:
                      "0px 16px 28px -6px rgba(0, 0, 0, 0.08), 0px 8px 12px -6px rgba(0, 0, 0, 0.06)",
                  }
            }
            viewport={defaultViewport}
            transition={{
              duration: isMobile ? motionDurations.base : 0.8,
              ease: motionEasing.entrance,
            }}
            className="w-full lg:max-w-[580px] bg-white rounded-[24px] p-6 sm:p-8 lg:p-9 relative flex-shrink-0"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D1F2E5",
              borderRadius: "24px",
            }}
          >
            {/* Feedback alert messages */}
            {submitStatus === "success" && (
              <div
                className="mb-5 p-3.5 rounded-xl flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium"
                role="status"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <p>{serverMessage}</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className="mb-5 p-3.5 rounded-xl flex items-center gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                <p>{serverMessage}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4 w-full"
            >
              {/* Row 1: Pet Owner's Name + Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Field 0: Pet Owner's Name */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{
                    duration: 0.4,
                    delay: baseFieldDelay + 0 * motionStagger.small,
                    ease: motionEasing.entrance,
                  }}
                  className="contact-field-group flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="ownerName"
                    className="font-quicksand font-semibold text-[13px] sm:text-[14px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Pet Owner&apos;s Name
                  </label>
                  <input
                    id="ownerName"
                    type="text"
                    placeholder="Your Name"
                    {...register("ownerName")}
                    className={`w-full h-[46px] sm:h-[48px] px-4 rounded-full bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none border ${
                      errors.ownerName
                        ? "border-red-400"
                        : "border-[rgba(191,201,191,0.5)]"
                    }`}
                  />
                  {errors.ownerName && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.ownerName.message}
                    </span>
                  )}
                </motion.div>

                {/* Field 1: Email Address */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{
                    duration: 0.4,
                    delay: baseFieldDelay + 1 * motionStagger.small,
                    ease: motionEasing.entrance,
                  }}
                  className="contact-field-group flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="email"
                    className="font-quicksand font-semibold text-[13px] sm:text-[14px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={`w-full h-[46px] sm:h-[48px] px-4 rounded-full bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none border ${
                      errors.email
                        ? "border-red-400"
                        : "border-[rgba(191,201,191,0.5)]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.email.message}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Row 2: Pet's Name + Service Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Field 2: Pet's Name */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{
                    duration: 0.4,
                    delay: baseFieldDelay + 2 * motionStagger.small,
                    ease: motionEasing.entrance,
                  }}
                  className="contact-field-group flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="petName"
                    className="font-quicksand font-semibold text-[13px] sm:text-[14px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Pet&apos;s Name
                  </label>
                  <input
                    id="petName"
                    type="text"
                    placeholder="Pet's Name"
                    {...register("petName")}
                    className={`w-full h-[46px] sm:h-[48px] px-4 rounded-full bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none border ${
                      errors.petName
                        ? "border-red-400"
                        : "border-[rgba(191,201,191,0.5)]"
                    }`}
                  />
                  {errors.petName && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.petName.message}
                    </span>
                  )}
                </motion.div>

                {/* Field 3: Service Needed Dropdown */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{
                    duration: 0.4,
                    delay: baseFieldDelay + 3 * motionStagger.small,
                    ease: motionEasing.entrance,
                  }}
                  className="contact-field-group flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="service"
                    className="font-quicksand font-semibold text-[13px] sm:text-[14px] leading-tight text-[#203E7D]"
                    style={{ color: "#203E7D" }}
                  >
                    Service Needed
                  </label>
                  <div className="relative w-full">
                    <select
                      id="service"
                      {...register("service")}
                      className="w-full h-[46px] sm:h-[48px] px-4 pr-10 rounded-full bg-white font-quicksand text-sm sm:text-[15px] text-[#191C19] outline-none border border-[rgba(191,201,191,0.5)] appearance-none cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                  </div>
                  {errors.service && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.service.message}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Row 3: Message Textarea */}
              {/* Field 4: Message */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.4,
                  delay: baseFieldDelay + 4 * motionStagger.small,
                  ease: motionEasing.entrance,
                }}
                className="contact-field-group flex flex-col gap-1.5"
              >
                <label
                  htmlFor="message"
                  className="font-quicksand font-semibold text-[13px] sm:text-[14px] leading-tight text-[#203E7D]"
                  style={{ color: "#203E7D" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help?"
                  {...register("message")}
                  className={`w-full h-[110px] p-3.5 rounded-[18px] bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none border resize-none ${
                    errors.message
                      ? "border-red-400"
                      : "border-[rgba(191,201,191,0.5)]"
                  }`}
                />
                {errors.message && (
                  <span className="text-xs text-red-500 font-medium px-2">
                    {errors.message.message}
                  </span>
                )}
              </motion.div>

              {/* Honeypot anti-spam field */}
              <input
                type="text"
                {...register("website")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Row 4: Submit Button */}
              {/* Field 5: Send Message button */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.4,
                  delay: baseFieldDelay + 5 * motionStagger.small,
                  ease: motionEasing.entrance,
                }}
                className="w-full mt-1"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "loading"}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -2,
                          boxShadow:
                            "0 10px 20px -3px rgba(240, 192, 81, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={buttonTapTransition}
                  className="relative w-full h-[48px] sm:h-[50px] rounded-full font-quicksand font-semibold text-[15px] text-white flex items-center justify-center transition-colors duration-250 shadow-sm cursor-pointer disabled:opacity-60 overflow-hidden group select-none"
                  style={{
                    backgroundColor:
                      submitStatus === "success" ? "#10B981" : "#F0C051",
                    borderRadius: "9999px",
                  }}
                >
                  {/* Diagonal shine sweep across button every 4s */}
                  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                    <div
                      className={`w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent ${
                        !shouldReduceMotion &&
                        isSectionInView &&
                        submitStatus === "idle"
                          ? "contact-btn-shine"
                          : ""
                      }`}
                    />
                  </div>

                  {/* Button state content */}
                  {isSubmitting || submitStatus === "loading" ? (
                    <span className="inline-flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </span>
                  ) : submitStatus === "success" ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.path
                          d="M20 6L9 17L4 12"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, ease: motionEasing.entrance }}
                        />
                      </svg>
                      <span className="font-quicksand font-semibold text-[15px] text-white">
                        Sent!
                      </span>
                    </span>
                  ) : (
                    <span className="font-quicksand font-semibold text-[15px] text-white">
                      Send Message
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
