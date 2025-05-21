import { Apartment } from '@shared/schema';

// Season types
export enum SeasonType {
  OUT_OF_SEASON = 'OUT_OF_SEASON',
  LOW_SEASON = 'LOW_SEASON',
  HIGH_SEASON = 'HIGH_SEASON',
  PEAK_SEASON = 'PEAK_SEASON'
}

// Pricing multipliers by apartment type
export const APARTMENT_MULTIPLIERS: Record<string, number> = {
  'Sea': 1.00,
  'Beach': 1.25,
  'Sun': 1.75,
  'Lavander': 2.20,
  'Saint Roko': 1.50,
  'Magical Oasis': 1.90,
  'Ismaelli Palace': 4.00,
};

// Cleaning fees by apartment type
export const CLEANING_FEES: Record<string, number> = {
  'Sea': 40,
  'Beach': 50,
  'Sun': 70,
  'Lavander': 80,
  'Saint Roko': 40,
  'Magical Oasis': 50,
  'Ismaelli Palace': 80,
};

// Default season rate multipliers (% of peak price)
export const DEFAULT_SEASON_RATE_MULTIPLIERS: Record<SeasonType, number> = {
  [SeasonType.OUT_OF_SEASON]: 0.45, // 45% of peak price
  [SeasonType.LOW_SEASON]: 0.60,    // 60% of peak price
  [SeasonType.HIGH_SEASON]: 0.80,   // 80% of peak price
  [SeasonType.PEAK_SEASON]: 1.00,   // 100% of peak price
};

// Custom apartment pricing configurations
export interface ApartmentPricingConfig {
  basePeakPrice?: number;
  seasonRateMultipliers?: Partial<Record<SeasonType, number>>;
  cleaningFee?: number;
}

// Apartment-specific pricing overrides
export const APARTMENT_PRICE_OVERRIDES: Record<string, ApartmentPricingConfig> = {
  // Lara has €100 base price and 75% ratio for HIGH_SEASON
  'Lara': {
    basePeakPrice: 100,
    seasonRateMultipliers: {
      [SeasonType.HIGH_SEASON]: 0.75
    }
  },
  // Nika has €200 base price and 75% ratio for HIGH_SEASON
  'Nika': {
    basePeakPrice: 200,
    seasonRateMultipliers: {
      [SeasonType.HIGH_SEASON]: 0.75
    }
  }
};

// Season date ranges for 2025
type DateRange = {
  start: Date;
  end: Date;
  type: SeasonType;
};

// Helper to create dates in a more readable format (MM/DD/YYYY)
const createDate = (day: number, month: number, year: number) => new Date(year, month - 1, day);

// Define season ranges
export const SEASON_RANGES: DateRange[] = [
  // 2024-2025 Out of Season (assuming we're continuing the pattern from previous year)
  {
    start: createDate(1, 10, 2024),
    end: createDate(25, 4, 2025),
    type: SeasonType.OUT_OF_SEASON
  },
  // 2025 Low Season (Spring)
  {
    start: createDate(26, 4, 2025),
    end: createDate(6, 6, 2025),
    type: SeasonType.LOW_SEASON
  },
  // 2025 High Season (Early Summer)
  {
    start: createDate(7, 6, 2025),
    end: createDate(11, 7, 2025),
    type: SeasonType.HIGH_SEASON
  },
  // 2025 Peak Season (Mid Summer)
  {
    start: createDate(12, 7, 2025),
    end: createDate(22, 8, 2025),
    type: SeasonType.PEAK_SEASON
  },
  // 2025 High Season (Late Summer)
  {
    start: createDate(23, 8, 2025),
    end: createDate(26, 9, 2025),
    type: SeasonType.HIGH_SEASON
  },
  // 2025 Low Season (Fall)
  {
    start: createDate(27, 9, 2025),
    end: createDate(24, 10, 2025),
    type: SeasonType.LOW_SEASON
  },
  // 2025-2026 Out of Season
  {
    start: createDate(25, 10, 2025),
    end: createDate(24, 4, 2026),
    type: SeasonType.OUT_OF_SEASON
  }
];

/**
 * Determines the season type for a given date
 */
export function getSeasonType(date: Date): SeasonType {
  // Normalize the date to midnight for consistent comparison
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  
  for (const range of SEASON_RANGES) {
    const rangeStart = new Date(range.start);
    rangeStart.setHours(0, 0, 0, 0);
    
    const rangeEnd = new Date(range.end);
    rangeEnd.setHours(23, 59, 59, 999);
    
    if (normalizedDate >= rangeStart && normalizedDate <= rangeEnd) {
      return range.type;
    }
  }
  
  // Default to out of season if no matching range is found
  return SeasonType.OUT_OF_SEASON;
}

/**
 * Gets the display name for a season type
 */
export function getSeasonName(seasonType: SeasonType): string {
  switch (seasonType) {
    case SeasonType.OUT_OF_SEASON:
      return 'Out of Season';
    case SeasonType.LOW_SEASON:
      return 'Low Season';
    case SeasonType.HIGH_SEASON:
      return 'High Season';
    case SeasonType.PEAK_SEASON:
      return 'Peak Season';
    default:
      return 'Unknown Season';
  }
}

/**
 * Get apartment-specific pricing configuration including any custom overrides
 */
export function getApartmentPricingConfig(apartment: Apartment): {
  basePeakPrice: number;
  seasonRateMultipliers: Record<SeasonType, number>;
  cleaningFee: number;
} {
  // Start with default price multipliers
  const seasonRateMultipliers = { ...DEFAULT_SEASON_RATE_MULTIPLIERS };
  
  // Check for apartment-specific overrides
  const overrides = APARTMENT_PRICE_OVERRIDES[apartment.nameEn];
  
  // Base values (from schema or defaults)
  let basePeakPrice = apartment.basePeakPrice || 110;
  let cleaningFee = apartment.cleaningFee || CLEANING_FEES[apartment.nameEn] || 40;
  
  // Apply overrides if they exist
  if (overrides) {
    // Override base peak price if specified
    if (overrides.basePeakPrice !== undefined) {
      basePeakPrice = overrides.basePeakPrice;
    }
    
    // Override season multipliers if specified
    if (overrides.seasonRateMultipliers) {
      Object.assign(seasonRateMultipliers, overrides.seasonRateMultipliers);
    }
    
    // Override cleaning fee if specified
    if (overrides.cleaningFee !== undefined) {
      cleaningFee = overrides.cleaningFee;
    }
  }
  
  return {
    basePeakPrice,
    seasonRateMultipliers,
    cleaningFee
  };
}

/**
 * Calculates the price for an apartment on a given date
 */
export function calculateNightlyPrice(apartment: Apartment, date: Date): number {
  // Get the season type for this date
  const seasonType = getSeasonType(date);
  
  // Get apartment-specific pricing configuration with any overrides
  const config = getApartmentPricingConfig(apartment);
  
  // Get the season rate multiplier for this apartment (with any overrides applied)
  const seasonRateMultiplier = config.seasonRateMultipliers[seasonType];
  
  // Get the apartment's multiplier (from schema if available, or from constants)
  // Use a direct conversion to number to avoid CSP issues
  const apartmentMultiplier = apartment.priceMultiplier ? Number(apartment.priceMultiplier) : 
    (APARTMENT_MULTIPLIERS[apartment.nameEn] || 1.0);
  
  // Calculate price: basePeakPrice * seasonRateMultiplier * apartmentMultiplier
  const price = config.basePeakPrice * seasonRateMultiplier * apartmentMultiplier;
  
  // Round to nearest integer
  return Math.round(price);
}

/**
 * Gets cleaning fee for an apartment
 */
export function getCleaningFee(apartment: Apartment): number {
  return apartment.cleaningFee || CLEANING_FEES[apartment.nameEn] || 40;
}

/**
 * Calculates total price for a stay
 */
export interface PriceSummary {
  totalNights: number;
  nightlyPrices: {date: Date, price: number}[];
  subtotal: number; 
  cleaningFee: number;
  total: number;
  averagePerNight: number;
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
      cleaningFee: 0,
      total: 0,
      averagePerNight: 0
    };
  }
  
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
  
  // Get cleaning fee
  const cleaningFee = getCleaningFee(apartment);
  
  // Calculate total
  const total = subtotal + cleaningFee;
  
  // Calculate average price per night
  const averagePerNight = totalNights > 0 ? Math.round(subtotal / totalNights) : 0;
  
  return {
    totalNights,
    nightlyPrices,
    subtotal,
    cleaningFee,
    total,
    averagePerNight
  };
}

/**
 * Gets pricing table for all seasons
 */
export function getSeasonalPrices(apartment: Apartment): Record<SeasonType, number> {
  // Sample dates for each season (we just need a date within the range)
  const seasonSampleDates: Record<SeasonType, Date> = {
    [SeasonType.OUT_OF_SEASON]: createDate(1, 11, 2024),
    [SeasonType.LOW_SEASON]: createDate(1, 5, 2025),
    [SeasonType.HIGH_SEASON]: createDate(1, 7, 2025),
    [SeasonType.PEAK_SEASON]: createDate(1, 8, 2025)
  };
  
  // Calculate prices for each season
  return {
    [SeasonType.OUT_OF_SEASON]: calculateNightlyPrice(apartment, seasonSampleDates[SeasonType.OUT_OF_SEASON]),
    [SeasonType.LOW_SEASON]: calculateNightlyPrice(apartment, seasonSampleDates[SeasonType.LOW_SEASON]),
    [SeasonType.HIGH_SEASON]: calculateNightlyPrice(apartment, seasonSampleDates[SeasonType.HIGH_SEASON]),
    [SeasonType.PEAK_SEASON]: calculateNightlyPrice(apartment, seasonSampleDates[SeasonType.PEAK_SEASON])
  };
}