import { Apartment } from '@shared/schema';

// 1. Rule Sets (Global)
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

// Global rule sets
export const GLOBAL_RULE_SETS: Record<string, RuleSet> = {
  "Out of Season": {
    name: "Out of Season",
    priceModifier: -0.55, // 45% of peak price
    stayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 7, name: "weekly", discount: -0.1 },
      { length: 30, name: "monthly", discount: -0.4 }
    ],
    minNights: 2,
    maxNights: 60
  },
  "Low Season": {
    name: "Low Season",
    priceModifier: -0.4, // 60% of peak price
    stayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 7, name: "weekly", discount: -0.1 },
      { length: 30, name: "monthly", discount: -0.35 }
    ],
    minNights: 2,
    maxNights: 60
  },
  "High Season": {
    name: "High Season",
    priceModifier: -0.2, // 80% of peak price
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 },
      { length: 7, name: "weekly", discount: -0.05 },
      { length: 30, name: "monthly", discount: -0.2 }
    ],
    minNights: 3,
    maxNights: 30
  },
  "Peak Season": {
    name: "Peak Season",
    priceModifier: 0.0, // 100% of peak price
    stayLengthDiscounts: [
      { length: 7, discount: -0.03 },
      { length: 30, name: "monthly", discount: -0.15 }
    ],
    minNights: 5,
    maxNights: 21
  },
  "High Season Special": {
    name: "High Season Special",
    priceModifier: -0.25, // 75% of peak price (for Lara & Nika)
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 },
      { length: 7, name: "weekly", discount: -0.05 },
      { length: 30, name: "monthly", discount: -0.2 }
    ],
    minNights: 3,
    maxNights: 30
  }
};

// 2. Apartment-Specific RuleSet Period Mapping
export interface RuleSetPeriod {
  start: string; // "YYYY-MM-DD" format
  end: string;   // "YYYY-MM-DD" format
  ruleSet: string; // name matching GLOBAL_RULE_SETS key
}

// 3. Apartment Price Per Night Per Period
export interface PricePeriod {
  start: string; // "YYYY-MM-DD" format
  end: string;   // "YYYY-MM-DD" format
  price: number; // base price for this period
}

// 4. Apartment Configuration
export interface ApartmentPricingConfig {
  cleaningFee: number;
  defaultPrice: number;
  defaultStayLengthDiscounts: StayLengthDiscount[];
  defaultMinNights: number;
  defaultMaxNights: number;
  ruleSetPeriods: RuleSetPeriod[];
  pricePeriods: PricePeriod[];
}

// 5. Apartment-specific configurations using current data
export const APARTMENT_PRICING_CONFIGS: Record<string, ApartmentPricingConfig> = {
  "Magical Oasis": {
    cleaningFee: 50,
    defaultPrice: 110,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 100 },
      { start: "2025-04-26", end: "2025-06-06", price: 130 },
      { start: "2025-06-07", end: "2025-07-11", price: 180 },
      { start: "2025-07-12", end: "2025-08-22", price: 210 },
      { start: "2025-08-23", end: "2025-09-26", price: 180 },
      { start: "2025-09-27", end: "2025-10-24", price: 130 },
      { start: "2025-10-25", end: "2026-04-24", price: 100 }
    ]
  },
  "Ismaelli": {
    cleaningFee: 80,
    defaultPrice: 200,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 180 },
      { start: "2025-04-26", end: "2025-06-06", price: 240 },
      { start: "2025-06-07", end: "2025-07-11", price: 320 },
      { start: "2025-07-12", end: "2025-08-22", price: 400 },
      { start: "2025-08-23", end: "2025-09-26", price: 320 },
      { start: "2025-09-27", end: "2025-10-24", price: 240 },
      { start: "2025-10-25", end: "2026-04-24", price: 180 }
    ]
  },
  "Saint Roko": {
    cleaningFee: 40,
    defaultPrice: 80,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 65 },
      { start: "2025-04-26", end: "2025-06-06", price: 85 },
      { start: "2025-06-07", end: "2025-07-11", price: 120 },
      { start: "2025-07-12", end: "2025-08-22", price: 140 },
      { start: "2025-08-23", end: "2025-09-26", price: 120 },
      { start: "2025-09-27", end: "2025-10-24", price: 85 },
      { start: "2025-10-25", end: "2026-04-24", price: 65 }
    ]
  },
  "Lavander": {
    cleaningFee: 80,
    defaultPrice: 140,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 120 },
      { start: "2025-04-26", end: "2025-06-06", price: 155 },
      { start: "2025-06-07", end: "2025-07-11", price: 220 },
      { start: "2025-07-12", end: "2025-08-22", price: 280 },
      { start: "2025-08-23", end: "2025-09-26", price: 220 },
      { start: "2025-09-27", end: "2025-10-24", price: 155 },
      { start: "2025-10-25", end: "2026-04-24", price: 120 }
    ]
  },
  "Sun": {
    cleaningFee: 70,
    defaultPrice: 120,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 95 },
      { start: "2025-04-26", end: "2025-06-06", price: 130 },
      { start: "2025-06-07", end: "2025-07-11", price: 190 },
      { start: "2025-07-12", end: "2025-08-22", price: 240 },
      { start: "2025-08-23", end: "2025-09-26", price: 190 },
      { start: "2025-09-27", end: "2025-10-24", price: 130 },
      { start: "2025-10-25", end: "2026-04-24", price: 95 }
    ]
  },
  "Sea": {
    cleaningFee: 40,
    defaultPrice: 70,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 50 },
      { start: "2025-04-26", end: "2025-06-06", price: 70 },
      { start: "2025-06-07", end: "2025-07-11", price: 100 },
      { start: "2025-07-12", end: "2025-08-22", price: 130 },
      { start: "2025-08-23", end: "2025-09-26", price: 100 },
      { start: "2025-09-27", end: "2025-10-24", price: 70 },
      { start: "2025-10-25", end: "2026-04-24", price: 50 }
    ]
  },
  "Beach": {
    cleaningFee: 50,
    defaultPrice: 85,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season" },
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season" },
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 65 },
      { start: "2025-04-26", end: "2025-06-06", price: 85 },
      { start: "2025-06-07", end: "2025-07-11", price: 125 },
      { start: "2025-07-12", end: "2025-08-22", price: 165 },
      { start: "2025-08-23", end: "2025-09-26", price: 125 },
      { start: "2025-09-27", end: "2025-10-24", price: 85 },
      { start: "2025-10-25", end: "2026-04-24", price: 65 }
    ]
  },
  "Nika": {
    cleaningFee: 60,
    defaultPrice: 100,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season Special" }, // Special pricing
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season Special" }, // Special pricing
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 90 },
      { start: "2025-04-26", end: "2025-06-06", price: 120 },
      { start: "2025-06-07", end: "2025-07-11", price: 165 },
      { start: "2025-07-12", end: "2025-08-22", price: 200 },
      { start: "2025-08-23", end: "2025-09-26", price: 165 },
      { start: "2025-09-27", end: "2025-10-24", price: 120 },
      { start: "2025-10-25", end: "2026-04-24", price: 90 }
    ]
  },
  "Lara": {
    cleaningFee: 45,
    defaultPrice: 70,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
    ruleSetPeriods: [
      { start: "2024-10-01", end: "2025-04-25", ruleSet: "Out of Season" },
      { start: "2025-04-26", end: "2025-06-06", ruleSet: "Low Season" },
      { start: "2025-06-07", end: "2025-07-11", ruleSet: "High Season Special" }, // Special pricing
      { start: "2025-07-12", end: "2025-08-22", ruleSet: "Peak Season" },
      { start: "2025-08-23", end: "2025-09-26", ruleSet: "High Season Special" }, // Special pricing
      { start: "2025-09-27", end: "2025-10-24", ruleSet: "Low Season" },
      { start: "2025-10-25", end: "2026-04-24", ruleSet: "Out of Season" }
    ],
    pricePeriods: [
      { start: "2024-10-01", end: "2025-04-25", price: 45 },
      { start: "2025-04-26", end: "2025-06-06", price: 60 },
      { start: "2025-06-07", end: "2025-07-11", price: 85 },
      { start: "2025-07-12", end: "2025-08-22", price: 100 },
      { start: "2025-08-23", end: "2025-09-26", price: 85 },
      { start: "2025-09-27", end: "2025-10-24", price: 60 },
      { start: "2025-10-25", end: "2026-04-24", price: 45 }
    ]
  }
};

// Helper functions for the new pricing system

/**
 * Helper to create dates from string format "YYYY-MM-DD"
 */
function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
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
export function getApartmentPricingConfig(apartment: Apartment): ApartmentPricingConfig {
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
    defaultMaxNights: 60,
    ruleSetPeriods: [],
    pricePeriods: []
  };
}

/**
 * Get the base price for a specific date
 */
function getBasePriceForDate(config: ApartmentPricingConfig, date: Date): number {
  const dateStr = formatDate(date);
  
  // Find matching price period
  for (const period of config.pricePeriods) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return period.price;
    }
  }
  
  // Fallback to default price
  return config.defaultPrice;
}

/**
 * Get the rule set for a specific date
 */
function getRuleSetForDate(config: ApartmentPricingConfig, date: Date): RuleSet | null {
  const dateStr = formatDate(date);
  
  // Find matching rule set period
  for (const period of config.ruleSetPeriods) {
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
  let bestDiscount = 0;
  
  // Find the best applicable discount
  for (const discount of discounts) {
    if (nights >= discount.length && discount.discount < bestDiscount) {
      bestDiscount = discount.discount;
    }
  }
  
  return bestDiscount;
}

/**
 * Calculates the price for an apartment on a given date
 */
export function calculateNightlyPrice(apartment: Apartment, date: Date): number {
  const config = getApartmentPricingConfig(apartment);
  
  // Get base price for this date
  const basePrice = getBasePriceForDate(config, date);
  
  // Get rule set for this date
  const ruleSet = getRuleSetForDate(config, date);
  
  if (!ruleSet) {
    // No rule set found, return base price
    return Math.round(basePrice);
  }
  
  // Apply price modifier from rule set
  const modifiedPrice = basePrice * (1 + ruleSet.priceModifier);
  
  return Math.round(modifiedPrice);
}

/**
 * Gets cleaning fee for an apartment
 */
export function getCleaningFee(apartment: Apartment): number {
  const config = getApartmentPricingConfig(apartment);
  return config.cleaningFee;
}

/**
 * Gets minimum and maximum nights for a stay starting on a given date
 */
export function getStayLimits(apartment: Apartment, startDate: Date): { minNights: number; maxNights: number } {
  const config = getApartmentPricingConfig(apartment);
  const ruleSet = getRuleSetForDate(config, startDate);
  
  if (ruleSet && (ruleSet.minNights !== undefined || ruleSet.maxNights !== undefined)) {
    return {
      minNights: ruleSet.minNights || config.defaultMinNights,
      maxNights: ruleSet.maxNights || config.defaultMaxNights
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

export function calculateStayPrice(
  apartment: Apartment, 
  startDate: Date, 
  endDate: Date
): PriceSummary {
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
  
  const config = getApartmentPricingConfig(apartment);
  
  // Calculate price for each night
  const nightlyPrices: {date: Date, price: number}[] = [];
  let currentDate = new Date(start);
  
  for (let i = 0; i < totalNights; i++) {
    const price = calculateNightlyPrice(apartment, currentDate);
    nightlyPrices.push({
      date: new Date(currentDate),
      price
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Calculate subtotal (sum of all nightly prices)
  const subtotal = nightlyPrices.reduce((sum, night) => sum + night.price, 0);
  
  // Get applicable stay length discounts
  const startRuleSet = getRuleSetForDate(config, start);
  const applicableDiscounts = startRuleSet?.stayLengthDiscounts || config.defaultStayLengthDiscounts;
  
  // Calculate stay length discount
  const stayLengthDiscountRate = getStayLengthDiscount(applicableDiscounts, totalNights);
  const stayLengthDiscountAmount = Math.round(subtotal * Math.abs(stayLengthDiscountRate));
  const discountedSubtotal = subtotal - stayLengthDiscountAmount;
  
  // Get cleaning fee
  const cleaningFee = getCleaningFee(apartment);
  
  // Calculate total
  const total = discountedSubtotal + cleaningFee;
  
  // Calculate average price per night (after discounts)
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
export function getSeasonalPrices(apartment: Apartment): Record<string, number> {
  const config = getApartmentPricingConfig(apartment);
  
  // Sample dates for different periods to show price variations
  const sampleDates = {
    'Out of Season': new Date(2024, 10, 1), // November 1, 2024
    'Low Season': new Date(2025, 4, 1),     // May 1, 2025
    'High Season': new Date(2025, 6, 1),    // July 1, 2025
    'Peak Season': new Date(2025, 7, 15)    // August 15, 2025
  };
  
  const prices: Record<string, number> = {};
  
  for (const [seasonName, date] of Object.entries(sampleDates)) {
    prices[seasonName] = calculateNightlyPrice(apartment, date);
  }
  
  return prices;
}

// Legacy support - export old enum for backward compatibility
export enum SeasonType {
  OUT_OF_SEASON = 'OUT_OF_SEASON',
  LOW_SEASON = 'LOW_SEASON', 
  HIGH_SEASON = 'HIGH_SEASON',
  PEAK_SEASON = 'PEAK_SEASON'
}

// Legacy function for backward compatibility
export function getSeasonType(date: Date): SeasonType {
  const dateStr = formatDate(date);
  
  // Map to seasons based on date ranges
  if (dateStr >= "2024-10-25" && dateStr <= "2025-04-25") return SeasonType.OUT_OF_SEASON;
  if (dateStr >= "2025-04-26" && dateStr <= "2025-06-06") return SeasonType.LOW_SEASON;
  if (dateStr >= "2025-06-07" && dateStr <= "2025-07-11") return SeasonType.HIGH_SEASON;
  if (dateStr >= "2025-07-12" && dateStr <= "2025-08-22") return SeasonType.PEAK_SEASON;
  if (dateStr >= "2025-08-23" && dateStr <= "2025-09-26") return SeasonType.HIGH_SEASON;
  if (dateStr >= "2025-09-27" && dateStr <= "2025-10-24") return SeasonType.LOW_SEASON;
  
  return SeasonType.OUT_OF_SEASON;
}

// Legacy function for backward compatibility
export function getSeasonName(seasonType: SeasonType): string {
  switch (seasonType) {
    case SeasonType.OUT_OF_SEASON: return 'Out of Season';
    case SeasonType.LOW_SEASON: return 'Low Season';
    case SeasonType.HIGH_SEASON: return 'High Season';
    case SeasonType.PEAK_SEASON: return 'Peak Season';
    default: return 'Unknown Season';
  }
}

