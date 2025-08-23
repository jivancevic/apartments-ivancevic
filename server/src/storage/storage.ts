import type {
  Apartment,
  InsertApartment,
  Booking,
  InsertBooking,
  Inquiry,
  InsertInquiry,
  Location,
  InsertLocation,
} from "../types";
import { apartmentData } from "../data/apartments";
import { visitData } from "../data/visit";

export interface IStorage {
  getApartments(): Promise<Apartment[]>;
  getApartment(id: number): Promise<Apartment | undefined>;
  createApartment(apartment: InsertApartment): Promise<Apartment>;
  getBookings(): Promise<Booking[]>;
  getBookingsByApartment(apartmentId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getLocations(): Promise<Location[]>;
  getLocationsByType(type: string): Promise<Location[]>;
  getLocationsByCategory(category: string): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
}

export class MemStorage implements IStorage {
  private apartments: Map<number, Apartment> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private inquiries: Map<number, Inquiry> = new Map();
  private locations: Map<number, Location> = new Map();

  private apartmentId = 9;
  private bookingId = 1;
  private inquiryId = 1;
  private locationId = 10;

  constructor() {
    this.seedApartments();
    this.seedLocations();
    this.createBooking({
      apartmentId: 1,
      startDate: new Date("2025-07-15") as unknown as string,
      endDate: new Date("2025-07-20") as unknown as string,
    });
  }

  async getApartments(): Promise<Apartment[]> {
    return Array.from(this.apartments.values());
  }
  async getApartment(id: number): Promise<Apartment | undefined> {
    return this.apartments.get(id);
  }
  async createApartment(apartment: InsertApartment): Promise<Apartment> {
    const newApartment = { id: this.apartmentId++, ...apartment } as Apartment;
    this.apartments.set(newApartment.id, newApartment);
    return newApartment;
  }
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  async getBookingsByApartment(apartmentId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (b) => b.apartmentId === apartmentId
    );
  }
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const newBooking = { id: this.bookingId++, ...booking } as Booking;
    this.bookings.set(newBooking.id, newBooking);
    return newBooking;
  }
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const newInquiry = {
      id: this.inquiryId++,
      createdAt: new Date(),
      ...inquiry,
      apartmentId: inquiry.apartmentId ?? null,
      phone: inquiry.phone ?? null,
      message: inquiry.message ?? null,
    } as Inquiry;
    this.inquiries.set(newInquiry.id, newInquiry);
    return newInquiry;
  }
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }
  async getLocationsByType(type: string): Promise<Location[]> {
    return Array.from(this.locations.values()).filter(
      (l) => l.typeEn === type || l.typeHr === type
    );
  }
  async getLocationsByCategory(category: string): Promise<Location[]> {
    let typeToLookFor = category;
    switch (category) {
      case "attractionsOldTown":
        typeToLookFor = "attraction-old-town";
        break;
      case "attractionsIsland":
        typeToLookFor = "attraction-island";
        break;
      case "activities":
        typeToLookFor = "activity";
        break;
      case "excursions":
        typeToLookFor = "excursion";
        break;
      case "restaurants":
        typeToLookFor = "restaurant";
        break;
    }
    return this.getLocationsByType(typeToLookFor);
  }
  async createLocation(location: InsertLocation): Promise<Location> {
    const newLocation = {
      id: this.locationId++,
      link: location.link ?? null,
      location: location.location ?? null,
      distance: location.distance ?? null,
      featureEn: location.featureEn ?? null,
      featureHr: location.featureHr ?? null,
      ...location,
    } as Location;
    this.locations.set(newLocation.id, newLocation);
    return newLocation;
  }

  private seedApartments() {
    this.apartments = new Map(apartmentData.map((apt) => [apt.id, apt]));
  }
  private seedLocations() {
    visitData.forEach((loc, index) => {
      const id = index + 1;
      this.locations.set(id, { ...loc, id } as unknown as Location);
    });
  }
}

export const storage = new MemStorage();
