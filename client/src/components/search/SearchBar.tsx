import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  className?: string;
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  initialGuests?: number;
}

const SearchBar = ({ 
  className = "", 
  initialCheckIn,
  initialCheckOut,
  initialGuests
}: SearchBarProps) => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  
  // Default to current date and a week later
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  const [checkIn, setCheckIn] = useState<Date>(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState<Date>(initialCheckOut || nextWeek);
  const [guests, setGuests] = useState<string>(initialGuests?.toString() || "2");
  
  // Update the form when URL parameters change
  useEffect(() => {
    // Only update if initialValues are provided (from URL parameters)
    if (initialCheckIn) {
      setCheckIn(initialCheckIn);
    }
    
    if (initialCheckOut) {
      setCheckOut(initialCheckOut);
    }
    
    if (initialGuests) {
      setGuests(initialGuests.toString());
    }
  }, [initialCheckIn, initialCheckOut, initialGuests]);
  
  const handleSearch = () => {
    if (!checkIn || !checkOut) return;
    
    // Navigate to search results with query parameters
    const searchParams = new URLSearchParams({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: guests
    });
    
    setLocation(`/search?${searchParams.toString()}`);
  };
  
  return (
    <div className={`bg-white border rounded-lg shadow-md p-3 ${className}`}>
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        {/* Check-in date selection */}
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal h-11"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">{t("search.checkIn")}</span>
                  <span>{checkIn ? format(checkIn, "MMM d, yyyy") : t("search.selectDate")}</span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(date) => date && setCheckIn(date)}
                initialFocus
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Check-out date selection */}
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal h-11"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">{t("search.checkOut")}</span>
                  <span>{checkOut ? format(checkOut, "MMM d, yyyy") : t("search.selectDate")}</span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(date) => date && setCheckOut(date)}
                initialFocus
                disabled={(date) => date < (checkIn || today)}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Guests selection with +/- buttons */}
        <div className="w-full md:w-36">
          <div className="border rounded-md h-11 flex flex-col">
            <div className="px-3 py-1">
              <span className="text-xs text-muted-foreground">{t("search.guests")}</span>
            </div>
            <div className="flex items-center justify-between px-3">
              <button 
                type="button"
                className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-gray-100 disabled:opacity-50"
                onClick={() => {
                  const currentGuests = parseInt(guests);
                  if (currentGuests > 1) {
                    setGuests((currentGuests - 1).toString());
                  }
                }}
                disabled={parseInt(guests) <= 1}
                aria-label={t("search.decreaseGuests")}
              >
                <span className="text-xl font-medium">-</span>
              </button>
              
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{guests} {parseInt(guests) === 1 ? t("search.guest") : t("search.guests")}</span>
              </div>
              
              <button 
                type="button"
                className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-gray-100 disabled:opacity-50"
                onClick={() => {
                  const currentGuests = parseInt(guests);
                  if (currentGuests < 6) {
                    setGuests((currentGuests + 1).toString());
                  }
                }}
                disabled={parseInt(guests) >= 6}
                aria-label={t("search.increaseGuests")}
              >
                <span className="text-xl font-medium">+</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Search button */}
        <Button 
          type="button" 
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90 text-white h-11"
        >
          {t("search.searchButton")}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;