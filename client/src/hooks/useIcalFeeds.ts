import { useState, useEffect } from 'react';
import { Booking } from '@/types';

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

  useEffect(() => {
    // If no iCal URLs, return early
    if (!icalUrls || icalUrls.length === 0) {
      setIcalBookings([]);
      return;
    }

    const fetchIcalBookings = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const now = Date.now();
        
        // Check cache first using apartmentId as the key
        const cached = icalCache.get(apartmentId);
        if (cached && now - cached.timestamp < CACHE_TTL) {
          setIcalBookings(cached.bookings);
          setIsLoading(false);
          return;
        }

        // Fetch from server endpoint that handles all the parsing
        const response = await fetch(`/api/apartments/${apartmentId}/ical-bookings`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch iCal bookings');
        }

        const bookings = await response.json();
        
        // Convert ISO string dates to Date objects
        const parsedBookings = bookings.map((booking: any) => ({
          ...booking,
          startDate: new Date(booking.startDate),
          endDate: new Date(booking.endDate)
        }));

        // Cache the results
        icalCache.set(apartmentId, {
          bookings: parsedBookings,
          timestamp: now
        });

        setIcalBookings(parsedBookings);
      } catch (err) {
        console.error('Error fetching iCal bookings:', err);
        setError(err instanceof Error ? err.message : 'Unknown error fetching iCal bookings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIcalBookings();
  }, [apartmentId, icalUrls?.length]); // Only depends on apartmentId and icalUrls array length, not contents

  return { icalBookings, isLoading, error };
}