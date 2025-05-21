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
import { 
  AlertCircle, Ban, BedDouble, BedSingle, Building, Coffee, 
  Car, Droplet, Ruler, Sofa, Star, Trees, Users, Home, Bath,
  Wifi, Snowflake, Tv, Scissors, Microwave, Blend, WashingMachine
} from "lucide-react";
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
        
        {/* Guest Capacity and Layout */}
        <h4 className="font-heading font-semibold text-lg mb-3">
          {t("apartments.details", "Details")}
        </h4>
        <div className="bg-neutral p-4 rounded-lg mb-6">
          <div className="space-y-3">
            {/* Number of guests */}
            <div className="flex items-center">
              <Users className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.maxGuests", "{{count}} guests", { count: apartment.maxGuests })}</span>
            </div>
            
            {/* Apartment type */}
            <div className="flex items-center">
              <Home className="text-primary w-5 h-5 mr-2" />
              <span>
                {apartment.type === "studio" 
                  ? t("amenities.studio", "Studio apartment")
                  : apartment.type === "room"
                  ? t("amenities.privateRoom", "Private room")
                  : t("amenities.entireApartment", "Entire apartment")}
              </span>
            </div>
            
            {/* Room size */}
            <div className="flex items-center">
              <Ruler className="text-primary w-5 h-5 mr-2" />
              <span>
                {apartment.roomSizeM2 
                  ? t("amenities.roomSize", "{{size}} m²", { size: apartment.roomSizeM2 })
                  : t("amenities.roomSize", "59 m²")}
              </span>
            </div>
            
            {/* Bedrooms */}
            {apartment.bedrooms ? (
              apartment.bedrooms.map((bedroom, index) => (
                <div key={index} className="bg-white p-3 rounded-md">
                  <p className="font-medium mb-1">{bedroom.name}</p>
                  <div className="space-y-1 pl-2">
                    {bedroom.beds.map((bed, bedIndex) => (
                      <div key={bedIndex} className="flex items-center">
                        <span className="mr-2">
                          {bed.type === "double" ? (
                            <BedDouble size={18} className="text-primary" />
                          ) : bed.type === "single" ? (
                            <BedSingle size={18} className="text-primary" />
                          ) : bed.type === "sofa bed" ? (
                            <Sofa size={18} className="text-primary" />
                          ) : (
                            <BedSingle size={18} className="text-primary" />
                          )}
                        </span>
                        <span>
                          {t("amenities.bed", "{{count}} {{type}} bed", { 
                            count: bed.count, 
                            type: bed.type 
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Default bedroom layout if not specified
              <div className="bg-white p-3 rounded-md">
                <p className="font-medium mb-1">{t("amenities.bedroom", "Bedroom")} 1</p>
                <div className="space-y-1 pl-2">
                  <div className="flex items-center">
                    <span className="mr-2">🛏️</span>
                    <span>{t("amenities.doubleBed", "1 double bed")}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bathrooms */}
            <div className="flex items-center">
              <Bath className="text-primary w-5 h-5 mr-2" />
              <span>
                {apartment.bathrooms
                  ? t("amenities.bathrooms", "{{count}} bathroom", { count: apartment.bathrooms })
                  : t("amenities.bathrooms", "1 bathroom")}
              </span>
            </div>
          </div>
        </div>
        
        {/* Amenities Section */}
        <h4 className="font-heading font-semibold text-lg mb-3">
          {t("apartments.amenities")}
        </h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
          {/* Kitchen */}
          {apartment.hasKitchen && (
            <div className="flex items-center">
              <AmenityIcon icon="utensils" className="text-primary mr-2" />
              <span>{t("amenities.kitchen")}</span>
            </div>
          )}
          
          {/* Balcony */}
          {apartment.hasBalcony && (
            <div className="flex items-center">
              <AmenityIcon icon="wind" className="text-primary mr-2" />
              <span>{t("amenities.balcony")}</span>
            </div>
          )}
          
          {/* Garden */}
          {apartment.hasGarden && (
            <div className="flex items-center">
              <Trees className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.garden")}</span>
            </div>
          )}
          
          {/* Sea View */}
          {apartment.hasSeaView && (
            <div className="flex items-center">
              <AmenityIcon icon="water" className="text-primary mr-2" />
              <span>{t("amenities.seaView")}</span>
            </div>
          )}
          
          {/* City View */}
          {apartment.hasCityView !== undefined && apartment.hasCityView && (
            <div className="flex items-center">
              <Building className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.cityView", "City view")}</span>
            </div>
          )}
          
          {/* Free WiFi */}
          {apartment.hasWifi && (
            <div className="flex items-center">
              <Wifi className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.freeWifi", "Free WiFi")}</span>
            </div>
          )}
          
          {/* AC */}
          {apartment.hasAC && (
            <div className="flex items-center">
              <Snowflake className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.ac")}</span>
            </div>
          )}
          
          {/* TV */}
          {apartment.hasTV && (
            <div className="flex items-center">
              <Tv className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.tv")}</span>
            </div>
          )}
          
          {/* Dishwasher */}
          {apartment.hasDishwasher !== undefined && apartment.hasDishwasher && (
            <div className="flex items-center">
              <Droplet className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.dishwasher", "Dishwasher")}</span>
            </div>
          )}
          
          {/* Coffee Machine */}
          {apartment.hasCoffeeMachine !== undefined && apartment.hasCoffeeMachine && (
            <div className="flex items-center">
              <Coffee className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.coffeeMachine", "Coffee machine")}</span>
            </div>
          )}
          
          {/* Hair Dryer */}
          {apartment.hasHairDryer && (
            <div className="flex items-center">
              <Scissors className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.hairDryer", "Hair dryer")}</span>
            </div>
          )}
          
          {/* Microwave */}
          {apartment.hasMicrowave && (
            <div className="flex items-center">
              <Microwave className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.microwave", "Microwave")}</span>
            </div>
          )}
          
          {/* Smoothie Maker */}
          {apartment.hasSmoothieMaker && (
            <div className="flex items-center">
              <Blend className="text-primary w-5 h-5 mr-2" />
              <span>{t("amenities.smoothieMaker", "Smoothie maker")}</span>
            </div>
          )}
          
          {/* Washing Machine */}
          {apartment.washingMachineType !== "none" && (
            <div className="flex items-center">
              <WashingMachine className="text-primary w-5 h-5 mr-2" />
              <span>
                {apartment.washingMachineType === "both"
                  ? t("amenities.washerDryer", "Washer & dryer")
                  : t("amenities.washingMachine", "Washing machine")}
              </span>
            </div>
          )}
          
          {/* Parking section with different types and tooltip */}
          {apartment.parkingType !== "none" && (
            <div className="flex items-center">
              {apartment.parkingType === "free" ? (
                <>
                  <Car className="text-primary w-5 h-5 mr-2" />
                  <span>{t("amenities.freeParking", "Free parking")}</span>
                </>
              ) : apartment.parkingType === "private" && apartment.parkingDetails ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center hover:text-primary transition-colors">
                      <Car className="text-primary w-5 h-5 mr-2" />
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
                  <Car className="text-primary w-5 h-5 mr-2" />
                  <span>{t("amenities.privateParking", "Private parking")}</span>
                </>
              )}
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
            className="w-full h-full z-0"
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
        <div className="mt-6 mb-6">
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
