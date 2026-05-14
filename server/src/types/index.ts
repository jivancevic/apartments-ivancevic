export type { Apartment, ApartmentSearchResult, Booking, Location, PriceSummary } from "../../../shared/types";

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  apartmentId: number | null;
  checkIn: string;
  checkOut: string;
  message: string | null;
  createdAt: Date;
}

export interface InsertInquiry {
  name: string;
  email: string;
  phone?: string | null;
  apartmentId?: number | null;
  checkIn: string;
  checkOut: string;
  message?: string | null;
}

export interface InsertBooking {
  apartmentId: number;
  startDate: string;
  endDate: string;
}

export interface InsertApartment extends Omit<import("../../../shared/types").Apartment, "id"> {}
export interface InsertLocation extends Omit<import("../../../shared/types").Location, "id"> {}
