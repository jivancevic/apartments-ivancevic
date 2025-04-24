import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative bg-neutral-dark h-[80vh] min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1565111928471-a3a9dded12e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Korčula coastline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-dark bg-opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            {t("home.hero.welcome")}
          </h1>
          <h2 className="font-heading font-medium text-2xl md:text-3xl mb-8">
            {t("home.hero.subheading")}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-lg">
            {t("home.hero.description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/apartments">
              <a className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                {t("home.hero.viewApartments")}
              </a>
            </Link>
            <Link href="/contact">
              <a className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-md transition-colors">
                {t("home.hero.sendInquiry")}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
