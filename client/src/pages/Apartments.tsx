import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ApartmentTabs from "@/components/apartments/ApartmentTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Apartments = () => {
  const { t } = useTranslation();
  
  // Fetch apartments data
  const { data: apartments, isLoading, error } = useQuery({
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
        
        {apartments && <ApartmentTabs apartments={apartments} />}
      </div>
    </section>
  );
};

export default Apartments;
