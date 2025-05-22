// Category labels for Visit page
export const categories = {
  attractionsOldTown: {
    en: "Attractions - Old Town",
    hr: "Atrakcije - Stari grad"
  },
  attractionsIsland: {
    en: "Attractions - Island",
    hr: "Atrakcije - Otok"
  },
  activities: {
    en: "Activities",
    hr: "Aktivnosti"
  },
  excursions: {
    en: "Excursions",
    hr: "Izleti"
  },
  restaurants: {
    en: "Restaurants",
    hr: "Restorani"
  }
};

// Map our category keys to the typeEn values expected by our existing components
export const CATEGORY_TO_TYPE_MAP = {
  'attractionsOldTown': 'attraction-old-town',
  'attractionsIsland': 'attraction-island',
  'activities': 'activity',
  'excursions': 'excursion',
  'restaurants': 'restaurant'
};

// Map in reverse for looking up category by type
export const TYPE_TO_CATEGORY_MAP: Record<string, string> = Object.entries(CATEGORY_TO_TYPE_MAP)
  .reduce((acc, [category, type]) => {
    acc[type] = category;
    return acc;
  }, {} as Record<string, string>);