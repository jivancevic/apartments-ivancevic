export async function getPricingData() {
  const {
    GLOBAL_RULE_SETS,
    APARTMENT_RULE_SET_PERIODS,
    APARTMENT_PRICE_PERIODS,
    APARTMENT_PRICING_CONFIGS,
  } = await import("../data/pricing");
  return {
    globalRuleSets: GLOBAL_RULE_SETS,
    apartmentRuleSetPeriods: APARTMENT_RULE_SET_PERIODS,
    apartmentPricePeriods: APARTMENT_PRICE_PERIODS,
    apartmentPricingConfigs: APARTMENT_PRICING_CONFIGS,
  };
}
