"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Headset, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import Reveal from "@/components/ui/Reveal";

const serviceOptions = [
  { value: "grooming", label: "Grooming" },
  { value: "check-up", label: "Check-up / Wellness Exam" },
  { value: "surgery", label: "Surgery" },
  { value: "ultrasound", label: "Ultrasound / Diagnostic Imaging" },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");

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
        setServerMessage(json.message ?? "Message sent successfully! We will get back to you shortly.");
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

  return (
    <section
      id="contact"
      className="relative w-full bg-[#ECF3FF] py-14 lg:py-20 scroll-mt-[80px]"
      style={{ backgroundColor: "#ECF3FF" }}
      aria-labelledby="contact-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Column: Heading, Subtitle & Expert Support Card */}
          <Reveal
            delay={0}
            y={24}
            duration={0.6}
            className="flex flex-col items-start gap-5 lg:gap-6 w-full lg:max-w-[560px]"
          >
            {/* Heading */}
            <h2
              id="contact-heading"
              className="font-quicksand font-bold text-[#203E7D] text-3xl sm:text-4xl lg:text-[40px] leading-tight"
              style={{ color: "#203E7D" }}
            >
              Have a Question? Get in Touch
            </h2>

            {/* Subtitle */}
            <p
              className="font-quicksand font-medium text-base sm:text-[17px] leading-relaxed text-[#404942]"
              style={{ color: "#404942" }}
            >
              We&apos;re here to help you and your furry friends. Fill out the form, and
              our team will get back to you as soon as possible.
            </p>

            {/* Expert Support Card */}
            <div
              className="w-full flex flex-col items-start p-6 sm:p-7 gap-3.5 rounded-[24px] mt-2"
              style={{
                backgroundColor: "rgba(200, 211, 234, 0.21)",
                border: "1px solid rgba(209, 242, 229, 0.2)",
                borderRadius: "24px",
              }}
            >
              <div className="flex flex-row items-center gap-3">
                <Headset className="w-6 h-6 text-[#203E7D] flex-shrink-0" />
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
                Our dedicated team of veterinary professionals is ready to answer your
                questions about our services and pet care.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Contact Form Card */}
          <Reveal
            delay={0.15}
            y={24}
            duration={0.6}
            className="w-full lg:max-w-[580px] bg-white rounded-[24px] p-6 sm:p-8 lg:p-9 relative flex-shrink-0"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D1F2E5",
              borderRadius: "24px",
              boxShadow:
                "0px 16px 28px -6px rgba(0, 0, 0, 0.08), 0px 8px 12px -6px rgba(0, 0, 0, 0.06)",
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
                {/* Pet Owner's Name */}
                <div className="flex flex-col gap-1.5">
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
                    className={`w-full h-[46px] sm:h-[48px] px-4 rounded-full bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#203E7D]/20 border ${
                      errors.ownerName
                        ? "border-red-400 focus:border-red-500"
                        : "border-[rgba(191,201,191,0.5)] focus:border-[#203E7D]"
                    }`}
                  />
                  {errors.ownerName && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.ownerName.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
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
                    className={`w-full h-[46px] sm:h-[48px] px-4 rounded-full bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#203E7D]/20 border ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-[rgba(191,201,191,0.5)] focus:border-[#203E7D]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Pet's Name + Service Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Pet's Name */}
                <div className="flex flex-col gap-1.5">
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
                    className={`w-full h-[46px] sm:h-[48px] px-4 rounded-full bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#203E7D]/20 border ${
                      errors.petName
                        ? "border-red-400 focus:border-red-500"
                        : "border-[rgba(191,201,191,0.5)] focus:border-[#203E7D]"
                    }`}
                  />
                  {errors.petName && (
                    <span className="text-xs text-red-500 font-medium px-2">
                      {errors.petName.message}
                    </span>
                  )}
                </div>

                {/* Service Needed Dropdown */}
                <div className="flex flex-col gap-1.5">
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
                      className="w-full h-[46px] sm:h-[48px] px-4 pr-10 rounded-full bg-white font-quicksand text-sm sm:text-[15px] text-[#191C19] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#203E7D]/20 border border-[rgba(191,201,191,0.5)] focus:border-[#203E7D] appearance-none cursor-pointer"
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
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="flex flex-col gap-1.5">
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
                  className={`w-full h-[110px] p-3.5 rounded-[18px] bg-white font-quicksand text-sm sm:text-[15px] placeholder:text-[#6B7280] text-[#191C19] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#203E7D]/20 border resize-none ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-[rgba(191,201,191,0.5)] focus:border-[#203E7D]"
                  }`}
                />
                {errors.message && (
                  <span className="text-xs text-red-500 font-medium px-2">
                    {errors.message.message}
                  </span>
                )}
              </div>

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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[48px] sm:h-[50px] rounded-full bg-[#F0C051] hover:bg-[#e2b343] active:scale-[0.99] font-quicksand font-semibold text-[15px] text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 mt-1"
                style={{
                  backgroundColor: "#F0C051",
                  borderRadius: "9999px",
                }}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
