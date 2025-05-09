import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  
  // Default to current date and a week later
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  const [checkIn, setCheckIn] = useState<Date>(today);
  const [checkOut, setCheckOut] = useState<Date>(nextWeek);
  const [guests, setGuests] = useState<string>("2");
  
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
        
        {/* Guests selection */}
        <div className="w-full md:w-36">
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="h-11">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">{t("search.guests")}</span>
                  <SelectValue placeholder={t("search.selectGuests")} />
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? t("search.guest") : t("search.guests")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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