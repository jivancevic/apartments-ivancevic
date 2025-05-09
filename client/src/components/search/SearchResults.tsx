import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Bed, Wifi, Wind, Tv, Mountain, Car, Palmtree, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateStayPrice } from "@/lib/pricing";
import { Apartment, Booking } from "@/types";
import { getQueryFn } from "@/lib/queryClient";

// Mapping of apartment IDs to slugs
const APARTMENT_SLUGS: Record<number, string> = {
  1: 'magical-oasis',
  2: 'saint-roko',
  3: 'ismaelli',
  4: 'lavander',
  5: 'sun',
  6: 'sea',
  7: 'beach',
  8: 'nika',
  9: 'lara'
};

// Get apartment slug from ID
const getApartmentSlug = (id: number): string => {
  return APARTMENT_SLUGS[id] || `apartment-${id}`;
};

interface SearchResultsProps {
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

const SearchResults = ({ checkIn, checkOut, guests }: SearchResultsProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);

  // Fetch all apartments
  const { data: apartments, isLoading: isLoadingApartments } = useQuery({
    queryKey: ["/api/apartments"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });

  // Fetch all bookings (across all apartments for simplicity)
  const fetchAllBookings = async () => {
    if (!apartments || !Array.isArray(apartments)) return [];
    
    const bookingsPromises = apartments.map((apartment: Apartment) => 
      fetch(`/api/apartments/${apartment.id}/bookings`).then(res => res.json())
    );
    
    const icalBookingsPromises = apartments.map((apartment: Apartment) => 
      fetch(`/api/apartments/${apartment.id}/ical-bookings`).then(res => res.json())
    );
    
    const [bookings, icalBookings] = await Promise.all([
      Promise.all(bookingsPromises),
      Promise.all(icalBookingsPromises)
    ]);
    
    // Combine all bookings and flatten the array
    return [
      ...bookings.flat(), 
      ...icalBookings.flat()
    ];
  };

  const { data: allBookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["allBookings"],
    queryFn: fetchAllBookings,
    enabled: !!apartments
  });

  useEffect(() => {
    if (!apartments || !Array.isArray(apartments) || !allBookings || !Array.isArray(allBookings)) {
      setFilteredApartments([]);
      return;
    }

    const filtered = apartments.filter((apartment: Apartment) => {
      // Filter by guest capacity
      if (apartment.maxGuests && apartment.maxGuests < guests) {
        return false;
      }

      // Check if apartment is available for the selected dates
      const apartmentBookings = allBookings.filter(
        (booking: Booking) => booking.apartmentId === apartment.id
      );

      // Check for booking conflicts
      const isAvailable = !apartmentBookings.some((booking: Booking) => {
        // Ensure we have Date objects for comparison
        const bookingStart = booking.startDate instanceof Date 
          ? booking.startDate 
          : new Date(booking.startDate);
        
        const bookingEnd = booking.endDate instanceof Date 
          ? booking.endDate 
          : new Date(booking.endDate);
          
        // Reset hours to compare dates only, not times
        const normalizedCheckIn = new Date(checkIn);
        normalizedCheckIn.setHours(0, 0, 0, 0);
        
        const normalizedCheckOut = new Date(checkOut);
        normalizedCheckOut.setHours(0, 0, 0, 0);
        
        const normalizedBookingStart = new Date(bookingStart);
        normalizedBookingStart.setHours(0, 0, 0, 0);
        
        const normalizedBookingEnd = new Date(bookingEnd);
        normalizedBookingEnd.setHours(0, 0, 0, 0);
        
        // Check if there's an overlap between the booking and the selected dates
        return (
          // Check-in during a booking
          (normalizedCheckIn >= normalizedBookingStart && normalizedCheckIn < normalizedBookingEnd) || 
          // Check-out during a booking
          (normalizedCheckOut > normalizedBookingStart && normalizedCheckOut <= normalizedBookingEnd) || 
          // Selected dates completely contain a booking
          (normalizedCheckIn <= normalizedBookingStart && normalizedCheckOut >= normalizedBookingEnd)
        );
      });

      return isAvailable;
    });

    setFilteredApartments(filtered);
  }, [apartments, allBookings, checkIn, checkOut, guests]);

  if (isLoadingApartments || isLoadingBookings) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">{t("search.loading")}</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="h-48 md:h-auto md:w-1/3 rounded-l" />
              <CardContent className="flex-1 p-4">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-6 w-16" />
                  ))}
                </div>
                <Skeleton className="h-6 w-1/4 mt-auto" />
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredApartments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">{t("search.noResults")}</h2>
        <p className="text-gray-600 mb-6">{t("search.tryDifferent")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t("search.resultsFound", { count: filteredApartments.length })}
      </h2>
      
      <div className="space-y-4">
        {filteredApartments.map((apartment) => {
          // Calculate price for the stay
          // Make sure apartment has required properties for price calculation
          const apartmentWithDefaults = {
            ...apartment,
            location: apartment.location || "",
            basePeakPrice: apartment.basePeakPrice || 110,
            priceMultiplier: apartment.priceMultiplier || "1.0",
            cleaningFee: apartment.cleaningFee || 40,
            maxGuests: apartment.maxGuests || 4,
            icalUrls: apartment.icalUrls || null
          };
          const priceSummary = calculateStayPrice(apartmentWithDefaults, checkIn, checkOut);
          
          const apartmentName = currentLanguage === "hr" 
            ? apartment.nameHr 
            : apartment.nameEn;
          
          const apartmentDescription = currentLanguage === "hr"
            ? apartment.descriptionHr
            : apartment.descriptionEn;
          
          // Get first image as main image or use the mainImage if specified
          const mainImage = apartment.mainImage || (apartment.images && apartment.images.length > 0 ? apartment.images[0] : undefined);
          
          return (
            <Card key={apartment.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="h-48 md:h-auto md:w-1/3 overflow-hidden">
                  {mainImage ? (
                    <img 
                      src={mainImage} 
                      alt={apartmentName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{t("common.noImage")}</span>
                    </div>
                  )}
                </div>
                
                <CardContent className="flex-1 p-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{apartmentName}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {apartmentDescription}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {apartment.maxGuests && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {t("apartment.maxGuests", { count: apartment.maxGuests })}
                      </Badge>
                    )}
                    {apartment.hasWifi && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        {t("amenities.wifi")}
                      </Badge>
                    )}
                    {apartment.hasAC && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        {t("amenities.ac")}
                      </Badge>
                    )}
                    {apartment.hasTV && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Tv className="h-3 w-3" />
                        {t("amenities.tv")}
                      </Badge>
                    )}
                    {apartment.hasSeaView && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Mountain className="h-3 w-3" />
                        {t("amenities.seaView")}
                      </Badge>
                    )}
                    {apartment.hasParking && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Car className="h-3 w-3" />
                        {t("amenities.parking")}
                      </Badge>
                    )}
                    {apartment.hasGarden && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Palmtree className="h-3 w-3" />
                        {t("amenities.garden")}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div className="text-sm">
                      <div className="text-gray-600">
                        {format(checkIn, "MMM d")} – {format(checkOut, "MMM d, yyyy")}
                        <span className="mx-1">•</span>
                        {priceSummary.totalNights} {t("nights", { count: priceSummary.totalNights })}
                      </div>
                      <div className="font-bold text-lg">
                        €{priceSummary.total} <span className="text-xs font-normal">{t("search.totalPrice")}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/apartments#${getApartmentSlug(apartment.id)}`} 
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
                    >
                      {t("search.viewDetails")}
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;