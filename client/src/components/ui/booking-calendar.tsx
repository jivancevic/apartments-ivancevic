import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Apartment, Booking } from "@/types";
import { 
  format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, 
  getDay, isSameDay, isToday, isAfter, isBefore, differenceInDays 
} from "date-fns";
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SeasonPriceGrid from "@/components/ui/SeasonPriceGrid";
import { calculateStayPrice, getSeasonalPrices, getStayLimits } from "@/lib/pricing";
import { useState } from "react";

/**
 * The booking calendar component shows availability and allows date selection
 */

interface BookingCalendarProps {
  bookings: Booking[];
  apartment: Apartment;
  initialStartDate?: Date;
  initialEndDate?: Date;
  onDatesChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const BookingCalendar = ({ bookings, apartment, initialStartDate, initialEndDate, onDatesChange }: BookingCalendarProps) => {
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

  // Create a complete apartment object with all required properties to pass to pricing functions
  const apartmentWithDefaults = {
    ...apartment,
    // Required fields with default values if not provided
    id: apartment.id,
    type: apartment.type,
    nameEn: apartment.nameEn,
    nameHr: apartment.nameHr,
    descriptionEn: apartment.descriptionEn,
    descriptionHr: apartment.descriptionHr,
    images: apartment.images,
    location: apartment.location || "",
    basePeakPrice: apartment.basePeakPrice || 110,
    priceMultiplier: apartment.priceMultiplier || "1.0",
    cleaningFee: apartment.cleaningFee || 40,
    maxGuests: apartment.maxGuests,
    roomSizeM2: apartment.roomSizeM2,
    bedrooms: apartment.bedrooms,
    bathrooms: apartment.bathrooms,
    hasWifi: apartment.hasWifi,
    hasKitchen: apartment.hasKitchen,
    hasAC: apartment.hasAC,
    hasTV: apartment.hasTV,
    hasBalcony: apartment.hasBalcony,
    hasSeaView: apartment.hasSeaView,
    hasCityView: apartment.hasCityView,
    hasDishwasher: apartment.hasDishwasher,
    hasCoffeeMachine: apartment.hasCoffeeMachine,
    hasHairDryer: apartment.hasHairDryer,
    hasMicrowave: apartment.hasMicrowave,
    hasSmoothieMaker: apartment.hasSmoothieMaker,
    washingMachineType: apartment.washingMachineType,
    parkingType: apartment.parkingType,
    // Create a default parkingDetails if not provided
    parkingDetails: apartment.parkingDetails || {
      pricePerDay: 0,
      reservationRequired: false
    },
    hasGarden: apartment.hasGarden,
    otherAmenities: apartment.otherAmenities,
    bookingUrl: apartment.bookingUrl,
    airbnbUrl: apartment.airbnbUrl,
    icalUrls: apartment.icalUrls
  } as const;
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
  
  const [stayLimits, setStayLimits] = useState<{minNights: number; maxNights: number} | null>(null);

  // Calculate seasonal prices - will be loaded async
  const [seasonalPrices, setSeasonalPrices] = useState<Record<string, number>>({});
  
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

  // Check if a date range contains any booked dates
  const hasBookedDatesInRange = (startDate: Date, endDate: Date) => {
    // Create an array of all dates in the range
    const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Check if any day in the range is booked
    return daysInRange.some(day => isDateBooked(day));
  };

  // Check if a stay length is valid (within min/max nights constraints)
  const isValidStayLength = async (startDate: Date, endDate: Date) => {
    const nights = differenceInDays(endDate, startDate);
    const limits = await getStayLimits(apartmentWithDefaults, startDate);
    
    return nights >= limits.minNights && nights <= limits.maxNights;
  };

  // Check if a date can be selected as end date (considering min/max nights)
  const canSelectAsEndDate = async (date: Date, startDate: Date) => {
    if (!startDate) return true;
    
    const nights = differenceInDays(date, startDate);
    if (nights <= 0) return false; // Can't select same day or earlier
    
    const limits = await getStayLimits(apartmentWithDefaults, startDate);
    return nights >= limits.minNights && nights <= limits.maxNights;
  };

  // Check if a date is in the selected range (days between selected start and end)
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
  const handleDateClick = async (date: Date) => {
    if (!isDateSelectable(date)) return;
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // No dates selected yet, or both already selected (start fresh)
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      
      // Notify parent component of date change
      if (onDatesChange) {
        onDatesChange(date, null);
      }
    } else {
      // Start date already selected, set the end date
      let newStartDate = selectedStartDate;
      let newEndDate = date;
      
      if (isBefore(date, selectedStartDate)) {
        // If clicked date is before start date, swap them
        newEndDate = selectedStartDate;
        newStartDate = date;
      } else if (isSameDay(date, selectedStartDate)) {
        // Prevent selecting the same day for check-in and check-out
        return;
      }
      
      // Check if the selected range contains any booked dates
      if (hasBookedDatesInRange(newStartDate, newEndDate)) {
        // Don't allow selection of ranges that include booked dates
        return;
      }
      
      // Check if the stay length is valid (within min/max nights constraints)
      const isValid = await isValidStayLength(newStartDate, newEndDate);
      if (!isValid) {
        // Don't allow selection of invalid stay lengths
        return;
      }
      
      // Update the state with validated dates
      if (isBefore(date, selectedStartDate)) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
      
      // Notify parent component of date changes
      if (onDatesChange) {
        onDatesChange(newStartDate, newEndDate);
      }
    }
  };
  
  // Handle date hover for range preview
  const handleDateHover = (date: Date) => {
    if (selectedStartDate && !selectedEndDate) {
      // Check if the potential range contains any booked dates and meets min/max nights
      if (selectedStartDate && date) {
        const rangeStart = selectedStartDate < date ? selectedStartDate : date;
        const rangeEnd = selectedStartDate < date ? date : selectedStartDate;
        
        // Only update hover state if the range is valid
        isValidStayLength(rangeStart, rangeEnd).then(isValid => {
          if (!hasBookedDatesInRange(rangeStart, rangeEnd) && isValid) {
            setHoverDate(date);
          } else {
            setHoverDate(null);
          }
        });
      } else {
        setHoverDate(date);
      }
    }
  };
  
  // Clear selection
  const clearSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setHoverDate(null);
    setPriceSummary(null);
    
    // Notify parent component that dates were cleared
    if (onDatesChange) {
      onDatesChange(null, null);
    }
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

  // Load seasonal prices and stay limits
  useEffect(() => {
    const loadData = async () => {
      try {
        const prices = await getSeasonalPrices(apartmentWithDefaults);
        setSeasonalPrices(prices);
        
        if (selectedStartDate) {
          const limits = await getStayLimits(apartmentWithDefaults, selectedStartDate);
          setStayLimits(limits);
        }
      } catch (error) {
        console.error('Error loading pricing data:', error);
      }
    };
    
    loadData();
  }, [apartmentWithDefaults, selectedStartDate]);

  // Calculate price summary when selection changes
  useEffect(() => {
    const calculatePrices = async () => {
      if (selectedStartDate && selectedEndDate) {
        try {
          // Calculate the price summary
          const summary = await calculateStayPrice(apartmentWithDefaults, selectedStartDate, selectedEndDate);
          
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
        } catch (error) {
          console.error('Error calculating stay price:', error);
        }
      } else if (priceSummary !== null) {
        setPriceSummary(null);
      }
    };
    
    calculatePrices();
  }, [selectedStartDate, selectedEndDate, apartment, apartmentWithDefaults, priceSummary]);



  return (
    <div>
      {/* Season Prices */}
      <SeasonPriceGrid apartmentName={apartmentWithDefaults.nameEn} />

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
          const dayNum = format(day, 'd');   // cache day string
          const isBooked = isDateBooked(day);
          const isPast = isDatePast(day);
          const selectable = isDateSelectable(day);
          const isStart = selectedStartDate && isSameDay(day, selectedStartDate);
          const isEnd = selectedEndDate && isSameDay(day, selectedEndDate);
          const inRange = isInSelectedRange(day);
          const isCurrentDay = isToday(day);
          
          // Note: violatesStayLimits check moved to async useEffect below
          const violatesStayLimits = false; // Will be updated by useEffect
          
          let bgColorClass    = 'bg-white';
          let priceClass      = 'text-gray-700';
          let positionClass   = '';

          if (isPast) {
            bgColorClass = 'bg-gray-100';
            priceClass = 'text-gray-400';
          }
          else if (isBooked) {
            priceClass = 'text-gray-300 line-through';
          } else if (violatesStayLimits) {
            // Style for dates that would violate min/max nights
            bgColorClass = 'bg-orange-50 border border-orange-200';
            priceClass = 'text-orange-400';
          } else if (isStart) {
            // Start date styling with rounded left
            bgColorClass = 'bg-primary border-2 border-primary';
            priceClass = 'text-white font-bold';
            positionClass = selectedEndDate ? 'rounded-l-lg rounded-r-none border-r-0' : '';
          } else if (isEnd) {
            // End date styling with rounded right
            bgColorClass = 'bg-primary border-2 border-primary';
            priceClass = 'text-white font-bold';
            positionClass = 'rounded-r-lg rounded-l-none border-l-0';
          } else if (inRange) {
            // Make the in-between days clearly visible with a connected appearance
            bgColorClass = 'bg-blue-100 border-t-2 border-b-2 border-blue-300';
            priceClass = 'text-blue-800';
            positionClass = 'border-l-0 border-r-0'; // No side borders for connected effect
          }
          
          return (
            <div 
              key={dayNum}
              className={clsx(
                 'calendar-day relative text-xs p-1 transition-colors overflow-hidden',
                 bgColorClass,
                 positionClass,
                 isCurrentDay && 'border border-blue-500',
                 selectable ? 'cursor-pointer hover:border hover:border-primary' : 'cursor-not-allowed'
               )}
              onClick={() => (selectable && !violatesStayLimits) && handleDateClick(day)}
              onMouseEnter={() => (selectable && !violatesStayLimits) && handleDateHover(day)}
            >
              
              <div className="min-h-[36px] sm:min-h-[42px] relative flex items-center justify-center">
                {(isStart || isEnd) ? (
                  <div className={clsx("w-full text-center font-medium", priceClass)}>
                    {dayNum}
                  </div>
                ) : inRange ? (
                  <div className="text-xs font-medium relative">
                    <span className={clsx("relative z-10", priceClass)}>{dayNum}</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-blue-200 opacity-50"></span>
                    </span>
                  </div>
                ) : (
                  <div className={clsx("text-xs font-bold", priceClass)}>
                    {dayNum}
                  </div>
                )}
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
      </div>
      
      {/* Instructions */}
      <div className="text-xs text-gray-600 mb-4 flex items-start gap-2">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div>
          {t("apartments.calendarInstructions")}
          {selectedStartDate && !selectedEndDate && (
            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
              {stayLimits && (
                <span className="text-blue-700">
                  {t("apartments.stayLimits", { 
                    minNights: stayLimits.minNights, 
                    maxNights: stayLimits.maxNights 
                  })}
                </span>
              )}
            </div>
          )}
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
                <span>{t("apartments.nights", { count: priceSummary.totalNights })}</span>
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