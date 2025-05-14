import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Apartment, InquiryFormData } from "@/types";
import useLanguage from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { format, parse } from "date-fns";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactFormProps {
  apartments: Apartment[];
}

const ContactForm = ({ apartments }: ContactFormProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [location] = useLocation();
  
  // Helper function to format dates consistently and avoid timezone issues
  const formatDateForInput = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };
  
  // Helper function to parse dates from inputs without timezone issues
  const parseDateFromInput = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  // Use state to store URL parameters
  const [urlParams, setUrlParams] = useState<{
    apartmentId?: string;
    checkIn?: Date;
    checkOut?: Date;
  }>({
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 7))
  });

  // Parse URL parameters when component mounts
  useEffect(() => {
    // Get full URL including query parameters and hash
    const fullUrl = window.location.href;
    
    // Parse query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const apartmentId = searchParams.get("apartmentId") || searchParams.get("apartment") || undefined;
    
    // Parse dates
    const checkInStr = searchParams.get("checkIn");
    const checkOutStr = searchParams.get("checkOut");
    
    // Create dates with correct timezone handling
    const createLocalDate = (dateStr: string | null): Date => {
      if (!dateStr) return new Date();
      
      // Parse using our helper function to avoid timezone issues
      return parseDateFromInput(dateStr);
    };
    
    // Update state with parsed parameters
    setUrlParams({
      apartmentId,
      checkIn: createLocalDate(checkInStr),
      checkOut: checkOutStr 
        ? createLocalDate(checkOutStr)
        : new Date(new Date().setDate(new Date().getDate() + 7))
    });
  }, []);

  // Create a schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, { message: t("validation.required") }),
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
  }).refine(data => data.checkOut > data.checkIn, {
    message: t("validation.checkOut"),
    path: ["checkOut"]
  });
  
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      apartmentId: "",
      message: "",
      checkIn: new Date(),
      checkOut: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  });
  
  // Update form values when URL parameters change
  useEffect(() => {
    if (urlParams.apartmentId) {
      form.setValue('apartmentId', urlParams.apartmentId);
    }
    if (urlParams.checkIn) {
      form.setValue('checkIn', urlParams.checkIn);
    }
    if (urlParams.checkOut) {
      form.setValue('checkOut', urlParams.checkOut);
    }
  }, [urlParams, form]);

  // Mutation for submitting the form
  const mutation = useMutation({
    mutationFn: async (data: InquiryFormData) => {
      return await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: t("contact.form.success"),
        description: "",
      });
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

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Convert string to number for apartmentId
    const formData: InquiryFormData = {
      ...data,
      apartmentId: data.apartmentId && data.apartmentId !== "none" ? parseInt(data.apartmentId) : undefined,
    };
    mutation.mutate(formData);
  };

  return (
    <div>
      <div className="bg-neutral p-8 rounded-lg">
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
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("contact.form.select")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">
                          {t("contact.form.notSure")}
                        </SelectItem>
                        {apartments.map((apartment) => (
                          <SelectItem key={apartment.id} value={apartment.id.toString()}>
                            {currentLanguage === "en" ? apartment.nameEn : apartment.nameHr}
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
                        onChange={(e) => field.onChange(parseDateFromInput(e.target.value))}
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
                        onChange={(e) => field.onChange(parseDateFromInput(e.target.value))}
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
              <a 
                href="/privacy-policy" 
                className="text-primary hover:underline"
              >
                {t("contact.form.privacyLink", "Privacy Policy")}
              </a>
              {t("contact.form.and", " and ")}
              <a 
                href="/terms-of-service" 
                className="text-primary hover:underline"
              >
                {t("contact.form.termsLink", "Terms of Service")}
              </a>.
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