import { Apartment } from '@shared/schema';

// Import types from server
export interface StayLengthDiscount {
  length: number;
  name?: string; // empty means generic long-term discount
  discount: number; // e.g., -0.1 for 10% discount
}

export interface RuleSet {
  name: string;
  priceModifier: number; // e.g., 0.2 for +20%, -0.2 for -20%
  stayLengthDiscounts: StayLengthDiscount[];
  minNights?: number;
  maxNights?: number;
}

export interface RuleSetPeriod {
  start: string; // "YYYY-MM-DD" format
  end: string;   // "YYYY-MM-DD" format
  ruleSet: string; // name matching GLOBAL_RULE_SETS key
}

export interface PricePeriod {
  start: string; // "YYYY-MM-DD" format
  end: string;   // "YYYY-MM-DD" format
  price: number; // base price for this period
}

export interface ApartmentPricingConfig {
  cleaningFee: number;
  defaultPrice: number;
  defaultStayLengthDiscounts: StayLengthDiscount[];
  defaultMinNights: number;
  defaultMaxNights: number;
}

// Global data - will be loaded from server
let GLOBAL_RULE_SETS: Record<string, RuleSet> = {};
let APARTMENT_RULE_SET_PERIODS: Record<string, RuleSetPeriod[]> = {};
let APARTMENT_PRICE_PERIODS: Record<string, PricePeriod[]> = {};
let APARTMENT_PRICING_CONFIGS: Record<string, ApartmentPricingConfig> = {};

// Load pricing data from server
async function loadPricingData() {
  if (Object.keys(GLOBAL_RULE_SETS).length > 0) {
    return; // Already loaded
  }

  try {
    const response = await fetch('/api/pricing-data');
    if (!response.ok) {
      throw new Error('Failed to fetch pricing data');
    }
    
    const data = await response.json();
    GLOBAL_RULE_SETS = data.globalRuleSets;
    APARTMENT_RULE_SET_PERIODS = data.apartmentRuleSetPeriods;
    APARTMENT_PRICE_PERIODS = data.apartmentPricePeriods;
    APARTMENT_PRICING_CONFIGS = data.apartmentPricingConfigs;
  } catch (error) {
    console.error('Error loading pricing data:', error);
    // Fallback to empty data
    GLOBAL_RULE_SETS = {};
    APARTMENT_RULE_SET_PERIODS = {};
    APARTMENT_PRICE_PERIODS = {};
    APARTMENT_PRICING_CONFIGS = {};
  }
}

// Ensure pricing data is loaded before using
async function ensurePricingDataLoaded() {
  await loadPricingData();
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00.000Z');
}

/**
 * Helper to format date as "YYYY-MM-DD"
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get the pricing configuration for an apartment
 */
export async function getApartmentPricingConfig(apartment: Apartment): Promise<ApartmentPricingConfig> {
  await ensurePricingDataLoaded();
  
  const config = APARTMENT_PRICING_CONFIGS[apartment.nameEn];
  if (config) {
    return config;
  }
  
  // Fallback to default configuration if apartment not found
  return {
    cleaningFee: apartment.cleaningFee || 40,
    defaultPrice: apartment.basePeakPrice || 70,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  };
}

/**
 * Get the base price for a specific date
 */
async function getBasePriceForDate(apartment: Apartment, date: Date): Promise<number> {
  await ensurePricingDataLoaded();
  
  const dateStr = formatDate(date);
  const pricePeriods = APARTMENT_PRICE_PERIODS[apartment.nameEn];
  
  if (!pricePeriods) {
    const config = await getApartmentPricingConfig(apartment);
    return config.defaultPrice;
  }

  // Find the price period that contains this date
  for (const period of pricePeriods) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return period.price;
    }
  }

  // If no price period found, fall back to apartment's default price
  const config = await getApartmentPricingConfig(apartment);
  return config.defaultPrice;
}

/**
 * Get the rule set for a specific date
 */
async function getRuleSetForDate(apartment: Apartment, date: Date): Promise<RuleSet | null> {
  await ensurePricingDataLoaded();
  
  const dateStr = formatDate(date);
  const ruleSetPeriods = APARTMENT_RULE_SET_PERIODS[apartment.nameEn];
  
  if (!ruleSetPeriods) {
    return null;
  }

  // Find the rule set period that contains this date
  for (const period of ruleSetPeriods) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return GLOBAL_RULE_SETS[period.ruleSet] || null;
    }
  }

  return null;
}

/**
 * Get stay length discounts for a given number of nights
 */
function getStayLengthDiscount(discounts: StayLengthDiscount[], nights: number): number {
  // Find the applicable discount (highest threshold that the stay meets)
  let applicableDiscount = 0;
  
  for (const discount of discounts) {
    if (nights >= discount.length) {
      applicableDiscount = discount.discount;
    }
  }
  
  return applicableDiscount;
}

/**
 * Calculates the price for an apartment on a given date
 */
export async function calculateNightlyPrice(apartment: Apartment, date: Date): Promise<number> {
  const basePrice = await getBasePriceForDate(apartment, date);
  const ruleSet = await getRuleSetForDate(apartment, date);
  
  if (!ruleSet) {
    return basePrice;
  }

  // Apply price modifier
  const modifiedPrice = basePrice * (1 + ruleSet.priceModifier);
  
  return Math.round(modifiedPrice);
}

/**
 * Gets cleaning fee for an apartment
 */
export async function getCleaningFee(apartment: Apartment): Promise<number> {
  const config = await getApartmentPricingConfig(apartment);
  return config.cleaningFee;
}

/**
 * Gets minimum and maximum nights for a stay starting on a given date
 */
export async function getStayLimits(apartment: Apartment, startDate: Date): Promise<{ minNights: number; maxNights: number }> {
  const ruleSet = await getRuleSetForDate(apartment, startDate);
  const config = await getApartmentPricingConfig(apartment);
  
  if (ruleSet && ruleSet.minNights !== undefined && ruleSet.maxNights !== undefined) {
    return {
      minNights: ruleSet.minNights,
      maxNights: ruleSet.maxNights
    };
  }
  
  return {
    minNights: config.defaultMinNights,
    maxNights: config.defaultMaxNights
  };
}

/**
 * Calculates total price for a stay with length-based discounts
 */
export interface PriceSummary {
  totalNights: number;
  nightlyPrices: {date: Date, price: number}[];
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

export async function calculateStayPrice(
  apartment: Apartment, 
  startDate: Date, 
  endDate: Date
): Promise<PriceSummary> {
  // Normalize dates to midnight
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  
  // Calculate number of nights (difference in days)
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const totalNights = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
  
  if (totalNights <= 0) {
    return {
      totalNights: 0,
      nightlyPrices: [],
      subtotal: 0,
      stayLengthDiscount: 0,
      discountedSubtotal: 0,
      cleaningFee: 0,
      total: 0,
      averagePerNight: 0
    };
  }
  
  const config = await getApartmentPricingConfig(apartment);
  
  // Calculate price for each night
  const nightlyPrices: {date: Date, price: number}[] = [];
  let currentDate = new Date(start);
  
  for (let i = 0; i < totalNights; i++) {
    const price = await calculateNightlyPrice(apartment, currentDate);
    nightlyPrices.push({
      date: new Date(currentDate),
      price
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Calculate subtotal (sum of all nightly prices)
  const subtotal = nightlyPrices.reduce((sum, night) => sum + night.price, 0);
  
  // Get applicable stay length discounts
  const startRuleSet = await getRuleSetForDate(apartment, start);
  const applicableDiscounts = startRuleSet?.stayLengthDiscounts || config.defaultStayLengthDiscounts;
  
  // Calculate stay length discount
  const stayLengthDiscountRate = getStayLengthDiscount(applicableDiscounts, totalNights);
  const stayLengthDiscountAmount = Math.round(subtotal * Math.abs(stayLengthDiscountRate));
  const discountedSubtotal = subtotal - stayLengthDiscountAmount;
  
  // Get cleaning fee
  const cleaningFee = await getCleaningFee(apartment);
  
  // Calculate total
  const total = discountedSubtotal + cleaningFee;
  
  // Calculate average price per night (after discounts, excluding cleaning fee)
  const averagePerNight = totalNights > 0 ? Math.round(discountedSubtotal / totalNights) : 0;
  
  // Prepare discount info
  let discountInfo;
  if (stayLengthDiscountAmount > 0) {
    // Find the applied discount rule
    const appliedDiscount = applicableDiscounts.find(d => 
      totalNights >= d.length && d.discount === stayLengthDiscountRate
    );
    
    discountInfo = {
      type: appliedDiscount?.name || 'Long-term stay discount',
      percentage: Math.round(Math.abs(stayLengthDiscountRate) * 100),
      amount: stayLengthDiscountAmount
    };
  }
  
  return {
    totalNights,
    nightlyPrices,
    subtotal,
    stayLengthDiscount: stayLengthDiscountAmount,
    discountedSubtotal,
    cleaningFee,
    total,
    averagePerNight,
    discountInfo
  };
}

/**
 * Gets pricing table for different seasons (backward compatibility)
 */
export async function getSeasonalPrices(apartment: Apartment): Promise<Record<string, number>> {
  // Sample dates for different seasons
  const sampleDates = {
    'Off Season': new Date(2025, 0, 15),     // January 15, 2025
    'Low Season': new Date(2025, 4, 1),     // May 1, 2025
    'High Season': new Date(2025, 6, 1),    // July 1, 2025
    'Peak Season': new Date(2025, 7, 15)    // August 15, 2025
  };
  
  const prices: Record<string, number> = {};
  
  for (const [seasonName, date] of Object.entries(sampleDates)) {
    prices[seasonName] = await getBasePriceForDate(apartment, date);
  }
  
  return prices;
}