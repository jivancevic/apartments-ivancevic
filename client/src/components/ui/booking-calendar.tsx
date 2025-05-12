import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Apartment, Booking } from "@/types";
import { 
  format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, 
  getDay, isSameDay, isAfter, isBefore, differenceInDays, isToday 
} from "date-fns";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateNightlyPrice, calculateStayPrice, getSeasonType, getSeasonalPrices, SeasonType, getSeasonName } from "@/lib/pricing";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Create a type that ensures all required properties are present
type ApartmentWithRequiredProps = Apartment & {
  location: string;
  basePeakPrice: number;
  priceMultiplier: string;
  cleaningFee: number;
};

interface BookingCalendarProps {
  bookings: Booking[];
  apartment: Apartment;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

const BookingCalendar = ({ bookings, apartment, initialStartDate, initialEndDate }: BookingCalendarProps) => {
  // Initialize dates from props only once on mount
  useEffect(() => {
    if (initialStartDate) {
      setSelectedStartDate(initialStartDate);
    }
    if (initialEndDate) {
      setSelectedEndDate(initialEndDate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure required properties with defaults
  const apartmentWithDefaults: ApartmentWithRequiredProps = {
    ...apartment,
    location: apartment.location || "",
    basePeakPrice: apartment.basePeakPrice || 110,
    priceMultiplier: apartment.priceMultiplier || "1.0",
    cleaningFee: apartment.cleaningFee || 40
  };
  const { t } = useTranslation();
  // If initial dates are provided, set the current month to the month of the initial start date
  const [currentDate, setCurrentDate] = useState(() => {
    if (initialStartDate) {
      return initialStartDate;
    }
    return new Date();
  });
  // Use null as initial state for selected dates, we'll update them in useEffect
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [priceSummary, setPriceSummary] = useState<{
    totalNights: number;
    subtotal: number;
    cleaningFee: number;
    total: number;
    averagePerNight: number;
  } | null>(null);

  // Calculate seasonal prices
  const seasonalPrices = getSeasonalPrices(apartmentWithDefaults);
  
  // Convert booking dates from strings to Date objects if needed
  const parsedBookings = bookings.map(booking => ({
    ...booking,
    startDate: typeof booking.startDate === 'string' ? new Date(booking.startDate) : booking.startDate,
    endDate: typeof booking.endDate === 'string' ? new Date(booking.endDate) : booking.endDate
  }));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day of week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const startDay = getDay(monthStart);
  
  // Create empty slots for days before the first day of the month
  const emptyDays = Array.from({ length: startDay === 0 ? 6 : startDay - 1 }, (_, i) => i);
  
  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    return parsedBookings.some(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // Check if a date is in the past
  const isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Check if a date is selectable
  const isDateSelectable = (date: Date) => {
    return !isDateBooked(date) && !isDatePast(date);
  };

  // Check if a date is in the selected range
  const isInSelectedRange = (date: Date) => {
    if (!selectedStartDate) return false;
    
    if (selectedEndDate) {
      return (
        isAfter(date, selectedStartDate) && 
        isBefore(date, selectedEndDate)
      );
    }
    
    if (hoverDate) {
      const rangeStart = selectedStartDate < hoverDate ? selectedStartDate : hoverDate;
      const rangeEnd = selectedStartDate < hoverDate ? hoverDate : selectedStartDate;
      
      return isAfter(date, rangeStart) && isBefore(date, rangeEnd);
    }
    
    return false;
  };
  
  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date)) return;
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // No dates selected yet, or both already selected (start fresh)
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      // Start date already selected, set the end date
      if (isBefore(date, selectedStartDate)) {
        // If clicked date is before start date, swap them
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else if (isSameDay(date, selectedStartDate)) {
        // Prevent selecting the same day for check-in and check-out
        return;
      } else {
        setSelectedEndDate(date);
      }
    }
  };
  
  // Handle date hover for range preview
  const handleDateHover = (date: Date) => {
    if (selectedStartDate && !selectedEndDate) {
      setHoverDate(date);
    }
  };
  
  // Clear selection
  const clearSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setHoverDate(null);
    setPriceSummary(null);
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Day names
  const dayNames = [
    t("calendar.days.mon"),
    t("calendar.days.tue"),
    t("calendar.days.wed"),
    t("calendar.days.thu"),
    t("calendar.days.fri"),
    t("calendar.days.sat"),
    t("calendar.days.sun")
  ];

  // Calculate price summary when selection changes
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      // Calculate the price summary
      const summary = calculateStayPrice(apartmentWithDefaults, selectedStartDate, selectedEndDate);
      
      // Only update price summary if it's different from the current one
      // to avoid unnecessary re-renders
      const newPriceSummary = {
        totalNights: summary.totalNights,
        subtotal: summary.subtotal,
        cleaningFee: summary.cleaningFee,
        total: summary.total,
        averagePerNight: summary.averagePerNight
      };
      
      // Deep comparison to avoid unnecessary updates
      const shouldUpdate = !priceSummary || 
        priceSummary.totalNights !== newPriceSummary.totalNights ||
        priceSummary.subtotal !== newPriceSummary.subtotal ||
        priceSummary.total !== newPriceSummary.total;
      
      if (shouldUpdate) {
        setPriceSummary(newPriceSummary);
      }
    } else if (priceSummary !== null) {
      setPriceSummary(null);
    }
  }, [selectedStartDate, selectedEndDate, apartment, apartmentWithDefaults, priceSummary]);



  return (
    <div>
      {/* Season Prices */}
      <div className="mb-4 grid grid-cols-4 gap-2 text-xs">
        <div className="bg-blue-50 p-2 rounded text-center">
          <div className="font-medium text-gray-700">{getSeasonName(SeasonType.OUT_OF_SEASON)}</div>
          <div className="font-bold text-blue-600">€{seasonalPrices[SeasonType.OUT_OF_SEASON]}</div>
        </div>
        <div className="bg-green-50 p-2 rounded text-center">
          <div className="font-medium text-gray-700">{getSeasonName(SeasonType.LOW_SEASON)}</div>
          <div className="font-bold text-green-600">€{seasonalPrices[SeasonType.LOW_SEASON]}</div>
        </div>
        <div className="bg-yellow-50 p-2 rounded text-center">
          <div className="font-medium text-gray-700">{getSeasonName(SeasonType.HIGH_SEASON)}</div>
          <div className="font-bold text-amber-600">€{seasonalPrices[SeasonType.HIGH_SEASON]}</div>
        </div>
        <div className="bg-orange-50 p-2 rounded text-center">
          <div className="font-medium text-gray-700">{getSeasonName(SeasonType.PEAK_SEASON)}</div>
          <div className="font-bold text-orange-600">€{seasonalPrices[SeasonType.PEAK_SEASON]}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={prevMonth}
          className="p-0 h-auto"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center font-medium">
          {format(currentDate, 'MMMM yyyy')}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={nextMonth}
          className="p-0 h-auto"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="calendar-container grid grid-cols-7 gap-1 mb-4">
        {/* Day headers */}
        {dayNames.map((day, index) => (
          <div key={index} className="calendar-day text-gray-600 text-xs text-center p-1 font-medium">
            {day}
          </div>
        ))}
        
        {/* Empty slots before first day */}
        {emptyDays.map(day => (
          <div key={`empty-${day}`} className="calendar-day bg-gray-100 opacity-50 text-xs text-center p-1"></div>
        ))}
        
        {/* Days of the month */}
        {monthDays.map(day => {
          const isBooked = isDateBooked(day);
          const isPast = isDatePast(day);
          const selectable = isDateSelectable(day);
          const price = calculateNightlyPrice(apartmentWithDefaults, day);
          const seasonType = getSeasonType(day);
          const isStart = selectedStartDate && isSameDay(day, selectedStartDate);
          const isEnd = selectedEndDate && isSameDay(day, selectedEndDate);
          const inRange = isInSelectedRange(day);
          const isCurrentDay = isToday(day);
          
          let bgColorClass = 'bg-white';
          let priceColorClass = 'text-gray-700';
          
          if (isBooked) {
            bgColorClass = 'bg-red-100';
            priceColorClass = 'text-red-500';
          } else if (isPast) {
            bgColorClass = 'bg-gray-100';
            priceColorClass = 'text-gray-400';
          } else if (isStart || isEnd) {
            // Make selected dates more visually prominent with larger text and stronger styling
            bgColorClass = 'bg-primary border-2 border-primary';
            priceColorClass = 'text-white font-bold';
          } else if (inRange) {
            bgColorClass = 'bg-primary-lighter';
            priceColorClass = 'text-primary-darker';
          }
          
          return (
            <div 
              key={format(day, 'd')}
              className={`calendar-day relative text-xs p-1 ${bgColorClass} ${
                selectable ? 'cursor-pointer hover:border hover:border-primary' : 'cursor-not-allowed'
              } ${isCurrentDay ? 'border border-blue-500' : ''} transition-colors rounded overflow-hidden`}
              onClick={() => selectable && handleDateClick(day)}
              onMouseEnter={() => selectable && handleDateHover(day)}
            >
              {/* Add check-in/out label for selected dates */}
              {isStart && (
                <div className="absolute top-0 left-0 right-0 text-[8px] bg-blue-700 text-white px-1 text-center font-bold">
                  {t("search.checkIn")}
                </div>
              )}
              {isEnd && (
                <div className="absolute top-0 left-0 right-0 text-[8px] bg-blue-900 text-white px-1 text-center font-bold">
                  {t("search.checkOut")}
                </div>
              )}
              
              <div className="min-h-[36px] sm:min-h-[42px] relative flex flex-col justify-between">
                {/* If we have check-in/out labels, they take the top space */}
                {(!isStart && !isEnd) && (
                  <div className="absolute top-0 left-0 text-xs font-medium">
                    {format(day, 'd')}
                  </div>
                )}
                
                {/* For check-in/check-out days, we'll center the day number */}
                {(isStart || isEnd) && (
                  <div className="w-full text-center font-medium mt-3">
                    {format(day, 'd')}
                  </div>
                )}
                
                {/* On wider screens we can show price in bottom left */}
                <div className={`absolute bottom-0 left-0 text-[10px] ${priceColorClass} ${isBooked || isPast ? 'line-through' : ''}`}>
                  {!isBooked && !isPast && !isStart && !isEnd && `€${price}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-wrap gap-2 text-xs mb-3">
        <div className="flex items-center">
          <span className="inline-block bg-red-100 w-3 h-3 rounded-sm mr-1"></span> 
          {t("apartments.booked")}
        </div>
        <div className="flex items-center">
          <span className="inline-block bg-primary w-3 h-3 rounded-sm mr-1"></span> 
          {t("apartments.selected")}
        </div>
        <div className="flex items-center">
          <span className="inline-block bg-primary-lighter w-3 h-3 rounded-sm mr-1"></span> 
          {t("apartments.dateRange")}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="text-xs text-gray-600 mb-4 flex items-start gap-2">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div>
          {t("apartments.calendarInstructions")}
        </div>
      </div>
      
      {/* Price summary */}
      {priceSummary && (
        <Card className="mb-4 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 h-6 w-6"
            onClick={clearSelection}
          >
            <X className="h-3 w-3" />
          </Button>
          
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-3">
              {selectedStartDate && selectedEndDate && (
                `${format(selectedStartDate, 'MMM d, yyyy')} - ${format(selectedEndDate, 'MMM d, yyyy')}`
              )}
            </h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{priceSummary.totalNights === 1
                    ? t("apartments.nights", { count: 1 })
                    : t("apartments.nights_plural", { count: priceSummary.totalNights })}</span>
                <span>€{priceSummary.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("apartments.cleaningFee")}</span>
                <span>€{priceSummary.cleaningFee}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-medium">
                <span>{t("apartments.averageNight")}</span>
                <span>€{priceSummary.averagePerNight}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{t("apartments.total")}</span>
                <span>€{priceSummary.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingCalendar;