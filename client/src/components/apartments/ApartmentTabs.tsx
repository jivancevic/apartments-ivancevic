import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Apartment } from "@/types";
import ApartmentDetail from "./ApartmentDetail";
import useLanguage from "@/hooks/useLanguage";

interface ApartmentTabsProps {
  apartments: Apartment[];
}

const ApartmentTabs = ({ apartments }: ApartmentTabsProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(apartments[0]?.id || 0);

  const handleTabClick = (apartmentId: number) => {
    setActiveTab(apartmentId);
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="overflow-x-auto mb-10">
        <div className="inline-flex min-w-full md:justify-center space-x-2 tabs-container">
          {apartments.map((apartment) => (
            <button
              key={apartment.id}
              className={`tab-button py-2 px-4 border-b-2 whitespace-nowrap font-medium ${
                activeTab === apartment.id
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-primary transition-colors"
              }`}
              onClick={() => handleTabClick(apartment.id)}
            >
              {currentLanguage === "en" ? apartment.nameEn : apartment.nameHr}
            </button>
          ))}
        </div>
      </div>
      
      {/* Apartment Details */}
      <div className="tab-content-container">
        {apartments.map((apartment) => (
          <div
            key={apartment.id}
            className={activeTab === apartment.id ? "block" : "hidden"}
          >
            <ApartmentDetail apartment={apartment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentTabs;
