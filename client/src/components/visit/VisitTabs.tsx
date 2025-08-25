import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import VisitCards from "./VisitCards";
import { Location } from "../../types";
import { categories, CATEGORY_TO_TYPE_MAP } from "../../lib/categories";
import { useLocation } from "wouter";

// Mapping of category slugs to their keys
const CATEGORY_SLUGS: Record<string, string> = {
  "attractions-old-town": "attraction-old-town",
  "attractions-island": "attraction-island",
  activities: "activity",
  excursions: "excursion",
  restaurants: "restaurant",
};

interface VisitTabsProps {
  locations: Location[];
  activeSlug?: string;
}

export function VisitTabs({ locations, activeSlug }: VisitTabsProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("attraction-old-town");
  const [, navigate] = useLocation();
  const isEnglish = i18n.language === "en";

  // Group locations by type
  const locationsByType = locations.reduce((acc, location) => {
    const type = location.typeEn;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(location);
    return acc;
  }, {} as Record<string, Location[]>);

  // Available categories in order
  const categories_list = [
    {
      key: "attraction-old-town",
      slug: "attractions-old-town",
      nameEn: categories.attractionsOldTown.en,
      nameHr: categories.attractionsOldTown.hr,
    },
    {
      key: "attraction-island",
      slug: "attractions-island",
      nameEn: categories.attractionsIsland.en,
      nameHr: categories.attractionsIsland.hr,
    },
    {
      key: "activity",
      slug: "activities",
      nameEn: categories.activities.en,
      nameHr: categories.activities.hr,
    },
    {
      key: "excursion",
      slug: "excursions",
      nameEn: categories.excursions.en,
      nameHr: categories.excursions.hr,
    },
    {
      key: "restaurant",
      slug: "restaurants",
      nameEn: categories.restaurants.en,
      nameHr: categories.restaurants.hr,
    },
  ];

  // Sync from route slug when present
  useEffect(() => {
    if (activeSlug && CATEGORY_SLUGS[activeSlug]) {
      setActiveTab(CATEGORY_SLUGS[activeSlug]);
    }
  }, [activeSlug]);

  const handleTabClick = (categoryKey: string) => {
    setActiveTab(categoryKey);
    const category = categories_list.find((cat) => cat.key === categoryKey);
    const slug = category ? category.slug : categoryKey;
    navigate(`/visit/${slug}`);
  };

  return (
    <div className="container">
      {/* Tabs Navigation */}
      <div className="overflow-x-auto mb-8">
        <div className="inline-flex min-w-full md:justify-center space-x-2 tabs-container">
          {categories_list.map((category) => (
            <button
              key={category.key}
              className={`tab-button py-2 px-4 border-b-2 whitespace-nowrap font-medium ${
                activeTab === category.key
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-primary transition-colors"
              }`}
              onClick={() => handleTabClick(category.key)}
            >
              <div className="flex flex-col items-center">
                {isEnglish ? category.nameEn : category.nameHr}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content: render only active category to avoid preloading all images */}
      <div className="tab-content-container">
        {(() => {
          const activeCategory =
            categories_list.find((c) => c.key === activeTab) ||
            categories_list[0];
          return (
            <div key={activeCategory.key}>
              <h2 className="text-2xl font-semibold mb-6">
                {isEnglish ? activeCategory.nameEn : activeCategory.nameHr}
              </h2>
              <VisitCards
                locations={locationsByType[activeCategory.key] || []}
              />
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default VisitTabs;
