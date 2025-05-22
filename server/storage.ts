import { 
  apartments, type Apartment, type InsertApartment,
  bookings, type Booking, type InsertBooking,
  inquiries, type Inquiry, type InsertInquiry,
  locations, type Location, type InsertLocation
} from "@shared/schema";
import { apartmentData } from './apartments';
import { visitData, visitDataByCategory } from './visit';

// Storage interface with all needed CRUD operations
export interface IStorage {
  // Apartment operations
  getApartments(): Promise<Apartment[]>;
  getApartment(id: number): Promise<Apartment | undefined>;
  createApartment(apartment: InsertApartment): Promise<Apartment>;
  
  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBookingsByApartment(apartmentId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  
  // Location operations
  getLocations(): Promise<Location[]>;
  getLocationsByType(type: string): Promise<Location[]>;
  getLocationsByCategory(category: string): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private apartments: Map<number, Apartment>;
  private bookings: Map<number, Booking>;
  private inquiries: Map<number, Inquiry>;
  private locations: Map<number, Location>;
  
  private apartmentId: number;
  private bookingId: number;
  private inquiryId: number;
  private locationId: number;
  
  constructor() {
    this.apartments = new Map();
    this.bookings = new Map();
    this.inquiries = new Map();
    this.locations = new Map();
    
    this.apartmentId = 9;
    this.bookingId = 1;
    this.inquiryId = 1; 
    this.locationId = 10;
    
    // Initialize with seed data
    this.seedApartments();
    this.seedLocations();
    
    // Add a booking for demo purposes
    this.createBooking({
      apartmentId: 1,
      startDate: new Date("2025-07-15") as unknown as string, // Type casting to fix TS error
      endDate: new Date("2025-07-20") as unknown as string    // Type casting to fix TS error
    });
  }
  
  // APARTMENT OPERATIONS
  async getApartments(): Promise<Apartment[]> {
    return Array.from(this.apartments.values());
  }
  
  async getApartment(id: number): Promise<Apartment | undefined> {
    return this.apartments.get(id);
  }
  
  async createApartment(apartment: InsertApartment): Promise<Apartment> {
    const newApartment = {
      id: this.apartmentId++,
      ...apartment
    } as Apartment; // Type casting to fix TS error
    
    this.apartments.set(newApartment.id, newApartment);
    return newApartment;
  }
  
  // BOOKING OPERATIONS
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBookingsByApartment(apartmentId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.apartmentId === apartmentId
    );
  }
  
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const newBooking = {
      id: this.bookingId++,
      ...booking
    } as Booking; // Type casting to fix TS error
    
    this.bookings.set(newBooking.id, newBooking);
    return newBooking;
  }
  
  // INQUIRY OPERATIONS
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const newInquiry = {
      id: this.inquiryId++,
      createdAt: new Date(),
      ...inquiry,
      // Ensure optional fields are properly set
      apartmentId: inquiry.apartmentId ?? null,
      phone: inquiry.phone ?? null,
      message: inquiry.message ?? null
    } as Inquiry; // Type casting to fix TS error
    
    this.inquiries.set(newInquiry.id, newInquiry);
    return newInquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
  
  // LOCATION OPERATIONS
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }
  
  async getLocationsByType(type: string): Promise<Location[]> {
    return Array.from(this.locations.values()).filter(
      location => location.typeEn === type || location.typeHr === type
    );
  }
  
  async getLocationsByCategory(category: string): Promise<Location[]> {
    // Map the category to type if needed
    let typeToLookFor = category;
    
    // Handle mapping from category to type
    switch(category) {
      case 'attractionsOldTown':
        typeToLookFor = 'attraction-old-town';
        break;
      case 'attractionsIsland':
        typeToLookFor = 'attraction-island';
        break;
      case 'activities':
        typeToLookFor = 'activity';
        break;
      case 'excursions':
        typeToLookFor = 'excursion';
        break;
      case 'restaurants':
        typeToLookFor = 'restaurant';
        break;
    }
    
    // Now filter by the appropriate type
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
      ...location
    } as Location; // Type casting to fix TS error
    
    this.locations.set(newLocation.id, newLocation);
    return newLocation;
  }
  
  // SEED DATA
  private seedApartments() {
    // Load data from the apartments.ts file
    this.apartments = new Map(apartmentData.map(apt => [apt.id, apt]));
  }
  
  private seedLocations() {
    // Use the separate visit data file for locations
    visitData.forEach((location, index) => {
      const id = index + 1;
      this.locations.set(id, {
        ...location,
        id,
        // Ensure nullable fields have appropriate defaults
        link: location.link ?? null,
        location: location.location ?? null,
        distance: location.distance ?? null,
        featureEn: location.featureEn ?? null,
        featureHr: location.featureHr ?? null
      } as Location); // Type casting to fix TS error
    });
  }
}

export const storage = new MemStorage();