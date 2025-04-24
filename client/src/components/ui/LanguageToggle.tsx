import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <>
      <button
        onClick={() => changeLanguage('en')}
        className={`font-medium mr-2 ${currentLang === 'en' ? 'opacity-100' : 'opacity-50'}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span>|</span>
      <button
        onClick={() => changeLanguage('hr')}
        className={`font-medium ml-2 ${currentLang === 'hr' ? 'opacity-100' : 'opacity-50'}`}
        aria-label="Switch to Croatian"
      >
        HR
      </button>
    </>
  );
};

export default LanguageToggle;
