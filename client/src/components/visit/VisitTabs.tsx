import { useTranslation } from "react-i18next";

interface VisitTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VisitTabs = ({ activeTab, onTabChange }: VisitTabsProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: "attraction-old-town", label: t("visit.attractionsOldTown", "Attractions - Old Town") },
    { id: "attraction-island", label: t("visit.attractionsIsland", "Attractions - Island") },
    { id: "activity", label: t("visit.activities", "Activities") },
    { id: "excursion", label: t("visit.excursions", "Excursions") },
    { id: "restaurant", label: t("visit.restaurants", "Restaurants") }
  ];

  return (
    <div className="flex flex-wrap justify-center mb-10 visit-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`visit-tab mx-2 px-6 py-2 rounded-full transition-colors ${
            activeTab === tab.id
              ? "active bg-primary text-white"
              : "bg-white text-neutral-dark hover:bg-primary hover:text-white"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default VisitTabs;
