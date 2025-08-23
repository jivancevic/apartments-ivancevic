export interface Apartment {
  id: number;
  nameEn: string;
  nameHr: string;
  descriptionEn: string;
  descriptionHr: string;
  images: string[];
  location: string;
  basePeakPrice: number;
  priceMultiplier: string;
  cleaningFee: number;
  maxGuests: number;
  type: "apartment" | "studio" | "room";
  roomSizeM2: number;
  bedrooms: Array<{
    nameEn: string;
    nameHr: string;
    beds: Array<{ type: string; count: number }>;
  }>;
  bathrooms: number;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasAC: boolean;
  hasTV: boolean;
  hasBalcony: boolean;
  hasSeaView: boolean;
  hasCityView: boolean;
  hasDishwasher: boolean;
  hasCoffeeMachine: boolean;
  hasHairDryer: boolean;
  hasMicrowave: boolean;
  hasSmoothieMaker: boolean;
  washingMachineType: "both" | "washing" | "none";
  parkingType: "none" | "free" | "private";
  parkingDetails?: { pricePerDay: number; reservationRequired: boolean } | null;
  hasGarden: boolean;
  otherAmenities: string[] | null;
  bookingUrl: string | null;
  airbnbUrl: string | null;
  icalUrls: string[] | null;
}

export interface Booking {
  id: number;
  apartmentId: number;
  startDate: string | Date;
  endDate: string | Date;
}

export interface InsertBooking {
  apartmentId: number;
  startDate: string;
  endDate: string;
}

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

export interface Location {
  id: number;
  typeEn: string;
  typeHr: string;
  nameEn: string;
  nameHr: string;
  descriptionEn: string;
  descriptionHr: string;
  image: string;
  location?: string | null;
  distance?: { minutes: number; mean: "walk" | "car" | "ferry" } | null;
  link?: string | null;
  featureEn?: string | null;
  featureHr?: string | null;
}

export interface InsertApartment extends Omit<Apartment, "id"> {}
export interface InsertLocation extends Omit<Location, "id"> {}
