import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { i18n } = useTranslation();
  
  return {
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
    supportedLanguages: ['en', 'hr']
  };
};

export default useLanguage;
