/**
 * Server-side pricing data configuration
 * Contains all apartment pricing rules, periods, and configurations
 */

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

export const GLOBAL_RULE_SETS: Record<string, RuleSet> = {
  // Ivancevic apartments rule sets (9 periods)
  "ivancevic-off": {
    name: "Off Season",
    priceModifier: 0,
    stayLengthDiscounts: [
      { length: 7, discount: -0.1 },   // 10% weekly discount
      { length: 30, discount: -0.4 }   // 40% monthly discount
    ],
    minNights: 2,
    maxNights: 60
  },
  "ivancevic-low": {
    name: "Low Season", 
    priceModifier: 0.2,
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 }   // 5% weekly discount
    ],
    minNights: 3,
    maxNights: 30
  },
  "ivancevic-mid": {
    name: "Mid Season",
    priceModifier: 0.2,
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 }   // 5% weekly discount
    ],
    minNights: 3,
    maxNights: 21
  },
  "ivancevic-high": {
    name: "High Season",
    priceModifier: 0.2,
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 }   // 5% weekly discount
    ],
    minNights: 5,
    maxNights: 14
  },
  "ivancevic-peak": {
    name: "Peak Season",
    priceModifier: 0.2,
    stayLengthDiscounts: [],          // No discounts in peak season
    minNights: 7,
    maxNights: 14
  },

  // Giuliani apartments rule sets (4 periods)
  "giuliani-off": {
    name: "Off Season",
    priceModifier: 0,
    stayLengthDiscounts: [
      { length: 7, discount: -0.1 },   // 10% weekly discount
      { length: 30, discount: -0.4 }   // 40% monthly discount
    ],
    minNights: 2,
    maxNights: 60
  },
  "giuliani-low": {
    name: "Low Season",
    priceModifier: 0.2,
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 }   // 5% weekly discount
    ],
    minNights: 3,
    maxNights: 30
  },
  "giuliani-top": {
    name: "Top Season",
    priceModifier: 0.2,
    stayLengthDiscounts: [
      { length: 7, discount: -0.05 }   // 5% weekly discount
    ],
    minNights: 5,
    maxNights: 14
  },
  "giuliani-full": {
    name: "Full Season",
    priceModifier: 0.2,
    stayLengthDiscounts: [],          // No discounts in full season
    minNights: 7,
    maxNights: 14
  }
};

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

export const APARTMENT_RULE_SET_PERIODS: Record<string, RuleSetPeriod[]> = {
  // Ivancevic apartments (9-period schedule)
  "Magical Oasis": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],
  "Saint Roko": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],
  "Ismaelli": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],
  "Lavander": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],
  "Sun": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],
  "Beach": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],
  "Sea": [
    { start: "2025-01-01", end: "2025-04-30", ruleSet: "ivancevic-off" },
    { start: "2025-05-01", end: "2025-05-31", ruleSet: "ivancevic-low" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "ivancevic-mid" },
    { start: "2025-07-01", end: "2025-07-15", ruleSet: "ivancevic-high" },
    { start: "2025-07-16", end: "2025-08-31", ruleSet: "ivancevic-peak" },
    { start: "2025-09-01", end: "2025-09-15", ruleSet: "ivancevic-high" },
    { start: "2025-09-16", end: "2025-09-30", ruleSet: "ivancevic-mid" },
    { start: "2025-10-01", end: "2025-10-31", ruleSet: "ivancevic-low" },
    { start: "2025-11-01", end: "2025-12-31", ruleSet: "ivancevic-off" }
  ],

  // Giuliani apartments (4-period schedule)
  "Nika": [
    { start: "2025-01-01", end: "2025-05-31", ruleSet: "giuliani-off" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "giuliani-low" },
    { start: "2025-07-01", end: "2025-08-31", ruleSet: "giuliani-top" },
    { start: "2025-09-01", end: "2025-09-30", ruleSet: "giuliani-full" },
    { start: "2025-10-01", end: "2025-12-31", ruleSet: "giuliani-off" }
  ],
  "Lara": [
    { start: "2025-01-01", end: "2025-05-31", ruleSet: "giuliani-off" },
    { start: "2025-06-01", end: "2025-06-30", ruleSet: "giuliani-low" },
    { start: "2025-07-01", end: "2025-08-31", ruleSet: "giuliani-top" },
    { start: "2025-09-01", end: "2025-09-30", ruleSet: "giuliani-full" },
    { start: "2025-10-01", end: "2025-12-31", ruleSet: "giuliani-off" }
  ]
};

export const APARTMENT_PRICE_PERIODS: Record<string, PricePeriod[]> = {
  // Ivancevic apartments - calculated from peak season base prices
  "Magical Oasis": [
    { start: "2025-01-01", end: "2025-04-30", price: 75 },   // 40% of 187 = 75
    { start: "2025-05-01", end: "2025-05-31", price: 103 },  // 55% of 187 = 103
    { start: "2025-06-01", end: "2025-06-30", price: 131 },  // 70% of 187 = 131
    { start: "2025-07-01", end: "2025-07-15", price: 159 },  // 85% of 187 = 159
    { start: "2025-07-16", end: "2025-08-31", price: 187 },  // 100% peak = 187
    { start: "2025-09-01", end: "2025-09-15", price: 159 },  // 85% of 187 = 159
    { start: "2025-09-16", end: "2025-09-30", price: 131 },  // 70% of 187 = 131
    { start: "2025-10-01", end: "2025-10-31", price: 103 },  // 55% of 187 = 103
    { start: "2025-11-01", end: "2025-12-31", price: 75 }    // 40% of 187 = 75
  ],
  "Saint Roko": [
    { start: "2025-01-01", end: "2025-04-30", price: 48 },   // 40% of 120 = 48
    { start: "2025-05-01", end: "2025-05-31", price: 66 },   // 55% of 120 = 66
    { start: "2025-06-01", end: "2025-06-30", price: 84 },   // 70% of 120 = 84
    { start: "2025-07-01", end: "2025-07-15", price: 102 },  // 85% of 120 = 102
    { start: "2025-07-16", end: "2025-08-31", price: 120 },  // 100% peak = 120
    { start: "2025-09-01", end: "2025-09-15", price: 102 },  // 85% of 120 = 102
    { start: "2025-09-16", end: "2025-09-30", price: 84 },   // 70% of 120 = 84
    { start: "2025-10-01", end: "2025-10-31", price: 66 },   // 55% of 120 = 66
    { start: "2025-11-01", end: "2025-12-31", price: 48 }    // 40% of 120 = 48
  ],
  "Ismaelli": [
    { start: "2025-01-01", end: "2025-04-30", price: 36 },   // 40% of 90 = 36
    { start: "2025-05-01", end: "2025-05-31", price: 50 },   // 55% of 90 = 50
    { start: "2025-06-01", end: "2025-06-30", price: 63 },   // 70% of 90 = 63
    { start: "2025-07-01", end: "2025-07-15", price: 77 },   // 85% of 90 = 77
    { start: "2025-07-16", end: "2025-08-31", price: 90 },   // 100% peak = 90
    { start: "2025-09-01", end: "2025-09-15", price: 77 },   // 85% of 90 = 77
    { start: "2025-09-16", end: "2025-09-30", price: 63 },   // 70% of 90 = 63
    { start: "2025-10-01", end: "2025-10-31", price: 50 },   // 55% of 90 = 50
    { start: "2025-11-01", end: "2025-12-31", price: 36 }    // 40% of 90 = 36
  ],
  "Lavander": [
    { start: "2025-01-01", end: "2025-04-30", price: 48 },   // 40% of 120 = 48
    { start: "2025-05-01", end: "2025-05-31", price: 66 },   // 55% of 120 = 66
    { start: "2025-06-01", end: "2025-06-30", price: 84 },   // 70% of 120 = 84
    { start: "2025-07-01", end: "2025-07-15", price: 102 },  // 85% of 120 = 102
    { start: "2025-07-16", end: "2025-08-31", price: 120 },  // 100% peak = 120
    { start: "2025-09-01", end: "2025-09-15", price: 102 },  // 85% of 120 = 102
    { start: "2025-09-16", end: "2025-09-30", price: 84 },   // 70% of 120 = 84
    { start: "2025-10-01", end: "2025-10-31", price: 66 },   // 55% of 120 = 66
    { start: "2025-11-01", end: "2025-12-31", price: 48 }    // 40% of 120 = 48
  ],
  "Sun": [
    { start: "2025-01-01", end: "2025-04-30", price: 44 },   // 40% of 110 = 44
    { start: "2025-05-01", end: "2025-05-31", price: 61 },   // 55% of 110 = 61
    { start: "2025-06-01", end: "2025-06-30", price: 77 },   // 70% of 110 = 77
    { start: "2025-07-01", end: "2025-07-15", price: 94 },   // 85% of 110 = 94
    { start: "2025-07-16", end: "2025-08-31", price: 110 },  // 100% peak = 110
    { start: "2025-09-01", end: "2025-09-15", price: 94 },   // 85% of 110 = 94
    { start: "2025-09-16", end: "2025-09-30", price: 77 },   // 70% of 110 = 77
    { start: "2025-10-01", end: "2025-10-31", price: 61 },   // 55% of 110 = 61
    { start: "2025-11-01", end: "2025-12-31", price: 44 }    // 40% of 110 = 44
  ],
  "Beach": [
    { start: "2025-01-01", end: "2025-04-30", price: 44 },   // 40% of 110 = 44
    { start: "2025-05-01", end: "2025-05-31", price: 61 },   // 55% of 110 = 61
    { start: "2025-06-01", end: "2025-06-30", price: 77 },   // 70% of 110 = 77
    { start: "2025-07-01", end: "2025-07-15", price: 94 },   // 85% of 110 = 94
    { start: "2025-07-16", end: "2025-08-31", price: 110 },  // 100% peak = 110
    { start: "2025-09-01", end: "2025-09-15", price: 94 },   // 85% of 110 = 94
    { start: "2025-09-16", end: "2025-09-30", price: 77 },   // 70% of 110 = 77
    { start: "2025-10-01", end: "2025-10-31", price: 61 },   // 55% of 110 = 61
    { start: "2025-11-01", end: "2025-12-31", price: 44 }    // 40% of 110 = 44
  ],
  "Sea": [
    { start: "2025-01-01", end: "2025-04-30", price: 60 },   // 40% of 150 = 60
    { start: "2025-05-01", end: "2025-05-31", price: 83 },   // 55% of 150 = 83
    { start: "2025-06-01", end: "2025-06-30", price: 105 },  // 70% of 150 = 105
    { start: "2025-07-01", end: "2025-07-15", price: 128 },  // 85% of 150 = 128
    { start: "2025-07-16", end: "2025-08-31", price: 150 },  // 100% peak = 150
    { start: "2025-09-01", end: "2025-09-15", price: 128 },  // 85% of 150 = 128
    { start: "2025-09-16", end: "2025-09-30", price: 105 },  // 70% of 150 = 105
    { start: "2025-10-01", end: "2025-10-31", price: 83 },   // 55% of 150 = 83
    { start: "2025-11-01", end: "2025-12-31", price: 60 }    // 40% of 150 = 60
  ],

  // Giuliani apartments - calculated from different percentage rates
  "Nika": [
    { start: "2025-01-01", end: "2025-05-31", price: 90 },   // 45% of 200 = 90
    { start: "2025-06-01", end: "2025-06-30", price: 120 },  // 60% of 200 = 120
    { start: "2025-07-01", end: "2025-08-31", price: 150 },  // 75% of 200 = 150
    { start: "2025-09-01", end: "2025-09-30", price: 200 },  // 100% full = 200
    { start: "2025-10-01", end: "2025-12-31", price: 90 }    // 45% of 200 = 90
  ],
  "Lara": [
    { start: "2025-01-01", end: "2025-05-31", price: 90 },   // 45% of 200 = 90
    { start: "2025-06-01", end: "2025-06-30", price: 120 },  // 60% of 200 = 120
    { start: "2025-07-01", end: "2025-08-31", price: 150 },  // 75% of 200 = 150
    { start: "2025-09-01", end: "2025-09-30", price: 200 },  // 100% full = 200
    { start: "2025-10-01", end: "2025-12-31", price: 90 }    // 45% of 200 = 90
  ]
};

export interface ApartmentPricingConfig {
  cleaningFee: number;
  defaultPrice: number;
  defaultStayLengthDiscounts: StayLengthDiscount[];
  defaultMinNights: number;
  defaultMaxNights: number;
}

export const APARTMENT_PRICING_CONFIGS: Record<string, ApartmentPricingConfig> = {
  "Magical Oasis": {
    cleaningFee: 50,
    defaultPrice: 187,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Saint Roko": {
    cleaningFee: 40,
    defaultPrice: 120,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Ismaelli": {
    cleaningFee: 35,
    defaultPrice: 90,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Lavander": {
    cleaningFee: 40,
    defaultPrice: 120,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Sun": {
    cleaningFee: 40,
    defaultPrice: 110,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Beach": {
    cleaningFee: 40,
    defaultPrice: 110,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Sea": {
    cleaningFee: 45,
    defaultPrice: 150,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Nika": {
    cleaningFee: 60,
    defaultPrice: 200,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  },
  "Lara": {
    cleaningFee: 60,
    defaultPrice: 200,
    defaultStayLengthDiscounts: [
      { length: 7, discount: -0.1 },
      { length: 30, discount: -0.4 }
    ],
    defaultMinNights: 2,
    defaultMaxNights: 60
  }
};