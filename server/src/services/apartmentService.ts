import fetch from "node-fetch";
import ical from "ical";
import { storage } from "../storage";
import type { Apartment, ApartmentSearchResult, Booking, InsertInquiry } from "../types";
import { calculateStayPrice } from "./pricingService";

export async function getAvailability(id: number): Promise<Booking[]> {
  const [stored, ical] = await Promise.all([
    storage.getBookingsByApartment(id),
    getIcalBookings(id),
  ]);
  return [...stored, ...ical];
}

// 15-minute server-side iCal cache — serves stale data on external failures
const ICAL_CACHE_TTL_MS = 15 * 60 * 1000;
interface IcalCacheEntry {
  bookings: Booking[];
  fetchedAt: number;
}
const icalCache = new Map<number, IcalCacheEntry>();

export async function getIcalBookings(apartmentId: number): Promise<Booking[]> {
  const cached = icalCache.get(apartmentId);
  if (cached && Date.now() - cached.fetchedAt < ICAL_CACHE_TTL_MS) {
    return cached.bookings;
  }

  const apartment = await storage.getApartment(apartmentId);
  if (!apartment) return [];
  const { icalUrls } = apartment;
  if (!icalUrls || icalUrls.length === 0) return [];

  const all: Booking[] = [];
  try {
    for (const url of icalUrls) {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });
      if (!response.ok) continue;
      const data = await response.text();
      const parsed = ical.parseICS(data);
      for (const key in parsed) {
        const event = parsed[key];
        if (event.type === "VEVENT" && event.start && event.end) {
          all.push({
            id: Math.floor(Math.random() * 1000000),
            apartmentId,
            startDate: event.start.toISOString(),
            endDate: event.end.toISOString(),
          });
        }
      }
    }
  } catch {
    // On failure, return stale cache if available
    if (cached) return cached.bookings;
    return [];
  }

  icalCache.set(apartmentId, { bookings: all, fetchedAt: Date.now() });
  return all;
}

const toDateStr = (d: Date | string): string =>
  typeof d === "string" ? d.slice(0, 10) : d.toISOString().slice(0, 10);

export async function searchApartments(
  checkIn: string,
  checkOut: string,
  guests: number
): Promise<ApartmentSearchResult[]> {
  const apartments = await storage.getApartments();

  const results = await Promise.all(
    apartments.map(async (apt): Promise<ApartmentSearchResult | null> => {
      if (apt.maxGuests < guests) return null;

      const bookings = await getAvailability(apt.id);
      const isAvailable = !bookings.some((b) => {
        const bStart = toDateStr(b.startDate);
        const bEnd = toDateStr(b.endDate);
        return checkIn < bEnd && checkOut > bStart;
      });

      if (!isAvailable) return null;

      const priceSummary = calculateStayPrice(
        apt.id,
        new Date(checkIn + "T00:00:00"),
        new Date(checkOut + "T00:00:00")
      );
      return { ...apt, priceSummary };
    })
  );

  return results.filter((r): r is ApartmentSearchResult => r !== null);
}

export async function createInquiry(data: InsertInquiry) {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    throw new Error("Invalid dates provided");
  }
  if (checkOut <= checkIn) {
    throw new Error("Check-out date must be after check-in date");
  }
  return storage.createInquiry({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    apartmentId: data.apartmentId ?? null,
    message: data.message ?? null,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
  });
}
