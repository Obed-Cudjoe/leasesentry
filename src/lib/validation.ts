import { z } from "zod";

// Zod schemas for every form. Used on the client (React) and the server (routes),
// so the two never drift apart.

export const contactSchema = z.object({
  name: z.string().min(2, "Please add your name."),
  email: z.string().email("Please add a valid email."),
  message: z.string().min(10, "Please add a little more detail."),
});

export const dietarySchema = z.object({
  name: z.string().min(2, "Please add your name."),
  email: z.string().email("Please add a valid email."),
  allergens: z.array(z.string()).default([]),
  question: z.string().min(10, "Please add a little more detail."),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please add a valid email."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type DietaryInput = z.infer<typeof dietarySchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
