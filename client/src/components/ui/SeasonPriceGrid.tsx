import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSeasonalPrices } from "@/lib/pricing";

interface SeasonPriceGridProps {
  apartmentName: string;
}

const SeasonPriceGrid = ({ apartmentName }: SeasonPriceGridProps) => {
  const { t } = useTranslation();
  const [seasonalPrices, setSeasonalPrices] = useState<Record<string, number>>({});
  
  // Mock apartment object for price calculations
  const mockApartment = {
    nameEn: apartmentName,
    id: 1,
    nameHr: apartmentName,
    descriptionEn: "",
    descriptionHr: "",
    images: [],
    location: "",
    basePeakPrice: 100,
    priceMultiplier: "1.0",
    cleaningFee: 40,
    maxGuests: 4,
    type: "apartment" as const,
    roomSizeM2: 50,
    bedrooms: [],
    bathrooms: 1,
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: false,
    hasSeaView: false,
    hasCityView: false,
    hasDishwasher: false,
    hasCoffeeMachine: false,
    hasHairDryer: false,
    hasMicrowave: false,
    hasSmoothieMaker: false,
    washingMachineType: "none" as const,
    parkingType: "none" as const,
    hasGarden: false,
    otherAmenities: null,
    bookingUrl: null,
    airbnbUrl: null,
    icalUrls: null
  };

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const prices = await getSeasonalPrices(mockApartment);
        setSeasonalPrices(prices);
      } catch (error) {
        console.error('Error loading seasonal prices:', error);
      }
    };
    
    loadPrices();
  }, [apartmentName]);

  return (
    <div className="mb-4 grid grid-cols-4 gap-2 text-xs">
      {SEASONS.map(({ label, date, bg, text }) => (
        <div key={label} className={`${bg} p-2 rounded text-center`}>
          <div className="font-medium text-gray-700">{label}</div>
          <div className={`font-bold ${text}`}>€{priceForDate(date)}</div>
        </div>
      ))}
    </div>
  );
};

export default SeasonPriceGrid;
