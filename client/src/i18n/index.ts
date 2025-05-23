import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en";
import hrTranslation from "./locales/hr";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hr: { translation: hrTranslation }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    compatibilityJSON: "v4", // ✅ Enables plural objects with suffixes like "_one", "_other"
    react: {
      useSuspense: false
    }
  });

export default i18n;
