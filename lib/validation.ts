import { z } from "zod";

export const contactSchema = z.object({
  ownerName: z
    .string()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be fewer than 100 characters.")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long.")
    .trim(),

  petName: z
    .string()
    .min(1, "Please enter your pet's name.")
    .max(100, "Pet name must be fewer than 100 characters.")
    .trim(),

  service: z.enum(["grooming", "check-up", "surgery", "ultrasound"], {
    error: "Please select a service.",
  }),

  message: z
    .string()
    .min(10, "Please provide a brief message (at least 10 characters).")
    .max(2000, "Message must be fewer than 2000 characters.")
    .trim(),

  // Honeypot field — should be empty
  website: z.string().max(0, "").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
