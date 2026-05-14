export type {
  StayLengthDiscount,
  RuleSet,
  RuleSetPeriod,
  PricePeriod,
  ApartmentPricingConfig,
} from "../../../shared/types";
import type {
  StayLengthDiscount,
  RuleSet,
  RuleSetPeriod,
  PricePeriod,
  ApartmentPricingConfig,
} from "../../../shared/types";

// Global rule sets
export const GLOBAL_RULE_SETS: Record<string, RuleSet> = {
  // Ivancevic apartments rules
  "ivancevic-off": {
    name: "Off season",
    priceModifier: 0.0, // No modifier, base price already calculated
    stayLengthDiscounts: [
      { length: 7, name: "weekly", discount: -0.17 },
      { length: 30, name: "monthly", discount: -0.4 },
    ],
    minNights: 2,
    maxNights: 90,
  },
  "ivancevic-low": {
    name: "Low season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 3, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.5 },
    ],
    minNights: 2,
    maxNights: 60,
  },
  "ivancevic-mid": {
    name: "Mid season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 3, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.5 },
    ],
    minNights: 2,
    maxNights: 30,
  },
  "ivancevic-high": {
    name: "High season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 4, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.5 },
    ],
    minNights: 3,
    maxNights: 30,
  },
  "ivancevic-peak": {
    name: "Peak season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 5, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.5 },
    ],
    minNights: 3,
    maxNights: 21,
  },
  // Giuliani apartments rules
  "giuliani-off": {
    name: "Off season",
    priceModifier: 0.0, // No modifier, base price already calculated
    stayLengthDiscounts: [],
    minNights: 2,
    maxNights: 90,
  },
  "giuliani-low": {
    name: "Low season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [{ length: 3, discount: -0.17 }],
    minNights: 2,
    maxNights: 60,
  },
  "giuliani-top": {
    name: "Top season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [{ length: 4, discount: -0.17 }],
    minNights: 2,
    maxNights: 30,
  },
  "giuliani-full": {
    name: "Full season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [{ length: 5, discount: -0.17 }],
    minNights: 3,
    maxNights: 21,
  },
};

// Keyed by apartment ID (see server/src/data/apartments.ts for ID→name mapping)
export const APARTMENT_RULE_SET_PERIODS: Record<number, RuleSetPeriod[]> = {
  // 1: Magical Oasis
  1: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 2: Ismaelli Palace
  2: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 3: Saint Roko
  3: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 4: Lavender
  4: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 5: Sun
  5: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 6: Sea
  6: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 7: Beach
  7: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" },
  ],
  // 8: Nika
  8: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "giuliani-off" },
    { start: "2025-04-26", end: "2025-06-06", ruleSet: "giuliani-low" },
    { start: "2025-06-07", end: "2025-07-11", ruleSet: "giuliani-top" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "giuliani-full" },
    { start: "2025-08-23", end: "2025-09-26", ruleSet: "giuliani-top" },
    { start: "2025-09-27", end: "2025-10-24", ruleSet: "giuliani-low" },
    { start: "2025-10-25", end: "2026-04-24", ruleSet: "giuliani-off" },
  ],
  // 9: Lara
  9: [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "giuliani-off" },
    { start: "2025-04-26", end: "2025-06-06", ruleSet: "giuliani-low" },
    { start: "2025-06-07", end: "2025-07-11", ruleSet: "giuliani-top" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "giuliani-full" },
    { start: "2025-08-23", end: "2025-09-26", ruleSet: "giuliani-top" },
    { start: "2025-09-27", end: "2025-10-24", ruleSet: "giuliani-low" },
    { start: "2025-10-25", end: "2026-04-24", ruleSet: "giuliani-off" },
  ],
};

// Keyed by apartment ID
export const APARTMENT_PRICE_PERIODS: Record<number, PricePeriod[]> = {
  // 1: Magical Oasis — Peak: 187
  1: [
    { start: "2024-10-01", end: "2025-04-25", price: 75 },
    { start: "2025-04-26", end: "2025-05-29", price: 103 },
    { start: "2025-05-30", end: "2025-06-20", price: 131 },
    { start: "2025-06-21", end: "2025-07-11", price: 159 },
    { start: "2025-07-12", end: "2025-08-22", price: 187 },
    { start: "2025-08-23", end: "2025-09-12", price: 159 },
    { start: "2025-09-13", end: "2025-10-03", price: 131 },
    { start: "2025-10-04", end: "2025-10-31", price: 103 },
    { start: "2025-11-01", end: "2026-04-24", price: 75 },
  ],
  // 2: Ismaelli Palace — Peak: 440
  2: [
    { start: "2024-10-01", end: "2025-04-25", price: 176 },
    { start: "2025-04-26", end: "2025-05-29", price: 242 },
    { start: "2025-05-30", end: "2025-06-20", price: 308 },
    { start: "2025-06-21", end: "2025-07-11", price: 374 },
    { start: "2025-07-12", end: "2025-08-22", price: 440 },
    { start: "2025-08-23", end: "2025-09-12", price: 374 },
    { start: "2025-09-13", end: "2025-10-03", price: 308 },
    { start: "2025-10-04", end: "2025-10-31", price: 242 },
    { start: "2025-11-01", end: "2026-04-24", price: 176 },
  ],
  // 3: Saint Roko — Peak: 154
  3: [
    { start: "2024-10-01", end: "2025-04-25", price: 62 },
    { start: "2025-04-26", end: "2025-05-29", price: 85 },
    { start: "2025-05-30", end: "2025-06-20", price: 108 },
    { start: "2025-06-21", end: "2025-07-11", price: 131 },
    { start: "2025-07-12", end: "2025-08-22", price: 154 },
    { start: "2025-08-23", end: "2025-09-12", price: 131 },
    { start: "2025-09-13", end: "2025-10-03", price: 108 },
    { start: "2025-10-04", end: "2025-10-31", price: 85 },
    { start: "2025-11-01", end: "2026-04-24", price: 62 },
  ],
  // 4: Lavender — Peak: 231
  4: [
    { start: "2024-10-01", end: "2025-04-25", price: 92 },
    { start: "2025-04-26", end: "2025-05-29", price: 127 },
    { start: "2025-05-30", end: "2025-06-20", price: 162 },
    { start: "2025-06-21", end: "2025-07-11", price: 196 },
    { start: "2025-07-12", end: "2025-08-22", price: 231 },
    { start: "2025-08-23", end: "2025-09-12", price: 196 },
    { start: "2025-09-13", end: "2025-10-03", price: 162 },
    { start: "2025-10-04", end: "2025-10-31", price: 127 },
    { start: "2025-11-01", end: "2026-04-24", price: 92 },
  ],
  // 5: Sun — Peak: 182
  5: [
    { start: "2024-10-01", end: "2025-04-25", price: 73 },
    { start: "2025-04-26", end: "2025-05-29", price: 100 },
    { start: "2025-05-30", end: "2025-06-20", price: 127 },
    { start: "2025-06-21", end: "2025-07-11", price: 155 },
    { start: "2025-07-12", end: "2025-08-22", price: 182 },
    { start: "2025-08-23", end: "2025-09-12", price: 155 },
    { start: "2025-09-13", end: "2025-10-03", price: 127 },
    { start: "2025-10-04", end: "2025-10-31", price: 100 },
    { start: "2025-11-01", end: "2026-04-24", price: 73 },
  ],
  // 6: Sea — Peak: 110
  6: [
    { start: "2024-10-01", end: "2025-04-25", price: 44 },
    { start: "2025-04-26", end: "2025-05-29", price: 61 },
    { start: "2025-05-30", end: "2025-06-20", price: 77 },
    { start: "2025-06-21", end: "2025-07-11", price: 94 },
    { start: "2025-07-12", end: "2025-08-22", price: 110 },
    { start: "2025-08-23", end: "2025-09-12", price: 94 },
    { start: "2025-09-13", end: "2025-10-03", price: 77 },
    { start: "2025-10-04", end: "2025-10-31", price: 61 },
    { start: "2025-11-01", end: "2026-04-24", price: 44 },
  ],
  // 7: Beach — Peak: 132
  7: [
    { start: "2024-10-01", end: "2025-04-25", price: 53 },
    { start: "2025-04-26", end: "2025-05-29", price: 73 },
    { start: "2025-05-30", end: "2025-06-20", price: 92 },
    { start: "2025-06-21", end: "2025-07-11", price: 112 },
    { start: "2025-07-12", end: "2025-08-22", price: 132 },
    { start: "2025-08-23", end: "2025-09-12", price: 112 },
    { start: "2025-09-13", end: "2025-10-03", price: 92 },
    { start: "2025-10-04", end: "2025-10-31", price: 73 },
    { start: "2025-11-01", end: "2026-04-24", price: 53 },
  ],
  // 8: Nika — Peak: 200
  8: [
    { start: "2024-10-01", end: "2025-04-25", price: 90 },
    { start: "2025-04-26", end: "2025-06-06", price: 120 },
    { start: "2025-06-07", end: "2025-07-11", price: 150 },
    { start: "2025-07-12", end: "2025-08-22", price: 200 },
    { start: "2025-08-23", end: "2025-09-26", price: 150 },
    { start: "2025-09-27", end: "2025-10-24", price: 120 },
    { start: "2025-10-25", end: "2026-04-24", price: 90 },
  ],
  // 9: Lara — Peak: 100
  9: [
    { start: "2024-10-01", end: "2025-04-25", price: 45 },
    { start: "2025-04-26", end: "2025-06-06", price: 60 },
    { start: "2025-06-07", end: "2025-07-11", price: 75 },
    { start: "2025-07-12", end: "2025-08-22", price: 100 },
    { start: "2025-08-23", end: "2025-09-26", price: 75 },
    { start: "2025-09-27", end: "2025-10-24", price: 60 },
    { start: "2025-10-25", end: "2026-04-24", price: 45 },
  ],
};

// Keyed by apartment ID
export const APARTMENT_PRICING_CONFIGS: Record<number, ApartmentPricingConfig> = {
  // 1: Magical Oasis
  1: {
    cleaningFee: 50,
    defaultPrice: 187,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 2: Ismaelli Palace
  2: {
    cleaningFee: 80,
    defaultPrice: 440,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 3: Saint Roko
  3: {
    cleaningFee: 35,
    defaultPrice: 154,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 4: Lavender
  4: {
    cleaningFee: 80,
    defaultPrice: 231,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 5: Sun
  5: {
    cleaningFee: 70,
    defaultPrice: 182,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 6: Sea
  6: {
    cleaningFee: 35,
    defaultPrice: 110,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 7: Beach
  7: {
    cleaningFee: 50,
    defaultPrice: 132,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 8: Nika
  8: {
    cleaningFee: 80,
    defaultPrice: 200,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
  // 9: Lara
  9: {
    cleaningFee: 30,
    defaultPrice: 100,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 },
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60,
  },
};
