import { Location } from "@/types";
import useLanguage from "@/hooks/useLanguage";

interface VisitCardsProps {
  locations: Location[];
}

const VisitCards = ({ locations }: VisitCardsProps) => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {locations.map((location) => (
        <div key={location.id} className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-neutral">
            <img
              src={location.image}
              alt={currentLanguage === "en" ? location.nameEn : location.nameHr}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="font-heading font-bold text-xl mb-2">
              {currentLanguage === "en" ? location.nameEn : location.nameHr}
            </h3>
            <p className="text-gray-600 mb-4">
              {currentLanguage === "en" ? location.descriptionEn : location.descriptionHr}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              {(location.distanceEn || location.distance) && (
                <span>
                  <i className={getDistanceIcon(location.distance?.mean || location.distanceEn || "")} />
                  {location.distance 
                    ? `${location.distance.minutes} min by ${location.distance.mean}` 
                    : (currentLanguage === "en" ? location.distanceEn : location.distanceHr)}
                </span>
              )}
              {location.featureEn && (
                <span>
                  <i className={getFeatureIcon(location.typeEn)} />
                  {currentLanguage === "en" ? location.featureEn : location.featureHr}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper functions to determine icons
const getDistanceIcon = (transportType: string): string => {
  if (transportType.includes("walk")) {
    return "fas fa-walking text-primary mr-1";
  } else if (transportType.includes("car")) {
    return "fas fa-car text-primary mr-1";
  } else if (transportType.includes("ferry")) {
    return "fas fa-ship text-primary mr-1";
  } else {
    return "fas fa-map-marker-alt text-primary mr-1";
  }
};

const getFeatureIcon = (type: string): string => {
  switch (type) {
    case "attraction-old-town":
      return "fas fa-landmark text-primary mr-1";
    case "attraction-island":
      return "fas fa-tree text-primary mr-1";
    case "restaurant":
      return "fas fa-utensils text-primary mr-1";
    case "activity":
      return "fas fa-hiking text-primary mr-1";
    case "excursion":
      return "fas fa-ship text-primary mr-1";
    default:
      return "fas fa-star text-primary mr-1";
  }
};

export default VisitCards;
