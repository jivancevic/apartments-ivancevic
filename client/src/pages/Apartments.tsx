import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ApartmentTabs from "@/components/apartments/ApartmentTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Apartment } from "@/types";

const Apartments = () => {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  // Extract date parameters from URL
  const params = new URLSearchParams(location.split("?")[1] || "");
  const checkInParam = params.get("checkIn");
  const checkOutParam = params.get("checkOut");
  
  // Parse dates from URL parameters, supporting both full ISO format and cleaner YYYY-MM-DD format
  const checkIn = checkInParam ? (() => {
    try {
      // Check if the format is already YYYY-MM-DD (no time component)
      if (checkInParam.length === 10) {
        // Make sure the date is set to midnight in local timezone for consistency
        const date = new Date(checkInParam + 'T00:00:00');
        if (isNaN(date.getTime())) {
          console.error('Invalid check-in date format in URL:', checkInParam);
          return undefined;
        }
        return date;
      }
      const date = new Date(checkInParam);
      if (isNaN(date.getTime())) {
        console.error('Invalid check-in date format in URL:', checkInParam);
        return undefined;
      }
      return date;
    } catch (e) {
      console.error('Error parsing check-in date:', e);
      return undefined;
    }
  })() : undefined;
  
  const checkOut = checkOutParam ? (() => {
    try {
      // Check if the format is already YYYY-MM-DD (no time component)
      if (checkOutParam.length === 10) {
        // Make sure the date is set to midnight in local timezone for consistency
        const date = new Date(checkOutParam + 'T00:00:00');
        if (isNaN(date.getTime())) {
          console.error('Invalid check-out date format in URL:', checkOutParam);
          return undefined;
        }
        return date;
      }
      const date = new Date(checkOutParam);
      if (isNaN(date.getTime())) {
        console.error('Invalid check-out date format in URL:', checkOutParam);
        return undefined;
      }
      return date;
    } catch (e) {
      console.error('Error parsing check-out date:', e);
      return undefined;
    }
  })() : undefined;
  
  // Fetch apartments data
  const { data: apartments, isLoading, error } = useQuery<Apartment[]>({
    queryKey: ['/api/apartments'],
  });

  return (
    <section id="apartments" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
          {t("apartments.title")}
        </h2>
        
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full max-w-lg mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading apartments. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {apartments && (
          <ApartmentTabs 
            apartments={apartments} 
            selectedDates={{ 
              checkIn: checkIn,
              checkOut: checkOut
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Apartments;
