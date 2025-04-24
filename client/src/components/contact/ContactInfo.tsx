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
                {t("contact.info.vicko")}: 
                <a href="tel:+38598660645" className="text-primary hover:underline ml-1">
                  +385 98 6606 45
                </a>
              </div>
              <div className="mb-1">
                {t("contact.info.mirica")}: 
                <a href="tel:+385976830150" className="text-primary hover:underline ml-1">
                  +385 97 6830 150
                </a>
              </div>
              <div>
                {t("contact.info.josip")}: 
                <a href="tel:+385915162223" className="text-primary hover:underline ml-1">
                  +385 91 516 2223
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
              <div>Ul. Ante Starčevića 1, 20260 Korčula</div>
              <div>Croatia</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="relative h-80 bg-neutral rounded-lg overflow-hidden">
        <iframe
          title="Apartments Ivančević Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.5525423497606!2d17.132241975471516!3d42.95820129710443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5025347a0fa9%3A0xc1b4d6a3ec89d93e!2zVWwuIEFudGUgU3RhcsSNZXZpxIdhIDEsIDIwMjYwLCBLb3LEjXVsYQ!5e1!3m2!1sen!2shr!4v1745507221489!5m2!1sen!2shr"
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
