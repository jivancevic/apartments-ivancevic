import {
  APARTMENT_PRICE_PERIODS,
  parseDate
} from "@/lib/pricing";            // adjust path if necessary

interface SeasonPriceGridProps {
  apartmentName: string;
}

/** fixed sample dates & colour-classes for every season */
const SEASONS = [
  {
    label: "Out of Season",
    date: "2025-11-01",               // 1 Nov 2025
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    label: "Low Season",
    date: "2025-05-15",               // 15 May 2025
    bg: "bg-green-50",
    text: "text-green-600",
  },
  {
    label: "High Season",
    date: "2025-07-01",               // 1 Jul 2025
    bg: "bg-yellow-50",
    text: "text-amber-600",
  },
  {
    label: "Peak Season",
    date: "2025-08-01",               // 1 Aug 2025
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
];

const SeasonPriceGrid = ({ apartmentName }: SeasonPriceGridProps) => {
  const pricePeriods = APARTMENT_PRICE_PERIODS[apartmentName] ?? [];

  /** helper: find the nightly price valid on a specific date string */
  const priceForDate = (isoDate: string): number | "–" => {
    const d = parseDate(isoDate);
    const pp = pricePeriods.find(
      (p) => d >= parseDate(p.start) && d <= parseDate(p.end)
    );
    return pp?.price ?? "–";
  };

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
