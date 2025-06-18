import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

const Contact = () => {
  const { t } = useTranslation();
  
  // Fetch apartments for the dropdown
  const { data: apartments } = useQuery({
    queryKey: ['/api/apartments'],
  });

  return (
    <section id="contact" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8">
          {t("contact.title")}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm apartments={apartments || []} />
          
          {/* Contact Info and Map */}
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default Contact;
