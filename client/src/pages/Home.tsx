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
      icon: "handshake",
      titleEn: t("features.welcome.title"),
      titleHr: t("features.welcome.title"),
      descriptionEn: t("features.welcome.description"),
      descriptionHr: t("features.welcome.description")
    },
    {
      icon: "sparkles",
      titleEn: t("features.cleanliness.title"),
      titleHr: t("features.cleanliness.title"),
      descriptionEn: t("features.cleanliness.description"),
      descriptionHr: t("features.cleanliness.description")
    },
    {
      icon: "map-pin",
      titleEn: t("features.location.title"),
      titleHr: t("features.location.title"),
      descriptionEn: t("features.location.description"),
      descriptionHr: t("features.location.description")
    },
    {
      icon: "compass",
      titleEn: t("features.experience.title"),
      titleHr: t("features.experience.title"),
      descriptionEn: t("features.experience.description"),
      descriptionHr: t("features.experience.description")
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
