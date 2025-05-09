import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";

const Search = () => {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const checkInParam = params.get("checkIn");
    const checkOutParam = params.get("checkOut");
    const guestsParam = params.get("guests");
    
    if (checkInParam) {
      setCheckIn(new Date(checkInParam));
    }
    
    if (checkOutParam) {
      setCheckOut(new Date(checkOutParam));
    }
    
    if (guestsParam) {
      setGuests(parseInt(guestsParam, 10));
    }
  }, [location]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("search.title")}</h1>
      
      {/* Only show search bar if specifically requested or if no search parameters are present */}
      {(!checkIn || !checkOut || showSearchBar) ? (
        <div className="mb-8">
          <SearchBar 
            className="max-w-full" 
            initialCheckIn={checkIn || undefined}
            initialCheckOut={checkOut || undefined}
            initialGuests={guests}
          />
        </div>
      ) : (
        <div className="mb-8 bg-gray-50 rounded-lg p-4 border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-lg font-medium mb-2">{t("search.currentSearch")}</h2>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white px-3 py-1.5 rounded border text-sm">
                  {format(checkIn, "MMM d, yyyy")} — {format(checkOut, "MMM d, yyyy")}
                </div>
                <div className="bg-white px-3 py-1.5 rounded border text-sm">
                  {t("search.guestsCount", { count: guests })}
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowSearchBar(true)} 
              variant="outline" 
              className="mt-4 sm:mt-0"
            >
              {t("search.modifySearch")}
            </Button>
          </div>
        </div>
      )}
      
      {(checkIn && checkOut) ? (
        <SearchResults 
          checkIn={checkIn} 
          checkOut={checkOut} 
          guests={guests} 
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">{t("search.enterCriteria")}</p>
        </div>
      )}
    </div>
  );
};

export default Search;