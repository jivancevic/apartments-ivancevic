import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Apartment } from "@/types";
import ApartmentDetail from "./ApartmentDetail";
import useLanguage from "@/hooks/useLanguage";

// Mapping of apartment slugs to IDs
const APARTMENT_SLUGS: Record<string, number> = {
  'magical-oasis': 1, 
  'saint-roko': 2, 
  'ismaelli': 3, 
  'lavander': 4, 
  'sun': 5, 
  'sea': 6, 
  'beach': 7, 
  'nika': 8, 
  'lara': 9
};

interface SelectedDates {
  checkIn?: Date;
  checkOut?: Date;
}

interface ApartmentTabsProps {
  apartments: Apartment[];
  selectedDates?: SelectedDates;
}

const ApartmentTabs = ({ apartments, selectedDates }: ApartmentTabsProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  // Default to first apartment if none is specified in the URL
  const [activeTab, setActiveTab] = useState<number>(apartments[0]?.id || 0);

  // Handle hash change and initial load
  useEffect(() => {
    const handleHashChange = () => {
      // Get full URL to handle both hash and query parameters
      const currentUrl = window.location.href;
      // Extract hash from URL (ignoring any query parameters)
      const hashMatch = currentUrl.match(/#([^?&]+)/);
      const hash = hashMatch ? hashMatch[1] : '';
      
      // Check if hash matches an apartment slug
      if (hash && APARTMENT_SLUGS[hash]) {
        setActiveTab(APARTMENT_SLUGS[hash]);
      } 
      // Check if hash is just a number (backward compatibility)
      else if (hash && hash.startsWith('apartment-')) {
        const apartmentId = parseInt(hash.replace('apartment-', ''), 10);
        if (!isNaN(apartmentId)) {
          setActiveTab(apartmentId);
        }
      }
    };

    // Handle hash on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [apartments]);

  const handleTabClick = (apartmentId: number) => {
    setActiveTab(apartmentId);
    
    // Update URL hash - find slug by apartment ID
    const slug = Object.keys(APARTMENT_SLUGS).find(key => APARTMENT_SLUGS[key] === apartmentId);
    
    // Preserve query parameters when changing the hash
    const urlWithoutHash = window.location.href.split('#')[0];
    const newHash = slug ? slug : `apartment-${apartmentId}`;
    
    // We need to use history.replaceState to avoid triggering a page reload
    // and to ensure the query parameters are preserved
    window.history.replaceState(
      null, 
      '', 
      `${urlWithoutHash}#${newHash}`
    );
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
            <ApartmentDetail 
              apartment={apartment} 
              selectedDates={selectedDates}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentTabs;
