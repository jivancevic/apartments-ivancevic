import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import SearchBar from "@/components/search/SearchBar";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative bg-neutral-dark min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/korcula.jpg"
          alt="Korčula coastline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-16 flex flex-col justify-center">
        <div className="lg:flex lg:items-center lg:justify-between">
          {/* Left Column - Content */}
          <div className="text-white lg:max-w-[48%]">
            <h1 className="text-white text-shadow font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              {t("home.hero.welcome")}
            </h1>
            <h2 className="text-white text-shadow font-heading font-medium text-2xl md:text-3xl mb-8">
              {t("home.hero.subheading")}
            </h2>
            <p className="text-white text-shadow-lg text-lg md:text-xl mb-8 max-w-lg">
              {t("home.hero.description")}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/apartments" className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                {t("home.hero.viewApartments")}
              </Link>
              <Link href="/contact" className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-md transition-colors">
                {t("home.hero.sendInquiry")}
              </Link>
            </div>
          </div>

          {/* Right Column - Search Bar for large screens */}
          <div className="hidden lg:block lg:max-w-[45%]">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h3 className="text-primary font-medium text-xl mb-4">{t("search.findYourStay")}</h3>
              <SearchBar className="max-w-full" />
            </div>
          </div>
        </div>
        
        {/* Search bar for mobile and tablets - moved below buttons for better visibility */}
        <div className="mt-12 lg:hidden">
          <div className="flex flex-col items-center">
            <h3 className="text-white text-shadow font-medium text-xl mb-4">{t("search.findYourStay")}</h3>
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <SearchBar className="max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
