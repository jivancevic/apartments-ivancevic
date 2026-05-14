import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Apartment, Booking } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInDays } from "date-fns";
import { localize } from "@/lib/localize";
import { makeInquiryFormSchema, type InquiryFormValues } from "../schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormProps {
  apartments: Apartment[];
}

const ContactForm = ({ apartments }: ContactFormProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  const formSchema = useMemo(() => makeInquiryFormSchema(t), [t]);

  const formatDateForInput = (date: Date): string => format(date, "yyyy-MM-dd");
  const parseDateFromInput = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      apartmentId: "",
      message: "",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // Populate form from URL search params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apartmentId = params.get("apartmentId") ?? params.get("apartment");
    const checkInStr = params.get("checkIn");
    const checkOutStr = params.get("checkOut");
    if (apartmentId) form.setValue("apartmentId", apartmentId);
    if (checkInStr) form.setValue("checkIn", parseDateFromInput(checkInStr));
    if (checkOutStr) form.setValue("checkOut", parseDateFromInput(checkOutStr));
  }, []);

  const formApartmentId = form.watch("apartmentId");
  const selectedApartmentId =
    formApartmentId && formApartmentId !== "none"
      ? parseInt(formApartmentId)
      : null;

  // Single query: /bookings already returns merged stored + iCal availability
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: [`/api/apartments/${selectedApartmentId}/bookings`],
    enabled: !!selectedApartmentId,
  });

  const hasDateConflict = (checkIn: Date, checkOut: Date): boolean => {
    return bookings.some((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return checkIn < end && checkOut > start;
    });
  };

  const mutation = useMutation({
    mutationFn: async (data: InquiryFormValues) => {
      return await apiRequest("POST", "/api/apartments/inquiries", {
        ...data,
        apartmentId:
          data.apartmentId && data.apartmentId !== "none"
            ? parseInt(data.apartmentId)
            : null,
        checkIn: format(data.checkIn, "yyyy-MM-dd"),
        checkOut: format(data.checkOut, "yyyy-MM-dd"),
      });
    },
    onSuccess: () => {
      toast({ title: t("contact.form.success"), description: "" });
      form.reset();
    },
    onError: () => {
      toast({
        title: t("contact.form.error"),
        description: "",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    if (selectedApartmentId) {
      if (differenceInDays(data.checkOut, data.checkIn) < 1) {
        toast({
          title: t("contact.form.invalidDateSelection"),
          description: t("contact.form.invalidDateDesc"),
          variant: "destructive",
        });
        return;
      }
      if (hasDateConflict(data.checkIn, data.checkOut)) {
        toast({
          title: t("contact.form.unavailableDates"),
          description: t("contact.form.unavailableDatesDesc"),
          variant: "destructive",
        });
        return;
      }
    }
    mutation.mutate(data);
  };

  return (
    <div>
      <div className="bg-neutral rounded-lg">
        <h3 className="font-heading font-semibold text-2xl mb-6">
          {t("contact.inquiry.title")}
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.email")}</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.apartment")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("contact.form.select")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">
                          {t("contact.form.notSure")}
                        </SelectItem>
                        {apartments.map((apartment) => (
                          <SelectItem
                            key={apartment.id}
                            value={apartment.id.toString()}
                          >
                            {localize(apartment, "name", i18n.language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.checkIn")}</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        onChange={(e) =>
                          field.onChange(parseDateFromInput(e.target.value))
                        }
                        value={field.value ? formatDateForInput(field.value) : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.checkOut")}</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        onChange={(e) =>
                          field.onChange(parseDateFromInput(e.target.value))
                        }
                        value={field.value ? formatDateForInput(field.value) : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact.form.message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional information or special requests..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-gray-500 mb-4 text-center">
              {t("contact.form.privacyNotice", "By submitting this form, you agree to our ")}
              <a href="/privacy-policy" className="text-primary hover:underline">
                {t("contact.form.privacyLink", "Privacy Policy")}
              </a>
              {t("contact.form.and", " and ")}
              <a href="/terms-of-service" className="text-primary hover:underline">
                {t("contact.form.termsLink", "Terms of Service")}
              </a>
              .
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md"
              >
                {mutation.isPending ? "Sending..." : t("contact.form.submit")}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {t("contact.notice")}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
