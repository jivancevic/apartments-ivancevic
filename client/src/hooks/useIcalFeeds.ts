import { useMemo } from "react";
import { Booking } from "@/types";
import { useQuery } from "@tanstack/react-query";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useIcalFeeds(apartmentId: number, icalUrls?: string[]) {
  // Check if we should enable the query
  const shouldFetch = !!icalUrls && icalUrls.length > 0;
  
  // Use React Query to fetch iCal bookings from server endpoint
  const {
    data: bookingsData,
    isLoading,
    error: queryError,
  } = useQuery<any[]>({
    queryKey: [`/api/apartments/${apartmentId}/ical-bookings`],
    enabled: shouldFetch,
    staleTime: CACHE_TTL,
  });
  
  // Process the data with useMemo to avoid unnecessary calculations
  const icalBookings = useMemo(() => {
    if (!bookingsData) return [];
    
    try {
      // Convert ISO string dates to Date objects
      return bookingsData.map((booking: any) => ({
        ...booking,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
      }));
    } catch (err) {
      console.error("Error processing iCal bookings:", err);
      return [];
    }
  }, [bookingsData]);
  
  // Format the error message
  const error = queryError 
    ? (queryError instanceof Error 
        ? queryError.message 
        : "Unknown error fetching iCal bookings")
    : null;
  
  return { 
    icalBookings, 
    isLoading, 
    error 
  };
}
