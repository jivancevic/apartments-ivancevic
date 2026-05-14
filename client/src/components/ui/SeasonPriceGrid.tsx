import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface SeasonPriceGridProps {
  apartmentId: number;
}

const SEASONS = [
  { key: "seasons.off", apiKey: "Off Season", bg: "bg-blue-50", text: "text-blue-600" },
  { key: "seasons.low", apiKey: "Low Season", bg: "bg-green-50", text: "text-green-600" },
  { key: "seasons.high", apiKey: "High Season", bg: "bg-yellow-50", text: "text-amber-600" },
  { key: "seasons.peak", apiKey: "Peak Season", bg: "bg-orange-50", text: "text-orange-600" },
];

const SeasonPriceGrid = ({ apartmentId }: SeasonPriceGridProps) => {
  const { t } = useTranslation();
  const { data: prices } = useQuery<Record<string, number>>({
    queryKey: [`/api/pricing/seasonal/${apartmentId}`],
  });

  return (
    <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
      {SEASONS.map(({ key, apiKey, bg, text }) => (
        <div key={key} className={`${bg} p-2 rounded text-center`}>
          <div className="font-medium text-gray-700">{t(key)}</div>
          <div className={`font-bold ${text}`}>
            {prices ? `€${prices[apiKey] ?? "–"}` : "…"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeasonPriceGrid;
