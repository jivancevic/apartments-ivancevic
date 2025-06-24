
import { calculateNightlyPrice, calculateStayPrice, getCleaningFee, getStayLimits } from './client/src/lib/pricing.ts';

// Mock apartment data for testing
const testApartment = {
  id: 1,
  nameEn: 'Magical Oasis',
  nameHr: 'Magična Oaza',
  cleaningFee: 50,
  basePeakPrice: 187
};

const giulianiApartment = {
  id: 9,
  nameEn: 'Nika',
  nameHr: 'Nika',
  cleaningFee: 60,
  basePeakPrice: 200
};

// Test dates for different seasons
const offSeasonDate = new Date('2025-01-15'); // Off season
const lowSeasonDate = new Date('2025-05-15'); // Low season  
const midSeasonDate = new Date('2025-06-10'); // Mid season
const highSeasonDate = new Date('2025-07-01'); // High season
const peakSeasonDate = new Date('2025-08-01'); // Peak season

console.log('=== Testing Ivancevic Apartment (Magical Oasis) ===');
console.log('Off season (Jan 15):', calculateNightlyPrice(testApartment, offSeasonDate));
console.log('Low season (May 15):', calculateNightlyPrice(testApartment, lowSeasonDate));
console.log('Mid season (Jun 10):', calculateNightlyPrice(testApartment, midSeasonDate));
console.log('High season (Jul 1):', calculateNightlyPrice(testApartment, highSeasonDate));
console.log('Peak season (Aug 1):', calculateNightlyPrice(testApartment, peakSeasonDate));

console.log('
=== Testing Giuliani Apartment (Nika) ===');
console.log('Off season (Jan 15):', calculateNightlyPrice(giulianiApartment, offSeasonDate));
console.log('Low season (May 15):', calculateNightlyPrice(giulianiApartment, lowSeasonDate));
console.log('Top season (Jul 1):', calculateNightlyPrice(giulianiApartment, highSeasonDate));
console.log('Full season (Aug 1):', calculateNightlyPrice(giulianiApartment, peakSeasonDate));

// Test stay price calculation with discounts
const startDate = new Date('2025-08-01');
const endDate = new Date('2025-08-08'); // 7 nights
console.log('
=== Testing 7-night stay in peak season ===');
const stayPrice = calculateStayPrice(testApartment, startDate, endDate);
console.log('Subtotal:', stayPrice.subtotal);
console.log('Stay length discount:', stayPrice.stayLengthDiscount);
console.log('Discounted subtotal:', stayPrice.discountedSubtotal);
console.log('Cleaning fee:', stayPrice.cleaningFee);
console.log('Total:', stayPrice.total);
console.log('Average per night:', stayPrice.averagePerNight);
if (stayPrice.discountInfo) {
  console.log('Discount info:', stayPrice.discountInfo);
}

console.log('
=== Testing cleaning fees ===');
console.log('Magical Oasis cleaning fee:', getCleaningFee(testApartment));
console.log('Nika cleaning fee:', getCleaningFee(giulianiApartment));

console.log('
=== Testing stay limits ===');
const limits = getStayLimits(testApartment, peakSeasonDate);
console.log('Peak season limits:', limits);
