import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(50).nullable().optional(),
  apartmentId: z.number().int().positive().nullable().optional(),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  message: z.string().max(2000).nullable().optional(),
});

export type InquiryPayload = z.infer<typeof inquirySchema>;
