import fetch from "node-fetch";
import ical from "ical";
import { storage } from "../storage";
import type { Apartment, Booking, InsertInquiry } from "../types";
import {
  sendOwnerNotification,
  sendCustomerConfirmation,
} from "./emailService";

export const apartmentService = {
  async getAll(): Promise<Apartment[]> {
    return storage.getApartments();
  },
  async getById(id: number): Promise<Apartment | undefined> {
    return storage.getApartment(id);
  },
  async getAllBookings(): Promise<Booking[]> {
    return storage.getBookings();
  },
  async getBookingsByApartment(id: number): Promise<Booking[]> {
    return storage.getBookingsByApartment(id);
  },
};

export async function getIcalBookings(apartmentId: number): Promise<Booking[]> {
  const apartment = await storage.getApartment(apartmentId);
  if (!apartment) return [];
  const icalUrls = (apartment as any).icalUrls as string[] | null;
  if (!icalUrls || icalUrls.length === 0) return [];
  const all: Booking[] = [];
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
  return all;
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
  const inquiry = await storage.createInquiry({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    apartmentId: data.apartmentId ?? null,
    message: data.message ?? null,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
  });
  let apartment: Apartment | undefined = undefined;
  if (data.apartmentId) {
    apartment = await storage.getApartment(data.apartmentId);
  }
  // fire-and-forget emails
  const emailData = { ...data, checkIn, checkOut } as any;
  sendOwnerNotification(emailData, apartment).catch(() => {});
  sendCustomerConfirmation(emailData, apartment).catch(() => {});
  return inquiry;
}
