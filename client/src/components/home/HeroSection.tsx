import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import SearchBar from "@/components/search/SearchBar";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative bg-neutral-dark h-[80vh] min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/korcula.jpg"
          alt="Korčula coastline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-white text-shadow font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            {t("home.hero.welcome")}
          </h1>
          <h2 className="text-white text-shadow font-heading font-medium text-2xl md:text-3xl mb-8">
            {t("home.hero.subheading")}
          </h2>
          <p className="text-white text-shadow-lg text-lg md:text-xl mb-8 max-w-lg">
            {t("home.hero.description")}
          </p>
          
          {/* Search bar */}
          <div className="mb-8 max-w-4xl">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/apartments" className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
              {t("home.hero.viewApartments")}
            </Link>
            <Link href="/contact" className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-md transition-colors">
              {t("home.hero.sendInquiry")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
