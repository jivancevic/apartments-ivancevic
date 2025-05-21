import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Car, Ship, Clock } from "lucide-react";
import { Location } from '../../types';

interface VisitCardsProps {
  locations: Location[];
}

export function VisitCards({ locations }: VisitCardsProps) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  // Helper function to get the transport icon
  const getTransportIcon = (mean: string) => {
    switch (mean) {
      case 'walk':
        return <Compass className="h-4 w-4 mr-1" />;
      case 'car':
        return <Car className="h-4 w-4 mr-1" />;
      case 'ferry':
        return <Ship className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <Card key={location.id} className="overflow-hidden flex flex-col h-full">
          <div className="h-48 overflow-hidden">
            <img
              src={location.image}
              alt={isEnglish ? location.nameEn : location.nameHr}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>{isEnglish ? location.nameEn : location.nameHr}</CardTitle>
            {location.location && (
              <p className="text-sm text-muted-foreground">{location.location}</p>
            )}
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-sm mb-4">
              {isEnglish ? location.descriptionEn : location.descriptionHr}
            </CardDescription>
            
            {(location.featureEn || location.featureHr) && (
              <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
                {isEnglish ? location.featureEn : location.featureHr}
              </Badge>
            )}
          </CardContent>
          <CardFooter className="pt-0 flex items-center">
            {location.distance ? (
              <div className="flex items-center text-sm text-muted-foreground">
                {getTransportIcon(location.distance.mean)}
                <span>{location.distance.minutes} {isEnglish ? 'minutes' : 'minuta'}</span>
              </div>
            ) : (
              location.distanceEn && (
                <div className="text-sm text-muted-foreground">
                  {isEnglish ? location.distanceEn : location.distanceHr}
                </div>
              )
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default VisitCards;