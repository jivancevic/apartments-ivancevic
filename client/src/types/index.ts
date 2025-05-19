// Apartment type definitions
export interface Apartment {
  id: number;
  nameEn: string;
  nameHr: string;
  descriptionEn: string;
  descriptionHr: string;
  mainImage?: string; // Client-only field
  images: string[];
  location: string;
  // Dynamic pricing fields
  basePeakPrice: number;
  priceMultiplier: string;
  cleaningFee: number;
  // Guest capacity
  maxGuests: number;
  // Amenities
  hasWifi: boolean;
  hasKitchen: boolean;
  hasAC: boolean;
  hasTV: boolean;
  hasBalcony: boolean;
  hasSeaView: boolean;
  parkingType: "none" | "free" | "private";
  parkingDetails?: {
    pricePerDay: number;
    reservationRequired: boolean;
  };
  hasGarden: boolean;
  otherAmenities: string[] | null;
  // Booking links
  bookingUrl: string | null;
  airbnbUrl: string | null;
  icalUrls: string[] | null;
}

// Booking type definitions
export interface Booking {
  id: number;
  apartmentId: number;
  startDate: string | Date;
  endDate: string | Date;
}

// Inquiry form data
export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  apartmentId?: number;
  checkIn: Date;
  checkOut: Date;
  message?: string;
}

// Location type definitions
export interface Location {
  id: number;
  typeEn: string;
  typeHr: string;
  nameEn: string;
  nameHr: string;
  descriptionEn: string;
  descriptionHr: string;
  image: string;
  distanceEn?: string;
  distanceHr?: string;
  featureEn?: string;
  featureHr?: string;
}

// Feature type for home page
export interface Feature {
  icon: string;
  titleEn: string;
  titleHr: string;
  descriptionEn: string;
  descriptionHr: string;
}
