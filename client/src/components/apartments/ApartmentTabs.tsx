import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Apartment } from "@/types";
import ApartmentDetail from "./ApartmentDetail";
import useLanguage from "@/hooks/useLanguage";
import { Star } from "lucide-react";

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
}

// Helper function to get star rating for each apartment
const getApartmentStars = (apartmentId: number): number => {
  // Magical Oasis (ID: 1), Nika (ID: 8), and Lara (ID: 9) have 3 stars, all others have 4
  return [1, 8, 9].includes(apartmentId) ? 3 : 4;
};

const ApartmentTabs = ({ apartments }: ApartmentTabsProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  // Track selected dates from URL parameters
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({});
  
  // Default to first apartment if none is specified in the URL
  const [activeTab, setActiveTab] = useState<number>(apartments[0]?.id || 0);

  // Parse date parameters from URL and handle hash changes
  useEffect(() => {
    // Function to extract and parse query parameters from the URL
    const parseQueryParams = () => {
      // Get the full URL with query parameters
      const fullUrl = window.location.href;
      
      // Extract the query string (everything after ? and before # if present)
      const queryMatch = fullUrl.match(/\?([^#]*)/);
      const queryString = queryMatch ? queryMatch[1] : '';
      
      // Parse query parameters
      const params = new URLSearchParams(queryString);
      const checkInParam = params.get("checkIn");
      const checkOutParam = params.get("checkOut");
      
      // Parse check-in date if available
      const checkIn = checkInParam ? (() => {
        try {
          // Check if the format is already YYYY-MM-DD (no time component)
          if (checkInParam.length === 10) {
            // Make sure the date is set to midnight in local timezone for consistency
            const date = new Date(checkInParam + 'T00:00:00');
            if (isNaN(date.getTime())) {
              console.error('Invalid check-in date format in URL:', checkInParam);
              return undefined;
            }
            return date;
          }
          const date = new Date(checkInParam);
          if (isNaN(date.getTime())) {
            console.error('Invalid check-in date format in URL:', checkInParam);
            return undefined;
          }
          return date;
        } catch (e) {
          console.error('Error parsing check-in date:', e);
          return undefined;
        }
      })() : undefined;
      
      // Parse check-out date if available
      const checkOut = checkOutParam ? (() => {
        try {
          // Check if the format is already YYYY-MM-DD (no time component)
          if (checkOutParam.length === 10) {
            // Make sure the date is set to midnight in local timezone for consistency
            const date = new Date(checkOutParam + 'T00:00:00');
            if (isNaN(date.getTime())) {
              console.error('Invalid check-out date format in URL:', checkOutParam);
              return undefined;
            }
            return date;
          }
          const date = new Date(checkOutParam);
          if (isNaN(date.getTime())) {
            console.error('Invalid check-out date format in URL:', checkOutParam);
            return undefined;
          }
          return date;
        } catch (e) {
          console.error('Error parsing check-out date:', e);
          return undefined;
        }
      })() : undefined;
      
      // Only update if both dates are valid or both are undefined
      setSelectedDates({ checkIn, checkOut });
    };
    
    // Function to handle hash changes for tab selection
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
      
      // Also parse query parameters when hash changes
      parseQueryParams();
    };

    // Handle hash and query parameters on initial load
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
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-1 text-amber-500">
                  {Array.from({ length: getApartmentStars(apartment.id) }).map((_, index) => (
                    <Star key={index} size={12} fill="currentColor" className="mr-0.5" />
                  ))}
                </div>
                {currentLanguage === "en" ? apartment.nameEn : apartment.nameHr}
              </div>
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
