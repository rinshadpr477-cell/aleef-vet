"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validation";

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
        setServerMessage(json.message ?? "Message sent successfully!");
        reset();
      } else {
        setSubmitStatus("error");
        setServerMessage(
          json.message ??
            "Something went wrong. Please try again or contact us directly."
        );
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        "A network error occurred. Please check your connection and try again."
      );
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none ${
      hasError
        ? "border-red-400 bg-red-50"
        : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary-light)]"
    }`;

  return (
    <section
      id="contact"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--color-bg-light)" }}
      aria-labelledby="contact-heading"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left — Header & Emergency Care Callout */}
          <div className="pt-2">
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: "var(--color-primary)" }}
            >
              Have a Question? Get in Touch
            </h2>
            <p
              className="text-base leading-relaxed mb-8 text-slate-600"
            >
              Have a question or need to schedule an appointment? Fill out the
              form and our team will get back to you within 24 hours.
            </p>

            {/* Emergency Care Callout Box */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "#EBF3FA",
                borderColor: "#D0E2F2",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#2B4F91" }}
                  aria-hidden="true"
                >
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h3
                  className="font-bold text-base"
                  style={{ color: "var(--color-primary)" }}
                >
                  Emergency Care
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                For life-threatening emergencies during open hours, please call us
                directly at{" "}
                <a
                  href="tel:026747484"
                  className="font-bold text-sky-700 underline hover:text-sky-900"
                >
                  02 674 7484
                </a>{" "}
                for immediate assistance.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="bg-white rounded-3xl p-7 md:p-9 shadow-sm"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {/* Success state */}
            {submitStatus === "success" && (
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{ backgroundColor: "#e8f5e9", border: "1px solid #a5d6a7" }}
                role="alert"
                aria-live="polite"
              >
                <CheckCircle
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600"
                  aria-hidden="true"
                />
                <p className="text-green-800 text-sm font-medium">
                  {serverMessage}
                </p>
              </div>
            )}

            {/* Error state */}
            {submitStatus === "error" && (
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{ backgroundColor: "#fff3f3", border: "1px solid #f5c6cb" }}
                role="alert"
                aria-live="polite"
              >
                <AlertCircle
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600"
                  aria-hidden="true"
                />
                <p className="text-red-800 text-sm font-medium">
                  {serverMessage}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact and appointment booking form"
            >
              {/* Honeypot field — hidden from users */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Owner Name */}
                <div>
                  <label
                    htmlFor="ownerName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Your Name{" "}
                    <span aria-label="required" style={{ color: "#c0392b" }}>
                      *
                    </span>
                  </label>
                  <input
                    id="ownerName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your Name"
                    className={inputClass(!!errors.ownerName)}
                    aria-required="true"
                    aria-describedby={
                      errors.ownerName ? "ownerName-error" : undefined
                    }
                    {...register("ownerName")}
                  />
                  {errors.ownerName && (
                    <p
                      id="ownerName-error"
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.ownerName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Email Address{" "}
                    <span aria-label="required" style={{ color: "#c0392b" }}>
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass(!!errors.email)}
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Pet Name */}
                <div>
                  <label
                    htmlFor="petName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Pet&apos;s Name{" "}
                    <span aria-label="required" style={{ color: "#c0392b" }}>
                      *
                    </span>
                  </label>
                  <input
                    id="petName"
                    type="text"
                    placeholder="Your pet's name"
                    className={inputClass(!!errors.petName)}
                    aria-required="true"
                    aria-describedby={
                      errors.petName ? "petName-error" : undefined
                    }
                    {...register("petName")}
                  />
                  {errors.petName && (
                    <p
                      id="petName-error"
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.petName.message}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Service Needed{" "}
                    <span aria-label="required" style={{ color: "#c0392b" }}>
                      *
                    </span>
                  </label>
                  <select
                    id="service"
                    className={`${inputClass(!!errors.service)} appearance-none`}
                    aria-required="true"
                    aria-describedby={
                      errors.service ? "service-error" : undefined
                    }
                    {...register("service")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p
                      id="service-error"
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.service.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Message{" "}
                    <span aria-label="required" style={{ color: "#c0392b" }}>
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your pet and how we can help…"
                    className={`${inputClass(!!errors.message)} resize-none`}
                    aria-required="true"
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "loading"}
                className="btn-primary w-full justify-center mt-6 text-base focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ color: "var(--color-text-dark)" }}
                aria-label={
                  isSubmitting || submitStatus === "loading"
                    ? "Sending your message…"
                    : "Send Message"
                }
              >
                {isSubmitting || submitStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              <p
                className="text-xs mt-4 text-center"
                style={{ color: "var(--color-text-light)" }}
              >
                Fields marked{" "}
                <span style={{ color: "#c0392b" }} aria-hidden="true">
                  *
                </span>{" "}
                are required. We will respond within one business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
