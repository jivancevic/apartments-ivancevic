import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";

const Search = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  
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
  
  // Handle search button click from SearchBar
  const handleSearch = useCallback((newCheckIn: Date, newCheckOut: Date, newGuests: number) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    setGuests(newGuests);
    
    // Force refresh of search results by incrementing searchTrigger
    setSearchTrigger(prev => prev + 1);
    
    // Update URL with clean date format (YYYY-MM-DD)
    const formattedCheckIn = newCheckIn.toISOString().split('T')[0];
    const formattedCheckOut = newCheckOut.toISOString().split('T')[0];
    
    // Update URL without full reload
    const newUrl = `/search?checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&guests=${newGuests}`;
    setLocation(newUrl, { replace: true });
  }, [setLocation]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("search.title")}</h1>
      
      {/* Always show search bar */}
      <div className="mb-8">
        <SearchBar 
          className="max-w-full" 
          initialCheckIn={checkIn || undefined}
          initialCheckOut={checkOut || undefined}
          initialGuests={guests}
          onSearch={handleSearch}
        />
      </div>
      
      {(checkIn && checkOut) ? (
        <SearchResults 
          key={searchTrigger} // Force re-render when search is triggered
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