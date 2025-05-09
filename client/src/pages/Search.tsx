import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";

const Search = () => {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(2);
  
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
      
      <div className="mb-8">
        <SearchBar 
          className="max-w-full" 
          initialCheckIn={checkIn || undefined}
          initialCheckOut={checkOut || undefined}
          initialGuests={guests}
        />
      </div>
      
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