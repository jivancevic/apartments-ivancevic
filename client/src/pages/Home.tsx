import { useTranslation } from "react-i18next";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import { Feature } from "@/types";
import { UmbrellaIcon, Volume2Icon, ParkingMeter, MountainIcon } from "lucide-react";

const Home = () => {
  const { t } = useTranslation();
  
  // Define features with icons and translations
  const features: Feature[] = [
    {
      icon: "umbrella-beach",
      titleEn: t("features.beach.title"),
      titleHr: "Blizu plaže",
      descriptionEn: t("features.beach.description"),
      descriptionHr: "Samo 5 minuta hoda do prekrasnih šljunčanih plaža s kristalno čistom vodom."
    },
    {
      icon: "volume-off",
      titleEn: t("features.quiet.title"),
      titleHr: "Mirno područje",
      descriptionEn: t("features.quiet.description"),
      descriptionHr: "Smješteno u mirnom susjedstvu, savršeno za opuštanje daleko od buke."
    },
    {
      icon: "parking",
      titleEn: t("features.parking.title"),
      titleHr: "Besplatni parking",
      descriptionEn: t("features.parking.description"),
      descriptionHr: "Besplatno privatno parkiralište za sve naše goste tijekom boravka."
    },
    {
      icon: "mountain",
      titleEn: t("features.views.title"),
      titleHr: "Prekrasni pogledi",
      descriptionEn: t("features.views.description"),
      descriptionHr: "Uživajte u zadivljujućim pogledima na more i planine s balkona naših apartmana."
    }
  ];

  return (
    <div>
      <HeroSection />
      <FeatureSection features={features} />
    </div>
  );
};

export default Home;
