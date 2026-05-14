import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footprints, Car, Ship, Clock, MapPin, ExternalLink } from "lucide-react";
import { Location } from '@/types';
import { localize } from "@/lib/localize";

interface VisitCardsProps {
  locations: Location[];
}

export function VisitCards({ locations }: VisitCardsProps) {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === 'en';

  // Helper function to get the transport icon
  const getTransportIcon = (mean: string) => {
    switch (mean) {
      case 'walk':
        return <Footprints className="h-4 w-4 mr-1" />;
      case 'car':
        return <Car className="h-4 w-4 mr-1" />;
      case 'ferry':
        return <Ship className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  // Handle clicking on a location
  const handleLocationClick = (location: Location) => {
    // Navigate to link if available, otherwise to Google Maps location
    const url = location.link || location.location;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <Card key={location.id} className="overflow-hidden flex flex-col h-full">
          <div 
            className="h-48 overflow-hidden cursor-pointer" 
            onClick={() => handleLocationClick(location)}
          >
            <img
              src={location.image}
              alt={localize(location, "name", i18n.language)}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle 
              className="cursor-pointer hover:text-primary"
              onClick={() => handleLocationClick(location)}
            >
              {localize(location, "name", i18n.language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-sm mb-4">
              {localize(location, "description", i18n.language)}
            </CardDescription>
            
            {(location.featureEn || location.featureHr) && (
              <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
                {localize(location, "feature", i18n.language)}
              </Badge>
            )}
          </CardContent>
          <CardFooter className="pt-0 flex items-center justify-between">
            {location.distance && (
              <div className="flex items-center text-sm text-muted-foreground">
                {getTransportIcon(location.distance.mean)}
                <span>
                  {location.distance.minutes < 10 ? '< 10 mins' : `${location.distance.minutes} mins`}
                </span>
              </div>
            )}
            <div className="flex gap-2">
              {location.location && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="p-1 h-8 w-8"
                  onClick={() => window.open(location.location ?? undefined, '_blank', 'noopener,noreferrer')}
                  title={t("visit.viewOnMap")}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              )}
              {location.link && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="p-1 h-8 w-8"
                  onClick={() => window.open(location.link ?? undefined, '_blank', 'noopener,noreferrer')}
                  title={t("visit.visitWebsite")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default VisitCards;