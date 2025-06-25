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
  // Ivancevic apartments rules
  "ivancevic-off": {
    name: "Off season",
    priceModifier: 0.0, // No modifier, base price already calculated
    stayLengthDiscounts: [
      { length: 7, name: "weekly", discount: -0.17 },
      { length: 30, name: "monthly", discount: -0.4 }
    ],
    minNights: 2,
    maxNights: 90
  },
  "ivancevic-low": {
    name: "Low season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 3, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.50 }
    ],
    minNights: 2,
    maxNights: 60
  },
  "ivancevic-mid": {
    name: "Mid season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 3, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.50 }
    ],
    minNights: 2,
    maxNights: 30
  },
  "ivancevic-high": {
    name: "High season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 4, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.50 }
    ],
    minNights: 3,
    maxNights: 30
  },
  "ivancevic-peak": {
    name: "Peak season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 5, discount: -0.17 },
      { length: 7, name: "weekly", discount: -0.22 },
      { length: 30, name: "monthly", discount: -0.50 }
    ],
    minNights: 3,
    maxNights: 21
  },
  // Giuliani apartments rules
  "giuliani-off": {
    name: "Off season",
    priceModifier: 0.0, // No modifier, base price already calculated
    stayLengthDiscounts: [],
    minNights: 2,
    maxNights: 90
  },
  "giuliani-low": {
    name: "Low season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 3, discount: -0.17 }
    ],
    minNights: 2,
    maxNights: 60
  },
  "giuliani-top": {
    name: "Top season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 4, discount: -0.17 }
    ],
    minNights: 2,
    maxNights: 30
  },
  "giuliani-full": {
    name: "Full season",
    priceModifier: 0.2, // 20% increase
    stayLengthDiscounts: [
      { length: 5, discount: -0.17 }
    ],
    minNights: 3,
    maxNights: 21
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

// Separate variables for rule set periods
export const APARTMENT_RULE_SET_PERIODS: Record<string, RuleSetPeriod[]> = {
  // Ivancevic apartments (Magical Oasis, Saint Roko, Ismaelli, Lavander, Sun, Beach, Sea)
  "Magical Oasis": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  "Saint Roko": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  "Ismaelli Palace": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  "Lavender": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  "Sun": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  "Beach": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  "Sea": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "ivancevic-off" },
    { start: "2025-04-26", end: "2025-05-29", ruleSet: "ivancevic-low" },
    { start: "2025-05-30", end: "2025-06-20", ruleSet: "ivancevic-mid" },
    { start: "2025-06-21", end: "2025-07-11", ruleSet: "ivancevic-high" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "ivancevic-peak" },
    { start: "2025-08-23", end: "2025-09-12", ruleSet: "ivancevic-high" },
    { start: "2025-09-13", end: "2025-10-03", ruleSet: "ivancevic-mid" },
    { start: "2025-10-04", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2026-04-24", ruleSet: "ivancevic-off" }
  ],
  // Giuliani apartments (Nika, Lara)
  "Nika": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "giuliani-off" },
    { start: "2025-04-26", end: "2025-06-06", ruleSet: "giuliani-low" },
    { start: "2025-06-07", end: "2025-07-11", ruleSet: "giuliani-top" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "giuliani-full" },
    { start: "2025-08-23", end: "2025-09-26", ruleSet: "giuliani-top" },
    { start: "2025-09-27", end: "2025-10-24", ruleSet: "giuliani-low" },
    { start: "2025-10-25", end: "2026-04-24", ruleSet: "giuliani-off" }
  ],
  "Lara": [
    { start: "2024-10-01", end: "2025-04-25", ruleSet: "giuliani-off" },
    { start: "2025-04-26", end: "2025-06-06", ruleSet: "giuliani-low" },
    { start: "2025-06-07", end: "2025-07-11", ruleSet: "giuliani-top" },
    { start: "2025-07-12", end: "2025-08-22", ruleSet: "giuliani-full" },
    { start: "2025-08-23", end: "2025-09-26", ruleSet: "giuliani-top" },
    { start: "2025-09-27", end: "2025-10-24", ruleSet: "giuliani-low" },
    { start: "2025-10-25", end: "2026-04-24", ruleSet: "giuliani-off" }
  ]
};

// Separate variables for price periods with calculated prices
export const APARTMENT_PRICE_PERIODS: Record<string, PricePeriod[]> = {
  // Ivancevic apartments - calculated from peak prices with specified percentages
  "Magical Oasis": [ // Peak: 187
    { start: "2024-10-01", end: "2025-04-25", price: 75 }, // 40% of 187
    { start: "2025-04-26", end: "2025-05-29", price: 103 }, // 55% of 187
    { start: "2025-05-30", end: "2025-06-20", price: 131 }, // 70% of 187
    { start: "2025-06-21", end: "2025-07-11", price: 159 }, // 85% of 187
    { start: "2025-07-12", end: "2025-08-22", price: 187 }, // 100% of 187
    { start: "2025-08-23", end: "2025-09-12", price: 159 }, // 85% of 187
    { start: "2025-09-13", end: "2025-10-03", price: 131 }, // 70% of 187
    { start: "2025-10-04", end: "2025-10-31", price: 103 }, // 55% of 187
    { start: "2025-11-01", end: "2026-04-24", price: 75 } // 40% of 187
  ],
  "Saint Roko": [ // Peak: 154
    { start: "2024-10-01", end: "2025-04-25", price: 62 }, // 40% of 154
    { start: "2025-04-26", end: "2025-05-29", price: 85 }, // 55% of 154
    { start: "2025-05-30", end: "2025-06-20", price: 108 }, // 70% of 154
    { start: "2025-06-21", end: "2025-07-11", price: 131 }, // 85% of 154
    { start: "2025-07-12", end: "2025-08-22", price: 154 }, // 100% of 154
    { start: "2025-08-23", end: "2025-09-12", price: 131 }, // 85% of 154
    { start: "2025-09-13", end: "2025-10-03", price: 108 }, // 70% of 154
    { start: "2025-10-04", end: "2025-10-31", price: 85 }, // 55% of 154
    { start: "2025-11-01", end: "2026-04-24", price: 62 } // 40% of 154
  ],
  "Ismaelli Palace": [ // Peak: 440
    { start: "2024-10-01", end: "2025-04-25", price: 176 }, // 40% of 440
    { start: "2025-04-26", end: "2025-05-29", price: 242 }, // 55% of 440
    { start: "2025-05-30", end: "2025-06-20", price: 308 }, // 70% of 440
    { start: "2025-06-21", end: "2025-07-11", price: 374 }, // 85% of 440
    { start: "2025-07-12", end: "2025-08-22", price: 440 }, // 100% of 440
    { start: "2025-08-23", end: "2025-09-12", price: 374 }, // 85% of 440
    { start: "2025-09-13", end: "2025-10-03", price: 308 }, // 70% of 440
    { start: "2025-10-04", end: "2025-10-31", price: 242 }, // 55% of 440
    { start: "2025-11-01", end: "2026-04-24", price: 176 } // 40% of 440
  ],
  "Lavender": [ // Peak: 231
    { start: "2024-10-01", end: "2025-04-25", price: 92 }, // 40% of 231
    { start: "2025-04-26", end: "2025-05-29", price: 127 }, // 55% of 231
    { start: "2025-05-30", end: "2025-06-20", price: 162 }, // 70% of 231
    { start: "2025-06-21", end: "2025-07-11", price: 196 }, // 85% of 231
    { start: "2025-07-12", end: "2025-08-22", price: 231 }, // 100% of 231
    { start: "2025-08-23", end: "2025-09-12", price: 196 }, // 85% of 231
    { start: "2025-09-13", end: "2025-10-03", price: 162 }, // 70% of 231
    { start: "2025-10-04", end: "2025-10-31", price: 127 }, // 55% of 231
    { start: "2025-11-01", end: "2026-04-24", price: 92 } // 40% of 231
  ],
  "Sun": [ // Peak: 182
    { start: "2024-10-01", end: "2025-04-25", price: 73 }, // 40% of 182
    { start: "2025-04-26", end: "2025-05-29", price: 100 }, // 55% of 182
    { start: "2025-05-30", end: "2025-06-20", price: 127 }, // 70% of 182
    { start: "2025-06-21", end: "2025-07-11", price: 155 }, // 85% of 182
    { start: "2025-07-12", end: "2025-08-22", price: 182 }, // 100% of 182
    { start: "2025-08-23", end: "2025-09-12", price: 155 }, // 85% of 182
    { start: "2025-09-13", end: "2025-10-03", price: 127 }, // 70% of 182
    { start: "2025-10-04", end: "2025-10-31", price: 100 }, // 55% of 182
    { start: "2025-11-01", end: "2026-04-24", price: 73 } // 40% of 182
  ],
  "Beach": [ // Peak: 132
    { start: "2024-10-01", end: "2025-04-25", price: 53 }, // 40% of 132
    { start: "2025-04-26", end: "2025-05-29", price: 73 }, // 55% of 132
    { start: "2025-05-30", end: "2025-06-20", price: 92 }, // 70% of 132
    { start: "2025-06-21", end: "2025-07-11", price: 112 }, // 85% of 132
    { start: "2025-07-12", end: "2025-08-22", price: 132 }, // 100% of 132
    { start: "2025-08-23", end: "2025-09-12", price: 112 }, // 85% of 132
    { start: "2025-09-13", end: "2025-10-03", price: 92 }, // 70% of 132
    { start: "2025-10-04", end: "2025-10-31", price: 73 }, // 55% of 132
    { start: "2025-11-01", end: "2026-04-24", price: 53 } // 40% of 132
  ],
  "Sea": [ // Peak: 110
    { start: "2024-10-01", end: "2025-04-25", price: 44 }, // 40% of 110
    { start: "2025-04-26", end: "2025-05-29", price: 61 }, // 55% of 110
    { start: "2025-05-30", end: "2025-06-20", price: 77 }, // 70% of 110
    { start: "2025-06-21", end: "2025-07-11", price: 94 }, // 85% of 110
    { start: "2025-07-12", end: "2025-08-22", price: 110 }, // 100% of 110
    { start: "2025-08-23", end: "2025-09-12", price: 94 }, // 85% of 110
    { start: "2025-09-13", end: "2025-10-03", price: 77 }, // 70% of 110
    { start: "2025-10-04", end: "2025-10-31", price: 61 }, // 55% of 110
    { start: "2025-11-01", end: "2026-04-24", price: 44 } // 40% of 110
  ],
  // Giuliani apartments - calculated from peak prices with specified percentages
  "Nika": [ // Peak: 200
    { start: "2024-10-01", end: "2025-04-25", price: 90 }, // 45% of 200
    { start: "2025-04-26", end: "2025-06-06", price: 120 }, // 60% of 200
    { start: "2025-06-07", end: "2025-07-11", price: 150 }, // 75% of 200
    { start: "2025-07-12", end: "2025-08-22", price: 200 }, // 100% of 200
    { start: "2025-08-23", end: "2025-09-26", price: 150 }, // 75% of 200
    { start: "2025-09-27", end: "2025-10-24", price: 120 }, // 60% of 200
    { start: "2025-10-25", end: "2026-04-24", price: 90 } // 45% of 200
  ],
  "Lara": [ // Peak: 100
    { start: "2024-10-01", end: "2025-04-25", price: 45 }, // 45% of 100
    { start: "2025-04-26", end: "2025-06-06", price: 60 }, // 60% of 100
    { start: "2025-06-07", end: "2025-07-11", price: 75 }, // 75% of 100
    { start: "2025-07-12", end: "2025-08-22", price: 100 }, // 100% of 100
    { start: "2025-08-23", end: "2025-09-26", price: 75 }, // 75% of 100
    { start: "2025-09-27", end: "2025-10-24", price: 60 }, // 60% of 100
    { start: "2025-10-25", end: "2026-04-24", price: 45 } // 45% of 100
  ]
};

// 4. Apartment Configuration (simplified - no periods)
export interface ApartmentPricingConfig {
  cleaningFee: number;
  defaultPrice: number;
  defaultStayLengthDiscounts: StayLengthDiscount[];
  defaultMinNights: number;
  defaultMaxNights: number;
}

// 5. Apartment-specific configurations with calculated cleaning fees
export const APARTMENT_PRICING_CONFIGS: Record<string, ApartmentPricingConfig> = {
  "Magical Oasis": {
    cleaningFee: 50,
    defaultPrice: 187, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Saint Roko": {
    cleaningFee: 35,
    defaultPrice: 154, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Ismaelli Palace": {
    cleaningFee: 80,
    defaultPrice: 440, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Lavender": {
    cleaningFee: 80,
    defaultPrice: 231, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Sun": {
    cleaningFee: 70,
    defaultPrice: 182, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Beach": {
    cleaningFee: 50,
    defaultPrice: 132, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Sea": {
    cleaningFee: 35,
    defaultPrice: 110, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Nika": {
    cleaningFee: 80,
    defaultPrice: 200, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Lara": {
    cleaningFee: 30,
    defaultPrice: 100, // Peak price
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  }
};

// Helper functions for the new pricing system

/**
 * Helper to create dates from string format "YYYY-MM-DD"
 */
export function parseDate(dateStr: string): Date {
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
    defaultMaxNights: 60
  };
}

/**
 * Get the base price for a specific date
 */
function getBasePriceForDate(apartment: Apartment, date: Date): number {
  const dateStr = formatDate(date);
  const pricePeriods = APARTMENT_PRICE_PERIODS[apartment.nameEn];
  
  if (!pricePeriods) {
    console.log("Price periods not found for apartment:",)
    const config = getApartmentPricingConfig(apartment);
    return config.defaultPrice;
  }
  
  // Find matching price period
  for (const period of pricePeriods) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return period.price;
    }
  }
  
  // Fallback to default price
  const config = getApartmentPricingConfig(apartment);
  return config.defaultPrice;
}

/**
 * Get the rule set for a specific date
 */
function getRuleSetForDate(apartment: Apartment, date: Date): RuleSet | null {
  const dateStr = formatDate(date);
  const ruleSetPeriods = APARTMENT_RULE_SET_PERIODS[apartment.nameEn];
  
  if (!ruleSetPeriods) {
    return null;
  }
  
  // Find matching rule set period
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
  // Get base price for this date
  const basePrice = getBasePriceForDate(apartment, date);
  console.log("Base price for", date, "is", basePrice)
  
  // Get rule set for this date
  const ruleSet = getRuleSetForDate(apartment, date);
  
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
  const ruleSet = getRuleSetForDate(apartment, startDate);
  
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
  const startRuleSet = getRuleSetForDate(apartment, start);
  const applicableDiscounts = startRuleSet?.stayLengthDiscounts || config.defaultStayLengthDiscounts;
  
  // Calculate stay length discount
  const stayLengthDiscountRate = getStayLengthDiscount(applicableDiscounts, totalNights);
  const stayLengthDiscountAmount = Math.round(subtotal * Math.abs(stayLengthDiscountRate));
  const discountedSubtotal = subtotal - stayLengthDiscountAmount;
  
  // Get cleaning fee
  const cleaningFee = getCleaningFee(apartment);
  
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
export function getSeasonalPrices(apartment: Apartment): Record<string, number> {
  console.log("Getting seasonal prices for", apartment.nameEn)
  
  // Sample dates for different periods to show price variations
  const sampleDates = {
    'Out of Season': new Date(2024, 10, 1), // November 1, 2024
    'Low Season': new Date(2025, 4, 1),     // May 1, 2025
    'High Season': new Date(2025, 6, 1),    // July 1, 2025
    'Peak Season': new Date(2025, 7, 15)    // August 15, 2025
  };
  
  const prices: Record<string, number> = {};
  
  for (const [seasonName, date] of Object.entries(sampleDates)) {
    prices[seasonName] = getBasePriceForDate(apartment, date);
  }
  
  return prices;
}

