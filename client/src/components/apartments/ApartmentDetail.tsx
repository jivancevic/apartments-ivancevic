import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Apartment, Booking } from "@/types";
import ApartmentGallery from "./ApartmentGallery";
import { Calendar } from "@/components/ui/calendar";
import AmenityIcon from "@/components/ui/AmenityIcon";
import useLanguage from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface ApartmentDetailProps {
  apartment: Apartment;
}

const ApartmentDetail = ({ apartment }: ApartmentDetailProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  // Fetch bookings for this apartment
  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: [`/api/apartments/${apartment.id}/bookings`],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Gallery */}
      <div className="lg:col-span-2">
        <ApartmentGallery imagesPath={apartment.imagesPath} />
      </div>
      
      {/* Details */}
      <div>
        <h3 className="font-heading font-bold text-2xl mb-4">
          {currentLanguage === "en" ? apartment.nameEn : apartment.nameHr}
        </h3>
        <p className="mb-6">
          {currentLanguage === "en" ? apartment.descriptionEn : apartment.descriptionHr}
        </p>
        
        {/* Amenities */}
        <h4 className="font-heading font-semibold text-lg mb-3">
          {t("apartments.amenities")}
        </h4>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {apartment.hasWifi && (
            <div className="flex items-center">
              <AmenityIcon icon="wifi" className="text-primary mr-2" />
              <span>{t("amenities.wifi")}</span>
            </div>
          )}
          
          {apartment.hasKitchen && (
            <div className="flex items-center">
              <AmenityIcon icon="utensils" className="text-primary mr-2" />
              <span>{t("amenities.kitchen")}</span>
            </div>
          )}
          
          {apartment.hasAC && (
            <div className="flex items-center">
              <AmenityIcon icon="snowflake" className="text-primary mr-2" />
              <span>{t("amenities.ac")}</span>
            </div>
          )}
          
          {apartment.hasTV && (
            <div className="flex items-center">
              <AmenityIcon icon="tv" className="text-primary mr-2" />
              <span>{t("amenities.tv")}</span>
            </div>
          )}
          
          {apartment.hasBalcony && (
            <div className="flex items-center">
              <AmenityIcon icon="wind" className="text-primary mr-2" />
              <span>{t("amenities.balcony")}</span>
            </div>
          )}
          
          {apartment.hasSeaView && (
            <div className="flex items-center">
              <AmenityIcon icon="water" className="text-primary mr-2" />
              <span>{t("amenities.seaView")}</span>
            </div>
          )}
          
          {apartment.hasParking && (
            <div className="flex items-center">
              <AmenityIcon icon="parking" className="text-primary mr-2" />
              <span>{t("amenities.parking")}</span>
            </div>
          )}
          
          {apartment.hasGarden && (
            <div className="flex items-center">
              <AmenityIcon icon="tree" className="text-primary mr-2" />
              <span>{t("amenities.garden")}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <h4 className="font-heading font-semibold text-lg mb-3">
          {t("apartments.location")}
        </h4>
        <div className="relative h-80 bg-neutral rounded-lg overflow-hidden">
          <iframe
            title="Apartmani Ivančević Location"
            src={`${apartment.location}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        {/* Prices */}
        <div className="bg-neutral p-4 rounded-lg mb-6">
          <h4 className="font-heading font-semibold text-lg mb-2">
            {t("apartments.price")}
          </h4>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600 text-sm">{t("apartments.lowSeason")}</div>
              <div className="font-semibold">€{apartment.price}</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">{t("apartments.highSeason")}</div>
              <div className="font-semibold">€{apartment.priceHigh}</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">{t("apartments.peakSeason")}</div>
              <div className="font-semibold">€{apartment.pricePeak}</div>
            </div>
          </div>
        </div>
        
        {/* Calendar */}
        <h4 className="font-heading font-semibold text-lg mb-3">
          {t("apartments.availability")}
        </h4>
        
        {isLoading ? (
          <Skeleton className="h-32 w-full mb-6" />
        ) : (
          <div className="mb-6 bg-neutral p-4 rounded-lg">
            <Calendar bookings={bookings || []} />
          </div>
        )}
        
        <Link href={`/contact?apartment=${apartment.id}`}>
          <a className="block w-full bg-primary hover:bg-blue-600 text-white text-center font-medium py-3 px-6 rounded-md transition-colors">
            {t("apartments.sendInquiry")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ApartmentDetail;
