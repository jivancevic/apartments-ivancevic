import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Booking } from "@/types";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
  bookings: Booking[];
}

const BookingCalendar = ({ bookings }: BookingCalendarProps) => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  
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

  return (
    <div>
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
      
      <div className="calendar-container grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((day, index) => (
          <div key={index} className="calendar-day text-gray-600 text-xs text-center p-1">
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
          return (
            <div 
              key={format(day, 'd')}
              className={`calendar-day text-xs text-center p-1 ${
                isBooked 
                  ? 'bg-red-100 text-red-500' 
                  : 'bg-white'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 text-xs text-gray-600 text-center">
        <span className="inline-block bg-red-100 w-3 h-3 rounded-sm"></span> {t("apartments.booked")}
        <span className="inline-block bg-white w-3 h-3 rounded-sm ml-3 border border-gray-200"></span> {t("apartments.available")}
      </div>
    </div>
  );
};

export default BookingCalendar;