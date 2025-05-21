import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VisitTabs from "@/components/visit/VisitTabs";
import VisitCards from "@/components/visit/VisitCards";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Visit = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("attraction-old-town");
  
  // Fetch locations data
  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['/api/locations'],
  });

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  // Filter locations by active tab
  const filteredLocations = locations?.filter(
    (location: any) => location.typeEn === activeTab
  );

  return (
    <section id="visit" className="py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
          {t("visit.title")}
        </h2>
        
        <VisitTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="max-w-lg mx-auto mt-10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading recommendations. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {filteredLocations && <VisitCards locations={filteredLocations} />}
      </div>
    </section>
  );
};

export default Visit;
