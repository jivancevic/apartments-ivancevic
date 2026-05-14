import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Apartment } from "@/types";
import ApartmentDetail from "./ApartmentDetail";
import { localize } from "@/lib/localize";
import { useLocation } from "wouter";

interface SelectedDates {
  checkIn?: Date;
  checkOut?: Date;
}

interface ApartmentTabsProps {
  apartments: Apartment[];
  activeSlug?: string;
}

const ApartmentTabs = ({ apartments, activeSlug }: ApartmentTabsProps) => {
  const { i18n } = useTranslation();
  const [, navigate] = useLocation();

  // Track selected dates from URL parameters
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({});

  // Default to first apartment if none is specified in the URL
  const [activeTab, setActiveTab] = useState<number>(apartments[0]?.id || 0);

  // Parse date parameters from URL and handle route slug
  useEffect(() => {
    const parseDateParam = (s: string | null): Date | undefined => {
      if (!s) return undefined;
      const d = s.length === 10 ? new Date(s + "T00:00:00") : new Date(s);
      return isNaN(d.getTime()) ? undefined : d;
    };

    if (activeSlug) {
      const match = apartments.find((a) => a.slug === activeSlug);
      if (match) setActiveTab(match.id);
    }

    const params = new URLSearchParams(window.location.search);
    setSelectedDates({
      checkIn: parseDateParam(params.get("checkIn")),
      checkOut: parseDateParam(params.get("checkOut")),
    });
  }, [apartments, activeSlug]);

  const handleTabClick = (apartment: Apartment) => {
    setActiveTab(apartment.id);
    navigate(`/apartments/${apartment.slug}`);
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="overflow-x-auto mb-4">
        <div className="inline-flex min-w-full md:justify-center space-x-2 tabs-container">
          {apartments.map((apartment) => (
            <button
              key={apartment.id}
              className={`tab-button py-2 px-4 border-b-2 whitespace-nowrap font-medium ${
                activeTab === apartment.id
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-primary transition-colors"
              }`}
              onClick={() => handleTabClick(apartment)}
            >
              <div className="flex flex-col items-center">
                {localize(apartment, "name", i18n.language)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Apartment Details: render only active apartment to avoid preloading all images */}
      <div className="tab-content-container">
        {(() => {
          const activeApartment =
            apartments.find((a) => a.id === activeTab) || apartments[0];
          if (!activeApartment) return null;
          return (
            <div key={activeApartment.id}>
              <ApartmentDetail
                apartment={activeApartment}
                selectedDates={selectedDates}
              />
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ApartmentTabs;
