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
            <AmenityIcon key={index} icon="star" size={12} className="mr-0.5 text-current fill-current" />
          ))}
        </div>
        <h3 className="font-heading font-bold text-2xl mb-4">
          {currentLanguage === "en" ? apartment.nameEn : apartment.nameHr}
        </h3>
        <div className="mb-6 whitespace-pre-wrap">
          {currentLanguage === "en" ? apartment.descriptionEn : apartment.descriptionHr}
        </div>
        
        {/* Guest Capacity and Layout */}
        <h4 className="font-heading font-semibold text-lg mb-3">
          {t("apartments.details", "Details")}
        </h4>
        <div className="bg-neutral p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* LEFT COLUMN: General Info */}
            <div className="space-y-3">
              {/* Number of guests */}
              <div className="flex items-center">
                <AmenityIcon icon="guests" size={20} className="text-primary mr-2" />
                <span>{t("apartment.maxGuests", { count: apartment.maxGuests })}</span>
              </div>

              {/* Apartment type */}
              <div className="flex items-center">
                <AmenityIcon icon="apartment-type" size={20} className="text-primary mr-2" />
                <span>{t(`amenities.${apartment.type}`)}</span>
              </div>

              {/* Room size */}
              <div className="flex items-center">
                <AmenityIcon icon="room-size" size={20} className="text-primary mr-2" />
                <span>{t("amenities.roomSize", { size: apartment.roomSizeM2 })}</span>
              </div>

              {/* Bathrooms */}
              <div className="flex items-center">
                <AmenityIcon icon="bathroom" size={20} className="text-primary mr-2" />
                <span>{t("amenities.bathrooms", { count: apartment.bathrooms ?? 1 })}</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Bedrooms */}
            <div className="space-y-3">
              {apartment.bedrooms.map((bedroom, index) => (
                <div key={index} className="bg-white rounded-md">
                  <p className="font-medium mb-1">
                    {currentLanguage === "en" ? bedroom.nameEn : bedroom.nameHr}
                  </p>
                  <div className="space-y-1 pl-2">
                    {bedroom.beds.map((bed, bedIndex) => (
                      <div key={bedIndex} className="flex items-center">
                        <span className="flex mr-2">
                          {Array.from({ length: bed.count }).map((_, iconIndex) => (
                            <span key={iconIndex} className="mr-0.5">
                              {bed.type === "double" ? (
                                <AmenityIcon icon="bed-double" size={18} className="text-primary" />
                              ) : bed.type === "single" ? (
                                <AmenityIcon icon="bed-single" size={18} className="text-primary" />
                              ) : bed.type === "sofa" ? (
                                <AmenityIcon icon="sofa" size={18} className="text-primary" />
                              ) : (
                                <AmenityIcon icon="bed-single" size={18} className="text-primary" />
                              )}
                            </span>
                          ))}
                        </span>
                        <span>
                          {t("amenities.bed", {
                            count: bed.count,
                            type: t(`amenities.bedTypes.${bed.type}`),
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
              <AmenityIcon icon="kitchen" className="text-primary mr-2" />
              <span>{t("amenities.kitchen")}</span>
            </div>
          )}
          
          {/* Balcony */}
          {apartment.hasBalcony && (
            <div className="flex items-center">
              <AmenityIcon icon="balcony" className="text-primary mr-2" />
              <span>{t("amenities.balcony")}</span>
            </div>
          )}
          
          {/* Garden */}
          {apartment.hasGarden && (
            <div className="flex items-center">
              <AmenityIcon icon="garden" size={20} className="text-primary mr-2" />
              <span>{t("amenities.garden")}</span>
            </div>
          )}
          
          {/* Sea View */}
          {apartment.hasSeaView && (
            <div className="flex items-center">
              <AmenityIcon icon="sea-view" size={20} className="text-primary mr-2" />
              <span>{t("amenities.seaView")}</span>
            </div>
          )}
          
          {/* City View */}
          {apartment.hasCityView !== undefined && apartment.hasCityView && (
            <div className="flex items-center">
              <AmenityIcon icon="city-view" size={20} className="text-primary mr-2" />
              <span>{t("amenities.cityView", "City view")}</span>
            </div>
          )}
          
          {/* Free WiFi */}
          {apartment.hasWifi && (
            <div className="flex items-center">
              <AmenityIcon icon="wifi" size={20} className="text-primary mr-2" />
              <span>{t("amenities.freeWifi", "Free WiFi")}</span>
            </div>
          )}
          
          {/* AC */}
          {apartment.hasAC && (
            <div className="flex items-center">
              <AmenityIcon icon="ac" size={20} className="text-primary mr-2" />
              <span>{t("amenities.ac")}</span>
            </div>
          )}
          
          {/* TV */}
          {apartment.hasTV && (
            <div className="flex items-center">
              <AmenityIcon icon="tv" size={20} className="text-primary mr-2" />
              <span>{t("amenities.tv")}</span>
            </div>
          )}
          
          {/* Dishwasher */}
          {apartment.hasDishwasher !== undefined && apartment.hasDishwasher && (
            <div className="flex items-center">
              <AmenityIcon icon="dishwasher" size={20} className="text-primary mr-2" />
              <span>{t("amenities.dishwasher", "Dishwasher")}</span>
            </div>
          )}

          {/* Washing Machine */}
          {apartment.washingMachineType !== "none" && (
            <div className="flex items-center">
              <AmenityIcon icon="washing-machine" size={20} className="text-primary mr-2" />
              <span>
                {apartment.washingMachineType === "both"
                  ? t("amenities.washerDryer", "Washer & dryer")
                  : t("amenities.washingMachine", "Washing machine")}
              </span>
            </div>
          )}

          {/* Hair Dryer */}
          {apartment.hasHairDryer && (
            <div className="flex items-center">
              <AmenityIcon icon="hair-dryer" size={20} className="text-primary mr-2" />
              <span>{t("amenities.hairDryer", "Hair dryer")}</span>
            </div>
          )}
          
          {/* Coffee Machine */}
          {apartment.hasCoffeeMachine !== undefined && apartment.hasCoffeeMachine && (
            <div className="flex items-center">
              <AmenityIcon icon="coffee-machine" size={20} className="text-primary mr-2" />
              <span>{t("amenities.coffeeMachine", "Coffee machine")}</span>
            </div>
          )}
          
          {/* Microwave */}
          {apartment.hasMicrowave && (
            <div className="flex items-center">
              <AmenityIcon icon="microwave" size={20} className="text-primary mr-2" />
              <span>{t("amenities.microwave", "Microwave")}</span>
            </div>
          )}
          
          {/* Smoothie Maker */}
          {apartment.hasSmoothieMaker && (
            <div className="flex items-center">
              <AmenityIcon icon="smoothie-maker" size={20} className="text-primary mr-2" />
              <span>{t("amenities.smoothieMaker", "Smoothie maker")}</span>
            </div>
          )}
          
          {/* Parking section with different types and tooltip */}
          {apartment.parkingType !== "none" && (
            <div className="flex items-center">
              {apartment.parkingType === "free" ? (
                <>
                  <AmenityIcon icon="parking" size={20} className="text-primary mr-2" />
                  <span>{t("amenities.freeParking", "Free parking")}</span>
                </>
              ) : apartment.parkingType === "private" && apartment.parkingDetails ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center hover:text-primary transition-colors">
                      <AmenityIcon icon="parking" size={20} className="text-primary mr-2" />
                      <span>{t("amenities.privateParking", "Private parking")}</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        {t("amenities.parkingTooltip", {
                          reservation: t(
                            apartment.parkingDetails.reservationRequired
                              ? "amenities.reservationRequired"
                              : "amenities.reservationNotRequired"
                          ),
                          price: apartment.parkingDetails.pricePerDay
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <>
                  <AmenityIcon icon="parking" size={20} className="text-primary mr-2" />
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
                  <AmenityIcon icon="alert" size={16} />
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
