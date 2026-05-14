import { z } from "zod";
import type { TFunction } from "i18next";

export const makeInquiryFormSchema = (t: TFunction) =>
  z
    .object({
      name: z.string().min(1, { message: t("validation.required") }),
      email: z.string().email({ message: t("validation.email") }),
      phone: z.string().optional(),
      apartmentId: z.string().optional(),
      checkIn: z.date({
        required_error: t("validation.required"),
        invalid_type_error: t("validation.required"),
      }),
      checkOut: z.date({
        required_error: t("validation.required"),
        invalid_type_error: t("validation.required"),
      }),
      message: z.string().optional(),
    })
    .refine(
      (data) => {
        const minCheckout = new Date(data.checkIn);
        minCheckout.setDate(minCheckout.getDate() + 1);
        return data.checkOut >= minCheckout;
      },
      { message: t("validation.checkOut"), path: ["checkOut"] }
    );

export type InquiryFormValues = z.infer<ReturnType<typeof makeInquiryFormSchema>>;
