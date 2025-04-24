import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MobileMenu from "@/components/ui/MobileMenu";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-primary font-heading font-bold text-2xl">
                {t("home.hero.welcome").replace("Welcome to ", "")}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-dark focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-heading font-medium hover:text-primary transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/apartments" className="font-heading font-medium hover:text-primary transition-colors">
              {t("nav.apartments")}
            </Link>
            <Link href="/visit" className="font-heading font-medium hover:text-primary transition-colors">
              {t("nav.visit")}
            </Link>
            <Link href="/contact" className="font-heading font-medium hover:text-primary transition-colors">
              {t("nav.contact")}
            </Link>

            {/* Language Toggle */}
            <div className="ml-4 border-l pl-4 flex items-center">
              <LanguageToggle />
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;
