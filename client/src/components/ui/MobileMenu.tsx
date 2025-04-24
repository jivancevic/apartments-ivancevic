import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onClose();
  };

  return (
    <div className="md:hidden py-2 space-y-2 border-t mt-2">
      <Link href="/" onClick={handleClick}>
        <a className="block px-4 py-2 font-heading font-medium hover:bg-neutral">
          {t("nav.home")}
        </a>
      </Link>
      <Link href="/apartments" onClick={handleClick}>
        <a className="block px-4 py-2 font-heading font-medium hover:bg-neutral">
          {t("nav.apartments")}
        </a>
      </Link>
      <Link href="/about" onClick={handleClick}>
        <a className="block px-4 py-2 font-heading font-medium hover:bg-neutral">
          {t("nav.about")}
        </a>
      </Link>
      <Link href="/visit" onClick={handleClick}>
        <a className="block px-4 py-2 font-heading font-medium hover:bg-neutral">
          {t("nav.visit")}
        </a>
      </Link>
      <Link href="/contact" onClick={handleClick}>
        <a className="block px-4 py-2 font-heading font-medium hover:bg-neutral">
          {t("nav.contact")}
        </a>
      </Link>
      
      {/* Language Toggle Mobile */}
      <div className="flex px-4 py-2 border-t">
        <LanguageToggle />
      </div>
    </div>
  );
};

export default MobileMenu;
