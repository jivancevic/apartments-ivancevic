import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseDate, PricePeriod } from "@/lib/pricing";

interface SeasonPriceGridProps {
  apartmentName: string;
}

const SEASONS = [
  { key: "seasons.off",  date: "2025-11-01", bg: "bg-blue-50",  text: "text-blue-600"  },
  { key: "seasons.low",  date: "2025-05-15", bg: "bg-green-50", text: "text-green-600" },
  { key: "seasons.high", date: "2025-07-01", bg: "bg-yellow-50", text: "text-amber-600" },
  { key: "seasons.peak", date: "2025-08-01", bg: "bg-orange-50", text: "text-orange-600" }
];

const SeasonPriceGrid = ({ apartmentName }: SeasonPriceGridProps) => {
  const { t } = useTranslation(); 
  /* 1️⃣ state for the pricing periods of the *current* apartment */
  const [pricePeriods, setPricePeriods] = useState<PricePeriod[] | null>(null); // null = loading

  /* 2️⃣ fetch once (whenever apartmentName changes) */
  useEffect(() => {
    let cancelled = false;

    async function fetchPricing() {
      try {
        const res = await fetch("/api/pricing-data");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        if (!cancelled) {
          const periods: Record<string, PricePeriod[]> =
            data.apartmentPricePeriods ?? {};
          setPricePeriods(periods[apartmentName] ?? []);
        }
      } catch (err) {
        console.error("Failed to load prices", err);
        if (!cancelled) setPricePeriods([]); // show “–”
      }
    }

    fetchPricing();
    return () => { cancelled = true; }; // guard against late setState
  }, [apartmentName]);

  /* still loading? */
  if (pricePeriods === null) {
    return <div className="text-sm italic">Loading prices…</div>;
  }

  /* helper */
  const priceForDate = (iso: string): number | "–" => {
    const d = parseDate(iso);
    const match = pricePeriods!.find(
      (p) => d >= parseDate(p.start) && d <= parseDate(p.end)
    );
    return match?.price ?? "–";
  };

  return (
    <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
      {SEASONS.map(({ key, date, bg, text }) => (
        <div key={key} className={`${bg} p-2 rounded text-center`}>
          {/* 🔑 translate the label */}
          <div className="font-medium text-gray-700">{t(key)}</div>
          <div className={`font-bold ${text}`}>€{priceForDate(date)}</div>
        </div>
      ))}
    </div>
  );
};

export default SeasonPriceGrid;
