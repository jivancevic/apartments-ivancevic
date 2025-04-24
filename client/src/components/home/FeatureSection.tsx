import { useTranslation } from "react-i18next";
import { Feature } from "@/types";
import AmenityIcon from "@/components/ui/AmenityIcon";
import useLanguage from "@/hooks/useLanguage";

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection = ({ features }: FeatureSectionProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <section className="py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary bg-opacity-10 p-4 rounded-full mb-4">
                <AmenityIcon icon={feature.icon} className="text-3xl text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                {currentLanguage === "en" ? feature.titleEn : feature.titleHr}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "en" ? feature.descriptionEn : feature.descriptionHr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
