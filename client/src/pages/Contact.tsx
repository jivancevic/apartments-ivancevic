import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { type Apartment } from "@/types";
import ContactForm from "@/features/contact/components/ContactForm";
import ContactInfo from "@/features/contact/components/ContactInfo";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Contact = () => {
  const { t } = useTranslation();

  const { data: apartments } = useQuery<Apartment[]>({
    queryKey: ["/api/apartments"],
  });

  return (
    <section id="contact" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8">
          {t("contact.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ErrorBoundary fallback={<p className="text-sm text-red-600">The contact form failed to load. Please refresh.</p>}>
            <ContactForm apartments={apartments || []} />
          </ErrorBoundary>
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default Contact;
