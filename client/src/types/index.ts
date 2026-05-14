export type {
  Apartment,
  ApartmentSearchResult,
  Booking,
  Location,
  PriceSummary,
  StayLengthDiscount,
  RuleSet,
  RuleSetPeriod,
  PricePeriod,
  ApartmentPricingConfig,
} from "../../../shared/types";

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  apartmentId?: number;
  checkIn: Date;
  checkOut: Date;
  message?: string;
}

export interface Feature {
  icon: string;
  titleEn: string;
  titleHr: string;
  descriptionEn: string;
  descriptionHr: string;
}
