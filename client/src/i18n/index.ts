import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en";
import hrTranslation from "./locales/hr";

// Initialize i18next with English and Croatian languages
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      hr: {
        translation: hrTranslation
      }
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    // The following settings are crucial for proper pluralization
    debug: false
  });

export default i18n;
