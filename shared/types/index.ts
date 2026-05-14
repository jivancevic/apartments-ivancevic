export interface Apartment {
  id: number;
  slug: string;
  stars: number;
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

export interface StayLengthDiscount {
  length: number;
  name?: string;
  discount: number;
}

export interface RuleSet {
  name: string;
  priceModifier: number;
  stayLengthDiscounts: StayLengthDiscount[];
  minNights?: number;
  maxNights?: number;
}

export interface RuleSetPeriod {
  start: string;
  end: string;
  ruleSet: string;
}

export interface PricePeriod {
  start: string;
  end: string;
  price: number;
}

export interface ApartmentPricingConfig {
  cleaningFee: number;
  defaultPrice: number;
  defaultStayLengthDiscounts: StayLengthDiscount[];
  defaultMinNights: number;
  defaultMaxNights: number;
}

export interface ApartmentSearchResult extends Apartment {
  priceSummary: PriceSummary;
}

export interface PriceSummary {
  totalNights: number;
  nightlyPrices: Array<{ date: string; price: number }>;
  subtotal: number;
  stayLengthDiscount: number;
  discountedSubtotal: number;
  cleaningFee: number;
  total: number;
  averagePerNight: number;
  discountInfo?: {
    type: string;
    percentage: number;
    amount: number;
  };
}
