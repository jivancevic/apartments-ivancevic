import { useState, useEffect } from 'react';
import { Booking } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface IcalCache {
  bookings: Booking[];
  timestamp: number;
}

// Cache to store iCal data with timestamps
const icalCache = new Map<number, IcalCache>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export function useIcalFeeds(apartmentId: number, icalUrls?: string[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [icalBookings, setIcalBookings] = useState<Booking[]>([]);

  // Use React Query to fetch iCal bookings from server endpoint
  const { 
    data: bookingsData,
    isLoading: isQueryLoading,
    error: queryError
  } = useQuery<any[]>({
    queryKey: [`/api/apartments/${apartmentId}/ical-bookings`],
    // Only run query if there are iCalUrls
    enabled: !!icalUrls && icalUrls.length > 0,
    staleTime: CACHE_TTL, // Cache for 1 hour
  });

  // Process the results
  useEffect(() => {
    // If no iCal URLs, return early
    if (!icalUrls || icalUrls.length === 0) {
      setIcalBookings([]);
      return;
    }

    // Handle error state
    if (queryError) {
      console.error('Error fetching iCal bookings:', queryError);
      setError(queryError instanceof Error ? queryError.message : 'Unknown error fetching iCal bookings');
      return;
    }

    // Process data
    if (bookingsData) {
      try {
        // Convert ISO string dates to Date objects
        const parsedBookings = bookingsData.map((booking: any) => ({
          ...booking,
          startDate: new Date(booking.startDate),
          endDate: new Date(booking.endDate)
        }));

        setIcalBookings(parsedBookings);
        setError(null);
      } catch (err) {
        console.error('Error processing iCal bookings:', err);
        setError(err instanceof Error ? err.message : 'Unknown error processing iCal bookings');
      }
    }

    // Update loading status
    setIsLoading(isQueryLoading);
  }, [apartmentId, icalUrls, bookingsData, isQueryLoading, queryError]);

  return { icalBookings, isLoading, error };
}