import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import VisitCards from './VisitCards';
import { Location } from '../../types';
import { categories, CATEGORY_TO_TYPE_MAP } from '../../lib/categories';

// Mapping of category slugs to their keys
const CATEGORY_SLUGS: Record<string, string> = {
  'attractions-old-town': 'attraction-old-town',
  'attractions-island': 'attraction-island', 
  'activities': 'activity',
  'excursions': 'excursion',
  'restaurants': 'restaurant'
};

interface VisitTabsProps {
  locations: Location[];
}

export function VisitTabs({ locations }: VisitTabsProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('attraction-old-town');
  const isEnglish = i18n.language === 'en';

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
    { key: 'attraction-old-town', slug: 'attractions-old-town', nameEn: categories.attractionsOldTown.en, nameHr: categories.attractionsOldTown.hr },
    { key: 'attraction-island', slug: 'attractions-island', nameEn: categories.attractionsIsland.en, nameHr: categories.attractionsIsland.hr },
    { key: 'activity', slug: 'activities', nameEn: categories.activities.en, nameHr: categories.activities.hr },
    { key: 'excursion', slug: 'excursions', nameEn: categories.excursions.en, nameHr: categories.excursions.hr },
    { key: 'restaurant', slug: 'restaurants', nameEn: categories.restaurants.en, nameHr: categories.restaurants.hr }
  ];

  // Handle URL hash changes for tab selection
  useEffect(() => {
    const handleHashChange = () => {
      const currentUrl = window.location.href;
      const hashMatch = currentUrl.match(/#([^?&]+)/);
      const hash = hashMatch ? hashMatch[1] : '';
      
      // Check if hash matches a category slug
      if (hash && CATEGORY_SLUGS[hash]) {
        setActiveTab(CATEGORY_SLUGS[hash]);
      }
    };

    // Handle hash on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabClick = (categoryKey: string) => {
    setActiveTab(categoryKey);
    
    // Update URL hash - find slug by category key
    const category = categories_list.find(cat => cat.key === categoryKey);
    const slug = category ? category.slug : categoryKey;
    
    // Preserve query parameters when changing the hash
    const urlWithoutHash = window.location.href.split('#')[0];
    
    // Update the hash using history.replaceState to avoid page reload
    window.history.replaceState(
      null, 
      '', 
      `${urlWithoutHash}#${slug}`
    );
  };

  return (
    <div className="container py-8">
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
      
      {/* Tab Content */}
      <div className="tab-content-container">
        {categories_list.map((category) => (
          <div
            key={category.key}
            className={activeTab === category.key ? "block" : "hidden"}
          >
            <h2 className="text-2xl font-semibold mb-6">
              {isEnglish ? category.nameEn : category.nameHr}
            </h2>
            <VisitCards 
              locations={locationsByType[category.key] || []} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitTabs;