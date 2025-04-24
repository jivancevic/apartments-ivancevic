import { useTranslation } from "react-i18next";

interface VisitTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VisitTabs = ({ activeTab, onTabChange }: VisitTabsProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: "beach", label: t("visit.beaches") },
    { id: "restaurant", label: t("visit.restaurants") },
    { id: "attraction", label: t("visit.attractions") },
    { id: "activity", label: t("visit.activities") }
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
