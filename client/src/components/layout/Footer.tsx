import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="font-heading font-bold text-2xl mb-4">
              {t("home.hero.welcome")}
            </div>
            <p className="max-w-md">
              {t("footer.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">
                {t("footer.navigation")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/apartments" className="hover:underline">
                    {t("nav.apartments")}
                  </Link>
                </li>
                <li>
                  <Link href="/visit" className="hover:underline">
                    {t("nav.visit")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">
                {t("footer.contact")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@apartmentsivancevic.com" className="hover:underline">
                    info@apartmentsivancevic.com
                  </a>
                </li>
                <li>
                  <a href="tel:+38598660645" className="hover:underline">
                    +385 97 6830 150 (Mirica)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-400 text-center text-sm">
          <p>{t("footer.copyright")}</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacy-policy" className="hover:underline">
              {t("footer.privacy", "Privacy Policy")}
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              {t("footer.terms", "Terms of Service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
