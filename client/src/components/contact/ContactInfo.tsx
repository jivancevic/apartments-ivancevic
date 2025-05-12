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
                {t("contact.info.mirica")}: 
                <a href="tel:+385976830150" className="text-primary hover:underline ml-1">
                  +385 97 6830 150
                </a>
              </div>
              <div className="mb-1">
                {t("contact.info.vicko")}: 
                <a href="tel:+38598660645" className="text-primary hover:underline ml-1">
                  +385 98 6606 45
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
      
      {/* Map - Using a static image instead of iframe to avoid MutationObserver error */}
      <div className="relative h-80 bg-neutral rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="h-10 w-10 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-lg">Ul. Ante Starčevića 1, 20260 Korčula</h3>
            <p className="text-gray-600">Located in the center of Korčula, Croatia</p>
            <a 
              href="https://goo.gl/maps/ykn1MNnhgQVGTVjb7" 
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-colors"
            >
              {t("contact.info.viewMap")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
