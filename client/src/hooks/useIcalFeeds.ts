import { useState, useEffect } from 'react';
import { Booking } from '@/types';
import ical, { ICalEvent } from 'ical';

interface IcalCache {
  bookings: Booking[];
  timestamp: number;
}

// Cache to store parsed iCal data with timestamps
const icalCache = new Map<string, IcalCache>();
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

    const fetchAndParseIcalFeeds = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const now = Date.now();
        const allBookings: Booking[] = [];

        // Process each iCal URL
        for (const url of icalUrls) {
          // Check cache first
          const cached = icalCache.get(url);
          if (cached && now - cached.timestamp < CACHE_TTL) {
            allBookings.push(...cached.bookings);
            continue;
          }

          // Fetch and parse the iCal feed
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch iCal feed from ${url}`);
          }

          const data = await response.text();
          const parsedCal = ical.parseICS(data);
          const bookings: Booking[] = [];

          // Process events from the feed
          Object.values(parsedCal).forEach((event: ICalEvent) => {
            if (event.type === 'VEVENT' && event.start && event.end) {
              // For iCal feeds from booking platforms, we typically want all events
              // as they represent reserved periods, but you can add filters if needed
              bookings.push({
                id: Math.floor(Math.random() * 1000000), // Generate a random ID
                apartmentId,
                startDate: event.start,
                endDate: event.end
              });
            }
          });

          // Cache the results
          icalCache.set(url, {
            bookings,
            timestamp: now
          });

          allBookings.push(...bookings);
        }

        setIcalBookings(allBookings);
      } catch (err) {
        console.error('Error fetching iCal feeds:', err);
        setError(err instanceof Error ? err.message : 'Unknown error fetching iCal feeds');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndParseIcalFeeds();
  }, [apartmentId, icalUrls]);

  return { icalBookings, isLoading, error };
}