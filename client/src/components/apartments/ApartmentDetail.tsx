import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Apartment, Booking } from "@/types";
import ApartmentGallery from "./ApartmentGallery";
import BookingCalendar from "@/components/ui/booking-calendar";
import AmenityIcon from "@/components/ui/AmenityIcon";
import useLanguage from "@/hooks/useLanguage";
import { useIcalFeeds } from "@/hooks/useIcalFeeds";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Ban, Car, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { getApartmentStars } from "./ApartmentTabs";
import { format, parse } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SelectedDates {
  checkIn?: Date;
  checkOut?: Date;
}

interface ApartmentDetailProps {
  apartment: Apartment;
  selectedDates?: SelectedDates;
}

const ApartmentDetail = ({ apartment, selectedDates: initialSelectedDates }: ApartmentDetailProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  // Helper function to format dates consistently for URL parameters
  const formatDateForUrl = (date: Date | undefined): string | null => {
    if (!date) return null;
    return format(date, 'yyyy-MM-dd');
  };
  
  // Track selected dates internally to handle calendar selection
  const [currentSelectedDates, setCurrentSelectedDates] = useState<SelectedDates>(initialSelectedDates || {});
  
  // Fetch bookings for this apartment from API
  const { data: apiBookings, isLoading: isLoadingApi } = useQuery<Booking[]>({
    queryKey: [`/api/apartments/${apartment.id}/bookings`],
  });
  
  // Fetch bookings from iCal feeds if available
  const { 
    icalBookings, 
    isLoading: isLoadingIcal, 
    error: icalError 
  } = useIcalFeeds(apartment.id, apartment.icalUrls || []);
  
  // Determine if we're loading any bookings data
  const isLoading = isLoadingApi || isLoadingIcal;
  
  // Combine bookings from API and iCal feeds
  const allBookings = useMemo(() => {
    const api = apiBookings || [];
    const merged = [...api, ...icalBookings];
    return merged;
  }, [apiBookings, icalBookings]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Gallery - Sticky on large screens */}
      <div className="lg:col-span-2">
        <div style={{ top: 'var(--header-height)' }} className="lg:sticky lg:h-[calc(100vh-var(--header-height)-2rem)] lg:flex lg:flex-col lg:justify-center lg:pt-8">
          <ApartmentGallery images={apartment.images} />
        </div>
      </div>
      
      {/* Details */}
      <div>
        <div className="flex items-center mb-1 text-amber-500">
          {Array.from({ length: getApartmentStars(apartment.id) }).map((_, index) => (
            <Star key={index} size={12} fill="currentColor" className="mr-0.5" />
          ))}
        </div>
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
          
          {/* Parking section with different types and tooltip */}
          {apartment.parkingType !== "none" && (
            <div className="flex items-center">
              {apartment.parkingType === "free" ? (
                <>
                  <AmenityIcon icon="parking" className="text-primary mr-2" />
                  <span>{t("amenities.freeParking", "Free parking")}</span>
                </>
              ) : apartment.parkingType === "private" && apartment.parkingDetails ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center hover:text-primary transition-colors">
                      <AmenityIcon icon="parking" className="text-primary mr-2" />
                      <span>{t("amenities.privateParking", "Private parking")}</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        {t("amenities.parkingTooltip", 
                          `Private parking is possible on site (${
                            apartment.parkingDetails.reservationRequired 
                              ? "reservation is required" 
                              : "reservation is not needed"
                          }) and costs €${apartment.parkingDetails.pricePerDay} per day.`
                        )}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <>
                  <AmenityIcon icon="parking" className="text-primary mr-2" />
                  <span>{t("amenities.privateParking", "Private parking")}</span>
                </>
              )}
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
        <div className="relative h-80 bg-neutral rounded-lg overflow-hidden z-0">
          <iframe
            title="Apartmani Ivančević Location"
            className="w-full h-full pointer-events-none z-0"
            style={{ zIndex: 0, position: 'relative', border: 0 }}
            src={`${apartment.location}`}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        {/* Prices are now dynamically shown in calendar */}
        
        {/* Calendar with booking links */}
        <div className="mb-6">
          <div className="flex justify-between items-center mt-3 mb-3">
            <h4 className="font-heading font-semibold text-lg">
              {t("apartments.availability")}
            </h4>
            
            <div className="flex items-center">
              {apartment.bookingUrl && (
                <a 
                  href={apartment.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-3 hover:opacity-75 transition-opacity"
                  aria-label="Book on Booking.com"
                >
                  <img src="/icons/booking.svg" alt="Booking.com" className="w-6 h-6" />
                </a>
              )}
              
              {apartment.airbnbUrl && (
                <a 
                  href={apartment.airbnbUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-3 hover:opacity-75 transition-opacity"
                  aria-label="Book on Airbnb"
                >
                  <img src="/icons/airbnb.svg" alt="Airbnb" className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <div className="bg-neutral p-4 rounded-lg">
              {icalError && (
                <div className="flex items-center gap-2 text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">
                  <AlertCircle className="h-4 w-4" />
                  <span>Error loading external calendars: {icalError}</span>
                </div>
              )}
              <div className="booking-calendar-wrapper">
                <BookingCalendar 
                  bookings={allBookings} 
                  apartment={apartment} 
                  initialStartDate={initialSelectedDates?.checkIn}
                  initialEndDate={initialSelectedDates?.checkOut}
                  onDatesChange={(startDate, endDate) => {
                    setCurrentSelectedDates({
                      checkIn: startDate || undefined,
                      checkOut: endDate || undefined
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <Link 
          href={`/contact?apartmentId=${apartment.id}${
            currentSelectedDates?.checkIn ? `&checkIn=${formatDateForUrl(currentSelectedDates.checkIn)}` : ''
          }${
            currentSelectedDates?.checkOut ? `&checkOut=${formatDateForUrl(currentSelectedDates.checkOut)}` : ''
          }`}
          className="block w-full bg-primary hover:bg-blue-600 text-white text-center font-medium py-3 px-6 rounded-md transition-colors">
          {t("apartments.sendInquiry")}
        </Link>
      </div>
    </div>
  );
};

export default ApartmentDetail;
