import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { format, addDays, isBefore, isAfter, isSameDay } from "date-fns";
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
  onSearch?: (checkIn: Date, checkOut: Date, guests: number) => void;
}

const SearchBar = ({ 
  className = "", 
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onSearch
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
    
    // Use custom handler if provided (for direct search page use)
    if (onSearch) {
      onSearch(checkIn, checkOut, parseInt(guests));
      return;
    }
    
    // Otherwise use default navigation behavior
    // Format dates for cleaner URLs (YYYY-MM-DD)
    const formattedCheckIn = checkIn.toISOString().split('T')[0];
    const formattedCheckOut = checkOut.toISOString().split('T')[0];
    
    // Navigate to search results with query parameters
    const searchParams = new URLSearchParams({
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guests: guests
    });
    
    setLocation(`/search?${searchParams.toString()}`);
  };
  
  // State for date range selector
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  // Close the popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isCalendarOpen]);
  
  // Handler for date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (selectingCheckIn) {
      // If selecting check-in date
      setCheckIn(date);
      
      // If selected date is after current check-out, reset check-out
      if (checkOut && isAfter(date, checkOut)) {
        setCheckOut(addDays(date, 1));
      }
      
      // Switch to selecting check-out
      setSelectingCheckIn(false);
    } else {
      // If selecting check-out date
      if (isBefore(date, checkIn)) {
        // If selected date is before check-in, make it the new check-in
        setCheckIn(date);
        // Don't close calendar, continue selecting check-out
      } else if (isSameDay(date, checkIn)) {
        // Prevent selecting the same day for check-in and check-out
        // Just keep selecting check-out
        return;
      } else {
        // Set check-out but keep calendar open
        setCheckOut(date);
        // Reset to check-in selection mode for the next selection
        setSelectingCheckIn(true);
      }
    }
  };
  
  // Date modifiers for highlighting the range
  const isDayInRange = (day: Date) => {
    if (!checkIn || !checkOut) return false;
    return (
      (isAfter(day, checkIn) || isSameDay(day, checkIn)) && 
      (isBefore(day, checkOut) || isSameDay(day, checkOut))
    );
  };

  const isStartDate = (day: Date) => checkIn && isSameDay(day, checkIn);
  const isEndDate = (day: Date) => checkOut && isSameDay(day, checkOut);
  
  // Open calendar and set mode
  const openCheckInCalendar = () => {
    setSelectingCheckIn(true);
    setIsCalendarOpen(true);
  };
  
  const openCheckOutCalendar = () => {
    setSelectingCheckIn(false);
    setIsCalendarOpen(true);
  };

  return (
    <div className={`bg-white border rounded-lg shadow-md p-3 overflow-hidden ${className}`}>
      {/* Responsive layout with reduced paddings and tighter spacing */}
      <div className="flex flex-col lg:flex-row gap-2 lg:items-center w-full">
        {/* Date range selection (unified) - modified for better space usage */}
        <div className="flex flex-col lg:flex-row flex-1 gap-2 min-w-0">
          {/* Check-in date button - reduced padding */}
          <Button 
            variant="outline" 
            className="flex-1 justify-start text-left font-normal h-11 overflow-hidden whitespace-nowrap px-2 min-w-0"
            onClick={openCheckInCalendar}
          >
            <CalendarIcon className="mr-1 h-4 w-4 flex-shrink-0" />
            <div className="flex flex-col items-start overflow-hidden min-w-0">
              <span className="text-xs text-muted-foreground w-full truncate">{t("search.checkIn")}</span>
              <span className="w-full truncate">{checkIn ? format(checkIn, "MMM d, yyyy") : t("search.selectDate")}</span>
            </div>
          </Button>
          
          {/* Check-out date button - reduced padding */}
          <Button 
            variant="outline" 
            className="flex-1 justify-start text-left font-normal h-11 overflow-hidden whitespace-nowrap px-2 min-w-0"
            onClick={openCheckOutCalendar}
          >
            <CalendarIcon className="mr-1 h-4 w-4 flex-shrink-0" />
            <div className="flex flex-col items-start overflow-hidden min-w-0">
              <span className="text-xs text-muted-foreground w-full truncate">{t("search.checkOut")}</span>
              <span className="w-full truncate">{checkOut ? format(checkOut, "MMM d, yyyy") : t("search.selectDate")}</span>
            </div>
          </Button>
        </div>
        
        {/* Guests selection - more compact */}
        <div className="lg:w-24 flex-shrink-0">
          <div className="border rounded-md h-11 flex flex-col justify-center">
            <div className="px-2 py-0.5">
              <span className="text-xs text-muted-foreground">{t("search.guests")}</span>
            </div>
            <div className="flex items-center justify-between px-2 pb-1">
              <button 
                type="button"
                className="group"
                onClick={() => {
                  const currentGuests = parseInt(guests);
                  if (currentGuests > 1) {
                    setGuests((currentGuests - 1).toString());
                  }
                }}
                disabled={parseInt(guests) <= 1}
                aria-label={t("search.decreaseGuests")}
              >
                <span className="text-lg font-medium flex items-center justify-center h-5 w-5 rounded-full group-hover:bg-primary group-hover:text-white group-disabled:opacity-50 transition-colors">-</span>
              </button>
              
              <div className="flex items-center gap-1 justify-center">
                <Users className="h-3 w-3 text-gray-500" />
                <span className="text-sm">{guests}</span>
              </div>
              
              <button 
                type="button"
                className="group"
                onClick={() => {
                  const currentGuests = parseInt(guests);
                  if (currentGuests < 6) {
                    setGuests((currentGuests + 1).toString());
                  }
                }}
                disabled={parseInt(guests) >= 6}
                aria-label={t("search.increaseGuests")}
              >
                <span className="text-lg font-medium flex items-center justify-center h-5 w-5 rounded-full group-hover:bg-primary group-hover:text-white group-disabled:opacity-50 transition-colors">+</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Search button - more compact */}
        <div className="flex-shrink-0">
          <Button 
            type="button" 
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white h-11 w-full text-sm px-3"
          >
            {t("search.searchButton")}
          </Button>
        </div>
      </div>
      
      {/* Unified Calendar Popover */}
      {isCalendarOpen && (
        <div 
          className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg p-3 border"
          ref={popoverRef}
        >
          <div className="mb-2 flex justify-between items-center">
            <h3 className="font-medium">
              {selectingCheckIn ? t("search.selectCheckIn") : t("search.selectCheckOut")}
            </h3>
            <button 
              onClick={() => setIsCalendarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <Calendar
            mode="single"
            selected={selectingCheckIn ? checkIn : checkOut}
            onSelect={handleDateSelect}
            fromDate={today}
            modifiers={{
              range: isDayInRange,
              start: isStartDate,
              end: isEndDate
            }}
            modifiersClassNames={{
              range: "bg-primary/20",
              start: "bg-primary text-white font-bold border-2 border-primary rounded-l-md",
              end: "bg-primary text-white font-bold border-2 border-primary rounded-r-md"
            }}
            initialFocus
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;