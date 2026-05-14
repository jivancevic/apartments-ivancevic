import type { PriceSummary } from "../types";
import {
  GLOBAL_RULE_SETS,
  APARTMENT_RULE_SET_PERIODS,
  APARTMENT_PRICE_PERIODS,
  APARTMENT_PRICING_CONFIGS,
  type RuleSet,
  type ApartmentPricingConfig,
} from "../data/pricing";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getConfig(apartmentId: number): ApartmentPricingConfig {
  return (
    APARTMENT_PRICING_CONFIGS[apartmentId] ?? {
      cleaningFee: 40,
      defaultPrice: 70,
      defaultStayLengthDiscounts: [
        { length: 7, discount: -0.1 },
        { length: 30, discount: -0.4 },
      ],
      defaultMinNights: 2,
      defaultMaxNights: 60,
    }
  );
}

function getRuleSetForDate(apartmentId: number, date: Date): RuleSet | null {
  const dateStr = formatDate(date);
  const periods = APARTMENT_RULE_SET_PERIODS[apartmentId];
  if (!periods) return null;
  for (const period of periods) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return GLOBAL_RULE_SETS[period.ruleSet] ?? null;
    }
  }
  return null;
}

function getBasePriceForDate(apartmentId: number, date: Date): number {
  const dateStr = formatDate(date);
  const periods = APARTMENT_PRICE_PERIODS[apartmentId];
  if (!periods) return getConfig(apartmentId).defaultPrice;
  for (const period of periods) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return period.price;
    }
  }
  return getConfig(apartmentId).defaultPrice;
}

function getNightlyPrice(apartmentId: number, date: Date): number {
  const basePrice = getBasePriceForDate(apartmentId, date);
  const ruleSet = getRuleSetForDate(apartmentId, date);
  if (!ruleSet) return basePrice;
  return Math.round(basePrice * (1 + ruleSet.priceModifier));
}

function getStayLengthDiscount(
  discounts: Array<{ length: number; discount: number }>,
  nights: number
): number {
  let applicable = 0;
  for (const d of discounts) {
    if (nights >= d.length) applicable = d.discount;
  }
  return applicable;
}

export function calculateStayPrice(
  apartmentId: number,
  checkIn: Date,
  checkOut: Date
): PriceSummary {
  const start = new Date(checkIn);
  start.setHours(0, 0, 0, 0);
  const end = new Date(checkOut);
  end.setHours(0, 0, 0, 0);

  const totalNights = Math.round(
    Math.abs((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
  );

  if (totalNights <= 0) {
    return {
      totalNights: 0,
      nightlyPrices: [],
      subtotal: 0,
      stayLengthDiscount: 0,
      discountedSubtotal: 0,
      cleaningFee: 0,
      total: 0,
      averagePerNight: 0,
    };
  }

  const config = getConfig(apartmentId);
  const nightlyPrices: Array<{ date: string; price: number }> = [];
  const cursor = new Date(start);

  for (let i = 0; i < totalNights; i++) {
    nightlyPrices.push({
      date: formatDate(cursor),
      price: getNightlyPrice(apartmentId, cursor),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const subtotal = nightlyPrices.reduce((sum, n) => sum + n.price, 0);

  const startRuleSet = getRuleSetForDate(apartmentId, start);
  const applicableDiscounts =
    startRuleSet?.stayLengthDiscounts ?? config.defaultStayLengthDiscounts;
  const discountRate = getStayLengthDiscount(applicableDiscounts, totalNights);
  const stayLengthDiscount = Math.round(subtotal * Math.abs(discountRate));
  const discountedSubtotal = subtotal - stayLengthDiscount;
  const { cleaningFee } = config;
  const total = discountedSubtotal + cleaningFee;
  const averagePerNight =
    totalNights > 0 ? Math.round(discountedSubtotal / totalNights) : 0;

  let discountInfo: PriceSummary["discountInfo"];
  if (stayLengthDiscount > 0) {
    const applied = applicableDiscounts.find(
      (d) => totalNights >= d.length && d.discount === discountRate
    );
    discountInfo = {
      type: (applied as any)?.name ?? "Long-term stay discount",
      percentage: Math.round(Math.abs(discountRate) * 100),
      amount: stayLengthDiscount,
    };
  }

  return {
    totalNights,
    nightlyPrices,
    subtotal,
    stayLengthDiscount,
    discountedSubtotal,
    cleaningFee,
    total,
    averagePerNight,
    discountInfo,
  };
}

export function getStayLimits(
  apartmentId: number,
  checkIn: Date
): { minNights: number; maxNights: number } {
  const ruleSet = getRuleSetForDate(apartmentId, checkIn);
  const config = getConfig(apartmentId);
  if (ruleSet?.minNights !== undefined && ruleSet?.maxNights !== undefined) {
    return { minNights: ruleSet.minNights, maxNights: ruleSet.maxNights };
  }
  return {
    minNights: config.defaultMinNights,
    maxNights: config.defaultMaxNights,
  };
}

export function getSeasonalPrices(
  apartmentId: number
): Record<string, number> {
  return {
    "Off Season": getBasePriceForDate(apartmentId, new Date(2025, 0, 15)),
    "Low Season": getBasePriceForDate(apartmentId, new Date(2025, 4, 1)),
    "High Season": getBasePriceForDate(apartmentId, new Date(2025, 6, 1)),
    "Peak Season": getBasePriceForDate(apartmentId, new Date(2025, 7, 15)),
  };
}
