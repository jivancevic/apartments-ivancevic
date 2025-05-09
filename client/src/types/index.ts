// Apartment type definitions
export interface Apartment {
  id: number;
  nameEn: string;
  nameHr: string;
  descriptionEn: string;
  descriptionHr: string;
  mainImage: string;
  images: string[];
  location?: string;
  price: number;
  priceHigh: number;
  pricePeak: number;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasAC: boolean;
  hasTV: boolean;
  hasBalcony: boolean;
  hasSeaView: boolean;
  hasParking: boolean;
  hasGarden: boolean;
  otherAmenities?: string[];
  bookingUrl?: string | null;
  airbnbUrl?: string | null;
  icalUrls?: string[];
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
