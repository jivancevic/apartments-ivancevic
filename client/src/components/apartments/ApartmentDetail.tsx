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
        <ApartmentGallery images={apartment.images} />
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
        
        {/* Booking Links */}
        <div className="flex gap-3 mb-6">
          {apartment.bookingUrl && (
            <a 
              href={apartment.bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-center font-medium py-3 px-4 rounded-md transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.3-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
              </svg>
              Booking.com
            </a>
          )}
          
          {apartment.airbnbUrl && (
            <a 
              href={apartment.airbnbUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white text-center font-medium py-3 px-4 rounded-md transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 14.4v.5c0 2.7-2.3 5-5.1 5-1.4 0-2.7-.5-3.6-1.4l-8.4-7.8c-.7-.7-1.1-1.5-1.1-2.4 0-1.8 1.5-3.2 3.3-3.2.9 0 1.7.4 2.4 1l3.5 3.2c.8.8 2 1.2 3.1 1.2 1.1 0 2.2-.4 3-1.1.8-.7 1.2-1.7 1.2-2.7s-.4-1.9-1.2-2.7L8.4 1.3c-.6-.5-1.3-.8-2.1-.8-1.8 0-3.2 1.4-3.3 3.1 0 .9.4 1.7 1 2.3L15.2 17c.6.5 1.3.8 2.1.8 1.6 0 2.9-1.3 2.9-2.9v-.5H13c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4v-2h11.9c.4 0 .8.1 1.1.4.3.2.5.7.5 1.1v1.5z"/>
              </svg>
              Airbnb
            </a>
          )}
        </div>
        
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
