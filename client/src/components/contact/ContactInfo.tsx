import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-heading font-semibold text-2xl mb-6">
          {t("contact.info.title")}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="text-primary mr-4 mt-1">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{t("contact.info.email")}</div>
              <a href="mailto:info@korcula.bz" className="text-primary hover:underline">
                info@korcula.bz
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="text-primary mr-4 mt-1">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{t("contact.info.phone")}</div>
              <div className="mb-1">
                {t("contact.info.father")}: 
                <a href="tel:+38598765432" className="text-primary hover:underline ml-1">
                  +385 98 765 4321
                </a>
              </div>
              <div className="mb-1">
                {t("contact.info.mother")}: 
                <a href="tel:+38598765433" className="text-primary hover:underline ml-1">
                  +385 98 765 4322
                </a>
              </div>
              <div>
                {t("contact.info.son")}: 
                <a href="tel:+38598765434" className="text-primary hover:underline ml-1">
                  +385 98 765 4323
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="text-primary mr-4 mt-1">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{t("contact.info.address")}</div>
              <div>Korčula 25, 20260 Korčula</div>
              <div>Croatia</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="relative h-80 bg-neutral rounded-lg overflow-hidden">
        <iframe
          title="Apartmani Ivančević Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46566.25800235376!2d16.88986538359375!3d42.95583899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a75ac4099c23d%3A0x50ce2af4b3db5056!2zS29yxI11bGEsIENyb2F0aWE!5e0!3m2!1sen!2sus!4v1625685663290!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
